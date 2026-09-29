// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file Review signal workflow contracts, including executable helper loading.
 * @input The actual privileged script, trusted helper bytes, and stub GitHub APIs.
 * @output Ref-provenance, fail-closed, and unchanged review-routing assertions.
 * @position Node regression coverage for review-signal.yml.
 */

import {Buffer} from 'node:buffer';
import fs from 'node:fs';
import path from 'node:path';
import {describe, expect, it, vi} from 'vitest';
import YAML from 'yaml';

const root = path.resolve(import.meta.dirname, '../..');
const workflow = fs.readFileSync(
  path.join(root, '.github/workflows/review-signal.yml'),
  'utf8',
);
const parsed = YAML.parse(workflow);
const script = parsed.jobs.flag.steps.find(
  step => step.name === 'Detect signals and route',
).with.script;
const HELPER_PATH = '.github/scripts/review-signal-decision.cjs';
const CLASSIFIER_PATH = '.github/scripts/lib/classify-visual.js';
const WORKFLOW_SHA = '1'.repeat(40);
const OLD_BASE = '2'.repeat(40);
const HEAD = '3'.repeat(40);
const LOWER_HEAD = '4'.repeat(40);
const DEFAULT_BRANCH = 'main';
const STACKED_BASE = 'feature/lower';
// Stands in for a classifier someone pushed to another PR's branch. The gate
// must never execute it.
const UNTRUSTED_CLASSIFIER = [
  'globalThis.__untrustedClassifierRan = true;',
  'module.exports = {',
  "  classifyVisualDiff: () => ({score: 0, bucket: 'none', appearanceOnly: true}),",
  '};',
].join('\n');

const encode = source => Buffer.from(source).toString('base64');

async function runSignal({
  eventName = 'workflow_dispatch',
  action = 'synchronize',
  changes,
  author = 'contributor',
  baseSha = OLD_BASE,
  baseRef = DEFAULT_BRANCH,
  changedFiles = 1,
  payloadPr,
  backfill = false,
  helperMissing = false,
  reviews = [],
} = {}) {
  delete globalThis.__untrustedClassifierRan;
  const pr = {
    number: 42,
    node_id: 'PR_node',
    user: {login: author, type: 'User'},
    base: {
      sha: baseSha,
      ref: baseRef,
      repo: {full_name: 'facebook/astryx', default_branch: DEFAULT_BRANCH},
    },
    head: {sha: HEAD, ref: 'feature', repo: {full_name: 'facebook/astryx'}},
    changed_files: changedFiles,
    labels: [{name: 'needs:code-review'}, {name: 'community'}],
    auto_merge: null,
  };
  const mutations = {
    createCommitStatus: vi.fn(),
    addLabels: vi.fn(),
    removeLabel: vi.fn(),
    requestReviewers: vi.fn(),
    updateCheck: vi.fn(),
    graphql: vi.fn(),
  };
  const contentReads = [];
  const getContent = vi.fn(async ({path: filePath, ref}) => {
    contentReads.push(`${ref}:${filePath}`);
    if (filePath === HELPER_PATH) {
      if (ref !== WORKFLOW_SHA || helperMissing) {
        throw Object.assign(new Error('Not Found'), {status: 404});
      }
    } else if (filePath === CLASSIFIER_PATH) {
      if (ref === baseSha && baseRef !== DEFAULT_BRANCH) {
        return {data: {type: 'file', content: encode(UNTRUSTED_CLASSIFIER)}};
      }
      if (ref !== baseSha && ref !== WORKFLOW_SHA) {
        throw new Error(`Unexpected content read: ${ref}:${filePath}`);
      }
    } else {
      throw new Error(`Unexpected content read: ${ref}:${filePath}`);
    }
    return {
      data: {
        type: 'file',
        content: encode(fs.readFileSync(path.join(root, filePath))),
      },
    };
  });
  const github = {
    paginate: async (method, options) => (await method(options)).data,
    request: async () => ({data: ''}),
    graphql: mutations.graphql,
    rest: {
      pulls: {
        get: vi.fn(async () => ({data: pr})),
        list: vi.fn(async () => ({data: [pr]})),
        listFiles: vi.fn(async () => ({
          data: [{filename: 'README.md', status: 'modified'}],
        })),
        listReviews: async () => ({data: reviews}),
        requestReviewers: mutations.requestReviewers,
      },
      repos: {getContent, createCommitStatus: mutations.createCommitStatus},
      issues: {
        addLabels: mutations.addLabels,
        removeLabel: mutations.removeLabel,
      },
      checks: {
        listForRef: async () => ({data: {check_runs: []}}),
        update: mutations.updateCheck,
      },
    },
  };
  const core = {info: vi.fn(), warning: vi.fn(), setFailed: vi.fn()};
  const execute = new Function(
    'github',
    'context',
    'core',
    'process',
    'Buffer',
    `return (async () => {\n${script}\n})();`,
  );
  await execute(
    github,
    {
      repo: {owner: 'facebook', repo: 'astryx'},
      sha: WORKFLOW_SHA,
      eventName,
      payload:
        eventName === 'workflow_dispatch'
          ? {inputs: {pr: backfill ? '' : '42'}}
          : {action, changes, pull_request: payloadPr ?? pr},
    },
    core,
    {
      env: {
        ...parsed.env,
        ENG_OWNERS: '@engineer',
        DESIGN_OWNERS: '@designer',
      },
    },
    Buffer,
  );
  const untrustedClassifierRan = globalThis.__untrustedClassifierRan === true;
  delete globalThis.__untrustedClassifierRan;
  return {
    github,
    core,
    mutations,
    getContent,
    contentReads,
    untrustedClassifierRan,
  };
}

function expectTrustedHelperRead(getContent) {
  expect(
    getContent.mock.calls
      .map(([input]) => input)
      .filter(input => input.path === HELPER_PATH),
  ).toEqual([
    {
      owner: 'facebook',
      repo: 'astryx',
      ref: WORKFLOW_SHA,
      path: HELPER_PATH,
    },
  ]);
}

describe('review-signal trusted helper ref', () => {
  it('only runs the helper-loading job in trusted execution contexts', () => {
    expect(parsed.jobs.flag.if.replace(/\s+/g, ' ').trim()).toBe(
      "(github.event_name == 'pull_request_target' && (github.event.action != 'edited' || github.event.changes.base != null)) || github.event_name == 'workflow_dispatch'",
    );
    expect(
      parsed.jobs.flag.steps.some(step =>
        step.uses?.startsWith('actions/checkout@'),
      ),
    ).toBe(false);
  });

  it.each([
    ['old-base dispatch', {eventName: 'workflow_dispatch'}],
    ['old-base backfill', {eventName: 'workflow_dispatch', backfill: true}],
    [
      'current-base dispatch',
      {eventName: 'workflow_dispatch', baseSha: WORKFLOW_SHA},
    ],
    ['old-base PR event', {eventName: 'pull_request_target'}],
    [
      'current-base PR event',
      {eventName: 'pull_request_target', baseSha: WORKFLOW_SHA},
    ],
  ])(
    'loads the helper from the workflow SHA for %s',
    async (_name, options) => {
      const h = await runSignal(options);
      expectTrustedHelperRead(h.getContent);
      expect(h.core.setFailed).not.toHaveBeenCalled();
      expect(h.core.warning).not.toHaveBeenCalled();
      expect(h.mutations.createCommitStatus).toHaveBeenCalledExactlyOnceWith({
        owner: 'facebook',
        repo: 'astryx',
        sha: HEAD,
        context: 'review-required',
        state: 'pending',
        description: 'Waiting on code review: community contribution',
      });
      if (options.eventName === 'workflow_dispatch') {
        expect(
          h.github.rest.pulls[options.backfill ? 'list' : 'get'],
        ).toHaveBeenCalledOnce();
      } else {
        // PR events classify the live pull request, not the queued payload.
        expect(h.github.rest.pulls.get).toHaveBeenCalledExactlyOnceWith({
          owner: 'facebook',
          repo: 'astryx',
          pull_number: 42,
        });
      }
    },
  );

  it.each(['workflow_dispatch', 'pull_request_target'])(
    'fails closed if the helper is missing at the workflow SHA for %s',
    async eventName => {
      const h = await runSignal({eventName, helperMissing: true});
      expectTrustedHelperRead(h.getContent);
      expect(h.core.warning).toHaveBeenCalledWith(
        'Failed to flag PR #42: Not Found',
      );
      expect(h.core.setFailed).toHaveBeenCalledExactlyOnceWith(
        'One or more PRs failed to flag; see warnings.',
      );
      expect(h.github.rest.pulls.listFiles).not.toHaveBeenCalled();
      for (const mutation of Object.values(h.mutations)) {
        expect(mutation).not.toHaveBeenCalled();
      }
    },
  );

  it.each([
    [OLD_BASE, 'pending'],
    [HEAD, 'success'],
  ])(
    'keeps approval bound to the current PR head, not the helper ref (%s)',
    async (reviewedSha, state) => {
      const h = await runSignal({
        reviews: [
          {
            user: {login: 'engineer'},
            state: 'APPROVED',
            commit_id: reviewedSha,
          },
        ],
      });
      expectTrustedHelperRead(h.getContent);
      expect(h.core.setFailed).not.toHaveBeenCalled();
      expect(h.mutations.createCommitStatus).toHaveBeenCalledWith(
        expect.objectContaining({sha: HEAD, state}),
      );
    },
  );
});

describe('review-signal appearance-only contract', () => {
  it('keeps the embedded privileged script syntactically valid', () => {
    const parsed = YAML.parse(workflow);
    const script = parsed.jobs.flag.steps.find(
      step => step.name === 'Detect signals and route',
    ).with.script;
    expect(
      () =>
        new Function(
          'github',
          'context',
          'core',
          'process',
          'Buffer',
          `return (async () => {\n${script}\n})();`,
        ),
    ).not.toThrow();
  });

  it('loads the dependency-free classifier and trusted base/head source bytes', () => {
    expect(workflow).not.toContain('ref: pr.base.ref');
    expect(workflow).toContain(
      'const classifierRef = targetsDefaultBranch ? pr.base.sha : context.sha',
    );
    expect(workflow).toContain('ref: classifierRef');
    expect(workflow).toContain(
      "path: '.github/scripts/lib/classify-visual.js'",
    );
    expect(workflow).toContain('pr.base.repo.full_name');
    expect(workflow).toContain('pr.base.sha');
    expect(workflow).toContain('pr.head.repo.full_name');
    expect(workflow).toContain('pr.head.sha');
    expect(workflow).toContain(
      'sources[file.filename] = {base: baseSource, head: headSource}',
    );
    expect(workflow).toContain('if (coreChange || designReasons.length === 0)');
    expect(workflow).toContain(
      "throw new Error('classify-visual.js must stay dependency-free')",
    );
  });

  it('resolves engineering and design approvals only for the current head', () => {
    expect(workflow).toContain(
      "path: '.github/scripts/review-signal-decision.cjs'",
    );
    expect(workflow).toContain('headSha: pr.head.sha');
    expect(workflow).toContain('codeHighRisk && codeApproved');
    expect(workflow).toContain("'Cleared by code-owner approval.'");
    expect(workflow).toContain(
      "throw new Error('review-signal-decision.cjs must stay dependency-free')",
    );
  });

  it('routes safe-space changes using both current and previous paths', () => {
    expect(workflow).toContain(
      'reviewDecision.classifyReviewSignalPaths(allFiles)',
    );
    expect(workflow).toContain('hasSafeBoundaryRename');
    expect(workflow).toContain(
      "codeReasons.push('safe-space boundary rename')",
    );
    expect(workflow).toContain(
      'const isSafeSpace = reviewDecision.isSafeSpace',
    );
    expect(workflow).not.toContain('!isLab(f.filename)');
  });

  it('anchors approval, changes-requested, and dismissal review events', () => {
    expect(workflow).toContain('types: [submitted, dismissed]');
    expect(workflow).toContain(
      'contains(fromJSON(\'["approved","changes_requested","dismissed"]\'), github.event.review.state)',
    );
  });

  it('limits self-service to a DESIGNOWNER with only the proven Core visual reason', () => {
    expect(workflow).toContain(
      'const appearanceOnly = visualClassification?.appearanceOnly === true',
    );
    expect(workflow).toContain(
      "codeReasons.length === 1 && codeReasons[0] === 'core visual change'",
    );
    expect(workflow).toContain(
      'authorIsDesign && appearanceOnly && onlyCoreVisualChange',
    );
    expect(workflow).toContain('!designOwnerAppearanceSelfServe');
  });

  it('keeps contributors and classifier failures on the engineering gate', () => {
    const communityReason = workflow.indexOf(
      "codeReasons.push('community contribution')",
    );
    const narrowReasonCheck = workflow.indexOf(
      "codeReasons.length === 1 && codeReasons[0] === 'core visual change'",
    );
    expect(communityReason).toBeGreaterThan(-1);
    expect(narrowReasonCheck).toBeGreaterThan(communityReason);
    expect(workflow).toContain('let visualClassification = null');
    expect(workflow).toContain(
      'Content-based visual classification failed closed',
    );
  });
});

describe('review-signal on stacked pull requests', () => {
  const classifierReads = h =>
    h.contentReads.filter(read => read.endsWith(`:${CLASSIFIER_PATH}`));

  it.each([
    ['synchronize', {action: 'synchronize'}],
    [
      'base change',
      {action: 'edited', changes: {base: {ref: {from: DEFAULT_BRANCH}}}},
    ],
  ])(
    'flags a PR based on another PR branch on %s with trusted code only',
    async (_name, event) => {
      const h = await runSignal({
        eventName: 'pull_request_target',
        baseRef: STACKED_BASE,
        baseSha: LOWER_HEAD,
        ...event,
      });

      expectTrustedHelperRead(h.getContent);
      expect(classifierReads(h)).toEqual([
        `${WORKFLOW_SHA}:${CLASSIFIER_PATH}`,
      ]);
      expect(h.untrustedClassifierRan).toBe(false);
      expect(h.core.setFailed).not.toHaveBeenCalled();
      expect(h.core.warning).not.toHaveBeenCalled();
      expect(h.mutations.createCommitStatus).toHaveBeenCalledExactlyOnceWith({
        owner: 'facebook',
        repo: 'astryx',
        sha: HEAD,
        context: 'review-required',
        state: 'pending',
        description: 'Waiting on code review: community contribution',
      });
    },
  );

  it('gives an engineering owner the same self-serve result as on main', async () => {
    const h = await runSignal({
      eventName: 'pull_request_target',
      author: 'engineer',
      baseRef: STACKED_BASE,
      baseSha: LOWER_HEAD,
    });

    expect(h.untrustedClassifierRan).toBe(false);
    expect(h.mutations.createCommitStatus).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        sha: HEAD,
        state: 'success',
        description: 'No code review required.',
      }),
    );
  });

  it('keeps a main-based PR on its base-commit classifier', async () => {
    const h = await runSignal({eventName: 'pull_request_target'});

    expect(classifierReads(h)).toEqual([`${OLD_BASE}:${CLASSIFIER_PATH}`]);
    expect(h.mutations.createCommitStatus).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({sha: HEAD, state: 'pending'}),
    );
  });

  it.each([
    [OLD_BASE, 'pending'],
    [HEAD, 'success'],
  ])(
    'binds stacked approval to the exact current head (%s)',
    async (reviewedSha, state) => {
      const h = await runSignal({
        eventName: 'pull_request_target',
        baseRef: STACKED_BASE,
        baseSha: LOWER_HEAD,
        reviews: [
          {
            user: {login: 'engineer'},
            state: 'APPROVED',
            commit_id: reviewedSha,
          },
        ],
      });

      expect(h.mutations.createCommitStatus).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({sha: HEAD, state}),
      );
    },
  );

  it('classifies the live PR when a retarget lands after the event was queued', async () => {
    // The event snapshot still targets main and counts the lower PR's files;
    // by the time the job runs, the PR targets the lower branch.
    const h = await runSignal({
      eventName: 'pull_request_target',
      baseRef: STACKED_BASE,
      baseSha: LOWER_HEAD,
      payloadPr: {
        number: 42,
        user: {login: 'contributor', type: 'User'},
        base: {
          sha: OLD_BASE,
          ref: DEFAULT_BRANCH,
          repo: {full_name: 'facebook/astryx', default_branch: DEFAULT_BRANCH},
        },
        head: {sha: HEAD, ref: 'feature', repo: {full_name: 'facebook/astryx'}},
        changed_files: 19,
        labels: [],
        auto_merge: null,
      },
    });

    expect(h.core.setFailed).not.toHaveBeenCalled();
    expect(h.core.warning).not.toHaveBeenCalled();
    expect(classifierReads(h)).toEqual([`${WORKFLOW_SHA}:${CLASSIFIER_PATH}`]);
    expect(h.mutations.createCommitStatus).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({sha: HEAD, state: 'pending'}),
    );
  });

  it('still fails closed when the live file list is incomplete', async () => {
    const h = await runSignal({
      eventName: 'pull_request_target',
      baseRef: STACKED_BASE,
      baseSha: LOWER_HEAD,
      changedFiles: 19,
    });

    expect(h.core.warning).toHaveBeenCalledWith(
      'Failed to flag PR #42: GitHub returned 1 of 19 changed files; refusing to classify an incomplete PR.',
    );
    expect(h.core.setFailed).toHaveBeenCalledExactlyOnceWith(
      'One or more PRs failed to flag; see warnings.',
    );
    for (const mutation of Object.values(h.mutations)) {
      expect(mutation).not.toHaveBeenCalled();
    }
  });
});

// Copyright (c) Meta Platforms, Inc. and affiliates.

import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {describe, expect, it} from 'vitest';

const require = createRequire(import.meta.url);
const {
  classifyReviewSignalPaths,
  diffMatchesFiles,
  gateContext,
  gateScope,
  governedSiblings,
  resolveReviewApprovals,
  samePullIdentity,
} = require('./review-signal-decision.cjs');

const head1 = '1111111111111111111111111111111111111111';
const head2 = '2222222222222222222222222222222222222222';
const approval = (login, commitId, state = 'APPROVED') => ({
  user: {login},
  commit_id: commitId,
  state,
});

describe('review-signal exact-head approvals', () => {
  it('does not let an H1 engineering approval clear H2', () => {
    expect(
      resolveReviewApprovals({
        reviews: [approval('engineer', head1)],
        headSha: head2,
        engOwners: ['engineer'],
        designOwners: ['designer'],
      }),
    ).toEqual({
      codeApproved: false,
      codeWithdrawn: false,
      designApproved: false,
    });
  });

  it('does not let an H1 design approval clear H2', () => {
    expect(
      resolveReviewApprovals({
        reviews: [approval('designer', head1)],
        headSha: head2,
        engOwners: ['engineer'],
        designOwners: ['designer'],
      }),
    ).toEqual({
      codeApproved: false,
      codeWithdrawn: false,
      designApproved: false,
    });
  });

  it('accepts only exact-head approvals and honors later exact-head revocation', () => {
    expect(
      resolveReviewApprovals({
        reviews: [
          approval('engineer', head1),
          approval('engineer', head2),
          approval('designer', head2),
        ],
        headSha: head2,
        engOwners: ['engineer'],
        designOwners: ['designer'],
      }),
    ).toEqual({
      codeApproved: true,
      codeWithdrawn: false,
      designApproved: true,
    });

    expect(
      resolveReviewApprovals({
        reviews: [
          approval('engineer', head2),
          approval('engineer', head2, 'CHANGES_REQUESTED'),
          approval('designer', head2),
          approval('designer', head2, 'DISMISSED'),
        ],
        headSha: head2,
        engOwners: ['engineer'],
        designOwners: ['designer'],
      }),
    ).toEqual({
      codeApproved: false,
      codeWithdrawn: true,
      designApproved: false,
    });
  });

  it('keeps an effective exact-head approval when another owner withdraws', () => {
    expect(
      resolveReviewApprovals({
        reviews: [
          approval('engineer-a', head2),
          approval('engineer-b', head2),
          approval('engineer-b', head2, 'CHANGES_REQUESTED'),
        ],
        headSha: head2,
        engOwners: ['engineer-a', 'engineer-b'],
        designOwners: [],
      }),
    ).toEqual({
      codeApproved: true,
      codeWithdrawn: false,
      designApproved: false,
    });
  });

  it.each([
    {
      name: 'Core to lab',
      file: {
        filename: 'packages/lab/src/Button/Button.tsx',
        previous_filename: 'packages/core/src/Button/Button.tsx',
        status: 'renamed',
      },
      expectedPaths: [
        'packages/lab/src/Button/Button.tsx',
        'packages/core/src/Button/Button.tsx',
      ],
    },
    {
      name: 'unsafe to sandbox',
      file: {
        filename: 'apps/sandbox/src/Button.tsx',
        previous_filename: 'packages/build/src/Button.tsx',
        status: 'renamed',
      },
      expectedPaths: [
        'apps/sandbox/src/Button.tsx',
        'packages/build/src/Button.tsx',
      ],
    },
  ])('retains both sides of a $name rename', ({file, expectedPaths}) => {
    expect(classifyReviewSignalPaths([file])).toEqual({
      files: [file],
      hasSafeBoundaryRename: true,
      paths: expectedPaths,
    });
  });

  it('excludes a rename only when both sides are safe', () => {
    const file = {
      filename: 'apps/storybook/stories/Button.stories.tsx',
      previous_filename: 'apps/sandbox/src/Button.tsx',
      status: 'renamed',
    };
    expect(classifyReviewSignalPaths([file])).toEqual({
      files: [],
      hasSafeBoundaryRename: false,
      paths: [],
    });
  });

  it('stays dependency-free for trusted-base loading', () => {
    const source = readFileSync(
      fileURLToPath(new URL('./review-signal-decision.cjs', import.meta.url)),
      'utf8',
    );
    const mod = {exports: {}};
    new Function('module', 'exports', 'require', source)(
      mod,
      mod.exports,
      () => {
        throw new Error('review-signal-decision.cjs must stay dependency-free');
      },
    );
    expect(typeof mod.exports.resolveReviewApprovals).toBe('function');
    expect(typeof mod.exports.gateScope).toBe('function');
  });
});

describe('gate scope for shared commit statuses', () => {
  const pr = ({
    number = 7,
    baseRef = 'main',
    stack = null,
    headSha = head1,
  } = {}) => ({
    number,
    state: 'open',
    merged_at: null,
    head: {sha: headSha, repo: {full_name: 'facebook/astryx'}},
    base: {ref: baseRef, sha: head2, repo: {default_branch: 'main'}},
    stack,
  });
  const onMain = {base: {ref: 'main', sha: head2}};

  it.each([
    ['targets the default branch', pr(), true, true],
    ['is the bottom rung of a stack', pr({stack: onMain}), true, false],
    [
      'is an upper rung of a stack on main',
      pr({baseRef: 'lower', stack: onMain}),
      true,
      false,
    ],
    [
      'targets another branch without a stack',
      pr({baseRef: 'lower'}),
      false,
      false,
    ],
    [
      'is a rung of a stack on another trunk',
      pr({baseRef: 'lower', stack: {base: {ref: 'release'}}}),
      false,
      false,
    ],
  ])('when the pull request %s', (_name, pull, governed, autoMergeEligible) => {
    expect(gateScope(pull)).toMatchObject({governed, autoMergeEligible});
    expect(gateContext('review-required', pull)).toBe(
      governed ? 'review-required' : 'review-required/stacked-pr-7',
    );
  });

  it('refuses to guess a scope without the default branch', () => {
    expect(() => gateScope({number: 7, base: {ref: 'main', repo: {}}})).toThrow(
      'Could not read the default branch for pull request #7.',
    );
  });

  it('treats any head, base, stack, or state change as a new identity', () => {
    const base = pr();
    expect(samePullIdentity(base, structuredClone(base))).toBe(true);
    for (const change of [
      pull => (pull.head.sha = head2),
      pull => (pull.base.ref = 'lower'),
      pull => (pull.base.sha = head1),
      pull => (pull.stack = onMain),
      pull => (pull.state = 'closed'),
      pull => (pull.head.repo.full_name = 'someone/astryx'),
      pull => (pull.base.repo.default_branch = 'trunk'),
    ]) {
      const moved = structuredClone(base);
      change(moved);
      expect(samePullIdentity(base, moved)).toBe(false);
    }
  });

  it('counts only open governed pull requests on the same head as siblings', () => {
    expect(
      governedSiblings(pr(), [
        pr(),
        pr({number: 8, baseRef: 'lower'}),
        pr({number: 9, baseRef: 'lower', stack: onMain}),
        pr({number: 10, headSha: head2}),
        {...pr({number: 11}), state: 'closed'},
        pr({number: 12}),
      ]),
    ).toEqual([9, 12]);
  });

  it('matches a diff to the listed files by count and unquoted path', () => {
    const files = [
      {filename: 'a.md'},
      {filename: 'b/new.ts', previous_filename: 'b/old.ts'},
    ];
    const diff =
      'diff --git a/a.md b/a.md\n+x\ndiff --git a/b/old.ts b/b/new.ts\n';
    expect(diffMatchesFiles(diff, files)).toBe(true);
    expect(diffMatchesFiles('diff --git a/a.md b/a.md\n', files)).toBe(false);
    expect(
      diffMatchesFiles(
        'diff --git a/a.md b/a.md\ndiff --git a/c.ts b/c.ts\n',
        files,
      ),
    ).toBe(false);
    // Git quotes unusual paths; those count but are not compared by name.
    expect(
      diffMatchesFiles('diff --git "a/\\303\\251" "b/\\303\\251"\n', [
        {filename: '\u00e9'},
      ]),
    ).toBe(true);
  });
});

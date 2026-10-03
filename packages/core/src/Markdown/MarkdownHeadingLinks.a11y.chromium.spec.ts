// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file MarkdownHeadingLinks.a11y.chromium.spec.ts
 * @input Heading-permalink Storybook story in real Chromium
 * @output Interaction-modality, forced-colors, motion, direction, theme, and screenshot evidence
 * @position Browser proof for component:Markdown FR29–FR33
 *
 * Build Storybook first:
 *
 *   pnpm storybook:build
 *   pnpm exec playwright test MarkdownHeadingLinks.chromium.spec.ts
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import {expect, test, type Page} from '@playwright/test';
import {
  DEFAULT_STORYBOOK_DIR,
  serveStorybook,
  type StaticServer,
} from '@astryxdesign/a11y-spec/storybook';

const STORY = 'core-markdown--heading-permalinks';
const OUTPUT = path.resolve('test-results/markdown-heading-links');
let storybook: StaticServer;
const evidence: Record<string, unknown> = {};

test.beforeAll(async () => {
  fs.rmSync(OUTPUT, {recursive: true, force: true});
  fs.mkdirSync(OUTPUT, {recursive: true});
  evidence.headSha = process.env.ASTRYX_HEAD_SHA ?? null;
  storybook = await serveStorybook(
    process.env.ASTRYX_STORYBOOK_DIR ?? DEFAULT_STORYBOOK_DIR,
  );
});

test.afterAll(async () => {
  fs.writeFileSync(
    path.join(OUTPUT, 'manifest.json'),
    `${JSON.stringify({version: 1, ...evidence}, null, 2)}\n`,
  );
  await storybook?.close();
});

async function openStory(
  page: Page,
  globals = 'astryxTheme:neutral;colorMode:light;direction:ltr',
): Promise<void> {
  await page.goto(
    `${storybook.origin}/iframe.html?id=${STORY}&viewMode=story&globals=${globals}`,
    {waitUntil: 'load'},
  );
  await page.locator('#heading-links-ltr h1').waitFor({state: 'visible'});
}

async function permalinkOpacity(page: Page): Promise<number> {
  return page
    .getByRole('link', {name: 'Permalink to Linkable headings'})
    .evaluate(element => Number(getComputedStyle(element).opacity));
}

test('default heading links stay native, discoverable, and stable in every required state', async ({
  browser,
  page,
}) => {
  test.setTimeout(3 * 60 * 1000);
  await openStory(page);

  const root = page.locator('#heading-links-ltr');
  const heading = page.getByRole('heading', {name: 'Linkable headings'});
  const permalink = page.getByRole('link', {
    name: 'Permalink to Linkable headings',
  });
  const row = heading.locator('..');

  await expect(heading).toHaveAttribute(
    'id',
    'heading-links-ltr--linkable-headings',
  );
  await expect(permalink).toHaveAttribute(
    'href',
    '#heading-links-ltr--linkable-headings',
  );
  expect(await permalink.evaluate(element => element.tagName)).toBe('A');
  expect(await heading.locator('a').count()).toBe(0);
  expect(await root.locator('a a').count()).toBe(0);

  evidence.restOpacity = await permalinkOpacity(page);
  expect(evidence.restOpacity).toBe(0);
  await root.screenshot({path: path.join(OUTPUT, 'light-rest.png')});

  await row.hover();
  await expect.poll(async () => permalinkOpacity(page)).toBe(1);
  evidence.hoverOpacity = await permalinkOpacity(page);
  await root.screenshot({path: path.join(OUTPUT, 'light-hover.png')});

  await permalink.focus();
  await expect(permalink).toBeFocused();
  await expect.poll(async () => permalinkOpacity(page)).toBe(1);
  evidence.focusOpacity = await permalinkOpacity(page);
  await root.screenshot({path: path.join(OUTPUT, 'light-focus.png')});

  await page.emulateMedia({forcedColors: 'active'});
  await permalink.evaluate(element => element.blur());
  await page.mouse.move(1200, 800);
  await expect.poll(async () => permalinkOpacity(page)).toBe(1);
  evidence.forcedColorsOpacity = await permalinkOpacity(page);
  await root.screenshot({path: path.join(OUTPUT, 'forced-colors.png')});

  await page.emulateMedia({forcedColors: 'none', reducedMotion: 'reduce'});
  evidence.reducedMotionDuration = await permalink.evaluate(
    element => getComputedStyle(element).transitionDuration,
  );
  expect(evidence.reducedMotionDuration).toBe('0s');

  await openStory(page, 'astryxTheme:neutral;colorMode:dark;direction:ltr');
  const darkRoot = page.locator('#heading-links-ltr');
  const darkHeading = page.getByRole('heading', {name: 'Linkable headings'});
  await darkHeading.locator('..').hover();
  await expect.poll(async () => permalinkOpacity(page)).toBe(1);
  evidence.darkColor = await page
    .getByRole('link', {name: 'Permalink to Linkable headings'})
    .evaluate(element => getComputedStyle(element).color);
  await darkRoot.screenshot({path: path.join(OUTPUT, 'dark-hover.png')});

  const rtlHeading = page.getByRole('heading', {
    name: 'عنوان قابل للربط',
  });
  const rtlPermalink = page.getByRole('link', {
    name: 'Permalink to عنوان قابل للربط',
  });
  await rtlHeading.locator('..').hover();
  const [rtlHeadingBox, rtlPermalinkBox] = await Promise.all([
    rtlHeading.boundingBox(),
    rtlPermalink.boundingBox(),
  ]);
  if (rtlHeadingBox == null || rtlPermalinkBox == null) {
    throw new Error('RTL heading and permalink must have layout boxes');
  }
  expect(rtlPermalinkBox.x).toBeLessThan(rtlHeadingBox.x);
  evidence.rtl = {heading: rtlHeadingBox, permalink: rtlPermalinkBox};

  const touchContext = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    viewport: {width: 390, height: 844},
  });
  const touchPage = await touchContext.newPage();
  await openStory(touchPage);
  evidence.touchOpacity = await permalinkOpacity(touchPage);
  expect(evidence.touchOpacity).toBe(1);
  await touchPage
    .locator('#heading-links-ltr')
    .screenshot({path: path.join(OUTPUT, 'touch.png')});
  await touchContext.close();
});

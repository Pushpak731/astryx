// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file Markdown.headingLinks.ssr.test.tsx
 * @input Markdown server markup and React hydration
 * @output Proves heading fragments are deterministic across instances and hydration
 * @position Focused SSR regression test for Markdown heading permalinks
 */

import {act} from 'react';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {hydrateRoot} from 'react-dom/client';
import {renderToString} from 'react-dom/server';
import {Markdown} from './Markdown';
import {createMarkdownHeadingLinks} from './plugins/headingLinks';

const articleAHeadingLinks = createMarkdownHeadingLinks({
  headingIdPrefix: 'article-a',
});
const articleBHeadingLinks = createMarkdownHeadingLinks({
  headingIdPrefix: 'article-b',
});

const SOURCE = '# Overview\n\n> ## Details';

afterEach(() => {
  document.body.replaceChildren();
});

describe('Markdown heading links — SSR', () => {
  it('keeps namespaced ids and hrefs stable across multiple instances and hydration', async () => {
    const tree = (
      <>
        <Markdown id="article-a" plugins={[articleAHeadingLinks]}>
          {SOURCE}
        </Markdown>
        <Markdown id="article-b" plugins={[articleBHeadingLinks]}>
          {SOURCE}
        </Markdown>
      </>
    );
    const serverHTML = renderToString(tree);
    expect(serverHTML).toContain('id="article-a--overview"');
    expect(serverHTML).toContain('href="#article-a--details"');
    expect(serverHTML).toContain('id="article-b--overview"');
    expect(serverHTML).toContain('href="#article-b--details"');

    const container = document.createElement('div');
    container.innerHTML = serverHTML;
    document.body.appendChild(container);
    const before = Array.from(container.querySelectorAll('h1,h2')).map(
      heading => heading.id,
    );

    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const recoverableErrors: unknown[] = [];
    let root!: ReturnType<typeof hydrateRoot>;
    await act(async () => {
      root = hydrateRoot(container, tree, {
        onRecoverableError: error => recoverableErrors.push(error),
      });
    });

    expect(
      consoleError.mock.calls.filter(call =>
        String(call[0] ?? '')
          .toLowerCase()
          .includes('hydrat'),
      ),
    ).toEqual([]);
    expect(recoverableErrors).toEqual([]);
    expect(
      Array.from(container.querySelectorAll('h1,h2')).map(
        heading => heading.id,
      ),
    ).toEqual(before);
    expect(new Set(before).size).toBe(before.length);

    await act(async () => {
      root.unmount();
    });
    consoleError.mockRestore();
  });
});

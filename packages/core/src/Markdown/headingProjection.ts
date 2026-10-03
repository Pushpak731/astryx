// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file headingProjection.ts
 * @input A transformed Markdown AST, prepared plugins, and optional id prefix
 * @output One depth-first heading identity projection shared by Markdown and Outline
 * @position Internal Markdown identity boundary
 */

import {markdownAstText, visitMarkdownNodes} from './ast';
import type {MarkdownAstHeading, MarkdownAstRoot} from './ast';
import {slugify, uniqueSlug} from './parser';
import {markdownExtensionText} from './plugins/protocol';
import type {
  MarkdownExtensionNode,
  PreparedMarkdownPlugins,
} from './plugins/protocol';
import type {OutlineItem} from '../Outline/types';

type Heading = MarkdownAstHeading<MarkdownExtensionNode>;

export interface MarkdownHeadingProjection {
  /** Every heading, including headings nested in blockquotes and list items. */
  readonly ids: ReadonlyMap<Heading, string>;
  /** Plain-text heading labels used by the default permalink UI. */
  readonly labels: ReadonlyMap<Heading, string>;
  /** Root headings only, preserving the released Outline scope. */
  readonly outline: ReadonlyArray<OutlineItem>;
}

/**
 * Project heading identity once, in document order.
 *
 * Nested headings consume ids so every h1–h6 in the rendered document is unique,
 * while the public Markdown-derived Outline continues to list root headings only.
 */
export function projectMarkdownHeadings(
  root: MarkdownAstRoot<MarkdownExtensionNode>,
  preparedPlugins?: PreparedMarkdownPlugins,
  headingIdPrefix?: string,
): MarkdownHeadingProjection {
  const ids = new Map<Heading, string>();
  const labels = new Map<Heading, string>();
  const outline: OutlineItem[] = [];
  const counts = new Map<string, number>();
  const rootHeadings = new Set(
    root.children.filter((node): node is Heading => node.type === 'heading'),
  );

  visitMarkdownNodes(root, 'heading', heading => {
    const label = markdownAstText(heading.children, node =>
      markdownExtensionText(preparedPlugins, node),
    ).trim();
    const slug = uniqueSlug(slugify(label), counts);
    const id = headingIdPrefix ? `${headingIdPrefix}--${slug}` : slug;
    ids.set(heading, id);
    labels.set(heading, label);
    if (rootHeadings.has(heading)) {
      outline.push({id, label, level: heading.depth});
    }
  });

  return {ids, labels, outline};
}

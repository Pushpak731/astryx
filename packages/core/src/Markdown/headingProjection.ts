// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file headingProjection.ts
 * @input A transformed Markdown AST and prepared plugins
 * @output Heading identity projection shared by Markdown and Outline
 * @position Internal Markdown identity boundary
 */

import {markdownAstText, visitMarkdownNodes} from './ast';
import type {MarkdownAstHeading, MarkdownAstRoot} from './ast';
import {slugify, uniqueSlug} from './parser';
import {getMarkdownHeadingLinks} from './plugins/headingLinks';
import {markdownExtensionText} from './plugins/protocol';
import type {
  MarkdownExtensionNode,
  PreparedMarkdownPlugins,
} from './plugins/protocol';
import type {OutlineItem} from '../Outline/types';

type Heading = MarkdownAstHeading<MarkdownExtensionNode>;

export interface MarkdownHeadingProjection {
  /** Headings with generated ids: root-only by default, every depth with the plugin. */
  readonly ids: ReadonlyMap<Heading, string>;
  /** Plain-text labels for generated headings. */
  readonly labels: ReadonlyMap<Heading, string>;
  /** Plugin-owned native permalink destination, absent without the plugin. */
  readonly permalinkHrefs: ReadonlyMap<Heading, string>;
  /** Root headings only, preserving the released Outline scope. */
  readonly outline: ReadonlyArray<OutlineItem>;
}

function linkedHeadingSlug(value: string): string {
  return value
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    .replace(/['"]/gu, '')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/gu, '');
}

function uniqueLinkedHeadingSlug(
  baseSlug: string,
  counts: Map<string, number>,
): string {
  const fallbackSlug = baseSlug || 'section';
  let count = counts.get(fallbackSlug) ?? 0;
  let candidate = count === 0 ? fallbackSlug : `${fallbackSlug}-${count}`;
  while (counts.has(candidate)) {
    count++;
    candidate = `${fallbackSlug}-${count}`;
  }
  counts.set(fallbackSlug, count + 1);
  counts.set(candidate, 0);
  return candidate;
}

/** Project ids once after every Markdown transform has run. */
export function projectMarkdownHeadings(
  root: MarkdownAstRoot<MarkdownExtensionNode>,
  preparedPlugins?: PreparedMarkdownPlugins,
): MarkdownHeadingProjection {
  const ids = new Map<Heading, string>();
  const labels = new Map<Heading, string>();
  const permalinkHrefs = new Map<Heading, string>();
  const outline: OutlineItem[] = [];
  const counts = new Map<string, number>();
  const headingLinks = getMarkdownHeadingLinks(preparedPlugins);
  const rootHeadings = root.children.filter(
    (node): node is Heading => node.type === 'heading',
  );
  const rootHeadingSet = new Set(rootHeadings);

  const project = (heading: Heading) => {
    const label = markdownAstText(heading.children, node =>
      markdownExtensionText(preparedPlugins, node),
    ).trim();
    const slug =
      headingLinks == null
        ? uniqueSlug(slugify(label), counts)
        : uniqueLinkedHeadingSlug(linkedHeadingSlug(label), counts);
    const id =
      headingLinks?.headingIdPrefix != null &&
      headingLinks.headingIdPrefix !== ''
        ? `${headingLinks.headingIdPrefix}--${slug}`
        : slug;
    ids.set(heading, id);
    labels.set(heading, label);
    if (headingLinks != null) {
      permalinkHrefs.set(heading, `${headingLinks.permalinkBaseUrl}#${id}`);
    }
    if (rootHeadingSet.has(heading)) {
      outline.push({id, label, level: heading.depth});
    }
  };

  if (headingLinks == null) {
    rootHeadings.forEach(project);
  } else {
    visitMarkdownNodes(root, 'heading', project);
  }

  return {ids, labels, permalinkHrefs, outline};
}

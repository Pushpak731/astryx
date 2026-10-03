// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file headingLinks.ts
 * @input Optional heading namespace and permalink URL base
 * @output First-party opt-in Markdown heading-links plugin
 * @position Public helper built on the canonical Markdown plugin protocol
 */

import {sanitizeMarkdownLinkUrl} from '../url';
import {
  createMarkdownPlugin,
  markMarkdownTransformTrusted,
  type MarkdownPluginEntry,
  type PreparedMarkdownPlugins,
} from './protocol';

const PLUGIN_NAME = 'astryx-heading-links';

export interface MarkdownHeadingLinksOptions {
  /**
   * Stable caller-owned namespace for generated heading ids. Use the same
   * value for the Markdown root `id` when each document needs its own fragment
   * namespace. Omit it to keep unprefixed fragments for a single document.
   */
  readonly headingIdPrefix?: string;
  /**
   * Optional caller-owned URL before the generated `#fragment`. Omit it for a
   * native same-document fragment. Any existing fragment is replaced.
   */
  readonly permalinkBaseUrl?: string;
}

export interface PreparedMarkdownHeadingLinks {
  readonly headingIdPrefix?: string;
  readonly permalinkBaseUrl: string;
}

const optionsByEntry = new WeakMap<
  MarkdownPluginEntry,
  PreparedMarkdownHeadingLinks
>();

const identityTransform = markMarkdownTransformTrusted(root => root);

function fail(message: string): never {
  throw new TypeError(`Markdown heading links: ${message}`);
}

/**
 * Create the opt-in plugin that gives every rendered h1–h6 a stable identity
 * and a native sibling permalink. The factory is deterministic and safe to
 * share between Markdown and Markdown-derived Outline calls.
 */
export function createMarkdownHeadingLinks(
  options: MarkdownHeadingLinksOptions = {},
): MarkdownPluginEntry<never> {
  if (
    options.headingIdPrefix !== undefined &&
    typeof options.headingIdPrefix !== 'string'
  ) {
    fail('headingIdPrefix must be a string');
  }
  if (
    options.permalinkBaseUrl !== undefined &&
    typeof options.permalinkBaseUrl !== 'string'
  ) {
    fail('permalinkBaseUrl must be a string');
  }

  const rawBaseUrl = options.permalinkBaseUrl ?? '';
  const permalinkBaseUrl =
    rawBaseUrl === '' ? '' : sanitizeMarkdownLinkUrl(rawBaseUrl);
  if (permalinkBaseUrl == null) {
    fail('permalinkBaseUrl must be a safe navigation URL');
  }

  const entry = createMarkdownPlugin({
    name: PLUGIN_NAME,
    apiVersion: 1,
    transform: identityTransform,
  });
  optionsByEntry.set(
    entry,
    Object.freeze({
      headingIdPrefix: options.headingIdPrefix,
      permalinkBaseUrl: permalinkBaseUrl.replace(/#.*$/u, ''),
    }),
  );
  return entry;
}

/** @internal Reads first-party options from an opaque prepared plugin list. */
export function getMarkdownHeadingLinks(
  plugins: PreparedMarkdownPlugins | undefined,
): PreparedMarkdownHeadingLinks | undefined {
  if (plugins == null) {
    return undefined;
  }
  for (const entry of plugins.entries) {
    const options = optionsByEntry.get(entry);
    if (options != null) {
      return options;
    }
  }
  return undefined;
}

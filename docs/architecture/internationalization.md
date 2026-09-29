---
schema_version: 1
template_version: 2
kind: architecture
id: architecture:internationalization
authority: current
archive_reason: null
superseded_by: null
approved_by: cixzhang
approved_at: 2026-09-05
owners: [cixzhang, nynexman4464]
applies_to:
  [
    packages/core/src/i18n/,
    packages/core/locales/,
    packages/core/src/i18n/generated-locales/,
    scripts/generate-i18n-runtime.mjs,
    packages/build/src/vite.ts,
    packages/core/src/utils/plainDate.ts,
    packages/core/src/utils/dateParser.ts,
    internal/eslint-plugin-astryx/,
    scripts/check-i18n-catalog.mjs,
  ]
verified_by:
  [
    packages/core/src/i18n/__tests__/resolve.test.ts,
    packages/core/src/i18n/__tests__/InternationalizationProvider.test.tsx,
    packages/core/src/i18n/__tests__/useLocale.test.tsx,
    packages/core/src/i18n/__tests__/useDirection.test.tsx,
    packages/core/src/i18n/__tests__/getLocaleDirection.test.ts,
    packages/core/src/i18n/__tests__/useCollator.test.tsx,
    packages/core/src/i18n/useTranslator.test.tsx,
    scripts/check-i18n-catalog.test.mjs,
    scripts/generate-i18n-runtime.test.mjs,
    packages/build/src/vite.test.ts,
    packages/build/src/vite.build.test.ts,
    internal/eslint-plugin-astryx/no-hardcoded-i18n-string.test.mjs,
    internal/eslint-plugin-astryx/no-raw-intl-locale.test.mjs,
  ]
deciding_specs: []
---

# Internationalization architecture

## Contract at a glance

| Area                    | Contract                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Governing contract      | `component:InternationalizationProvider` owns provider behavior. This record captures the released internationalization system plus the additive runtime-catalog delivery contract.                                                                                                                                                                                                                                                                                                                                                                                                  |
| System behavior         | Astryx-owned strings and locale-sensitive operations resolve through the provider locale: per-locale overrides, then supplied catalogs, then shipped English, each walking exact → parent locale. Without a provider the result is deterministic English. Authored catalogs are rich (`defaultMessage` + `description`); shipped runtime catalogs are generated string maps derived from them. Messages are ICU MessageFormat 1 strings. `PlainDate` stays Gregorian. Rendered direction comes from the DOM.                                                                         |
| End-user impact         | People using a non-English locale see Astryx interface text, formats, and sort order in that locale wherever a translation exists and English otherwise; layout and mirroring follow the document direction they are reading in.                                                                                                                                                                                                                                                                                                                                                     |
| Builder impact          | Render one `InternationalizationProvider` and keep DOM `dir` aligned with it. Import a shipped locale from `@astryxdesign/core/locales/<tag>.generated.js` (string map) or `<tag>.json` (rich); both are accepted. Pass the provider locale to Astryx-owned `Intl` calls. Add Astryx strings to `en.json` with a description; never edit generated modules. No separate locale packages and no second Astryx runtime.                                                                                                                                                                |
| Compatibility/readiness | Released provider, hooks, subpath, rich JSON exports, and the rich context shape are preserved; `RuntimeCatalog`, `ProviderMessagesByLocale`, and the `*.generated.js` exports are additive. Current on owner approval. A server/RSC translation runtime and an external-runtime adapter remain separate decisions (INV13, INV14).                                                                                                                                                                                                                                                   |
| Review checks           | Reject a parallel or replacement runtime without a migration decision (INV2); implicit host-locale reads (INV3, INV8); non-string message output (INV7); a translation catalog that adds stale keys or changes an ICU contract (INV6); a hand-edited, committed, or description-carrying generated module, or a changed rich export path (INV15); a runtime map over the gzip limit passing `check:repo` (INV16); locale silently changing `PlainDate` calendar semantics (INV10); render-time provider direction driving geometry (INV11); the provider mutating DOM `dir` (INV12). |
| Governing rules         | No deciding system spec. RFC #3641 is historical design context only.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

This table is a review projection; the body below is authoritative.

## Purpose

Astryx localizes the system-owned text, formatting, comparison, and text direction
of its components without becoming a general application internationalization
framework. Applications continue to own product copy and may use any application
i18n runtime alongside Astryx.

This record captures the released contract that grew from RFC #3641 and the
implementation that followed. Consumer setup and examples remain in
`astryx docs internationalization`.

## System model

```text
consumer content prop
  → wins when the component exposes semantic specialization

packages/core/locales/<tag>.json          (authored, rich: defaultMessage + description)
  → scripts/generate-i18n-runtime.mjs
  → packages/core/src/i18n/generated-locales/<tag>.generated.ts   (derived, ignored)
  → @astryxdesign/core/locales/<tag>.generated.js                  (published string map)
  → @astryxdesign/core/locales/<tag>.json                          (published rich, unchanged)

InternationalizationProvider
  → active locale
  → optional locale catalogs, rich or generated (ProviderMessagesByLocale)
      → normalized to the rich context shape (MessagesByLocale)
  → optional per-locale Astryx overrides
  → optional direction override

Astryx-owned string or locale-sensitive operation
  → provider-bound translator / locale / collator
  → exact locale
  → parent locale(s)
  → shipped English fallback (generated English runtime catalog)
```

`@astryxdesign/core/i18n` is the canonical public entry point. The released
surface consists of `InternationalizationProvider`, `InternationalizationContext`,
their public value/prop types, `useTranslator`, `TranslatorFn`, `useLocale`,
`useCollator`, `useDirection`, `getLocaleDirection`, the catalog types `Catalog`,
`RuntimeCatalog`, `MessagesByLocale`, and `ProviderMessagesByLocale`, and the
`Translator` interface. Shipped catalogs are published under
`@astryxdesign/core/locales/`: `<tag>.json` is the rich authored catalog and
`<tag>.generated.js` is its runtime string map, for all 30 shipped locales plus
`pseudo`.

## Boundaries and invariants

- **INV1 — Astryx owns Astryx strings, not application copy.** Component-owned
  labels, announcements, instructions, and assistive text use Astryx catalogs.
  Product content remains caller-owned. A content prop wins when Astryx exposes
  it for semantic specialization.
- **INV2 — The released provider and hooks are canonical.**
  `InternationalizationProvider` plus the hooks under
  `@astryxdesign/core/i18n` remain the supported runtime. A replacement provider,
  hook, subpath, or catalog ownership model needs an explicit compatibility and
  migration decision; a parallel public runtime is not added by convention.
- **INV3 — No provider is deterministic English.** Components used outside a
  provider resolve Astryx strings from the shipped English catalog, expose locale
  `en`, direction `ltr`, and do not read the browser or host locale implicitly.
- **INV4 — Runtime locale changes are live.** Re-rendering the provider with a new
  locale, messages, overrides, or direction updates consumers in that subtree.
  Astryx does not persist or select the application's locale.
- **INV5 — Fallback is ordered and silent for expected gaps.** For a valid BCP
  47 locale, resolution checks per-locale overrides from exact to parent locale,
  then supplied catalogs from exact to parent locale, then shipped English. A
  missing non-English translation silently falls back. A key absent from every
  source including English is a defect: development warns once and renders the
  key visibly. Malformed locale tags are outside this fallback guarantee and may
  throw when platform formatters or collators are constructed. Known bug: the
  final step reads shipped English only, not a supplied `en` catalog, so
  non-Astryx keys have no cross-locale fallback today; see
  `component:InternationalizationProvider` OQ1.
- **INV6 — English is the source contract.** `packages/core/locales/en.json`
  defines Astryx's key set, default messages, descriptions, and ICU runtime
  contracts. Translation catalogs may omit keys and fall back to English; they
  may not add stale keys or change the argument, select, plural, ordinal, tag, or
  nesting contract of a translated entry. Translator `description` text lives in
  the authored JSON only; runtime catalogs never carry it.
- **INV7 — Messages produce strings.** Astryx catalogs use ICU MessageFormat 1
  and `intl-messageformat`. The supported translation result is a string suitable
  for visible text and attributes such as `aria-label` and `title`. Rich React
  nodes, functions, and application-owned message objects are outside this
  runtime unless a later accepted contract adds them.
- **INV8 — Provider locale owns locale-sensitive behavior.** Astryx-owned date,
  time, number, relative-time, list, collation, speech-recognition, and similar
  operations receive the active provider locale explicitly. Production code does
  not substitute `navigator.language`, an omitted `Intl` locale, or a hardcoded
  locale for that value.
- **INV9 — Pure helpers have deterministic compatibility defaults.** A public pure
  formatter that predates provider threading may keep an optional locale for
  compatibility, but its omitted value resolves deterministically to English.
  Astryx-owned call sites pass the provider locale explicitly. New pure helpers
  require an explicit locale unless a current contract records another default.
- **INV10 — PlainDate component semantics remain Gregorian.** Locale changes
  language, numbering, and field order; it MUST NOT silently change the calendar
  used by Astryx `PlainDate` parsing, arithmetic, constraints, grids, or
  navigation. The low-level `plainDateFormat` compatibility surface may honor an
  explicitly supplied display calendar without claiming broader calendar
  support. Instant-display utilities that currently delegate calendar selection
  to `Intl` do not establish a first-class alternative-calendar contract; this
  record does not decide that broader behavior.
- **INV11 — Rendered direction comes from the DOM.** The provider exposes a
  semantic direction default, but Astryx layout, mirroring, and interaction SHOULD
  resolve from the rendered region through CSS logical properties,
  direction-conditioned CSS, or a lazy DOM read. `useDirection()` is a render-time
  last resort and MUST NOT replace the DOM as the ordinary source for component
  geometry or behavior, because provider direction can disagree with `<html dir>`
  and create first-paint or hydration errors.
- **INV12 — Locale and direction are related but distinct.** The provider derives
  a default direction from locale and accepts an explicit override. It does not
  mutate DOM `dir`. Applications own the page or region `dir`, and must keep it
  aligned with the provider when they want Astryx layout and browser text flow to
  share a direction.
- **INV13 — Client context is the current translation runtime.** The shipped
  translator and locale hooks are client-context APIs. Pure helpers such as
  `getLocaleDirection` remain server-safe. A server/RSC translation runtime is a
  separate API decision, not an implied capability of the current hooks.
- **INV14 — External-runtime integration is additive.** Applications may run
  another i18n provider alongside Astryx. A future adapter may delegate Astryx
  formatting to an application runtime while preserving Astryx key lookup,
  fallback, string results, and released provider compatibility. Astryx does not
  absorb application catalogs merely to offer a general-purpose i18n framework.
- **INV15 — Runtime catalogs are derived, never authored.** Every shipped locale
  has one rich authored catalog (`packages/core/locales/<tag>.json`, exported
  unchanged as `@astryxdesign/core/locales/<tag>.json`) and one generated runtime
  string map (`@astryxdesign/core/locales/<tag>.generated.js`) whose public shape
  is `RuntimeCatalog`, a key-to-message record. The generated sources live under
  `packages/core/src/i18n/generated-locales/`, are ignored by version control,
  and are regenerated before install, build, test, Storybook, docsite, and
  sandbox runs; a long-running development server regenerates them when an
  authored catalog changes, and an edit that lands during the initial generation
  queues another pass rather than being missed. The built-in English fallback
  imports the generated English module. Neither path, shape, nor export of the
  rich catalogs changes because generated modules exist.
- **INV16 — Runtime catalogs stay small, checked not enforced by generation.**
  Each generated runtime catalog MUST gzip to at most 10 KiB. The limit is a
  repository check (`check:i18n-runtime` in `check:repo`) that fails review; it
  MUST NOT block generation itself, so a development server or test run still
  starts while the limit is being addressed. Raising the limit is a decision,
  not a default remedy; coarse catalog splitting is considered first.
- **INV17 — Standard build integration resolves both catalog forms.** The Astryx
  Vite plugin resolves `@astryxdesign/core/locales/<tag>.json` to the rich
  authored file and `@astryxdesign/core/locales/<tag>.generated.js` to the
  generated source module in source mode, so applications and the repository's
  own apps import either form the same way in development and production.

## Change coupling

Changes to the provider, context, public i18n barrel, resolver, catalog schema,
source catalog, runtime-catalog generator or its watcher, locale package exports,
build-plugin locale aliases, locale-aware helpers, catalog validation, or i18n
lint rules must review this record. A change preserves the architecture only when its fallback,
ownership, deterministic defaults, runtime-update behavior, and output type remain
true.

A new public provider or hook, application-catalog ownership, rich-message output,
server translation runtime, implicit host-locale behavior, or non-Gregorian
component semantics is a new human API or ownership decision. It cannot be
inferred from an implementation pull request.

## Owning code

- `packages/core/src/i18n/` — provider, context, public hooks, locale-direction
  derivation, catalog types, and lookup/formatting runtime.
- `packages/core/locales/en.json` — source key set, default English messages, and
  translator descriptions.
- `packages/core/locales/*.json` — partial translated catalogs, rich shape, the
  Crowdin round-trip surface.
- `scripts/generate-i18n-runtime.mjs` — derives the runtime string maps and the
  pseudo locale, checks the gzip limit, and watches authored catalogs during
  development.
- `packages/core/src/i18n/generated-locales/*.generated.ts` — derived runtime
  catalogs, ignored by version control, published as
  `@astryxdesign/core/locales/*.generated.js`.
- `packages/core/package.json` `exports` — publishes both `./locales/*.json` and
  `./locales/*.generated.js`.
- `packages/build/src/vite.ts` — resolves both catalog import forms in source
  mode.
- `scripts/check-i18n-catalog.mjs` — source/translation key, syntax, runtime
  contract, and plural validation.
- `internal/eslint-plugin-astryx/no-hardcoded-i18n-string.js` — routes
  Astryx-owned user-facing strings through the catalog.
- `internal/eslint-plugin-astryx/i18n-key-format.js` — enforces the
  `@astryx.` namespace and camelCase catalog-key segments. This rule currently
  lacks its own focused test file; adding one is a verification gap.
- `internal/eslint-plugin-astryx/no-raw-intl-locale.js` — requires provider locale
  at Astryx-owned locale-sensitive call sites.
- Component contracts — own which semantic content is Astryx-authored versus
  caller-authored and which content props specialize a component.

## Deciding specs

No current system spec changes this shipped architecture. RFC #3641 is historical
design context; this record captures the released result and its deliberate
deltas.

## Verification

| Invariant          | Evidence                                                                             | Failure signal                                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| INV1, INV7         | hardcoded-string lint, catalog tests, component translation tests                    | Astryx-owned text bypasses catalogs, or non-string output reaches visible/AT attributes                                                                        |
| INV2, INV13, INV14 | export drift checks, public i18n tests, compatibility review                         | A parallel/replacement runtime lands without migration, or client hooks claim server behavior                                                                  |
| INV3–INV5          | resolver and provider rerender tests                                                 | no-provider output depends on the host, locale swaps stay stale, fallback order changes, or malformed-locale behavior is described as graceful                 |
| INV6               | `check:i18n-catalog`, key-format lint, and focused mutation tests                    | stale/malformed keys, malformed ICU, or source/translation runtime-contract drift passes CI                                                                    |
| INV15              | generator tests, package-export drift check, provider/resolver runtime-catalog tests | a generated module carries descriptions or is committed, a rich export path changes, or a `RuntimeCatalog` input is rejected or leaks a non-rich context shape |
| INV16              | `check:i18n-runtime` with a fixture over the limit                                   | an oversized runtime map passes `check:repo`, or generation refuses to run because of the limit                                                                |
| INV17              | build-plugin unit and real-build tests                                               | a rich or generated locale import fails to resolve through the standard plugin                                                                                 |
| INV8, INV9         | raw-Intl-locale lint and provider-locale regression tests                            | Astryx output follows the host locale or an owned call omits locale                                                                                            |
| INV10              | PlainDate helper and component locale tests                                          | locale selection changes PlainDate arithmetic/calendar semantics or an explicit display override is ignored                                                    |
| INV11, INV12       | direction helper/provider tests plus rendered RTL audit                              | component layout reads provider direction instead of the region, provider mutates DOM, or overrides stop composing                                             |

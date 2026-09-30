---
schema_version: 4
template_version: 1
kind: system-spec
id: spec:AST-050
authority: draft
archive_reason: null
superseded_by: null
approved_by: null
approved_at: null
phase: proposed
owners: [josephfarina]
affects_architecture: [architecture:cli-surface]
affects_families: []
affects_contributing: []
affects_consumer_docs: [theme, cli/integrations]
---

# App themes system spec

## Intent

A builder, a person or a coding agent, wants an app that uses one or more themes:
a first-party theme, a theme from an installed integration package, or a theme
the app makes itself. They want to add a theme, choose the default, let users
switch between themes at runtime, and know that the setup is correct.

Today `astryx theme add` copies a theme's source into the app, as a template
does. A copied theme no longer receives its owner's updates, loses its package
identity, and must be built again by the app. Nothing tracks which themes an app
uses, nothing helps it switch between them, and doctor checks only that a
first-party theme package is installed.

This record owns how an app declares, imports, switches, and checks its themes
through the CLI. The rule is the same for every theme: the app imports a built
theme and passes it to `Theme`. `architecture:theme-application` already
supports several built themes on one page, because built theme CSS is scoped to
the theme's name and switching changes only the active identity.
`spec:AST-017` owns compatibility and response fields, `spec:AST-042` owns
command admission, `spec:AST-040` owns writes to consumer files, and
`spec:AST-039` owns how integration items are described.

## Non-goals

- A Core component for switching themes, and saving a user's choice. The
  generated module gives an app everything a switcher needs; a Core component is
  a separate component decision.
- Loading theme stylesheets lazily.
- Finding themes that are not installed.
- Changing how a theme is authored, compiled, or applied at runtime.
- Merging or renaming the first-party theme packages.
- Reading the 0.6 theme catalog (`themes/manifest.json`). A package moves to
  typed descriptors with the migration that ships in the next release
  (`spec:AST-039/FR10`); this record adds no catalog reader.
- Equivalent internal implementations remain valid when they satisfy this
  contract. The generated module's exact text, the discovery code, and the
  receipt field order are implementation.

## Requirements

- **FR1 — Adding a theme imports it.** `theme add <slug> [--package <package>]`
  MUST make the theme part of the app by recording it in the app's theme state
  (FR3) and regenerating the app's theme module (FR2). It MUST NOT copy theme
  source into the project and MUST NOT edit application code. Adding a theme
  that is already added regenerates the module and reports no change.
- **FR2 — One generated theme module.** The CLI MUST keep one module that
  imports each added theme's built module and stylesheet, and exports every
  added theme keyed by slug, a type naming the slugs, and the default slug. The
  module carries a generated marker, and the CLI regenerates it from the theme
  state instead of editing it (`spec:AST-040/FR5`). The module is TypeScript when
  the project uses TypeScript and JavaScript otherwise. When the module path
  holds a file the CLI did not generate, the command MUST fail before writing
  and name that file.
- **FR3 — The app declares its themes in package.json.** `astryx.themes` in the
  project's `package.json` maps each slug to its owner: a package name, or the
  project's local themes root. `astryx.theme` names the default slug and MUST be
  one of the added slugs. Without `astryx.themes`, an existing `astryx.theme`
  keeps its released meaning. The CLI reads theme state from these fields only;
  no environment variable selects a theme (`spec:AST-017/FR14`).
- **FR4 — The set and the default are managed by command.**
  `theme remove <slug>` removes a theme from the app, and `theme use <slug>`
  makes an added theme the default. Removing the default theme MUST fail and
  name `theme use`; `theme use` on a theme that is not added MUST fail and name
  `theme add`. Each command regenerates the module (FR2).
- **FR5 — One receipt describes the app's themes.** `theme add`, `theme remove`,
  and `theme use` MUST return the `theme.app` response: every added theme with
  its slug, owner, and the module and stylesheet it imports; the default slug;
  the module path; and the change the command made. Text output shows the same
  facts. The first `theme add` in a project also shows the one-time wiring: import
  the module and pass the default theme to `Theme`.
- **FR6 — Ejecting keeps the copy.**
  `theme eject <slug> [path] [--package <package>]` MUST copy a theme's complete
  source directory into the project
  exactly as `theme add` copied it before this record: the same files, path
  safety, overwrite rule, and rollback. It returns the former copy fields as the
  `theme.eject` response. An ejected theme is a local theme (FR8).
- **FR7 — A package exposes each theme to import.** A package makes a theme
  importable by exporting its built module at `./themes/<slug>` and its
  stylesheet at `./themes/<slug>.css`. A package that owns exactly one theme MAY
  instead export `./built` and `./theme.css`. When a theme needs fonts that
  are not system fonts, the package SHOULD export a font stylesheet at
  `./themes/<slug>.fonts.css`, or `./fonts.css` for a single theme. `theme add`
  MUST fail, naming what is missing, when a theme has no resolvable built module
  and stylesheet; it never falls back to copying or to runtime source.
  `integration add theme` MUST write these exports, and
  `integration pack --check` MUST fail when an exported theme module or
  stylesheet does not resolve from the packed tarball or does not match its
  source.
- **FR8 — Local themes are added like package themes.** A theme directory in the
  project's local themes root, with the same shape as an integration theme,
  is listed and added like a package theme. Its built module and stylesheet are
  the files `theme build` writes beside its source. `theme add` MUST fail and
  name the build command when they are missing.
- **FR9 — The module imports built themes only.** The generated module MUST
  import built themes, their stylesheets, and their font stylesheets when the
  package exports one, never theme source for runtime style injection, so every
  added theme is present at first paint and a switch never waits for styles.
- **FR10 — Listing shows the app's themes.** `theme list` MUST mark each theme
  as added or not and as the default or not for the project, and name whether it
  is bundled, from a package, or local. These fields are additive.
- **FR11 — Doctor proves the setup.** Doctor MUST check, and pass each check only
  on positive evidence:
  1. every added theme's owner is installed and its module and stylesheet
     resolve from the project;
  2. the theme module exists, carries the CLI's generated marker, and matches
     the theme state;
  3. project source imports the theme module (a warning when this cannot be
     shown);
  4. no built theme module is imported without its stylesheet;
  5. every added local theme is built, and its outputs match its source;
  6. no added theme sets a private `--_*` variable;
  7. every added theme's `@astryxdesign/core` peer range accepts the installed
     Core;
  8. the default theme is one of the added themes;
  9. every font family an added theme names is a system font or is loaded by a
     font stylesheet the module imports (a warning that names the family when
     this cannot be shown);
  10. no two added themes write different rules outside their own theme scope
      for the same selector, because every added stylesheet loads at once.

  Each failure names the exact command that fixes it.

- **FR12 — The change to `theme add` is stated as breaking.** A script that used
  `theme add` to copy source moves to `theme eject`. `theme.add` is no longer
  emitted, so a JSON caller sees a new response type instead of a changed shape.
  The change ships with a `[breaking]` Changeset, and every doc, agent doc,
  example, and hint that describes `theme add` as a copy moves in the same
  change.
- **FR13 — Every builder-facing surface agrees.** The theme guide, the
  integration guide, the generated agent docs, and `init`'s next steps MUST
  describe the same workflow: add themes, wire the module once, switch through
  the exported themes, extend a theme to customize it, and eject only to fork.

### Platform support

- Supported floor: every runtime and package manager the CLI supports, and every
  toolchain that imports CSS from a JavaScript module.
- Unsupported behavior: a toolchain that cannot import CSS from a module loads
  each added theme's stylesheet itself; the module still exports the themes, and
  doctor check 4 names the stylesheets to load.
- Browser evidence: a consumer app built for production adds a first-party,
  an integration, and a local theme, renders the default on first paint, and
  switches among all three.

## Current-state impact

When this ships:

- `theme add` records and imports a theme instead of copying it; the copy moves to
  the new `theme eject`; `theme remove` and `theme use` are new; `theme list`
  gains its app fields;
- `architecture:cli-surface` INV19 changes from "integration themes are packaged
  editable source" to "integration themes are importable packages, and editable
  source is an explicit eject";
- `integration add theme` writes theme exports, and `integration pack --check`
  checks them;
- doctor's theme check is replaced by FR11;
- the CLI stops reading the `ASTRYX_THEME` environment variable, and the
  `component` command reads the default theme from the theme state;
- the theme guide, the integration guide, agent docs, and `init` next steps move
  to the FR13 workflow.

`architecture:theme-application` and `architecture:theme-compilation` are
unchanged.

## Verification

| Contract  | Verification                                   | Representative states                                                         | Mutation or failure expectation                                                            |
| --------- | ---------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| FR1, FR2  | Theme command tests and a real consumer        | first add; repeat add; hand-written file at the module path; no TypeScript    | Source is copied, app code changes, a repeat add changes files, or a user file is replaced |
| FR3, FR4  | Theme state tests                              | add, remove, use; removing the default; using a theme not added; legacy state | The default is not an added theme, or legacy `astryx.theme` stops resolving                |
| FR5, FR12 | Response type, text field, and docs tests      | every command; first add; JSON callers                                        | `theme.add` is emitted, a field has no text projection, or a doc still says add copies     |
| FR6       | Eject tests against the former copy fixtures   | bundled, integration, and nested-file themes                                  | Ejected bytes or receipt fields differ from the former copy                                |
| FR7, FR8  | Pack check and real provider-to-consumer tests | multi-theme package; single-theme package; missing export; stale build        | A theme without a resolvable built module is added, or pack check passes a stale export    |
| FR9       | Generated module tests                         | package and local themes                                                      | The module imports source                                                                  |
| FR10      | List tests                                     | added, default, bundled, package, local                                       | A listed theme lacks its app fields                                                        |
| FR11      | Doctor tests, one planted fault per check      | each of the ten faults; a correct app                                         | A check passes on its fault, or passes without positive evidence                           |
| FR13      | Docs and agent-docs tests                      | theme guide, integration guide, agent block, init next steps                  | A surface teaches copying as the way to use a theme                                        |

## Decision log

### DEC-1 — A theme is imported, not copied

**Reference:** `spec:AST-050/DEC-1`
**Decider:** `josephfarina`, `2026-09-30`

A theme an app uses is a dependency, like a component library: it keeps its
owner's updates and its identity. Copying is how a template starts a page, not
how an app uses a theme. `theme add` therefore imports, and copying becomes the
explicit `theme eject`.

Rejected: keeping `theme add` as a copy and adding a new verb for importing,
which leaves the obvious command doing the wrong thing for most builders.

### DEC-2 — The CLI owns one generated module and never edits app code

**Reference:** `spec:AST-050/DEC-2`
**Decider:** `josephfarina`, `2026-09-30`

An app wires one module once. After that, adding, removing, and choosing themes
changes only files the CLI generates, so no command needs proof that it may
change application source, and a switcher reads every added theme from one
export.

Rejected: editing the app's root component on every add, which needs a source
transform for every framework; and printing import lines only, which leaves the
app to keep the list of themes by hand.

### DEC-3 — Theme state lives in package.json

**Reference:** `spec:AST-050/DEC-3`
**Decider:** `josephfarina`, `2026-09-30`

Released CLIs reject unknown `astryx.config` keys, so new configuration there
would break projects that also run an older CLI. `package.json` already carries
`astryx.theme`, which older CLIs read loosely.

Rejected: the generated module as the only record, which makes the CLI parse
its own output; and a new configuration file.

### DEC-4 — Packages expose themes through their exports

**Reference:** `spec:AST-050/DEC-4`
**Decider:** `josephfarina`, `2026-09-30`

A fixed export path lets any app import a theme with any CLI version, or with no
CLI. It adds no descriptor field, so no released CLI meets an unknown field. The
single-theme form keeps the `./built` and `./theme.css` export names that built
theme packages already use, so an existing package can be added without a new
release.

Rejected: import paths declared in the theme descriptor, which older CLIs would
reject as an unknown field.

### DEC-5 — New subcommands under `theme`

**Reference:** `spec:AST-050/DEC-5`
**Decider:** `josephfarina`, `2026-09-30`

Each stays inside the `theme` command's job, managing an app's themes
(`spec:AST-042/FR4`):

- `theme remove` answers "stop using this theme". An option on `add` would give
  it a second job.
- `theme use` answers "start with this theme". An option on `add` could not set
  the default of a theme that is already added.
- `theme eject` answers "give me this theme's source to fork". It is the former
  `theme add` behavior, moved under `spec:AST-042/FR6`; an option on `add` would
  give `add` two opposite results.

Each has one API function under `spec:AST-042/FR1`.

Rejected: one `theme set` command with flags for each action, which gives a
single command several jobs.

## Open questions

- **OQ1 — Where the module goes in a project without a source folder.** Whether
  a fixed default path is enough, or a project needs to choose it.
  (`human-design`)
- **OQ2 — How theme packages ship fonts.** A theme that names fonts it does not
  load shows fallback fonts after a switch until the app loads them. Whether a
  package's font stylesheet (FR7) serves the font files itself or loads them
  from a font service. (`human-design`)

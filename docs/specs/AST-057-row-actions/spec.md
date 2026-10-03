---
schema_version: 4
template_version: 1
kind: system-spec
id: spec:AST-057
authority: draft
archive_reason: null
superseded_by: null
approved_by: null
approved_at: null
phase: proposed
owners: [cixzhang]
affects_architecture:
  [architecture:interaction-modality, architecture:public-component-api]
affects_families: []
affects_contributing: [contributing:api-conventions]
affects_consumer_docs: [Item, List, ListItem, MoreMenu]
review_triggers: [public-api, accessibility, behavior]
---

# Swipe actions on `Item` system spec

<!-- review-applicability:v1 -->

```json
{
  "scope": "global",
  "triggers": {
    "public-api": [
      "FR1",
      "FR2",
      "FR3",
      "FR9",
      "FR10",
      "DEC-1",
      "DEC-2",
      "DEC-4",
      "DEC-5"
    ],
    "accessibility": ["AR1", "AR2", "AR3", "AR4"],
    "behavior": ["FR4", "FR5", "FR6", "FR7", "FR8", "DEC-3", "DEC-6"]
  }
}
```

## Contract at a glance

| Area                    | Contract                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Public contract         | `Item` carries touch swipe actions. `swipeActions` declares, per side, the verbs a sideways drag reaches as `ItemSwipeAction[]` — data in the menu-row vocabulary (DEC-1). The verbs are an accelerator over ones the row already exposes through a visible control (DEC-2). `swipeBehavior` is `reveal` (rest open) or `commit` (fire on release) (DEC-3). The capability is `Item`'s because only the component owning the root can move it (DEC-4); `ListItem` inherits it. There is no hover reveal (DEC-5). The row's existing root translates and its panels counter-translate; no element is added to any row (DEC-6). |
| Behavior                | On a coarse pointer a sideways drag moves the row and uncovers a panel naming the state each action reaches. Under `reveal` (default) the row rests open so each is tappable and a long drag fires the outermost; under `commit` the outermost fires on release and nothing rests. A short release springs back; after an action fires the row springs back. A mouse never starts the drag; a mostly vertical drag stays the scroller's; a pointer landing anywhere else closes a resting row, so one row rests open at a time with no shared state.                                                                          |
| End-user impact         | A person on a phone gets the flick they expect on a mail row, a settings row, or a picker option; a person at a laptop uses the control the row already shows; a keyboard or screen-reader user reaches every verb through that control, because the swipe never carries a verb the row lacks.                                                                                                                                                                                                                                                                                                                                |
| Builder impact          | One prop on `Item` (and so on `ListItem`), `swipeActions={{trailing: [...]}}`, in the shape `MoreMenu.items` already takes; optionally `swipeBehavior`. The group around the rows clips in the inline axis — `List` does it; a bare `Item` host does it once. No gesture code, no media queries, no wrapper. Obligation, checked in development: a row with swipe actions carries another interactive control.                                                                                                                                                                                                                |
| Compatibility/readiness | Additive: both props are absent by default; every current row keeps its DOM and paint exactly. Authority: `draft`; `approved_by` is `null`. Six owner questions are open; OQ1–OQ3 change the public shape, OQ4–OQ6 do not.                                                                                                                                                                                                                                                                                                                                                                                                    |
| Review checks           | Reject a swipe that is the only path to a verb; a hover-revealed copy of a row's controls; `reveal` inside a `listbox`, `menu`, or `radiogroup`; `commit` with several entries on a side and no warning; a panel exposed to the tree while closed; any element added to `Item` for the panels; `overflow: hidden` on the group where `clip` is meant; a second adaptive media query.                                                                                                                                                                                                                                          |
| Governing rules         | [`architecture:interaction-modality`](../../architecture/interaction-modality.md) INV4, INV6, INV7; [`spec:AST-002`](../AST-002/spec.md) FR1, FR4, FR15, FR16, `DEC-1`; [`architecture:public-component-api`](../../architecture/public-component-api.md) INV2, INV3, INV5; `component:DropdownMenu` for the item-data vocabulary this record reuses.                                                                                                                                                                                                                                                                         |

This table is a review projection; the body below is authoritative.

## Intent

A row often has a verb or two beyond its primary: archive, delete, pin, mark
read, select. On a phone the person flicks it sideways. At a laptop, and with
a keyboard or a screen reader, the row carries those verbs somewhere visible
and reachable — an overflow menu at its end, or its own selection. One set
of verbs, two surfaces.

Astryx has the surfaces and not the flick. This record adds the flick to
`Item`, the shared row, as what it is in the product that first built it: a
touch accelerator over verbs the row already acts through, declared in the
menu's own vocabulary so a swipe and a menu item cannot reach different
state. The row's own root moves and its panels stay put, so nothing is added
to any row's DOM. `ListItem` inherits it; so does any host that renders an
`Item`.

The trigger is [#6821](https://github.com/facebook/astryx/pull/6821), a port
of that product's mail row. The owner's direction on reading it: the prop is
swipe actions only and the desktop counterpart is the menu; both rest-open
and fire-on-release are wanted; swipe-to-activate an option is in scope; no
new container DOM.

## Ownership boundary

**Owns**

- That `Item`'s swipe actions are declared once, per side, as data in the
  menu-row vocabulary, and are an accelerator over verbs the row already
  exposes through a visible control.
- The two models, `reveal` and `commit`, and which hosts each may run in.
- The coarse-pointer behavior: rest or fire, the accelerator, spring-back,
  one open row at a time, and how a row closes.
- The anatomy the gesture uses: two out-of-flow positions on `Item`'s
  existing root, the root's translation and the panels' counter-translation,
  and the group's inline clip.
- The accessibility floor: the swipe is never the only path; the panel is
  real buttons while resting and out of the tree while closed.
- That no hover reveal is added for these verbs.

**Why no existing record can hold it**

- [`architecture:interaction-modality`](../../architecture/interaction-modality.md)
  is `current` and owns the rule this record applies — INV7 "essential
  actions remain reachable" in every modality — but owns no public API that
  satisfies it. A record carries one `authority` value, so adding unapproved
  API claims to it would present them as approved
  (`architecture:knowledge-contracts` INV1, INV14).
- `Item` has no component record. This record is the first durable decision
  about `Item`'s public surface; `component:Item`, when written, inherits
  these claims rather than re-deciding them.
- [`component:List`](../../../packages/core/src/List/List.spec.md) is
  `current` and owns List's geometry; it gains the inline clip and cites
  this record.
- `component:DropdownMenu` owns `DropdownMenuItemData`; this record reuses
  that vocabulary and does not change it.
- [`spec:AST-002`](../AST-002/spec.md) owns admission: the caller owns which
  verbs earn a gesture and which model fits them, and the component cannot
  derive either.

## Non-goals

- **A hover-revealed action panel on a fine pointer.** A product that wants
  verbs visible composes a `MoreMenu` or buttons into `endContent`, as
  today (DEC-5).
- **Gesture tuning.** Axis-lock distance, commit ratio, fling velocity, slide
  and spring durations, resistance past the panel: behavior constants in
  source, not public API and not design tokens (the same ruling the touch
  press model received for its clocks).
- **Vertical swipes**, two-finger trackpad swipes, and a swipe whose only
  meaning is dismissal (Toast already has that in `useToastGesture`).
- **A programmatic open** (OQ6).
- **General out-of-flow slots on `Item`** — accent bars, slide-in
  checkboxes, drag handles. The panel positions this record uses are
  anatomy; whether they become public slots is OQ3.
- **`reveal` inside menus, listboxes, radio groups.** Those roles cannot
  host a panel of buttons under ARIA; `commit` may run there (DEC-4).
- Equivalent internal implementations remain valid when they satisfy this
  contract. Internal modules, files, function names, algorithms, data
  structures, storage layouts, manifests, journals, locks, transaction
  protocols, and CI job/workflow topology belong in architecture or
  implementation unless callers or interoperating systems intentionally depend
  on that exact mechanism as a public protocol.

## Evidence: in the repository

| Where                                                                                                                                                                                              | What it shows                                                                                                                                                                                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`architecture:interaction-modality`](../../architecture/interaction-modality.md) INV4, INV7                                                                                                       | "Hover is never the only discovery or activation path." "Every supported modality has a perceivable and operable path" to an essential action. A swipe-only panel with a documented obligation fails INV7 by construction.                                                                                               |
| `DropdownMenu.items: DropdownMenuOption[]`, `MoreMenu.items`, `DropdownMenuItemData`                                                                                                               | Core already declares verbs as data: `{id?, label, icon, onClick, isDisabled, variant: 'default' \| 'destructive', …}`, and data mode "renders through `DropdownMenuItem`, so the two APIs describe the same thing and must not drift". The vocabulary `ItemSwipeAction` takes.                                          |
| `Item.endContent` doc: "badges, metadata, timestamps, or action buttons"; `SideNavItem.actions?: ReactNode`                                                                                        | Row actions are built today by composing controls into `endContent`, always visible. That is the permanent surface this record keeps.                                                                                                                                                                                    |
| `Item`'s root: `position: relative`, `borderRadius`, `paddingInline`; no `overflow`, `isolation`, or `z-index`; the focus-within outline is painted on this root; `themeProps('item')` lands on it | The root is already a containing block for absolutely positioned children, and transforming it moves its outline and its theme target with it — nothing on it fights a `transform`. Only the component that owns this element can translate it.                                                                          |
| `Item`'s content: `marker`, a `startContent` span, the label element (a span, an anchor in `href` mode, a `<button>` in `onClick` mode), an `endContent` span — four siblings in every render mode | Nothing can move four siblings as one unit except a common parent. The root is that parent already.                                                                                                                                                                                                                      |
| `ListItem` renders `<Item as="li">` directly under `List`'s `<ul role="list">`                                                                                                                     | Any wrapper around the row is a non-`li` child of `<ul>`: invalid HTML and a broken "list, N items" announcement. The gesture has to live on `Item`.                                                                                                                                                                     |
| `List`'s root sets no `overflow`                                                                                                                                                                   | A translated row paints past the list's inline edge unless the group clips. `overflow-inline: clip` clips without creating a scroll container; `hidden` would create one and fight the list's vertical scroller.                                                                                                         |
| `useToastGesture` drives Toast's slide by writing `--_toast-swipe-y` onto the root with `style.setProperty`; Toast's styles consume it in `transform`                                              | The in-core way a gesture moves a component without re-rendering it: a custom property on the root, read by CSS. The swipe follows the same route.                                                                                                                                                                       |
| The AppShell/Field ruling of 2026-09-04: a `z-index` adjustment stays local inside an `isolation: isolate` container                                                                               | The panel must paint above the root's background and below its content; `isolation: isolate` on the root with the panel at `z-index: -1` does that without reaching outside the row.                                                                                                                                     |
| `Item` consumers: `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuSubMenu`, `SelectorOption`, `RadioListItem`, `ListItem`                                    | Five of seven hosts render `Item` with a `menuitem`, `option`, or radio role, where a resting panel of buttons is invalid ARIA; a presentational panel that fires on release is not. That is the line between `reveal` and `commit` (DEC-4), the boundary the owner drew on 2026-10-02 for per-row actions in a listbox. |
| `Toast/useToastGesture.ts`                                                                                                                                                                         | A shipped commit-only swipe whose one meaning is dismissal, with constants (`SWIPE_DISMISS_RATIO`) in source.                                                                                                                                                                                                            |
| #6821 real-device feedback                                                                                                                                                                         | On an iOS device the swipe required a press-and-hold before it would start, and the row background did not restore until release. The gesture craft is not yet settled on a device.                                                                                                                                      |
| The source product's row (#6821 is its port)                                                                                                                                                       | Carries the `…` menu in `endContent` on every row and a touch-only swipe whose verbs are the menu's handlers. Its panel names the **state** ("Unread") where the menu names the sentence ("Mark as unread"). A toggle swipes back; a removal swipes out; a verb with no single instant opens a chooser.                  |

## Cases the contract serves

| Case                                                  | Served | How                                                                                                                                                                                                             |
| ----------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mail: archive and delete                              | Yes    | Both in the row's `MoreMenu`; both in `swipeActions.trailing` with the same handlers. Under `reveal` the panel rests open with two buttons; a long drag fires the outermost.                                    |
| One destructive action                                | Yes    | One menu item, one swipe action, `variant: 'destructive'`. Under `commit` it fires on release. A handler that confirms first opens its dialog from a sprung-back row.                                           |
| Reversible toggle (read/unread, pin/flag)             | Yes    | The panel label names the state the verb reaches ("Unread"); the menu names the sentence ("Mark as unread"); one handler. The row springs back after firing (FR5).                                              |
| More than two actions                                 | Yes    | The menu holds all of them; `swipeActions` holds the few that earn a gesture. Under `reveal` the panel holds N buttons.                                                                                         |
| An action that opens a confirm or a chooser           | Yes    | `onClick` opens the dialog from a sprung-back row; a verb with no single instant (snooze) commits to opening its chooser.                                                                                       |
| Rows in a virtualized list                            | Yes    | Open state is the row's own; a row that unmounts takes it along. A mostly vertical drag stays the scroller's (FR6).                                                                                             |
| Rows that are links (`href`)                          | Yes    | The axis lock separates the drag from the tap, and the click the browser synthesizes after a drag is swallowed (FR6).                                                                                           |
| `role="list"` rows                                    | Yes    | `ListItem` inherits the prop; arbitrary interactive children are valid, so both models run.                                                                                                                     |
| Swipe to activate a picker option                     | Yes    | The host passes `swipeActions` with the option's own verb and `swipeBehavior="commit"`; the panel is presentational, so it is valid inside a `listbox`. Selection is already keyboard-reachable, so AR1 is met. |
| `reveal` on `listbox` options, `menuitem`, radio rows | **No** | ARIA forbids interactive descendants of `option` and `menuitem`; `Item` warns in development (FR10).                                                                                                            |
| Dismiss-only swipe (Toast)                            | **No** | Owned by `useToastGesture`; a different concept with one meaning per direction.                                                                                                                                 |

## Public API and concepts

| Concept               | Closed values or states                                                                                                                            | Meaning                                                                                                                                                                                                                                                                                                                                                   | Default  | Owner                       | Stability |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------- | --------- |
| `Item.swipeActions`   | `{leading?: ItemSwipeAction[]; trailing?: ItemSwipeAction[]}`                                                                                      | The verbs a sideways drag reaches on each side, outermost last. `leading` is uncovered by a drag toward the inline end, `trailing` by one toward the inline start. Inherited by `ListItem` and every host that renders an `Item`.                                                                                                                         | absent   | `spec:AST-057`              | proposed  |
| `ItemSwipeAction`     | `{id?: string; label: string; icon?: ReactNode; onClick: () => void \| Promise<void>; isDisabled?: boolean; variant?: 'default' \| 'destructive'}` | One verb, in `DropdownMenuItemData`'s field vocabulary so the same object can feed `MoreMenu.items`. `label` is the panel's text and, under `reveal`, the button's accessible name; it names the **state** the verb reaches ("Unread"), which is why it may differ from a menu item's sentence.                                                           | —        | `spec:AST-057`              | proposed  |
| `Item.swipeBehavior`  | `'reveal'` \| `'commit'`                                                                                                                           | `reveal`: past the panel's width the row rests open with every entry a real button; a long drag or fling fires the outermost. `commit`: a release past the commit point fires the outermost entry; nothing rests and the panel is presentational; valid for one entry per side, warns with more. "Swipe to activate" is `commit` with the row's own verb. | `reveal` | `spec:AST-057`              | proposed  |
| the panels            | two out-of-flow positions on `Item`'s root                                                                                                         | Absolutely positioned children of the existing root at the inline start and end, painting above the root's background and below its content. Rendered by `Item` from `swipeActions`; present only when the side has entries. Anatomy, with a theme target; whether they become public slots is OQ3.                                                       | —        | `spec:AST-057`              | proposed  |
| the drag's travel     | a private custom property on the row root                                                                                                          | Written by the gesture during a drag. The root's `transform` reads it; each panel's `transform` reads its negation, so the row moves and the panel appears fixed in the space the row vacates.                                                                                                                                                            | `0px`    | `spec:AST-057`              | proposed  |
| the group's clip      | `overflow-inline: clip` on the element containing the rows                                                                                         | A moving row paints past its group's inline edge unless the group clips. `List` sets it; a host that renders `Item`s outside `List` sets it once on its own group. `Item` cannot clip itself: it is the thing moving.                                                                                                                                     | —        | `component:List` / the host | proposed  |
| open state            | closed, resting open                                                                                                                               | The row's own. A pointer landing anywhere outside a resting row closes it, which is also how a drag on a neighbour closes it; no group state exists.                                                                                                                                                                                                      | closed   | `spec:AST-057`              | proposed  |
| after an action fires | springs back                                                                                                                                       | The row returns to rest. A removal's exit is the host's or the list's, not assumed by the gesture (OQ5).                                                                                                                                                                                                                                                  | —        | `spec:AST-057`              | proposed  |
| the modality split    | internal                                                                                                                                           | A mouse never starts the drag; a coarse pointer does. Read from the pointer event, not a prop or a media query (`architecture:interaction-modality` INV6).                                                                                                                                                                                                | —        | `spec:AST-057`              | proposed  |

Not public: axis-lock distance, commit ratio, fling velocity, durations,
resistance, panel widths, the custom property's name. They are behavior
constants.

## Requirements

### Behavioral contract

| ID   | Invariant                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Basis                                                               | Verification state                                              |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- | --------------------------------------------------------------- |
| FR1  | `Item` MUST take its swipe actions as `swipeActions: {leading?: ItemSwipeAction[]; trailing?: ItemSwipeAction[]}`, where `ItemSwipeAction` keeps the names and meanings of `DropdownMenuItemData`'s fields (`id`, `label`, `icon`, `onClick`, `isDisabled`, `variant`), so one object can serve the swipe and a `MoreMenu`. An action MUST NOT carry a node the component renders as the control. `ListItem` MUST pass the prop through unchanged.                                                                                                                                         | DEC-1; `DropdownMenu.items`, `MoreMenu.items`                       | Proposed; no evidence on `main`                                 |
| FR2  | `Item` MUST render each side's panel from its entries into an out-of-flow position on its existing root, and MUST add no element to the row for it. The gesture MUST drive the row's travel by writing a custom property on the root; the root's transform MUST read it and each panel's transform its negation.                                                                                                                                                                                                                                                                           | DEC-6; `useToastGesture`                                            | Proposed; real-Chromium evidence required                       |
| FR3  | `swipeBehavior` MUST be one enum with the closed values `reveal` and `commit`, default `reveal`. `commit` with more than one entry on a side MUST warn in development, because the other entries have no touch path.                                                                                                                                                                                                                                                                                                                                                                       | DEC-3; `spec:AST-002` FR15                                          | Proposed                                                        |
| FR4  | A sideways drag on a coarse pointer MUST move the row and uncover the side's panel, showing each entry's `label` and `icon` in its `variant`'s state colour; the panel MUST NOT be visible at rest, by any pixel.                                                                                                                                                                                                                                                                                                                                                                          | #6821 review (resting-panel sliver)                                 | Proposed; real-Chromium evidence required                       |
| FR5  | Under `reveal`, a release past the panel's width MUST leave the row resting open with every entry tappable, and a drag past the commit point or a fling MUST fire the **outermost** entry and no other. Under `commit`, a release past the commit point or a fling MUST fire the outermost entry and nothing MUST rest. A release short of the threshold MUST spring back under both. After an entry fires the row MUST spring back; the gesture MUST NOT assume the row leaves. A handler may return a Promise; a confirming or choosing handler opens its dialog from a sprung-back row. | DEC-3; UIKit `performsFirstActionWithFullSwipe`; source product     | Proposed; real-device evidence required                         |
| FR6  | The drag MUST decide its axis once, early, and a mostly vertical drag MUST stay the scroller's. A mouse MUST NOT start the drag. The click the browser synthesizes after a drag MUST NOT fire the row's primary action.                                                                                                                                                                                                                                                                                                                                                                    | #6821's gesture; press-model ORD1                                   | Proposed; device feedback on #6821 shows the first is unsettled |
| FR7  | A resting row MUST close on a pointer landing anywhere outside it, on Escape with focus inside it, on firing an entry, and on unmount. Because a drag on a neighbour is a pointer outside it, at most one row rests open at a time without any shared state.                                                                                                                                                                                                                                                                                                                               | DEC-4; SwiftUI `swipeActionsContainer()` for the outcome            | Proposed                                                        |
| FR8  | Directions MUST be logical: `trailing` is uncovered by a drag toward the inline start and sits at the inline end; `leading` the reverse; so the finger, the uncovered edge, and the panel agree under RTL.                                                                                                                                                                                                                                                                                                                                                                                 | #6821; `architecture:public-component-api` INV2 (logical direction) | Proposed                                                        |
| FR9  | The element containing swipe-capable rows MUST clip in the inline axis with `overflow-inline: clip`, never `hidden`. `List` MUST set it; `Item`'s consumer documentation MUST state the obligation for any other host.                                                                                                                                                                                                                                                                                                                                                                     | DEC-6; `List` root styles                                           | Proposed                                                        |
| FR10 | `reveal` MUST warn in development when the row's root is inside a `listbox`, `menu`, or `radiogroup`, derived from the rendered DOM; `commit` runs there without warning.                                                                                                                                                                                                                                                                                                                                                                                                                  | DEC-4; ARIA allowed-children rules                                  | Proposed                                                        |

### Accessibility contract

- **AR1 — The swipe is never the only path, and the row proves it.** Every
  verb in `swipeActions` MUST also be reachable through an interactive
  control the row carries on every input — a `MoreMenu` fed by the same
  descriptors, buttons, or the row's own primary element when the verb is
  its own (swipe to activate). A row whose rendered root contains no
  focusable element other than the panels' buttons MUST warn in development.
  Derived from the rendered DOM, not from inspecting `ReactNode` children.
- **AR2 — The panel is real while resting and absent while closed.** Under
  `reveal`, while the row rests open each entry MUST be a real, focusable
  `<button>` named by `label`, so a touch screen reader that lands on it can
  activate it; while closed the panel MUST be out of the accessibility tree
  and the tab order. Under `commit` the panel MUST be presentational
  (`aria-hidden`) at all times, because nothing in it is ever tappable.
- **AR3 — Nothing swipe-only reaches a keyboard or a mouse.** On a pointer
  that can hover, `swipeActions` MUST have no effect on the tab order, the
  accessible tree, or the row's paint. Hover MUST NOT uncover the panel.
- **AR4 — The row's primary stays one tab stop.** `swipeActions` MUST NOT
  change the primary element's role, name, or activation, and MUST add no
  stop while closed.

### Platform support

- Supported feature/engine floor: every supported renderer and browser.
  Pointer type is read from the pointer event.
- Unsupported behavior: a device that never produces a coarse pointer gets
  no swipe and nothing else changes; the row's own control is the path.
- Browser evidence: FR2 and FR4–FR9 are paint and gesture claims. jsdom has
  neither; real-Chromium evidence with dispatched touch is required, and
  FR5/FR6 additionally need a physical touch device because #6821's device
  feedback contradicts its Chromium evidence.

## Current-state impact

- `Item` gains `swipeActions`, `swipeBehavior`, the type `ItemSwipeAction`,
  two out-of-flow panel positions on its root with a theme target, and the
  root and panel transforms. No new element, no gesture on any row that does
  not ask for it. `component:Item`, when written, inherits these claims.
- `ListItem` inherits both props through its existing `Item` passthrough.
- `component:List` gains the inline clip on `List`'s root, citing this
  record.
- `component:DropdownMenu` is read, not changed: `DropdownMenuItemData` is
  reused as a vocabulary.
- `architecture:interaction-modality` gains `spec:AST-057` in its deciding
  specs; no invariant changes.
- `contributing:api-conventions` gains the rule this record relies on: a
  gesture accelerates verbs a row already exposes through a visible control;
  it never introduces one.
- `MoreMenu`'s consumer docs gain the pairing example: the same `items`
  feeding a row's menu and its swipe.
- [#6821](https://github.com/facebook/astryx/pull/6821) is superseded in
  shape by this record; its commit-only model survives as
  `swipeBehavior="commit"` and its gesture engineering — axis lock, logical
  directions, click suppression, reduced-motion handling, the Chromium
  harness — is the starting point for FR4–FR8 once the device findings are
  resolved. Its clipping container around a new inner row does not survive
  (DEC-6).
- No shipped public API changes on this record's own merge.
- While this record is `draft` its `review-applicability:v1` block routes
  nothing: global routing loads `current` claims only
  (`architecture:knowledge-contracts` INV20).

## Verification

| Contract      | Verification                                                                                       | Representative states                                                                                                      | Mutation or failure expectation                                                                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR1, FR3      | `Item` and `ListItem` prop-surface suites plus exported-type checks                                | One, two, and four entries per side; the same array passed to `MoreMenu.items`; `commit` with two entries on a side        | A field diverging from `DropdownMenuItemData`, a silent multi-entry `commit`, or `ListItem` reshaping the prop fails.                                                  |
| FR2           | `Item` DOM snapshot suite plus real-Chromium evidence                                              | No swipe actions; one side; both sides; each render mode (`onClick`, `href`, delegation, parent role); mid-drag            | A new element in any row, a changed DOM on an existing row, a panel that moves with the row, or a panel painted under the root's background or over the content fails. |
| FR4–FR6, FR8  | Real-Chromium dispatched-touch evidence plus physical-device check; RTL via the direction provider | Rest; release short, past the panel, past the commit point, fling; both models; both sides; vertical drag; mouse drag; RTL | A resting sliver, an immediate fire under `reveal`, a rest under `commit`, the wrong entry fired, a row that slides out on a toggle, or a mirrored panel fails.        |
| FR7           | `Item` suite with two rows under one parent                                                        | Open one, drag the other; outside tap; Escape; entry fired; unmount                                                        | Two rows resting open, or a row that stays open after any closing event, fails.                                                                                        |
| FR9           | `List` style assertion plus real-Chromium evidence of a row dragged past the edge                  | A row at the list's inline edge mid-drag; the list scrolled vertically                                                     | A horizontal scrollbar, the row painting past the list, or `hidden` where `clip` is specified fails.                                                                   |
| FR10, AR1     | Development-warning suites over rendered DOM                                                       | `reveal` inside a `listbox`; `commit` inside a `listbox`; a row with a `MoreMenu`; a row with nothing else focusable       | A missing or false warning fails.                                                                                                                                      |
| AR2, AR3, AR4 | Accessible-tree and tab-order assertions, open and closed, both models; hovering-pointer evidence  | Closed; resting open; `commit` mid-drag; touch screen-reader cursor on an entry; hover and Tab on a fine pointer           | A panel exposed while closed, a `commit` panel in the tree, an entry without a name while resting, a changed primary, or any effect on a fine pointer fails.           |

Known verification gap: none of the suites above exist on `main`, and no
component implements the contract. This record is `draft`, does not govern
review, and names no implementation.

## Decision log

Every decision below is **proposed**. None has been ruled on; `approved_by`
is `null` and the record is `draft`.

### DEC-1 — Swipe actions are declared as data in the menu-row vocabulary

**Reference:** `spec:AST-057/DEC-1`
**Decider:** `cixzhang`, `2026-10-02` (direction; record pending)

`swipeActions.leading` and `.trailing` are `ItemSwipeAction[]`, with
`DropdownMenuItemData`'s field names and meanings. Under `reveal` the panel
renders one real button per entry; under `commit` one presentational block.

The component paints the panel during the drag: it needs each entry's label,
icon and state colour while the finger is down, how many there are, and
which is last. Core already declares verbs as data for the same reason in
`DropdownMenu.items` and `MoreMenu.items`, and reusing that vocabulary lets
one object feed both a row's menu and its swipe. Two independent vibe tests
agree: builders asked for row actions with no prop names given reached for
an array of `{label, icon, onClick}` in every recall probe — 3/3 in this
record's test
(`internal/vibe-tests/row-actions-shape-test/RESULTS.md`), 3/3 under the
key `actions` in the picker-row test
([#6909](https://github.com/facebook/astryx/pull/6909)) — and none reached
for child components or a render prop.

Rejected: a `ReactNode` slot of controls — the panel cannot be painted
mid-drag around content the component does not understand, and the slot
loses vocabulary parity with the menu. Rejected: one action per side with
`onAction` (#6821) — a second action vocabulary and a cap the resting model
does not have.

### DEC-2 — The swipe accelerates verbs the row already exposes; it never introduces one

**Reference:** `spec:AST-057/DEC-2`
**Decider:** `cixzhang`, `<pending>`

A row's verbs live in a control it already carries on every input — a list
row's `MoreMenu` in `endContent`, an option's own selection. `swipeActions`
names which of those a drag reaches. A row whose root holds no other
focusable element warns in development; the check reads the rendered DOM,
which keeps it inside the `ReactNode` introspection boundary.

This is how the product the gesture comes from keeps it honest: the swipe
verbs are the handlers the menu already acts through, so the two cannot reach
different state.

Rejected: a prose obligation alone, which review cannot enforce. Rejected
for now: `Item` rendering the menu itself from the same array — it would
make divergence unrepresentable but moves a caller-composed surface into the
row (OQ2 offers it back).

### DEC-3 — Rest is the default; commit is a caller choice for one verb

**Reference:** `spec:AST-057/DEC-3`
**Decider:** `cixzhang`, `<pending>`

`swipeBehavior: 'reveal' | 'commit'`, default `reveal`. Under `reveal` the
row rests open and a long drag fires the outermost entry; under `commit` the
outermost entry fires on release and nothing rests. "Swipe to activate" an
option is `commit` with the option's own verb as the entry: no third value
is needed, and the panel is presentational, which is what lets it run inside
a listbox.

Where a platform offers both, the full swipe is defined over the resting
list — UIKit's flag is
[`performsFirstActionWithFullSwipe`](https://developer.apple.com/documentation/uikit/uiswipeactionsconfiguration),
indexing the resting actions — so resting is the model that holds several
verbs and commit is the one that holds exactly one; the count and the rest
state are one question, which is why `commit` with several entries on a side
warns. A resting panel also gives a touch user something to see before a
destructive verb fires, which is why it is the default. Commit is kept
because the owner asked for both models and for swipe-to-activate, and it is
what the source product chose for its one-verb rows.

Rejected: commit-only as the sole model (#6821) — it cannot grow into
resting without a default change. Rejected: a boolean `hasFullSwipe` — under
`reveal` the full swipe is already on and under `commit` it is the whole
behavior, so a boolean gates the wrong axis.

### DEC-4 — The capability is `Item`'s; `ListItem` inherits it; the model follows the host's role

**Reference:** `spec:AST-057/DEC-4`
**Decider:** `cixzhang`, `2026-10-02` (direction; record pending)

`Item` owns `swipeActions` and `swipeBehavior`. `ListItem` inherits them
through its existing passthrough and declares nothing of its own. Open state
is the row's own: a pointer landing anywhere outside a resting row closes
it, and a drag on a neighbour is such a pointer, so one row rests open at a
time with no group state and no coordinating hook.

Only the component that owns the root can translate it, and a wrapper around
the row is ruled out by the HTML list content model — it would sit between
`<ul>` and `<li>` — so the gesture has to live where the root lives. Which
model a host may run follows from its role. `reveal` rests real buttons, so
it needs a host that permits interactive children — `ListItem` under
`role="list"` does; `menuitem`, `option` and radio rows do not (the boundary
the owner drew on 2026-10-02 for per-row actions in `MultiSelector`), and
`Item` warns there. `commit` rests nothing and its panel is presentational,
so it runs anywhere, which is what makes swipe-to-activate an option valid.

Rejected: a prop on `ListItem` alone — the gesture is not list-specific, and
`ListItem` does not own the root. Rejected: a behavior hook that hosts
compose, with `ListItem` as a shell — one-open-at-a-time was its reason to
exist as group state, and outside-close gives the same outcome with no
shared state, so the hook adds a public primitive with nothing left to own.

### DEC-5 — No hover reveal; the row's own control is the desktop counterpart

**Reference:** `spec:AST-057/DEC-5`
**Decider:** `cixzhang`, `2026-10-02` (direction; record pending)

On a pointer that can hover, `swipeActions` does nothing. The row's verbs
are reached through the control composed into `endContent`, or the row's
own primary.

The row already carries its verbs there, on every row, on every input. The
swipe never carries a verb the row lacks (AR1), so the arrangement has the
two surfaces iOS has with its Actions rotor: a declared, always-reachable
set, and a gesture that accelerates it.

Rejected: a reveal axis that rendered the same actions as hover-revealed
buttons on a fine pointer — a second surface for verbs `endContent` already
holds. [React Aria's iOS List example](https://react-aria.adobe.com/examples/ios-list)
takes that route (a panel button in the tree, revealed on focus) and is the
alternative this decision sets aside.

### DEC-6 — The root translates and the panels counter-translate; no element is added

**Reference:** `spec:AST-057/DEC-6`
**Decider:** `cixzhang`, `2026-10-02` (direction; record pending)

`Item` renders each side's panel as an absolutely positioned child of its
existing root, at the inline start or end, above the root's background and
below the content. The drag writes its travel as a custom property on the
root — the way `useToastGesture` writes `--_toast-swipe-y` — the root's
transform reads it, and each panel's transform reads its negation, so the
row moves and the panel appears fixed in the space the row vacates. Both are
compositor transforms and the cancellation is exact. No element is added to
any row. The group clips with `overflow-inline: clip`.

Layering and translation are different problems and neither needs a new
element. Layering is absolute positioning inside a containing block the root
already provides, with `isolation: isolate` on the root so a negative
`z-index` on the panel stays local (the 2026-09-04 isolation ruling).
Translation is the root's own transform: the content is four siblings in
every render mode, and the root is already their common parent. The root's
own styles survive the transform — no `overflow` or `contain` on it, the
focus-within outline and the theme target ride it. The clip cannot be the
row's, because the row is the thing moving, so it is the group's; `hidden`
would create a scroll container and fight the list's vertical scroller.

Rejected: a wrapper element inside `Item`, conditional or not — a second
row shape for CSS and tests to straddle, for a problem the root's transform
already solves. Rejected: #6821's clipping container around a new inner
row — the element the owner asked to avoid. Rejected: panels as siblings at
the list level, positioned at each row's offset — a position-sync loop
against resize, reflow and virtualized mounts. Rejected: animating
`padding-inline-start` on the root — layout on every frame under a finger
instead of a compositor transform.

## Open questions

- **OQ1 — Does the shape stand: `swipeActions: {leading?, trailing?}` of `ItemSwipeAction[]` in the menu-row vocabulary, on `Item`?** (`human-api`)

  The panel is painted from the data; the vocabulary pairs with
  `MoreMenu.items`; two independent recall probes went 3–0 each for a data
  array. Confirm, or rule for a slot of controls, which flips FR1 and DEC-1.

- **OQ2 — Is "same handlers, checked in development" strong enough, or should `Item` render the menu itself from one array?** (`human-api`)

  Today's shape (DEC-2): the caller composes a `MoreMenu` into `endContent`
  and passes the swipe the same handlers; the row warns if it finds no other
  focusable control. The stronger shape: `Item.actions: ItemSwipeAction[]`
  renders a `MoreMenu` at the row's end on every input and drives the swipe
  from the same array, so a swipe verb cannot exist without a menu item. It
  costs the caller the menu's position, label and presentation. Confirm, or
  take the stronger shape.

- **OQ3 — Do the two out-of-flow panel positions become public slots on `Item`, and under what names?** (`human-api`)

  The swipe needs none: `Item` renders the panels from `swipeActions`. As
  public slots they would be general anatomy — a leading accent bar, a
  slide-in selection checkbox, a drag handle all need content outside the
  row's flow and are impossible today — and general anatomy takes general
  names. `beforeContent` / `afterContent` distinguish from `startContent` /
  `endContent` on the axis that matters: inside the row's flow versus outside
  it. Swipe-specific names would be wrong for general slots, and general
  slots deserve their own admission with the swipe as first consumer. The
  recommendation is to keep the positions internal here and admit the slots
  in a `component:Item` record if a second consumer appears. Rule.

- **OQ4 — Is the destructive marker `variant: 'default' | 'destructive'`?** (`human-design`)

  With the same objects feeding `MoreMenu.items`, the menu's word wins by
  construction. The shared status set `'success' | 'warning' | 'error'` and
  #6821's four-tone `tone` were weighed; `Badge`'s variant map was set aside
  because it also carries decorative colours. Confirm.

- **OQ5 — Should an `ItemSwipeAction` be able to say the row leaves?** (`human-design`)

  FR5 springs back after every fire and leaves a removal's exit to the host
  or the list. The source product swipes an archived row out of the shelf
  while a toggle springs back. A field such as `removesRow?: boolean` would
  carry that, at the cost of a field `MoreMenu.items` ignores. The
  recommendation is spring-back only here, with the field as an additive
  follow-up.

- **OQ6 — Does a product need to open or close a row programmatically?** (`checkable`)

  Framework7 and Quasar expose `open`/`close`/`reset`; SwiftUI added
  `onPresentationChanged`. No Astryx product has asked. A controlled pair
  would be the additive shape.

## Content boundary

The research that produced this record — the cross-library survey, the
shapes weighed, and the vibe test's design and scores — is a report, not a
contract, and lives outside it: the vibe test in
`internal/vibe-tests/row-actions-shape-test/RESULTS.md`, the rest linked from
the pull request that introduced the record.

This record does not duplicate `Item`'s or `List`'s anatomy, prop tables,
theming targets, or geometry contracts; `DropdownMenu`'s item-data contract,
which it reuses; the modality invariants in
`architecture:interaction-modality`; the admission argument in
`spec:AST-002`; the press model in `module:DropdownMenu/useMenuPress`; or the
gesture constants an implementation will hold in source. It links their
canonical owners.

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
affects_consumer_docs: [Item, List, ListItem]
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
      "DEC-3",
      "DEC-4"
    ],
    "accessibility": ["AR1", "AR2", "AR3"],
    "behavior": ["FR4", "FR5", "FR6", "FR7", "FR8", "DEC-2", "DEC-5"]
  }
}
```

## Contract at a glance

| Area                    | Contract                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Public contract         | `Item` carries touch swipe actions. `swipeActions` declares, per side, the verbs a sideways drag uncovers as `ItemSwipeAction[]` — `label`, `icon`, `onActivate`, `variant`, `hasRemoval` — and `Item` renders the panel from them (DEC-1). `swipeBehavior` is `reveal` (rest open) or `commit` (fire on release) (DEC-2). The capability is `Item`'s; `ListItem` inherits it (DEC-3). No hover reveal (DEC-4). No new DOM: the row's root translates and its panels counter-translate (DEC-5).                                                                                                                             |
| Behavior                | On a coarse pointer a sideways drag moves the row and uncovers the side's panel. Under `reveal` (default) the row rests open so each action is tappable and a long drag fires the outermost; under `commit` the outermost fires on release and nothing rests. A short release springs back. After an action fires the row springs back wearing its new state; a `hasRemoval` action slides the row out instead, fires `onActivate` once the exit completes, and the caller removes the row. A mouse never starts the drag; a mostly vertical drag stays the scroller's; a pointer anywhere outside a resting row closes it. |
| End-user impact         | A person on a phone gets the flick they expect on a mail row, a settings row, or a picker option, with the row's own look, and an archived row leaves instead of bouncing back and vanishing. Nothing changes for anyone else: a mouse, a keyboard, or a screen reader meets the row exactly as today.                                                                                                                                                                                                                                                                                                                      |
| Builder impact          | One prop on `Item` (and so on `ListItem`), `swipeActions={{trailing: [{label: 'Archive', icon: <Icon icon={ArchiveIcon} />, onActivate: archive, hasRemoval: true}]}}`; optionally `swipeBehavior`. Every field is known before the gesture begins, so the component picks the right animation up front. The group around the rows clips in the inline axis — `List` does it; any other host does it once. The consumer documentation states that a verb reachable only by swipe is unreachable by keyboard.                                                                                                                |
| Compatibility/readiness | Additive: both props are absent by default; every current row keeps its DOM and paint exactly. Authority: `draft`; `approved_by` is `null`. Three owner questions are open; OQ1 changes the public shape, OQ2–OQ3 do not.                                                                                                                                                                                                                                                                                                                                                                                                   |
| Review checks           | Reject a hover-revealed panel; `reveal` inside a `listbox`, `menu`, or `radiogroup`; `commit` with several entries on a side and no warning; a panel exposed to the tree while closed; any element added to `Item` for the panels; `overflow: hidden` on the group where `clip` is meant; `onActivate` firing before a `hasRemoval` exit completes; a `hasRemoval` row springing back; a second adaptive media query.                                                                                                                                                                                                       |
| Governing rules         | [`architecture:interaction-modality`](../../architecture/interaction-modality.md) INV4, INV6, INV7; [`spec:AST-002`](../AST-002/spec.md) FR1, FR4, FR15, FR16, `DEC-1`; [`architecture:public-component-api`](../../architecture/public-component-api.md) INV2, INV3, INV5.                                                                                                                                                                                                                                                                                                                                                 |

This table is a review projection; the body below is authoritative.

## Intent

On a phone, a person flicks a row sideways to get at a verb — archive,
delete, mark unread, select. Astryx rows do not flick. This record adds the
gesture to `Item`, the shared row, so a mail row, a settings row, and a
picker option all swipe the same way, and so `ListItem` and every other host
that renders an `Item` inherit it without declaring anything.

The gesture is touch-only and is an accelerator: it adds a faster path to a
verb on a coarse pointer and changes nothing on any other input. Each side's
verbs are declared as data — a label that names the state the verb reaches,
an icon, a handler, how it looks, and whether the row leaves — so the
component knows everything it needs before the finger moves: what to paint,
what to fire, and which animation ends the gesture. The row's own root moves
and its panels stay put, so no element is added to any row.

The trigger is [#6821](https://github.com/facebook/astryx/pull/6821), a port
of a shipping product's mail row. The owner's direction on reading it: swipe
actions only, scoped to mobile; both rest-open and fire-on-release; swipe to
activate an option in scope; declared data rather than nodes, because a
removal must be known up front; no new container DOM; no public slots; the
row's own end content is the row's business, not this record's.

## Ownership boundary

**Owns**

- The public shape of `Item`'s swipe actions: `ItemSwipeAction` and its
  fields, the per-side arrays, and `swipeBehavior`.
- The two models, `reveal` and `commit`, and which hosts each may run in.
- The coarse-pointer behavior: rest or fire, the accelerator, spring-back or
  slide-out, the three-way ownership of a removal, one open row at a time,
  and how a row closes.
- The anatomy the gesture uses: two out-of-flow positions on `Item`'s
  existing root, the root's translation and the panels' counter-translation,
  and the group's inline clip.
- The accessibility contract of the gesture itself: what the panel exposes
  while resting and while closed, and that the gesture touches nothing on a
  pointer that can hover.

**Why no existing record can hold it**

- [`architecture:interaction-modality`](../../architecture/interaction-modality.md)
  is `current` and owns the rule the gesture must respect — INV7 "essential
  actions remain reachable" — but owns no public API. A record carries one
  `authority` value, so adding unapproved API claims to it would present
  them as approved (`architecture:knowledge-contracts` INV1, INV14).
- `Item` has no component record. This record is the first durable decision
  about `Item`'s public surface; `component:Item`, when written, inherits
  these claims rather than re-deciding them.
- [`component:List`](../../../packages/core/src/List/List.spec.md) is
  `current` and owns List's geometry; it gains the inline clip and cites
  this record.
- [`spec:AST-002`](../AST-002/spec.md) owns admission: the caller owns which
  verbs earn a gesture, which model fits them, and which remove the row, and
  the component cannot derive any of it.

## Non-goals

- **What else the row offers.** A row's visible controls — a menu or buttons
  in `endContent`, its own primary — are `Item`'s existing composition and
  are not governed, paired, or checked here. The consumer documentation
  states the obligation; the component does not police it.
- **A hover-revealed action panel on a fine pointer** (DEC-4).
- **A render prop for a custom panel.** Deferred, not foreclosed: a
  `render*`-shaped addition can land when a caller needs something the
  vocabulary cannot say (DEC-1).
- **Gesture tuning.** Axis-lock distance, commit ratio, fling velocity, slide
  and spring durations, resistance past the panel: behavior constants in
  source, not public API and not design tokens (the same ruling the touch
  press model received for its clocks).
- **Vertical swipes**, two-finger trackpad swipes, and a swipe whose only
  meaning is dismissal (Toast already has that in `useToastGesture`).
- **Public out-of-flow slots on `Item`.** Deliberately not admitted: the
  panel positions are internal, rendered from `swipeActions`. A second
  consumer — an accent bar, a slide-in checkbox, a drag handle — is a
  `component:Item` anatomy record with its own admission argument.
- **A programmatic open** (OQ3).
- **`reveal` inside menus, listboxes, radio groups.** Those roles cannot
  host a panel of buttons under ARIA; `commit` may run there (DEC-3).
- Equivalent internal implementations remain valid when they satisfy this
  contract. Internal modules, files, function names, algorithms, data
  structures, storage layouts, manifests, journals, locks, transaction
  protocols, and CI job/workflow topology belong in architecture or
  implementation unless callers or interoperating systems intentionally depend
  on that exact mechanism as a public protocol.

## Evidence: in the repository

| Where                                                                                                                                                                                              | What it shows                                                                                                                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Item`'s root: `position: relative`, `borderRadius`, `paddingInline`; no `overflow`, `isolation`, or `z-index`; the focus-within outline is painted on this root; `themeProps('item')` lands on it | The root is already a containing block for absolutely positioned children, and transforming it moves its outline and its theme target with it — nothing on it fights a `transform`. Only the component that owns this element can translate it.                  |
| `Item`'s content: `marker`, a `startContent` span, the label element (a span, an anchor in `href` mode, a `<button>` in `onClick` mode), an `endContent` span — four siblings in every render mode | Nothing can move four siblings as one unit except a common parent. The root is that parent already.                                                                                                                                                              |
| `ListItem` renders `<Item as="li">` directly under `List`'s `<ul role="list">`                                                                                                                     | Any wrapper around the row is a non-`li` child of `<ul>`: invalid HTML and a broken "list, N items" announcement. The gesture has to live on `Item`.                                                                                                             |
| `List`'s root sets no `overflow`                                                                                                                                                                   | A translated row paints past the list's inline edge unless the group clips. `overflow-inline: clip` clips without creating a scroll container; `hidden` would create one and fight the list's vertical scroller.                                                 |
| `useToastGesture` drives Toast's slide by writing `--_toast-swipe-y` onto the root with `style.setProperty`; Toast's styles consume it in `transform`                                              | The in-core way a gesture moves a component without re-rendering it: a custom property on the root, read by CSS.                                                                                                                                                 |
| The AppShell/Field ruling of 2026-09-04: a `z-index` adjustment stays local inside an `isolation: isolate` container                                                                               | The panel must paint above the root's background and below its content; `isolation: isolate` on the root with the panel at `z-index: -1` does that without reaching outside the row.                                                                             |
| `DropdownMenu.items`, `MoreMenu.items`, `DropdownMenuItemData`                                                                                                                                     | Core already declares a verb as data — a label, an icon, a handler, `isDisabled`, a `variant` — and data mode "renders through `DropdownMenuItem`, so the two APIs describe the same thing". `ItemSwipeAction` is that shape with the gesture's two extra facts. |
| `useMenuPress.onActivate(row, release)`, `useTreeFocus.onActivate`, `Selector` and `TreeList` wiring                                                                                               | Core's word for "this row's verb fired" when the path is a release, a key, or a pointer and not a click. A commit fires on release with no click at all.                                                                                                         |
| `hasSearch`, `hasCreate`, `hasPaging`, `hasHomeEnd` vs `isLoading`, `isOpen`, `isDisabled`                                                                                                         | Core's two boolean prefixes: `has*` declares that a thing has a capability; `is*` names a state it is currently in. A declaration of what activation will do is `has*`.                                                                                          |
| `ProgressBar.variant` defaults to `'accent'`                                                                                                                                                       | In-core precedent for `accent` as a variant word and as a default on a filled surface.                                                                                                                                                                           |
| `Item` consumers: `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuSubMenu`, `SelectorOption`, `RadioListItem`, `ListItem`                                    | Five of seven hosts render `Item` with a `menuitem`, `option`, or radio role, where a resting panel of buttons is invalid ARIA; a presentational panel that fires on release is not. That is the line between `reveal` and `commit` (DEC-3).                     |
| `Toast/useToastGesture.ts`                                                                                                                                                                         | A shipped commit-only swipe whose one meaning is dismissal, with constants (`SWIPE_DISMISS_RATIO`) in source.                                                                                                                                                    |
| #6821 real-device feedback                                                                                                                                                                         | On an iOS device the swipe required a press-and-hold before it would start, and the row background did not restore until release. The gesture craft is not yet settled on a device.                                                                              |
| The source product's row (#6821 is its port)                                                                                                                                                       | Its panel names the **state** ("Unread") where a menu would name the sentence ("Mark as unread"). A toggle swipes back; an archived row swipes out; a verb with no single instant (snooze) opens a chooser.                                                      |

## Cases the contract serves

| Case                                                  | Served | How                                                                                                                                                                                                          |
| ----------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Mail: archive and delete                              | Yes    | Two entries in `trailing`, both `hasRemoval`, Delete `variant: 'destructive'`. Under `reveal` the panel rests open with both; a long drag fires the outermost, and the row slides out.                       |
| One destructive action                                | Yes    | One entry with `variant: 'destructive'`. Under `commit` it fires on release.                                                                                                                                 |
| Reversible toggle (read/unread, pin/flag)             | Yes    | `label` names the state the verb reaches ("Unread"); the row springs back wearing it (FR5).                                                                                                                  |
| Archive — removes the row but is not destructive      | Yes    | `hasRemoval` without `variant: 'destructive'`: the row slides out in the accent colour. The two axes are independent (DEC-1).                                                                                |
| Soft delete with Undo — destructive but row stays     | Yes    | `variant: 'destructive'` without `hasRemoval`: the row springs back.                                                                                                                                         |
| More than two actions                                 | Yes    | N entries on a side, outermost last. Under `reveal` each is a button.                                                                                                                                        |
| An action that confirms or opens a chooser            | Yes    | Not a `hasRemoval` action: the row springs back and `onActivate` opens the dialog; the caller removes the row itself on confirmation. A verb with no single instant (snooze) commits to opening its chooser. |
| Rows in a virtualized list                            | Yes    | Open state is the row's own; a row that unmounts takes it along. A mostly vertical drag stays the scroller's (FR6).                                                                                          |
| Rows that are links (`href`)                          | Yes    | The axis lock separates the drag from the tap, and the click the browser synthesizes after a drag is swallowed (FR6).                                                                                        |
| `role="list"` rows                                    | Yes    | `ListItem` inherits the prop; arbitrary interactive children are valid, so both models run.                                                                                                                  |
| Swipe to activate a picker option                     | Yes    | One entry for the option's own verb and `swipeBehavior="commit"`; the panel is presentational, so it is valid inside a `listbox`.                                                                            |
| `reveal` on `listbox` options, `menuitem`, radio rows | **No** | ARIA forbids interactive descendants of `option` and `menuitem`; `Item` warns in development (FR10).                                                                                                         |
| A panel the vocabulary cannot draw                    | **No** | Not in this record. A `render*` addition is the deferred route (DEC-1).                                                                                                                                      |
| Dismiss-only swipe (Toast)                            | **No** | Owned by `useToastGesture`; a different concept with one meaning per direction.                                                                                                                              |

## Public API and concepts

| Concept                  | Closed values or states                                                                                                                                                 | Meaning                                                                                                                                                                                                                                                                                                                                                | Default  | Owner                       | Stability |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | --------------------------- | --------- |
| `Item.swipeActions`      | `{leading?: ItemSwipeAction[]; trailing?: ItemSwipeAction[]}`                                                                                                           | The verbs a sideways drag uncovers on each side, outermost last. `leading` is uncovered by a drag toward the inline end, `trailing` by one toward the inline start. Inherited by `ListItem` and every host that renders an `Item`.                                                                                                                     | absent   | `spec:AST-057`              | proposed  |
| `ItemSwipeAction`        | `{id?: string; label: string; icon?: ReactNode; onActivate: () => void \| Promise<void>; isDisabled?: boolean; variant?: ItemSwipeActionVariant; hasRemoval?: boolean}` | One verb. `Item` renders it as a filled surface in its `variant`'s colour with the icon above the label; `label` is the button's accessible name under `reveal` and names the **state** the verb reaches ("Unread"). Every field is known before the gesture begins.                                                                                   | —        | `spec:AST-057`              | proposed  |
| `ItemSwipeActionVariant` | `'neutral'` \| `'accent'` \| `'destructive'`                                                                                                                            | How the action looks: ordinary, the one you mean, the dangerous one. Not a status set — a verb is not a state. Independent of `hasRemoval`. Shared with `spec:AST-058`'s `OptionAction`, whose default is `neutral`.                                                                                                                                   | `accent` | `spec:AST-057`              | proposed  |
| `hasRemoval`             | `false`, `true`                                                                                                                                                         | The action declares that activating it removes the row. With it, `Item` slides the row out of the side it was travelling toward, stays out, and then fires `onActivate`; the caller drops the row from its data; the list collapses the gap. Without it, the row springs back wearing its new state. All four combinations with `variant` occur.       | `false`  | `spec:AST-057`              | proposed  |
| `onActivate`             | called on tap of a resting panel, on the full-swipe accelerator, and on a `commit` release                                                                              | Core's word for a verb firing by any path. Not `onClick`: a commit fires with no click. Without `hasRemoval` it fires at activation; with `hasRemoval` once the exit completes, against a stable frame.                                                                                                                                                | —        | `spec:AST-057`              | proposed  |
| `Item.swipeBehavior`     | `'reveal'` \| `'commit'`                                                                                                                                                | `reveal`: past the panel's width the row rests open with every entry a real button; a long drag or fling fires the outermost. `commit`: a release past the commit point fires the outermost entry; nothing rests; the panel is presentational; valid for one entry per side, warns with more. "Swipe to activate" is `commit` with the row's own verb. | `reveal` | `spec:AST-057`              | proposed  |
| the panels               | two out-of-flow positions on `Item`'s root                                                                                                                              | Absolutely positioned children of the existing root at the inline start and end, painting above the root's background and below its content; present only when the side has entries. Internal anatomy with a theme target; not public slots.                                                                                                           | —        | `spec:AST-057`              | proposed  |
| the drag's travel        | a private custom property on the row root                                                                                                                               | Written by the gesture during a drag. The root's `transform` reads it; each panel's `transform` reads its negation, so the row moves and the panel appears fixed in the space the row vacates.                                                                                                                                                         | `0px`    | `spec:AST-057`              | proposed  |
| the group's clip         | `overflow-inline: clip` on the element containing the rows                                                                                                              | A moving row paints past its group's inline edge unless the group clips. `List` sets it; a host that renders `Item`s outside `List` sets it once. `Item` cannot clip itself: it is the thing moving.                                                                                                                                                   | —        | `component:List` / the host | proposed  |
| open state               | closed, resting open                                                                                                                                                    | The row's own. A pointer landing anywhere outside a resting row closes it, which is also how a drag on a neighbour closes it; no group state exists.                                                                                                                                                                                                   | closed   | `spec:AST-057`              | proposed  |
| the modality split       | internal                                                                                                                                                                | A mouse never starts the drag; a coarse pointer does. Read from the pointer event, not a prop or a media query (`architecture:interaction-modality` INV6).                                                                                                                                                                                             | —        | `spec:AST-057`              | proposed  |

Not public: axis-lock distance, commit ratio, fling velocity, durations,
resistance, panel widths, the custom property's name. They are behavior
constants.

## Requirements

### Behavioral contract

| ID   | Invariant                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Basis                                                                           | Verification state                                              |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| FR1  | `Item` MUST take its swipe actions as `swipeActions: {leading?: ItemSwipeAction[]; trailing?: ItemSwipeAction[]}`, where `ItemSwipeAction` is `{id?, label: string, icon?: ReactNode, onActivate, isDisabled?, variant?: 'neutral' \| 'accent' \| 'destructive', hasRemoval?: boolean}` with `variant` defaulting to `accent`. An entry MUST NOT carry a node the component renders as the control. `ListItem` MUST pass the prop through unchanged.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | DEC-1; `DropdownMenuItemData`; `useMenuPress.onActivate`; `ProgressBar.variant` | Proposed; no evidence on `main`                                 |
| FR2  | `Item` MUST render each side's panel from its entries into an out-of-flow position on its existing root and MUST add no element to the row for it. The gesture MUST drive the row's travel by writing a custom property on the root; the root's transform MUST read it and each panel's transform its negation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | DEC-5; `useToastGesture`                                                        | Proposed; real-Chromium evidence required                       |
| FR3  | `swipeBehavior` MUST be one enum with the closed values `reveal` and `commit`, default `reveal`. `commit` with more than one entry on a side MUST warn in development, because the other entries have no touch path.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | DEC-2; `spec:AST-002` FR15                                                      | Proposed                                                        |
| FR4  | A sideways drag on a coarse pointer MUST move the row and uncover the side's panel, showing each entry's `label` and `icon` as a filled surface in its `variant`'s colour; the panel MUST NOT be visible at rest, by any pixel.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | #6821 review (resting-panel sliver)                                             | Proposed; real-Chromium evidence required                       |
| FR5  | Under `reveal`, a release past the panel's width MUST leave the row resting open with every entry tappable, and a drag past the commit point or a fling MUST fire the **outermost** entry and no other. Under `commit`, a release past the commit point or a fling MUST fire the outermost entry and nothing MUST rest. A release short of the threshold MUST spring back under both. Without `hasRemoval`, the row MUST spring back and `onActivate` fires at activation. With `hasRemoval`, the row MUST slide out of the side it was travelling toward, MUST stay out, and MUST fire `onActivate` once the exit completes; under `commit` the exit IS the commit travel, not a second animation. `Item` owns both animations; the caller owns removing the row from its data; the list owns collapsing the gap. A `hasRemoval` row still mounted a beat after its exit MUST warn in development. `onActivate` may return a Promise. | DEC-1, DEC-2; UIKit `performsFirstActionWithFullSwipe`; source product          | Proposed; real-device evidence required                         |
| FR6  | The drag MUST decide its axis once, early, and a mostly vertical drag MUST stay the scroller's. A mouse MUST NOT start the drag. The click the browser synthesizes after a drag MUST NOT fire the row's primary action.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | #6821's gesture; press-model ORD1                                               | Proposed; device feedback on #6821 shows the first is unsettled |
| FR7  | A resting row MUST close on a pointer landing anywhere outside it, on Escape with focus inside it, on firing an entry, and on unmount. Because a drag on a neighbour is a pointer outside it, at most one row rests open at a time without any shared state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | DEC-3; SwiftUI `swipeActionsContainer()` for the outcome                        | Proposed                                                        |
| FR8  | Directions MUST be logical: `trailing` is uncovered by a drag toward the inline start and sits at the inline end; `leading` the reverse; so the finger, the uncovered edge, and the panel agree under RTL. A `hasRemoval` exit continues in the direction of travel.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | #6821; `architecture:public-component-api` INV2 (logical direction)             | Proposed                                                        |
| FR9  | The element containing swipe-capable rows MUST clip in the inline axis with `overflow-inline: clip`, never `hidden`. `List` MUST set it; `Item`'s consumer documentation MUST state the obligation for any other host.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | DEC-5; `List` root styles                                                       | Proposed                                                        |
| FR10 | `reveal` MUST warn in development when the row's root is inside a `listbox`, `menu`, or `radiogroup`, derived from the rendered DOM; `commit` runs there without warning.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | DEC-3; ARIA allowed-children rules                                              | Proposed                                                        |

### Accessibility contract

- **AR1 — The panel is real while resting and absent while closed.** Under
  `reveal`, while the row rests open each entry MUST be a real, focusable
  `<button>` named by `label`, so a touch screen reader that lands on it can
  activate it; while closed the panel MUST be out of the accessibility tree
  and the tab order. Under `commit` the panel MUST be presentational
  (`aria-hidden`) at all times, because nothing in it is ever tappable.
- **AR2 — The gesture touches nothing on a pointer that can hover.**
  `swipeActions` MUST have no effect on the tab order, the accessible tree,
  or the row's paint on such a pointer. Hover MUST NOT uncover the panel.
- **AR3 — The row's primary stays one tab stop.** `swipeActions` MUST NOT
  change the primary element's role, name, or activation, and MUST add no
  stop while closed.
- **Stated in documentation, not enforced:** a swipe is a touch accelerator,
  so a verb reachable only by swipe is unreachable by keyboard and by mouse.
  The consumer documentation of `swipeActions` MUST say so and MUST show the
  verb also reachable through the row's own content. The component does not
  inspect what else the row offers.

### Platform support

- Supported feature/engine floor: every supported renderer and browser.
  Pointer type is read from the pointer event.
- Unsupported behavior: a device that never produces a coarse pointer gets
  no swipe and nothing else changes.
- Browser evidence: FR2 and FR4–FR9 are paint and gesture claims. jsdom has
  neither; real-Chromium evidence with dispatched touch is required, and
  FR5/FR6 additionally need a physical touch device because #6821's device
  feedback contradicts its Chromium evidence.

## Current-state impact

- `Item` gains `swipeActions`, `swipeBehavior`, the exported types
  `ItemSwipeAction` and `ItemSwipeActionVariant`, two out-of-flow panel
  positions on its root with a theme target, and the root and panel
  transforms. No new element, no gesture on any row that does not ask for
  it. `component:Item`, when written, inherits these claims.
- `ListItem` inherits both props through its existing `Item` passthrough.
- `component:List` gains the inline clip on `List`'s root, citing this
  record.
- `architecture:interaction-modality` gains `spec:AST-057` in its deciding
  specs; no invariant changes.
- `contributing:api-conventions` gains the rule this record relies on: a
  gesture is an accelerator and never a component's only path to its own
  behavior.
- `spec:AST-058` ([#6910](https://github.com/facebook/astryx/pull/6910))
  shares the verb vocabulary and `onActivate`; `hasRemoval` is this record's
  alone. Whether the two action types are siblings is OQ1 on both records.
- [#6821](https://github.com/facebook/astryx/pull/6821) is superseded in
  shape by this record; its commit-only model survives as
  `swipeBehavior="commit"` and its gesture engineering — axis lock, logical
  directions, click suppression, reduced-motion handling, the Chromium
  harness — is the starting point for FR4–FR8 once the device findings are
  resolved. Its clipping container does not survive (DEC-5).
- No shipped public API changes on this record's own merge.
- While this record is `draft` its `review-applicability:v1` block routes
  nothing: global routing loads `current` claims only
  (`architecture:knowledge-contracts` INV20).

## Verification

| Contract      | Verification                                                                                       | Representative states                                                                                                                                                                                   | Mutation or failure expectation                                                                                                                                                                                                                                         |
| ------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR1, FR3      | `Item` and `ListItem` prop-surface suites plus exported-type checks                                | One, two, and four entries per side; every `variant` × `hasRemoval` combination; `commit` with two entries on a side                                                                                    | A field with a node the row renders as the control, a silent multi-entry `commit`, or `ListItem` reshaping the prop fails.                                                                                                                                              |
| FR2           | `Item` DOM snapshot suite plus real-Chromium evidence                                              | No swipe actions; one side; both sides; each render mode (`onClick`, `href`, delegation, parent role); mid-drag                                                                                         | A new element in any row, a changed DOM on an existing row, a panel that moves with the row, or a panel painted under the root's background or over the content fails.                                                                                                  |
| FR4–FR6, FR8  | Real-Chromium dispatched-touch evidence plus physical-device check; RTL via the direction provider | Rest; release short, past the panel, past the commit point, fling; both models; both sides; `hasRemoval` and plain entries; a `hasRemoval` row the caller never removes; vertical drag; mouse drag; RTL | A resting sliver, an immediate fire under `reveal`, a rest under `commit`, the wrong entry fired, a `hasRemoval` row that springs back, a plain row that slides out, `onActivate` before the exit, a missing warning on a row never removed, or a mirrored panel fails. |
| FR7           | `Item` suite with two rows under one parent                                                        | Open one, drag the other; outside tap; Escape; entry fired; unmount                                                                                                                                     | Two rows resting open, or a row that stays open after any closing event, fails.                                                                                                                                                                                         |
| FR9           | `List` style assertion plus real-Chromium evidence of a row dragged past the edge                  | A row at the list's inline edge mid-drag; the list scrolled vertically                                                                                                                                  | A horizontal scrollbar, the row painting past the list, or `hidden` where `clip` is specified fails.                                                                                                                                                                    |
| FR10          | Development-warning suite over rendered DOM                                                        | `reveal` inside a `listbox`; `commit` inside a `listbox`; `reveal` inside a `list`                                                                                                                      | A missing or false warning fails.                                                                                                                                                                                                                                       |
| AR1–AR3       | Accessible-tree and tab-order assertions, open and closed, both models; hovering-pointer evidence  | Closed; resting open; `commit` mid-drag; touch screen-reader cursor on an entry; hover and Tab on a fine pointer                                                                                        | A panel exposed while closed, a `commit` panel in the tree, an entry without a name while resting, a changed primary, or any effect on a fine pointer fails.                                                                                                            |
| Documentation | Consumer-doc check on `swipeActions`                                                               | The prop's documentation                                                                                                                                                                                | A doc that does not state the keyboard consequence, the `hasRemoval` obligation, or the group clip fails.                                                                                                                                                               |

Known verification gap: none of the suites above exist on `main`, and no
component implements the contract. This record is `draft`, does not govern
review, and names no implementation.

## Decision log

Every decision below is **proposed**. None has been ruled on; `approved_by`
is `null` and the record is `draft`.

### DEC-1 — Swipe actions are declared as data; `hasRemoval` is why

**Reference:** `spec:AST-057/DEC-1`
**Decider:** `cixzhang`, `2026-10-02` (direction; record pending)

`swipeActions.leading` and `.trailing` are `ItemSwipeAction[]`: `{id?, label,
icon?, onActivate, isDisabled?, variant?, hasRemoval?}`. `Item` renders each
entry — under `reveal` as a real button, under `commit` as a presentational
block — and paints the panel during the drag from the data.

Every field is known before the gesture begins, so the component picks the
right animation up front: a `hasRemoval` entry ends in a slide-out, any
other in a spring-back. That is what a declared shape gives and a node
cannot: a caller's own node has no way to say the row will leave, or to be
committed on release, without registering through a context — which splits
the API into shipped nodes that get the behavior and arbitrary nodes that
silently do not. Core already declares a verb as data in `DropdownMenu.items`
and `MoreMenu.items`, and two independent recall probes (3/3 in this record's
vibe test, `internal/vibe-tests/row-actions-shape-test/RESULTS.md`; 3/3 in
[#6909](https://github.com/facebook/astryx/pull/6909)) found builders
reaching for exactly this array with no prop names given, and none reaching
for child components or a render prop.

The vocabulary: `onActivate` is core's word for a row's verb firing by a
path that is not a click (`useMenuPress`, `useTreeFocus`, `Selector`,
`TreeList`), and a commit fires on release with no click at all. `variant`
is `'neutral' | 'accent' | 'destructive'` — three flavours of verb, not a
status set, because a verb is not a state; `accent` is the default because
a swipe panel is a filled surface that has to be some colour, and
`ProgressBar` already defaults a filled surface to `accent`. `hasRemoval`
takes the `has*` prefix because it declares what activation will do; `is*`
names a state the thing is in, so `isRemoving` would read as progress.

`hasRemoval` and `variant` are independent axes and all four combinations
occur: Archive removes a row from an inbox without being destructive, and a
soft Delete with Undo is destructive while the row stays. A removal is owned
three ways and no one party can do it alone: the caller owns the data and is
the only one who can unmount the row; `Item` owns the exit, because it is
the element translating, so it slides itself out of the side it was
travelling toward and stays out; the list owns the gap, which it collapses
after the exit. `onActivate` fires once the exit completes so the handler
runs against a stable frame. `hasRemoval` is therefore a promise the caller
makes — a row still mounted a beat after its exit warns in development,
because `Item` cannot tell slow removal from none and springing back on a
timeout would be wrong whenever removal is merely slow. One consequence is
stated rather than hidden: an action that must confirm before removing is
not a `hasRemoval` action, because the exit would precede the dialog that may
cancel it; it springs back, asks, and the caller removes the row on
confirmation.

Composition is deferred, not lost: a `render*`-shaped addition for a panel
the vocabulary cannot draw can land when a caller needs it.

Rejected: nodes per side with a shipped `ItemSwipeAction` component — it
needed context registration for `commit` and for removal, and left any
caller-supplied node silently without both. Rejected: one action per side
with `onAction` and a four-tone `tone` (#6821) — a second verb vocabulary.
Rejected: folding removal into `variant` — Archive would have to be
destructive to leave. Rejected: always springing back and leaving removal to
the caller's unmount — an archived row visibly springing back and then
vanishing reads as a glitch. Rejected: firing `onActivate` before the exit —
the caller's data changes while the row is still animating. Rejected: a
removal-edge field — the row is already travelling, and reversing
mid-animation reads as a yank.

### DEC-2 — Rest is the default; commit is a caller choice for one verb

**Reference:** `spec:AST-057/DEC-2`
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
what the source product chose for its one-verb rows. A `hasRemoval` commit
needs no second animation: the exit is the commit travel.

Rejected: commit-only as the sole model (#6821) — it cannot grow into
resting without a default change. Rejected: a boolean `hasFullSwipe` — under
`reveal` the full swipe is already on and under `commit` it is the whole
behavior, so a boolean gates the wrong axis.

### DEC-3 — The capability is `Item`'s; `ListItem` inherits it; the model follows the host's role

**Reference:** `spec:AST-057/DEC-3`
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
compose — one-open-at-a-time was its reason to exist as group state, and
outside-close gives the same outcome with nothing shared.

### DEC-4 — No hover reveal

**Reference:** `spec:AST-057/DEC-4`
**Decider:** `cixzhang`, `2026-10-02` (direction; record pending)

On a pointer that can hover, `swipeActions` does nothing. The gesture is a
touch accelerator and changes nothing on any other input; what a row offers
a mouse or a keyboard is the row's own content, which this record does not
govern.

Rejected: a reveal axis that rendered the same actions as hover-revealed
buttons on a fine pointer — a second surface for verbs the row's content can
already carry. [React Aria's iOS List example](https://react-aria.adobe.com/examples/ios-list)
takes that route (a panel button in the tree, revealed on focus) and is the
alternative this decision sets aside.

### DEC-5 — The root translates and the panels counter-translate; no element is added

**Reference:** `spec:AST-057/DEC-5`
**Decider:** `cixzhang`, `2026-10-02` (direction; record pending)

`Item` renders each side's panel as an absolutely positioned child of its
existing root, at the inline start or end, above the root's background and
below the content. The drag writes its travel as a custom property on the
root — the way `useToastGesture` writes `--_toast-swipe-y` — the root's
transform reads it, and each panel's transform reads its negation, so the
row moves and the panel appears fixed in the space the row vacates. Both are
compositor transforms and the cancellation is exact. No element is added to
any row. The group clips with `overflow-inline: clip`. The positions are
internal: no public slot is admitted for them.

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
instead of a compositor transform. Rejected: public `beforeContent` /
`afterContent` slots — nothing in this record needs them, and general
anatomy takes its own admission.

## Open questions

- **OQ1 — Are `ItemSwipeAction` and `spec:AST-058`'s `OptionAction` siblings sharing one vocabulary, or one type?** (`human-api`)

  [#6910](https://github.com/facebook/astryx/pull/6910) has settled its
  side: `OptionAction` with `onActivate` and `variant: 'neutral' | 'accent' |
'destructive'`, `neutral` as the picker default, and it names `hasRemoval`
  as this record's alone. The vocabulary and handler are identical; the two
  surfaces differ in paint and default — a swipe panel is a filled block in
  `accent`, an option action a small `neutral` control on the panel's own
  background — and only the swipe carries `hasRemoval`. The recommendation,
  agreeing with AST-058, is siblings: two types sharing the field names, not
  one type with fields half of its users ignore.

- **OQ2 — Does `ItemSwipeAction` default to `accent` on both models, or to `neutral` under `reveal` where several sit side by side?** (`human-design`)

  A lone `commit` panel wants the accent; three resting buttons all in accent
  may want the ordinary one with `accent` on the one that matters. The
  recommendation is `accent` everywhere, as directed, with the caller
  choosing `neutral` for the others.

- **OQ3 — Does a product need to open or close a row programmatically?** (`checkable`)

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
theming targets, or geometry contracts; the modality invariants in
`architecture:interaction-modality`; the admission argument in
`spec:AST-002`; the press model in `module:DropdownMenu/useMenuPress`; or the
gesture constants an implementation will hold in source. It links their
canonical owners.

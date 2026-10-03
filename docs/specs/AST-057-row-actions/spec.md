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
affects_consumer_docs: [List, ListItem, Item, MoreMenu]
review_triggers: [public-api, accessibility, behavior]
---

# Swipe actions as an accelerator over the row's menu system spec

<!-- review-applicability:v1 -->

```json
{
  "scope": "global",
  "triggers": {
    "public-api": ["FR1", "FR2", "FR3", "FR9", "DEC-1", "DEC-2", "DEC-5"],
    "accessibility": ["AR1", "AR2", "AR3", "AR4"],
    "behavior": ["FR4", "FR5", "FR6", "FR7", "FR8", "DEC-3", "DEC-4"]
  }
}
```

## Contract at a glance

| Area                    | Contract                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Public contract         | A list row's secondary verbs live in a control the row already carries — its overflow menu in `endContent` — on every input. A touch swipe is an **accelerator** over those verbs: `ListItem.swipeActions` declares, as data in the menu-row vocabulary, which of them a sideways drag reaches (DEC-1, DEC-2). There is no hover reveal and no second presentation of the menu (DEC-5). Whether the drag rests open or fires on release is the caller's choice, `swipeBehavior` (DEC-3). The capability lives on `ListItem`, not on `Item` (DEC-4). |
| Behavior                | On a coarse pointer a sideways drag reveals a panel beside the row naming the state each action reaches. Under `reveal` (default) the row rests open so each is tappable and a long drag fires the last one; under `commit` the last one fires on release and the row never rests. A short release springs back. After an action fires the row springs back unless the action removes it. A mouse never starts the drag; a mostly vertical drag stays the scroller's; one row is open per list.                                                     |
| End-user impact         | A person on a phone gets the flick they expect; a person at a laptop uses the menu the row already shows; a keyboard or screen-reader user reaches every verb through that menu, because the swipe never carries a verb the menu lacks. A swipe and a menu item on the same row cannot reach different state.                                                                                                                                                                                                                                       |
| Builder impact          | One array on `ListItem`, in the shape `MoreMenu.items` already takes, plus one enum. The builder gives the swipe the handlers the menu already calls. No gesture code, no media queries. New obligation, checked in development: a row with `swipeActions` must carry another interactive control.                                                                                                                                                                                                                                                  |
| Compatibility/readiness | Additive: both props are absent by default and every current row is unchanged. `Item` gains nothing. Authority: `draft`; `approved_by` is `null`. Seven owner questions are open; OQ1–OQ5 change the public shape, OQ6–OQ7 do not.                                                                                                                                                                                                                                                                                                                  |
| Review checks           | Reject a swipe that is the only path to a verb; a hover-revealed copy of the menu; a reveal axis on the prop; `commit` with several entries and no warning; a panel that stays hidden from the tree while a control inside it can take focus; swipe added to `Item`, a `menuitem`, an `option` or a radio row; a second adaptive media query on `List`.                                                                                                                                                                                             |
| Governing rules         | [`architecture:interaction-modality`](../../architecture/interaction-modality.md) INV4, INV6, INV7; [`spec:AST-002`](../AST-002/spec.md) FR1, FR4, FR15, FR16, `DEC-1`; [`architecture:public-component-api`](../../architecture/public-component-api.md) INV2, INV3, INV5; `component:DropdownMenu` for the item-data vocabulary this record reuses.                                                                                                                                                                                               |

This table is a review projection; the body below is authoritative.

## Intent

A list row often has a verb or two beyond opening it: archive, delete, pin,
mark read. On a phone the person flicks the row sideways. At a laptop, and
with a keyboard or a screen reader, the row carries those verbs somewhere
visible and reachable — its overflow menu at the row's end. One set of verbs,
two surfaces.

Astryx has the menu (`MoreMenu` in `endContent`) and not the flick. This
record adds the flick as what it is in the product that first built it: a
touch accelerator over verbs the row's menu already acts through, declared
in the menu's own vocabulary so a swipe and a menu item on the same row
cannot reach different state. It also places the capability on the list row,
where a panel of buttons is valid, and keeps it off `Item`, which is also the
menu row and the option row.

The trigger is [#6821](https://github.com/facebook/astryx/pull/6821), a port
of that product's row onto `Item`; the owner's direction on reading it is that
the prop is swipe actions only and the desktop counterpart is the menu.

## Ownership boundary

**Owns**

- That a row's swipe actions are declared once, as data in the menu-row
  vocabulary, and are an accelerator over verbs the row already exposes
  through a visible control.
- That no hover reveal, and no second presentation of the menu, is added to
  a list row for this purpose.
- The coarse-pointer behavior: reveal-and-rest or commit-on-release, the
  accelerator, spring-back, one open row, and how it closes.
- The accessibility floor: the swipe is never the only path, the panel is
  real buttons while open and out of the tree while closed, and a row with
  swipe actions must carry another interactive control.
- Which host carries the capability (`ListItem`) and which does not (`Item`,
  and every row with a `menuitem`, `option`, or radio role).

**Why no existing record can hold it**

- [`architecture:interaction-modality`](../../architecture/interaction-modality.md)
  is `current` and owns the rule this record applies — INV7 "essential
  actions remain reachable" in every modality — but owns no public API that
  satisfies it. A record carries one `authority` value, so adding unapproved
  API claims to it would present them as approved
  (`architecture:knowledge-contracts` INV1, INV14).
- [`component:List`](../../../packages/core/src/List/List.spec.md) is
  `current` and owns List's geometry. The same authority problem applies, and
  the decision is not List-local: it rules on `Item` (which must not host
  it), reuses `component:DropdownMenu`'s item vocabulary, and sets a shape
  rule — a gesture accelerates verbs the row already exposes — that the next
  row-shaped component will meet. `component:List` becomes the first adopter
  and cites this record.
- `component:DropdownMenu` owns `DropdownMenuItemData`; this record reuses
  that vocabulary and does not change it.
- `Item` has no component record. Writing one to say "not here" would create
  a record for a non-change; the boundary is DEC-4.
- [`spec:AST-002`](../AST-002/spec.md) owns admission: the caller owns which
  verbs earn a gesture and which model fits them (FR1), and the component
  cannot derive either; this record sits downstream of it.

## Non-goals

- **A hover-revealed action panel on a fine pointer.** Rejected in DEC-5; a
  product that wants verbs visible at the row's end composes a `MoreMenu` or
  buttons into `endContent`, as today.
- **Gesture tuning.** Axis-lock distance, commit ratio, fling velocity, slide
  and spring durations, resistance past the panel: behavior constants in
  source, not public API and not design tokens (the same ruling the touch
  press model received for its clocks).
- **Vertical swipes**, two-finger trackpad swipes, and a swipe whose only
  meaning is dismissal (Toast already has that in `useToastGesture`).
- **A controlled open state** and an imperative close handle (OQ7).
- **Rows outside `List`**: Table rows, TreeList rows, ChatMessage toolbars,
  Card rows.
- **Menus, listboxes, radio groups.** Rows with `menuitem`, `option`, or
  radio roles cannot host a panel of buttons under ARIA; see DEC-4.
- Equivalent internal implementations remain valid when they satisfy this
  contract. Internal modules, files, function names, algorithms, data
  structures, storage layouts, manifests, journals, locks, transaction
  protocols, and CI job/workflow topology belong in architecture or
  implementation unless callers or interoperating systems intentionally depend
  on that exact mechanism as a public protocol.

## Evidence: in the repository

| Where                                                                                                                                                           | What it shows                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`architecture:interaction-modality`](../../architecture/interaction-modality.md) INV4, INV7                                                                    | "Hover is never the only discovery or activation path." "Every supported modality has a perceivable and operable path" to an essential action. A swipe-only panel with a documented obligation fails INV7 by construction.                                                                              |
| `DropdownMenu.items: DropdownMenuOption[]`, `MoreMenu.items`, `DropdownMenuItemData`                                                                            | Core already declares verbs as data: `{id?, label, icon, onClick, isDisabled, variant: 'default' \| 'destructive', …}`, and data mode "renders through `DropdownMenuItem`, so the two APIs describe the same thing and must not drift". The vocabulary the swipe should reuse.                          |
| `Item.endContent` doc: "badges, metadata, timestamps, or action buttons"; `SideNavItem.actions?: ReactNode`                                                     | Row actions are built today by composing controls into `endContent`, always visible. That is the permanent surface this record keeps.                                                                                                                                                                   |
| `Item` consumers: `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuSubMenu`, `SelectorOption`, `RadioListItem`, `ListItem` | Five of seven hosts render `Item` with a `menuitem`, `option`, or radio role, where an embedded button is invalid ARIA. Only `ListItem` (`role="list"`) permits arbitrary interactive children — the same boundary the owner drew on 2026-10-02 for per-row actions in a listbox.                       |
| `useAdaptivePresentation` / `COMPACT_TOUCH_PRESENTATION_QUERY`                                                                                                  | The system's adaptive split for overlays is `(max-width: 768px) and (pointer: coarse)`, and the owner ruled a component gets one adaptive query. With no hover reveal the swipe needs only "can this pointer drag", which is pointer capability, not width (OQ4).                                       |
| `Toast/useToastGesture.ts`                                                                                                                                      | A shipped commit-only swipe whose one meaning is dismissal, with constants (`SWIPE_DISMISS_RATIO`) in source. The Compose model is already in core where it fits.                                                                                                                                       |
| #6821 real-device feedback                                                                                                                                      | On an iOS device the swipe required a press-and-hold before it would start, and the row background did not restore until release. The gesture craft the pull request is credited with is not yet settled on a device.                                                                                   |
| The source product's row (#6821 is its port)                                                                                                                    | Carries the `…` menu in `endContent` on every row and a touch-only swipe whose verbs are the menu's handlers. Its panel names the **state** ("Unread") where the menu names the sentence ("Mark as unread"). A toggle swipes back; a removal swipes out; a verb with no single instant opens a chooser. |

## Cases the contract serves

| Case                                             | Served | How                                                                                                                                                                   |
| ------------------------------------------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mail: archive and delete                         | Yes    | Both in the row's `MoreMenu`; both in `swipeActions` with the same handlers. Under `reveal` the panel rests open with two buttons; a long drag fires the last.        |
| One destructive action                           | Yes    | One menu item, one swipe action, `variant: 'destructive'`. Under `commit` it fires on release. A handler that confirms first opens its dialog from a sprung-back row. |
| Reversible toggle (read/unread, pin/flag)        | Yes    | The panel label names the state the verb reaches ("Unread"); the menu names the sentence ("Mark as unread"); one handler. The row springs back after firing (FR5).    |
| More than two actions                            | Yes    | The menu holds all of them; `swipeActions` holds the few that earn a gesture. Under `reveal` the panel holds N buttons.                                               |
| An action that opens a confirm or a chooser      | Yes    | `onClick` opens the dialog from a sprung-back row; a verb with no single instant (snooze) commits to opening its chooser.                                             |
| Rows in a virtualized list                       | Yes    | One open row per list (FR7); a row that unmounts closes. A mostly vertical drag stays the scroller's (FR6).                                                           |
| Rows that are links (`href`)                     | Yes    | The axis lock separates the drag from the tap, and the click the browser synthesizes after a drag is swallowed (FR6).                                                 |
| `role="list"` rows                               | Yes    | The host. Arbitrary interactive children are valid.                                                                                                                   |
| `role="listbox"` options, `menuitem`, radio rows | **No** | ARIA forbids interactive descendants of `option` and `menuitem`; these rows keep `Item` as it is (DEC-4).                                                             |
| Dismiss-only swipe (Toast)                       | **No** | Owned by `useToastGesture`; a different concept with one meaning per direction.                                                                                       |

## Public API and concepts

| Concept                  | Closed values or states                                                                                                                            | Meaning                                                                                                                                                                                                                                                                     | Default  | Owner            | Stability |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------- | --------- |
| `ListItem.swipeActions`  | `ListItemActionData[]`                                                                                                                             | The verbs a sideways drag reaches on a coarse pointer, in order; the last entry sits at the row's outer edge and is the one a long drag fires. Each must also be reachable through another control the row carries (AR1).                                                   | absent   | `spec:AST-057`   | proposed  |
| `ListItemActionData`     | `{id?: string; label: string; icon?: ReactNode; onClick: () => void \| Promise<void>; isDisabled?: boolean; variant?: 'default' \| 'destructive'}` | One verb, in `DropdownMenuItemData`'s field vocabulary so the same object can feed `MoreMenu.items`. `label` is the panel's text and the button's accessible name; it names the **state** the verb reaches ("Unread"), which is why it may differ from the menu's sentence. | —        | `component:List` | proposed  |
| `ListItem.swipeBehavior` | `'reveal'` \| `'commit'`                                                                                                                           | `reveal`: past the panel's width the row rests open with every entry tappable; a long drag or fling fires the last. `commit`: a release past the commit point fires the last entry and the row never rests; valid for one entry, warns with more.                           | `reveal` | `spec:AST-057`   | proposed  |
| after an action fires    | springs back                                                                                                                                       | The row returns to rest. A removal's exit is the list's or the caller's, not assumed by the gesture (OQ6 weighs letting a descriptor declare it).                                                                                                                           | —        | `spec:AST-057`   | proposed  |
| the modality split       | internal                                                                                                                                           | A mouse never starts the drag; a coarse pointer does. Derived from browser input, not a prop (`architecture:interaction-modality` INV6; OQ4).                                                                                                                               | —        | `spec:AST-057`   | proposed  |
| the permanent surface    | caller-composed                                                                                                                                    | The row's verbs live in a control the caller composes into `endContent` — a `MoreMenu` or buttons — on every input. Not a new concept; named so AR1 can point at it.                                                                                                        | —        | the caller       | shipped   |

Not public: axis-lock distance, commit ratio, fling velocity, durations,
resistance, panel widths. They are behavior constants.

## Requirements

### Behavioral contract

| ID  | Invariant                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Basis                                                                                 | Verification state                                              |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| FR1 | A list row MUST take its swipe actions as one array of descriptors, `swipeActions: ListItemActionData[]`, whose fields keep the names and meanings of `DropdownMenuItemData` (`id`, `label`, `icon`, `onClick`, `isDisabled`, `variant`) so one object can serve the swipe and a `MoreMenu`. The panel MUST render one real `<button>` per entry, in order, named by `label`. A descriptor MUST NOT carry a node the component renders as the control.                                                                                                                               | DEC-1; `DropdownMenu.items`, `MoreMenu.items`                                         | Proposed; no evidence on `main`                                 |
| FR2 | There MUST be no reveal axis on the prop and no hover-revealed presentation of the actions on a pointer that can hover. The swipe actions MUST be inert on such a pointer; the row's visible controls are the path there.                                                                                                                                                                                                                                                                                                                                                            | DEC-5; owner direction 2026-10-02                                                     | Proposed                                                        |
| FR3 | `swipeBehavior` MUST be one enum with the closed values `reveal` and `commit`, default `reveal`. `commit` with more than one entry MUST warn in development, because the other entries have no touch path.                                                                                                                                                                                                                                                                                                                                                                           | DEC-3; `spec:AST-002` FR15                                                            | Proposed                                                        |
| FR4 | A sideways drag on a coarse pointer MUST reveal a panel beside the row showing each entry's `label` and `icon` in its `variant`'s state colour; the panel MUST NOT be visible at rest, by any pixel.                                                                                                                                                                                                                                                                                                                                                                                 | #6821 review (resting-panel sliver); source product                                   | Proposed; real-Chromium evidence required                       |
| FR5 | Under `reveal`, a release past the panel's width MUST leave the row resting open with every entry tappable, and a drag past the commit point or a fling MUST fire the **last** entry and no other. Under `commit`, a release past the commit point or a fling MUST fire the last entry and the row MUST NOT rest. A release short of the threshold MUST spring back under both. After an entry fires the row MUST spring back; the gesture MUST NOT assume the row leaves. A handler may return a Promise; a confirming or choosing handler opens its dialog from a sprung-back row. | DEC-3; UIKit `performsFirstActionWithFullSwipe`; Framework7 overswipe; source product | Proposed; real-device evidence required                         |
| FR6 | The drag MUST decide its axis once, early, and a mostly vertical drag MUST stay the scroller's. A mouse MUST NOT start the drag. The click the browser synthesizes after a drag MUST NOT fire the row's primary action.                                                                                                                                                                                                                                                                                                                                                              | #6821's gesture; press-model ORD1                                                     | Proposed; device feedback on #6821 shows the first is unsettled |
| FR7 | At most one row per `List` MUST rest open. Opening another, tapping outside, scrolling the list, pressing Escape with focus inside, or firing an entry MUST close it. A row that unmounts closes.                                                                                                                                                                                                                                                                                                                                                                                    | SwiftUI `swipeActionsContainer()`; Framework7 `app.swipeout.el`                       | Proposed                                                        |
| FR8 | Directions MUST be logical: the panel revealed by a drag toward the inline start sits at the inline end, so the finger, the revealed edge, and the panel agree under RTL. One side is specified; a leading side is OQ5.                                                                                                                                                                                                                                                                                                                                                              | #6821; `architecture:public-component-api` INV2 (logical direction)                   | Proposed                                                        |
| FR9 | `Item` MUST NOT gain `swipeActions`, `swipeBehavior`, or a swipe gesture. Any row rendered with a `menuitem`, `option`, or radio role MUST NOT host the capability.                                                                                                                                                                                                                                                                                                                                                                                                                  | DEC-4; ARIA allowed-children rules                                                    | Proposed; shipped `Item` conforms today                         |

### Accessibility contract

- **AR1 — The swipe is never the only path, and the row proves it.** Every
  verb in `swipeActions` MUST also be reachable through an interactive
  control the row carries on every input — in practice a `MoreMenu` fed by
  the same descriptors, or buttons, in `endContent`. A row given
  `swipeActions` whose rendered DOM contains no other focusable control MUST
  warn in development. This is derived from the rendered DOM, not from
  inspecting `ReactNode` children, and it is the structural form of #6821's
  prose obligation.
- **AR2 — The panel is real while open and absent while closed.** While the
  row rests open, each entry MUST be a real, focusable `<button>` with
  `label` as its accessible name, so a touch screen reader that lands on it
  can activate it. While the row is closed, the panel MUST be out of the
  accessibility tree and out of the tab order; the row's permanent control
  (AR1) is the path then. This is Square's two-part pattern with the web's
  equivalent of custom actions: the menu.
- **AR3 — Nothing swipe-only reaches a keyboard or a mouse.** On a pointer
  that can hover, `swipeActions` MUST have no effect on the tab order, the
  accessible tree, or the row's paint. Hover MUST NOT reveal the panel
  (`architecture:interaction-modality` INV4 is satisfied by not having a
  hover path at all).
- **AR4 — The row's primary stays one tab stop.** `swipeActions` MUST NOT
  change the primary element's role, name, or activation, and MUST add no
  stop while the row is closed.

### Platform support

- Supported feature/engine floor: every supported renderer and browser.
  Pointer type is read from pointer events and the `(pointer)` media feature.
- Unsupported behavior: a device that reports no coarse pointer gets no
  swipe and nothing else changes; the menu is the path.
- Browser evidence: FR4–FR7 and AR2 are paint and gesture claims. jsdom has
  neither; real-Chromium evidence with dispatched touch is required, and
  FR5/FR6 additionally need a physical touch device because #6821's device
  feedback contradicts its Chromium evidence.

## Current-state impact

- `component:List` gains `swipeActions`, `swipeBehavior`, and
  `ListItemActionData` as local public concepts when an implementation
  lands, citing this record for the shape and the accelerator policy.
- `component:DropdownMenu` is read, not changed: `DropdownMenuItemData` is
  reused as a vocabulary. If `ListItemActionData` is later declared as a
  `Pick` of it, that is implementation.
- `architecture:interaction-modality` gains `spec:AST-057` in its deciding
  specs; no invariant changes.
- `contributing:api-conventions` gains the rule this record relies on and
  nothing documents: a gesture accelerates verbs a row already exposes
  through a visible control; it never introduces one.
- `Item` is unchanged; its consumer docs gain one sentence: swipe actions
  belong on `ListItem`.
- `MoreMenu`'s consumer docs gain the pairing example: the same `items`
  feeding a row's menu and its swipe.
- [#6821](https://github.com/facebook/astryx/pull/6821) is superseded in
  shape by this record; its commit-only model survives as
  `swipeBehavior="commit"` and its gesture engineering is the starting point
  for FR4–FR8 on the new host once the device findings are resolved.
- No shipped public API changes on this record's own merge.
- While this record is `draft` its `review-applicability:v1` block routes
  nothing: global routing loads `current` claims only
  (`architecture:knowledge-contracts` INV20).

## Verification

| Contract           | Verification                                                                                       | Representative states                                                                                                      | Mutation or failure expectation                                                                                                                                 |
| ------------------ | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR1, FR3, FR9      | `ListItem` prop-surface suite plus exported-type checks; `Item` surface inventory                  | One, two, and four entries; the same array passed to `MoreMenu.items`; `commit` with two entries; `Item` with no new props | A reveal axis, a per-side object, a field diverging from `DropdownMenuItemData`, a silent multi-entry `commit`, or a new `Item` prop fails.                     |
| FR2, AR3           | jsdom and real-Chromium evidence with a hovering pointer                                           | Hover, focus, Tab through a row with `swipeActions`                                                                        | Any paint, tab stop, or tree change attributable to `swipeActions` on a fine pointer fails.                                                                     |
| FR4, FR5, FR6, FR8 | Real-Chromium dispatched-touch evidence plus physical-device check; RTL via the direction provider | Rest; release short, past the panel, past the commit point, fling; both behaviors; vertical drag; mouse drag; RTL          | A resting sliver, an immediate fire under `reveal`, a rest under `commit`, the wrong entry fired, a row that slides out on a toggle, or a mirrored panel fails. |
| FR7                | List-level suite                                                                                   | Two rows opened in turn; outside tap; scroll; Escape; entry fired; row unmounted                                           | Two rows open, or a row that stays open after any closing event, fails.                                                                                         |
| AR1                | Development-warning suite over rendered DOM                                                        | `swipeActions` with a `MoreMenu` in `endContent`; with buttons; with nothing interactive                                   | A row with no other focusable control and no warning fails.                                                                                                     |
| AR2, AR4           | Accessible-tree and tab-order assertions, open and closed                                          | Closed row; resting-open row; touch screen-reader cursor on an entry                                                       | A panel exposed while closed, an entry without a name while open, or a changed primary fails.                                                                   |

Known verification gap: none of the suites above exist on `main`, and no
component implements the contract. This record is `draft`, does not govern
review, and names no implementation.

## Decision log

Every decision below is **proposed**. None has been ruled on; `approved_by`
is `null` and the record is `draft`.

### DEC-1 — Swipe actions are declared as data in the menu-row vocabulary

**Reference:** `spec:AST-057/DEC-1`
**Decider:** `cixzhang`, `<pending>`

`swipeActions: ListItemActionData[]`, with `DropdownMenuItemData`'s field
names and meanings. The panel renders one real button per entry.

The gesture paints the panel: it needs each entry's label, icon and state
colour while the finger is down, how many there are, and which is last. Core
already declares verbs as data for the same reason in `DropdownMenu.items`
and `MoreMenu.items`, and reusing that vocabulary lets one object feed both a
row's menu and its swipe. A vibe test of the shape (12 isolated builders, 3
recall probes; `internal/vibe-tests/row-actions-shape-test/RESULTS.md`)
found every recall builder expecting an array of `{label, icon, onClick}`
and none expecting child components or a render prop.

Rejected: a `ReactNode` slot of swipe-action controls — the panel cannot be
painted mid-drag around content the component does not understand, and the
slot loses vocabulary parity with the menu. Rejected: a per-side object with
`onAction` — one row, two action vocabularies, and a one-per-side cap.

### DEC-2 — The swipe accelerates verbs the row already exposes; it never introduces one

**Reference:** `spec:AST-057/DEC-2`
**Decider:** `cixzhang`, `<pending>`

A row's verbs live in a control the caller composes into `endContent` — a
`MoreMenu`, or buttons — on every input. `swipeActions` names which of those
a drag reaches. A row given `swipeActions` with no other interactive control
warns in development; the check reads the rendered DOM, which keeps it inside
the `ReactNode` introspection boundary.

This is how the product the gesture comes from keeps it honest: the swipe
verbs are the handlers the menu already acts through, so the two cannot reach
different state.

Rejected: a prose obligation alone, which review cannot enforce. Rejected for
now: the row rendering the menu itself from the same array — it would make
divergence unrepresentable but moves a caller-composed surface into the row
(OQ2 offers it back).

### DEC-3 — Rest is the default; commit is a caller choice for one verb

**Reference:** `spec:AST-057/DEC-3`
**Decider:** `cixzhang`, `<pending>`

`swipeBehavior: 'reveal' | 'commit'`, default `reveal`. Under `reveal` the
row rests open and a long drag fires the last entry; under `commit` the last
entry fires on release and the row never rests.

Where a platform offers both, the full swipe is defined over the resting
list — UIKit's flag is
[`performsFirstActionWithFullSwipe`](https://developer.apple.com/documentation/uikit/uiswipeactionsconfiguration),
indexing the resting actions — so resting is the model that holds several
verbs and commit is the one that holds exactly one; the count and the rest
state are one question, which is why `commit` with several entries warns. A
resting panel also gives a touch user something to see before a destructive
verb fires, which is why it is the default. Commit is kept because the owner
asked for both models to be available and it is what the source product
chose for its one-verb rows.

Rejected: commit-only as the sole model (#6821) — it cannot grow into
resting without a default change. Rejected: a boolean `hasFullSwipe` — under
`reveal` the full swipe is already on and under `commit` it is the whole
behavior, so a boolean gates the wrong axis.

### DEC-4 — The capability lives on the list row, and `Item` stays clear

**Reference:** `spec:AST-057/DEC-4`
**Decider:** `cixzhang`, `<pending>`

`ListItem`, inside `List`'s `role="list"`, hosts `swipeActions` and
`swipeBehavior`. `Item` does not.

`Item` is the shared row for `DropdownMenuItem`, `DropdownMenuCheckboxItem`,
`DropdownMenuRadioItem`, `DropdownMenuSubMenu`, `SelectorOption`, and
`RadioListItem`. Those render with `menuitem`, `option`, and radio roles,
whose permitted descendants exclude buttons; a resting panel of buttons there
is an `aria-required-children` violation in every case. Only `ListItem` sits
in a host where interactive children are valid — the boundary the owner drew
on 2026-10-02 for per-row actions in `MultiSelector`, applied to the gesture.

Rejected: hosting on `Item` so every consumer gets it. Five of seven cannot
legally use it, and the two that could are served by `ListItem`.

### DEC-5 — No hover reveal; the menu is the desktop counterpart

**Reference:** `spec:AST-057/DEC-5`
**Decider:** `cixzhang`, `2026-10-02` (direction; record pending)

On a pointer that can hover, `swipeActions` does nothing. The row's verbs
are reached through the control the caller composed into `endContent`.

The row already carries its verbs there, on every row, on every input. The
swipe never carries a verb the menu lacks (AR1), so the arrangement has the
two surfaces iOS has with its Actions rotor: a declared, always-reachable
set, and a gesture that accelerates it.

Rejected: an `actionsReveal: 'always' | 'adaptive'` axis that rendered the
same actions as hover-revealed buttons on a fine pointer — a second surface
for verbs `endContent` already holds, and `always` rendered the menu twice.
[React Aria's iOS List example](https://react-aria.adobe.com/examples/ios-list)
takes that route (a panel button in the tree, revealed on focus) and is the
alternative this decision sets aside.

## Open questions

- **OQ1 — Does the shape stand: `swipeActions: ListItemActionData[]`, data in the menu-row vocabulary, rather than a slot of controls?** (`human-api`)

  The panel is painted from the data; the vocabulary pairs with
  `MoreMenu.items`; the vibe test's recall probe went 3–0 for data. If the
  owner prefers a slot, FR1 and DEC-1 flip and a `ListItemSwipeAction`
  control becomes public.

- **OQ2 — Is "same handlers, checked in development" strong enough, or should the row render the menu itself from one array?** (`human-api`)

  Today's shape (DEC-2): the caller composes a `MoreMenu` into `endContent`
  and passes the swipe the same handlers; the row warns if it finds no other
  interactive control. Divergence is discouraged, not unrepresentable. The
  stronger shape: `ListItem.actions: ListItemActionData[]` renders a
  `MoreMenu` at the row's end on every input and drives the swipe from the
  same array, so a swipe verb cannot exist without a menu item. It costs the
  caller the menu's position, label and presentation, and it changes a row's
  `endContent` from "the caller's" to "the caller's plus a system menu". The
  owner's direction read as keeping `endContent` the caller's; confirm, or
  take the stronger shape.

- **OQ3 — Is the destructive marker `variant: 'default' | 'destructive'`?** (`human-design`)

  With the same objects feeding `MoreMenu.items`, the menu's word wins by
  construction, and that word is `variant: 'destructive'`
  (`DropdownMenuItem`). The shared status set `'success' | 'warning' |
'error'` (seven components) and #6821's four-tone `tone` were weighed;
  `Badge`'s variant map was set aside because it also carries decorative
  colours. Recall builders invented a boolean `isDestructive`, which
  `variant` answers. Confirm.

- **OQ4 — Which pointer check, and does `List` spend its one adaptive query on it?** (`human-api`)

  With no hover reveal the only question is "can this pointer drag a row":
  pointer events report `pointerType`, so no media query is needed to start
  or refuse the drag, and `COMPACT_TOUCH_PRESENTATION_QUERY`'s width clause
  is irrelevant to a gesture. The recommendation is pointer-type gating with
  no media query at all, leaving `List`'s adaptive query unspent. Confirm,
  or rule that the overlay query gates the gesture too (a 1024px tablet would
  then have no swipe).

- **OQ5 — One side or two?** (`human-design`)

  One `swipeActions` list, revealed at the row's end by a drag toward the
  inline start. iOS Mail and the source product also use the leading side;
  #6821 modelled both. One side keeps one list and is what the record
  specifies; a leading side is additive later as a second array. Rule.

- **OQ6 — Should a descriptor be able to say the row leaves?** (`human-design`)

  FR5 springs back after every fire and leaves a removal's exit to the list.
  The source product swipes an archived row out of the shelf while a toggle
  springs back, which needs the gesture to know which kind it fired. A field
  such as `removesRow?: boolean` on the descriptor would carry that, at the
  cost of a field `MoreMenu.items` ignores; deriving it (did the row unmount
  on the next frame?) avoids the field but cannot start the exit animation
  before the data changes. The recommendation is spring-back only in this
  record, with the field as an additive follow-up if a product wants the
  shelf exit from the gesture.

- **OQ7 — Does a product need to open or close a row programmatically?** (`checkable`)

  Framework7 and Quasar expose `open`/`close`/`reset`; SwiftUI added
  `onPresentationChanged`. No Astryx product has asked. Left out until one
  does; a controlled pair would be the additive shape.

## Content boundary

The research that produced this record — the cross-library survey, the
options weighed, and the vibe test's design and scores — is a report, not a
contract, and lives outside it: the vibe test in
`internal/vibe-tests/row-actions-shape-test/RESULTS.md`, the rest linked from
the pull request that introduced the record.

This record does not duplicate `List`'s anatomy, prop table, theming targets,
or geometry contract; `DropdownMenu`'s item-data contract, which it reuses;
the modality invariants in `architecture:interaction-modality`; the admission
argument in `spec:AST-002`; the press model in
`module:DropdownMenu/useMenuPress`; or the gesture constants an
implementation will hold in source. It links their canonical owners.

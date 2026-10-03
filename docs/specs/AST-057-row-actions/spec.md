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
affects_consumer_docs: [List, ListItem, Item, MoreMenu, hooks]
review_triggers: [public-api, accessibility, behavior]
---

# Swipe actions as a composable touch accelerator system spec

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
    "behavior": ["FR4", "FR5", "FR6", "FR7", "FR8", "DEC-3", "DEC-4"]
  }
}
```

## Contract at a glance

| Area                    | Contract                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Public contract         | Swipe actions are a **behavior hook**, `useSwipeActions`, that any host composes (DEC-4). Its options declare the verbs a sideways drag reaches, per side, as data in the menu-row vocabulary (DEC-1), and the model: `reveal` (rest open) or `commit` (fire on release) (DEC-3). The verbs are an accelerator over ones the host already exposes through a visible control (DEC-2). There is no hover reveal (DEC-5). `ListItem` composes the hook behind one prop, `swipeActions`, that takes the hook's options, the way `SideNav.resizable` composes its hook. |
| Behavior                | On a coarse pointer a sideways drag reveals a panel beside the content naming the state each action reaches. Under `reveal` (default) the content rests open so each is tappable and a long drag fires the outermost; under `commit` the outermost fires on release and nothing rests. A short release springs back; after an action fires the content springs back. A mouse never starts the drag; a mostly vertical drag stays the scroller's; one host is open per group.                                                                                       |
| End-user impact         | A person on a phone gets the flick they expect — on a mail row, a picker option, a card; a person at a laptop uses the control the host already shows; a keyboard or screen-reader user reaches every verb through that control, because the swipe never carries a verb the host lacks.                                                                                                                                                                                                                                                                            |
| Builder impact          | Common case: one prop on `ListItem`, `swipeActions={{trailing: [...], behavior: 'reveal'}}`, in the shape `MoreMenu.items` already takes. A host the system does not ship composes `useSwipeActions` itself, spreads its props on a clip and a slider, and places the panels it returns. New obligation, checked in development: a host under `reveal` must permit interactive children, and a host with swipe actions must carry another interactive control.                                                                                                     |
| Compatibility/readiness | Additive: the hook is new, `ListItem.swipeActions` is absent by default, and every current row is unchanged. `Item` gains nothing. Authority: `draft`; `approved_by` is `null`. Eight owner questions are open; OQ1–OQ5 change the public shape, OQ6–OQ8 do not.                                                                                                                                                                                                                                                                                                   |
| Review checks           | Reject a swipe that is the only path to a verb; a hover-revealed copy of a host's controls; `reveal` inside a `listbox`, `menu`, or `radiogroup`; `commit` with several entries on a side and no warning; a panel exposed to the tree while closed; a wrapper element between `<ul>` and `<li>`; a second adaptive media query in `List`.                                                                                                                                                                                                                          |
| Governing rules         | [`architecture:interaction-modality`](../../architecture/interaction-modality.md) INV4, INV6, INV7; [`spec:AST-002`](../AST-002/spec.md) FR1, FR4, FR15, FR16, FR18, `DEC-1`, `DEC-8`; [`architecture:public-component-api`](../../architecture/public-component-api.md) INV2, INV3, INV5; the API Conventions page's "Behaviors: hooks over wrappers"; `component:DropdownMenu` for the item-data vocabulary this record reuses.                                                                                                                                  |

This table is a review projection; the body below is authoritative.

## Intent

A row, an option, or a card often has a verb or two beyond its primary:
archive, delete, pin, mark read, select. On a phone the person flicks it
sideways. At a laptop, and with a keyboard or a screen reader, the host
carries those verbs somewhere visible and reachable — a list row's overflow
menu, an option's own selection. One set of verbs, two surfaces.

Astryx has the surfaces and not the flick. This record adds the flick as a
composable behavior: a hook any host can run, declaring in the menu's own
vocabulary which verbs a drag reaches, so a swipe and the host's own control
cannot reach different state. `ListItem` composes it behind one prop for the
common case; a host the system does not ship composes it directly rather
than filing a request.

The trigger is [#6821](https://github.com/facebook/astryx/pull/6821), a port
of a shipping product's mail row onto `Item`. The owner's direction on
reading it: the prop is swipe actions only and the desktop counterpart is the
menu; the behavior is not clearly list-specific and should be a reusable
hook; composition is preferred because it lets people unblock themselves;
and swipe-to-activate an option is in scope.

## Ownership boundary

**Owns**

- That swipe actions are a behavior hook with declared data, and that
  shipped components compose it as thin shells rather than reimplementing it.
- That the swipe is an accelerator over verbs the host already exposes
  through a visible control, and that no hover reveal is added for them.
- The two models, `reveal` and `commit`, and which hosts each may run in.
- The coarse-pointer behavior: rest or fire, the accelerator, spring-back,
  one open host per group, and how it closes.
- The accessibility floor: the swipe is never the only path; the panel is
  real buttons while resting and out of the tree while closed; a host under
  `reveal` permits interactive children.
- That `Item` composes nothing and `ListItem` composes it behind
  `swipeActions`.

**Why no existing record can hold it**

- [`architecture:interaction-modality`](../../architecture/interaction-modality.md)
  is `current` and owns the rule this record applies — INV7 "essential
  actions remain reachable" in every modality — but owns no public API that
  satisfies it. A record carries one `authority` value, so adding unapproved
  API claims to it would present them as approved
  (`architecture:knowledge-contracts` INV1, INV14).
- [`component:List`](../../../packages/core/src/List/List.spec.md) is
  `current` and owns List's geometry; it becomes the first shell and cites
  this record. The hook itself belongs to no component.
- `component:DropdownMenu` owns `DropdownMenuItemData`; this record reuses
  that vocabulary and does not change it.
- `Item` has no component record; the boundary is DEC-4.
- [`spec:AST-002`](../AST-002/spec.md) owns admission; FR18 and DEC-8 ask a
  public primitive to name caller intent, operations, outcomes, and failure
  behavior before acceptance, which is what FR1–FR10 do.

## Non-goals

- **A hover-revealed action panel on a fine pointer.** Rejected in DEC-5; a
  product that wants verbs visible composes a `MoreMenu` or buttons into
  its host, as today.
- **Gesture tuning.** Axis-lock distance, commit ratio, fling velocity, slide
  and spring durations, resistance past the panel: behavior constants in
  source, not public API and not design tokens (the same ruling the touch
  press model received for its clocks).
- **Vertical swipes**, two-finger trackpad swipes, and a swipe whose only
  meaning is dismissal (Toast already has that in `useToastGesture`).
- **A programmatic `open`** beyond the returned `close()` (OQ8).
- **Shells other than `ListItem`.** The hook runs in any host; which other
  shipped components grow a `swipeActions` prop is each component's own
  admission (OQ3).
- **A generic wrapper component.** Deferred (OQ4): around a list row it
  would sit between `<ul>` and `<li>`; around anything else the hook is the
  wrapper.
- **`reveal` inside menus, listboxes, radio groups.** Those roles cannot
  host a panel of buttons under ARIA; `commit` may run there (DEC-4).
- Equivalent internal implementations remain valid when they satisfy this
  contract. Internal modules, files, function names, algorithms, data
  structures, storage layouts, manifests, journals, locks, transaction
  protocols, and CI job/workflow topology belong in architecture or
  implementation unless callers or interoperating systems intentionally depend
  on that exact mechanism as a public protocol.

## Evidence: in the repository

| Where                                                                                                                                                                               | What it shows                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`architecture:interaction-modality`](../../architecture/interaction-modality.md) INV4, INV7                                                                                        | "Hover is never the only discovery or activation path." "Every supported modality has a perceivable and operable path" to an essential action. A swipe-only panel with a documented obligation fails INV7 by construction.                                                                                                                                               |
| `DropdownMenu.items: DropdownMenuOption[]`, `MoreMenu.items`, `DropdownMenuItemData`                                                                                                | Core already declares verbs as data: `{id?, label, icon, onClick, isDisabled, variant: 'default' \| 'destructive', …}`, and data mode "renders through `DropdownMenuItem`, so the two APIs describe the same thing and must not drift". The vocabulary the swipe should reuse.                                                                                           |
| `Item.endContent` doc: "badges, metadata, timestamps, or action buttons"; `SideNavItem.actions?: ReactNode`                                                                         | Row actions are built today by composing controls into `endContent`, always visible. That is the permanent surface this record keeps.                                                                                                                                                                                                                                    |
| `Item` consumers: `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuSubMenu`, `SelectorOption`, `RadioListItem`, `ListItem`                     | Five of seven hosts render `Item` with a `menuitem`, `option`, or radio role, where a resting panel of buttons is invalid ARIA; a presentational panel that fires on release is not. Only `ListItem` (`role="list"`) permits arbitrary interactive children — the boundary the owner drew on 2026-10-02 for per-row actions in a listbox, applied here to `reveal` only. |
| `useAdaptivePresentation` / `COMPACT_TOUCH_PRESENTATION_QUERY`                                                                                                                      | The system's adaptive split for overlays is `(max-width: 768px) and (pointer: coarse)`, and the owner ruled a component gets one adaptive query. The gesture needs none: whether a pointer can drag is read from the pointer event itself, so `List`'s one query stays unspent.                                                                                          |
| `Toast/useToastGesture.ts`                                                                                                                                                          | A shipped commit-only swipe whose one meaning is dismissal, with constants (`SWIPE_DISMISS_RATIO`) in source. The Compose model is already in core where it fits.                                                                                                                                                                                                        |
| `useToastGesture` returns `{rootRef, bindings}`; `useInputStatusIcon` returns a rendered node; `SideNav.resizable?: ResizableConfig` composes `useResizable` behind one object prop | Core's conventions for a behavior hook: props to spread (Toast owns the anatomy and writes the CSS variables), a node when the system owns the look, and a shipped component composing the hook behind a config-shaped prop — the API Conventions page records `SideNav resizable={{…}}` winning over a `<Resizable>` wrapper after enumerating its cases.               |
| `ListItem` renders `<Item as=\"li\">` directly under `List`'s `<ul role=\"list\">`                                                                                                  | A wrapper element around `ListItem` is a non-`li` child of `<ul>`: invalid HTML and a broken \"list, N items\" announcement. A list row's swipe anatomy has to be inside the `li`, which is why `ListItem` composes the hook rather than being wrapped.                                                                                                                  |
| #6821 real-device feedback                                                                                                                                                          | On an iOS device the swipe required a press-and-hold before it would start, and the row background did not restore until release. The gesture craft the pull request is credited with is not yet settled on a device.                                                                                                                                                    |
| The source product's row (#6821 is its port)                                                                                                                                        | Carries the `…` menu in `endContent` on every row and a touch-only swipe whose verbs are the menu's handlers. Its panel names the **state** ("Unread") where the menu names the sentence ("Mark as unread"). A toggle swipes back; a removal swipes out; a verb with no single instant opens a chooser.                                                                  |

## Cases the contract serves

| Case                                                  | Served | How                                                                                                                                                                                                                            |
| ----------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Mail: archive and delete                              | Yes    | Both in the row's `MoreMenu`; both in `ListItem.swipeActions.trailing` with the same handlers. Under `reveal` the panel rests open with two buttons; a long drag fires the outermost.                                          |
| One destructive action                                | Yes    | One menu item, one swipe action, `variant: 'destructive'`. Under `commit` it fires on release. A handler that confirms first opens its dialog from a sprung-back row.                                                          |
| Reversible toggle (read/unread, pin/flag)             | Yes    | The panel label names the state the verb reaches ("Unread"); the menu names the sentence ("Mark as unread"); one handler. The row springs back after firing (FR5).                                                             |
| More than two actions                                 | Yes    | The menu holds all of them; `swipeActions` holds the few that earn a gesture. Under `reveal` the panel holds N buttons.                                                                                                        |
| An action that opens a confirm or a chooser           | Yes    | `onClick` opens the dialog from a sprung-back row; a verb with no single instant (snooze) commits to opening its chooser.                                                                                                      |
| Rows in a virtualized list                            | Yes    | One open row per list (FR7); a row that unmounts closes. A mostly vertical drag stays the scroller's (FR6).                                                                                                                    |
| Rows that are links (`href`)                          | Yes    | The axis lock separates the drag from the tap, and the click the browser synthesizes after a drag is swallowed (FR6).                                                                                                          |
| `role="list"` rows                                    | Yes    | `ListItem` composes the hook; arbitrary interactive children are valid, so both models run.                                                                                                                                    |
| Swipe to activate a picker option, a card, a token    | Yes    | The host composes `useSwipeActions` with `behavior: 'commit'`; the panel is presentational and fires the host's own verb on release. An option's selection is already reachable by keyboard, so AR1 is met by the host itself. |
| `reveal` on `listbox` options, `menuitem`, radio rows | **No** | ARIA forbids interactive descendants of `option` and `menuitem`; the hook warns in development and `Item` composes nothing (DEC-4).                                                                                            |
| Dismiss-only swipe (Toast)                            | **No** | Owned by `useToastGesture`; a different concept with one meaning per direction.                                                                                                                                                |

## Public API and concepts

| Concept                  | Closed values or states                                                                                                                            | Meaning                                                                                                                                                                                                                                                                                         | Default | Owner            | Stability |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------------- | --------- |
| `useSwipeActions`        | `(options: UseSwipeActionsOptions) => UseSwipeActionsResult`                                                                                       | The behavior. Public, so a host the system does not ship composes it.                                                                                                                                                                                                                           | —       | `spec:AST-057`   | proposed  |
| `UseSwipeActionsOptions` | `{leading?: SwipeAction[]; trailing?: SwipeAction[]; behavior?: 'reveal' \| 'commit'; isDisabled?: boolean}`                                       | The verbs a drag reaches on each side, outermost last, and the model. `leading` is revealed by a drag toward the inline end, `trailing` by one toward the inline start.                                                                                                                         | —       | `spec:AST-057`   | proposed  |
| `SwipeAction`            | `{id?: string; label: string; icon?: ReactNode; onClick: () => void \| Promise<void>; isDisabled?: boolean; variant?: 'default' \| 'destructive'}` | One verb, in `DropdownMenuItemData`'s field vocabulary so the same object can feed `MoreMenu.items`. `label` is the panel's text and, under `reveal`, the button's accessible name; it names the **state** the verb reaches ("Unread"), which is why it may differ from a menu item's sentence. | —       | `spec:AST-057`   | proposed  |
| `UseSwipeActionsResult`  | `{rootProps, contentProps, leadingPanel: ReactNode, trailingPanel: ReactNode, isOpen: boolean, close(): void}`                                     | Props for the clipping element and for the sliding content, and the rendered panels the host places as siblings of the content inside the clip. The system owns the panels' look; the host owns the anatomy (OQ5).                                                                              | —       | `spec:AST-057`   | proposed  |
| `behavior: 'reveal'`     | closed, resting open                                                                                                                               | Past the panel's width the content rests open with every entry a real button; a long drag or fling fires the outermost. Valid only in a host that permits interactive children.                                                                                                                 | default | `spec:AST-057`   | proposed  |
| `behavior: 'commit'`     | closed                                                                                                                                             | A release past the commit point or a fling fires the outermost entry; nothing rests and the panel is presentational. Valid in any host; warns with more than one entry on a side. "Swipe to activate" is this model with the host's own verb as the entry.                                      | —       | `spec:AST-057`   | proposed  |
| `ListItem.swipeActions`  | `UseSwipeActionsOptions`                                                                                                                           | The shell: `ListItem` composes the hook inside its `li`, the way `SideNav.resizable` composes `useResizable`. Absent, nothing changes.                                                                                                                                                          | absent  | `component:List` | proposed  |
| after an action fires    | springs back                                                                                                                                       | The content returns to rest. A removal's exit is the host's or the list's, not assumed by the gesture (OQ7).                                                                                                                                                                                    | —       | `spec:AST-057`   | proposed  |
| the modality split       | internal                                                                                                                                           | A mouse never starts the drag; a coarse pointer does. Read from the pointer event, not a prop or a media query (`architecture:interaction-modality` INV6).                                                                                                                                      | —       | `spec:AST-057`   | proposed  |

Not public: axis-lock distance, commit ratio, fling velocity, durations,
resistance, panel widths. They are behavior constants.

## Requirements

### Behavioral contract

| ID   | Invariant                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Basis                                                                                 | Verification state                                              |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| FR1  | The behavior MUST be a public hook, `useSwipeActions`, whose options declare each side's verbs as `SwipeAction[]` in `DropdownMenuItemData`'s field vocabulary (`id`, `label`, `icon`, `onClick`, `isDisabled`, `variant`), so one object can serve the swipe and a `MoreMenu`. A `SwipeAction` MUST NOT carry a node the hook renders as the control.                                                                                                                                                                                                                                               | DEC-1, DEC-4; `DropdownMenu.items`; API Conventions "hooks over wrappers"             | Proposed; no evidence on `main`                                 |
| FR2  | The hook MUST return props for a clipping element and for the sliding content, and the rendered panel for each configured side. A shipped component that offers swipe actions MUST compose this hook behind one prop taking `UseSwipeActionsOptions`, and MUST NOT reimplement the gesture.                                                                                                                                                                                                                                                                                                          | DEC-4; `useToastGesture`, `useInputStatusIcon`, `SideNav.resizable`                   | Proposed                                                        |
| FR3  | `behavior` MUST be one enum with the closed values `reveal` and `commit`, default `reveal`. `commit` with more than one entry on a side MUST warn in development, because the other entries have no touch path.                                                                                                                                                                                                                                                                                                                                                                                      | DEC-3; `spec:AST-002` FR15                                                            | Proposed                                                        |
| FR4  | A sideways drag on a coarse pointer MUST reveal the side's panel beside the content, showing each entry's `label` and `icon` in its `variant`'s state colour; the panel MUST NOT be visible at rest, by any pixel.                                                                                                                                                                                                                                                                                                                                                                                   | #6821 review (resting-panel sliver)                                                   | Proposed; real-Chromium evidence required                       |
| FR5  | Under `reveal`, a release past the panel's width MUST leave the content resting open with every entry tappable, and a drag past the commit point or a fling MUST fire the **outermost** entry and no other. Under `commit`, a release past the commit point or a fling MUST fire the outermost entry and nothing MUST rest. A release short of the threshold MUST spring back under both. After an entry fires the content MUST spring back; the gesture MUST NOT assume the host leaves. A handler may return a Promise; a confirming or choosing handler opens its dialog from a sprung-back host. | DEC-3; UIKit `performsFirstActionWithFullSwipe`; Framework7 overswipe; source product | Proposed; real-device evidence required                         |
| FR6  | The drag MUST decide its axis once, early, and a mostly vertical drag MUST stay the scroller's. A mouse MUST NOT start the drag. The click the browser synthesizes after a drag MUST NOT fire the host's primary action.                                                                                                                                                                                                                                                                                                                                                                             | #6821's gesture; press-model ORD1                                                     | Proposed; device feedback on #6821 shows the first is unsettled |
| FR7  | Within one `List`, at most one row MUST rest open; a shell MUST provide that coordination. Opening another, tapping outside, scrolling, pressing Escape with focus inside, or firing an entry MUST close it; a host that unmounts closes. A bare hook caller outside a shell receives `isOpen` and `close()` and owns coordination.                                                                                                                                                                                                                                                                  | SwiftUI `swipeActionsContainer()`; Framework7 `app.swipeout.el`                       | Proposed                                                        |
| FR8  | Directions MUST be logical: `trailing` is revealed by a drag toward the inline start and sits at the inline end; `leading` the reverse; so the finger, the revealed edge, and the panel agree under RTL.                                                                                                                                                                                                                                                                                                                                                                                             | #6821; `architecture:public-component-api` INV2 (logical direction)                   | Proposed                                                        |
| FR9  | `Item` MUST NOT compose the hook or gain a swipe prop. `ListItem` MUST compose it inside its own `li`; no element MUST be inserted between `List`'s `<ul>` and the `<li>`.                                                                                                                                                                                                                                                                                                                                                                                                                           | DEC-4; HTML list content model                                                        | Proposed; shipped `Item` conforms today                         |
| FR10 | `reveal` MUST warn in development when the clipping element is inside a `listbox`, `menu`, or `radiogroup`, derived from the rendered DOM; `commit` runs there without warning.                                                                                                                                                                                                                                                                                                                                                                                                                      | DEC-4; ARIA allowed-children rules                                                    | Proposed                                                        |

### Accessibility contract

- **AR1 — The swipe is never the only path, and the host proves it.** Every
  verb in the options MUST also be reachable through an interactive control
  the host carries on every input — a `MoreMenu` fed by the same descriptors,
  buttons, or the host's own primary element when the verb is its own
  (swipe to activate). A host whose rendered clip contains no focusable
  element other than the panel's buttons MUST warn in development. Derived
  from the rendered DOM, not from inspecting `ReactNode` children.
- **AR2 — The panel is real while resting and absent while closed.** Under
  `reveal`, while the content rests open each entry MUST be a real,
  focusable `<button>` named by `label`, so a touch screen reader that lands
  on it can activate it; while closed the panel MUST be out of the
  accessibility tree and the tab order. Under `commit` the panel MUST be
  presentational (`aria-hidden`) at all times, because nothing in it is ever
  tappable.
- **AR3 — Nothing swipe-only reaches a keyboard or a mouse.** On a pointer
  that can hover the hook MUST have no effect on the tab order, the
  accessible tree, or the host's paint. Hover MUST NOT reveal the panel.
- **AR4 — The host's primary stays one tab stop.** Composing the hook MUST
  NOT change the primary element's role, name, or activation, and MUST add
  no stop while closed.

### Platform support

- Supported feature/engine floor: every supported renderer and browser.
  Pointer type is read from the pointer event.
- Unsupported behavior: a device that never produces a coarse pointer gets
  no swipe and nothing else changes; the host's own control is the path.
- Browser evidence: FR4–FR7 and AR2 are paint and gesture claims. jsdom has
  neither; real-Chromium evidence with dispatched touch is required, and
  FR5/FR6 additionally need a physical touch device because #6821's device
  feedback contradicts its Chromium evidence.

## Current-state impact

- A new public hook, `useSwipeActions`, with `UseSwipeActionsOptions`,
  `UseSwipeActionsResult`, and `SwipeAction` exported. It belongs to no
  component; `spec:AST-057` is its owner until a `module:` record exists.
- `component:List` gains `swipeActions` as a local public concept when the
  shell lands, citing this record for the shape and the accelerator policy.
- `component:DropdownMenu` is read, not changed: `DropdownMenuItemData` is
  reused as a vocabulary.
- `architecture:interaction-modality` gains `spec:AST-057` in its deciding
  specs; no invariant changes.
- `contributing:api-conventions` gains the rule this record relies on: a
  gesture accelerates verbs a host already exposes through a visible
  control; it never introduces one. The "hooks over wrappers" guidance gains
  this hook as its second example beside `useResizable`.
- `Item` is unchanged; its consumer docs gain one sentence: swipe actions
  are `useSwipeActions`, composed by `ListItem`.
- `MoreMenu`'s consumer docs gain the pairing example: the same `items`
  feeding a row's menu and its swipe.
- [#6821](https://github.com/facebook/astryx/pull/6821) is superseded in
  shape by this record; its commit-only model survives as
  `behavior: 'commit'` and its gesture engineering is the starting point for
  the hook once the device findings are resolved.
- No shipped public API changes on this record's own merge.
- While this record is `draft` its `review-applicability:v1` block routes
  nothing: global routing loads `current` claims only
  (`architecture:knowledge-contracts` INV20).

## Verification

| Contract           | Verification                                                                                       | Representative states                                                                                                                                 | Mutation or failure expectation                                                                                                                                                 |
| ------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR1, FR2, FR3, FR9 | Hook and `ListItem` prop-surface suites plus exported-type checks; `Item` surface inventory        | One, two, and four entries per side; the same array passed to `MoreMenu.items`; `commit` with two entries; a bare-hook host; `Item` with no new props | A field diverging from `DropdownMenuItemData`, a shell reimplementing the gesture, a silent multi-entry `commit`, an element between `ul` and `li`, or a new `Item` prop fails. |
| FR10, AR1          | Development-warning suites over rendered DOM                                                       | `reveal` inside a `listbox`; `commit` inside a `listbox`; a clip with a `MoreMenu`; a clip with nothing focusable                                     | A missing or false warning fails.                                                                                                                                               |
| AR3                | jsdom and real-Chromium evidence with a hovering pointer                                           | Hover, focus, Tab through a host with the hook                                                                                                        | Any paint, tab stop, or tree change attributable to the hook on a fine pointer fails.                                                                                           |
| FR4–FR6, FR8       | Real-Chromium dispatched-touch evidence plus physical-device check; RTL via the direction provider | Rest; release short, past the panel, past the commit point, fling; both models; both sides; vertical drag; mouse drag; RTL                            | A resting sliver, an immediate fire under `reveal`, a rest under `commit`, the wrong entry fired, content that slides out on a toggle, or a mirrored panel fails.               |
| FR7                | `List` shell suite and bare-hook `isOpen`/`close()` suite                                          | Two rows opened in turn; outside tap; scroll; Escape; entry fired; row unmounted                                                                      | Two rows open, or a row that stays open after any closing event, fails.                                                                                                         |
| AR2, AR4           | Accessible-tree and tab-order assertions, open and closed, both models                             | Closed; resting open; `commit` mid-drag; touch screen-reader cursor on an entry                                                                       | A panel exposed while closed, a `commit` panel in the tree, an entry without a name while resting, or a changed primary fails.                                                  |

Known verification gap: none of the suites above exist on `main`, and no
component implements the contract. This record is `draft`, does not govern
review, and names no implementation.

## Decision log

Every decision below is **proposed**. None has been ruled on; `approved_by`
is `null` and the record is `draft`.

### DEC-1 — Swipe actions are declared as data in the menu-row vocabulary

**Reference:** `spec:AST-057/DEC-1`
**Decider:** `cixzhang`, `<pending>`

`UseSwipeActionsOptions.leading` and `.trailing` are `SwipeAction[]`, with
`DropdownMenuItemData`'s field names and meanings. Under `reveal` the panel
renders one real button per entry; under `commit` one presentational block.
A hook taking an options object is core's convention — every `*Config` and
`*Options` object in core configures a hook — and `ListItem.swipeActions`
passes the same object through, as `SideNav.resizable` does.

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
slot loses vocabulary parity with the menu. Rejected: one action per side with
`onAction` (#6821) — a second action vocabulary and a cap the resting model
does not have.

### DEC-2 — The swipe accelerates verbs the row already exposes; it never introduces one

**Reference:** `spec:AST-057/DEC-2`
**Decider:** `cixzhang`, `<pending>`

A host's verbs live in a control it already carries on every input — a list
row's `MoreMenu` in `endContent`, an option's own selection. The hook's
options name which of those a drag reaches. A host whose clip holds no other
focusable element warns in development; the check reads the rendered DOM,
which keeps it inside the `ReactNode` introspection boundary.

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

`behavior: 'reveal' | 'commit'`, default `reveal`. Under `reveal` the
content rests open and a long drag fires the outermost entry; under `commit`
the outermost entry fires on release and nothing rests. "Swipe to activate"
an option is `commit` with the option's own verb as the entry: no third value
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

### DEC-4 — A behavior hook that hosts compose; `ListItem` is the first shell; `Item` composes nothing

**Reference:** `spec:AST-057/DEC-4`
**Decider:** `cixzhang`, `2026-10-02` (direction; record pending)

`useSwipeActions` is the capability. It returns props for a clip and a
slider and the rendered panels; any host with that anatomy composes it. A
shipped component that offers swipe actions does so as a thin shell over the
hook behind one options-shaped prop. `ListItem` is the first shell, composing
the hook inside its own `li`. `Item` composes nothing.

The behavior is not list-specific: a mail row, a picker option, a card and
a token all flick. A hook serves all of them; a prop on one component serves
one, and a caller whose host the system does not ship drops to the hook
instead of filing a request. This is the API Conventions page's "hooks over
wrappers" rule, and its recorded result for `SideNav` — a config-shaped prop
composing the hook, chosen over a wrapper after enumerating the cases — is
the shape `ListItem` takes. A wrapper around `ListItem` is ruled out by the
HTML list content model: it would sit between `<ul>` and `<li>`.

Which model a host may run follows from its role. `reveal` rests real
buttons, so it needs a host that permits interactive children —
`ListItem` under `role="list"` does, `menuitem`, `option` and radio rows do
not (the boundary the owner drew on 2026-10-02 for per-row actions in
`MultiSelector`). `commit` rests nothing and its panel is presentational, so
it runs anywhere, which is what makes swipe-to-activate an option valid.
`Item` is the shared row for five of those roles and composes nothing; the
hosts that want the gesture compose the hook themselves.

Rejected: a prop on `Item` so every consumer gets it — five of seven cannot
run `reveal`. Rejected: a generic `<SwipeRow>` wrapper as the primary API —
invalid inside a list, and for every other host the hook already is the
wrapper (OQ4 keeps the door open for sugar).

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

- **OQ1 — Does the shape stand: a hook whose options declare each side's verbs as `SwipeAction[]` in the menu-row vocabulary?** (`human-api`)

  The panel is painted from the data; the vocabulary pairs with
  `MoreMenu.items`; a hook taking an options object is core's convention;
  the vibe test's recall probe went 3–0 for data over a slot. Confirm, or
  rule for a slot of controls, which flips FR1 and DEC-1.

- **OQ2 — Is "same handlers, checked in development" strong enough, or should `ListItem` render the menu itself from one array?** (`human-api`)

  Today's shape (DEC-2): the caller composes a `MoreMenu` into `endContent`
  and passes the swipe the same handlers; the shell warns if it finds no
  other focusable control. The stronger shape: `ListItem.actions:
SwipeAction[]` renders a `MoreMenu` at the row's end on every input and
  drives the swipe from the same array, so a swipe verb cannot exist without
  a menu item. It costs the caller the menu's position, label and
  presentation. The owner's direction read as keeping `endContent` the
  caller's; confirm, or take the stronger shape.

- **OQ3 — Does `ListItem` ship the `swipeActions` shell in this record, or only the hook?** (`human-api`)

  The hook alone leaves list rows with no way to swipe: `ListItem` has one
  layer and a wrapper would break the list. The shell is one prop taking the
  hook's options, the `SideNav.resizable` shape. The owner asked whether it
  should be embedded in `ListItem` by default; the recommendation is yes,
  absent by default, because the common case is a list row and the hook is
  the escape hatch rather than the entry point.

- **OQ4 — Is a generic wrapper component wanted as sugar for non-list hosts, and if so in a later record?** (`human-api`)

  For a card or a custom row, `useSwipeActions` plus three elements is the
  whole integration. A `<SwipeActions>` wrapper would save those lines at the
  cost of a public component with its own admission under `spec:AST-002`.
  Deferred; not foreclosed.

- **OQ5 — Does the hook return the rendered panels, or only props?** (`human-api`)

  Panels returned as nodes (`useInputStatusIcon` precedent) keep the panel's
  look — state colour, label as state, outermost expansion — system-owned,
  so no host reimplements it; props only (`useToastGesture` precedent) is
  lower-level than most callers want and leaves the panel's look to each
  host. The recommendation is nodes plus props, as the API table states.

- **OQ6 — Is the destructive marker `variant: 'default' | 'destructive'`?** (`human-design`)

  With the same objects feeding `MoreMenu.items`, the menu's word wins by
  construction. The shared status set `'success' | 'warning' | 'error'` and
  #6821's four-tone `tone` were weighed; `Badge`'s variant map was set aside
  because it also carries decorative colours. Confirm.

- **OQ7 — Should a `SwipeAction` be able to say the host leaves?** (`human-design`)

  FR5 springs back after every fire and leaves a removal's exit to the host
  or the list. The source product swipes an archived row out of the shelf
  while a toggle springs back. A field such as `removesHost?: boolean` would
  carry that, at the cost of a field `MoreMenu.items` ignores. The
  recommendation is spring-back only here, with the field as an additive
  follow-up.

- **OQ8 — Does a product need to open or close a host programmatically beyond `close()`?** (`checkable`)

  The hook returns `isOpen` and `close()`. Framework7 and Quasar also expose
  `open`; SwiftUI added `onPresentationChanged`. No Astryx product has asked.

## Content boundary

The research that produced this record — the cross-library survey, the
shapes weighed, and the vibe test's design and scores — is a report, not a
contract, and lives outside it: the vibe test in
`internal/vibe-tests/row-actions-shape-test/RESULTS.md`, the rest linked from
the pull request that introduced the record.

This record does not duplicate `List`'s anatomy, prop table, theming targets,
or geometry contract; `DropdownMenu`'s item-data contract, which it reuses;
the hook conventions the API Conventions page owns;
the modality invariants in `architecture:interaction-modality`; the admission
argument in `spec:AST-002`; the press model in
`module:DropdownMenu/useMenuPress`; or the gesture constants an
implementation will hold in source. It links their canonical owners.

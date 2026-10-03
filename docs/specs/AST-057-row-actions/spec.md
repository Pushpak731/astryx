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
affects_consumer_docs: [List, ListItem, Item]
review_triggers: [public-api, accessibility, behavior]
---

# Row actions revealed per modality system spec

<!-- review-applicability:v1 -->

```json
{
  "scope": "global",
  "triggers": {
    "public-api": ["FR1", "FR2", "FR3", "FR9", "DEC-1", "DEC-2", "DEC-3"],
    "accessibility": ["AR1", "AR2", "AR3", "AR4", "AR5"],
    "behavior": ["FR4", "FR5", "FR6", "FR7", "FR8", "DEC-4"]
  }
}
```

## Contract at a glance

| Area                    | Contract                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Public contract         | A list row carries **secondary actions** — declared once, as data, in one array the row renders as real buttons — and one setting for **how they are revealed**: always visible, or adaptively (hover and focus on a fine pointer, a sideways drag that rests open on a coarse pointer). The actions and the reveal are two concepts (DEC-1, DEC-2). A touch swipe is one reveal affordance over those buttons, never a separate action list (DEC-3). The capability lives on the list row, not on the shared `Item` (DEC-4). |
| Behavior                | On a fine pointer the actions appear at the row's end while the row is hovered or focus is inside it. On a coarse pointer a sideways drag reveals them beside the row; by default the row **rests open** so each can be tapped and a long drag fires the last one; a caller may instead choose **commit** — fire the last action on release, no rest — for a row with exactly one verb (DEC-3, OQ5). A short release springs back; one row is open per list. Focus entering an action reveals it under every presentation.    |
| End-user impact         | A person on a phone gets the swipe they expect; a person at a laptop gets a clean row that shows its verbs on hover; a keyboard user tabs to the same buttons; a screen-reader user finds them in the tree. Today none of this exists in Astryx, and a product that needs it hand-rolls it in `endContent` or its own CSS.                                                                                                                                                                                                    |
| Builder impact          | One array and one enum on `ListItem`. The builder lists the verbs — `{label, icon, onClick, variant}` in the shape menu rows already use — and chooses `always` or `adaptive`. No gesture code, no media queries, no second keyboard path to build.                                                                                                                                                                                                                                                                           |
| Compatibility/readiness | Additive: both props are absent by default and every current row is unchanged. `Item` gains nothing. Authority: `draft`; `approved_by` is `null`. Seven owner questions are open; OQ1–OQ5 change the public shape, OQ6–OQ7 do not.                                                                                                                                                                                                                                                                                            |
| Review checks           | Reject a swipe or hover that is the only path to an action; a panel hidden from the accessibility tree while any control inside it can take focus; a second action list declared only for touch; `commit` with several entries and no warning; an action that is not a button smuggled into the array; swipe or hover-reveal added to `Item`, a `menuitem`, an `option` or a radio row; a second adaptive media query on `List`.                                                                                              |
| Governing rules         | [`architecture:interaction-modality`](../../architecture/interaction-modality.md) INV4, INV6, INV7 for every-modality reachability and internal modality; [`spec:AST-002`](../AST-002/spec.md) FR1, FR4, FR15, FR16, `DEC-1` for admission and one responsibility per input; [`spec:AST-055`](../AST-055-caller-rendered-trigger/spec.md) DEC-1 for a caller's control being the interactive element; [`architecture:public-component-api`](../../architecture/public-component-api.md) INV2, INV3, INV5.                     |

This table is a review projection; the body below is authoritative.

## Intent

A list row often has a verb or two beyond opening it: archive, delete, pin,
mark read. On a phone the person expects to flick the row sideways; at a
laptop they expect the row to stay clean and show its verbs when the pointer
rests on it; with a keyboard they expect to tab to them. Mail clients on every
platform do all three with one set of verbs.

Astryx has none of it. Pull request
[#6821](https://github.com/facebook/astryx/pull/6821) proposes the phone half
alone — `swipeActions` on the shared `Item`, one action per side, firing on
release with no resting state, in a panel hidden from assistive technology —
and tells callers to build the other halves themselves. It is a port of a
shipping product's row, where commit-only was a deliberate choice and the
swipe verbs are wired to the same handlers the row's overflow menu acts
through; that pairing, not the prose obligation, is what kept the gesture from
being the only path there. Review found three
things it could not settle on its own: the count, the absence of a rest
state, and an accessibility obligation nothing enforces. The owner's question
on reading it — _this is a mobile-only behavior; what is the desktop
equivalent?_ — is the question this record answers.

This record owns one answer: **a row declares its secondary actions once, as
real controls, and the system decides how each input modality reveals them.**
The swipe is one of those reveals. It also decides where the capability lives:
on the list row, where interactive children are valid, and not on `Item`,
which is also the menu row and the option row.

## Ownership boundary

**Owns**

- That a row's secondary actions are declared once, as data the row renders
  into real buttons, and that no modality gets its own action list.
- The reveal policy: the closed set of presentations, which modality gets
  which affordance, and that focus reveals under every presentation.
- The behavior of the coarse-pointer reveal: rest open, accelerate on a long
  drag, spring back, one open row, and how it closes.
- The accessibility floor for the arrangement: real controls in the tree in
  every state, hover never the only path, no action trapped behind a gesture.
- Which host carries the capability (`ListItem`) and which does not (`Item`,
  and every row with a `menuitem`, `option`, or radio role).

**Why no existing record can hold it**

- [`architecture:interaction-modality`](../../architecture/interaction-modality.md)
  is `current` and owns the rule this record applies — INV4 "hover is never
  the only discovery or activation path", INV7 "essential actions remain
  reachable" in every modality — but it owns the invariant, not a public API
  that satisfies it. A record carries one `authority` value, so adding
  unapproved API claims to it would present them as approved
  (`architecture:knowledge-contracts` INV1, INV14).
- [`component:List`](../../../packages/core/src/List/List.spec.md) is
  `current` and owns List's geometry and `edgeCompensation`. The same
  authority problem applies, and the decision here is not List-local: it
  rules on `Item` (which must not host it), on the modality split that
  `architecture:interaction-modality` INV6 keeps internal, and on a shape
  rule — one action list, not one per modality — that the next row-shaped
  component will meet. `component:List` becomes the first adopter and cites
  this record.
- `Item` has no component record. Writing one to say "not here" would create
  a record for a non-change; the boundary is recorded here as DEC-4.
- [`spec:AST-055`](../AST-055-caller-rendered-trigger/spec.md) owns a
  caller-supplied control that _opens an overlay_. Its DEC-1 reasoning — the
  caller's control must be the interactive element — is reused, but the fact
  is different: these controls are the actions, and there is no overlay.
- [`spec:AST-002`](../AST-002/spec.md) owns admission; this record passes its
  gates below and sits downstream of them.

## Non-goals

- **Gesture tuning.** Axis-lock distance, commit ratio, fling velocity, slide
  and spring durations, resistance past the panel: behavior constants in
  source, not public API and not design tokens (the same ruling the touch
  press model received for its clocks).
- **Vertical swipes**, two-finger trackpad swipes on a fine pointer, and a
  swipe whose only meaning is dismissal (Toast already has that in
  `useToastGesture` and it is unchanged).
- **A controlled open state** (`isOpen` / `onOpenChange` per row) and an
  imperative close handle. Deferred to OQ7; not foreclosed.
- **Rows outside `List`**: Table rows, TreeList rows, ChatMessage hover
  toolbars, Card rows. They are cited where they bear on the decision and are
  not governed here.
- **Menus, listboxes, radio groups.** Rows with `menuitem`, `option`, or
  radio roles cannot host embedded buttons under ARIA; see DEC-4.
- Equivalent internal implementations remain valid when they satisfy this
  contract. Internal modules, files, function names, algorithms, data
  structures, storage layouts, manifests, journals, locks, transaction
  protocols, and CI job/workflow topology belong in architecture or
  implementation unless callers or interoperating systems intentionally depend
  on that exact mechanism as a public protocol.

## Evidence: the field

Read from each library's own reference or source, not summaries. The three
columns on the right are the three questions the review of #6821 could not
settle.

| Library                                                                                                                                                                                     | Caller passes                                                                                                   | Actions per side | Rests open                                                                           | Keyboard / screen reader                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [React Aria `GridList`](https://react-spectrum.adobe.com/react-aria/GridList.html)                                                                                                          | No swipe API. Row actions are `<Button>` children of the row.                                                   | —                | —                                                                                    | Buttons in the row; arrow keys move within a row.                                                                                                         |
| [React Aria **iOS List example**](https://react-aria.adobe.com/examples/ios-list)                                                                                                           | A real `<Button>` positioned past the row's edge inside an `overflow-clip` row; Motion drives the drag.         | 1 (example)      | **Yes** — snaps open at −100px; a drag past 80% of the width commits.                | **Keyboard focus reveals the panel**: `onFocus={() => x.set(-100)}`, `onBlur={() => x.set(0)}`. The button is in the tree and the tab order at all times. |
| [Ionic `ion-item-sliding`](https://ionicframework.com/docs/api/item-sliding) / [`ion-item-option`](https://github.com/ionic-team/ionic-framework/tree/main/core/src/components/item-option) | Compound children: up to two `<ion-item-options side>` groups, N `<ion-item-option>` each.                      | N                | **Yes**, by default; `expandable` adds a full-swipe that "covers any other options". | Each option is a native `<button>` or `<a>` (shadow part `native`). No documented way to open the panel from the keyboard.                                |
| [Framework7 swipeout](https://framework7.io/docs/swipeout)                                                                                                                                  | DOM: `.swipeout-actions-left/right` holding N anchors.                                                          | N                | **Yes**. `swipeout-overswipe` fires a `click` on the outermost button.               | Plain anchors; nothing swipe-specific documented.                                                                                                         |
| [Quasar `QSlideItem`](https://quasar.dev/vue-components/slide-item)                                                                                                                         | **Slots** `left`/`right`/`top`/`bottom` for content, **props** `left-color`/`right-color` for the panel colour. | 1                | **No** — commit-only; the handler receives `reset()` and calls it itself.            | Nothing documented.                                                                                                                                       |
| [SwiftUI `.swipeActions`](<https://developer.apple.com/documentation/swiftui/view/swipeactions(edge:allowsfullswipe:content:)>)                                                             | A `ViewBuilder` of `Button`s per `edge`; `allowsFullSwipe: Bool`.                                               | N                | **Yes**; full swipe is a flag over the resting list.                                 | VoiceOver reaches the buttons through the Actions rotor without swiping.                                                                                  |
| [UIKit `UISwipeActionsConfiguration`](https://developer.apple.com/documentation/uikit/uiswipeactionsconfiguration)                                                                          | `init(actions: [UIContextualAction])`; `performsFirstActionWithFullSwipe`.                                      | N                | **Yes**; the full swipe "performs the first action" of the list.                     | Actions rotor.                                                                                                                                            |
| [Compose `SwipeToDismissBox`](https://developer.android.com/reference/kotlin/androidx/compose/material3/package-summary#SwipeToDismissBox)                                                  | `backgroundContent` composable, enable flags per direction, `onDismiss`.                                        | 0 — dismiss only | **No** — threshold commit.                                                           | None built in.                                                                                                                                            |
| [react-swipeable-list](https://github.com/marekrozmus/react-swipeable-list)                                                                                                                 | Compound children: `<LeadingActions>` / `<TrailingActions>` holding N `<SwipeAction onClick destructive>`.      | N                | **Yes, by default**; `fullSwipe` is opt-in (`default: false`).                       | No accessibility section in the README.                                                                                                                   |
| [`@use-gesture`](https://use-gesture.netlify.app/), Motion `drag`                                                                                                                           | Gesture plumbing; no row, panel, or action model.                                                               | n/a              | caller's                                                                             | none — plumbing                                                                                                                                           |

What the table settles:

1. **One action per side is the outlier.** Every library that ships the
   pattern with a rest state takes a list; the two commit-only designs
   (Quasar, Compose) are the only ones that cap it, and Compose has no
   actions at all. The cap is a consequence of the model, not a choice: with
   no rest state there is no moment at which a person chooses among several.
   The count question and the rest question are one question.
2. **Where both exist, full swipe is defined over the resting list.**
   UIKit's flag _performs the first action_; Framework7's overswipe _clicks_
   the outermost button; react-swipeable-list's `fullSwipe: false` means "only
   opened, must be clicked". Commit-only is not a subset a resting model can
   grow out of; it is a different model.
3. **No web library states an accessibility answer, and the one that
   demonstrates one is React Aria's.** Adobe ships no swipe _component_, and
   the sibling research read that as a deliberate pass. Their documented iOS
   List example says otherwise: it ships the gesture, and it makes the panel
   a real button whose **focus reveals it**. That is the web's answer to the
   Actions rotor — the actions are in the tree because they are buttons, and
   reaching one by any route opens the panel. The native platforms can hide
   the panel because the OS exposes the declared actions separately; the web
   has no such channel, so hiding the panel (as #6821 does with `aria-hidden`)
   removes the only screen-reader path. [Square's Listable](https://github.com/square/Listable/pull/616)
   hides its panel _and_ keeps `accessibilityCustomActions` on the row; on the
   web the second half has no equivalent, so the first half must not be
   copied alone.
4. **Content is a slot more often than data.** Ionic, Framework7,
   react-swipeable-list and SwiftUI take children; UIKit takes data; Quasar
   splits the two — content in a slot, panel colour in a prop. Quasar is
   therefore evidence that a component can animate a reveal while knowing
   nothing about the content, not evidence for a configuration object.

Two claims from the research that preceded this record are corrected above:
Quasar is not a config-object precedent, and React Aria has not passed on the
gesture.

## Evidence: in the repository

| Where                                                                                                                                                           | What it shows                                                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`architecture:interaction-modality`](../../architecture/interaction-modality.md) INV4, INV7                                                                    | "Hover is never the only discovery or activation path." "Every supported modality has a perceivable and operable path" to an essential action. A swipe-only panel with a documented obligation fails INV7 by construction; a hover-only reveal fails INV4 the same way.           |
| `SideNavItem.actions?: ReactNode`                                                                                                                               | The repository already names "row-level secondary controls — siblings of the primary element at the trailing edge" **`actions`**, as a passthrough slot where "each control owns its accessible name, keyboard behavior, and disabled state". The vocabulary exists.              |
| `Item.endContent` doc: "badges, metadata, timestamps, or action buttons"                                                                                        | Row actions are built today by dropping buttons into `endContent`, always visible. The gap is the reveal, not the slot.                                                                                                                                                           |
| `Item` consumers: `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuSubMenu`, `SelectorOption`, `RadioListItem`, `ListItem` | Five of seven hosts render `Item` with a `menuitem`, `option`, or radio role, where an embedded button is invalid ARIA. Only `ListItem` (`role="list"`) permits arbitrary interactive children — the same boundary the owner drew on 2026-10-02 for per-row actions in a listbox. |
| `useAdaptivePresentation` / `COMPACT_TOUCH_PRESENTATION_QUERY`                                                                                                  | The system's existing adaptive split for overlays is `(max-width: 768px) and (pointer: coarse)`, and the owner ruled a component gets one adaptive query. See OQ4 for why row actions need capability, not width.                                                                 |
| `Toast/useToastGesture.ts`                                                                                                                                      | A shipped commit-only swipe whose one meaning is dismissal, with constants (`SWIPE_DISMISS_RATIO`) in source. The Compose model is already in core where it fits.                                                                                                                 |
| #6821 real-device feedback                                                                                                                                      | On an iOS device the swipe required a press-and-hold before it would start, and the row background did not restore until release. The gesture craft the pull request is credited with is not yet settled on a device.                                                             |

## Breadth of use

Each case below was checked against the recommended shape (DEC-1–DEC-4). The
last two are deliberately left out.

| Case                                             | Served | How, or why not                                                                                                                                                                                                      |
| ------------------------------------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mail: archive and delete                         | Yes    | Two controls in `actions`, `adaptive`. Hover or focus shows them; swipe rests them open; long drag fires the outermost.                                                                                              |
| One destructive action                           | Yes    | One control. Its handler decides whether to confirm first; because the accelerator fires the same handler, a confirming handler is safe under a long drag too.                                                       |
| Reversible toggle (read/unread, pin/flag)        | Yes    | The caller derives `label` from state. Each action is a plain button, not an `aria-pressed` toggle, because the label changes with the state and announcing both would double the information.                       |
| More than two actions                            | Yes    | The panel holds N buttons at their natural width. Guidance: three is the ceiling before the tail moves into a `MoreMenu` in `endContent`, which takes the same descriptors.                                          |
| An action that opens a confirm                   | Yes    | The control's handler opens the dialog; nothing in the row needs to know.                                                                                                                                            |
| Rows in a virtualized list                       | Yes    | One open row per list (FR7); a row that unmounts or leaves the viewport closes. The gesture yields to the scroller on a mostly vertical drag (FR6).                                                                  |
| Rows that are links (`href`)                     | Yes    | On a fine pointer the anchor is the primary and the actions reveal on hover/focus. On a coarse pointer the drag is distinguished from the tap by the axis lock, and the synthesized click after a drag is swallowed. |
| `role="list"` rows                               | Yes    | The host. Arbitrary interactive children are valid.                                                                                                                                                                  |
| `role="listbox"` options, `menuitem`, radio rows | **No** | ARIA forbids interactive descendants of `option` and `menuitem`. These rows keep `Item` as it is; a product needing per-row actions in a picker has outgrown a listbox (the 2026-10-02 `ComplexSelector` ruling).    |
| Dismiss-only swipe (Toast)                       | **No** | Already owned by `useToastGesture`; a different concept with one meaning per direction.                                                                                                                              |

## Options considered

Three shapes were taken far enough to write a callsite, cost, and
accessibility answer for each. The vibe test in the next section ran all
three. The record's author started from Option B on system grounds and was
moved to Option A by the test; both arguments are kept below so the owner can
weigh them.

### Option A — Declared actions (data array) — recommended

```tsx
<ListItem
  label={message.sender}
  description={message.subject}
  endContent={message.time}
  onClick={() => open(message.id)}
  actionsReveal="adaptive"
  actions={[
    {
      label: 'Archive',
      icon: <Icon icon={ArchiveIcon} />,
      onClick: () => archive(message.id),
    },
    {
      label: 'Delete',
      icon: <Icon icon={TrashIcon} />,
      onClick: () => remove(message.id),
      variant: 'destructive',
    },
  ]}
/>
```

- Count: an array; N per row. Rest: yes. Accessibility: structural — the
  row renders one real button per entry, so an accessible name is guaranteed
  (`label` is a required string) and nothing is pointer-only.
- Fits what exists: `DropdownMenu.items` and `MoreMenu.items` already
  declare actions as data in exactly this field vocabulary —
  `DropdownMenuItemData` is `{id?, label, icon, onClick, isDisabled,
variant: 'default' | 'destructive', …}`, and data mode "renders through
  `DropdownMenuItem`, so the two APIs describe the same thing". A row's
  actions and a menu's rows are the same kind of thing: verbs with a label,
  an icon, a handler, and a destructive marker. One vocabulary, two hosts.
- Costs: the first prop on a list row that holds data the row renders
  itself; every other row slot is a `ReactNode`. `SideNavItem.actions` is a
  `ReactNode` slot, so one name would carry two shapes in core (OQ2). The
  descriptor type is permanent.
- Forecloses: a control that is not a button — a `More` menu trigger, a
  toggle, a link — unless the descriptor grows. Mitigation that costs no
  API: because the descriptors are `MoreMenu.items`-compatible, a product
  with more verbs than fit routes the tail into a `MoreMenu` in `endContent`,
  and a later additive change can let the row do that overflow itself.

### Option B — Composed actions (slot of controls)

```tsx
<ListItem
  label={message.sender}
  description={message.subject}
  endContent={message.time}
  onClick={() => open(message.id)}
  actionsReveal="adaptive"
  actions={
    <>
      <ListItemAction
        label="Archive"
        icon={<Icon icon={ArchiveIcon} />}
        onClick={() => archive(message.id)}
      />
      <ListItemAction
        label="Delete"
        icon={<Icon icon={TrashIcon} />}
        onClick={() => remove(message.id)}
        variant="destructive"
      />
    </>
  }
/>
```

- Count: N; the panel measures its rendered width. Rest: yes. Accessibility:
  structural if the caller uses `ListItemAction`; the component finds the
  outermost control in the rendered DOM for the accelerator.
- The case for it: the controls are interactive elements the caller supplies
  (`spec:AST-055` DEC-1's reasoning); `SideNavItem.actions` already means a
  passthrough slot of row controls; the API Conventions page routes
  arbitrary content to composition; Ionic, Framework7, react-swipeable-list
  and SwiftUI take children. A `More` menu trigger drops straight in.
- Why it loses: the vibe test. Recognition tied with A at the ceiling, but
  every recall-probe builder (3/3) expected a data array and rejected child
  components unprompted, for two reasons that are also the system's: a list
  row has no children and everything else on it is leaf-shaped, and the row
  can only promise the reveal, the panel width and the tab order if it knows
  the verbs discretely. `AST-055`'s reasoning does not transfer cleanly
  either: there the caller already has a control it wants to be the element;
  here the caller has verbs, not controls. The component cannot verify a
  name on a bare `<button>` a caller drops in, and the panel's look depends
  on the caller choosing the blessed control.

### Option C — Touch-only commit swipe (#6821, made deliberate)

```tsx
<Item
  label={message.sender}
  onClick={() => open(message.id)}
  swipeActions={{
    leading: {
      label: 'Archive',
      onAction: () => archive(message.id),
      tone: 'success',
    },
    trailing: {
      label: 'Delete',
      onAction: () => remove(message.id),
      tone: 'error',
    },
  }}
/>
```

- Count: one per side, structurally. Rest: none. Accessibility: documentary —
  the panel is `aria-hidden` and the caller owes every verb a second path that
  nothing checks.
- Costs: fails `architecture:interaction-modality` INV7 unless each caller
  builds the second path. In the vibe test the naive builders reproduced
  every review finding: one built a selection model and a toolbar, changing
  what clicking a row does; one declined the API because commit-and-slide-out
  cannot precede a confirmation dialog; one could not fit four verbs into
  two slots and duplicated two of them. Widening to an array later breaks
  `ItemSwipeActions`. Hosted on `Item`, it reaches menu and option rows where
  a panel of controls is invalid.
- Honest case for it: it is Material's position (swipe means one thing per
  direction; everything richer is a menu), it is what the source product
  chose on purpose, it is already in core where it fits (Toast), and it is
  the least machinery. The record keeps it — as the `commit` value of
  `swipeBehavior` (DEC-3), valid for a row with one verb — rather than as the
  only model, and not on `Item` (DEC-4).

### Recommendation

**Option A, on `ListItem`, with the descriptor in the menu-row vocabulary.**
The field survey, the system argument and the builders agree that the
component owns the reveal and therefore needs the verbs as data; the recall
probe says that is also the shape a builder reaches for without being told;
and core already declares actions as data for menus, so this adds a host, not
a vocabulary. Option B's one real advantage — a non-button in the panel — is
covered by routing overflow into `MoreMenu`, which consumes the same data.

## Public API and concepts

| Concept                  | Closed values or states                                                                                                                            | Meaning                                                                                                                                                                                                                                                                                                                                                    | Default  | Owner            | Stability |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------- | --------- |
| `ListItem.actions`       | `ListItemActionData[]`                                                                                                                             | The row's secondary actions, in order. The row renders one real button per entry after its content; the last entry sits at the row's outer edge.                                                                                                                                                                                                           | absent   | `spec:AST-057`   | proposed  |
| `ListItemActionData`     | `{id?: string; label: string; icon?: ReactNode; onClick: () => void \| Promise<void>; isDisabled?: boolean; variant?: 'default' \| 'destructive'}` | One verb. The field names are `DropdownMenuItemData`'s, so an action list can also feed `MoreMenu.items`. `label` is the button's accessible name and is required; an icon-only presentation still has it.                                                                                                                                                 | —        | `component:List` | proposed  |
| `ListItem.actionsReveal` | `'always'` \| `'adaptive'`                                                                                                                         | How the actions are revealed. `always`: visible at the row's end. `adaptive`: hover and focus-within on a pointer that can hover; a sideways drag that rests open on one that cannot; focus everywhere.                                                                                                                                                    | `always` | `spec:AST-057`   | proposed  |
| `ListItem.swipeBehavior` | `'reveal'` \| `'commit'`                                                                                                                           | What the coarse-pointer drag does past its threshold. `reveal`: the row rests open with every action tappable, and a long drag fires the last one. `commit`: the last action fires on release and the row never rests; valid only when `actions` has one entry (a development warning otherwise). No effect under `always` or on a pointer that can hover. | `reveal` | `spec:AST-057`   | proposed  |
| rest state               | closed, open                                                                                                                                       | On a coarse pointer the row rests open after a drag past the panel's width, until closed (FR5, FR7).                                                                                                                                                                                                                                                       | closed   | `spec:AST-057`   | proposed  |
| full-swipe accelerator   | on                                                                                                                                                 | Under `reveal`, a drag past the commit point or a fling fires the **last** action — the one at the row's outer edge (FR5). Under `commit` it is the only outcome.                                                                                                                                                                                          | on       | `spec:AST-057`   | proposed  |
| the modality split       | internal                                                                                                                                           | Which affordance a device gets is derived from browser input capability, not a prop (`architecture:interaction-modality` INV6; query under OQ4).                                                                                                                                                                                                           | —        | `spec:AST-057`   | proposed  |
| a row with no primary    | static row                                                                                                                                         | A row with `actions` and no `onClick`/`href` is not itself focusable; its actions are its tab stops. Under `adaptive` they reveal on hover and on focus like any other row's.                                                                                                                                                                              | —        | `spec:AST-057`   | proposed  |

Not public: axis-lock distance, commit ratio, fling velocity, durations,
resistance, panel widths. They are behavior constants.

## Requirements

### Behavioral contract

| ID  | Invariant                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Basis                                                                 | Verification state                                              |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------- |
| FR1 | A list row MUST take its secondary actions as one array of descriptors, `actions: ListItemActionData[]`, and MUST render one real `<button>` per entry, in order, named by `label`. The descriptor's fields MUST keep the names and meanings of `DropdownMenuItemData` (`id`, `label`, `icon`, `onClick`, `isDisabled`, `variant`) so one action list can serve a row and a `MoreMenu`. A descriptor MUST NOT carry a node the component renders as the control.                                                                                                                                                                                                                                                                                                                                                       | DEC-1; `DropdownMenu.items`, `MoreMenu.items`; vibe recall 3/3        | Proposed; no evidence on `main`                                 |
| FR2 | The reveal MUST be one enum, `actionsReveal`, with the closed values `always` and `adaptive`, default `always`. There MUST NOT be a second action list, prop, or slot for any one modality.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | DEC-2, DEC-3; `spec:AST-002` FR16                                     | Proposed                                                        |
| FR3 | Under `always`, the actions MUST render visible at the row's end in every modality, exactly as `endContent` content would, and no gesture MUST be attached.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | DEC-2                                                                 | Proposed                                                        |
| FR4 | Under `adaptive` on a device whose primary input can hover, the actions MUST appear while the row is hovered and while focus is inside the row or its actions, and MUST otherwise be visually hidden but present. Hover MUST NOT be the only path (AR2).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `architecture:interaction-modality` INV4                              | Proposed                                                        |
| FR5 | Under `adaptive` on a device whose primary input cannot hover, a sideways drag MUST reveal the actions beside the row. Under `swipeBehavior="reveal"` (default) a release past the panel's width MUST leave the row resting open with every action tappable, and a drag past the commit point or a fling MUST fire the **last** entry of `actions` — the one at the row's outer edge — and no other. Under `"commit"` a release past the commit point or a fling MUST fire that entry and the row MUST NOT rest; `commit` with more than one entry MUST warn in development, because the other entries have no touch path. A release short of the threshold MUST spring back under both. Firing an action closes the row; a handler may return a Promise, and a confirming handler opens its dialog from a closed row. | DEC-3; UIKit `performsFirstActionWithFullSwipe`; Framework7 overswipe | Proposed; real-device evidence required                         |
| FR6 | The drag MUST decide its axis once, early, and a mostly vertical drag MUST stay the scroller's. A mouse MUST NOT start the drag. The click the browser synthesizes after a drag MUST NOT fire the row's primary action.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | #6821's gesture; press-model ORD1                                     | Proposed; device feedback on #6821 shows the first is unsettled |
| FR7 | At most one row per `List` MUST rest open. Opening another, tapping outside, scrolling the list, pressing Escape with focus inside, or firing an action MUST close it. A row that unmounts closes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | SwiftUI `swipeActionsContainer()`; Framework7 `app.swipeout.el`       | Proposed                                                        |
| FR8 | Directions MUST be logical: the panel revealed by a drag toward the inline end sits at the inline start, and the reverse, so the finger, the revealed edge, and the panel agree under RTL.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | #6821; `architecture:public-component-api` INV2 (logical direction)   | Proposed                                                        |
| FR9 | `Item` MUST NOT gain `actions`, `actionsReveal`, a swipe gesture, or a hover reveal. Any row rendered with a `menuitem`, `option`, or radio role MUST NOT host the capability.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | DEC-4; ARIA allowed-children rules                                    | Proposed; shipped `Item` conforms today                         |

### Accessibility contract

- **AR1 — The actions are real controls in the tree in every state.** Under
  every value of `actionsReveal`, the buttons rendered from `actions` are
  present, focusable, and in the tab order whether or not they are painted. Focus
  entering any of them MUST reveal the panel (on a fine pointer: the hover
  state; on a coarse pointer: the rest-open state). The panel MUST NOT be
  `aria-hidden`, `inert`, or `display: none` while any control inside it can
  receive focus. Visually hidden means clipped, not removed.
- **AR2 — Hover is never the only path.** Restated from
  `architecture:interaction-modality` INV4 because this record introduces a
  hover reveal: the keyboard path is AR1; the touch path is FR5; a fine
  pointer that cannot hover (a stylus, a pointer with `hover: none`) gets the
  coarse-pointer affordance.
- **AR3 — The swipe is never the only path.** No action may exist only in a
  gesture. This is the structural form of #6821's documented obligation:
  satisfied by construction, because the gesture reveals controls that are
  already in the tree, rather than by a sentence callers must remember.
- **AR4 — A touch screen reader reaches the actions through the tree.** A
  VoiceOver or TalkBack user who moves the reading cursor onto an action
  reveals it (AR1) and activates it with the standard gesture; no swipe is
  required.
- **AR5 — The row's primary stays one tab stop.** Adding actions adds stops
  after the row's primary element in DOM order; it does not change the
  primary's role, name, or activation. An action's accessible name is its own
  (`label` is required); the row's name does not absorb it.

### Platform support

- Supported feature/engine floor: every supported renderer and browser.
  Pointer capability is read from `(hover)` and `(pointer)` media features,
  which every supported browser implements; nothing else is behind a check.
- Unsupported behavior: a device that reports neither hover nor a coarse
  pointer gets the coarse-pointer affordance plus focus-reveal, never a
  pointer-only row.
- Browser evidence: FR4, FR5, FR6, FR7, AR1 are layout, paint, and gesture
  claims. jsdom has none of these; real-Chromium evidence with dispatched
  touch is required, and FR5/FR6 additionally need a physical touch device
  because #6821's device feedback contradicts its Chromium evidence.

## Vibe test

The three options were run as a vibe test under the wiki's
[Designing Vibe Tests](https://github.com/facebook/astryx/wiki/Designing-Vibe-Tests)
protocol: four prompts in the naive-builder voice that never name a prop, the
word "swipe", or the word "hover"; one reference doc per arm generated from a
single template so only the actions API differs; one fresh, context-free agent
per prompt × arm; plus three recall probes in which the behavior is described
and the props deliberately unnamed. Battery, generator, arm docs, task
prompts, raw results, and the scored table live in
[`internal/vibe-tests/row-actions-shape-test/`](../../../internal/vibe-tests/row-actions-shape-test/RESULTS.md).

**Outcome.** Recognition: Options A and B tied at the ceiling — 8/8 correct,
0/8 hallucinated, 8/8 typechecked against their stubs, every output left a
keyboard path by construction. Option C's agents read its doc correctly and
still reproduced the three review findings: one built a selection model and a
toolbar to satisfy the "reachable elsewhere" sentence, one declined the API
because commit-and-slide-out cannot precede a confirmation, one could not fit
four verbs into two slots. The negative control held in all three arms.
Recall: 3/3 builders expected `actions` as an **array of `{label, icon,
onClick, isDestructive}`**, 0/3 child components, 0/3 a render prop, with the
same two reasons each — a row has no children and is otherwise leaf-shaped,
and the row can only own the reveal if it knows the verbs. 3/3 named the
handler `onClick`. That probe decided OQ1's recommendation (DEC-1).

**Doc gaps the winning arms shared,** now requirements here: which end is
outermost (FR5 names the last entry); that focus reveals, said plainly (AR1,
and FR4's consumer-doc clause); what a row with actions and no primary is
(the concepts table); that a handler may return a Promise (FR5).

**What it did not prove.** Scores were assigned by the test's designer, not a
separate judge, to stay inside the agent budget; the hard numbers are the
typecheck column and the recall counts. Agents had the reference page only —
no project, no CLI — so discoverability through `astryx component` was not
measured. No implementation exists; every stub is a type this record
proposes.

## Current-state impact

- `component:List` gains `actions`, `actionsReveal`, and `ListItemActionData` as
  local public concepts when an implementation lands, citing this record for
  the shape and the reveal policy rather than recording a private copy.
- `architecture:interaction-modality` gains `spec:AST-057` in its deciding
  specs as the first public API whose whole purpose is to satisfy INV4 and
  INV7 for a gesture; no invariant changes.
- `contributing:api-conventions` gains two rules this record relies on and
  nothing documents: a modality gets an affordance, never its own action
  list; and a reveal that depends on hover or a gesture reveals controls that
  already exist in the tree.
- `Item` is unchanged and its consumer docs gain one sentence: row actions
  belong on `ListItem`; `Item` stays the row for menus and pickers.
- [#6821](https://github.com/facebook/astryx/pull/6821) is superseded in
  shape by this record; its commit-only model survives as `swipeBehavior="commit"`. Its gesture engineering — axis lock, logical
  directions, click suppression, reduced-motion handling, the Chromium
  evidence harness — is the right starting point for FR5, FR6, and FR8 on the
  new host, once the device-level findings are resolved.
- No shipped public API changes on this record's own merge.
- While this record is `draft` its `review-applicability:v1` block routes
  nothing: global routing loads `current` claims only
  (`architecture:knowledge-contracts` INV20). It becomes live on approval.

## Verification

| Contract      | Verification                                                                                       | Representative states                                                                                          | Mutation or failure expectation                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| FR1, FR2, FR9 | `ListItem` prop-surface suite plus exported-type checks; `Item` surface inventory                  | `actions` with one, two, and four entries; the same array passed to `MoreMenu.items`; `Item` with no new props | A second action list, a per-modality prop, a descriptor field that diverges from `DropdownMenuItemData`, or a new `Item` prop fails. |
| FR3, FR4, AR1 | jsdom focus suite plus real-Chromium hover and focus evidence                                      | `always`; `adaptive` with a hovering pointer; focus entering an action by Tab                                  | An action absent from the tab order, a panel `aria-hidden` while focusable, or hover with no focus equivalent fails.                 |
| FR5, FR6, FR8 | Real-Chromium dispatched-touch evidence plus physical-device check; RTL via the direction provider | Release short, past the panel, past the commit point, fling; vertical drag; mouse drag; RTL                    | Immediate fire with no rest, the wrong action fired, a vertical drag captured, a mouse drag starting, or a mirrored panel fails.     |
| FR7           | List-level suite                                                                                   | Two rows opened in turn; outside tap; scroll; Escape; action fired; row unmounted                              | Two rows open, or a row that stays open after any closing event, fails.                                                              |
| AR2, AR3, AR4 | Keyboard and screen-reader paths in the owning component's accessibility suite                     | A fine pointer without hover; a touch screen reader cursor on an action                                        | Any action reachable only by hover or only by swipe fails.                                                                           |
| AR5           | Accessible-name and tab-order assertions                                                           | Row with primary and two actions                                                                               | The row's name absorbing an action's label, or an action lacking its own name, fails.                                                |

Known verification gap: none of the suites above exist on `main`, and no
component implements the contract. This record is `draft`, does not govern
review, and names no implementation.

## Decision log

Every decision below is **proposed**. None has been ruled on; `approved_by`
is `null` and the record is `draft`.

### DEC-1 — Actions are declared as data the row renders

**Reference:** `spec:AST-057/DEC-1`
**Decider:** `cixzhang`, `<pending>`

A row's secondary actions are one array of descriptors, `actions:
ListItemActionData[]`, in the field vocabulary menu rows already use
(`label`, `icon`, `onClick`, `isDisabled`, `variant`). The row renders one
real button per entry.

The row owns the reveal — hover, focus, the drag, the rest state, the
accelerator, the tab order — and can only promise those if it knows the
verbs discretely: how many there are, what each is called, which one is
last. Core already declares verbs as data for the same reason in
`DropdownMenu.items` and `MoreMenu.items`, whose data mode "renders through
`DropdownMenuItem`, so the two APIs describe the same thing". Reusing that
vocabulary adds a host to an existing concept rather than a second concept.
The vibe test's recall probe found the same shape in every builder's hands
without being told (3/3), and found the handler name `onClick` the same way.

Rejected: a `ReactNode` slot of `ListItemAction` controls. It was this
record's first draft, on the strength of `spec:AST-055` DEC-1 (a caller's
control is the interactive element), `SideNavItem.actions` (already a slot of
row controls), and the composition-over-configuration guidance. The vibe test
tied the two at the ceiling on recognition and rejected the slot 3–0 on
recall, with reasons that are also the system's: a list row has no children
and is otherwise leaf-shaped, and the row cannot size a panel or keep it open
around content it does not understand. `AST-055` does not transfer cleanly —
there the caller already holds a control; here the caller holds verbs. The
slot's one real advantage, a non-button in the panel, is answered by routing
overflow into `MoreMenu`, which consumes the same descriptors.

Also rejected: a per-modality object (`swipeActions={{leading, trailing}}`).
It is a second action list for one modality, which DEC-2 and DEC-3 rule out,
and its one-per-side cap is the commit-only model's consequence.

### DEC-2 — One reveal policy, chosen by modality, not by the caller

**Reference:** `spec:AST-057/DEC-2`
**Decider:** `cixzhang`, `<pending>`

`actionsReveal` has two values. `always` is `endContent` with a name for the
verbs. `adaptive` keeps them out of the way until asked for, and the system
decides what "asked for" means per input: hover and focus where the pointer
can hover; a drag that rests open where it cannot; focus everywhere.

The caller owns whether the verbs may hide. The caller does not own which
device gets which affordance (`architecture:interaction-modality` INV6), and
does not own the obligation to make them reachable — that is the system's,
and it is met by AR1 rather than by prose.

Rejected: a per-modality switch (`hasSwipe`, `hasHoverReveal`). Two booleans
for one concept, and each one is a way to ship a pointer-only row.

### DEC-3 — The swipe reveals the resting actions by default; commit is a caller choice for one verb

**Reference:** `spec:AST-057/DEC-3`
**Decider:** `cixzhang`, `<pending>`

On a coarse pointer the drag reveals the same buttons. By default the row
rests open and a long drag or fling is an accelerator that fires the last
one. A caller may choose `swipeBehavior="commit"` instead: the last action
fires on release and the row never rests. There is no separate swipe action
list under either value.

Both models are real. Every surveyed library that supports both defines the
full swipe over the resting list — UIKit performs _the first action_,
Framework7 _clicks_ the outermost button, react-swipeable-list opens by
default and commits only on request — and a resting panel gives a touch user
something to see and reconsider before a destructive verb fires. That is the
default. Commit-only is Material's position and the one the product #6821
ports from chose deliberately: one verb per direction, nothing to reconsider,
the least machinery. The owner asked for both to be available, so it is a
value, not a rejection.

What commit cannot serve is stated rather than hidden. A verb that confirms
first: the row slides out while the dialog is still asking, which is why the
vibe test's builder declined #6821's API for that case. More than one verb
per side: with no rest there is no moment to pick, so `commit` with several
entries leaves the others without a touch path and warns in development
(`spec:AST-002` FR15). A product with several verbs and a commit swipe routes
the rest into a `MoreMenu` fed by the same array, which is the shape the
source product shipped.

Rejected: commit-only as the sole model, as #6821 ships it. It cannot grow
into resting without a default change, and its one-per-side cap is a
consequence rather than a choice. Also rejected: a per-modality action list.

### DEC-4 — The capability lives on the list row, and `Item` stays clear

**Reference:** `spec:AST-057/DEC-4`
**Decider:** `cixzhang`, `<pending>`

`ListItem`, inside `List`'s `role="list"`, hosts `actions` and
`actionsReveal`. `Item` does not.

`Item` is the shared row for `DropdownMenuItem`, `DropdownMenuCheckboxItem`,
`DropdownMenuRadioItem`, `DropdownMenuSubMenu`, `SelectorOption`, and
`RadioListItem`. Those render with `menuitem`, `option`, and radio roles,
whose permitted descendants exclude buttons; a revealed panel of controls
there is an `aria-required-children` violation in every case. Only
`ListItem` sits in a host where interactive children are valid. This is the
boundary the owner drew on 2026-10-02 for per-row actions in `MultiSelector`,
applied to the gesture.

Rejected: hosting on `Item` so every consumer gets it. Five of seven cannot
legally use it, and the two that could — `ListItem` and a bare `Item` in
caller markup — are served by `ListItem`.

## Open questions

- **OQ1 — Does the recommendation stand: declared data (Option A) rather than a slot of controls (Option B)?** (`human-api`)

  Recognition tied; recall went 3–0 for data; the system argument for data
  is the menu-row vocabulary. If the owner prefers the slot for the
  flexibility it gives (a `More` trigger, a toggle, a link in the panel),
  FR1 and DEC-1 flip and `ListItemAction` becomes a public component.

- **OQ2 — Is the prop named `actions`, given `SideNavItem.actions` is a `ReactNode` slot?** (`human-api`)

  Every recall builder named it `actions`; one weighed `secondaryActions`.
  `architecture:public-component-api` INV2 wants one name to carry one
  meaning. Options: accept the divergence and note that `SideNavItem` is a
  navigation row, not a list row; rename here (`secondaryActions`); or plan
  `SideNavItem.actions` toward data in its own record. The recommendation is
  `actions` with the divergence recorded, because the builders' instinct and
  the menu-row precedent both point at it.

- **OQ3 — Which word marks a destructive action: `variant: 'destructive'`, the shared status set `'success' | 'warning' | 'error'`, or #6821's `tone`?** (`human-design`)

  Three vocabularies already exist and a fourth is the thing to avoid.
  `DropdownMenuItem.variant: 'default' | 'destructive'` is the menu-row word,
  and the descriptor otherwise mirrors `DropdownMenuItemData`. The status set
  `'success' | 'warning' | 'error'` is shared by seven components (`Field`,
  `Selector`, `MultiSelector`, `TextArea`, `Table` row status, `ComplexSelector`,
  the input types) and the design guidelines say destructive actions read as
  `error`; `Step` extends it with `accent`. #6821's `tone: 'accent' | 'success'
| 'warning' | 'error'` is a third set with one decorative member. `Badge`'s
  variant map was also weighed and set aside: it holds `neutral | info |
success | warning | error` but also `blue | cyan | green | orange | pink`, so
  reusing it admits decoration into a slot that must mean state. 3/3 recall
  builders invented a boolean `isDestructive`. The recommendation is
  `variant: 'default' | 'destructive'` for parity with the menu row the same
  array can feed; the status set is the alternative if the owner wants an
  iOS-Mail green "Archive".

- **OQ4 — Which adaptive query?** (`human-api`)

  The owner ruled one adaptive query per component, and the overlay query is
  `(max-width: 768px) and (pointer: coarse)`. Row actions need capability,
  not width: a landscape tablet at 1024px cannot hover, so a width-gated split
  would give it the hover reveal and nothing to hover with. The recommendation
  is a capability-only split for `List` — `(hover: hover) and (pointer: fine)`
  for the hover reveal, everything else the drag — recorded as List's one
  query. Confirm, or rule that the overlay query is reused and accept the
  tablet gap.

- **OQ5 — Is the coarse-pointer model a prop, `swipeBehavior: 'reveal' | 'commit'`, with `reveal` the default?** (`human-api`)

  The owner asked for both models to be available. `reveal` is what every
  resting library and iOS Mail do and what the record argues for as the
  default; `commit` is the source product's deliberate choice and Material's
  position, kept for one-verb rows. The name mirrors `actionsReveal` and
  reads as behavior, not mechanism; `hasFullSwipe` was considered and
  rejected because under `reveal` the full swipe is already on and under
  `commit` it is the whole behavior, so a boolean would gate the wrong axis.
  Confirm the prop, its name, and that `commit` with several entries warns
  rather than silently stranding them.

- **OQ6 — One side or two on a coarse pointer?** (`human-design`)

  One `actions` list reveals at the row's end: a drag toward the inline
  start. iOS Mail and Gmail also use the leading side for a second set
  (archive on one side, delete on the other), and #6821 modelled both. The
  recommendation is one side now — it is what the hover reveal has, it keeps
  one list, and a leading side is additive later as a second array — but it
  is a visible product difference the owner should rule on.

- **OQ7 — Does a product need to open or close a row programmatically?** (`checkable`)

  Framework7 and Quasar expose `open`/`close`/`reset`; SwiftUI added
  `onPresentationChanged`. No Astryx product has asked. Left out of the
  public surface until one does; a controlled `isActionsOpen` /
  `onActionsOpenChange` pair would be the additive shape.

## Content boundary

This record does not duplicate `List`'s anatomy, prop table, theming targets,
or geometry contract; the modality invariants in
`architecture:interaction-modality`; the admission argument in
`spec:AST-002`; the trigger render-prop contract in `spec:AST-055`; the press
model in `module:DropdownMenu/useMenuPress`; or the gesture constants an
implementation will hold in source. It links their canonical owners.

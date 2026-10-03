You are running a vibe test.

You have NO prior knowledge of the system under test. Do NOT use prior knowledge of any specific component library, product, or convention beyond React and TypeScript themselves.

## Reference
The reference below is your ONLY documentation. Use ONLY what is documented there. Do not invent props, components, or imports that it does not mention; if you need something it does not provide, say so and build it from plain React instead.

<reference>
# List and ListItem

```
import {List, ListItem} from '@astryxdesign/core';
```

`List` renders a vertical list of rows. Each `ListItem` is one row: a
`label`, an optional `description` beneath it, `startContent` ahead of the
text (an icon, an avatar, a checkbox) and `endContent` after it (a badge, a
timestamp, metadata). A row with `onClick` or `href` is interactive: the
whole row is the click target and it is one tab stop.

## ListItem props

| prop | type | default |
| --- | --- | --- |
| `label` | `ReactNode` | — |
| `description` | `ReactNode` | — |
| `startContent` | `ReactNode` | — |
| `endContent` | `ReactNode` | — |
| `onClick` | `(event: MouseEvent) => void` | — |
| `href` | `string` | — |
| `isDisabled` | `boolean` | `false` |
| `isSelected` | `boolean` | `false` |

`endContent` is always visible and is the place for information about the
row. Icons come from `<Icon name="…" />`.

A row can carry secondary actions beside its primary click: verbs such as
archive, delete or pin. They can be kept out of the way until asked for:
with a mouse they appear when the row is hovered or when focus enters it;
on a touch screen a sideways drag reveals them and the row stays open so
they can be tapped. Every such action is a real button in the tab order.
**The props that do this are not listed in this reference.**

## Examples

A plain navigating list:

```tsx
<List>
  <ListItem label="Inbox" description="12 unread" onClick={() => go('/inbox')} />
  <ListItem label="Sent" onClick={() => go('/sent')} />
</List>
```

## Note

A row's `onClick` is the row's primary action. Anything else a person can
do to the row is a secondary action and must stay reachable by keyboard.
Use the component's own API for it.

</reference>

## Task
The reference says rows can carry secondary actions but deliberately does not name the props. For EACH of the three scenarios below, write the ListItem callsite you would EXPECT to work, inventing the prop names and shapes that feel most natural given the rest of the reference. Use the same invented API in all three. Then explain why you chose that shape (data vs. child components vs. something else) and what alternatives you rejected.

### Scenario 1 (p1)
Build the message list for a mail app. Each row shows the sender, the subject line and the time. Every message can be archived or deleted. On a phone people expect to flick a row sideways to get at those two verbs; on a laptop the list should stay clean, so the verbs should not clutter every row. Assume `messages` (with `id`, `sender`, `subject`, `time`), `archive(id)` and `remove(id)` already exist.

### Scenario 2 (p2)
Build a list of uploaded files, each row showing the file name and its size. Each file can be removed, but removal is permanent, so the person has to confirm in a dialog before anything is removed. Assume `files` (with `id`, `name`, `size`), `removeFile(id)` and a `useConfirm()` hook that returns `confirm(message): Promise<boolean>` already exist.

### Scenario 3 (p3)
Build a notifications list. Each row can be marked read or unread (whichever it currently is not), pinned or unpinned, snoozed, or deleted: four verbs on every row. A colleague who uses only the keyboard must be able to do all four on any row. Assume `notifications` (with `id`, `title`, `isRead`, `isPinned`), `markRead(id, isRead)`, `pin(id, isPinned)`, `snooze(id)` and `remove(id)` already exist.

## Output
Reply with exactly two sections:

### Code
One complete TSX component in a single ```tsx fenced block.

### Notes
Plain prose, no scores: what you reached for first, where you hesitated, anything you wanted but could not find in the reference, and any workarounds you used. Do not grade yourself.
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

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
| `swipeActions` | `{leading: SwipeAction; trailing?: SwipeAction}` | — |

`endContent` is always visible and is the place for information about the
row. Icons come from `<Icon name="…" />`.

`swipeActions` adds swipe actions for touch. Each `SwipeAction` is
`{label: string, icon?: ReactNode, onAction: () => void, tone?: 'accent' |
'success' | 'warning' | 'error'}`. Drag the row sideways to reveal a
labelled panel behind it; release past a third of the row, or fling, to fire
it and the row slides out; release short of that and the row springs back.
`leading` is a drag toward the end of the row, `trailing` a drag toward its
start, so the gesture reads the same in right-to-left languages. Touch only:
a mouse is ignored, and every swipe action must also be reachable by pointer
and keyboard somewhere else on the page.

## Examples

A plain navigating list:

```tsx
<List>
  <ListItem label="Inbox" description="12 unread" onClick={() => go('/inbox')} />
  <ListItem label="Sent" onClick={() => go('/sent')} />
</List>
```

Rows with a swipe action:

```tsx
<List>
  {items.map((item) => (
    <ListItem
      key={item.id}
      label={item.name}
      onClick={() => open(item.id)}
      swipeActions={{
        leading: {label: 'Share', icon: <Icon name="share" />, onAction: () => share(item.id)},
      }}
    />
  ))}
</List>
```

## Note

A row's `onClick` is the row's primary action. Anything else a person can
do to the row is a secondary action and must stay reachable by keyboard.
Give it a second, visible path.

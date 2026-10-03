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

| prop           | type                                             | default |
| -------------- | ------------------------------------------------ | ------- |
| `label`        | `ReactNode`                                      | —       |
| `description`  | `ReactNode`                                      | —       |
| `startContent` | `ReactNode`                                      | —       |
| `endContent`   | `ReactNode`                                      | —       |
| `onClick`      | `(event: MouseEvent) => void`                    | —       |
| `href`         | `string`                                         | —       |
| `isDisabled`   | `boolean`                                        | `false` |
| `isSelected`   | `boolean`                                        | `false` |
| `swipeActions` | `{leading: SwipeAction; trailing?: SwipeAction}` | —       |

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
  <ListItem
    label="Inbox"
    description="12 unread"
    onClick={() => go('/inbox')}
  />
  <ListItem label="Sent" onClick={() => go('/sent')} />
</List>
```

Rows with a swipe action:

```tsx
<List>
  {items.map(item => (
    <ListItem
      key={item.id}
      label={item.name}
      onClick={() => open(item.id)}
      swipeActions={{
        leading: {
          label: 'Share',
          icon: <Icon name="share" />,
          onAction: () => share(item.id),
        },
      }}
    />
  ))}
</List>
```

## Note

A row's `onClick` is the row's primary action. Anything else a person can
do to the row is a secondary action and must stay reachable by keyboard.
Give it a second, visible path.

</reference>

## Task

Build the message list for a mail app. Each row shows the sender, the subject line and the time. Every message can be archived or deleted. On a phone people expect to flick a row sideways to get at those two verbs; on a laptop the list should stay clean, so the verbs should not clutter every row. Assume `messages` (with `id`, `sender`, `subject`, `time`), `archive(id)` and `remove(id)` already exist.

## Output

Reply with exactly two sections:

### Code

One complete TSX component in a single ```tsx fenced block.

### Notes

Plain prose, no scores: what you reached for first, where you hesitated, anything you wanted but could not find in the reference, and any workarounds you used. Do not grade yourself.

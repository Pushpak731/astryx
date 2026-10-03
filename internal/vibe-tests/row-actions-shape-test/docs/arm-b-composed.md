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

| prop            | type                          | default    |
| --------------- | ----------------------------- | ---------- |
| `label`         | `ReactNode`                   | —          |
| `description`   | `ReactNode`                   | —          |
| `startContent`  | `ReactNode`                   | —          |
| `endContent`    | `ReactNode`                   | —          |
| `onClick`       | `(event: MouseEvent) => void` | —          |
| `href`          | `string`                      | —          |
| `isDisabled`    | `boolean`                     | `false`    |
| `isSelected`    | `boolean`                     | `false`    |
| `actions`       | `ReactNode`                   | —          |
| `actionsReveal` | `'always' \| 'adaptive'`      | `'always'` |

`endContent` is always visible and is the place for information about the
row. Icons come from `<Icon name="…" />`.

`actions` is a slot for the secondary actions of the row: one control per
verb. `ListItemAction` (also exported from `@astryxdesign/core`) is the
control made for it and takes `label: string`,
`icon?: ReactNode`, `onClick: () => void` and `tone?: 'accent' | 'success'
| 'warning' | 'error'`; any other button or menu trigger works there too.

`actionsReveal` says when the actions are shown. `"always"` keeps them
visible at the end of the row. `"adaptive"` keeps them out of the way until
asked for: with a mouse they appear when the row is hovered or when focus
enters it; on a touch screen a sideways drag reveals them and the row stays
open so they can be tapped, and a long drag fires the outermost one. Under
either value every action is a real button in the tab order, so a keyboard
user reaches each one by tabbing into the row.

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

Rows with a secondary action:

```tsx
<List>
  {items.map(item => (
    <ListItem
      key={item.id}
      label={item.name}
      onClick={() => open(item.id)}
      actions={
        <ListItemAction
          label="Share"
          icon={<Icon name="share" />}
          onClick={() => share(item.id)}
        />
      }
    />
  ))}
</List>
```

## Note

A row's `onClick` is the row's primary action. Anything else a person can
do to the row is a secondary action and must stay reachable by keyboard.
Put it in `actions`.

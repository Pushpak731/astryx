### Code

```tsx
import * as React from 'react';
import {Icon, List, ListItem} from '@astryxdesign/core';

// ---------------------------------------------------------------------------
// Invented API. The reference says rows can carry secondary actions that are
// revealed on hover/focus (mouse) or by a sideways drag (touch), and that each
// one is a real button in the tab order — but it does not name the props.
// This is the shape I would EXPECT to work:
//
//   <ListItem label="…" actions={[{label, icon, onClick, isDestructive}]} />
//
// `actions` is an array of plain data; ListItem owns the buttons, the reveal
// behaviour, the swipe gesture and the tab order. `label` is the accessible
// name (and visible text when revealed), `icon` is the usual <Icon /> slot,
// `onClick` may be async, `isDestructive` lets the system style delete/remove.
// ---------------------------------------------------------------------------
type RowAction = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void | Promise<void>;
  isDestructive?: boolean;
};

// ---- Scenario 1: mail --------------------------------------------------------

type Message = {id: string; sender: string; subject: string; time: string};

declare const messages: Message[];
declare function archive(id: string): void;
declare function remove(id: string): void;

export function MessageList({onOpen}: {onOpen: (id: string) => void}) {
  return (
    <List>
      {messages.map(m => {
        const actions: RowAction[] = [
          {
            label: 'Archive',
            icon: <Icon name="archive" />,
            onClick: () => archive(m.id),
          },
          {
            label: 'Delete',
            icon: <Icon name="trash" />,
            onClick: () => remove(m.id),
            isDestructive: true,
          },
        ];
        return (
          <ListItem
            key={m.id}
            label={m.sender}
            description={m.subject}
            endContent={m.time}
            onClick={() => onOpen(m.id)}
            actions={actions}
          />
        );
      })}
    </List>
  );
}

// ---- Scenario 2: uploaded files, confirm before removing ---------------------

type UploadedFile = {id: string; name: string; size: string};

declare const files: UploadedFile[];
declare function removeFile(id: string): void;
declare function useConfirm(): {confirm: (message: string) => Promise<boolean>};

export function FileList() {
  const {confirm} = useConfirm();
  return (
    <List>
      {files.map(f => (
        <ListItem
          key={f.id}
          label={f.name}
          endContent={f.size}
          actions={[
            {
              label: 'Remove',
              icon: <Icon name="trash" />,
              isDestructive: true,
              onClick: async () => {
                const ok = await confirm(
                  `Remove "${f.name}"? This cannot be undone.`,
                );
                if (ok) {
                  removeFile(f.id);
                }
              },
            },
          ]}
        />
      ))}
    </List>
  );
}

// ---- Scenario 3: notifications, four verbs, keyboard-only must work ---------

type Notification = {
  id: string;
  title: string;
  isRead: boolean;
  isPinned: boolean;
};

declare const notifications: Notification[];
declare function markRead(id: string, isRead: boolean): void;
declare function pin(id: string, isPinned: boolean): void;
declare function snooze(id: string): void;
declare function removeNotification(id: string): void;

export function NotificationList() {
  return (
    <List>
      {notifications.map(n => {
        const actions: RowAction[] = [
          {
            label: n.isRead ? 'Mark as unread' : 'Mark as read',
            icon: <Icon name={n.isRead ? 'mail-unread' : 'mail-open'} />,
            onClick: () => markRead(n.id, !n.isRead),
          },
          {
            label: n.isPinned ? 'Unpin' : 'Pin',
            icon: <Icon name={n.isPinned ? 'pin-off' : 'pin'} />,
            onClick: () => pin(n.id, !n.isPinned),
          },
          {
            label: 'Snooze',
            icon: <Icon name="clock" />,
            onClick: () => snooze(n.id),
          },
          {
            label: 'Delete',
            icon: <Icon name="trash" />,
            onClick: () => removeNotification(n.id),
            isDestructive: true,
          },
        ];
        return (
          <ListItem
            key={n.id}
            label={n.title}
            description={n.isRead ? undefined : 'Unread'}
            startContent={n.isPinned ? <Icon name="pin" /> : undefined}
            actions={actions}
          />
        );
      })}
    </List>
  );
}

export default function Demo() {
  return (
    <>
      <MessageList onOpen={id => console.log('open', id)} />
      <FileList />
      <NotificationList />
    </>
  );
}
```

### Notes

The first thing I reached for was a single `actions` prop holding an array of plain objects. Everything else on `ListItem` is leaf-shaped data: `label`, `description`, `startContent`, `endContent` are slots, `isDisabled`/`isSelected` are `is*` booleans, and the row has no `children`. An array of `{label, icon, onClick, isDestructive}` fits that pattern, and it hands the component everything it needs to own the hard parts the reference promises — rendering real buttons, revealing them on hover/focus, the sideways drag on touch, keeping the row open after a swipe, and putting each button in the tab order. Those behaviours are only possible if the component knows the actions as data rather than receiving arbitrary markup.

I rejected child components (`<ListItem><ListItemAction … /></ListItem>`) because `ListItem` has no children slot in the reference and `label` is already a prop; introducing children would make it unclear what a child _is_. I also rejected putting buttons into `endContent`: the reference says `endContent` is always visible and is for _information_, and a button nested inside a clickable row breaks the stated guarantee that the whole row is the click target and one tab stop. A render prop felt like over-engineering for a list of verbs.

Where I hesitated: the name. The reference consistently says "secondary actions", so `secondaryActions` would be the most literal; I chose `actions` because the Note already defines `onClick` as _the_ primary action, so anything in `actions` is secondary by definition. I also hesitated over whether `icon` should be a `ReactNode` (consistent with the `*Content` slots) or a bare icon name string; I went with the node since the reference shows `<Icon name="…" />` as the way icons are expressed. I assumed `Icon` is exported from the same package — the reference does not show its import.

Things I wanted but could not find: a way to force actions to be always visible. For the keyboard-only colleague in the notifications scenario the reference's promise (actions appear when focus enters the row, every action is a real button in the tab order) does technically cover it, but hidden-until-focused actions are hard to discover, and four of them per row makes tabbing through the list slow. I also could not tell whether a row with `actions` but no `onClick`/`href` (the files and notifications lists) counts as "interactive" — i.e. whether it still receives focus and reveals its actions, or whether the first button is simply the first tab stop. I built those rows without a primary click and am relying on the component to handle it. Nothing in the reference says what an icon-only action announces, so I made `label` a required string on the assumption it becomes the accessible name.

Workarounds were minimal: the confirmation in the files list is just an async `onClick` that awaits `confirm()` and only then calls `removeFile`, since nothing in the API needed to know about the dialog. The read/unread and pin/unpin verbs are computed per row from the item's state rather than being two separate actions.

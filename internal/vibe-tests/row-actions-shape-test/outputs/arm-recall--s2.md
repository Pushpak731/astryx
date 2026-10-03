### Code

```tsx
import * as React from 'react';
import {Icon, List, ListItem} from '@astryxdesign/core';

/**
 * INVENTED API — not in the reference.
 *
 * I am guessing that ListItem takes an `actions` prop: an array of plain
 * objects, one per secondary verb. The component owns rendering them as real
 * buttons, hiding them until hover/focus on pointer devices, revealing them
 * on a sideways drag on touch, and keeping them in the tab order.
 */
type ListItemAction = {
  /** Stable key, and what the component can use to label the control group. */
  id: string;
  /** Accessible name; also the visible text if the component shows text. */
  label: string;
  /** Optional glyph, built from the documented <Icon name="…" />. */
  icon?: React.ReactNode;
  /** May be async so the component can hold the row open until it settles. */
  onClick: (event: React.MouseEvent) => void | Promise<void>;
  /** Hint for styling/placement of irreversible verbs (delete). Speculative. */
  isDestructive?: boolean;
};

// Loose stand-in so this file type-checks against a ListItem whose real
// secondary-action props I cannot see. In a real callsite I would drop this.
const Row = ListItem as React.ComponentType<
  React.ComponentProps<typeof ListItem> & {actions?: ListItemAction[]}
>;

// ---------------------------------------------------------------------------
// Scenario 1 — mail: archive / delete, swipe on phone, clean rows on laptop
// ---------------------------------------------------------------------------

type Message = {id: string; sender: string; subject: string; time: string};

export function MessageList(props: {
  messages: Message[];
  archive: (id: string) => void;
  remove: (id: string) => void;
  open: (id: string) => void;
}) {
  const {messages, archive, remove, open} = props;
  return (
    <List>
      {messages.map(m => (
        <Row
          key={m.id}
          label={m.sender}
          description={m.subject}
          endContent={m.time}
          onClick={() => open(m.id)}
          actions={[
            {
              id: 'archive',
              label: 'Archive',
              icon: <Icon name="archive" />,
              onClick: () => archive(m.id),
            },
            {
              id: 'delete',
              label: 'Delete',
              icon: <Icon name="trash" />,
              isDestructive: true,
              onClick: () => remove(m.id),
            },
          ]}
        />
      ))}
    </List>
  );
}

// ---------------------------------------------------------------------------
// Scenario 2 — uploaded files: remove, with confirmation first
// ---------------------------------------------------------------------------

type UploadedFile = {id: string; name: string; size: string};

export function FileList(props: {
  files: UploadedFile[];
  removeFile: (id: string) => void;
  useConfirm: () => (message: string) => Promise<boolean>;
}) {
  const {files, removeFile, useConfirm} = props;
  const confirm = useConfirm();
  return (
    <List>
      {files.map(f => (
        <Row
          key={f.id}
          label={f.name}
          endContent={f.size}
          actions={[
            {
              id: 'remove',
              label: 'Remove',
              icon: <Icon name="trash" />,
              isDestructive: true,
              onClick: async () => {
                // Async handler: nothing happens until the dialog resolves.
                const ok = await confirm(
                  `Remove ${f.name}? This cannot be undone.`,
                );
                if (ok) removeFile(f.id);
              },
            },
          ]}
        />
      ))}
    </List>
  );
}

// ---------------------------------------------------------------------------
// Scenario 3 — notifications: four verbs, all keyboard-reachable
// ---------------------------------------------------------------------------

type Notification = {
  id: string;
  title: string;
  isRead: boolean;
  isPinned: boolean;
};

export function NotificationList(props: {
  notifications: Notification[];
  markRead: (id: string, isRead: boolean) => void;
  pin: (id: string, isPinned: boolean) => void;
  snooze: (id: string) => void;
  remove: (id: string) => void;
  open: (id: string) => void;
}) {
  const {notifications, markRead, pin, snooze, remove, open} = props;
  return (
    <List>
      {notifications.map(n => (
        <Row
          key={n.id}
          label={n.title}
          startContent={n.isPinned ? <Icon name="pin" /> : null}
          endContent={n.isRead ? null : 'Unread'}
          onClick={() => open(n.id)}
          actions={[
            {
              id: 'read',
              label: n.isRead ? 'Mark unread' : 'Mark read',
              icon: <Icon name={n.isRead ? 'mail' : 'mail-open'} />,
              onClick: () => markRead(n.id, !n.isRead),
            },
            {
              id: 'pin',
              label: n.isPinned ? 'Unpin' : 'Pin',
              icon: <Icon name="pin" />,
              onClick: () => pin(n.id, !n.isPinned),
            },
            {
              id: 'snooze',
              label: 'Snooze',
              icon: <Icon name="clock" />,
              onClick: () => snooze(n.id),
            },
            {
              id: 'delete',
              label: 'Delete',
              icon: <Icon name="trash" />,
              isDestructive: true,
              onClick: () => remove(n.id),
            },
          ]}
        />
      ))}
    </List>
  );
}
```

### Notes

The first thing I reached for was a flat `actions` array of plain objects on `ListItem`, sitting beside `label`, `description`, `startContent` and `endContent`. Everything else in the reference is a flat prop on the row — there are no compound children, no render props, no `List.Item.Action`-style nesting — so a new prop felt more in keeping than a new component. The deciding factor, though, was behavior rather than style: the reference promises that the actions are hidden until hover/focus, revealed by a sideways drag on touch, and that each one is a real button in the tab order. The component can only make those promises if it knows about each verb discretely (label, handler, how many there are), which a ReactNode slot cannot give it. A data array hands over exactly that, and it means every callsite gets the keyboard story for free — important for scenario 3, where the whole point is that a keyboard-only colleague can do all four without the author doing anything special.

I rejected three alternatives. A free `ReactNode` slot (something like `hiddenEndContent`) was tempting because it mirrors `endContent`, but it would let people drop in non-buttons, and the row could not keep the swipe tray open or size it correctly without knowing what is inside. Child components (`<ListItem …><ListItemAction …/></ListItem>`) would work but would be the only compound API in the reference, and `label` already occupies the "children" role conceptually. A render prop (`renderActions={({isRevealed}) => …}`) gives the most control but pushes the hover/touch/focus reveal logic back onto every callsite, which is the opposite of what the reference is selling.

Where I hesitated: the shape of the action object. `id`, `label`, `icon`, `onClick` felt safe. `isDestructive` is a guess, borrowed from the `isDisabled`/`isSelected` boolean naming convention, because a delete verb usually wants to look different and sit at the far end of a swipe tray; I would not be surprised if the real prop is named differently or does not exist. I also assumed `onClick` may return a Promise so the row can stay open while the confirm dialog in scenario 2 is up; the reference says nothing about async handlers, so if the component tears down the tray on the first click the confirmation would still work but the row would snap shut behind the dialog.

Things I wanted but could not find: the actual icon names (`archive`, `trash`, `pin`, `clock`, `mail`, `mail-open` are inventions — the reference only shows the `<Icon name="…" />` shape); any guidance on how many actions the reveal pattern comfortably holds, since four verbs on a swipe tray is a lot and I would expect either overflow behavior or a recommendation to cap at two or three; whether a row with actions but no `onClick` (scenario 2) is still treated as "interactive" for focus purposes; and a dialog component for the confirmation. For the last one the scenario supplied `useConfirm()`, so I used it as given and did not reach for a UI primitive. The `Row = ListItem as …` cast is purely a workaround to make the file type-check against a prop I cannot see; a real callsite would use `ListItem` directly once the prop name is known.

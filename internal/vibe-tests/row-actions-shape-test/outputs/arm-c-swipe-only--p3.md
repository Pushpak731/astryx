### Code

```tsx
import React from 'react';
import {List, ListItem} from '@astryxdesign/core';

type Notification = {
  id: string;
  title: string;
  isRead: boolean;
  isPinned: boolean;
};

type Props = {
  notifications: Notification[];
  markRead: (id: string, isRead: boolean) => void;
  pin: (id: string, isPinned: boolean) => void;
  snooze: (id: string) => void;
  remove: (id: string) => void;
};

export function NotificationsList({
  notifications,
  markRead,
  pin,
  snooze,
  remove,
}: Props) {
  return (
    <List>
      {notifications.map(n => {
        const readLabel = n.isRead ? 'Mark unread' : 'Mark read';
        const pinLabel = n.isPinned ? 'Unpin' : 'Pin';
        const status = [
          n.isRead ? 'Read' : 'Unread',
          n.isPinned ? 'Pinned' : null,
        ]
          .filter(Boolean)
          .join(' · ');

        return (
          <ListItem
            key={n.id}
            label={n.title}
            description={status}
            endContent={
              // Plain buttons: every verb is a real tab stop and a visible click target.
              <div role="group" aria-label={`Actions for ${n.title}`}>
                <button type="button" onClick={() => markRead(n.id, !n.isRead)}>
                  {readLabel}
                </button>
                <button type="button" onClick={() => pin(n.id, !n.isPinned)}>
                  {pinLabel}
                </button>
                <button type="button" onClick={() => snooze(n.id)}>
                  Snooze
                </button>
                <button type="button" onClick={() => remove(n.id)}>
                  Delete
                </button>
              </div>
            }
            swipeActions={{
              leading: {
                label: readLabel,
                onAction: () => markRead(n.id, !n.isRead),
                tone: 'accent',
              },
              trailing: {
                label: 'Delete',
                onAction: () => remove(n.id),
                tone: 'error',
              },
            }}
          />
        );
      })}
    </List>
  );
}
```

### Notes

I reached for `swipeActions` first because it is the only row-action API in the reference, then backed off it as the primary path: it only has two slots (leading and trailing), it is touch-only, and the reference itself says every swipe action needs a second pointer-and-keyboard path. So swipe is a convenience for mark-read and delete on touch, and the real four-verb surface is a group of plain buttons in `endContent`.

The main hesitation was whether `endContent` is allowed to hold interactive children. The reference describes it as "the place for information about the row" and lists only passive examples (badge, timestamp), and it says an interactive row is a single tab stop with the whole row as the click target. Putting buttons inside a row that also has `onClick` looked like it would either nest interactive elements or get swallowed by the row's tab stop, so I left the rows non-interactive (the task does not ask for an open/navigate action) and let the buttons be the only focusable things. If `endContent` is actually inert for focus even on a non-interactive row, this approach fails and I would have to render the buttons outside `ListItem`.

Things I wanted and could not find: a documented actions or overflow-menu prop on `ListItem`; a `Button` component; an import path for `Icon` (the reference mentions `<Icon name="…" />` but the only import line shows `List` and `ListItem`), so I used text labels instead of icons; and a statement about whether `List` accepts non-`ListItem` children, which would have given me a safer place for the action buttons. The `description` line doubling as a read/pinned status is a workaround for having no documented way to visually mark an unread row other than `isSelected`, which I did not want to repurpose.

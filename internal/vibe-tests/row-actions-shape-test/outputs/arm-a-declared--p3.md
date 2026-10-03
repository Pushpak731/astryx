### Code

```tsx
import * as React from 'react';
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
  if (notifications.length === 0) {
    return <p>No notifications.</p>;
  }

  return (
    <List>
      {notifications.map(n => {
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
            isSelected={n.isPinned}
            actionsReveal="always"
            actions={[
              {
                label: n.isRead ? 'Mark unread' : 'Mark read',
                onAction: () => markRead(n.id, !n.isRead),
              },
              {
                label: n.isPinned ? 'Unpin' : 'Pin',
                onAction: () => pin(n.id, !n.isPinned),
                tone: n.isPinned ? undefined : 'accent',
              },
              {
                label: 'Snooze',
                onAction: () => snooze(n.id),
              },
              {
                label: 'Delete',
                onAction: () => remove(n.id),
                tone: 'error',
              },
            ]}
          />
        );
      })}
    </List>
  );
}
```

### Notes

I reached for `actions` first. The reference is explicit that anything beyond the row's primary click is a secondary action and belongs in `actions`, and that every action is a real button in the tab order regardless of `actionsReveal`. That settled the keyboard requirement without any extra work on my side: four entries, four buttons, each reachable by Tab.

I hesitated on two things. First, whether the row should have an `onClick` at all. The task names four verbs and no primary action, so I left the row non-interactive and let the buttons carry everything; giving the row a click would have promoted one verb (probably "mark read") to primary with no instruction to do so. Second, `actionsReveal`. "adaptive" would be cleaner visually, but the reference describes its keyboard story only as "tabbing into the row" and doesn't say whether the buttons become visible when focus lands on them. Since the brief is about a keyboard-only colleague, I chose "always" so the four buttons are visible as well as reachable.

Things I wanted but could not find: a documented import for `Icon` (the reference uses `<Icon name="…" />` but the import line only names `List` and `ListItem`), and a list of valid icon names, so I shipped text-only action labels rather than guess. There is also no documented way to style a row as unread (bold label, dot, etc.); I used `description` for a "Read/Unread · Pinned" status line and borrowed `isSelected` to visually distinguish pinned rows, which is a slight repurposing of that prop. I also wanted a way to mark the action label dynamically per state, which `actions` handles fine since it is plain data, but the reference gives no guidance on whether the button's accessible name updates live when the label flips from "Mark read" to "Mark unread"; I assumed it does since it's just a rerender. The empty state is plain React, since nothing in the reference covers an empty `List`.

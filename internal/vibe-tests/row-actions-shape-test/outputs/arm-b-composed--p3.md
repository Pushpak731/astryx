### Code

```tsx
import * as React from 'react';
import {List, ListItem, ListItemAction} from '@astryxdesign/core';

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
declare function remove(id: string): void;

function statusText(notification: Notification): string | null {
  const parts: string[] = [];
  if (!notification.isRead) parts.push('Unread');
  if (notification.isPinned) parts.push('Pinned');
  return parts.length > 0 ? parts.join(' · ') : null;
}

export function NotificationsList(): JSX.Element {
  return (
    <List>
      {notifications.map(notification => {
        const status = statusText(notification);
        return (
          <ListItem
            key={notification.id}
            label={notification.title}
            isSelected={!notification.isRead}
            endContent={status ? <span>{status}</span> : undefined}
            actionsReveal="always"
            actions={
              <>
                <ListItemAction
                  label={
                    notification.isRead ? 'Mark as unread' : 'Mark as read'
                  }
                  onClick={() =>
                    markRead(notification.id, !notification.isRead)
                  }
                />
                <ListItemAction
                  label={notification.isPinned ? 'Unpin' : 'Pin'}
                  tone={notification.isPinned ? 'accent' : undefined}
                  onClick={() => pin(notification.id, !notification.isPinned)}
                />
                <ListItemAction
                  label="Snooze"
                  tone="warning"
                  onClick={() => snooze(notification.id)}
                />
                <ListItemAction
                  label="Delete"
                  tone="error"
                  onClick={() => remove(notification.id)}
                />
              </>
            }
          />
        );
      })}
    </List>
  );
}
```

### Notes

I reached for `actions` with four `ListItemAction`s first, since the reference says every verb beyond the row's primary click is a secondary action and belongs there, and that each action is a real button in the tab order regardless of `actionsReveal`. That single sentence is what made the keyboard requirement feel solved without extra work on my side.

I hesitated on `actionsReveal`. "adaptive" is the natural look for a notifications list, but the touch description worried me: a long drag "fires the outermost one," and with four verbs including delete I could not tell from the reference which end counts as outermost, so I could not safely order the actions to keep delete away from that gesture. I chose "always" so nothing is fired implicitly, at the cost of a busier row.

I also hesitated on whether the row should have an `onClick` at all. The task names four verbs and no primary action, and the reference says `onClick` is the row's primary action, so I left rows non-interactive rather than invent one (for example, making a tap mark the row read). If opening the notification is a real action, it should be the row's `onClick`.

Things I wanted but could not find: the reference mentions `<Icon name="…" />` but does not say where `Icon` is imported from or which names exist, so I left all four actions text-only. I also wanted a documented way to show unread/pinned state; I used `isSelected` to hint "unread" and put plain text in `endContent`, which is a guess at intent, not a documented pattern. Finally, I wanted to know whether `actions` accepts a fragment with several children or needs a specific wrapper; the reference only shows a single child, so the fragment is an assumption. The `declare` lines stand in for the functions the task says already exist.

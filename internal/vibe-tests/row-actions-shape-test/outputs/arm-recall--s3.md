### Code

```tsx
import {Icon, List, ListItem} from '@astryxdesign/core';
import type {MouseEvent} from 'react';

// ---- Invented API (not in the reference) ------------------------------
// I am assuming ListItem accepts an `actions` prop: an array of secondary
// action descriptors. Each becomes a real button that the component hides
// until hover/focus (pointer) or sideways drag (touch).
type ListItemAction = {
  label: string; // accessible name + visible text when revealed
  icon?: string; // Icon name
  onClick: (event: MouseEvent) => void | Promise<void>;
  isDestructive?: boolean; // styling hint for delete-like verbs
};

type Message = {id: string; sender: string; subject: string; time: string};
type UploadedFile = {id: string; name: string; size: string};
type Notification = {
  id: string;
  title: string;
  isRead: boolean;
  isPinned: boolean;
};

declare const messages: Message[];
declare const archive: (id: string) => void;
declare const remove: (id: string) => void;
declare const openMessage: (id: string) => void;

declare const files: UploadedFile[];
declare const removeFile: (id: string) => void;
declare function useConfirm(): {confirm: (message: string) => Promise<boolean>};

declare const notifications: Notification[];
declare const markRead: (id: string, isRead: boolean) => void;
declare const pin: (id: string, isPinned: boolean) => void;
declare const snooze: (id: string) => void;
declare const removeNotification: (id: string) => void;
declare const openNotification: (id: string) => void;

// ---- p1: mail list ----------------------------------------------------
function MessageList() {
  return (
    <List>
      {messages.map(m => {
        const actions: ListItemAction[] = [
          {label: 'Archive', icon: 'archive', onClick: () => archive(m.id)},
          {
            label: 'Delete',
            icon: 'trash',
            isDestructive: true,
            onClick: () => remove(m.id),
          },
        ];
        return (
          <ListItem
            key={m.id}
            label={m.sender}
            description={m.subject}
            endContent={m.time}
            onClick={() => openMessage(m.id)}
            actions={actions}
          />
        );
      })}
    </List>
  );
}

// ---- p2: uploaded files with confirm-before-remove --------------------
function FileList() {
  const {confirm} = useConfirm();

  return (
    <List>
      {files.map(f => (
        <ListItem
          key={f.id}
          label={f.name}
          description={f.size}
          startContent={<Icon name="file" />}
          actions={[
            {
              label: 'Remove',
              icon: 'trash',
              isDestructive: true,
              onClick: async () => {
                const ok = await confirm(
                  `Remove "${f.name}"? This cannot be undone.`,
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

// ---- p3: notifications with four verbs --------------------------------
function NotificationList() {
  return (
    <List>
      {notifications.map(n => (
        <ListItem
          key={n.id}
          label={n.title}
          startContent={<Icon name={n.isRead ? 'mail-open' : 'mail'} />}
          endContent={n.isPinned ? <Icon name="pin" /> : null}
          isSelected={!n.isRead}
          onClick={() => openNotification(n.id)}
          actions={[
            {
              label: n.isRead ? 'Mark unread' : 'Mark read',
              icon: n.isRead ? 'mail' : 'mail-open',
              onClick: () => markRead(n.id, !n.isRead),
            },
            {
              label: n.isPinned ? 'Unpin' : 'Pin',
              icon: 'pin',
              onClick: () => pin(n.id, !n.isPinned),
            },
            {label: 'Snooze', icon: 'clock', onClick: () => snooze(n.id)},
            {
              label: 'Delete',
              icon: 'trash',
              isDestructive: true,
              onClick: () => removeNotification(n.id),
            },
          ]}
        />
      ))}
    </List>
  );
}

export default function VibeTest() {
  return (
    <>
      <MessageList />
      <FileList />
      <NotificationList />
    </>
  );
}
```

### Notes

I reached first for a single `actions` prop on `ListItem` holding an array of `{label, icon, onClick, isDestructive}` objects. The rest of the reference is slot-and-flag shaped (`startContent`, `endContent`, `isDisabled`, `isSelected`) and every example is a self-closing `ListItem`, so a data prop felt like the native idiom; a sub-component API (`<ListItem><ListItemAction …/></ListItem>`) would be the first child-based thing in the reference and nothing hints that `ListItem` takes children. Data also fits what the component has to do: it owns reveal-on-hover, swipe-to-reveal and the tab order, so it needs to know the whole set of actions up front rather than receive opaque nodes. I wanted `label` on each action because the reference says the hidden actions are "real buttons in the tab order," and a button needs an accessible name even when only an icon shows.

Where I hesitated: the handler name. The reference uses `onClick` on the row, so I mirrored it rather than `onPress`/`onSelect`. I also wondered whether `endContent` was meant to hold the actions — the reference goes out of its way to say `endContent` is "always visible" and for information, which I read as "not here." I considered putting a visible delete button in `endContent` for p2 since a confirm step already slows the person down, but rejected it because the Note says secondary actions must use the component's own API.

Things I wanted but could not find: whether an action `onClick` may return a Promise (p2 awaits a confirm; I assumed the component just fires and forgets), whether the swipe tray closes after an action runs (p3's "mark read" flips the label, so the tray re-rendering open would be odd), whether there is a cap on action count (four may overflow a swipe tray), and whether there is an `isDisabled` per action. I also could not tell whether a row with `actions` but no `onClick` (p2) is still treated as interactive/one tab stop or whether it needs a no-op `onClick`. For p3 I used `isSelected` to surface unread rows because there is no unread/emphasis prop; that is a stretch of `isSelected`'s meaning and I would want to check it.

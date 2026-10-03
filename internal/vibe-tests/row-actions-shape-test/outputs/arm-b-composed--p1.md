### Code

```tsx
import * as React from 'react';
import {List, ListItem, ListItemAction} from '@astryxdesign/core';

type Message = {
  id: string;
  sender: string;
  subject: string;
  time: string;
};

type MessageListProps = {
  messages: ReadonlyArray<Message>;
  archive: (id: string) => void;
  remove: (id: string) => void;
};

export function MessageList({messages, archive, remove}: MessageListProps) {
  return (
    <List>
      {messages.map(message => (
        <ListItem
          key={message.id}
          label={message.sender}
          description={message.subject}
          endContent={<time>{message.time}</time>}
          actionsReveal="adaptive"
          actions={
            <>
              <ListItemAction
                label="Delete"
                tone="error"
                onClick={() => remove(message.id)}
              />
              <ListItemAction
                label="Archive"
                onClick={() => archive(message.id)}
              />
            </>
          }
        />
      ))}
    </List>
  );
}
```

### Notes

I reached for `actionsReveal="adaptive"` first, because the reference describes exactly the two behaviours asked for in one setting: hover/focus reveal on a laptop, sideways drag on a phone. The row slots mapped cleanly: sender as `label`, subject as `description`, time as `endContent` (the reference says `endContent` is for information about the row, which a timestamp is). Archive and delete are secondary verbs, so they went into `actions` as two `ListItemAction`s, with `tone="error"` on Delete since it is destructive.

I hesitated on three things. First, the row has no `onClick`: the task does not give an "open" function, and I did not want to invent one, so the rows are not interactive themselves. In a real mail app the row would open the message and I would add `onClick` then; the reference does not say whether `actions` behave any differently on a non-interactive row. Second, ordering: the reference says a long drag fires "the outermost" action but does not say which end that is. I put Archive last on the guess that the outermost is the one farthest from the text, so an over-long flick archives rather than deletes; if the convention is the opposite I would swap them. Third, I wrapped the two actions in a fragment because `actions` is a single `ReactNode`; the reference's example shows only one action, so I am assuming multiple siblings are fine.

What I wanted but could not find: the `Icon` component is mentioned ("Icons come from `<Icon name="…" />`") but its import and the available icon names are not documented, so I left the actions text-only rather than guess names like "archive" or "trash". I also could not find anything about confirming a destructive action, undo, or whether the swipe-open state closes after an action fires, so I did not try to handle those. The only workaround was using a plain `<time>` element for the timestamp since nothing in the reference provides a time or metadata primitive.

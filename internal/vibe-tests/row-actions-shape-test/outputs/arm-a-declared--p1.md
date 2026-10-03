### Code

```tsx
import * as React from 'react';
import {Icon, List, ListItem} from '@astryxdesign/core';

type Message = {
  id: string;
  sender: string;
  subject: string;
  time: string;
};

type MessageListProps = {
  messages: Message[];
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
          endContent={message.time}
          actionsReveal="adaptive"
          actions={[
            {
              label: 'Archive',
              icon: <Icon name="archive" />,
              onAction: () => archive(message.id),
            },
            {
              label: 'Delete',
              icon: <Icon name="delete" />,
              tone: 'error',
              onAction: () => remove(message.id),
            },
          ]}
        />
      ))}
    </List>
  );
}
```

### Notes

I reached first for `actions` plus `actionsReveal="adaptive"`, because the reference describes exactly the two behaviors asked for: hover/focus reveal with a mouse (laptop stays clean) and sideways-drag reveal on touch (phone flick). Sender went in `label`, subject in `description`, time in `endContent`, since the reference says `endContent` is for information about the row and stays visible.

Where I hesitated: the reference says a long drag "fires the outermost" action but never says which end of the `actions` array is outermost, so I could not be sure whether a long flick archives or deletes. I ordered Archive first and Delete second with `tone: 'error'`, on the guess that the first entry sits nearest the row text and the last is outermost; if that guess is backwards, the long-drag default would be the destructive one, which I would want to swap. The reference should state the mapping.

I also hesitated over the row's primary action. A mail list normally opens a message on click, but the task only provided `archive` and `remove`, so I left `onClick` off rather than invent an `open` function. That means the rows are not interactive, and with a mouse the adaptive actions appear on hover or when focus enters via the action buttons themselves — the reference says that works, but I could not confirm the hover affordance looks right on a non-clickable row without seeing it.

Things I wanted but could not find: a way to confirm a delete before it fires from a long drag, an undo hook, and the exact icon names available to `<Icon>` — I used `archive` and `delete` as plausible names, which is a guess the reference does not back. No other workarounds were needed; everything else came straight from the documented props.

### Code

```tsx
import {List, ListItem} from '@astryxdesign/core';
import {useState} from 'react';

type Message = {
  id: string;
  sender: string;
  subject: string;
  time: string;
};

type Props = {
  messages: Message[];
  archive: (id: string) => void;
  remove: (id: string) => void;
};

export function MessageList({messages, archive, remove}: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = messages.find(m => m.id === selectedId) ?? null;

  const archiveMessage = (id: string) => {
    archive(id);
    if (id === selectedId) setSelectedId(null);
  };

  const removeMessage = (id: string) => {
    remove(id);
    if (id === selectedId) setSelectedId(null);
  };

  return (
    <div>
      {/*
        One toolbar for the whole list, acting on the selected message.
        This is the pointer/keyboard path for the two verbs, so rows stay
        clean on a laptop and the swipe actions below are never the only way.
      */}
      <div role="toolbar" aria-label="Message actions">
        <button
          type="button"
          disabled={selected === null}
          onClick={() => selected && archiveMessage(selected.id)}>
          Archive
        </button>
        <button
          type="button"
          disabled={selected === null}
          onClick={() => selected && removeMessage(selected.id)}>
          Delete
        </button>
        <span aria-live="polite">
          {selected ? `Selected: ${selected.subject}` : 'Select a message'}
        </span>
      </div>

      <List>
        {messages.map(message => (
          <ListItem
            key={message.id}
            label={message.sender}
            description={message.subject}
            endContent={<time>{message.time}</time>}
            isSelected={message.id === selectedId}
            onClick={() => setSelectedId(message.id)}
            swipeActions={{
              leading: {
                label: 'Archive',
                tone: 'accent',
                onAction: () => archiveMessage(message.id),
              },
              trailing: {
                label: 'Delete',
                tone: 'error',
                onAction: () => removeMessage(message.id),
              },
            }}
          />
        ))}
      </List>
    </div>
  );
}
```

### Notes

I reached for `swipeActions` first because the reference describes exactly the phone gesture the task asks for: `leading` for archive (the gentler, more common verb, dragged toward the end of the row) and `trailing` for delete with the `error` tone. Sender went in `label`, subject in `description`, time in `endContent`, which the reference says is the place for information about the row.

The hesitation was the laptop side. The reference says `endContent` is always visible and that every swipe action must also be reachable by pointer and keyboard somewhere else, so there is no hover-reveal or per-row overflow menu available, and putting two buttons in `endContent` would clutter every row — the opposite of what was asked. The workaround is a selection model: the row's `onClick` selects it (`isSelected` shows which one), and a single toolbar above the list archives or deletes the selected message. That gives one visible, keyboard-reachable path for both verbs without touching the rows. The tradeoff is that the row's primary click is now "select" rather than "open"; in a mail app with a reading pane that is usually the same thing, but if opening is a separate navigation it would need its own hook, and the reference gives a row only one `onClick`.

Things I wanted but could not find: a `Button` component (I used plain `<button>`), a documented import for `Icon` (the reference uses it in an example but never shows where it comes from, so I left `icon` off both swipe actions rather than guess), and some way for a row to expose a secondary action by keyboard on its own, such as a context menu or an actions slot that is only shown on focus. I also cleared the selection when the selected message is archived or removed so the toolbar does not act on a row that is no longer in the list.

### Code

```tsx
import React, {useState} from 'react';
import {List, ListItem, ListItemAction} from '@astryxdesign/core';

type UploadedFile = {
  id: string;
  name: string;
  size: number; // bytes
};

type Props = {
  files: UploadedFile[];
  removeFile: (id: string) => void;
};

declare function useConfirm(): {confirm: (message: string) => Promise<boolean>};

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB', 'TB'];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value < 10 ? value.toFixed(1) : Math.round(value)} ${units[unit]}`;
}

export function UploadedFilesList({files, removeFile}: Props) {
  const {confirm} = useConfirm();
  // The id whose confirmation dialog is open, so a second click on the same
  // row (or a stale resolve after the row is gone) cannot remove twice.
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function handleRemove(file: UploadedFile) {
    if (pendingId !== null) return;
    setPendingId(file.id);
    try {
      const ok = await confirm(`Remove "${file.name}"? This cannot be undone.`);
      if (ok) removeFile(file.id);
    } finally {
      setPendingId(null);
    }
  }

  if (files.length === 0) {
    return <p>No files uploaded.</p>;
  }

  return (
    <List>
      {files.map(file => (
        <ListItem
          key={file.id}
          label={file.name}
          endContent={formatSize(file.size)}
          isDisabled={pendingId !== null && pendingId !== file.id}
          actions={
            <ListItemAction
              label="Remove"
              tone="error"
              onClick={() => {
                void handleRemove(file);
              }}
            />
          }
        />
      ))}
    </List>
  );
}
```

### Notes

I reached first for `actions` with a `ListItemAction`, because the reference is explicit that anything other than the row's primary action is a secondary action and belongs there; "remove" is clearly a verb on the row, not the row itself. The rows have no `onClick`/`href` since there is nothing to open — the list is purely informational plus one destructive secondary action.

I hesitated over where the size goes. `description` ("beneath the label") and `endContent` ("information about the row … metadata") both fit; I chose `endContent` since the reference names metadata as its purpose and it keeps the row single-line. I also hesitated over `actionsReveal`. `"adaptive"` is tempting for a tidy list, but the reference says a long drag on touch fires the outermost action, and for a permanent delete I did not want a gesture to launch it even with a dialog behind it, so I left the default `"always"`. Tone `error` felt right for a destructive verb.

Things I wanted but could not find: the import for `Icon` is not documented (only its JSX shape), so I left the action icon off rather than guess the module; a loading/pending prop on `ListItemAction` to show that the confirm is open; and any guidance on empty states, so I used a plain paragraph. The workaround for double-submission was a `pendingId` state that disables the other rows via `isDisabled` while a dialog is open — that leans on `isDisabled` also disabling the row's actions, which the reference implies but does not state outright. `useConfirm` is declared locally only to type the assumed hook; the real one would be imported.

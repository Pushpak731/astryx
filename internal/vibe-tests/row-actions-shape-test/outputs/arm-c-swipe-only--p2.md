### Code

```tsx
import {useState} from 'react';
import {List, ListItem} from '@astryxdesign/core';

// Assumed to exist per the task; declared here only so the file type-checks on its own.
declare function useConfirm(): (message: string) => Promise<boolean>;

type UploadedFile = {
  id: string;
  name: string;
  size: number; // bytes
};

type Props = {
  files: ReadonlyArray<UploadedFile>;
  removeFile: (id: string) => void;
};

function formatSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
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
  const confirm = useConfirm();
  // The id of the file whose confirm dialog is open, so a second click
  // can't open a second dialog or remove twice.
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function requestRemove(file: UploadedFile) {
    if (pendingId !== null) {
      return;
    }
    setPendingId(file.id);
    try {
      const confirmed = await confirm(
        `Remove "${file.name}"? This can't be undone.`,
      );
      if (confirmed) {
        removeFile(file.id);
      }
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
          endContent={
            <>
              <span>{formatSize(file.size)}</span>
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                disabled={pendingId !== null}
                onClick={() => requestRemove(file)}>
                Remove
              </button>
            </>
          }
        />
      ))}
    </List>
  );
}
```

### Notes

I reached first for `List` and `ListItem` with the file name as `label` and the size in `endContent`, since the reference calls `endContent` the place for information about the row and it is always visible.

The main hesitation was where to put the remove action. My first instinct was `swipeActions` with a trailing "Remove" in the error tone, but two things in the reference argued against it: the row "slides out" when the swipe fires, which is wrong when a confirm dialog may still cancel the removal, and swipe is touch-only so a visible pointer/keyboard path is required anyway. I also considered making the row's `onClick` the remove action, but the reference frames `onClick` as the row's primary action, and "click a file to delete it" is a surprising primary action even behind a confirm. So I left the row non-interactive and made Remove an explicit control in `endContent`. I also noticed `leading` is required and `trailing` optional in `swipeActions`, which would have forced a destructive action onto the leading swipe; that reinforced skipping it.

Things I wanted but could not find: a `Button` component (I used a plain `<button>`), an import for `Icon` (the reference shows `<Icon name="…" />` but only lists `List` and `ListItem` in the import line, so I left icons out rather than guess the path), guidance on whether interactive children inside `endContent` are supported on an interactive row (I avoided the question by not giving the row `onClick`), and an empty-state pattern for `List` (I rendered a plain paragraph).

Workarounds: a `declare function useConfirm()` ambient declaration so the file stands alone, a `pendingId` state to block double-firing while the dialog is open, and a small byte formatter since nothing in the reference formats sizes.

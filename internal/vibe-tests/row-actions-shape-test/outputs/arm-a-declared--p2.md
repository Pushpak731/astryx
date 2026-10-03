### Code

```tsx
import {List, ListItem} from '@astryxdesign/core';
import {useConfirm} from './useConfirm';

type UploadedFile = {
  id: string;
  name: string;
  size: number;
};

type UploadedFilesListProps = {
  files: UploadedFile[];
  removeFile: (id: string) => void;
};

function formatSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  const units = ['KB', 'MB', 'GB', 'TB'];
  let value = bytes / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}

export function UploadedFilesList({files, removeFile}: UploadedFilesListProps) {
  const confirm = useConfirm();

  const handleRemove = async (file: UploadedFile) => {
    const confirmed = await confirm(
      `Remove "${file.name}"? This can't be undone.`,
    );
    if (confirmed) {
      removeFile(file.id);
    }
  };

  if (files.length === 0) {
    return <p>No files uploaded yet.</p>;
  }

  return (
    <List>
      {files.map(file => (
        <ListItem
          key={file.id}
          label={file.name}
          endContent={formatSize(file.size)}
          actions={[
            {
              label: 'Remove',
              tone: 'error',
              onAction: () => {
                void handleRemove(file);
              },
            },
          ]}
          actionsReveal="always"
        />
      ))}
    </List>
  );
}
```

### Notes

I reached for `List` and `ListItem` first, with the file name as `label` and the formatted size as `endContent`, since the reference describes `endContent` as the always-visible spot for information about the row. The removal went into `actions` rather than a hand-rolled button, because the note says anything beyond the primary click is a secondary action and belongs there; the confirmation is just the `onAction` awaiting `confirm()` and only calling `removeFile` on a `true` result.

I hesitated on three things. First, the rows have no primary action here—nothing happens when you click a file—and the reference never says whether `actions` is allowed on a non-interactive row, so I assumed it is. Second, the reference mentions `<Icon name="…" />` but never shows where `Icon` is imported from, so rather than guess an import I left the Remove action text-only; it is still labelled by `label`. Third, I kept `actionsReveal="always"` explicitly: a destructive action hidden behind hover or a swipe felt wrong for something permanent, and the default already matches, but I wanted the choice visible in the code.

Things I wanted but could not find: a way to mark a row as busy or pending while the confirm dialog is open (I could have used `isDisabled`, but that would also grey out the row visually and read as "unavailable" rather than "in progress"), and guidance on whether `onAction` tolerates an async handler—its type is `() => void`, so I wrapped the promise in a `void` call to be safe. The size formatter and the empty state are plain TypeScript/React since the reference has nothing for either. `useConfirm` and the file shape are taken as given, so I typed them locally and imported the hook from a sibling module as a placeholder for wherever it actually lives.

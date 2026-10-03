### Code

```tsx
import {List, ListItem} from '@astryxdesign/core';

type SettingsRow = {
  id: string;
  label: string;
  path: string;
};

const SETTINGS_ROWS: ReadonlyArray<SettingsRow> = [
  {id: 'account', label: 'Account', path: '/settings/account'},
  {
    id: 'notifications',
    label: 'Notifications',
    path: '/settings/notifications',
  },
  {id: 'privacy', label: 'Privacy', path: '/settings/privacy'},
  {id: 'about', label: 'About', path: '/settings/about'},
];

declare function navigate(path: string): void;

export function SettingsList() {
  return (
    <List>
      {SETTINGS_ROWS.map(row => (
        <ListItem
          key={row.id}
          label={row.label}
          onClick={() => navigate(row.path)}
        />
      ))}
    </List>
  );
}
```

### Notes

I reached for `List` and `ListItem` with `label` and `onClick` only, since the task says each row does nothing but open its page — that is exactly the "plain navigating list" example in the reference, so there was no reason to touch `actions`, `endContent`, `description`, or `startContent`.

I hesitated briefly over `onClick` versus `href`. Both make the row interactive and a single tab stop per the reference. `navigate(path)` is given as the existing primitive, so `onClick` is the direct fit; `href` would have meant a full-page link and would bypass whatever `navigate` does (client-side routing, history handling). The reference does not say whether passing both is allowed or what happens if you do, so I used only `onClick`.

I also wondered whether a settings row should show a chevron or similar "this opens a page" affordance in `endContent`. The reference says `endContent` is for information about the row and that icons come from `<Icon name="…" />`, but it does not list `Icon` in the import line or document its icon names, so I could not add one without inventing an import or a name. I left it out rather than guess; if a chevron is wanted, the list owner would need to confirm the import path and icon name.

The `declare function navigate` line is only there so the single file type-checks on its own; in the real app it would be an import or a hook result. The row data lives in a small typed array so adding or reordering a settings page is a one-line change rather than another copy of the `ListItem`.

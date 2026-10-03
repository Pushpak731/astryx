### Code

```tsx
import React from 'react';
import {List, ListItem} from '@astryxdesign/core';

declare function navigate(path: string): void;

type SettingsRow = {
  path: string;
  label: string;
};

const SETTINGS_ROWS: ReadonlyArray<SettingsRow> = [
  {path: '/settings/account', label: 'Account'},
  {path: '/settings/notifications', label: 'Notifications'},
  {path: '/settings/privacy', label: 'Privacy'},
  {path: '/settings/about', label: 'About'},
];

export function SettingsList(): JSX.Element {
  return (
    <List>
      {SETTINGS_ROWS.map(row => (
        <ListItem
          key={row.path}
          label={row.label}
          onClick={() => navigate(row.path)}
        />
      ))}
    </List>
  );
}
```

### Notes

I reached for `List` and `ListItem` with `label` and `onClick` straight away, since the "plain navigating list" example is almost exactly this screen. Each row has one job — open its page — so `onClick` is the row's primary action and nothing else is needed. I deliberately did not add `swipeActions`, `endContent`, or `description`: the task says nothing else happens to a row, and the reference's note frames anything beyond `onClick` as a secondary action that would need a second keyboard path, so adding one would create work without a user need.

I hesitated briefly between `onClick` and `href`. Both make the row interactive, but the task hands me `navigate(path)`, which implies client-side routing, and the reference gives no guidance on whether `href` triggers a full page load or how it interacts with a router. `onClick` with `navigate` was the only choice I could make without guessing.

Things I wanted but could not find: whether `ListItem` renders a chevron or any "this opens a page" affordance on its own, or whether I should put one in `endContent` with `<Icon name="…" />`. The reference says icons come from `Icon` but never names the import path or any icon names, so I left it out rather than invent a name. I also wondered whether `List` takes an accessible name (e.g. an `aria-label` for "Settings"); the reference lists no `List` props at all, so I did not pass one.

Workaround: I declared `navigate` with `declare function` so the file type-checks standalone, since the task says it already exists but does not say where it is imported from.

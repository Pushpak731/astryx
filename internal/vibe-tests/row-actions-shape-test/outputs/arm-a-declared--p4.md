### Code

```tsx
import {List, ListItem} from '@astryxdesign/core';

type SettingsPage = {
  label: string;
  path: string;
};

const SETTINGS_PAGES: SettingsPage[] = [
  {label: 'Account', path: '/settings/account'},
  {label: 'Notifications', path: '/settings/notifications'},
  {label: 'Privacy', path: '/settings/privacy'},
  {label: 'About', path: '/settings/about'},
];

export function SettingsList() {
  return (
    <List>
      {SETTINGS_PAGES.map(page => (
        <ListItem
          key={page.path}
          label={page.label}
          onClick={() => navigate(page.path)}
        />
      ))}
    </List>
  );
}
```

### Notes

I reached for `List` with one `ListItem` per row and `onClick` calling `navigate`, since the reference says a row with `onClick` is interactive, the whole row is the click target, and it's a single tab stop. That covers "each row opens its page" with nothing else to declare. Because nothing else happens to a row, I deliberately left out `actions`, `actionsReveal`, `endContent`, `isSelected`, and `isDisabled`.

The one place I hesitated was `onClick` versus `href`. `href` would give native link behavior (open in new tab, copy link), but the task said to assume `navigate(path)` exists, and the reference doesn't say how `href` and client-side routing interact, so I used `onClick` to stay inside what's documented.

I wanted to put an icon in `startContent` for each row and a chevron in `endContent` to signal "this opens a page." The reference mentions `<Icon name="…" />` but doesn't document its import or available names, so I left icons out rather than guess. No workarounds were needed; I kept the page list as data so adding a row is a one-line change.

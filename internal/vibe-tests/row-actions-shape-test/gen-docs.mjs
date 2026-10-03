// Copyright (c) Meta Platforms, Inc. and affiliates.

// Generates one reference doc per arm from a single template.
//
// Checker Protocol §2 ("only the system under test varies") is enforced here
// rather than by inspection: every arm shares a byte-identical intro, base prop
// table, first example and closing note. The ONLY substitutions are the rows
// for the actions API, the prose describing it, and the second example. Arm C
// documents the shape and model of the open swipe-actions pull request on the
// same host as the other arms, so the host is not a second variable.

import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

const TEMPLATE = `# List and ListItem

\`\`\`
import {List, ListItem} from '@astryxdesign/core';
\`\`\`

\`List\` renders a vertical list of rows. Each \`ListItem\` is one row: a
\`label\`, an optional \`description\` beneath it, \`startContent\` ahead of the
text (an icon, an avatar, a checkbox) and \`endContent\` after it (a badge, a
timestamp, metadata). A row with \`onClick\` or \`href\` is interactive: the
whole row is the click target and it is one tab stop.

## ListItem props

| prop | type | default |
| --- | --- | --- |
| \`label\` | \`ReactNode\` | — |
| \`description\` | \`ReactNode\` | — |
| \`startContent\` | \`ReactNode\` | — |
| \`endContent\` | \`ReactNode\` | — |
| \`onClick\` | \`(event: MouseEvent) => void\` | — |
| \`href\` | \`string\` | — |
| \`isDisabled\` | \`boolean\` | \`false\` |
| \`isSelected\` | \`boolean\` | \`false\` |
__PROP_ROWS__

\`endContent\` is always visible and is the place for information about the
row. Icons come from \`<Icon name="…" />\`.

__PROP_PROSE__

## Examples

A plain navigating list:

\`\`\`tsx
<List>
  <ListItem label="Inbox" description="12 unread" onClick={() => go('/inbox')} />
  <ListItem label="Sent" onClick={() => go('/sent')} />
</List>
\`\`\`

__EXAMPLE_2__

## Note

A row's \`onClick\` is the row's primary action. Anything else a person can
do to the row is a secondary action and must stay reachable by keyboard.
__NOTE_TAIL__
`;

const REVEAL_PROSE =
  '`actionsReveal` says when the actions are shown. `"always"` keeps them\n' +
  'visible at the end of the row. `"adaptive"` keeps them out of the way until\n' +
  'asked for: with a mouse they appear when the row is hovered or when focus\n' +
  'enters it; on a touch screen a sideways drag reveals them and the row stays\n' +
  'open so they can be tapped, and a long drag fires the outermost one. Under\n' +
  'either value every action is a real button in the tab order, so a keyboard\n' +
  'user reaches each one by tabbing into the row.';

const ARMS = {
  'arm-a-declared': {
    PROP_ROWS:
      '| `actions` | `ListItemAction[]` | — |\n' +
      "| `actionsReveal` | `'always' \\| 'adaptive'` | `'always'` |",
    PROP_PROSE:
      '`actions` declares the secondary actions of the row as data. Each\n' +
      '`ListItemAction` is `{label: string, icon?: ReactNode, onAction: () => void,\n' +
      "tone?: 'accent' | 'success' | 'warning' | 'error'}`; the row renders one\n" +
      'button per entry, in order, labelled by `label`.\n\n' +
      REVEAL_PROSE,
    EXAMPLE_2:
      'Rows with a secondary action:\n\n' +
      '```tsx\n' +
      '<List>\n' +
      '  {items.map((item) => (\n' +
      '    <ListItem\n' +
      '      key={item.id}\n' +
      '      label={item.name}\n' +
      '      onClick={() => open(item.id)}\n' +
      '      actions={[\n' +
      "        {label: 'Share', icon: <Icon name=\"share\" />, onAction: () => share(item.id)},\n" +
      '      ]}\n' +
      '    />\n' +
      '  ))}\n' +
      '</List>\n' +
      '```',
    NOTE_TAIL: 'Declare it in `actions`.',
  },
  'arm-b-composed': {
    PROP_ROWS:
      '| `actions` | `ReactNode` | — |\n' +
      "| `actionsReveal` | `'always' \\| 'adaptive'` | `'always'` |",
    PROP_PROSE:
      '`actions` is a slot for the secondary actions of the row: one control per\n' +
      'verb. `ListItemAction` (also exported from `@astryxdesign/core`) is the\n' +
      'control made for it and takes `label: string`,\n' +
      '`icon?: ReactNode`, `onClick: () => void` and `tone?: \'accent\' | \'success\'\n' +
      "| 'warning' | 'error'`; any other button or menu trigger works there too.\n\n" +
      REVEAL_PROSE,
    EXAMPLE_2:
      'Rows with a secondary action:\n\n' +
      '```tsx\n' +
      '<List>\n' +
      '  {items.map((item) => (\n' +
      '    <ListItem\n' +
      '      key={item.id}\n' +
      '      label={item.name}\n' +
      '      onClick={() => open(item.id)}\n' +
      '      actions={\n' +
      '        <ListItemAction label="Share" icon={<Icon name="share" />} onClick={() => share(item.id)} />\n' +
      '      }\n' +
      '    />\n' +
      '  ))}\n' +
      '</List>\n' +
      '```',
    NOTE_TAIL: 'Put it in `actions`.',
  },
  'arm-c-swipe-only': {
    PROP_ROWS:
      '| `swipeActions` | `{leading: SwipeAction; trailing?: SwipeAction}` | — |',
    PROP_PROSE:
      '`swipeActions` adds swipe actions for touch. Each `SwipeAction` is\n' +
      '`{label: string, icon?: ReactNode, onAction: () => void, tone?: \'accent\' |\n' +
      "'success' | 'warning' | 'error'}`. Drag the row sideways to reveal a\n" +
      'labelled panel behind it; release past a third of the row, or fling, to fire\n' +
      'it and the row slides out; release short of that and the row springs back.\n' +
      '`leading` is a drag toward the end of the row, `trailing` a drag toward its\n' +
      'start, so the gesture reads the same in right-to-left languages. Touch only:\n' +
      'a mouse is ignored, and every swipe action must also be reachable by pointer\n' +
      'and keyboard somewhere else on the page.',
    EXAMPLE_2:
      'Rows with a swipe action:\n\n' +
      '```tsx\n' +
      '<List>\n' +
      '  {items.map((item) => (\n' +
      '    <ListItem\n' +
      '      key={item.id}\n' +
      '      label={item.name}\n' +
      '      onClick={() => open(item.id)}\n' +
      '      swipeActions={{\n' +
      "        leading: {label: 'Share', icon: <Icon name=\"share\" />, onAction: () => share(item.id)},\n" +
      '      }}\n' +
      '    />\n' +
      '  ))}\n' +
      '</List>\n' +
      '```',
    NOTE_TAIL: 'Give it a second, visible path.',
  },
  // Recall probe: the behavior is described and said to exist, but no prop is
  // named and no second example is given. The agent produces the API it expects.
  'arm-recall': {
    PROP_ROWS: '',
    PROP_PROSE:
      'A row can carry secondary actions beside its primary click: verbs such as\n' +
      'archive, delete or pin. They can be kept out of the way until asked for:\n' +
      'with a mouse they appear when the row is hovered or when focus enters it;\n' +
      'on a touch screen a sideways drag reveals them and the row stays open so\n' +
      'they can be tapped. Every such action is a real button in the tab order.\n' +
      '**The props that do this are not listed in this reference.**',
    EXAMPLE_2: '',
    NOTE_TAIL: "Use the component's own API for it.",
  },
};

mkdirSync(join(here, 'docs'), {recursive: true});
for (const [name, subs] of Object.entries(ARMS)) {
  let out = TEMPLATE;
  for (const [key, value] of Object.entries(subs)) {
    out = out.replace(`__${key}__`, value);
  }
  // Collapse the blank line left behind by an empty substitution.
  out = out.replace(/\n{3,}/g, '\n\n');
  writeFileSync(join(here, 'docs', `${name}.md`), out);
}

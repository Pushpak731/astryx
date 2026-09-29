// Copyright (c) Meta Platforms, Inc. and affiliates.

/** @type {import('@astryxdesign/cli/authoring').TemplateDoc} */
export const doc = {
  type: 'block',
  exampleFor: 'BottomSheetSwitcher',
  name: 'Bottom Sheet Switcher',
  displayName: 'Bottom Sheet Switcher',
  description:
    'A drill-in flow on the ordered activeSheets path: picking an issue pushes its details above the receded list, details push an activity level, Back pops one level, and Close all clears the path.',
  isReady: true,
  isShowcase: true,
  aspectRatio: 3 / 4,
  componentsUsed: [
    'BottomSheet',
    'BottomSheetSwitcher',
    'Button',
    'Heading',
    'List',
    'Section',
    'Stack',
    'Text',
  ],
};

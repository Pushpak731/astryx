---
'@astryxdesign/core': minor
---

[breaking] BottomSheet is a padded container, like Dialog. Its content box now pads by the theme's `bottom-sheet` padding (`--spacing-4` by default) and publishes that inset, so a Section that is the sheet's only child, and bleed children such as Table and Divider, align against it. A new `padding` prop takes a spacing step, and a theme's `padding` on `bottom-sheet` expands to container tokens instead of padding the panel.

A sheet whose only child is a padded `Section` renders as before. Content that supplies its own inset is now padded twice: drop that inset, or pass `padding={0}` to keep the previous unpadded content box. `astryx upgrade` ships `preserve-bottom-sheet-content-padding`, which adds `padding={0}` where needed.

@imdreamrunner

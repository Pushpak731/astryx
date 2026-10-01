---
'@astryxdesign/cli': patch
---

[fix] `astryx template <name>` and `template()` now return the same source that `astryx template <name> <path>` writes. Demo images and videos that only Astryx's own previews serve are replaced the same way in both, so code copied from the printed source no longer points at media your project doesn't have.

@josephfarina

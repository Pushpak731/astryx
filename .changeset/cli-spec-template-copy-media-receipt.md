---
'@astryxdesign/cli': patch
---

[fix] `astryx template <name> <path>` now says when it replaced Astryx demo media. The `template.copy` receipt carries `demoMediaReplaced`, the number of demo image and video references that became placeholders (one per reference, however many fixture paths its URL carries), and the text output names the file to update. Nothing about the copy itself changed.

@josephfarina

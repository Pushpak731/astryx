---
'@astryxdesign/core': patch
---

[feature] Markdown headings now have stable direct links by default.

Every built-in h1–h6 receives a unique generated fragment and an accessible native `#` permalink, including headings nested in blockquotes and lists. The shared Markdown/Outline allocator now supports Unicode headings, collision-safe authored numeric suffixes, and an optional Markdown root-id namespace for multiple documents on one page. Custom heading renderers receive the generated id at every depth and continue to own their complete output.

@cixzhang

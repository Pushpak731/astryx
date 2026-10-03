---
'@astryxdesign/core': patch
---

[feature] Add an opt-in Markdown heading-links plugin.

`createMarkdownHeadingLinks()` gives every built-in h1–h6 a collision-safe generated fragment and accessible native `#` permalink, including headings nested in blockquotes and lists. The same plugin entry keeps Markdown-derived Outline aligned, supports Unicode NFKC slugs, an optional caller-owned namespace and safe permalink URL base, and leaves default Markdown plus custom heading renderers unchanged.

@cixzhang

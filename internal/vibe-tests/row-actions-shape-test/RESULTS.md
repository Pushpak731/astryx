# Row-actions API shape — vibe test results

**Status:** ad-hoc · run 1 complete · feeds `spec:AST-057` OQ1
**Related:** [`../README.md`](../README.md) (Checker Protocol),
[Designing Vibe Tests](https://github.com/facebook/astryx/wiki/Designing-Vibe-Tests),
[API Arbitration](https://github.com/facebook/astryx/wiki/API-Arbitration),
[`../stepper-collapse-naming-test/PLAN.md`](../stepper-collapse-naming-test/PLAN.md) (the model for this run),
[PR #6821](https://github.com/facebook/astryx/pull/6821)

---

## 1. The question

A list row needs secondary verbs (archive, delete, pin) that stay out of the
way until asked for — a hover on a laptop, a sideways drag on a phone. Three
API shapes were candidates. **Given only a reference page, does a naive
builder write correct callsite code against each, and which shape do builders
expect when none is named?**

## 2. Design

| ingredient     | choice                                                                                                                                                                                                                                                                                                                                                               |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Goal & measure | Correctness against the arm's own doc; hallucination (invented props/imports); accessibility path (does the output leave a keyboard-only person a route to every verb without a second hand-built UI); directness (nothing unrequested). Tie-break: hallucination, then the recall probe.                                                                            |
| Prompt battery | Four prompts in [`prompts.json`](prompts.json). None names a prop, "swipe", or "hover". p1 two verbs on both input kinds · p2 one destructive verb that confirms first · p3 four verbs, two state-dependent, a keyboard-only colleague · p4 negative control (navigation rows only).                                                                                 |
| Arms           | `A declared` — `actions: ListItemAction[]` + `actionsReveal` · `B composed` — `actions: ReactNode` of `<ListItemAction/>` + `actionsReveal` · `C swipe-only` — #6821's `swipeActions={{leading, trailing?}}`, commit-only, touch-only, documented on the same host so the host is not a second variable · `recall` — behavior described, props deliberately unnamed. |
| Orchestration  | One fresh, context-free agent per prompt × arm (12), plus three recall agents (15 total, authorized by the owner). Docs inlined into each task. Outputs typechecked against per-arm stubs over the real core exports ([`typecheck/check.mjs`](typecheck/check.mjs)). Rubric scored by the test designer with cross-arm visibility; no agent scored its own work.     |

### Fairness (Checker Protocol)

| Invariant                | How this honors it                                                                                                                                                                                                                                 |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| §1 Fair evaluators       | One rubric, one typechecker, all arms side by side. Blinding is impossible (the arm is legible from the prop names).                                                                                                                               |
| §2 Only the SUT varies   | All four docs are generated from one template by [`gen-docs.mjs`](gen-docs.mjs): intro, base prop table, first example and closing note are byte-identical. Only the actions rows, their prose, and example 2 differ. 406 / 414 / 378 / 310 words. |
| §3 Never leak the answer | Ground truth lives in `prompts.json` and never reached a generating agent.                                                                                                                                                                         |
| §4 Representative env    | A reference page is what a consumer's agent reads. The gap: agents could not browse a project or run the CLI, and `Icon`'s import and names were not in the doc (equal across arms).                                                               |
| §5 Context-free          | Fresh children with no inherited context, told to use nothing but the reference and plain React.                                                                                                                                                   |

## 3. Results

### 3.1 Recognition

Scores 1–5 (correctness · hallucination · a11y path · directness), then the
typecheck against the arm's stub.

| prompt                        | A declared             | B composed            | C swipe-only                                                                                                                                                                     |
| ----------------------------- | ---------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| p1 mail, two verbs            | 5 · 5 · 5 · 5 — tsc ✗¹ | 5 · 5 · 5 · 5 — tsc ✓ | 2 · 5 · 3 · 2 — tsc ✓. Used `swipeActions` correctly, then built a selection model and a toolbar of plain `<button>`s; the row's primary became "select".                        |
| p2 destructive, confirm first | 5 · 5 · 5 · 5 — tsc ✓  | 5 · 5 · 5 · 5 — tsc ✓ | 3 · 5 · 4 · 4 — tsc ✓. **Did not use the API.** "The row slides out when the swipe fires, which is wrong when a confirm may cancel"; a plain `<button>` in `endContent` instead. |
| p3 four verbs, keyboard-only  | 5 · 5 · 5 · 5 — tsc ✓  | 5 · 5 · 5 · 5 — tsc ✓ | 2 · 5 · 4 · 3 — tsc ✓. Four plain buttons in `endContent`, two of them duplicated as swipe actions. Only two slots exist.                                                        |
| p4 negative control           | 5 · 5 · 5 · 5 — tsc ✓  | 5 · 5 · 5 · 5 — tsc ✓ | 5 · 5 · 5 · 5 — tsc ✓                                                                                                                                                            |
| **mean**                      | **5.0**                | **5.0**               | **3.0 · 5.0 · 4.0 · 3.5**                                                                                                                                                        |

¹ `<Icon name="archive" />`: the template's own sentence used `name`; the real
`Icon` takes `icon`. A template artifact, equal across arms, hit only here.

**A and B tie at the ceiling.** 8/8 correct, 0/8 hallucinated, every output
compiles against its stub, and every output left a keyboard path by
construction. Per the wiki's decision patterns, identical code means the
naming does not change whether an agent can use the API; everything below is
the tie-break.

**C fails on p1–p3 by its model, not its docs.** The agents read the doc
correctly every time. In p1 the obligation "reachable by pointer and keyboard
somewhere else" produced a second UI that changed what clicking a row does.
In p2 the agent declined the API because commit-and-slide-out cannot precede
a confirmation. In p3 two slots could not hold four verbs. These are the
three starting questions, reproduced by naive builders.

### 3.2 Recall probe — the arms separate here

Three agents were given the behavior with the props unnamed and asked to
write what they expected.

| sample | prop                                      | shape                                                    | handler   | destructive signal       | rejected                                                                               |
| ------ | ----------------------------------------- | -------------------------------------------------------- | --------- | ------------------------ | -------------------------------------------------------------------------------------- |
| s1     | `actions` (considered `secondaryActions`) | **array of `{label, icon, onClick, isDestructive}`**     | `onClick` | `isDestructive: boolean` | child components ("no children slot"); buttons in `endContent`; render prop            |
| s2     | `actions`                                 | **array of `{id, label, icon, onClick, isDestructive}`** | `onClick` | `isDestructive: boolean` | `ReactNode` slot; child components ("only compound API in the reference"); render prop |
| s3     | `actions`                                 | **array of `{label, icon, onClick, isDestructive}`**     | `onClick` | `isDestructive: boolean` | child components; `endContent`                                                         |

**3/3 produced a data array. 0/3 produced child components or a render
prop.** Every sample gave the same two reasons unprompted: everything else on
the row is leaf-shaped (`label`, `description`, the `*Content` slots, the
`is*` booleans) and `ListItem` has no children; and the component can only
promise hover-reveal, swipe-reveal and the tab order "if it knows about each
verb discretely". s2: _"a `ReactNode` slot … would let people drop in
non-buttons, and the row could not keep the swipe tray open or size it
correctly without knowing what is inside."_

Two naming signals, also 3/3: the handler is `onClick` (mirroring the row;
#6821 says `onAction`), and the destructive marker is a boolean, not a tone
enum (#6821 says `tone: 'accent' | 'success' | 'warning' | 'error'`).

### 3.3 Doc gaps the test found — in both winning arms

These are not arm differences; the same sentence produced them in A and B,
so they are requirements for whatever ships.

- **Which end is outermost.** 4/8 A+B agents hesitated over ordering because
  "a long drag fires the outermost one" never says which array end that is;
  two guessed opposite ways. The contract must name it.
- **Say that focus reveals.** On the keyboard-only prompt both A and B chose
  `always` over `adaptive` because the doc promised "tabbing into the row"
  but not that the panel _shows_ when focus lands. `spec:AST-057` AR1 must be
  stated in the consumer doc, not just the record.
- **A row with actions and no primary.** 5/8 agents asked whether a row with
  `actions` but no `onClick` is "interactive", focusable, or one tab stop.
  The contract must say: it is a static row whose actions are its tab stops.
- **Async handlers.** 3 agents wanted `onClick` to tolerate a Promise so the
  row can stay open behind a confirm dialog.
- **Icon import and names.** Every agent wanted them; a template artifact
  (the real doc page lists them), equal across arms.

## 4. Verdict

**Option A — declared actions.** Recognition is a tie at the ceiling; the
recall probe is 3–0 for a data array, with the builders' own reasoning
matching the system argument for it (the component owns the reveal, so it
needs the verbs as data). Option C fails the three starting questions in the
hands of naive builders exactly as review predicted.

Carry into the record: name the outermost end; state focus-reveal in the
consumer doc; `onClick` not `onAction`; a destructive marker that matches
the menu item vocabulary rather than a four-tone enum (OQ for the owner).

## 5. Caveats

- The judge is the test designer, not a separate agent, to stay inside the
  owner's agent budget. Scores are therefore a reading, not a measurement;
  the typecheck column and the recall counts are the hard numbers.
- Recall probes batched three scenarios per agent (as the stepper test did),
  so one agent's shape was reused across its three callsites by design.
- Agents were cheap question-answering children without a project or the
  CLI; discoverability through `astryx component ListItem --dense` was not
  measured.
- Arm C's doc was reconstructed from #6821's `.doc.mjs` text on `ListItem`
  rather than `Item`, to hold the host constant.
- No implementation exists; every stub is a type the record proposes.
- The arms were props on `ListItem` documenting a hover reveal. The record
  has since settled on `Item.swipeActions` (data per side, no hover reveal,
  `Item` inherits to `ListItem`). The data-vs-slot finding transfers; the
  keyboard-path scores assumed a hover reveal and do not.

## 6. Files

- [`prompts.json`](prompts.json) — battery and ground truth
- [`gen-docs.mjs`](gen-docs.mjs) → [`docs/`](docs/) — one template, four arms
- [`tasks/`](tasks/) — the 15 self-contained task prompts as sent
- [`outputs/`](outputs/) — raw outputs, code and self-report, one file per agent
- [`typecheck/check.mjs`](typecheck/check.mjs) → `typecheck/summary.json` — tsc against per-arm stubs

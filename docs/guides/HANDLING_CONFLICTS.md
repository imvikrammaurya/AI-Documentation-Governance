# Guide: Handling Conflicting Documentation

Human-readable walkthrough of Workflow 2 (`docs/architecture/WORKFLOW_MODEL.md`) and the full
resolution algorithm (`docs/architecture/AUTHORITY_MODEL.md`). The agent-executable version is
`agents/skills/resolve-document-conflict/SKILL.md`.

## The live example bundled with this repository

`docs/examples/library-lending/PRODUCT_SPEC.md` §4 (Tier 1 — Primary Authority):

> "A loan may be renewed up to two (2) times."

`docs/examples/library-lending/RENEWAL_RULES.md` (Tier 4 — Execution Guide):

> "A loan may be renewed up to three (3) times."

These directly disagree. Here's exactly how an agent following this framework should resolve
it, step by step.

## Applying the resolution order

1. **Authority level.** `PRODUCT_SPEC.md` is Tier 1 (Primary Authority). `RENEWAL_RULES.md` is
   Tier 4 (Execution Guide). Tier 1 outranks Tier 4. **This step resolves it — stop here.**

Because step 1 already resolved it, steps 2–6 (version, amendment, supersession, date,
explicit precedence rule) are never reached — the algorithm always stops at the first step that
settles the question, rather than checking every step and averaging.

## What happens to the losing document

`RENEWAL_RULES.md` is **not deleted, not silently rewritten, and not hidden.** Instead:

1. `docs/governance/DOCUMENT_AUTHORITY.md` row 4 records the conflict explicitly: "CONFLICT
   FLAGGED... Resolved in favor of #1 per resolution-order step 1."
2. `RENEWAL_RULES.md` itself carries an inline warning (see its own §Renewal limit) pointing
   back at the winning document and explaining why.
3. Anyone asking "how many times can a book be renewed?" gets the Tier 1 answer (two), with the
   conflict disclosed — not silently resolved without mention. See
   `docs/guides/ANSWERING_FEATURE_QUESTIONS.md` for exactly how that answer is worded.

## How you would actually fix this (not done in this repository, on purpose)

Two legitimate ways to resolve it permanently — either is fine, but pick one explicitly, on
purpose, as a real decision:

- **Edit `RENEWAL_RULES.md`** to say "two," matching the Primary Authority. Simplest fix when
  the execution guide was simply written wrong or gone stale.
- **Write a Tier 2 amendment** (e.g. `RENEWAL_LIMIT_AMENDMENT.md`) that explicitly states "the
  renewal limit is amended from two to three, effective `<date>`, because `<reason>`," and
  update `PRODUCT_SPEC.md`'s row in `DOCUMENT_AUTHORITY.md` to note it's amended. Correct
  choice when three renewals is actually the *intended* new rule and the product spec is the
  document that's now out of date.

This repository intentionally leaves the conflict live (see
`docs/governance/PROJECT_DECISIONS.md` entry A-001) so `tests/TEST_AUTHORITY_RESOLUTION.md` has
a real case to check against.

## What "equal authority, unresolved" looks like

If two Tier 3 documents disagreed and neither amended, superseded, or post-dated the other, none
of the six steps would resolve it. The correct output in that case is exactly:

```
NEEDS_VERIFICATION / USER DECISION REQUIRED
```

— not a guess, not "the more detailed one is probably right," not silence.

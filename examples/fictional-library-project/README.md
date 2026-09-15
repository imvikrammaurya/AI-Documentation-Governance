# Booklyn — Example Project Walkthrough

**Booklyn is a fictional community-library lending system**, invented entirely for this
repository to demonstrate the documentation-governance framework end to end. No real library,
vendor, dataset, or person is represented.

The actual documents live in `docs/examples/library-lending/`:

- [`PRODUCT_SPEC.md`](../../docs/examples/library-lending/PRODUCT_SPEC.md) — Tier 1, the root
  source of truth
- [`API_DESIGN.md`](../../docs/examples/library-lending/API_DESIGN.md) — Tier 3
- [`DATABASE_SCHEMA.md`](../../docs/examples/library-lending/DATABASE_SCHEMA.md) — Tier 3
- [`RENEWAL_RULES.md`](../../docs/examples/library-lending/RENEWAL_RULES.md) — Tier 4, and the
  deliberate authority-conflict example
- [`IMPLEMENTATION_STATUS.md`](../../docs/examples/library-lending/IMPLEMENTATION_STATUS.md) —
  Booklyn's feature-level status tracker

This file is the **narrative entry point** into that example — read this first, then follow the
links, in this order, to see the whole system work end to end.

## The end-to-end example workflow

```
New document (RENEWAL_RULES.md, written by create-execution-guide)
      ↓
Detection        — is it already registered? No.
      ↓
Classification    — Execution Guide domain
      ↓
Authority check    — Tier 4, and it conflicts with PRODUCT_SPEC.md §4 on the renewal limit
      ↓
Dependency analysis — depends on PRODUCT_SPEC.md
      ↓
Registration       — appended to FILE_INVENTORY.md, DOCUMENT_AUTHORITY.md (flagged CONFLICT)
      ↓
Knowledge-base update — appended to KNOWLEDGE_BASE_MAP.md under Execution Guides
      ↓
Validation         — scripts/validate-documentation.js confirms no broken references
      ↓
Audit log          — entry appended to AUTO_REGISTRATION_LOG.md
```

Every arrow above is a real, inspectable artifact in this repository — not a description of
something that happened elsewhere. Follow along:

1. **Read the conflict live:** `docs/guides/HANDLING_CONFLICTS.md` walks through exactly how
   `PRODUCT_SPEC.md` (two renewals) and `RENEWAL_RULES.md` (three renewals) are reconciled by
   the authority hierarchy, and what happens to the losing document (flagged, not deleted).
2. **See a feature question answered correctly:** `docs/guides/ANSWERING_FEATURE_QUESTIONS.md`
   shows the exact answer an agent should give to "how does the renewal system work?" — citing
   both documents, disclosing the conflict, and separating documented behavior from
   implementation status.
3. **See the doc-vs-implementation rule applied:** `docs/examples/library-lending/IMPLEMENTATION_STATUS.md`
   shows the same execution guide (`RENEWAL_RULES.md`) marked `GUIDE_CREATED`, not
   `IMPLEMENTED` — a detailed guide existing is never treated as proof of a working feature.
4. **See project memory in action:** `docs/governance/PROJECT_DECISIONS.md` entry D-001 records
   a fictional but concrete problem/solution pair for Booklyn (a duplicate-renewal bug fixed
   with an idempotency key).
5. **Verify it mechanically:** run `node scripts/validate-documentation.js .` from the
   repository root and `node scripts/discover-documents.js docs docs/governance/FILE_INVENTORY.md`
   to see the registration and reference-integrity checks run for real against this exact
   example.

## Adopting this pattern for your own project

Replace every file under `docs/examples/library-lending/` with your own product's documents,
using `templates/` as the starting shape. Keep the governance files under `docs/governance/`
and the rules/skills under `agents/` — those are the reusable part. See `README.md` §"How to
add this to an existing project" for the step-by-step.

---
name: validate-documentation
description: Use when asked to validate, verify, or run structural/behavioral checks against the documentation-governance system itself — registration completeness, idempotency, authority-map integrity, broken references. Mechanical and pass/fail, backed by scripts/validate-documentation.js where automatable.
---

# Validate Documentation

## Purpose

Run structural and behavioral checks that prove the governance system (index, authority map,
inventory, knowledge-base map, registration, implementation status) actually works, rather than
just reads as well-structured. Complementary to `audit-documentation`'s broader judgment-based
sweep — this skill is narrower and mechanical, and every check here should be answerable
`PASS`/`FAIL`, not a judgment call.

This skill is documentation-only and never inspects the production application.

## Checks

1. **Missing index entries** — every file in `<PROJECT_ROOT>` (excluding the self-describing
   infrastructure listed in `docs/governance/FILE_INVENTORY.md` §2) has a row in
   `FILE_INVENTORY.md` §3 or later.
2. **Duplicate registrations** — no path appears more than once across `FILE_INVENTORY.md`.
3. **Conflicting documents** — cross-check `DOCUMENT_AUTHORITY.md` against the documents it
   describes; every row flagged `CONFLICT FLAGGED` should trace to a real, still-unresolved
   disagreement, not a stale flag.
4. **Invalid authority metadata** — every tier assignment in `DOCUMENT_AUTHORITY.md` is one of
   the five defined tiers; no document claims a tier its own text doesn't support.
5. **Missing implementation status** — every feature/component referenced in an execution guide
   has a corresponding row in an implementation-status tracker.
6. **Stale metadata** — a document's declared dependencies still exist and are still accurate.
7. **Orphaned documents** — a file that exists but is never referenced from
   `DOCUMENTATION_INDEX.md`, `KNOWLEDGE_BASE_MAP.md`, or another document.
8. **Broken references** — every relative Markdown link resolves to a real file.
9. **Idempotency** — running the registration workflow twice against an unchanged file tree
   produces zero new entries and zero edits (see `tests/TEST_IDEMPOTENCY.md`).

## Mechanical Backing

Checks 1, 2, 8, and 9 are implemented as real, runnable automation in
`scripts/validate-documentation.js` and `scripts/discover-documents.js` — see `scripts/README.md`
for exact usage and exit codes. Run them and report their actual output; do not narrate what
they "would" find without running them when the tooling is available.

## Reporting

For each check: `PASS` or `FAIL`, with evidence (exact file/line or script output). Do not
report `PASS` without having actually looked — this skill exists specifically to replace
"looks fine" with "checked, and here's what was found."

## Do Not Automatically Fix

Report first. Fix only if the user explicitly asks, as a separate step.

## Maintenance Hooks

References `update-project-memory` / `update-implementation-status` by name in findings where
relevant; never invokes them itself.

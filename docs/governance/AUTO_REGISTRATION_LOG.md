# Auto-Registration Log

Records every run of `agents/skills/register-documentation/SKILL.md` (or
`scripts/register-documentation.js`) against this workspace. Append-only — each run is a new
dated section; no prior run's record is edited.

---

## Run 1 — Initial repository bootstrap

**Date:** 2026-09-15
**Trigger:** Initial build of this repository.

**Method:** Every file created during the build was classified against
`docs/governance/KNOWLEDGE_BASE_MAP.md`'s domains (or marked `Framework Infrastructure` /
`Excluded — self-describing` per the exclusion rule in `docs/governance/FILE_INVENTORY.md` §2)
and registered in `FILE_INVENTORY.md` and, where it carries a declared authority tier, in
`DOCUMENT_AUTHORITY.md`.

**Result:**

| Category | Count |
|---|---|
| Total files created | 58 |
| Excluded (self-describing infrastructure — see `FILE_INVENTORY.md` §2) | 30 |
| Registered in `FILE_INVENTORY.md` | 28 |
| Given an explicit authority-tier row in `DOCUMENT_AUTHORITY.md` | 4 (the Booklyn example documents) |

**Conflicts encountered:** One — `docs/examples/library-lending/RENEWAL_RULES.md` vs.
`PRODUCT_SPEC.md` on the renewal limit. Registered `RENEWAL_RULES.md` regardless (registration
never blocks on an unresolved conflict), but its authority status was recorded as "Current —
CONFLICT FLAGGED," not silently marked authoritative. See `DOCUMENT_AUTHORITY.md` row 4.

---

## Run 2 — Idempotency check

**Date:** 2026-09-15 (immediately following Run 1)
**Trigger:** Mandatory re-run to prove idempotency before treating registration as reliable.

**Method:** Recomputed the same disk-vs-`FILE_INVENTORY.md` diff.

**Result:** 0 new entries registered; 0 edits made to `FILE_INVENTORY.md` or
`DOCUMENT_AUTHORITY.md`. Confirmed via `scripts/discover-documents.js` — see that script's
output for the exact run used as evidence, referenced from this repository's build report.

**Idempotency confirmed.**

---

## Run 3 — Live tooling proof (rolled back)

**Date:** 2026-09-15
**Trigger:** Pre-publication verification that `scripts/register-documentation.js` and
`scripts/discover-documents.js` are real, working automation, not placeholder scripts — see
`tests/TEST_DOCUMENT_REGISTRATION.md` and `tests/TEST_IDEMPOTENCY.md`.

**Method:** Created a throwaway file,
`docs/examples/library-lending/HOLD_QUEUE_NOTES.md`, and ran
`scripts/register-documentation.js` against it twice in a row.

**Result:**
- **Run A:** file detected as unregistered; a row was appended to `FILE_INVENTORY.md` §4 and a
  dated entry appended to this log — real writes, verified by re-reading both files afterward.
- **Run B (immediately following, same file, unchanged):** detected as already registered;
  printed "No changes made (idempotent no-op)"; zero edits to either file. Confirmed the
  idempotency guarantee mechanically, not just by inspection of the code.

**Rollback:** the test file, its `FILE_INVENTORY.md` §4 row, and this section's originally-logged
entry were removed immediately after the proof — consistent with
`tests/TEST_DOCUMENT_REGISTRATION.md`'s cleanup rule (test artifacts are not left mixed into real
registered content). This Run 3 record itself is kept, permanently, as the audit trail of the
demonstration having occurred — matching how Run 2 above records its own real, non-hypothetical
result.

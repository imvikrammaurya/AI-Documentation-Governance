# Test: Project Memory Capture

**Validates:** `agents/skills/update-project-memory/SKILL.md`.

## Input A — an explicit decision statement

"We decided to use an idempotency key based on patron_id + book_id + renewal_period to stop
duplicate renewal records — do not use client-side debounce alone anymore."

## Expected

A new (or updated) entry in `docs/governance/PROJECT_DECISIONS.md`, structured per
`templates/PROJECT_MEMORY_ENTRY_TEMPLATE.md`, correctly typed `PROBLEM` + `SOLUTION`, citing the
statement as its source, and — since entry **D-001** in this repository already captures exactly
this — recognized as a duplicate rather than re-recorded as a second, separate entry.

### Pass/Fail Criteria

- **PASS** if the agent checks `PROJECT_DECISIONS.md` first, finds D-001 already covers this,
  and reports that no new entry is needed (or updates D-001 explicitly if new detail is added).
- **FAIL** if a duplicate entry is created without checking for the existing one.

## Input B — a casual, non-decided remark

"I'm wondering if we should maybe use an idempotency key for renewals at some point."

## Expected

No entry is captured. This is a hypothetical, not a decision — the agent should recognize the
trigger conditions aren't met (see `update-project-memory`'s §When To Use) and, if useful,
suggest this belongs in a plan document instead.

### Pass/Fail Criteria

- **PASS** if nothing is written to `PROJECT_DECISIONS.md`.
- **FAIL** if a `DECISION` or `ASSUMPTION` entry is created from this remark.

## Input C — an explicit supersession

"Actually, forget the idempotency-key approach — we're now handling this with a unique database
constraint instead."

## Expected

A new entry that explicitly states `SUPERSEDES: D-001` with the reason, while **D-001 itself
remains in the file, unedited** — never silently overwritten or deleted.

### Pass/Fail Criteria

- **PASS** if D-001 is preserved and a new entry supersedes it explicitly.
- **FAIL** if D-001 is edited in place or removed.

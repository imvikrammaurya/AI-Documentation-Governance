# Guide: Validation

Human-readable walkthrough. Agent-executable versions:
`agents/skills/validate-documentation/SKILL.md` (mechanical) and
`agents/skills/audit-documentation/SKILL.md` (judgment-based). Full test specs: `tests/`.

## Two complementary checks, not one

- **`audit-documentation`** — broad, judgment-based. "Is this documentation hierarchy sound? Are
  business rules contradictory anywhere we haven't already flagged? Is this safe for an AI
  agent to rely on?" Produces CRITICAL/HIGH/MEDIUM/LOW findings.
- **`validate-documentation`** — narrow, mechanical, pass/fail. "Is every file registered? Are
  there duplicate rows? Do all relative links resolve? Is registration actually idempotent when
  run twice?" Backed by real scripts where the check is automatable.

Run both. A repository can pass every mechanical check and still have a judgment-level problem
(e.g., a Tier 3 document that's technically registered correctly but describes an approach that
quietly contradicts the product spec's intent, not just its literal wording).

## Idempotency

The single most important mechanical property: running `register-documentation` (or
`scripts/register-documentation.js`) twice against an unchanged file must produce **zero**
new entries, zero duplicate rows, and zero file edits the second time. This is what lets an
agent (or a human) re-run registration defensively, any time, without fear of corrupting the
inventory. See `tests/TEST_IDEMPOTENCY.md` for the exact procedure and
`docs/governance/AUTO_REGISTRATION_LOG.md` Run 2 for a real recorded proof against this
repository itself.

## Running the mechanical checks yourself

```
node scripts/discover-documents.js docs docs/governance/FILE_INVENTORY.md
node scripts/validate-documentation.js .
```

See `scripts/README.md` for full usage, flags, and exit codes (0 = all checks passed, non-zero
= at least one check failed). This is also wired into CI —
`.github/workflows/validate.yml` runs the same command on every `push` and `pull_request`; see
`docs/governance/IMPLEMENTATION_STATUS.md`.

## What "safe for AI use" means in a final audit

Per `audit-documentation`'s Final Audit section: overall documentation health, critical issues,
recommended fixes, files requiring review, and an explicit yes/no on whether the documentation
is safe for an AI agent to answer from unsupervised. "Mostly fine" is not one of the allowed
answers — either the known gaps are listed and small enough to trust around, or they aren't.

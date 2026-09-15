# Test: Document Registration

**Validates:** Workflow 1 (`docs/architecture/WORKFLOW_MODEL.md`), skill
`agents/skills/register-documentation/SKILL.md`.

## Input

Create a new file, e.g. `docs/examples/library-lending/HOLD_QUEUE_NOTES.md` with any real
content and a clear stated purpose. Then either:

- Tell the agent: "I created `docs/examples/library-lending/HOLD_QUEUE_NOTES.md`," or
- Run: `node scripts/register-documentation.js docs/examples/library-lending/HOLD_QUEUE_NOTES.md docs/governance/FILE_INVENTORY.md docs/governance/AUTO_REGISTRATION_LOG.md`

## Expected

1. The file is detected as unregistered (not silently ignored, not silently registered without
   report).
2. It is classified into a knowledge domain.
3. It is appended — not inserted mid-table, not rewriting existing rows — to
   `docs/governance/FILE_INVENTORY.md` §4 (below the `<!-- AUTO-REGISTER -->` marker).
4. A dated entry is appended to `docs/governance/AUTO_REGISTRATION_LOG.md`.
5. No existing row in any governance file is altered or deleted.

## Pass/Fail Criteria

- **PASS** if all five expected behaviors above are observed and the exact diff is reported per
  `register-documentation`'s Expected Output contract.
- **FAIL** if the file is registered without reporting what changed, if any existing row is
  altered, or if the file is silently skipped without explanation.

## Cleanup

If this was run purely as a test (not a real new document), remove the test file and revert the
governance-file edits afterward — do not leave test artifacts mixed into real registered
content. Mark any such rollback clearly in your session notes.

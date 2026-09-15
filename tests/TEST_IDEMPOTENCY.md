# Test: Registration Idempotency

**Validates:** that re-running registration never creates duplicates. See
`docs/guides/VALIDATION.md` §Idempotency.

## Input

After `TEST_DOCUMENT_REGISTRATION.md` has been run once (file registered), run registration
again against the exact same, unchanged file:

```
node scripts/register-documentation.js docs/examples/library-lending/HOLD_QUEUE_NOTES.md docs/governance/FILE_INVENTORY.md docs/governance/AUTO_REGISTRATION_LOG.md
```

Or tell the agent again: "I created `docs/examples/library-lending/HOLD_QUEUE_NOTES.md`."

## Expected

1. Step 1 of the registration workflow ("Detect") finds the file already registered.
2. Zero new rows are added to `FILE_INVENTORY.md`.
3. Zero new entries are added to `AUTO_REGISTRATION_LOG.md` (or, if the tool logs "no-op" runs,
   the no-op is clearly distinguishable from a real registration — never counted the same way).
4. The agent/script reports "already registered, no changes made" rather than silence or a
   duplicate row.

## Pass/Fail Criteria

- **PASS** if the second run is a confirmed no-op with an explicit "already registered" report.
- **FAIL** if a duplicate row appears in `FILE_INVENTORY.md`, or the second run produces any
  edit at all to a governance file.

## Reference Evidence

`docs/governance/AUTO_REGISTRATION_LOG.md` Run 2 already demonstrates this against the
repository's full initial file set (58 files, 0 new entries on the second pass) — this test
scenario reproduces the same property on a smaller, single-file scale so it's easy to verify by
hand.

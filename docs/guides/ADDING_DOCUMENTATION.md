# Guide: Adding New Documentation

Human-readable walkthrough of Workflow 1 (`docs/architecture/WORKFLOW_MODEL.md`). The
agent-executable version is `agents/skills/register-documentation/SKILL.md`.

## When you write a new document

Say you just wrote `EXECUTION_GUIDE_HOLD_CANCELLATION.md` for the Booklyn example project. Two
ways to get it registered:

1. **Tell the agent directly:** "I created `EXECUTION_GUIDE_HOLD_CANCELLATION.md`." This
   triggers `register-documentation` directly.
2. **Let a skill produce it for you:** if you asked `create-execution-guide` to write it in the
   first place, registration happens automatically as that skill's last step — you don't need
   to announce it separately.

## What happens during registration

1. **Detect** — is it already registered? (Prevents duplicate work — this is what makes the
   workflow idempotent; see `docs/guides/VALIDATION.md` §Idempotency.)
2. **Classify** — which of the ten knowledge domains does it belong to?
   (`docs/architecture/KNOWLEDGE_MODEL.md`)
3. **Extract** — title, purpose, dependencies, pulled from the document's own text.
4. **Authority check** — what tier? Defaults to "not yet confirmed" unless the document or you
   say otherwise.
5. **Conflict check** — does it contradict, amend, or supersede something existing? If so,
   `resolve-document-conflict` runs before the file is marked authoritative (it still gets
   registered either way — registration never blocks on an unresolved conflict).
6. **Register** — append-only edits to the index, authority map, and file inventory.
7. **Knowledge-base update** — append-only edit to the knowledge-base map.
8. **Log** — a dated entry in `docs/governance/AUTO_REGISTRATION_LOG.md`.
9. **Validate** — re-run detection; it should now find zero unregistered files.

## What you should see reported back

Per `register-documentation`'s Expected Output: which file, its domain, its authority status,
the exact append-only diff to each governance file, and the log entry. If any of those five
things is missing from the agent's response, the registration wasn't actually done — ask it to
redo the missing part.

## Running the check yourself

```
node scripts/discover-documents.js <docs-root> docs/governance/FILE_INVENTORY.md
```

Lists any file under `<docs-root>` not accounted for in `FILE_INVENTORY.md`. See
`scripts/README.md` for full usage and exit codes.

## Real example in this repository

`docs/governance/AUTO_REGISTRATION_LOG.md` Run 1 records exactly this process happening for all
28 content files bundled with this repository at build time.

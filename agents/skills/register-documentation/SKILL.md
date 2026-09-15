---
name: register-documentation
description: Use when a new documentation file has been created, or an existing one substantively changed, and it needs to be registered in the navigation/index layer. Triggered explicitly by the user ("I created X") or by another skill after producing a new document. Documentation-only; append-only edits; idempotent.
---

# Register Documentation

## Purpose

Keep `docs/governance/DOCUMENTATION_INDEX.md`, `DOCUMENT_AUTHORITY.md`, `FILE_INVENTORY.md`, and
`KNOWLEDGE_BASE_MAP.md` in sync with the real file tree — deterministically, idempotently, and
without inventing authority. This is Workflow 1 in `docs/architecture/WORKFLOW_MODEL.md`,
executable by hand following the steps below or via `scripts/register-documentation.js` for the
mechanical parts.

This skill is documentation-only and never inspects, modifies, or references production
application code.

## When To Use

- A user explicitly states a new file was created ("I created `<file>`," "I added a new guide").
- Another skill (`create-execution-guide`, `plan-new-feature`, `modify-existing-documentation`)
  has just produced a new document and needs it registered.
- A fresh-session check finds a file on disk with no index/inventory entry.

Do not run this skill speculatively on files that haven't changed — check first (step 1 below).

## Mandatory Discovery

1. `docs/governance/FILE_INVENTORY.md`
2. `docs/governance/DOCUMENTATION_INDEX.md`
3. `docs/governance/DOCUMENT_AUTHORITY.md`
4. `docs/governance/KNOWLEDGE_BASE_MAP.md`
5. The new or changed file itself, in full

## Workflow

1. **Detect.** Diff the file against `FILE_INVENTORY.md`. If it already has a complete, accurate
   entry, **stop** — no changes needed. This is what makes the skill idempotent.
2. **Classify.** Assign it to one of the ten knowledge domains
   (`docs/architecture/KNOWLEDGE_MODEL.md`), or state none fit and ask.
3. **Extract.** Pull title, one-line purpose, and stated dependencies directly from the
   document's own text — never invent or infer beyond what it states.
4. **Authority check.** Determine tier per `docs/architecture/AUTHORITY_MODEL.md`. Default to
   "Current — authority not yet confirmed" unless the document or the user confirms otherwise.
5. **Check conflict/supersession.** If the new document appears to supersede, amend, or
   contradict an existing one, do not decide this yourself — invoke `resolve-document-conflict`.
   Register the file regardless, but don't mark it authoritative until that's resolved.
6. **Register.** Make append-only, targeted edits (not full-file rewrites) to
   `DOCUMENTATION_INDEX.md`, `DOCUMENT_AUTHORITY.md` (if it has a declared tier), and
   `FILE_INVENTORY.md` §4 (below the `<!-- AUTO-REGISTER -->` marker).
7. **Update knowledge base.** Append its classification to `KNOWLEDGE_BASE_MAP.md`.
8. **Log.** Record the registration in `docs/governance/AUTO_REGISTRATION_LOG.md` (date, path,
   action taken).
9. **Validate.** Re-run detection (step 1) — it should now find the file already registered.

## Authority Rules

Never mark a newly registered document authoritative without evidence. Apply the existing
hierarchy; never invent a new authority rule to justify a registration.

## Conflict Resolution

If the new/changed document conflicts with an existing one, invoke `resolve-document-conflict`
and act only on its output. If unavailable or unresolved, state
`DOCUMENTATION CONFLICT — NEEDS VERIFICATION`, register the file's existence, but leave its
authority status `NEEDS_VERIFICATION`.

## Workspace Boundary

Operate only inside `<PROJECT_ROOT>`. Only append to the four governance files named above.
Never inspect or modify production code.

## Expected Output

1. Which file was registered (or confirmation none was needed — idempotency check).
2. Its assigned domain and one-line purpose.
3. Its authority status.
4. The exact lines added to each modified file (proof the edit was append-only).
5. The `AUTO_REGISTRATION_LOG.md` entry.

## Prohibited Behavior

- Full-file rewrites of any governance file.
- Deleting or renumbering any existing entry.
- Marking any document authoritative without evidence.
- Duplicating a document's content into the index — one line of purpose only.
- Registering the same unchanged file twice.
- Inspecting or modifying production application code.

## Reference Implementation

`scripts/register-documentation.js` implements steps 1 and 6–8 mechanically (idempotency check,
append-only edit, log entry) for the `FILE_INVENTORY.md` and `AUTO_REGISTRATION_LOG.md` parts.
See `scripts/README.md`.

---
name: resolve-document-conflict
description: Use when two or more documents in the workspace appear to state conflicting or contradictory information, or when asked "which document is authoritative?" Applies a fixed resolution order and either states a winner (flagging the loser) or reports the conflict as unresolved.
---

# Resolve Document Conflict

## Purpose

Apply a single, consistent, non-arbitrary procedure whenever two documents disagree, instead of
letting any skill silently pick one. Full model with worked examples:
`docs/architecture/AUTHORITY_MODEL.md`.

This skill is documentation-only and never uses production behavior to settle a documentation
disagreement.

## When To Use

- Invoked by another skill (`answer-feature-question`, `create-execution-guide`,
  `modify-existing-documentation`, `plan-new-feature`, `register-documentation`,
  `update-implementation-status`) when it encounters two authoritative-looking documents that
  disagree.
- Invoked directly when asked "which document is authoritative?" or when two documents are
  pointed out as contradictory.

## Mandatory Discovery

1. `docs/governance/DOCUMENT_AUTHORITY.md` — the primary input for resolution
2. `docs/governance/DOCUMENTATION_INDEX.md`
3. `docs/governance/KNOWLEDGE_BASE_MAP.md`
4. The full text of each conflicting document — not just a summary

## Resolution Order

Apply in this exact sequence; stop at the first step that resolves it. Full detail:
`docs/architecture/AUTHORITY_MODEL.md` §Conflict resolution order.

1. **Authority level** — higher tier wins, per `DOCUMENT_AUTHORITY.md`.
2. **Version** — an explicit version bump wins, but only if the document's own text confirms it
   — never trust a filename alone.
3. **Amendment** — a document explicitly labeled AMENDMENT/OVERRIDE wins over what it amends.
4. **Supersession** — a document that explicitly states it supersedes another wins.
5. **Date/context** — the most recently and explicitly *dated* statement wins.
6. **Explicit precedence rule** — if `DOCUMENT_AUTHORITY.md` already states a direct rule for
   this exact pair, apply it even if it doesn't fit steps 1–5.

## If Resolved

State the winner, cite which step resolved it, and flag the losing document — by invoking
`register-documentation` to update its status in `DOCUMENT_AUTHORITY.md` — never by deleting or
rewriting the losing document directly.

## If Unresolved

After all six steps, if nothing settles it, output exactly:

```
NEEDS_VERIFICATION / USER DECISION REQUIRED
```

and stop. Do not guess, do not default to the most recently modified file, do not silently
prefer one document.

## Authority Rules

This skill does not invent new authority relationships — it only applies rules already declared
in `DOCUMENT_AUTHORITY.md`. If that map is silent on a given pair, that is the unresolved case
above, not an invitation to infer one. A Tier 1 (Primary Authority) document is never outranked
by a lower tier unless an explicit amendment says so.

## Conflict Resolution (of this skill's own procedure)

If two steps point to different winners (e.g., Authority level favors document A, but
Supersession favors document B), do not average or split the difference — treat this as
unresolved and output `NEEDS_VERIFICATION / USER DECISION REQUIRED`, explaining the
contradiction between steps.

## Workspace Boundary

Operate only inside `<PROJECT_ROOT>`. Read only documents inside the workspace. Never consult
production code or live application behavior to settle a documentation conflict.

## Expected Output

1. Conflicting documents (exact paths).
2. Resolution-order step that applied (or "unresolved").
3. Winner and loser, if resolved.
4. Reason, citing the specific rule/text that decided it.
5. Follow-up action: "flagged for `register-documentation`" or the exact
   `NEEDS_VERIFICATION / USER DECISION REQUIRED` output.

## Prohibited Behavior

- Picking a winner without citing which resolution-order step justified it.
- Deleting or rewriting the losing document.
- Treating a newer filename or higher-looking version number as automatic proof of authority.
- Letting a lower-tier document override Tier 1 without an explicit amendment.
- Inspecting or modifying production application code.

## Worked Example

Run this skill against `docs/examples/library-lending/PRODUCT_SPEC.md` (renewal limit: 2) vs.
`RENEWAL_RULES.md` (renewal limit: 3) — resolved at step 1 (Authority level), `PRODUCT_SPEC.md`
wins. Full walkthrough: `docs/guides/HANDLING_CONFLICTS.md`.

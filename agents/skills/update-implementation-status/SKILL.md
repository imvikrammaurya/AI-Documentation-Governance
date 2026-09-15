---
name: update-implementation-status
description: Use when the implementation status of a feature or component needs to be set or changed in an IMPLEMENTATION_STATUS.md tracker — after an execution guide is created (→ GUIDE_CREATED), after explicit user confirmation of deployment, or after a deliberate verification step. Never infer IMPLEMENTED from a guide's mere existence.
---

# Update Implementation Status

## Purpose

Keep the implementation-status tracker accurate, so no future session mistakes a written guide
for a shipped feature. This is the mechanism protecting this framework's one core invariant —
see `docs/architecture/ARCHITECTURE.md` §"The one invariant that matters most."

This skill is documentation-only and never inspects production code, servers, or deployment
logs to self-verify.

## When To Use

- `create-execution-guide` has just produced a new guide → set that feature's status to
  `GUIDE_CREATED` (never higher).
- The user explicitly confirms a feature is live, deployed, or verified ("this is in
  production," "we deployed X," "QA verified X").
- A deliberate verification-import step occurs (the user pastes deployment logs, test results,
  or another explicit confirmation artifact).

## Valid States

- `PLANNED` — discussed or scoped, no guide written yet.
- `GUIDE_CREATED` — an execution guide exists; nothing confirmed built.
- `PARTIALLY_IMPLEMENTED` — explicit evidence some but not all of the feature is live.
- `IMPLEMENTED` — explicit evidence the full feature is live.
- `NEEDS_VERIFICATION` — status unknown or evidence insufficient (the default when in doubt).
- `DEPRECATED` — explicitly retired or superseded; no longer applicable.

**Hard rule:** the existence of an execution guide never, by itself, justifies `IMPLEMENTED` or
`PARTIALLY_IMPLEMENTED`. Guides are blueprints, not deployment logs.

## Mandatory Discovery

1. The tracker's existing row for this feature/component, if any.
2. The relevant authoritative document or execution guide — for identifying the correct
   row/scope only, never as evidence of deployment.

## Workflow

1. Identify the correct row (or note a new row is needed).
2. Determine the requested new status.
3. Check the evidence against the Evidence Requirements below.
4. If sufficient: make a targeted, minimal edit to that row only, updating status and adding a
   note citing the evidence and date.
5. If insufficient: do not change the status. Keep or set `NEEDS_VERIFICATION`, and state
   exactly what evidence would be required to change it.

## Evidence Requirements

Only two things count as evidence for `IMPLEMENTED` or `PARTIALLY_IMPLEMENTED`:

1. Explicit user confirmation stated in the conversation.
2. A deliberate verification-import step (logs, test output, or another concrete artifact).

Never infer implementation status from documentation tone, guide completeness, or phase
numbering.

## Authority Rules

The implementation-status tracker is itself the authoritative source for deployment state. An
execution guide's own internal "Status" label (e.g., "AUTHORITATIVE") describes the guide's
*documentation* authority, not deployment status — it never silently overrides this tracker.

## Conflict Resolution

If a guide's internal status language and the tracker disagree about deployment state, invoke
`resolve-document-conflict`. If unresolved, state
`DOCUMENTATION CONFLICT — NEEDS VERIFICATION` and leave the tracker at its current (or
`NEEDS_VERIFICATION`) state.

## Workspace Boundary

Operate only inside `<PROJECT_ROOT>`. Only the implementation-status tracker file(s) are edited
by this skill.

## Prohibited Behavior

- Marking `IMPLEMENTED` or `PARTIALLY_IMPLEMENTED` from a guide's existence alone.
- Inspecting production code, servers, or deployment logs directly to self-verify.
- Rewriting the whole tracker instead of a targeted row edit.
- Silently changing a status without citing the evidence that justified it.

## Reference Example

`docs/examples/library-lending/IMPLEMENTATION_STATUS.md`'s "Renewal system" row (`GUIDE_CREATED`,
despite a detailed execution guide existing) and "Hold cancellation" row (`PARTIALLY_IMPLEMENTED`,
with an explicit confirmation cited) show the two most commonly confused states side by side.

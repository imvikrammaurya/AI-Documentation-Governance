---
document_type: Execution Guide / Supporting Document
authority_tier: 4 — Execution Guide / Supporting Document
status: Current
depends_on: <PRIMARY_AUTHORITY_DOCUMENT>
---

# <PROJECT_NAME> — <FEATURE_NAME> Execution Guide

## Objective

One paragraph: what this guide implements and why.

## Scope / Non-Goals

What's in scope. What's explicitly out of scope for this guide.

## Dependencies

- Documents this guide depends on (link them).
- Existing systems/features this touches.

## Database Requirements

Only reference real, verified schema. Mark anything unconfirmed `NEEDS_VERIFICATION` — never
invent a table, column, datatype, foreign key, index, or enum.

## API Requirements

Endpoints, request/response shapes, error conventions.

## Business Rules

Restate (don't silently alter) the relevant Tier 1 rules from `<PRIMARY_AUTHORITY_DOCUMENT>`.
If this guide needs a different rule than Tier 1 states, that is a conflict — flag it explicitly
(see `docs/guides/HANDLING_CONFLICTS.md`), do not just write the different number here quietly.

## Validation Rules / Security Requirements

## Error Handling / Edge Cases

## Migration Requirements

## Testing Requirements

## Rollback Considerations

## Implementation Sequence

1. Step
2. Step

## Verification Checklist

- [ ] Matches `<PRIMARY_AUTHORITY_DOCUMENT>` with no unflagged contradictions.
- [ ] All schema references verified, not invented.
- [ ] Registered via `agents/skills/register-documentation/SKILL.md`.
- [ ] Implementation status set to `GUIDE_CREATED` via `update-implementation-status` — not
      higher.

## Implementation Status

**This guide's existence is not evidence the feature is built.** See
`agents/skills/update-implementation-status/SKILL.md` and this project's implementation-status
tracker for the actual current status.

---
name: plan-new-feature
description: Use when asked to plan, design, scope, analyze, or prepare a new feature before implementation. Produces a documentation-based feature plan without modifying production code.
---

# Plan New Feature

## Purpose

Turn a feature idea into a structured plan grounded in existing documentation. This skill does
not implement the feature.

## Mandatory Workflow

1. Read `docs/governance/DOCUMENTATION_INDEX.md`.
2. Read `<PRIMARY_AUTHORITY_DOCUMENT>`.
3. Identify related requirements, architecture, and existing features.
4. Check the schema reference document, if one exists.
5. Check `docs/governance/IMPLEMENTATION_STATUS.md`.
6. Identify dependencies.
7. Check amendments/changelogs and for conflicts.

## Feature Plan Contents

1. **Feature Overview** — what it does and why.
2. **User Flow** — expected workflow.
3. **Business Rules** — all relevant rules.
4. **Existing System Dependencies** — modules/features affected.
5. **Database Impact** — only when supported by verified documentation; otherwise
   `NEEDS_VERIFICATION`.
6. **API / Backend Impact.**
7. **UI Impact** — affected screens/components conceptually; never inspect production code.
8. **Security** — permissions, roles, authorization, validation, data protection.
9. **Edge Cases.**
10. **Risks** — architectural and product risks.
11. **Implementation Sequence.**
12. **Documentation Required** — which guides/requirements should be created or updated.

## No Production Changes / No Guessing

Never create or modify production files. If the documentation doesn't define something, say
`NEEDS_VERIFICATION` — do not invent it.

## Output

Clearly distinguish existing documented behavior, proposed behavior, required changes,
unknowns, and dependencies.

## Maintenance Hooks

- If this workflow produces a plan document, call `register-documentation`.
- If step 7 ("check for conflicts") finds conflicting requirements, call
  `resolve-document-conflict` instead of picking one arbitrarily. If unresolved, report
  `DOCUMENTATION CONFLICT — NEEDS VERIFICATION` and stop — do not produce a plan built on an
  unresolved conflict.

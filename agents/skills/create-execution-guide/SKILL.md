---
name: create-execution-guide
description: Use when asked to create a new execution guide, implementation guide, phased build guide, or step-by-step implementation document for a documented feature. Creates documentation only, inside the workspace, and never implements production code.
---

# Create Execution Guide

## Purpose

Create safe, implementation-ready execution guides. This skill creates documentation only — it
must never implement production code.

## Mandatory Discovery

1. Read `docs/governance/DOCUMENTATION_INDEX.md`.
2. Read `docs/governance/DOCUMENT_AUTHORITY.md`.
3. Identify authoritative product rules (`<PRIMARY_AUTHORITY_DOCUMENT>`).
4. Identify relevant requirements and architecture documents.
5. Check the schema reference document, if one exists.
6. Check `docs/governance/IMPLEMENTATION_STATUS.md`.
7. Read related master/execution guides, amendments, and changelogs.
8. Check deprecated/superseded documents.

## Conflict Handling

If authoritative documents conflict, **stop**. Do not create a guide based on an unresolved
conflict. Report `DOCUMENTATION CONFLICT — NEEDS VERIFICATION` and explain which documents
conflict — invoke `resolve-document-conflict` rather than guessing.

## Guide Requirements

Every new execution guide should define: objective, scope, non-goals, dependencies, existing
systems affected, database requirements, API requirements, UI requirements, business rules,
validation rules, security requirements, error handling, edge cases, migration requirements,
testing requirements, rollback considerations, implementation sequence, and a verification
checklist.

## Database Rules

Never invent table names, columns, datatypes, foreign keys, indexes, enums, or policies. Mark
unverified details `NEEDS_VERIFICATION`.

## Implementation Status

Never claim a feature is already implemented merely because a guide exists. Label clearly:
existing, planned, proposed, or needs verification.

## File Location

Create the new guide only inside `<PROJECT_ROOT>` (typically `<EXECUTION_GUIDE_DIRECTORY>`).
Never create files in the production application repository.

## After Creation

1. Verify the file exists and is inside `<PROJECT_ROOT>`.
2. Report the exact file path and summarize what was created.

## Maintenance Hooks

After creation, this skill always:

1. Calls `register-documentation` to register the new guide in
   `docs/governance/DOCUMENTATION_INDEX.md`, `DOCUMENT_AUTHORITY.md`, and `FILE_INVENTORY.md`.
2. Calls `update-implementation-status` to set the feature's status to `GUIDE_CREATED` — never
   `IMPLEMENTED` or `PARTIALLY_IMPLEMENTED`, no matter how complete the guide reads.

## Worked Example

`docs/examples/library-lending/RENEWAL_RULES.md` in this repository is exactly this skill's
output type — including the honest labeling that its existence is not proof of a build; see
`docs/examples/library-lending/IMPLEMENTATION_STATUS.md`.

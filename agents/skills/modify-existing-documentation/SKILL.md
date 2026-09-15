---
name: modify-existing-documentation
description: Use when asked to change, improve, extend, redesign, fix, or modify an existing documented feature. Produces a documentation-based change plan without accessing production code.
---

# Modify Existing Documentation

## Purpose

Plan changes to an existing documented feature using the knowledge base. This skill does not
modify production code.

## Mandatory Discovery

1. Read `docs/governance/DOCUMENTATION_INDEX.md`.
2. Identify the authoritative documentation for the feature.
3. Read the relevant requirements, master guide, and execution guide.
4. Read amendments and changelogs.
5. Check `docs/governance/IMPLEMENTATION_STATUS.md`.
6. Check the schema reference document, when relevant.

## Determine Current Documented Behavior

Before proposing changes, establish: what the feature currently specifies, what business rules
apply, what dependencies exist, what previous decisions were made (check
`docs/governance/PROJECT_DECISIONS.md`), and what constraints exist.

## Change Analysis

Separate: **existing behavior** (what the docs currently say), **requested behavior** (what's
wanted), **impact** (systems/rules/data/workflows/docs affected), **risks** (what could break
or become inconsistent), and **required documentation changes**.

## Conflict Detection

If the requested change conflicts with an existing authoritative rule, **stop** and report
`DOCUMENTATION CONFLICT — NEEDS VERIFICATION`. Do not silently override an authoritative rule —
invoke `resolve-document-conflict`.

## Database

Never invent schema details. Unknown information: `NEEDS_VERIFICATION`.

## Output

1. Current documented behavior
2. Requested change
3. Difference
4. Dependencies
5. Risks
6. Required documentation changes
7. Proposed implementation sequence
8. Verification checklist

## Production Boundary

Never inspect or modify production code; never use the production repository as a source of
truth (documentation-only mode default — see `docs/architecture/WORKFLOW_MODEL.md`).

## Maintenance Hooks

- If the modification plan conflicts with an existing amendment or authoritative document, call
  `resolve-document-conflict`.
- If this workflow produces a new modification-plan document, call `register-documentation`.

## Worked Example

Resolving the Booklyn renewal-limit conflict (`docs/examples/library-lending/PRODUCT_SPEC.md`
vs. `RENEWAL_RULES.md`) by writing a Tier 2 amendment is the kind of change this skill would
plan — see `docs/guides/HANDLING_CONFLICTS.md`.

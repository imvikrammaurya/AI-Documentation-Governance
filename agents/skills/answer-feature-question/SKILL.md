---
name: answer-feature-question
description: Use when asked how an existing feature, workflow, business rule, architecture, or subsystem is documented and intended to work. Answer strictly from the documentation workspace and never inspect production code unless documentation + code verification mode is explicitly declared.
---

# Answer Feature Question

## Purpose

Answer questions about how `<PROJECT_NAME>` features are documented and intended to work. This
skill is documentation-first: in documentation-only mode it never inspects, reads, or references
`<PRODUCTION_CODE_PATH>`.

## Mandatory Workflow

1. Read `docs/governance/DOCUMENTATION_INDEX.md`.
2. Determine the authoritative document(s) for the feature via
   `docs/governance/DOCUMENT_AUTHORITY.md`.
3. Read the relevant product rules, requirements, architecture, execution guides, and
   amendments.
4. Check `docs/governance/IMPLEMENTATION_STATUS.md` (or the product's own status tracker, e.g.
   `docs/examples/library-lending/IMPLEMENTATION_STATUS.md` in this repo's example) when
   implementation status is relevant.
5. Check superseded/deprecated status of every document used.
6. Resolve conflicts according to `docs/architecture/AUTHORITY_MODEL.md` — invoke
   `resolve-document-conflict` rather than picking a winner inline.
7. Answer only from information supported by the documentation.

## Important Distinction

Always distinguish:

- Documented behavior
- Intended/planned behavior
- Verified implementation status
- Historical behavior
- Unverified information

Never treat the existence of an execution guide as proof the feature exists in production.

## When Information Is Missing

State `NEEDS_VERIFICATION` explicitly. Do not fill gaps with assumptions.

## When Documents Conflict

Do not silently choose one document. Invoke `resolve-document-conflict`. If it returns
unresolved, state:

```
DOCUMENTATION CONFLICT — NEEDS VERIFICATION
```

and identify the conflicting documents and the exact disagreement.

## Production Boundary

In documentation-only mode, never inspect application source, routes, components, or production
configuration. If asked what production code actually does, respond per
`agents/rules/DOCUMENTATION_GOVERNANCE.md` §9.

## Answer Quality

A good answer includes, when relevant: purpose, trigger, workflow, business rules, data
involved, dependencies, related systems, implementation status, important limitations, and
document citations. Never claim full implementation accuracy unless the documentation itself
provides verified evidence.

## Worked Example

See `docs/guides/ANSWERING_FEATURE_QUESTIONS.md` for a complete walkthrough answering "how does
the Booklyn renewal system work?" against this repository's own bundled example, including how
the answer handles the deliberate `PRODUCT_SPEC.md` vs. `RENEWAL_RULES.md` conflict.

## Maintenance Hooks

Calls `resolve-document-conflict` when two authoritative-looking documents disagree — see
`agents/rules/DOCUMENTATION_GOVERNANCE.md` §17.

---
name: audit-documentation
description: Use when asked to audit, review, reconcile, or assess the quality, consistency, authority, completeness, or safety of the documentation. Judgment-based and read-only — reports findings, never fixes them automatically.
---

# Audit Documentation

## Purpose

Audit the documentation knowledge base for correctness, consistency, authority, completeness,
and AI usability. This is a broader, judgment-based sweep than `validate-documentation`'s
mechanical checks — the two are complementary, not redundant.

This skill is documentation-only and never inspects the production application.

## Mandatory Scope

Only inspect `<PROJECT_ROOT>`.

## Audit Areas

1. File structure
2. Documentation hierarchy
3. Authority relationships
4. Superseded documents
5. Deprecated documents
6. Conflicting requirements
7. Missing requirements
8. Missing architecture information
9. Database/schema gaps
10. Implementation-status gaps
11. Broken references
12. Incorrect paths
13. Duplicate documentation
14. Historical documents incorrectly treated as current
15. AI navigation problems
16. Missing dependencies
17. Contradictory business rules

## Important Rule

Do not assume a document is correct merely because it exists. Do not assume a newer-looking
filename means a document is authoritative. Verify authority using
`docs/governance/DOCUMENT_AUTHORITY.md` and the document's own text.

## Findings

Classify each finding: `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`, `INFORMATIONAL`. For each, provide:
file, location, problem, why it matters, evidence, recommended action.

## Do Not Automatically Fix

An audit reports findings; it does not modify documentation unless the user explicitly asks for
fixes afterward, as a separate step.

## Missing Information

Use `NEEDS_VERIFICATION` rather than guessing.

## Maintenance Hooks

No workflow change required — this skill only reports findings and never modifies documentation
itself. When a finding involves an undocumented decision or an implementation-status gap, note
in that finding that it can be addressed via `update-project-memory` or
`update-implementation-status` respectively — reference them by name; do not invoke them.

## Final Audit

End with: overall documentation health, critical issues, recommended fixes, files requiring
review, and whether the documentation is safe for AI use.

## Worked Example

Running this skill against this repository's own bundled example would surface the
`RENEWAL_RULES.md` vs. `PRODUCT_SPEC.md` conflict as a `HIGH` finding under "Conflicting
requirements" — it is deliberately left in place as a demonstration; see
`docs/guides/HANDLING_CONFLICTS.md`.

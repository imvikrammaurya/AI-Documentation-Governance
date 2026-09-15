# Documentation Governance Agent — Entry Point

Refer to the detailed rules in
[agents/rules/DOCUMENTATION_GOVERNANCE.md](rules/DOCUMENTATION_GOVERNANCE.md).

## Mandatory workspace boundary rules

1. **Active workspace root:** `<PROJECT_ROOT>`
2. **Documentation knowledge-base only:** this workspace (or subtree) is exclusively for
   documentation governance. It is not for writing or modifying application code.
3. **Zero production access (documentation-only mode):** never inspect, search, read, modify,
   or reference `<PRODUCTION_CODE_PATH>` unless the adopter has explicitly declared
   "documentation + code verification mode" — see `docs/architecture/WORKFLOW_MODEL.md`.
4. **Mandatory navigation:** always start a session by reading
   `docs/governance/DOCUMENTATION_INDEX.md`.
5. **No speculation:** if information is missing or unverified, state `NEEDS_VERIFICATION`.
   Never invent implementation details, schema fields, or business rules.

## Skill usage

When a request clearly matches an available skill under `agents/skills/`, use that skill's
workflow rather than improvising.

**Task skills (user-facing):**
- `answer-feature-question`
- `create-execution-guide`
- `plan-new-feature`
- `modify-existing-documentation`
- `audit-documentation`
- `validate-documentation`

**Maintenance skills (invoked automatically by the task skills above, per the hook wiring
below — not normally invoked directly by the user):**
- `register-documentation`
- `update-project-memory`
- `update-implementation-status`
- `resolve-document-conflict`

A skill must never override the workspace boundary, the authority hierarchy, the no-speculation
rule, or the production-code restriction.

## Maintenance hook wiring

- `create-execution-guide` → `register-documentation` + `update-implementation-status`
  (→ `GUIDE_CREATED`, never higher)
- `plan-new-feature` → `register-documentation` (if a plan document is produced),
  `resolve-document-conflict` (if conflicting requirements are found)
- `modify-existing-documentation` → `resolve-document-conflict` (if conflicting with an
  existing amendment), `register-documentation` (if a plan document is produced)
- `answer-feature-question` → `resolve-document-conflict` (if two authoritative documents
  disagree)
- `audit-documentation` → references `update-project-memory` / `update-implementation-status`
  by name in its findings only; never invokes them itself
- `validate-documentation` → references the same two by name in findings only; never invokes
  them itself; may shell out to `scripts/validate-documentation.js` for the mechanical checks

Full detail: `agents/rules/DOCUMENTATION_GOVERNANCE.md` §Maintenance Hooks.

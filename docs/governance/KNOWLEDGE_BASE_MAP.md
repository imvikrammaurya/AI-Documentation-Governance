# Knowledge Base Map

Domain model and rationale: `docs/architecture/KNOWLEDGE_MODEL.md`. This file is the **per-document
classification register**, kept in sync by `agents/skills/register-documentation/SKILL.md`.

| Domain | Documents in this repository |
|---|---|
| Product Requirements | `docs/examples/library-lending/PRODUCT_SPEC.md` |
| Architecture | `docs/architecture/ARCHITECTURE.md`, `AUTHORITY_MODEL.md`, `KNOWLEDGE_MODEL.md`, `WORKFLOW_MODEL.md` |
| API Contracts | `docs/examples/library-lending/API_DESIGN.md` |
| Database Schema | `docs/examples/library-lending/DATABASE_SCHEMA.md` |
| Integrations | *(none in the bundled example — `NEEDS_VERIFICATION` if asked)* |
| Security Decisions | Declared inline in `docs/examples/library-lending/PRODUCT_SPEC.md` §2 (roles/permissions) |
| Technical Decisions | `docs/governance/PROJECT_DECISIONS.md` |
| Execution Guides | `docs/examples/library-lending/RENEWAL_RULES.md` |
| Project Memory | `docs/governance/PROJECT_MEMORY.md` |
| Implementation Status | `docs/governance/IMPLEMENTATION_STATUS.md` (framework), `docs/examples/library-lending/IMPLEMENTATION_STATUS.md` (Booklyn) |

## Flagged gaps (honest, not filled with invented content)

- **Integrations domain is empty** in the bundled example. Booklyn is deliberately small enough
  that it doesn't need one; a real adopter would populate this row rather than delete it.
- **No Tier 2 (amendment) document exists yet** for the renewal-limit conflict — see
  `docs/governance/DOCUMENT_AUTHORITY.md` row 4 and `docs/guides/HANDLING_CONFLICTS.md`.

## Non-content domains (not classified here)

`agents/`, `templates/`, `tests/`, and `scripts/` are framework infrastructure — they describe
*how the governance system works*, not *what the product does* — so they are not assigned a
knowledge domain. They are tracked in `docs/governance/FILE_INVENTORY.md` under type
`Framework Infrastructure` instead.

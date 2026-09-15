# File Inventory

Flat, machine-parseable catalog of every registered document in this repository. Read by
`scripts/discover-documents.js` and written to by `scripts/register-documentation.js` — see
`scripts/README.md`. **Format note (do not break this when editing):** every row that
represents a real file starts its first cell with a single-backtick-quoted relative path, for
example the entry for `docs/examples/library-lending/PRODUCT_SPEC.md` a few sections down. The
scripts extract paths with that exact single-backtick pattern, from any table in this file —
both §2 (excluded) and §3 (registered) count as "accounted for." **Do not use double-backtick
Markdown escapes anywhere in this file** (e.g. do not write two backticks around a single-backtick
example) — the parser is a simple single-backtick tokenizer and a double-backtick span will
desynchronize every path extracted after it.

## 1. Purpose

Every file that exists in this repository must appear either in §2 (excluded — self-describing
infrastructure) or §3 (registered — content this framework governs). A file in neither list is
**unregistered** and `scripts/discover-documents.js` will report it.

## 2. Excluded — self-describing infrastructure (not registered as "content")

These files describe or index the system itself rather than carrying governed product/process
knowledge — analogous to how a library's card catalog doesn't catalog itself.

| Path | Reason |
|---|---|
| `README.md` | Repository entry point |
| `LICENSE` | Legal, not documentation content |
| `CONTRIBUTING.md` | Meta, describes the repo's own process |
| `SECURITY.md` | Meta |
| `CHANGELOG.md` | Meta, self-describing by definition |
| `.gitignore` | Not documentation |
| `agents/AGENTS.md` | Agent-behavior layer, enumerates the skills itself |
| `agents/rules/DOCUMENTATION_GOVERNANCE.md` | Agent-behavior layer |
| `agents/skills/answer-feature-question/SKILL.md` | Agent-behavior layer |
| `agents/skills/audit-documentation/SKILL.md` | Agent-behavior layer |
| `agents/skills/create-execution-guide/SKILL.md` | Agent-behavior layer |
| `agents/skills/modify-existing-documentation/SKILL.md` | Agent-behavior layer |
| `agents/skills/plan-new-feature/SKILL.md` | Agent-behavior layer |
| `agents/skills/register-documentation/SKILL.md` | Agent-behavior layer |
| `agents/skills/resolve-document-conflict/SKILL.md` | Agent-behavior layer |
| `agents/skills/update-project-memory/SKILL.md` | Agent-behavior layer |
| `agents/skills/update-implementation-status/SKILL.md` | Agent-behavior layer |
| `agents/skills/validate-documentation/SKILL.md` | Agent-behavior layer |
| `docs/architecture/ARCHITECTURE.md` | Framework specification, not governed content |
| `docs/architecture/AUTHORITY_MODEL.md` | Framework specification |
| `docs/architecture/KNOWLEDGE_MODEL.md` | Framework specification |
| `docs/architecture/WORKFLOW_MODEL.md` | Framework specification |
| `docs/governance/DOCUMENTATION_INDEX.md` | Navigation meta-file |
| `docs/governance/DOCUMENT_AUTHORITY.md` | Navigation meta-file |
| `docs/governance/FILE_INVENTORY.md` | This file |
| `docs/governance/AUTO_REGISTRATION_LOG.md` | The registration system's own log |
| `scripts/discover-documents.js` | Tooling, not documentation content |
| `scripts/register-documentation.js` | Tooling |
| `scripts/validate-documentation.js` | Tooling |
| `scripts/README.md` | Tooling meta |

**Total excluded: 30.**

## 3. Registered — governed content

| Path | Domain / Type | Authority Tier | Status |
|---|---|---|---|
| `docs/governance/IMPLEMENTATION_STATUS.md` | Implementation Status (framework) | N/A — tracker | Current |
| `docs/governance/KNOWLEDGE_BASE_MAP.md` | Knowledge-base index | N/A — index | Current |
| `docs/governance/PROJECT_MEMORY.md` | Project Memory (overview) | N/A — index | Current |
| `docs/governance/PROJECT_DECISIONS.md` | Project Memory (log) | N/A — log | Current |
| `docs/guides/ADDING_DOCUMENTATION.md` | Guide | N/A — guide | Current |
| `docs/guides/HANDLING_CONFLICTS.md` | Guide | N/A — guide | Current |
| `docs/guides/ANSWERING_FEATURE_QUESTIONS.md` | Guide | N/A — guide | Current |
| `docs/guides/UPDATING_PROJECT_MEMORY.md` | Guide | N/A — guide | Current |
| `docs/guides/VALIDATION.md` | Guide | N/A — guide | Current |
| `docs/examples/library-lending/PRODUCT_SPEC.md` | Product Requirements | 1 — Primary Authority | Current |
| `docs/examples/library-lending/API_DESIGN.md` | API Contracts | 3 — Domain Implementation Architecture | Current |
| `docs/examples/library-lending/DATABASE_SCHEMA.md` | Database Schema | 3 — Domain Implementation Architecture | Current |
| `docs/examples/library-lending/RENEWAL_RULES.md` | Execution Guide | 4 — Execution Guide / Supporting Document | Current — CONFLICT FLAGGED |
| `docs/examples/library-lending/IMPLEMENTATION_STATUS.md` | Implementation Status (Booklyn) | N/A — tracker | Current |
| `templates/PRODUCT_SPEC_TEMPLATE.md` | Template | N/A | Current |
| `templates/EXECUTION_GUIDE_TEMPLATE.md` | Template | N/A | Current |
| `templates/API_DESIGN_TEMPLATE.md` | Template | N/A | Current |
| `templates/DATABASE_SCHEMA_TEMPLATE.md` | Template | N/A | Current |
| `templates/DECISION_TEMPLATE.md` | Template | N/A | Current |
| `templates/PROJECT_MEMORY_ENTRY_TEMPLATE.md` | Template | N/A | Current |
| `tests/README.md` | Test suite index | N/A | Current |
| `tests/TEST_DOCUMENT_REGISTRATION.md` | Test scenario | N/A | Current |
| `tests/TEST_IDEMPOTENCY.md` | Test scenario | N/A | Current |
| `tests/TEST_AUTHORITY_RESOLUTION.md` | Test scenario | N/A | Current |
| `tests/TEST_IMPLEMENTATION_STATUS.md` | Test scenario | N/A | Current |
| `tests/TEST_PROJECT_MEMORY.md` | Test scenario | N/A | Current |
| `tests/TEST_FEATURE_QUESTIONS.md` | Test scenario | N/A | Current |
| `examples/fictional-library-project/README.md` | Example walkthrough | N/A | Current |

**Total registered: 28.**

**Reconciliation: 30 (excluded) + 28 (registered) = 58, matching the repository's real file
count at initial build.** See `docs/governance/AUTO_REGISTRATION_LOG.md` Run 1/Run 2 for how this
was verified, and `scripts/discover-documents.js` to re-verify at any time.

## 4. Auto-registered (appended by `register-documentation.js`)

New entries detected and registered after the initial build are appended below this line by the
registration script or skill. Do not hand-edit above this marker without also updating the
reconciliation count in §3.

<!-- AUTO-REGISTER: APPEND BELOW THIS LINE -->

*(none yet — this section is populated the first time a new document is registered)*

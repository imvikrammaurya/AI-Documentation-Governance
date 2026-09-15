# Documentation Index

**Master navigation entry point.** An agent (or human) working in a documentation workspace
governed by this framework should read this file first, every session, before answering
anything or writing anything.

> This file plays two roles at once: it is the **live index for this repository itself**
> (registering the framework's own docs and the bundled Booklyn example), and it is the
> **template an adopter copies** into `<PROJECT_ROOT>/docs/governance/DOCUMENTATION_INDEX.md`
> and fills in for their own project. Everywhere you see a concrete Booklyn reference below,
> that's this repository acting as its own worked example.

## 1. Where to find information (task map)

| Looking for... | Read... |
|---|---|
| Product rules / requirements | `<PRIMARY_AUTHORITY_DOCUMENT>` — in this repo: `docs/examples/library-lending/PRODUCT_SPEC.md` |
| Architecture | `docs/architecture/ARCHITECTURE.md` |
| Authority / conflict rules | `docs/architecture/AUTHORITY_MODEL.md`, `docs/governance/DOCUMENT_AUTHORITY.md` |
| Which domain a document belongs to | `docs/governance/KNOWLEDGE_BASE_MAP.md` |
| Every file that exists and its status | `docs/governance/FILE_INVENTORY.md` |
| What's actually built vs. only documented | `docs/governance/IMPLEMENTATION_STATUS.md` (framework itself), `docs/examples/library-lending/IMPLEMENTATION_STATUS.md` (Booklyn example) |
| Past decisions / solved problems | `docs/governance/PROJECT_DECISIONS.md` |
| Execution guides | `<EXECUTION_GUIDE_DIRECTORY>` — in this repo: `docs/examples/library-lending/` (e.g. `RENEWAL_RULES.md`) |
| Registration history | `docs/governance/AUTO_REGISTRATION_LOG.md` |

## 2. AI workflows (mandatory)

**QUESTION ABOUT AN EXISTING FEATURE**
→ Read this file → identify the authoritative document (§1, or `DOCUMENT_AUTHORITY.md`) →
read it → check `IMPLEMENTATION_STATUS.md` → check for conflicts → answer only from confirmed
information. Full procedure: `agents/skills/answer-feature-question/SKILL.md`.

**NEW FEATURE**
→ Read this file → read `<PRIMARY_AUTHORITY_DOCUMENT>` → identify related requirements/
architecture → check `IMPLEMENTATION_STATUS.md` → produce a plan, never assume it's already
built. Full procedure: `agents/skills/plan-new-feature/SKILL.md`.

**MODIFY AN EXISTING FEATURE**
→ Read this file → identify the original authoritative document → check amendments → check
`IMPLEMENTATION_STATUS.md` → identify dependencies → produce a change plan. Full procedure:
`agents/skills/modify-existing-documentation/SKILL.md`.

**CONFLICTING DOCUMENTATION**
→ Stop → apply the resolution order in `docs/architecture/AUTHORITY_MODEL.md` → if unresolved,
output `NEEDS_VERIFICATION / USER DECISION REQUIRED` and ask the user. Full procedure:
`agents/skills/resolve-document-conflict/SKILL.md`.

## 3. Authority hierarchy (summary)

Five tiers: Primary Authority → Approved Amendment/Superseding Document → Domain Implementation
Architecture → Execution Guide/Supporting Document → Historical/Superseded. Full model, resolution
order, and the "why filenames never determine authority" rule: `docs/architecture/AUTHORITY_MODEL.md`.

## 4. Deprecated / do not use as current authority

None in this repository's own framework docs. Within the bundled Booklyn example, no document is
currently marked superseded — the one live issue is an **unresolved conflict** (not a
supersession) between `docs/examples/library-lending/PRODUCT_SPEC.md` and
`docs/examples/library-lending/RENEWAL_RULES.md`; see `docs/guides/HANDLING_CONFLICTS.md`. When
an adopter's project accumulates superseded documents, they are listed here by path with their
replacement, exactly as `DOCUMENT_AUTHORITY.md` §Tier 5 records them.

## 5. Roles of the other governance files

- `docs/governance/DOCUMENT_AUTHORITY.md` — per-document tier assignments and supersession/
  amendment relationships.
- `docs/governance/FILE_INVENTORY.md` — flat catalog of every registered document.
- `docs/governance/KNOWLEDGE_BASE_MAP.md` — domain classification of every document.
- `docs/governance/IMPLEMENTATION_STATUS.md` — tracker for what's actually built vs. planned.
- `docs/governance/PROJECT_MEMORY.md` / `PROJECT_DECISIONS.md` — durable decision/problem log.
- `docs/governance/AUTO_REGISTRATION_LOG.md` — append-only history of registration runs.

*(Always start with this file before consulting the others.)*

# Document Authority Map

Full model and the 6-step resolution order: `docs/architecture/AUTHORITY_MODEL.md`. This file
is the **per-document register** — every document's assigned tier, one row each, kept in sync
with reality by `agents/skills/register-documentation/SKILL.md`.

> Template note for adopters: replace the Booklyn rows below with your own project's documents.
> Keep the five-tier structure and the "Notes" column's honesty about unresolved conflicts —
> that is the part of this file that actually does work, not the specific rows.

## Authority matrix

| # | Document | Tier | Current Status | Supersedes | Superseded By | Notes |
|---|---|---|---|---|---|---|
| 1 | `docs/examples/library-lending/PRODUCT_SPEC.md` | 1 — Primary Authority | Current | N/A | N/A | Root source of truth for Booklyn. Must be consulted first for any business-rule question. |
| 2 | `docs/examples/library-lending/DATABASE_SCHEMA.md` | 3 — Domain Implementation Architecture | Current | N/A | N/A | Depends on #1. Cannot override a Tier 1 rule. |
| 3 | `docs/examples/library-lending/API_DESIGN.md` | 3 — Domain Implementation Architecture | Current | N/A | N/A | Depends on #1, #2. |
| 4 | `docs/examples/library-lending/RENEWAL_RULES.md` | 4 — Execution Guide / Supporting Document | **Current — CONFLICT FLAGGED** | N/A | N/A | States a renewal limit of 3; `PRODUCT_SPEC.md` (#1) states 2. Resolved in favor of #1 per resolution-order step 1 (Authority level) — see `docs/guides/HANDLING_CONFLICTS.md`. This file is not rewritten or deleted; it stays flagged until a human either edits it to match #1 or writes a Tier 2 amendment justifying 3. |

## Conflict resolution rules (pointer)

1. Identify the conflicting documents and exact sections.
2. Check for an explicit amendment/override.
3. Check for explicit supersession.
4. Determine hierarchy — does a lower-tier document contradict a higher-tier one? The
   higher tier wins by default unless an explicit amendment says otherwise.
5. Verify currency — is one document clearly historical?
6. No silent choices — never resolve a conflict without recording which rule decided it.
7. If unresolved: mark `NEEDS_VERIFICATION` and ask the user; never guess.

Full algorithm with worked examples: `docs/architecture/AUTHORITY_MODEL.md`. Skill that executes
this procedure: `agents/skills/resolve-document-conflict/SKILL.md`.

## AI safety rules

- Never treat a superseded document as current without explicit verification.
- Never treat a phased/execution-level guide as permission to violate a Tier 1 rule.
- Never assume a filename (`_v2`, `_final`, `_rewrite`) determines authority — only this file
  and the document's own explicit text do.
- Never overwrite a newer specification or amendment with an older base document.
- Never hide a conflict — expose it, per row #4 above as the worked example.
- Always check amendments and changelogs before executing a base implementation guide.

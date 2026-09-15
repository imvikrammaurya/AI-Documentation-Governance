---
name: update-project-memory
description: Use when the user explicitly states a project decision, a solved problem, or a "do not use X anymore" instruction (e.g. "we decided...", "we solved this by...", "stop using X") — not casual remarks. Persists it into docs/governance/PROJECT_DECISIONS.md.
---

# Update Project Memory

## Purpose

Give the workspace a durable memory of decisions and solved problems, so they survive past the
current session. Concept overview: `docs/governance/PROJECT_MEMORY.md`.

This skill is documentation-only and never inspects, references, or modifies production
application code.

## When To Use

Trigger only on **explicit** statements:
- "We decided to do X (instead of Y)."
- "We solved this by doing X."
- "Do not use X anymore."
- "The final approach is X."
- "We chose X over Y because Z."

Do **not** trigger on casual mentions, hypotheticals, brainstorming, or a plan that hasn't
actually been decided yet — those belong in a plan document (`plan-new-feature`), not the
decision log.

## Mandatory Discovery

1. `docs/governance/PROJECT_DECISIONS.md` — check for an existing related entry first.
2. `docs/governance/KNOWLEDGE_BASE_MAP.md` — check whether an existing document already
   captures this decision.

If `PROJECT_DECISIONS.md` doesn't exist yet in an adopter's copy of this framework, state
`NEEDS_VERIFICATION — the memory layer does not exist yet in this workspace` rather than
inventing its template — copy `templates/PROJECT_MEMORY_ENTRY_TEMPLATE.md`'s structure instead.

## Workflow

1. **Classify.** `DECISION` / `PROBLEM` + `SOLUTION` / `ASSUMPTION`.
2. **Check for an existing related record** by topic/keyword match.
3. **If a related record exists:** update it — never silently overwrite. Append a new dated
   entry, or mark the change with `SUPERSEDES: <previous entry id>` and a stated reason.
4. **If none exists:** create a new entry using `templates/PROJECT_MEMORY_ENTRY_TEMPLATE.md`.
5. **Cite the source** — quote or closely paraphrase what was actually said; never invent
   reasoning that wasn't stated.

## Authority Rules

A captured decision does not automatically override a Tier 1 document. If the decision as
stated would contradict a Primary Authority document, do not record it as a silent override —
invoke `resolve-document-conflict` instead.

## Conflict Resolution

If a new decision contradicts an existing entry, never silently overwrite it — write
`SUPERSEDES: <entry id>` with an explicit reason. If it's unclear whether the new statement
truly overrides the old one, or if it conflicts with a Primary/Domain Authority document, invoke
`resolve-document-conflict`. If unresolved, state
`DOCUMENTATION CONFLICT — NEEDS VERIFICATION` and don't record the entry as settled.

## NEEDS_VERIFICATION Behavior

If the stated reasoning is incomplete or a required template field can't be filled from what was
actually said, mark that field `NEEDS_VERIFICATION` rather than inventing a plausible-sounding
rationale.

## Workspace Boundary

Operate only inside `<PROJECT_ROOT>`. Write only to `docs/governance/PROJECT_DECISIONS.md`.
Never write to, reference, or infer from production code.

## Prohibited Behavior

- Recording something as a "decision" from a casual, hypothetical, or in-progress remark.
- Inventing a decision, reason, or outcome that wasn't actually stated.
- Overwriting a prior entry instead of superseding it explicitly.
- Storing personal data or secrets (see `SECURITY.md` §3).
- Inspecting or modifying production application code.

## Reference Entries

See `docs/governance/PROJECT_DECISIONS.md` entries D-001 (a `PROBLEM`+`SOLUTION` pair), D-002 (a
`DECISION`), and A-001 (an `ASSUMPTION`) for the exact expected structure and tone.

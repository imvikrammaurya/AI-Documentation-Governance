# Guide: Updating Project Memory

Human-readable walkthrough. Agent-executable version:
`agents/skills/update-project-memory/SKILL.md`. Concept overview:
`docs/governance/PROJECT_MEMORY.md`.

## What triggers a memory entry (and what doesn't)

| Says this | Captured? |
|---|---|
| "We decided to use an idempotency key based on patron_id + book_id + renewal_period." | ✅ `DECISION`/`SOLUTION` |
| "Maybe we could use an idempotency key at some point?" | ❌ — hypothetical, not decided |
| "Stop using the client-side debounce approach, it doesn't fully fix the duplicate-renewal bug." | ✅ `DECISION` (supersedes the earlier approach) |
| "I'm thinking about renewal limits..." | ❌ — brainstorm, belongs in a plan document instead |

## Worked example (already in this repository)

`docs/governance/PROJECT_DECISIONS.md` entry **D-001** captures exactly the duplicate-renewal
scenario: the problem (duplicate records from retried renewal requests), the approach that
wasn't sufficient (client-side debounce), and the actual fix (a server-side idempotency key).
Read that entry as the reference shape for a `PROBLEM` + `SOLUTION` capture.

## Retrieving memory later

An agent answering a related question later should:

1. Read `docs/governance/PROJECT_DECISIONS.md` in full.
2. Search by the "Affected feature(s)" / "Affected documents" fields for relevance.
3. Treat a `DECISION` as binding context. Treat an `ASSUMPTION` as a flag to verify, not a fact.
4. Follow `SUPERSEDES:` chains to the current version of a decision, but read the superseded
   entry too — it usually explains *why* the decision changed, which matters for judgment calls
   later.

## What never goes here

No personal data, no secrets, no real customer/client information — see `SECURITY.md` §3. This
layer is for architecture and process knowledge, not people.

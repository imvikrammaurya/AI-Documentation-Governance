# Project Memory — Overview

This file explains the memory system. The actual entries live in
`docs/governance/PROJECT_DECISIONS.md` (decisions, rejected approaches, problem/solution pairs).
Skill that writes to it: `agents/skills/update-project-memory/SKILL.md`. Human-facing how-to:
`docs/guides/UPDATING_PROJECT_MEMORY.md`.

## Why a separate memory layer

Requirements and architecture documents describe *what should be true*. They rarely explain
*why one approach was chosen over another*, or record a problem that was hit and fixed once
before, that would otherwise get rediscovered the hard way in a later session. Project memory
exists to hold that second kind of knowledge — durable, dated, append-only, and never silently
rewritten.

## Entry types

- **`DECISION`** — an explicit choice between two or more options, with the stated reason.
- **`PROBLEM` + `SOLUTION`** — a concrete problem that occurred and how it was actually fixed.
- **`ASSUMPTION`** — something treated as true without full verification, flagged so a later
  session doesn't mistake it for a confirmed fact.

An agent must never upgrade an `ASSUMPTION` entry to `DECISION` or treated-as-fact without new
evidence — see `agents/skills/update-project-memory/SKILL.md` §Authority Rules.

## When an entry is captured

Only on **explicit** statements — "we decided X," "we solved this by doing Y," "stop using Z,"
"the final approach is X." Never from a casual remark, a brainstorm, or a plan that hasn't
actually been decided — those belong in a plan document instead (see
`agents/skills/plan-new-feature/SKILL.md`).

## How an agent retrieves this later

1. Read `docs/governance/PROJECT_DECISIONS.md` in full (it's append-only and expected to stay
   small enough to read whole; if it grows large, split by domain and update this file's
   pointer accordingly).
2. Search for entries whose "Affected feature(s)" or "Affected documents" field matches the
   current question.
3. Treat a `DECISION` entry as binding context for any related plan or answer; treat an
   `ASSUMPTION` entry as a flag to independently verify before relying on it.
4. If a later entry has `SUPERSEDES: <earlier entry>`, the later one wins — but the earlier
   entry is kept, not deleted, so the history of *why* the decision changed is preserved.

## What must never go in project memory

Personal data, secrets, credentials, or anything that identifies a real individual. This layer
is for architectural and process knowledge only — see `SECURITY.md` §3.

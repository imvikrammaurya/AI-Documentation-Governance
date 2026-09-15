---
document_type: Domain Implementation Architecture — Database Schema
authority_tier: 3 — Domain Implementation Architecture
status: Current
depends_on: <PRIMARY_AUTHORITY_DOCUMENT>
---

# <PROJECT_NAME> — Database Schema

## `<table_name>`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid, PK | |
| `<column>` | <type> | |

## Open schema questions

List anything not yet confirmed as `NEEDS_VERIFICATION` here rather than guessing a datatype,
constraint, or relationship. Never invent a table, column, foreign key, index, enum, trigger, or
policy that hasn't been confirmed — see `agents/skills/create-execution-guide/SKILL.md`
§Database Rules.

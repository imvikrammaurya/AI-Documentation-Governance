---
document_type: Product Specification
authority_tier: 1 — Primary Authority
status: Current
supersedes: N/A
superseded_by: N/A
---

# <PROJECT_NAME> — Product Specification

## 1. Overview

What the product does, in 2–4 sentences. `<PRODUCT_DOMAIN>`.

## 2. Roles & Permissions

| Action | <ROLE_1> | <ROLE_2> | <ROLE_3> |
|---|---|---|---|
| <ACTION> | | | |

## 3. Core Entity Lifecycle(s)

Name each core entity and its status states, e.g.:

- `<STATUS_1>` — meaning
- `<STATUS_2>` — meaning

## 4. Business Rules (Primary Authority)

State each rule as a direct, unambiguous sentence. This section is what
`docs/architecture/AUTHORITY_MODEL.md` treats as Tier 1 — every other document in the project
must be consistent with what's stated here unless an explicit Tier 2 amendment overrides a
specific section.

> **Rule:** <STATE THE RULE PRECISELY, WITH NUMBERS/LIMITS SPELLED OUT>

## 5. Notifications

Who gets notified, on what event, through what channel.

## 6. Non-Goals

What this version explicitly does not do — prevents scope creep from being silently assumed.

---
**Fill-in checklist before this stops being a template:**
- [ ] Remove this checklist.
- [ ] Replace every `<PLACEHOLDER>` above.
- [ ] Register this file — see `agents/skills/register-documentation/SKILL.md`.
- [ ] Add a row for it in `docs/governance/DOCUMENT_AUTHORITY.md` as Tier 1.

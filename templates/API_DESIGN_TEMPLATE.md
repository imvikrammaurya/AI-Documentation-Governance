---
document_type: Domain Implementation Architecture — API Contracts
authority_tier: 3 — Domain Implementation Architecture
status: Current
depends_on: <PRIMARY_AUTHORITY_DOCUMENT>
---

# <PROJECT_NAME> — API Design

## <RESOURCE_1>

```
GET    /api/<resource>            — description, who may call it
POST   /api/<resource>            — description, business-rule reference
PATCH  /api/<resource>/{id}       — description
DELETE /api/<resource>/{id}       — description
```

## Error Conventions

| Code | Meaning |
|---|---|
| `403 FORBIDDEN` | Role does not permit the action — reference the permissions table in `<PRIMARY_AUTHORITY_DOCUMENT>` §2. |
| `409 CONFLICT` | Action violates a business rule. |
| `422 UNPROCESSABLE_ENTITY` | Well-formed request, but the referenced resource isn't in a status that allows the transition. |

## Note on this document's authority

This is a Tier 3 (Domain Implementation Architecture) document. It may add implementation
detail beyond `<PRIMARY_AUTHORITY_DOCUMENT>`, but it cannot override a Tier 1 business rule — if
this document and the Tier 1 spec seem to disagree on a number or rule, the Tier 1 document
wins by default; see `docs/architecture/AUTHORITY_MODEL.md`.

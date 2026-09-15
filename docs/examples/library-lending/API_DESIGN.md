---
document_type: Domain Implementation Architecture — API Contracts
authority_tier: 3 — Domain Implementation Architecture
status: Current
depends_on: PRODUCT_SPEC.md, DATABASE_SCHEMA.md
---

# Booklyn — API Design

> Fictional example API surface. Illustrative only.

## Holds

```
POST   /api/holds                     — place a hold (patron: self only, staff: any patron)
DELETE /api/holds/{id}                — cancel a hold (see PRODUCT_SPEC.md §5 for auto-cancel rule)
GET    /api/holds/{id}                — view a hold
GET    /api/patrons/{id}/holds        — list a patron's holds
```

## Loans

```
POST   /api/loans/{holdId}/checkout   — staff only, converts a ready_for_pickup hold into a checked_out loan
POST   /api/loans/{id}/return         — staff only, marks a loan returned
POST   /api/loans/{id}/renew          — patron (self) or staff
  — Renewal limit enforcement point. See the authority conflict between PRODUCT_SPEC.md §4
    (two renewals) and RENEWAL_RULES.md (three renewals) — this endpoint's actual enforced
    limit is NEEDS_VERIFICATION until that conflict is resolved; this document does not
    hardcode a number.
GET    /api/loans/{id}                — view a loan
GET    /api/patrons/{id}/loans        — list a patron's loans
```

## Fines

```
GET    /api/patrons/{id}/fines        — list a patron's fines
POST   /api/fines/{id}/waive          — librarian only (role-checked against PRODUCT_SPEC.md §2)
POST   /api/fines/{id}/pay            — records a payment, no role restriction beyond self/staff
```

## Error conventions

- `409 CONFLICT` — action violates a business rule (e.g., attempting to renew a loan that has
  already reached the enforced renewal limit).
- `403 FORBIDDEN` — role does not permit the action (see `PRODUCT_SPEC.md` §2 permissions table).
- `422 UNPROCESSABLE_ENTITY` — request is well-formed but the referenced loan/hold is not in a
  status that allows the requested transition.

## Note on this document's authority

This is a Tier 3 (Domain Implementation Architecture) document. It may describe API behavior in
more implementation detail than `PRODUCT_SPEC.md`, but it cannot override a Tier 1 business rule
— see `docs/architecture/AUTHORITY_MODEL.md`. Where this document and `PRODUCT_SPEC.md` might
seem to disagree on a numeric limit, `PRODUCT_SPEC.md` wins by tier, not this file.

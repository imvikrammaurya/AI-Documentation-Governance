---
document_type: Execution Guide / Supporting Document
authority_tier: 4 — Execution Guide / Supporting Document
status: Current — flagged, see conflict note below
depends_on: PRODUCT_SPEC.md
---

# Booklyn — Renewal System Execution Guide

> Fictional example execution guide. This document is deliberately bundled in a state that
> conflicts with `PRODUCT_SPEC.md`, to give the framework's conflict-resolution workflow a real
> case to demonstrate against. See `docs/guides/HANDLING_CONFLICTS.md` for the full walkthrough.

## Objective

Implement the loan renewal flow: a patron or staff member extends a `checked_out` loan's due
date, provided the item has no competing hold.

## Renewal limit

> **A loan may be renewed up to three (3) times.**

**⚠ This contradicts `PRODUCT_SPEC.md` §4, which states the limit is two (2) renewals.** This
guide has not been updated to match the product spec, and no amendment document exists yet
recording which number is actually correct. Per `docs/architecture/AUTHORITY_MODEL.md`
resolution-order step 1 (Authority level), **`PRODUCT_SPEC.md`'s limit of two (2) wins** — this
document, being Tier 4, cannot override a Tier 1 statement without an explicit Tier 2 amendment,
which does not exist. Do not implement or document the renewal system using the "three" figure
from this file until that is resolved.

## Steps (as originally written, unaffected by the conflict above)

1. Verify the loan is currently `checked_out`.
2. Verify `renewal_count` is below the enforced limit (see conflict note above for what that
   limit actually is).
3. Verify no other patron holds an `active` hold on the same `item_id`.
4. Extend `due_at` by 14 days.
5. Increment `renewal_count`.
6. Notify the patron of the new due date.

## Edge cases

- Renewal requested on the due date itself: allowed, treated the same as any other renewal
  request before return.
- Renewal requested after the loan is already `overdue`: allowed only if no competing hold
  exists; existing fine accrual is not reversed.
- Renewal requested by a different patron than the loan holder: rejected with `403 FORBIDDEN`
  unless the requester is staff.

## Implementation status

Per `docs/governance/IMPLEMENTATION_STATUS.md`'s rule, **this guide's existence is not evidence
that the renewal system is built.** See `docs/examples/library-lending/IMPLEMENTATION_STATUS.md`
for Booklyn's actual tracked status of this feature (`GUIDE_CREATED`, not `IMPLEMENTED`).

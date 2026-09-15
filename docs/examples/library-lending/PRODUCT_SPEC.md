---
document_type: Product Specification
authority_tier: 1 — Primary Authority
status: Current
supersedes: N/A
superseded_by: N/A
---

# Booklyn — Product Specification

> **Fictional example project.** Booklyn is a small community-library lending system invented
> for this framework's documentation. No real library, vendor, or dataset is represented here.

## 1. Overview

Booklyn lets community libraries manage a lending catalog: patrons browse items, place holds,
check items out, renew loans, and pay overdue fines. Staff manage the catalog and fulfill holds.

## 2. Roles & Permissions

| Action | Librarian | Assistant | Patron |
|---|---|---|---|
| Manage catalog (add/remove items) | ✅ | ❌ | ❌ |
| Check out / check in a loan | ✅ | ✅ | ❌ |
| Place a hold on an item | ✅ | ✅ | ✅ (self only) |
| Cancel a hold | ✅ | ✅ | ✅ (self only) |
| Renew a loan | ✅ | ✅ | ✅ (self only) |
| Waive a fine | ✅ | ❌ | ❌ |
| View own loan/fine history | ✅ | ✅ | ✅ (self only) |

## 3. Loan Lifecycle

An item's loan record moves through these statuses:

- `on_hold` — a patron has requested the item and it is not yet available to them
- `ready_for_pickup` — the item is available and reserved for the holding patron
- `checked_out` — the item is currently with the patron
- `returned` — the item has been checked back in
- `overdue` — the due date has passed while still `checked_out`
- `lost` — the item was never returned and is presumed lost after 60 days overdue

## 4. Renewal Rule (Primary Authority)

> **A loan may be renewed up to two (2) times**, provided no other patron has an active hold on
> the item. Each renewal extends the due date by the standard loan period (14 days). A loan that
> has already reached its second renewal cannot be renewed again; the patron must return the
> item and may re-request it via a new hold if no hold queue exists.

This is the Tier 1 statement of the renewal limit. See
`docs/examples/library-lending/RENEWAL_RULES.md` (Tier 4) for the detailed renewal execution
guide — and note that it currently states a *different* limit. This is a deliberate, unresolved
authority conflict bundled with this example on purpose; see `docs/guides/HANDLING_CONFLICTS.md`
for the full walkthrough of how it is resolved (Tier 1 wins).

## 5. Hold Cancellation

- A patron or staff member may cancel a hold at any time before the item reaches
  `checked_out`.
- If a hold reaches `ready_for_pickup` and is not collected within **3 days**, the system
  auto-cancels it and offers the item to the next patron in the hold queue, if any.
- A cancelled hold records a `cancelled_at` timestamp and a `cancellation_reason` of either
  `patron_requested`, `staff_requested`, or `auto_expired`.

## 6. Fine Policy

- A fine accrues at a fixed daily rate for each day an item is `overdue`, starting the day after
  the due date.
- The fine is capped at the item's replacement cost.
- A Librarian (not an Assistant) may waive part or all of an accrued fine, with a required
  reason note.

## 7. Notifications

- Patrons are notified by email when: a hold becomes `ready_for_pickup`, a loan is due in 2
  days, a loan becomes `overdue`, or a hold is auto-cancelled.

## 8. Non-Goals (V1)

- No inter-library loan network — single-branch only.
- No mobile app — web only.
- No self-checkout kiosk integration.

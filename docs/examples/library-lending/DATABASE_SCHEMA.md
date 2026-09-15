---
document_type: Domain Implementation Architecture — Database Schema
authority_tier: 3 — Domain Implementation Architecture
status: Current
depends_on: PRODUCT_SPEC.md
---

# Booklyn — Database Schema

> Fictional example schema. Illustrative only — not a real database, no real data.

## `patrons`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid, PK | |
| `full_name` | text | |
| `email` | text, unique | |
| `role` | text | `librarian` \| `assistant` \| `patron` |
| `created_at` | timestamptz | |

## `items`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid, PK | |
| `title` | text | |
| `type` | text | `book` \| `dvd` \| `audiobook` |
| `replacement_cost` | numeric | used as the fine cap, see `PRODUCT_SPEC.md` §6 |
| `active` | boolean, default true | inactive items are not bookable |

## `loans`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid, PK | |
| `item_id` | uuid, FK → `items(id)` | |
| `patron_id` | uuid, FK → `patrons(id)` | |
| `status` | text | `on_hold` \| `ready_for_pickup` \| `checked_out` \| `returned` \| `overdue` \| `lost` |
| `checked_out_at` | timestamptz, nullable | |
| `due_at` | timestamptz, nullable | |
| `returned_at` | timestamptz, nullable | |
| `renewal_count` | integer, default 0 | see the renewal-limit conflict noted in `PRODUCT_SPEC.md` §4 and `RENEWAL_RULES.md` |
| `created_at` | timestamptz | |

## `holds`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid, PK | |
| `item_id` | uuid, FK → `items(id)` | |
| `patron_id` | uuid, FK → `patrons(id)` | |
| `status` | text | `active` \| `ready_for_pickup` \| `checked_out` \| `cancelled` |
| `cancelled_at` | timestamptz, nullable | |
| `cancellation_reason` | text, nullable | `patron_requested` \| `staff_requested` \| `auto_expired` |
| `queue_position` | integer | order within the item's hold queue |

## `fines`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid, PK | |
| `loan_id` | uuid, FK → `loans(id)` | |
| `patron_id` | uuid, FK → `patrons(id)` | |
| `amount` | numeric | |
| `waived_amount` | numeric, default 0 | |
| `waived_by` | uuid, FK → `patrons(id)`, nullable | must be a `librarian` role — see `PRODUCT_SPEC.md` §2 |
| `waived_reason` | text, nullable | |
| `status` | text | `accruing` \| `paid` \| `waived` |

## Open schema questions

- Whether `renewal_count` should cap at 2 (per `PRODUCT_SPEC.md`) or 3 (per `RENEWAL_RULES.md`)
  is **`NEEDS_VERIFICATION`** until the conflict documented in `docs/guides/HANDLING_CONFLICTS.md`
  is formally resolved by a Tier 2 amendment. This schema file does not take a position on the
  number — it only defines the column.

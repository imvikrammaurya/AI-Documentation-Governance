# Booklyn — Implementation Status

> **This is Booklyn's own feature-level tracker** — a worked example of
> `docs/governance/IMPLEMENTATION_STATUS.md`'s rules applied to a concrete fictional product.
> Nothing below reflects a real system.

**Hard rule (see `agents/skills/update-implementation-status/SKILL.md`):** the existence of a
product spec, API design, schema, or execution guide never, by itself, justifies `IMPLEMENTED`
or `PARTIALLY_IMPLEMENTED`. Only explicit user/team confirmation or a verification artifact
(test results, deployment logs) counts as evidence.

| Feature | Status | Evidence | Notes |
|---|---|---|---|
| Catalog browsing | `NEEDS_VERIFICATION` | None in this example | No deployment confirmation exists in this fictional workspace; documented in `PRODUCT_SPEC.md` §1 only. |
| Hold placement | `NEEDS_VERIFICATION` | None in this example | Documented in `PRODUCT_SPEC.md` §5, `API_DESIGN.md`; no build confirmation recorded. |
| Loan checkout / return | `NEEDS_VERIFICATION` | None in this example | Documented in `PRODUCT_SPEC.md` §3, `API_DESIGN.md`. |
| **Renewal system** | **`GUIDE_CREATED`** | `docs/examples/library-lending/RENEWAL_RULES.md` exists | Execution guide exists **and is itself in an unresolved conflict with `PRODUCT_SPEC.md`** (see `docs/guides/HANDLING_CONFLICTS.md`). A guide existing is not evidence of a build — this is the canonical example of the doc-vs-implementation rule in this repository. |
| Hold cancellation | `PARTIALLY_IMPLEMENTED` | Fictional example evidence: "team confirmed manual staff-initiated cancellation ships in v0.3; auto-expiry after 3 days is not yet built" (illustrative confirmation statement, not a real deployment) | Demonstrates a status between `GUIDE_CREATED` and `IMPLEMENTED` — part of the documented behavior is confirmed, part is not. |
| Fine calculation | `NEEDS_VERIFICATION` | None in this example | Documented in `PRODUCT_SPEC.md` §6; no confirmation exists. |
| Overdue notifications | `PLANNED` | Discussed in `PRODUCT_SPEC.md` §7 | Scoped in the spec; no execution guide has been written yet, so it does not even reach `GUIDE_CREATED`. |

## Valid states (reference)

`PLANNED` → `GUIDE_CREATED` → `PARTIALLY_IMPLEMENTED` → `IMPLEMENTED`, with `NEEDS_VERIFICATION`
usable at any point evidence is insufficient, and `DEPRECATED` for retired features. See
`docs/governance/IMPLEMENTATION_STATUS.md` for the full state machine and evidence rules.

## How to read this table if you are an agent answering "is renewal implemented?"

Correct answer shape: *"The documentation specifies a renewal system (`PRODUCT_SPEC.md` §4,
`RENEWAL_RULES.md`) — and those two documents currently disagree on the renewal limit, see
`docs/guides/HANDLING_CONFLICTS.md`. Implementation status is tracked as `GUIDE_CREATED`: an
execution guide exists, but there is no recorded evidence it has been built. Implementation
status cannot be verified further from this documentation workspace."* Anything shorter than
that — e.g., "yes, patrons can renew books up to three times" — violates both the
authority-conflict rule and the doc-vs-implementation rule in the same sentence.

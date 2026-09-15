# Guide: Answering Feature Questions

Human-readable walkthrough of Workflow 3 (`docs/architecture/WORKFLOW_MODEL.md`). The
agent-executable version is `agents/skills/answer-feature-question/SKILL.md`.

## Worked example: "How does the Booklyn renewal system work?"

**Step 1 — identify the feature and its authoritative documentation.**
`docs/governance/DOCUMENTATION_INDEX.md` → Product Requirements domain →
`docs/examples/library-lending/PRODUCT_SPEC.md` §4 (Tier 1).

**Step 2 — retrieve related documents.**
`docs/examples/library-lending/RENEWAL_RULES.md` (Tier 4, the execution guide for this feature)
and `API_DESIGN.md` (the `/api/loans/{id}/renew` endpoint).

**Step 3 — check for conflicts.**
Yes — `PRODUCT_SPEC.md` says two renewals, `RENEWAL_RULES.md` says three. Resolved via
`resolve-document-conflict`: Tier 1 wins (see `docs/guides/HANDLING_CONFLICTS.md`). This is
disclosed in the answer, not silently dropped.

**Step 4 — check implementation status.**
`docs/examples/library-lending/IMPLEMENTATION_STATUS.md` → Renewal system: `GUIDE_CREATED`. No
evidence of an actual build exists in this workspace.

**Step 5 — compose the answer.**

> The documentation specifies a renewal system: a patron or staff member may extend a
> `checked_out` loan's due date by 14 days, provided no other patron holds an active hold on
> the item (`RENEWAL_RULES.md`). The renewal limit itself is **disputed between two documents**:
> the Tier 1 product spec states two renewals (`PRODUCT_SPEC.md` §4); the Tier 4 execution
> guide states three (`RENEWAL_RULES.md`). Per the authority hierarchy, the Tier 1 figure of
> **two** is the one currently authoritative — the execution guide is flagged for correction,
> not currently correct.
>
> **Implementation status: `GUIDE_CREATED`.** An execution guide exists for this feature, but
> there is no recorded evidence in this workspace that it has actually been built.
> Implementation status cannot be verified further from the documentation workspace.

This answer does five things a naive answer wouldn't: cites specific documents, discloses
rather than hides the conflict, states which side of the conflict is authoritative and why,
separates documented behavior from implementation status, and refuses to just say "yes, it
works" or "renewals are limited to three" as a flat fact.

## The failure mode this guide exists to prevent

```
BAD:  "Yes, patrons can renew a book up to three times."
```

This is wrong twice over: it picks the losing side of an unresolved conflict without
disclosing the conflict existed, and it states implementation as fact with zero evidence the
feature was ever built.

## Checklist for any feature-question answer

- [ ] Authoritative document identified and cited (not guessed from memory).
- [ ] Related/dependent documents retrieved.
- [ ] Conflicts checked and, if found, disclosed with the resolution.
- [ ] Implementation status checked and stated separately from documented behavior.
- [ ] If nothing is documented: say so plainly — never infer an answer from adjacent documents.

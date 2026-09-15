# Test: Authority Resolution

**Validates:** the 6-step conflict-resolution order (`docs/architecture/AUTHORITY_MODEL.md`),
skill `agents/skills/resolve-document-conflict/SKILL.md`.

## Input A — the live, bundled conflict

Ask: "Books may be renewed twice according to one document and three times according to
another — which is correct?" (or directly: "resolve the conflict between
`docs/examples/library-lending/PRODUCT_SPEC.md` and
`docs/examples/library-lending/RENEWAL_RULES.md`.")

### Expected

1. Both documents identified by exact path.
2. Resolution order applied in sequence, starting at step 1 (Authority level).
3. Step 1 resolves it: `PRODUCT_SPEC.md` (Tier 1) beats `RENEWAL_RULES.md` (Tier 4). Steps 2–6
   are not needed and should not be presented as if they were separately checked and agreed.
4. Winner stated as "two renewals," with the losing document flagged (not deleted, not
   rewritten) — matching `docs/governance/DOCUMENT_AUTHORITY.md` row 4.
5. The output explicitly cites resolution-order **step 1** as what resolved it.

### Pass/Fail Criteria

- **PASS** if the answer is "two," cites step 1 (Authority level) by name, and does not silently
  average, split the difference, or prefer the more detailed/execution-level document.
- **FAIL** if the answer says "three" (picking the lower-tier document), or gives "two" without
  citing which resolution step justified it.

## Input B — a constructed unresolvable case

Ask the agent to imagine two new, equal-tier (both Tier 3) documents that disagree on a detail
neither amends, supersedes, or explicitly post-dates the other on.

### Expected

Output exactly `NEEDS_VERIFICATION / USER DECISION REQUIRED`, explaining that none of the six
steps resolved it — not a guess, not a preference for either document.

### Pass/Fail Criteria

- **PASS** if the agent stops and outputs the exact unresolved-case string, without guessing.
- **FAIL** if the agent picks a winner anyway, for any reason not traceable to one of the six
  steps.

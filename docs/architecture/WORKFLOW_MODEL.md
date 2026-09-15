# Workflow Model

This document specifies the three core workflows an agent runs against this framework, and the
two operating modes that govern what an agent is allowed to claim.

## Operating modes

An adopter must explicitly declare which mode is active — an agent must never infer or switch
modes on its own mid-conversation.

### Documentation-only mode (default)

The agent has access only to the documentation tree under `<PROJECT_ROOT>`. It must never claim
knowledge of what is actually running in production.

```
BAD:  "The application currently cancels bookings after 24 hours."
GOOD: "The documentation specifies automatic cancellation after 24 hours.
       Implementation status cannot be verified from the documentation workspace."
```

Every task skill in `agents/skills/` defaults to this mode and refuses requests to inspect
`<PRODUCTION_CODE_PATH>` — see `agents/rules/DOCUMENTATION_GOVERNANCE.md` §Production Boundary.

### Documentation + code verification mode

The adopter explicitly grants the agent access to a real codebase (or deployment logs, test
output, etc.) in addition to the documentation tree. In this mode the agent may cross-check a
documented claim against the code, but must clearly label which part of its answer came from
documentation and which part came from code verification — the two must never be merged into a
single undifferentiated claim. Entering this mode does not relax the authority hierarchy or
conflict-resolution rules; it only adds a second, separately-labeled source of evidence.

## Workflow 1 — New document registration

```
New document
      ↓
1. Detection        — scan the documentation tree, diff against FILE_INVENTORY.md
      ↓
2. Classification    — assign a domain (see KNOWLEDGE_MODEL.md) and document type
      ↓
3. Authority check    — assign a tier (see AUTHORITY_MODEL.md); default to "not yet confirmed"
      ↓
4. Dependency analysis — extract stated dependencies from the document's own text only
      ↓
5. Conflict/supersession check — does it contradict, amend, or supersede an existing document?
      ↓
6. Registration       — append-only edits to DOCUMENTATION_INDEX.md, DOCUMENT_AUTHORITY.md,
                         FILE_INVENTORY.md
      ↓
7. Knowledge-base update — append-only edit to KNOWLEDGE_BASE_MAP.md
      ↓
8. Audit log entry    — append a dated entry to AUTO_REGISTRATION_LOG.md
      ↓
9. Validation         — re-run detection; a correct run finds zero unregistered files afterward
```

Owned by `agents/skills/register-documentation/SKILL.md`. Steps 1 and 9 together are what make
the workflow **idempotent**: registering an already-registered, unchanged document is detected
at step 1 and the workflow stops immediately with no edits — see
`docs/guides/VALIDATION.md` §Idempotency and `tests/TEST_IDEMPOTENCY.md`. This workflow is also
implemented as working, non-interactive automation — see `scripts/register-documentation.js` and
`scripts/discover-documents.js` — not just described in prose.

## Workflow 2 — Conflict resolution

```
Conflicting documents identified
      ↓
1. Confirm both documents genuinely disagree (not just different scope/detail level)
      ↓
2. Apply the 6-step resolution order in AUTHORITY_MODEL.md, in sequence
      ↓
3a. Resolved  → record the winner + the exact step that resolved it; flag the loser for a
                 superseded marker via register-documentation — never delete or silently rewrite it
3b. Unresolved → output "NEEDS_VERIFICATION / USER DECISION REQUIRED" and stop
```

Owned by `agents/skills/resolve-document-conflict/SKILL.md`. This is not invoked only when a
user explicitly asks "which document is right" — every task skill that answers questions, plans
features, or creates guides invokes this workflow whenever it encounters two authoritative-
looking documents that disagree, rather than silently picking one.

## Workflow 3 — Feature-question answering

```
"How does <feature> work?"
      ↓
1. Identify the feature and locate its authoritative documentation
   (docs/governance/DOCUMENTATION_INDEX.md → domain → specific document)
      ↓
2. Retrieve related/dependent documents
      ↓
3. Run Workflow 2 if any retrieved documents disagree
      ↓
4. Check docs/governance/IMPLEMENTATION_STATUS.md (or the product's own status tracker)
      ↓
5. Compose the answer:
     - documented/intended behavior, cited by document
     - clearly separated implementation-status statement
      ↓
6. If nothing is found: state plainly that the workspace does not document this,
   rather than inferring an answer from adjacent documents
```

Owned by `agents/skills/answer-feature-question/SKILL.md`. See
`docs/guides/ANSWERING_FEATURE_QUESTIONS.md` for a fully worked example against the bundled
Booklyn renewal system, and `tests/TEST_FEATURE_QUESTIONS.md` for the pass/fail criteria.

## How the other skills fit around these three workflows

| Skill | Relationship to the three core workflows |
|---|---|
| `create-execution-guide` | Produces a new Tier 4 document, then always triggers Workflow 1 (register it) and sets status via `update-implementation-status` to `GUIDE_CREATED` — never higher. |
| `plan-new-feature` | Produces a plan document (triggers Workflow 1 if saved) and runs Workflow 2 if it discovers conflicting requirements while researching. |
| `modify-existing-documentation` | Runs Workflow 2 if the requested change conflicts with an existing amendment or authority; triggers Workflow 1 for any new modification-plan document. |
| `update-project-memory` | Independent of the three core workflows — writes durably to `PROJECT_MEMORY.md` / `PROJECT_DECISIONS.md` on explicit user statement of a decision or solved problem. |
| `update-implementation-status` | Independent utility invoked by `create-execution-guide` and directly by explicit user confirmation of deployment; never invoked to "guess" a status. |
| `audit-documentation` | Read-only, judgment-based sweep across all ten knowledge domains; reports findings, does not fix them. |
| `validate-documentation` | Read-only, mechanical sweep (backed by `scripts/validate-documentation.js` where automatable); reports pass/fail, does not fix them. |

# Test Suite

These are scenario/structural test **specifications** — precise, reproducible procedures an
agent (or a human reviewer) runs and reports PASS/FAIL against, in the same format used to
validate the original private documentation-governance workspace this framework was extracted
from. They are Markdown specs, not an automated test runner, except where noted — three of them
(`TEST_DOCUMENT_REGISTRATION.md`, `TEST_IDEMPOTENCY.md`, part of `TEST_AUTHORITY_RESOLUTION.md`)
are backed by real, runnable checks in `scripts/`.

All six run against the bundled Booklyn example (`docs/examples/library-lending/`,
`docs/governance/`), so anyone can reproduce every result without setting up a separate project
first.

## How to run a scenario

1. Open the test file.
2. Follow "Input" exactly (a literal question/instruction to give an agent, or a literal script
   command to run).
3. Compare the actual result against "Expected."
4. Report: files inspected, actual behavior, PASS/FAIL, any files modified and why.

Never mark a scenario PASS without actually running it — see
`agents/skills/validate-documentation/SKILL.md` §Reporting.

## Index

| Test | Validates |
|---|---|
| `TEST_DOCUMENT_REGISTRATION.md` | Workflow 1 — a new document gets detected and registered correctly |
| `TEST_IDEMPOTENCY.md` | Registration run twice produces zero duplicates |
| `TEST_AUTHORITY_RESOLUTION.md` | The 6-step conflict-resolution order, using the live `PRODUCT_SPEC.md`/`RENEWAL_RULES.md` conflict |
| `TEST_IMPLEMENTATION_STATUS.md` | A guide's existence is never treated as proof of a build |
| `TEST_PROJECT_MEMORY.md` | Decision/problem-solution capture, with correct entry typing |
| `TEST_FEATURE_QUESTIONS.md` | Feature-question answering correctly separates documented vs. implemented, and discloses conflicts |

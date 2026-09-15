# Changelog

All notable changes to this project are documented here. Format loosely follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.1.0] — 2026-09-15

### Added
- Initial public release of the documentation-governance framework.
- `agents/rules/DOCUMENTATION_GOVERNANCE.md` — workspace boundary, authority, and safety rules.
- 10 agent skills under `agents/skills/` covering answering feature questions, execution-guide
  creation, planning, modification, registration, conflict resolution, project memory, status
  tracking, and validation (auditing + structural).
- `docs/architecture/` — the four architecture references (layer diagram, authority model,
  knowledge model, workflow model).
- `docs/governance/` — the eight live governance files (index, authority map, file inventory,
  implementation status, knowledge-base map, project memory, decision log, registration log),
  each documenting both the generic pattern and a real worked instance from the bundled example.
- `docs/guides/` — five human-readable how-to guides mirroring the agent skills.
- `docs/examples/library-lending/` and `examples/fictional-library-project/` — a complete
  fictional example project ("Booklyn," a library-lending system) exercising every workflow,
  including a deliberately unresolved authority conflict between `PRODUCT_SPEC.md` and
  `RENEWAL_RULES.md`.
- `templates/` — six blank, fillable templates for product-level documentation.
- `tests/` — six scenario/structural test specifications plus a test-suite README.
- `scripts/discover-documents.js`, `scripts/register-documentation.js`,
  `scripts/validate-documentation.js` — working, dependency-free Node.js automation, not
  placeholder scripts. See `scripts/README.md` for usage and the exit codes each one returns.
- `LICENSE` (MIT), `CONTRIBUTING.md`, `SECURITY.md`.

### Notes
- This release ships the specification and working local tooling. It does not ship a CI
  workflow, GitHub Action, or hosted service — see `docs/governance/IMPLEMENTATION_STATUS.md`
  for the framework's own honest implementation-status tracking (the same doc-vs-implementation
  rule the framework enforces for adopters is applied to itself here).

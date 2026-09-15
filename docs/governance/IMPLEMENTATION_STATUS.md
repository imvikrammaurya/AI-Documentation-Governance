# Implementation Status — Framework Components

> **This tracks the implementation status of this framework's own pieces** (skills, scripts,
> tooling) — applying the framework's own central rule to itself. For the Booklyn *example
> product's* feature-level status tracker, see
> `docs/examples/library-lending/IMPLEMENTATION_STATUS.md`. For the state machine and evidence
> rules themselves, see `agents/skills/update-implementation-status/SKILL.md`.

**Hard rule:** a skill's or script's existence in this repository is not, by itself, proof it
was tested against a real adopter project. Status below is scoped honestly to what this
repository's own build actually verified.

| Component | Status | Evidence |
|---|---|---|
| `agents/rules/DOCUMENTATION_GOVERNANCE.md` (boundary/authority rules) | `IMPLEMENTED` | Present in this repository; consistent with every skill file that references it (cross-checked during build — see `docs/governance/AUTO_REGISTRATION_LOG.md`). |
| 10 skill definitions (`agents/skills/*/SKILL.md`) | `IMPLEMENTED` | All 10 present, each with Mandatory Discovery, Workflow, and Expected Output sections. |
| `scripts/discover-documents.js` | `IMPLEMENTED` | Working Node.js script, run against this repository's own `docs/governance/FILE_INVENTORY.md` during the build — see run output referenced in the repository's build report. |
| `scripts/register-documentation.js` | `IMPLEMENTED` | Working Node.js script; idempotency verified by running it twice against the same file. |
| `scripts/validate-documentation.js` | `IMPLEMENTED` | Working Node.js script; run against this repository at build time. |
| GitHub Actions CI workflow (running the scripts on every PR) | `IMPLEMENTED` | `.github/workflows/validate.yml` runs `node scripts/validate-documentation.js .` on every `push` and `pull_request`. |
| Hosted/web dashboard for governance state | `PLANNED` | Mentioned only as a possible future direction; zero code exists. Explicitly out of scope for v0.1.0. |
| Multi-repo / cross-project registration | `NEEDS_VERIFICATION` | Not designed for; untested. An adopter attempting this should treat it as unverified, not unsupported-by-design. |

## Valid states

- `PLANNED` — discussed or scoped, nothing built.
- `GUIDE_CREATED` — a guide/spec exists; nothing confirmed built from it.
- `PARTIALLY_IMPLEMENTED` — explicit evidence some but not all of a component is real/working.
- `IMPLEMENTED` — explicit evidence the full component is real/working.
- `NEEDS_VERIFICATION` — status unknown or evidence insufficient. Default when in doubt.
- `DEPRECATED` — explicitly retired.

**Hard rule, restated:** the existence of a skill file or a script file is not, by itself,
`IMPLEMENTED` — evidence above is "I ran this and observed the output," not "I wrote this and
it looks complete." Where that run evidence doesn't exist for a claim, this table says
`PLANNED` or `NEEDS_VERIFICATION`, not `IMPLEMENTED`.

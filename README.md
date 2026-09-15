# AI Documentation Governance

A framework for keeping an AI-assisted documentation workspace honest: it knows which document
wins when two disagree, it never confuses a written plan with a shipped feature, and it can tell
you exactly what it doesn't know instead of guessing.

## 1. What this is

A **specification plus working local tooling** for governing a documentation knowledge base that
an AI coding/documentation agent (or a human) reads from. It includes:

- Workspace boundary and safety rules (`agents/rules/DOCUMENTATION_GOVERNANCE.md`)
- Ten composable agent skills (`agents/skills/`)
- A five-tier document authority model with a deterministic conflict-resolution algorithm
  (`docs/architecture/AUTHORITY_MODEL.md`)
- A ten-domain knowledge model (`docs/architecture/KNOWLEDGE_MODEL.md`)
- Live governance files — index, authority map, file inventory, knowledge-base map,
  implementation-status tracker, project memory (`docs/governance/`)
- Three real, dependency-free automation scripts (`scripts/`)
- A complete fictional example project — **Booklyn**, a library-lending system — that exercises
  every workflow, including an **intentional, deliberately unresolved authority conflict kept in
  the repository on purpose as a test fixture** for the authority/conflict-resolution model (see
  §6 and §11) (`docs/examples/library-lending/`, `examples/fictional-library-project/`)
- A test suite of reproducible scenarios (`tests/`)

It is not a hosted service, not a database, and not a code-generation tool.

## 2. Why this exists — the problem

An AI agent answering questions from a pile of Markdown files will, by default, treat every
sentence as equally true. It cannot tell a *design intent* document from a *what actually
shipped* record, cannot tell a current spec from an old one nobody deleted, and cannot notice
that two documents quietly disagree. The result isn't hallucination in the usual sense — it's
worse: a confident, well-cited, wrong answer, built entirely out of real documents that were
simply never reconciled with each other or with reality.

## 3. Why agents hallucinate from documentation specifically

Three structural gaps cause this, and this framework targets each one directly:

1. **No authority signal.** Every file looks equally official. Fixed by the five-tier authority
   model (§6).
2. **No conflict detection.** Two documents can disagree for months with nobody noticing until
   an agent quotes the wrong one. Fixed by a deterministic, always-invoked resolution procedure
   (§6).
3. **No documentation/implementation separation.** A detailed execution guide *reads* like proof
   the feature works. It isn't. Fixed by treating implementation status as a separately-tracked,
   separately-evidenced fact (§4).

## 4. Documentation vs. implementation

**The single most important rule in this framework:** a document describing a feature is never,
by itself, evidence the feature is built.

```
BAD:  "The application currently cancels holds after 3 days."
GOOD: "The documentation specifies automatic hold cancellation after 3 days.
       Implementation status cannot be verified from the documentation workspace."
```

Enforced by `agents/skills/update-implementation-status/SKILL.md`'s hard rule and evidence
requirements (only explicit confirmation or a verification artifact counts — never guide
completeness or tone). See it applied to a real example in
`docs/examples/library-lending/IMPLEMENTATION_STATUS.md`, where a fully detailed execution guide
(`RENEWAL_RULES.md`) is tracked as `GUIDE_CREATED`, not `IMPLEMENTED`.

## 5. Documentation lifecycle

```mermaid
flowchart LR
    A[New document] --> B[Detection]
    B --> C[Classification]
    C --> D[Authority check]
    D --> E[Dependency analysis]
    E --> F[Registration]
    F --> G[Knowledge-base update]
    G --> H[Validation]
    H --> I[Audit log]
```

Full spec: `docs/architecture/WORKFLOW_MODEL.md`. Human walkthrough: `docs/guides/ADDING_DOCUMENTATION.md`.

## 6. Authority model

Five tiers: **Primary Authority → Approved Amendment/Superseding Document → Domain
Implementation Architecture → Execution Guide/Supporting Document → Historical/Superseded.**

When two documents disagree, a fixed six-step resolution order applies (authority level →
version → amendment → supersession → date → explicit precedence rule), stopping at the first
step that resolves it. If nothing resolves it, the output is exactly
`NEEDS_VERIFICATION / USER DECISION REQUIRED` — never a guess, never a coin flip, never "the
more detailed document is probably right." Filenames (`_v2`, `_final`, `_rewrite`) are never
proof of authority by themselves.

Full model: `docs/architecture/AUTHORITY_MODEL.md`. Live example:
`docs/guides/HANDLING_CONFLICTS.md` walks through a real, bundled conflict between two Booklyn
documents on a renewal limit (two vs. three renewals) and shows exactly how it resolves.

## 7. Automatic registration

New documents are detected (diffed against `docs/governance/FILE_INVENTORY.md`), classified,
tier-assigned, checked for conflicts, and registered with append-only edits — never a full-file
rewrite, never a silently invented authority claim. The same procedure, run twice against an
unchanged file, is a guaranteed no-op the second time (idempotent by construction — see
`tests/TEST_IDEMPOTENCY.md` and the real proof in
`docs/governance/AUTO_REGISTRATION_LOG.md` Run 2).

This isn't only described in prose — `scripts/register-documentation.js` and
`scripts/discover-documents.js` implement the mechanical parts as real, runnable code. See
`scripts/README.md`.

## 8. Project memory

A durable, append-only log of decisions, rejected approaches, and solved problems
(`docs/governance/PROJECT_DECISIONS.md`), captured only from explicit statements ("we decided
X," "we solved this by Y") — never from brainstorming. Three entry types: `DECISION`,
`PROBLEM`+`SOLUTION`, `ASSUMPTION` — and an `ASSUMPTION` is never silently promoted to settled
fact. See `docs/governance/PROJECT_MEMORY.md` and the worked example: a fictional Booklyn bug
("renewal requests were producing duplicate records") fixed with an idempotency key
(`patron_id + book_id + renewal_period`).

## 9. Implementation-status separation

See §4. State machine: `PLANNED → GUIDE_CREATED → PARTIALLY_IMPLEMENTED → IMPLEMENTED`, with
`NEEDS_VERIFICATION` usable at any point and `DEPRECATED` for retired features. This rule is
applied reflexively to the framework's own components too — see
`docs/governance/IMPLEMENTATION_STATUS.md`, which honestly tracks that the three automation
scripts and the GitHub Actions CI workflow are `IMPLEMENTED` (verified by running them) while a
hosted dashboard remains `PLANNED` (zero code exists — not claimed otherwise).

## 10. Conflict resolution

See §6. Owned by `agents/skills/resolve-document-conflict/SKILL.md`, invoked automatically by
every other skill that answers, plans, creates, or modifies documentation whenever it hits two
authoritative-looking documents that disagree — never invoked only on request.

## 11. Example workflow

The bundled example, **Booklyn** (a fictional community-library lending system — no real
library, vendor, or data), exercises the whole system:

1. `docs/examples/library-lending/PRODUCT_SPEC.md` (Tier 1) states a two-renewal limit.
2. `docs/examples/library-lending/RENEWAL_RULES.md` (Tier 4, an execution guide) states three —
   a deliberate, live conflict.
3. Asking "how does the renewal system work?" produces an answer that cites both documents,
   discloses the conflict, resolves it in favor of the Tier 1 document, and separately states
   implementation status as `GUIDE_CREATED` (not verified built) — see
   `docs/guides/ANSWERING_FEATURE_QUESTIONS.md` for the full worked answer.
4. Running `node scripts/validate-documentation.js .` mechanically confirms the registration and
   reference integrity of the whole repository, including this example.

**Why the conflict is still here:** the two-vs-three-renewals disagreement between
`PRODUCT_SPEC.md` and `RENEWAL_RULES.md` is not an oversight and it is not a bug to be fixed
before publishing. It is a permanent, intentional test fixture — kept live on purpose — so the
authority model and its deterministic resolution algorithm (§6) have a real, reproducible case
to demonstrate and so `tests/TEST_AUTHORITY_RESOLUTION.md` has something concrete to check
against (see `docs/governance/PROJECT_DECISIONS.md` entry A-001 and the step-by-step resolution
in `docs/guides/HANDLING_CONFLICTS.md`). Do not "fix" this conflict — resolving it would remove
the one worked example proving the conflict-resolution system actually works.

Start here: `examples/fictional-library-project/README.md`.

## 12. Using this with Claude Code, Gemini, or another AI coding agent

- **Claude Code:** copy `agents/rules/DOCUMENTATION_GOVERNANCE.md` into your project (e.g. as
  `CLAUDE.md` or an imported rules file) and `agents/skills/` as Claude Code skills — each
  `SKILL.md` follows the standard skill-file shape (YAML frontmatter with `name`/`description`,
  then the workflow). Point `<PROJECT_ROOT>` at your repo and `<PRIMARY_AUTHORITY_DOCUMENT>` at
  your root spec.
- **Gemini / other agents with a "rules" or "system instructions" mechanism:** paste
  `agents/rules/DOCUMENTATION_GOVERNANCE.md` and the relevant `SKILL.md` files into whatever
  instruction-loading mechanism your tool supports (system prompt, project instructions,
  `.cursorrules`-equivalent, etc.). The rules are plain Markdown with no Claude-specific syntax.
- **Any agent:** at minimum, get it to read `docs/governance/DOCUMENTATION_INDEX.md` first, every
  session, and treat `docs/governance/DOCUMENT_AUTHORITY.md` and
  `docs/governance/IMPLEMENTATION_STATUS.md` as binding constraints on what it's allowed to
  claim.

## 13. Adding this to an existing project

1. Copy `agents/`, `docs/architecture/`, `docs/governance/`, and `templates/` into your repo
   (keep the directory names, or update every cross-reference if you rename them).
2. Replace every `<PLACEHOLDER>` (see `docs/architecture/ARCHITECTURE.md` §Placeholders) with
   your project's real values.
3. Delete `docs/examples/` and `examples/` (Booklyn), or keep them as a reference while you
   build out your own product docs alongside them.
4. Write your Tier 1 document at `<PRIMARY_AUTHORITY_DOCUMENT>` using
   `templates/PRODUCT_SPEC_TEMPLATE.md`.
5. Run `node scripts/discover-documents.js docs docs/governance/FILE_INVENTORY.md` to bootstrap
   registration of whatever documentation you already have.
6. Run `node scripts/validate-documentation.js .` and fix anything it reports before treating the
   workspace as ready for an agent to rely on.

## 14. Limitations

- CI runs `node scripts/validate-documentation.js .` on every push and pull request via
  `.github/workflows/validate.yml`. See `docs/governance/IMPLEMENTATION_STATUS.md`.
- No hosted dashboard, no database — everything is flat Markdown, intentionally, for
  auditability and zero infrastructure cost.
- The automation scripts validate *structure* (registration, references, duplicates) — they do
  not and cannot validate *meaning* (whether a business rule is actually correct). That's what
  `audit-documentation`'s judgment-based sweep is for, and it still requires a human or agent to
  read the content.
- This framework assumes a single-writer-at-a-time workflow (one agent or person editing
  governance files per session). It has no locking or merge-conflict handling for concurrent
  registration.
- `resolve-document-conflict`'s six-step order is deliberately rigid. If your project needs a
  seventh tie-breaker rule, add it explicitly to `docs/architecture/AUTHORITY_MODEL.md` — don't
  let an agent improvise one.

## 15. Security considerations

See `SECURITY.md`. In short: never commit secrets or real client data, review AI-authored writes
to governance files before merging, and check any content extracted from a private/internal
workspace for proprietary leakage before publishing — exactly what this repository's own
extraction from a private workspace went through.

## 16. Contributing

See `CONTRIBUTING.md`.

## 17. License

MIT — see `LICENSE`.

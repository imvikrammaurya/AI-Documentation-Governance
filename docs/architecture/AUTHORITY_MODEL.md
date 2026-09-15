# Authority Model

Every document in the workspace has a declared authority tier. When two documents disagree, the
tier — plus the resolution order below — decides the outcome. An agent must never pick a winner
by feel, by filename, or by "which one sounds more recent."

## The five tiers

| Tier | Name | Meaning | Example (from the bundled Booklyn example) |
|---|---|---|---|
| 1 | **Primary Authority** | The single root product specification. Everything else must be consistent with it unless an explicit, documented amendment overrides a specific section. | `docs/examples/library-lending/PRODUCT_SPEC.md` |
| 2 | **Approved Amendment / Superseding Document** | A document that explicitly states it amends or supersedes another document, by name, with a reason. | (none in the bundled example yet — see `docs/guides/HANDLING_CONFLICTS.md` for how one would be created) |
| 3 | **Domain Implementation Architecture** | Architecture or design documents scoped to one subsystem (API, database, integration). Authoritative within their domain, but cannot override Tier 1 or Tier 2. | `docs/examples/library-lending/API_DESIGN.md`, `DATABASE_SCHEMA.md` |
| 4 | **Execution Guide / Supporting Document** | Step-by-step implementation guides, feature-specific rule documents, or supporting references. Useful and detailed, but the *lowest* tier that can still be "current." | `docs/examples/library-lending/RENEWAL_RULES.md` |
| 5 | **Historical / Superseded** | Explicitly marked superseded, deprecated, or historical. Never used as current authority unless the user explicitly asks for history. | (created when a Tier 2–4 document is superseded — see `DOCUMENT_AUTHORITY.md`) |

A document's tier is declared in `docs/governance/DOCUMENT_AUTHORITY.md`, never inferred from
its filename, folder, or how recently it was edited.

## Why filenames must never determine authority

A file named `_v2`, `_final`, `_rewrite`, or `_latest` is a claim, not proof. The only things
that actually establish authority are:

1. An explicit tier assignment recorded in `DOCUMENT_AUTHORITY.md`.
2. An explicit supersession statement inside the document itself ("This document supersedes
   `X.md` because ...").
3. An explicit amendment statement ("This document overrides §3 of `X.md` ...").

If a document's filename suggests it's newer or more authoritative but its own text and the
authority map don't confirm it, that is a `NEEDS_VERIFICATION` case, not a tier upgrade — see
`agents/skills/resolve-document-conflict/SKILL.md`'s prohibited-behavior list.

## Conflict resolution order

Applied in this exact sequence; stop at the first step that resolves the conflict.

1. **Authority level.** Tier 1 beats Tier 2 beats Tier 3 beats Tier 4 beats Tier 5, per the
   matrix in `DOCUMENT_AUTHORITY.md`.
2. **Version.** An explicit, higher version number wins over a lower one — but only if the
   *document's own text* confirms the version bump, not the filename alone. A file named `_v2`
   whose internal header still says "Version 1" does not win on this step.
3. **Amendment.** A document explicitly labeled AMENDMENT/OVERRIDE wins over the base document
   it amends, for the specific section it addresses.
4. **Supersession.** A document that explicitly states it supersedes another wins, for the
   whole document.
5. **Date/context.** If steps 1–4 don't resolve it, the most recently and explicitly dated
   statement wins — "explicitly dated" meaning the document states a date, not the file's OS
   modification timestamp.
6. **Explicit precedence rule.** If `DOCUMENT_AUTHORITY.md` already states a direct rule for
   this exact pair of documents, apply it even if it doesn't fit neatly into steps 1–5.

## What happens when two documents have equal authority

Equal tier, no amendment or supersession relationship, no version difference, no dated
statement that resolves it: this is not a coin flip. The conflict is reported as unresolved
(see below) and both documents are flagged in `DOCUMENT_AUTHORITY.md` as "conflicting, equal
authority" until a human resolves it — usually by explicitly promoting one to Tier 2 (amendment)
or explicitly deciding which one is wrong.

## What happens when the conflict cannot be resolved

After all six steps, if nothing settles it, the agent must output exactly:

```
NEEDS_VERIFICATION / USER DECISION REQUIRED
```

and stop. It must not guess, default to the most recently modified file, or silently prefer one
document. This is deliberately not a graceful degradation — an unresolved conflict silently
"handled" by picking one is worse than an explicit stop, because it hides the disagreement from
the person who could actually resolve it.

## Worked example (bundled in this repository)

`docs/examples/library-lending/PRODUCT_SPEC.md` (Tier 1) states patrons may renew a book twice.
`docs/examples/library-lending/RENEWAL_RULES.md` (Tier 4) states patrons may renew a book three
times. This is a deliberate, unresolved conflict left in the example on purpose — see
`docs/guides/HANDLING_CONFLICTS.md` for the full walkthrough of how `resolve-document-conflict`
handles it (Tier 1 wins at resolution-order step 1; `RENEWAL_RULES.md` gets flagged for review,
not silently deleted or rewritten).

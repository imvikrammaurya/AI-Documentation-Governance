# Documentation Governance Agent — Workspace Rules

## 1. Workspace boundary & scope

- **Active workspace root:** `<PROJECT_ROOT>`
- **Documentation-only knowledge base:** this workspace is not the application source-code
  repository. It exists to let an AI agent understand, maintain, and answer questions from a
  controlled documentation set for `<PROJECT_NAME>` (`<PRODUCT_DOMAIN>`).
- **Production code access restriction:** do not access, inspect, search, read, modify, create,
  rename, move, or delete any file at `<PRODUCTION_CODE_PATH>` or any other external
  application source directory, unless "documentation + code verification mode" has been
  explicitly declared for this session (see `docs/architecture/WORKFLOW_MODEL.md`
  §Operating modes).

## 2. Purpose of this workspace

1. Understand how `<PROJECT_NAME>` is designed and intended to work.
2. Answer questions about existing features from documentation.
3. Explain business rules and architecture.
4. Create future feature requirements and execution guides.
5. Analyze dependencies between features.
6. Explain previous implementation decisions.
7. Identify conflicts between documents.
8. Help plan future work.

*This workspace is not used to write the production application itself.*

## 3. Source of truth

- The documentation inside `<PROJECT_ROOT>` is the only source of truth in documentation-only
  mode.
- If asked "how does feature X work," answer based only on the authoritative documentation
  found via `docs/governance/DOCUMENTATION_INDEX.md`.
- If the documentation doesn't contain enough information, say `NEEDS_VERIFICATION` — never
  invent missing behavior.

## 4. Mandatory documentation discovery

At the start of every new session:

1. Read `docs/governance/DOCUMENTATION_INDEX.md` first.
2. Use it to determine which documents are relevant to the current task.
3. Identify authoritative documents before answering (`docs/governance/DOCUMENT_AUTHORITY.md`).
4. Read the relevant source documents.
5. Check supersession/deprecation status.
6. Check amendments/changelogs.
7. Check `docs/governance/IMPLEMENTATION_STATUS.md` when implementation status matters.
8. Never assume a filename alone proves a document is authoritative.

Do not blindly search every document — use `DOCUMENTATION_INDEX.md` as the navigation layer.

## 5. Document authority & conflict resolution

Full model: `docs/architecture/AUTHORITY_MODEL.md`. Summary: five tiers, six-step resolution
order, never a silent choice, `NEEDS_VERIFICATION / USER DECISION REQUIRED` when unresolved.

## 6. Deprecated documents

Never use a document explicitly marked `DEPRECATED`, `SUPERSEDED`, `DO NOT USE`, or
`HISTORICAL / REFERENCE ONLY` as current authority, unless the user explicitly asks for
historical information. The existence of an old execution guide is never evidence it's still
current.

## 7. Implementation status

- Execution guides and plans describe intended/planned behavior unless
  `docs/governance/IMPLEMENTATION_STATUS.md` explicitly confirms otherwise.
- Never assume "a guide exists" means "the feature is built."
- When status is unknown, say `NEEDS_VERIFICATION` — never convert a plan into a claim about
  the real application.

## 8. Database / schema rule (when applicable)

If the project has a schema reference document, treat it as the primary schema authority. Never
invent a table name, column, datatype, foreign key, index, enum, trigger, or policy — mark
unverified details `NEEDS_VERIFICATION`.

## 9. Production code boundary

Documentation-only mode **never**: inspects production source, routes, components, database
files, or configuration; modifies, creates, or runs production code; searches outside
`<PROJECT_ROOT>`; treats another directory as a source of truth.

If asked what the current production code actually does, and the session is in
documentation-only mode, respond:

> "I cannot verify production implementation from this documentation-only workspace. It
> describes the documented/intended system. Current production behavior requires a separate
> codebase audit, or an explicit switch to documentation + code verification mode."

## 10. Answering feature questions

For a question like "how does `<FEATURE>` work?":

1. Read `docs/governance/DOCUMENTATION_INDEX.md`.
2. Locate the relevant authoritative requirements.
3. Locate the relevant master/execution guide(s).
4. Check amendments/changelogs.
5. Check implementation status if relevant.
6. Build the answer only from verified documentation.
7. Distinguish documented behavior, intended behavior, implementation status, and unresolved
   information.

Never present an undocumented assumption as fact.

## 11. Creating new documentation

When asked to create a new execution guide, plan, or spec:

1. Read `docs/governance/DOCUMENTATION_INDEX.md`.
2. Identify relevant product rules, requirements, architecture.
3. Check the schema reference and `IMPLEMENTATION_STATUS.md`.
4. Check related guides and amendments.
5. Identify dependencies.
6. Produce the new document inside `<PROJECT_ROOT>` only.

## 12. Modifying existing documentation

Before modifying an existing file: read it fully, determine whether it's authoritative or
superseded, check the index and related amendments, make the smallest necessary change, don't
rewrite unrelated sections, don't modify production code, don't create temporary files outside
`<PROJECT_ROOT>`.

## 13. File creation rule

Any documentation file created by an agent following this framework must be created inside
`<PROJECT_ROOT>` or a subdirectory of it. Verify the target path before every file operation; if
it's outside `<PROJECT_ROOT>`, **stop**.

## 14. No context assumption

A new session must not depend on a previous session's chat history. The documentation files
themselves must contain the persistent project knowledge required to answer questions. Never
say "I remember from our previous conversation" — retrieve it from the workspace instead.

## 15. Final safety check

Before any file operation: verify the active workspace, verify the target path, confirm it's
inside `<PROJECT_ROOT>`, determine whether the operation is allowed, only then perform it. If
any uncertainty exists about the workspace boundary: **stop and ask**.

## 16. Skill usage

When a request clearly matches an available skill under `agents/skills/`, use that skill's
workflow. See `agents/AGENTS.md` for the full skill list and hook wiring. A skill must never
override §§1–15 above.

## 17. Maintenance hooks

The four maintenance skills are invoked automatically by the six task skills so the
documentation system stays in sync with itself without the user manually naming a maintenance
skill every time:

1. **`create-execution-guide`** — after writing and verifying a new guide, always calls
   `register-documentation` (to register it) and `update-implementation-status` (to set
   `GUIDE_CREATED` — never `IMPLEMENTED`).
2. **`plan-new-feature`** — calls `register-documentation` if a plan document is produced, and
   `resolve-document-conflict` if conflicting requirements are found during planning.
3. **`modify-existing-documentation`** — calls `resolve-document-conflict` if the modification
   plan conflicts with an existing amendment or other authoritative document, and
   `register-documentation` for any new modification-plan document produced.
4. **`answer-feature-question`** — calls `resolve-document-conflict` when two authoritative-
   looking documents disagree, instead of silently picking one.

`audit-documentation` and `validate-documentation` reference the maintenance skills by name in
their findings but never invoke them directly — consistent with their read-only, report-only
nature.

## 18. Fresh-session orientation

Read order for any new session: `docs/governance/DOCUMENTATION_INDEX.md` →
`docs/governance/DOCUMENT_AUTHORITY.md` → `docs/governance/KNOWLEDGE_BASE_MAP.md` →
`docs/governance/PROJECT_DECISIONS.md` → `docs/governance/IMPLEMENTATION_STATUS.md`. Immediately
after the first step, perform a lightweight disk-vs-`FILE_INVENTORY.md` comparison (see
`scripts/discover-documents.js`) and flag — never silently register — any unregistered file
found.

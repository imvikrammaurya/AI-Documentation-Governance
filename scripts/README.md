# Automation Scripts

Three real, dependency-free Node.js scripts (built-in `fs`/`path` only — no `npm install`
needed). They implement the mechanical parts of `docs/architecture/WORKFLOW_MODEL.md`'s
registration and validation workflows. They perform no network calls and never touch anything
outside the paths you pass them.

Run all commands from the repository root with a Node.js 16+ runtime.

## `discover-documents.js`

Scans a directory and reports any file not mentioned anywhere in `FILE_INVENTORY.md`. Read-only.

```
node scripts/discover-documents.js docs docs/governance/FILE_INVENTORY.md
```

Exit codes: `0` none unregistered, `1` unregistered files found, `2` bad input.

## `register-documentation.js`

Idempotent registration: checks whether a file is already referenced in `FILE_INVENTORY.md`;
if not, appends a row under the `<!-- AUTO-REGISTER -->` marker and appends a dated entry to
the registration log. Running it twice on the same file is a guaranteed no-op the second time.

```
node scripts/register-documentation.js <file> docs/governance/FILE_INVENTORY.md docs/governance/AUTO_REGISTRATION_LOG.md \
  --domain="Execution Guides" --purpose="One-line description"
```

Exit codes: `0` registered or already-registered no-op, `2` bad input or missing marker.

## `validate-documentation.js`

Runs four structural checks and prints a PASS/FAIL report:

1. Required governance files exist.
2. No unregistered file under `docs/`.
3. No path registered more than once in `FILE_INVENTORY.md`.
4. No broken relative Markdown link anywhere in the repository.

```
node scripts/validate-documentation.js .
```

Exit codes: `0` all checks passed, `1` at least one failed, `2` bad input.

## Design constraints (see `docs/governance/PROJECT_DECISIONS.md` D-002)

- No dependencies — only Node.js built-ins.
- No network access, ever.
- Read-only except `register-documentation.js`, which only ever **appends** — it never edits or
  deletes an existing line in either file it touches.
- Every script exits non-zero on a real failure, so they're CI-ready. `validate-documentation.js`
  is wired into `.github/workflows/validate.yml`, which runs it on every `push` and
  `pull_request` (see `docs/governance/IMPLEMENTATION_STATUS.md`).

## Format dependency

Both `discover-documents.js` and `validate-documentation.js` parse `FILE_INVENTORY.md` by
extracting every backtick-quoted, path-shaped token in the file. If you restructure
`FILE_INVENTORY.md`, keep every real path backtick-quoted (e.g. `` `docs/foo/BAR.md` ``) or these
scripts will stop working correctly.

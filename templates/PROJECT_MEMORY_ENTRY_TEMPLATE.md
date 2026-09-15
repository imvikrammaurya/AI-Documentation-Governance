# Project Memory Entry Template

Use one of these three shapes in `docs/governance/PROJECT_DECISIONS.md`. See
`docs/governance/PROJECT_MEMORY.md` for the full retrieval procedure and entry-type rules.

## `PROBLEM` + `SOLUTION`

```
### <ID> — <short title>

- **Type:** `PROBLEM` + `SOLUTION`
- **Problem:** <the concrete problem that occurred, stated specifically>
- **Attempted approach:** <what was tried first, if anything, and why it wasn't enough>
- **Final solution:** <what actually fixed it>
- **Reason:** <why this fix works / why the first attempt didn't>
- **Affected feature(s):** <feature/component names>
- **Affected documents:** <paths>
- **Date:** <YYYY-MM-DD>
- **Authority status:** `SOLUTION` — treat as current guidance unless superseded
- **Source:** <how this was captured>
```

## `ASSUMPTION`

```
### <ID> — <short title>

- **Type:** `ASSUMPTION`
- **Assumption:** <what is being treated as true without full verification>
- **Why this is only an assumption:** <what evidence is missing>
- **Affected feature(s):** <feature/component names>
- **Affected documents:** <paths>
- **Date:** <YYYY-MM-DD>
- **Authority status:** `ASSUMPTION` — not binding; do not treat as settled fact
- **Source:** <how this was captured>
```

**Never** silently promote an `ASSUMPTION` entry to `DECISION` or treat it as verified fact
without new evidence recorded in a follow-up entry.

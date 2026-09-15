# Project Decisions & Problem/Solution Log

Append-only. Never silently overwrite an entry — supersede it explicitly with
`SUPERSEDES: <entry id>` and a stated reason. See `docs/governance/PROJECT_MEMORY.md` for the
entry-type vocabulary and retrieval procedure.

---

### D-001 — Renewal duplicate-record bug (Booklyn example)

- **Type:** `PROBLEM` + `SOLUTION`
- **Problem:** Library renewal requests were producing duplicate loan-renewal records when a
  patron double-clicked "renew" or a request was retried after a timeout.
- **Attempted approach:** Client-side debounce on the renew button — reduced but did not
  eliminate duplicates under retry conditions.
- **Final solution:** Use an idempotency key based on `patron_id + book_id + renewal_period` on
  the renewal endpoint; a second request with the same key returns the existing renewal record
  instead of creating a new one.
- **Reason:** The failure mode was server-side (retries, not just double-clicks), so the fix
  needed to be server-side and deterministic rather than relying on client behavior.
- **Affected feature(s):** Renewal system.
- **Affected documents:** `docs/examples/library-lending/RENEWAL_RULES.md`,
  `docs/examples/library-lending/API_DESIGN.md`.
- **Date:** 2026-09-15 (fictional example, for illustration only).
- **Authority status:** Illustrative example entry, not a real incident.
- **Source:** Directly specified as an example by the framework's original requester.

---

### D-002 — Automation scripts stay dependency-free

- **Type:** `DECISION`
- **Decision:** `scripts/discover-documents.js`, `register-documentation.js`, and
  `validate-documentation.js` use only Node.js built-in modules (`fs`, `path`) — no npm
  dependencies, no `package.json` required to run them.
- **Reason:** A documentation-governance tool should be trivially auditable and runnable by
  cloning the repo alone, with no install step and no supply-chain surface. Adding a dependency
  (e.g., a Markdown parser or CLI framework) would improve ergonomics marginally at the cost of
  that guarantee.
- **Affected feature(s):** All three automation scripts.
- **Affected documents:** `scripts/README.md`, `CONTRIBUTING.md` §Ground rules.
- **Date:** 2026-09-15.
- **Authority status:** `DECISION` — binding for future contributions per `CONTRIBUTING.md`.
- **Source:** Framework design decision made during initial build.

---

### A-001 — Renewal-limit conflict is left unresolved on purpose

- **Type:** `ASSUMPTION`
- **Assumption:** The conflict between `PRODUCT_SPEC.md` (2 renewals) and `RENEWAL_RULES.md` (3
  renewals) is assumed to be more useful to the framework's audience left **unresolved and
  documented** than silently fixed, because it is the concrete example
  `docs/guides/HANDLING_CONFLICTS.md` and `tests/TEST_AUTHORITY_RESOLUTION.md` rely on.
- **Why this is only an assumption, not a decision:** if this repository's purpose shifts from
  "framework demonstration" to "template someone forks and ships as-is," this conflict should
  probably be resolved before shipping, not left as a permanent fixture.
- **Affected feature(s):** Renewal system (example).
- **Affected documents:** `docs/examples/library-lending/PRODUCT_SPEC.md`, `RENEWAL_RULES.md`,
  `docs/governance/DOCUMENT_AUTHORITY.md` row 4.
- **Date:** 2026-09-15.
- **Authority status:** `ASSUMPTION` — not binding; do not treat as settled.
- **Source:** Editorial judgment made while building this repository's example content.

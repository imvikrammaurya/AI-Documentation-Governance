# Contributing

Thanks for considering a contribution to this documentation-governance framework.

## What this project is (and isn't)

This is a **specification + working local tooling** for keeping an AI-assisted documentation
workspace internally consistent: authority hierarchy, conflict resolution, registration,
implementation-status separation, and validation. It is not a hosted service, not a database,
and not a code-generation tool for application code. Contributions should stay inside that
scope.

## Ways to contribute

1. **Improve a skill definition** (`agents/skills/*/SKILL.md`) — tighten a workflow, close a
   loophole where an agent could guess instead of saying `NEEDS_VERIFICATION`, or improve the
   expected-output contract so it's easier to verify a skill actually ran correctly.
2. **Improve the architecture docs** (`docs/architecture/`) — clarify the authority model, the
   conflict-resolution algorithm, or the knowledge-domain boundaries.
3. **Extend the automation scripts** (`scripts/`) — e.g., add a Markdown link-checker mode, a
   JSON output mode for CI, or a `--dry-run` flag. Keep scripts dependency-free (Node.js
   built-ins only) and offline (no network calls) unless there's a strong reason to add a
   dependency, discussed in an issue first.
4. **Improve the example project** (`docs/examples/library-lending/`,
   `examples/fictional-library-project/`) — add a new fictional feature that exercises a
   workflow not yet demonstrated (e.g., a supersession chain three documents deep).
5. **Add a test scenario** (`tests/`) — especially one that currently fails against the
   reference implementation, so it documents a real gap rather than a solved problem.
6. **Fix documentation bugs** — broken relative links, inconsistent placeholder names, stale
   cross-references between skills and governance files.

## Ground rules

- **No proprietary content.** Never submit real product documentation, real business rules,
  real schemas, or real client/customer information — even redacted. Use the fictional example
  domain or a new fictional domain of your own.
- **No secrets.** Never commit credentials, tokens, or API keys, including as examples — use
  `<PLACEHOLDER>` tokens.
- **Keep the doc-vs-implementation rule intact.** Any change that would let a skill infer
  `IMPLEMENTED` from a guide's mere existence is a regression, not an enhancement — see
  `docs/architecture/ARCHITECTURE.md` §"The one invariant that matters most."
- **Keep automation honest.** Do not add a script that only prints success without performing
  real work — see `scripts/README.md`.
- **Placeholders stay placeholders.** `<PROJECT_NAME>`, `<PROJECT_ROOT>`, `<PRODUCT_DOMAIN>`,
  `<PRIMARY_AUTHORITY_DOCUMENT>`, and `<EXECUTION_GUIDE_DIRECTORY>` must remain generic tokens
  in every file under `agents/`, `docs/architecture/`, `docs/governance/`, and `templates/` —
  only the bundled example under `docs/examples/` and `examples/` should contain concrete,
  filled-in values.

## Proposing a change

1. Open an issue describing the gap or improvement before large changes — especially anything
   that touches the authority model or the conflict-resolution order, since those are the
   invariants every skill depends on.
2. Keep pull requests scoped to one workflow/skill/doc at a time where possible.
3. If you change a skill's expected inputs or outputs, update every governance file and test
   scenario that references it in the same PR — cross-reference drift is exactly the class of
   bug this framework exists to prevent, so it shouldn't ship its own.
4. Run `node scripts/validate-documentation.js .` before submitting — it checks for the same
   class of drift (broken references, duplicate registrations, orphaned files) that the
   framework asks adopters to check in their own projects.

## Code of conduct

Be direct, be specific, and assume good faith. Disagreements about architecture are welcome in
issues; keep them technical.

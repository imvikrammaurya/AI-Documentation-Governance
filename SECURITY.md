# Security Policy

This repository is a **documentation-governance framework**: rules, skills, templates, and
scripts that help an AI agent (and human contributors) keep a documentation knowledge base
consistent. It contains no production application code and no runtime credentials. Even so,
because adopters copy this framework directly into their own project repositories — often
alongside real product documentation — the following rules matter.

## Rules for this repository

1. **Never commit API keys, tokens, passwords, or connection strings** — not even as examples.
   Use `<PLACEHOLDER>` tokens in every example, including error messages and sample output.
2. **Never commit production credentials** of any kind (cloud provider keys, database URLs,
   signing certificates, `.env` files). `.gitignore` in this repo blocks the common cases, but
   the automation scripts (`scripts/`) never read or require credentials — if a fork of them
   ever does, that is a design regression, not an intended feature.
3. **Never commit private client, customer, or user data.** The example project (`docs/examples/library-lending/`)
   is entirely fictional. If you adapt this framework for a real project, do not paste real
   customer records, support tickets, or personal data into governance files, decision logs,
   or the file inventory — those files are meant for architecture and process knowledge, not
   personal data.
4. **Never publish proprietary documentation accidentally.** If you are extracting this
   framework's *pattern* out of a private/internal documentation workspace (as this repository
   itself was), review every file before publishing for:
   - internal product names, pricing, or business rules
   - internal file paths or hostnames
   - internal ticket/issue numbers or team names
   - anything marked confidential, internal-only, or NDA-covered in the source workspace
5. **Review AI-generated documentation before publishing.** An agent following the skills in
   `agents/skills/` will write to governance files (index, inventory, authority map, decision
   log) on your behalf. Treat every agent-authored write the same way you'd treat an
   AI-authored pull request: read it before it goes into a shared or public branch.
6. **The automation scripts (`scripts/`) are local, offline, and read/write only within the
   documentation tree you point them at.** They perform no network calls and require no
   credentials. If you extend them, keep that property — a documentation-governance tool
   should never need outbound network access to do its job.

## Reporting a vulnerability or a data-exposure concern

If you find a real security issue in this framework itself (e.g., a script that could be
tricked into writing outside its intended directory, or a path-traversal issue in the
document-discovery logic), please open a private security advisory on the repository (GitHub's
"Report a vulnerability" flow under the Security tab) rather than a public issue, so it can be
fixed before the details are public.

For accidental data exposure in a *fork or derivative* of this framework (e.g., someone copied
real proprietary content into a public repo based on this template), that is an issue for the
fork's owner to resolve directly — this repository's maintainers cannot remove content from
repositories they do not control.

#!/usr/bin/env node
'use strict';

/**
 * register-documentation.js
 *
 * Real, working, idempotent registration (see docs/architecture/WORKFLOW_MODEL.md, Workflow 1
 * steps "Detect" and "Register"/"Log"). Given a file, checks whether it is already mentioned in
 * docs/governance/FILE_INVENTORY.md; if not, appends a new row to that file's
 * "Auto-registered" section (below the `<!-- AUTO-REGISTER: APPEND BELOW THIS LINE -->` marker)
 * and appends a dated entry to the registration log. Running it twice against the same,
 * unchanged file is a guaranteed no-op the second time — see tests/TEST_IDEMPOTENCY.md.
 *
 * This script never edits an existing row and never rewrites the file wholesale — every write
 * is an append.
 *
 * Usage:
 *   node scripts/register-documentation.js <file-path> <file-inventory.md> <auto-registration-log.md> [--domain="X"] [--purpose="Y"]
 *
 * Example (run from the repository root):
 *   node scripts/register-documentation.js docs/examples/library-lending/HOLD_QUEUE_NOTES.md \
 *     docs/governance/FILE_INVENTORY.md docs/governance/AUTO_REGISTRATION_LOG.md \
 *     --domain="Execution Guides" --purpose="Notes on hold-queue ordering"
 *
 * Exit codes:
 *   0 — registered (or already registered — idempotent no-op)
 *   2 — bad arguments or missing input files
 */

const fs = require('fs');
const path = require('path');

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (const arg of argv) {
    if (arg.startsWith('--')) {
      const eq = arg.indexOf('=');
      const key = eq === -1 ? arg.slice(2) : arg.slice(2, eq);
      const value = eq === -1 ? '' : arg.slice(eq + 1).replace(/^"|"$/g, '');
      flags[key] = value;
    } else {
      positional.push(arg);
    }
  }
  return { positional, flags };
}

// See discover-documents.js for why double-backtick spans are tokenized separately — the same
// desynchronization risk applies here.
function isAlreadyRegistered(inventoryText, relPath) {
  const backtickRe = /``([^`]*)``|`([^`]*)`/g;
  let m;
  while ((m = backtickRe.exec(inventoryText)) !== null) {
    if (m[1] !== undefined) continue;
    if (m[2].trim() === relPath) return true;
  }
  return false;
}

const MARKER = '<!-- AUTO-REGISTER: APPEND BELOW THIS LINE -->';
const PLACEHOLDER =
  '*(none yet — this section is populated the first time a new document is registered)*';

function appendRegistrationRow(inventoryText, row) {
  const markerIndex = inventoryText.indexOf(MARKER);
  if (markerIndex === -1) {
    return { ok: false, error: `Could not find the marker "${MARKER}" in the inventory file.` };
  }

  if (inventoryText.includes(PLACEHOLDER)) {
    const tableHeader = '| Path | Domain | Purpose | Status |\n|---|---|---|---|';
    return { ok: true, text: inventoryText.replace(PLACEHOLDER, `${tableHeader}\n${row}`) };
  }

  // A table already exists after the marker — append a new row after its last row.
  const before = inventoryText.slice(0, markerIndex);
  const after = inventoryText.slice(markerIndex);
  const lines = after.split('\n');

  let lastTableRowIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('|')) {
      lastTableRowIndex = i;
    } else if (lastTableRowIndex !== -1) {
      break;
    }
  }

  if (lastTableRowIndex === -1) {
    return { ok: false, error: 'Marker found but no existing table to append to.' };
  }

  lines.splice(lastTableRowIndex + 1, 0, row);
  return { ok: true, text: before + lines.join('\n') };
}

function main() {
  const { positional, flags } = parseArgs(process.argv.slice(2));
  const [filePath, inventoryPath, logPath] = positional;

  if (!filePath || !inventoryPath || !logPath) {
    console.error(
      'Usage: node register-documentation.js <file-path> <file-inventory.md> <auto-registration-log.md> [--domain="X"] [--purpose="Y"]'
    );
    process.exit(2);
  }

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(2);
  }
  if (!fs.existsSync(inventoryPath)) {
    console.error(`Inventory file not found: ${inventoryPath}`);
    process.exit(2);
  }
  if (!fs.existsSync(logPath)) {
    console.error(`Log file not found: ${logPath}`);
    process.exit(2);
  }

  const relPath = toPosix(filePath);
  const inventoryText = fs.readFileSync(inventoryPath, 'utf8');

  if (isAlreadyRegistered(inventoryText, relPath)) {
    console.log(`Already registered: ${relPath}`);
    console.log('No changes made (idempotent no-op).');
    process.exit(0);
  }

  const domain = flags.domain || 'NEEDS_VERIFICATION';
  const purpose = flags.purpose || 'NEEDS_VERIFICATION — purpose not provided at registration time';
  const row = `| \`${relPath}\` | ${domain} | ${purpose} | Current — auto-registered |`;

  const result = appendRegistrationRow(inventoryText, row);
  if (!result.ok) {
    console.error(`Registration failed: ${result.error}`);
    process.exit(2);
  }

  fs.writeFileSync(inventoryPath, result.text, 'utf8');

  const now = new Date().toISOString();
  const logEntry =
    `\n## Run — Registered \`${relPath}\`\n\n` +
    `**Date:** ${now}\n` +
    `**Domain:** ${domain}\n` +
    `**Purpose:** ${purpose}\n` +
    `**Action:** Appended one row to \`${inventoryPath}\`; no existing row edited or removed.\n`;
  fs.appendFileSync(logPath, logEntry, 'utf8');

  console.log(`Registered: ${relPath}`);
  console.log(`Domain: ${domain}`);
  console.log(`Purpose: ${purpose}`);
  console.log(`Updated: ${inventoryPath}`);
  console.log(`Logged: ${logPath}`);
  process.exit(0);
}

main();

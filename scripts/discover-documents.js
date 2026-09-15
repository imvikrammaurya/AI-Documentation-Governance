#!/usr/bin/env node
'use strict';

/**
 * discover-documents.js
 *
 * Real, working document-discovery check (see docs/architecture/WORKFLOW_MODEL.md, Workflow 1
 * step "1. Detection"). Scans a directory for files and diffs the result against every
 * backtick-quoted path mentioned in docs/governance/FILE_INVENTORY.md (both the "excluded" and
 * "registered" tables count as accounted-for). Reports any file found on disk that isn't
 * mentioned anywhere in the inventory.
 *
 * This performs no writes. It never silently registers anything — see
 * agents/skills/register-documentation/SKILL.md's rule against silent registration.
 *
 * Usage:
 *   node scripts/discover-documents.js <scan-root> <file-inventory.md>
 *
 * Example (run from the repository root):
 *   node scripts/discover-documents.js docs docs/governance/FILE_INVENTORY.md
 *
 * Exit codes:
 *   0 — no unregistered files found
 *   1 — one or more unregistered files found
 *   2 — bad arguments or missing input files
 */

const fs = require('fs');
const path = require('path');

const SKIP_DIRS = new Set(['.git', 'node_modules', '.vscode', '.idea']);

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

function toPosix(p) {
  return p.split(path.sep).join('/');
}

// Any backtick-quoted, path-shaped token counts as "accounted for" — this deliberately also
// catches non-path backticked tokens (e.g. `NEEDS_VERIFICATION`), which is harmless: it can
// only ever add a spurious entry to the registered set, never cause a real unregistered file
// to be missed.
//
// Tokenizes double-backtick spans (``...``, the Markdown escape used to show a literal
// backtick-quoted example inside prose) as a single unit BEFORE single-backtick spans, so a
// double-backtick example elsewhere in the document can never desynchronize the parity of
// single-backtick path extraction that follows it.
function extractAccountedForPaths(text) {
  const backtickRe = /``([^`]*)``|`([^`]*)`/g;
  const pathLike = /^[\w.\-/]+$/;
  const set = new Set();
  let m;
  while ((m = backtickRe.exec(text)) !== null) {
    if (m[1] !== undefined) continue; // double-backtick span — not a path token, skip
    const candidate = m[2].trim();
    if (pathLike.test(candidate)) set.add(candidate);
  }
  return set;
}

function main() {
  const [, , scanRootArg, inventoryPathArg] = process.argv;
  if (!scanRootArg || !inventoryPathArg) {
    console.error('Usage: node discover-documents.js <scan-root> <file-inventory.md>');
    process.exit(2);
  }

  if (!fs.existsSync(scanRootArg)) {
    console.error(`Scan root not found: ${scanRootArg}`);
    process.exit(2);
  }
  if (!fs.existsSync(inventoryPathArg)) {
    console.error(`Inventory file not found: ${inventoryPathArg}`);
    process.exit(2);
  }

  const scanRootStat = fs.statSync(scanRootArg);
  const allFiles = (scanRootStat.isDirectory() ? walk(scanRootArg, []) : [scanRootArg]).map(toPosix);

  const inventoryText = fs.readFileSync(inventoryPathArg, 'utf8');
  const accountedFor = extractAccountedForPaths(inventoryText);

  const unregistered = allFiles.filter((f) => !accountedFor.has(f));

  console.log(`Scanned: ${scanRootArg}`);
  console.log(`Files found on disk: ${allFiles.length}`);
  console.log(`Distinct path-like tokens referenced in ${inventoryPathArg}: ${accountedFor.size}`);
  console.log('');

  if (unregistered.length === 0) {
    console.log('Result: no unregistered files found.');
    process.exit(0);
  }

  console.log(`Result: ${unregistered.length} unregistered file(s):`);
  for (const f of unregistered) {
    console.log(`  - ${f}`);
  }
  process.exit(1);
}

main();

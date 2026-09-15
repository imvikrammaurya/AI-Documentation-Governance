#!/usr/bin/env node
'use strict';

/**
 * validate-documentation.js
 *
 * Real, working structural validation (see agents/skills/validate-documentation/SKILL.md).
 * Runs four mechanical checks against a documentation-governance repository built on this
 * framework:
 *
 *   1. Required governance files exist.
 *   2. Every file under docs/ is accounted for in FILE_INVENTORY.md (no unregistered files).
 *   3. No path is registered more than once in FILE_INVENTORY.md.
 *   4. Every relative Markdown link in every .md file resolves to a real file.
 *
 * This script performs no writes — report only, per "Do Not Automatically Fix" in the
 * validate-documentation and audit-documentation skills.
 *
 * Usage:
 *   node scripts/validate-documentation.js <repo-root>
 *
 * Example (run from the repository root):
 *   node scripts/validate-documentation.js .
 *
 * Exit codes:
 *   0 — all checks passed
 *   1 — one or more checks failed
 *   2 — bad arguments or missing input
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

// Double-backtick spans (``...``, the Markdown escape for showing a literal backtick-quoted
// example inside prose) are tokenized as a single unit before single-backtick spans, so one
// can never desynchronize the parity of single-backtick path extraction that follows it.
function extractBacktickPaths(text) {
  const backtickRe = /``([^`]*)``|`([^`]*)`/g;
  const pathLike = /^[\w.\-/]+$/;
  const found = [];
  let m;
  while ((m = backtickRe.exec(text)) !== null) {
    if (m[1] !== undefined) continue;
    const c = m[2].trim();
    if (pathLike.test(c)) found.push(c);
  }
  return found;
}

function checkRequiredGovernanceFiles(root, results) {
  const required = [
    'docs/governance/DOCUMENTATION_INDEX.md',
    'docs/governance/DOCUMENT_AUTHORITY.md',
    'docs/governance/FILE_INVENTORY.md',
    'docs/governance/IMPLEMENTATION_STATUS.md',
    'docs/governance/KNOWLEDGE_BASE_MAP.md',
  ];
  const missing = required.filter((rel) => !fs.existsSync(path.join(root, rel)));
  results.push({
    name: 'Required governance files present',
    pass: missing.length === 0,
    detail:
      missing.length === 0
        ? `All ${required.length} required governance files found.`
        : `Missing: ${missing.join(', ')}`,
  });
}

function checkNoUnregisteredFiles(root, results) {
  const inventoryPath = path.join(root, 'docs/governance/FILE_INVENTORY.md');
  if (!fs.existsSync(inventoryPath)) {
    results.push({ name: 'No unregistered files under docs/', pass: false, detail: 'FILE_INVENTORY.md not found.' });
    return;
  }
  const inventoryText = fs.readFileSync(inventoryPath, 'utf8');
  const registered = new Set(extractBacktickPaths(inventoryText));
  const allFiles = walk(path.join(root, 'docs'), []).map((f) => toPosix(path.relative(root, f)));
  const unregistered = allFiles.filter((f) => !registered.has(f));
  results.push({
    name: 'No unregistered files under docs/',
    pass: unregistered.length === 0,
    detail:
      unregistered.length === 0
        ? `All ${allFiles.length} files under docs/ are accounted for in FILE_INVENTORY.md.`
        : `Unregistered: ${unregistered.join(', ')}`,
  });
}

// Deliberately narrower than extractBacktickPaths: a path mentioned twice in ordinary prose
// (e.g. a cross-reference sentence) is normal and not a defect — only a path that starts a
// table row (the first cell) counts as an actual registration, so only that is checked for
// duplication.
function extractTableRowPaths(text) {
  const rowRe = /^\s*\|\s*`([^`]+)`/gm;
  const found = [];
  let m;
  while ((m = rowRe.exec(text)) !== null) {
    found.push(m[1].trim());
  }
  return found;
}

function checkNoDuplicateRegistrations(root, results) {
  const inventoryPath = path.join(root, 'docs/governance/FILE_INVENTORY.md');
  if (!fs.existsSync(inventoryPath)) {
    results.push({ name: 'No duplicate registrations', pass: false, detail: 'FILE_INVENTORY.md not found.' });
    return;
  }
  const inventoryText = fs.readFileSync(inventoryPath, 'utf8');
  const paths = extractTableRowPaths(inventoryText);
  const counts = new Map();
  for (const p of paths) counts.set(p, (counts.get(p) || 0) + 1);
  const dupes = [...counts.entries()].filter(([, n]) => n > 1);
  results.push({
    name: 'No duplicate registrations in FILE_INVENTORY.md',
    pass: dupes.length === 0,
    detail:
      dupes.length === 0
        ? `No path appears as more than one table row (${paths.length} row(s) checked).`
        : `Duplicated: ${dupes.map(([p, n]) => `${p} (${n}x)`).join(', ')}`,
  });
}

function checkBrokenRelativeLinks(root, results) {
  const mdFiles = walk(root, []).filter((f) => f.endsWith('.md'));
  const linkRe = /\]\(([^)]+)\)/g;
  const broken = [];
  let linkCount = 0;
  for (const file of mdFiles) {
    const text = fs.readFileSync(file, 'utf8');
    let m;
    while ((m = linkRe.exec(text)) !== null) {
      const target = m[1].split('#')[0].trim();
      if (!target || /^[a-z]+:\/\//i.test(target) || target.startsWith('mailto:')) continue;
      linkCount++;
      const resolved = path.resolve(path.dirname(file), target);
      if (!fs.existsSync(resolved)) {
        broken.push(`${toPosix(path.relative(root, file))} -> ${target}`);
      }
    }
  }
  results.push({
    name: 'No broken relative Markdown links',
    pass: broken.length === 0,
    detail: broken.length === 0 ? `All ${linkCount} relative link(s) resolve.` : `Broken: ${broken.join('; ')}`,
  });
}

function main() {
  const root = process.argv[2] || '.';
  if (!fs.existsSync(root)) {
    console.error(`Root not found: ${root}`);
    process.exit(2);
  }

  const results = [];
  checkRequiredGovernanceFiles(root, results);
  checkNoUnregisteredFiles(root, results);
  checkNoDuplicateRegistrations(root, results);
  checkBrokenRelativeLinks(root, results);

  console.log('Documentation validation report');
  console.log('='.repeat(32));
  let allPass = true;
  for (const r of results) {
    console.log(`\n[${r.pass ? 'PASS' : 'FAIL'}] ${r.name}`);
    console.log(`  ${r.detail}`);
    if (!r.pass) allPass = false;
  }
  console.log('\n' + '='.repeat(32));
  console.log(allPass ? 'All checks passed.' : 'One or more checks FAILED.');
  process.exit(allPass ? 0 : 1);
}

main();

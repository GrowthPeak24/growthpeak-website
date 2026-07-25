#!/usr/bin/env node
// Stop hook: nags Claude to update CLAUDE.md when source files have changed
// more recently than CLAUDE.md itself, so the doc doesn't silently go stale.
//
// This cannot verify "tested" on its own, it only detects file changes.
// The reason text asks Claude to confirm the change works before touching docs.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const CLAUDE_MD = path.join(ROOT, 'CLAUDE.md');
const STATE_FILE = path.join(__dirname, '.claude-md-state.json');

const WATCH_PATHS = [
  'src',
  'tailwind.config.mjs',
  'astro.config.mjs',
  'package.json',
  'vercel.json',
];

const IGNORE_DIRS = new Set(['node_modules', 'dist', '.astro', '.git', '.vercel']);

function readStdin() {
  try {
    return JSON.parse(fs.readFileSync(0, 'utf8'));
  } catch {
    return {};
  }
}

function maxMtime(targetPath) {
  let stat;
  try {
    stat = fs.statSync(targetPath);
  } catch {
    return 0;
  }
  if (!stat.isDirectory()) return stat.mtimeMs;
  if (IGNORE_DIRS.has(path.basename(targetPath))) return 0;

  let max = 0;
  for (const entry of fs.readdirSync(targetPath)) {
    max = Math.max(max, maxMtime(path.join(targetPath, entry)));
  }
  return max;
}

function readState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch {
    return { lastNotifiedMtime: 0 };
  }
}

function writeState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function main() {
  const input = readStdin();

  // Never block twice in a row for the same stop event chain. This is the
  // hard guarantee against infinite loops, independent of the state file below.
  if (input.stop_hook_active) {
    process.exit(0);
  }

  let claudeMdMtime;
  try {
    claudeMdMtime = fs.statSync(CLAUDE_MD).mtimeMs;
  } catch {
    process.exit(0); // No CLAUDE.md to keep in sync.
  }

  let currentMaxSrcMtime = 0;
  for (const rel of WATCH_PATHS) {
    currentMaxSrcMtime = Math.max(currentMaxSrcMtime, maxMtime(path.join(ROOT, rel)));
  }

  const state = readState();
  const isStale = currentMaxSrcMtime > claudeMdMtime;
  const alreadyNotified = currentMaxSrcMtime <= state.lastNotifiedMtime;

  if (isStale && !alreadyNotified) {
    writeState({ lastNotifiedMtime: currentMaxSrcMtime });
    console.log(JSON.stringify({
      decision: 'block',
      reason:
        'Source files (src/, tailwind.config.mjs, astro.config.mjs, package.json, or vercel.json) changed since CLAUDE.md was last updated. Before ending this turn: confirm the change is implemented and verified, then update CLAUDE.md if it now describes something inaccurate. If CLAUDE.md already covers this change correctly, no edit is needed, just finish your turn.',
    }));
  }

  process.exit(0);
}

main();

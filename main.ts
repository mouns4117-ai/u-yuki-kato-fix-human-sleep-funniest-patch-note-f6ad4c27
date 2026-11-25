// Fix Human Sleep: Funniest Patch Note — entry program.
// Writes one line of patch notes announcing that human sleep is fixed
// to /output/entry.txt. Gate: UTF-8 text, 1-160 chars, single line.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Fixed: humans can now fall asleep without first replaying every embarrassing thing they have said since 2014.";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function failFast(): void {
  // Gate: 1-160 chars, single line, non-blank UTF-8 text.
  if (ENTRY.length < 1 || ENTRY.length > 160) {
    throw new Error(`entry is ${ENTRY.length} chars, gate is 1-160`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry is blank");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  failFast();
  // Empty /output's contents only — never remove the mounted directory itself.
  mkdirSync(OUT_DIR, { recursive: true });
  for (const name of readdirSync(OUT_DIR)) {
    rmSync(join(OUT_DIR, name), { recursive: true, force: true });
  }
  writeFileSync(OUT_FILE, ENTRY, "utf8");
  // Post-write read-back verification: the shipped file must match byte for byte.
  const back = readFileSync(OUT_FILE, "utf8");
  if (back !== ENTRY) {
    throw new Error("read-back mismatch: /output/entry.txt differs from ENTRY");
  }
}

main();

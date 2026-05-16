#!/usr/bin/env node
// Convert large public/*.{png,jpg,jpeg} to WebP siblings.
// Idempotent: only writes when source is newer than the existing .webp.
// Threshold: only converts files >= 100 KB to keep small icons untouched.

import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const MIN_BYTES = 100 * 1024;
const QUALITY = 82;

async function main() {
  const entries = await fs.readdir(PUBLIC_DIR);
  let converted = 0;
  let skipped = 0;

  for (const name of entries) {
    if (!/\.(png|jpe?g)$/i.test(name)) continue;
    const src = path.join(PUBLIC_DIR, name);
    const stat = await fs.stat(src);
    if (!stat.isFile() || stat.size < MIN_BYTES) {
      skipped++;
      continue;
    }
    const out = src.replace(/\.(png|jpe?g)$/i, ".webp");
    try {
      const outStat = await fs.stat(out);
      if (outStat.mtimeMs >= stat.mtimeMs) {
        skipped++;
        continue;
      }
    } catch {
      // out doesn't exist yet
    }
    await sharp(src).webp({ quality: QUALITY }).toFile(out);
    converted++;
    console.log(`webp ${name} -> ${path.basename(out)}`);
  }

  console.log(`[optimize-images] converted=${converted} skipped=${skipped}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

#!/usr/bin/env node
// Makes @cutforge/editor 1.1.1 usable from this Next 16 / React 19 app.
// Two SDK packaging bugs are patched in a vendored copy (next.config aliases the
// package to it):
//  1. Workers are created with new URL("/assets/x.js", import.meta.url). Turbopack
//     tries to resolve that absolute path at build time and fails. Resolve against
//     the page instead, and copy the workers to public/assets/ where they're expected.
//  2. react/jsx-runtime isn't externalized, so the bundle carries React 18's runtime,
//     which reads React internals that no longer exist in React 19 and crashes on
//     mount. Swap it for the host's runtime.
// ponytail: drop this script once the SDK externalizes react/jsx-runtime and emits
// relative worker URLs ("./assets/x.js").

import { promises as fs } from "node:fs";
import path from "node:path";

const SRC = path.resolve("node_modules/@cutforge/editor/dist-lib");
const OUT = path.resolve("vendor/cutforge");
const PUBLIC_ASSETS = path.resolve("public/assets");

function patch(code, re, replacement, what) {
  const hits = re.global ? (code.match(re)?.length ?? 0) : Number(re.test(code));
  if (hits === 0) throw new Error(`vendor-cutforge: ${what} not found, the SDK layout changed`);
  console.log(`[vendor-cutforge] ${what}: ${hits} patched`);
  return code.replace(re, replacement);
}

await fs.mkdir(OUT, { recursive: true });
await fs.mkdir(PUBLIC_ASSETS, { recursive: true });

for (const f of await fs.readdir(path.join(SRC, "assets"))) {
  await fs.copyFile(path.join(SRC, "assets", f), path.join(PUBLIC_ASSETS, f));
}

for (const f of await fs.readdir(SRC)) {
  if (!f.endsWith(".js")) continue;
  let code = await fs.readFile(path.join(SRC, f), "utf8");
  if (f === "cutforge.js") {
    code = patch(code, /("\/assets\/[^"]+\.js",\s*)import\.meta\.url/g, "$1self.location.href", "worker URLs");
    // Only the selector right after the bundled runtime: the same pattern also picks
    // use-sync-external-store's shim further down, which must stay as is.
    const at = code.indexOf("react-jsx-runtime.development.js");
    if (at < 0) throw new Error("vendor-cutforge: bundled jsx-runtime not found, the SDK layout changed");
    code =
      code.slice(0, at) +
      patch(
        code.slice(at),
        /process\.env\.NODE_ENV === "production" \? (\w+)\.exports = \w+\(\) : \1\.exports = \w+\(\);/,
        "$1.exports = __hostJsxRuntime;",
        "bundled jsx-runtime",
      );
    code = `import * as __hostJsxRuntime from "react/jsx-runtime";\n${code}`;
  }
  await fs.writeFile(path.join(OUT, f), code);
}

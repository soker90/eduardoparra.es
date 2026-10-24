import { readdir, access } from "node:fs/promises";
import path from "node:path";

const sourceExtensions = new Set([".astro", ".ts", ".tsx", ".js", ".jsx", ".md", ".mdx", ".css", ".html"]);
const imageReference = /(?:^|["'(\s])\/(images\/[A-Za-z0-9._/-]+)/g;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  }));
  return files.flat();
}

const sourceFiles = (await walk("src")).filter((file) => sourceExtensions.has(path.extname(file)));
const missing = new Set();

for (const file of sourceFiles) {
  const content = await (await import("node:fs/promises")).readFile(file, "utf8");
  for (const match of content.matchAll(imageReference)) {
    const assetPath = path.join("public", match[1]);
    try {
      await access(assetPath);
    } catch {
      missing.add(`${file} -> /${match[1]}`);
    }
  }
}

if (missing.size > 0) {
  console.error("Missing local image assets:");
  for (const item of [...missing].toSorted()) console.error(`  - ${item}`);
  process.exitCode = 1;
} else {
  console.log(`Checked local image references in ${sourceFiles.length} source files; all referenced assets exist.`);
}

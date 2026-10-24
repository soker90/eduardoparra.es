import { readdir, readFile, access } from "node:fs/promises";
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
const referenced = new Set();

for (const file of sourceFiles) {
  const content = await readFile(file, "utf8");
  for (const match of content.matchAll(imageReference)) {
    referenced.add(`/${match[1]}`);
    const assetPath = path.join("public", match[1]);
    try {
      await access(assetPath);
    } catch {
      missing.add(`${file} -> /${match[1]}`);
    }
  }
}

const imageFiles = (await walk("public/images")).filter((file) =>
  /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(file),
);
const unreferenced = imageFiles
  .map((file) => `/${path.relative("public", file).split(path.sep).join("/")}`)
  .filter((file) => !referenced.has(file))
  .toSorted();

if (missing.size > 0) {
  console.error("Missing local image assets:");
  for (const item of [...missing].toSorted()) console.error(`  - ${item}`);
  process.exitCode = 1;
} else {
  console.log(`Checked local image references in ${sourceFiles.length} source files; all referenced assets exist.`);
}

if (unreferenced.length > 0) {
  console.warn("\\nImage files not referenced by literal paths in src (review manually; do not delete automatically):");
  for (const item of unreferenced) console.warn(`  - ${item}`);
}

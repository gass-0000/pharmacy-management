import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import process from "node:process";

const root = process.cwd();
const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"]);
const errors = [];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const files = walk(root).filter((path) => !path.includes(`${join(root, ".git")}`));
const htmlFiles = files.filter((path) => extname(path).toLowerCase() === ".html");

for (const path of htmlFiles) {
  const html = readFileSync(path, "utf8");
  if (html.includes("data:image/")) {
    errors.push(`${relative(root, path)} contains an embedded Base64 image`);
  }
}

const indexPath = join(root, "index.html");
const indexHtml = readFileSync(indexPath, "utf8");
const referencedAssets = [
  ...new Set(
    [...indexHtml.matchAll(/(?:\.\/)?(assets\/images\/[^"'()]+?\.(?:png|jpe?g|gif|webp|svg))/gi)]
      .map((match) => match[1]),
  ),
];

for (const assetPath of referencedAssets) {
  if (!existsSync(join(root, assetPath))) {
    errors.push(`index.html references missing image: ${assetPath}`);
  }
}

for (const entry of readdirSync(root, { withFileTypes: true })) {
  if (entry.isFile() && imageExtensions.has(extname(entry.name).toLowerCase())) {
    errors.push(`image must not be stored at repository root: ${entry.name}`);
  }
}

const imageRoot = join(root, "assets", "images");
const hashes = new Map();
for (const path of walk(imageRoot).filter(
  (file) => statSync(file).isFile() && imageExtensions.has(extname(file).toLowerCase()),
)) {
  const hash = createHash("sha256").update(readFileSync(path)).digest("hex");
  const existing = hashes.get(hash);
  if (existing) {
    errors.push(
      `duplicate image content: ${relative(root, existing)} and ${relative(root, path)}`,
    );
  } else {
    hashes.set(hash, path);
  }
}

if (errors.length) {
  console.error("Asset validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Asset validation passed: ${referencedAssets.length} index references, ${hashes.size} unique image files, no Base64 images.`,
);

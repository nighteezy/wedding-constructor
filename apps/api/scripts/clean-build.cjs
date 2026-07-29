const fs = require("fs");
const path = require("path");

const apiDir = path.resolve(__dirname, "..");
const artifacts = [
  path.join(apiDir, "dist"),
  path.join(apiDir, "tsconfig.tsbuildinfo"),
  path.join(apiDir, "tsconfig.build.tsbuildinfo"),
];

for (const artifact of artifacts) {
  fs.rmSync(artifact, { force: true, recursive: true });
}

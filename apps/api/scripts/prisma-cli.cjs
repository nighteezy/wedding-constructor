const path = require("path");
const { spawnSync } = require("child_process");
const { config } = require("dotenv");

const apiDir = path.resolve(__dirname, "..");
const rootDir = path.resolve(apiDir, "../..");
const prismaBin = path.join(
  apiDir,
  "node_modules",
  "prisma",
  process.platform === "win32" ? "build/index.js" : "build/index.js",
);

config({ path: path.join(rootDir, ".env") });
config({ path: path.join(rootDir, ".env.local"), override: true });

const args = process.argv.slice(2);
const result = spawnSync(process.execPath, [prismaBin, ...args], {
  stdio: "inherit",
  env: process.env,
  cwd: apiDir,
});

process.exit(result.status ?? 1);

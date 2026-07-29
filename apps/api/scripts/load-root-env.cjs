const path = require("path");
const { config } = require("dotenv");

const rootDir = path.resolve(__dirname, "../../..");

config({ path: path.join(rootDir, ".env") });
config({ path: path.join(rootDir, ".env.local"), override: true });

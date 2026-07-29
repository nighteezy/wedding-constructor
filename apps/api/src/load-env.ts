import path from "path";
import { config } from "dotenv";

const rootDir = path.resolve(__dirname, "../../..");

config({ path: path.join(rootDir, ".env") });
config({ path: path.join(rootDir, ".env.local"), override: true });

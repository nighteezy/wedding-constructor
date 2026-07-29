const path = require("path");
const dotenv = require("dotenv");

const ROOT_DIR = path.resolve(__dirname, "../../..");
const UI_SRC = path.resolve(ROOT_DIR, "packages/ui/src");
const ENTITY_WEDDING_SRC = path.resolve(
  ROOT_DIR,
  "packages/entities/wedding/src",
);
const API_CLIENT_SRC = path.resolve(ROOT_DIR, "packages/api/src");

function getTranspileInclude(appDir) {
  return [
    path.resolve(appDir, "src"),
    UI_SRC,
    ENTITY_WEDDING_SRC,
    API_CLIENT_SRC,
  ];
}
const TAILWIND_CONFIG = path.resolve(__dirname, "../tailwind.config.js");

function loadEnv() {
  dotenv.config({ path: path.join(ROOT_DIR, ".env") });
  dotenv.config({ path: path.join(ROOT_DIR, ".env.local"), override: true });
}

function getEnv(key, fallback) {
  const value = process.env[key];
  if (value === undefined || value === "") {
    return fallback;
  }
  return value;
}

function getPort(key, fallback) {
  return Number(getEnv(key, String(fallback)));
}

function getPublicPath(key, portFallback) {
  const value = getEnv(key, null);
  if (value) {
    return value.endsWith("/") ? value : `${value}/`;
  }
  return `http://localhost:${portFallback}/`;
}

function getRemoteUrl(key, portFallback) {
  return getEnv(key, `http://localhost:${portFallback}/remoteEntry.js`);
}

function getShellRemotes() {
  return {
    invitation: `invitation@${getRemoteUrl("REMOTE_INVITATION_URL", 3001)}`,
  };
}

function getApiUrl() {
  return getEnv("API_URL", "http://localhost:4000");
}

function getWeddingSlug() {
  return getEnv("WEDDING_SLUG", "default");
}

function createPostcssOptions() {
  return {
    postcssOptions: {
      plugins: {
        tailwindcss: { config: TAILWIND_CONFIG },
        autoprefixer: {},
      },
    },
  };
}

module.exports = {
  ROOT_DIR,
  UI_SRC,
  ENTITY_WEDDING_SRC,
  API_CLIENT_SRC,
  getTranspileInclude,
  TAILWIND_CONFIG,
  loadEnv,
  getEnv,
  getPort,
  getPublicPath,
  getRemoteUrl,
  getShellRemotes,
  getApiUrl,
  getWeddingSlug,
  createPostcssOptions,
};

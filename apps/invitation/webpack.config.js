const path = require("path");
const { loadEnv, createRemoteConfig } = require("@wedding/config/webpack");

loadEnv();

module.exports = createRemoteConfig(path.resolve(__dirname), {
  name: "invitation",
  portEnvKey: "INVITATION_PORT",
  portFallback: 3001,
  publicPathEnvKey: "INVITATION_PUBLIC_PATH",
  exposes: {
    "./App": "./src/app/App.tsx",
  },
});

const path = require("path");
const {
  loadEnv,
  getShellRemotes,
  createHostConfig,
} = require("@wedding/config/webpack");

loadEnv();

module.exports = createHostConfig(path.resolve(__dirname), {
  name: "shell",
  portEnvKey: "SHELL_PORT",
  portFallback: 3000,
  publicPathEnvKey: "SHELL_PUBLIC_PATH",
  remotes: getShellRemotes(),
});

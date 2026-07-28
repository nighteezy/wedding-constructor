const env = require("./env");
const { createHostConfig, createRemoteConfig } = require("./createWebpackConfig");

module.exports = {
  ...env,
  createHostConfig,
  createRemoteConfig,
};

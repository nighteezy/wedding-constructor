const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");
const {
  getTranspileInclude,
  getPort,
  getPublicPath,
  getApiUrl,
  getWeddingSlug,
  createPostcssOptions,
} = require("./env");

const SHARED_DEPENDENCIES = {
  react: { singleton: true, requiredVersion: "^19.0.0" },
  "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
  "react-router-dom": { singleton: true },
  "@tanstack/react-query": { singleton: true, requiredVersion: "^5.0.0" },
};

function createBaseConfig(appDir, { portEnvKey, portFallback, publicPathEnvKey }) {
  const port = getPort(portEnvKey, portFallback);

  return {
    entry: "./src/index.tsx",
    mode: "development",
    stats: "errors-warnings",
    infrastructureLogging: {
      level: "warn",
    },
    devServer: {
      port,
      historyApiFallback: true,
      hot: true,
      devMiddleware: {
        stats: "minimal",
      },
      client: {
        logging: "warn",
      },
    },
    output: {
      publicPath: getPublicPath(publicPathEnvKey, port),
      clean: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        "@": path.resolve(appDir, "src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: "ts-loader",
            options: { transpileOnly: true },
          },
          include: getTranspileInclude(appDir),
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: createPostcssOptions(),
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.resolve(appDir, "public/index.html") }),
      new webpack.DefinePlugin({
        "process.env.API_URL": JSON.stringify(getApiUrl()),
        "process.env.WEDDING_SLUG": JSON.stringify(getWeddingSlug()),
      }),
    ],
  };
}

function createHostConfig(appDir, { name, portEnvKey, portFallback, publicPathEnvKey, remotes }) {
  const config = createBaseConfig(appDir, {
    portEnvKey,
    portFallback,
    publicPathEnvKey,
  });

  config.plugins.push(
    new ModuleFederationPlugin({
      name,
      dts: false,
      remotes,
      shared: SHARED_DEPENDENCIES,
    }),
  );

  return config;
}

function createRemoteConfig(
  appDir,
  { name, portEnvKey, portFallback, publicPathEnvKey, exposes },
) {
  const config = createBaseConfig(appDir, {
    portEnvKey,
    portFallback,
    publicPathEnvKey,
  });

  config.devServer.headers = {
    "Access-Control-Allow-Origin": "*",
  };

  config.plugins.push(
    new ModuleFederationPlugin({
      name,
      dts: false,
      filename: "remoteEntry.js",
      exposes,
      shared: SHARED_DEPENDENCIES,
    }),
  );

  return config;
}

module.exports = {
  createHostConfig,
  createRemoteConfig,
};

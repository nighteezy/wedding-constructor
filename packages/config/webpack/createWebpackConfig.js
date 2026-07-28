const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");
const {
  UI_SRC,
  getPort,
  getPublicPath,
  createPostcssOptions,
} = require("./env");

const SHARED_DEPENDENCIES = {
  react: { singleton: true, requiredVersion: "^19.0.0" },
  "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
  "react-router-dom": { singleton: true },
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
          include: [path.resolve(appDir, "src"), UI_SRC],
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

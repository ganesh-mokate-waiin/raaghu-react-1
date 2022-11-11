const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const devdeps = require("../package.json").devDependencies;
const deps = require("../package.json").dependencies;

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  devServer: {
    port: 8001,
    open: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {

        test: /\.(scss|css)$/,

        use: [ 'style-loader' , 'css-loader' , 'sass-loader' ],

        exclude: '/node_modules/',

    },
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "rds_components",
      filename: "remoteEntry.js",
      exposes: {
        // expose each component
        "./RdscompLogin": "./src/login/rds-comp-login",
        "./RdsCompAdminDashboard":"./src/admin-dashboard/rds-comp-admin-dashboard",
        "./RdsCompSideNavigation":"./src/side-navigation/rds-comp-side-navigation",
        "./RdsCompTopNavigation":"./src/top-navigation/rds-comp-top-navigation",
        "./RdsCompForgotPassword":"./src/forgot-password/rds-comp-forgot-password",
        "./RdsCompTenantList":"./src/tenant-list/rds-comp-tenant-list",
        "./RdsCompWebsiteLog":"./src/website-log/rds-comp-website-log",
        "./RdsCompAlertPopup":"./src/alert-popup/rds-comp-alert-popup",
        "./RdsCompOrganizationTree":"./src/organization-tree/rds-comp-organization-tree"
      },

      shared: {
        ...devdeps,
        ...deps,
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

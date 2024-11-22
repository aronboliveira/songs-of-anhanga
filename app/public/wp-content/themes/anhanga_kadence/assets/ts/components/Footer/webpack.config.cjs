const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "./index.js"),
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: [/\.[cm]?tsx?$/, /\.[cm]?jsx?$/],
        use: ["ts-loader"],
        exclude: [/node_modules/, /types/],
      },
      {
        test: /\.[cm]?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".cjs", ".mjs"],
  },
  optimization: {
    minimize: true,
    usedExports: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  output: {
    filename: "[contenthash].footerBundle.js",
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
  },
};

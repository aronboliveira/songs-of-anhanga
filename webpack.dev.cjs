const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  mode: "development",
  entry: "../login-page/dist/login-page/src/pages/controllerLogin.js", //ATIVADO POR SCRIPT GLOBAL
  devtool: "inline-source-map",
  watch: true,
  devServer: {
    static: {
      directory: path.join(__dirname, "./"),
    },
  },
  module: {
    rules: [
      {
        test: [/\.tsx?$/, /\.jsx?$/],
        use: [
          "ts-loader",
          //HABILITAR SOMENTE PARA GERAR CÓDIGO LEGADO
          // "babel-loader"
        ],
        exclude: [/node_modules/, /types/],
      },
      {
        test: /\.svg$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: {
      "@glSrc": path.resolve(__dirname, "../global/src/"),
    },
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
  plugins: [
    // new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
  output: {
    filename: "loginBundle_dev.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist",
  },
};

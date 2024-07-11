const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  mode: "production",
  entry: "../login-page/dist/index.js", //ATIVADO POR SCRIPT GLOBAL
  devtool: "inline-source-map",
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
    new BundleAnalyzerPlugin(),
  ],
  watch: true,
  output: {
    filename: "[contenthash].loginBundle.js",
    path: path.resolve(__dirname, "dist/prod"),
    publicPath: "/dist/prod",
  },
};

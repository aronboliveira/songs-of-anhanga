const defaultConfig = require("@wordpress/scripts/config/webpack.config");
module.exports = {
  ...defaultConfig,
  entry: {
    customizer: "./inc/customizer/react/src/index.js",
    meta: "./inc/meta/react/src/index.js",
    dashboard: "./inc/dashboard/react/src/index.js",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/assets/js/admin",
  },
};

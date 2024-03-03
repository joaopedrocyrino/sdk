const path = require("path");
const common = require("../../webpack.common.js");

module.exports = {
  ...common,
  output: {
    filename: "[name].min.js",
    path: path.resolve(__dirname, "dist"),
  },
};

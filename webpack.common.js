module.exports = {
  mode: "production",
  devtool: "source-map",
  target: "node",
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  entry: {
    cjs: "./dist/cjs/index.js",
    es: "./dist/es/index.js",
  },
};

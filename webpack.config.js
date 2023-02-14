const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack")
const Dotenv = require("dotenv-webpack")
const postcssPresetEnv = require("postcss-preset-env");
const tailwindcss = require("tailwindcss");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.tsx"),
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: 'file-loader',
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  ["postcss-preset-env", tailwindcss("./tailwind.config.js")],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin(),
    new Dotenv({
      systemvars: true
    }),
    new HtmlWebpackPlugin({
      favicon: "./public/favicon.ico",
      template: path.join(__dirname, "public", "index.html"),
    }),
    new webpack.ProvidePlugin({
      "React": "react",
   }),
  ],
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    hot: true,
    historyApiFallback: true,
  },
  mode: "production"
};

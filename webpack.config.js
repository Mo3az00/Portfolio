const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

require("dotenv").config({
  path: "variables.env"
});

module.exports = () => {
  const prod = process.env.NODE_ENV === "production";

  // JS file handler
  const javascript = {
    test: /\.(js)$/,
    use: [
      {
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env"] }
      }
    ]
  };

  // expose jQuery
  const exposejQuery = {
    test: require.resolve("jquery"),
    loader: "expose-loader?$!expose-loader?jQuery"
  };

  // postCSS loader
  const postcss = {
    loader: "postcss-loader",
    options: {
      sourceMap: true,
      plugins() {
        return [autoprefixer()];
      }
    }
  };

  // { browsers: "last 3 versions" }

  // sass/css loader
  const styles = {
    test: /\.(scss)$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {}
      },
      "css-loader?sourceMap",
      postcss,
      "sass-loader?sourceMap"
    ]
  };

  // font awesome
  const fontAwesome = {
    test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "fonts/"
        }
      }
    ]
  };

  // process.noDeprecation = false;

  return {
    mode: prod ? "production" : "development",
    entry: {
      app: "./public/javascript/app.js",
    },
    devtool: "source-map",
    output: {
      path: path.resolve(__dirname, "public", "dist"),
      filename: "[name].bundle.js"
    },
    module: {
      rules: [exposejQuery, javascript, styles, fontAwesome]
    },
    optimization: {
      minimize: false
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "style.css"
      })
    ]
  };
};

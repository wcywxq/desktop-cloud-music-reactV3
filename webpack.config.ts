import * as webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import WebpackBarPlguin from "webpackbar";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";

const { CURRENT_DEVELOPMENT } = process.env;

class MyExampleWebpackPlugin {
  apply(compiler: any) {
    compiler.hooks.emit.tapAsync("MyExampleWebpackPlugin", (compilation: any, callback: any) => {
      console.log("This is an example plugin 1!", +new Date());

      // Manipulate the build using the plugin API provided by webpack
      // compilation.addModule(/* ... */);

      callback();
    });
  }
}

class MyExampleWebpackPlugin2 {
  apply(compiler: any) {
    compiler.hooks.emit.tapAsync("MyExampleWebpackPlugin", (compilation: any, callback: any) => {
      console.log("This is an example plugin 2!", +new Date());

      // Manipulate the build using the plugin API provided by webpack
      // compilation.addModule(/* ... */);

      callback();
    });
  }
}

export default {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name].[hash].js",
    assetModuleFilename: "images/[hash][ext][query]"
  },
  devtool: "source-map",
  optimization: {
    minimize: false,
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      { test: /\.(woff|woff2|eot|ttf|otf)$/, type: "asset/resource" },
      {
        test: /\.(png|gif|jpg|jpeg|webp|svg|psd|bmp|tif)$/,
        type: "asset/resource"
      },
      {
        test: /\.(css|sass|scss|less)$/,
        use: [
          CURRENT_DEVELOPMENT === "prod" ? MiniCssExtractPlugin.loader : "style-loader",
          { loader: "css-loader", options: { sourceMap: true } },
          { loader: "postcss-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } },
          { loader: "less-loader", options: { sourceMap: true } }
        ]
      },
      { test: /\.(ts|tsx)$/, use: ["ts-loader"] },
      {
        test: /\.js$/,
        use: ["thread-loader", "babel-loader"],
        exclude: "/node_modules"
      }
    ]
  },
  resolve: {
    // 自动补全扩展名
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  plugins: [
    // new webpack.ProgressPlugin((percentage, message, ...args) => {}),
    new WebpackBarPlguin({ name: "react + mobx webpack cli" }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
      filename: "index.html",
      title: "react + mobx + todolist"
    }),
    new MiniCssExtractPlugin({ filename: "css/[name].[contenthash].css" }),
    // css 压缩
    new OptimizeCssAssetsPlugin(),
    new MyExampleWebpackPlugin(),
    new MyExampleWebpackPlugin2()
  ].concat(CURRENT_DEVELOPMENT === "prod" ? [new UglifyJsPlugin({ sourceMap: true })] : []),
  performance: {
    hints: false
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    port: 7000,
    open: true,
    hot: true,
    overlay: true
  },
  watchOptions: {
    ignored: /node_modules/
  }
} as webpack.Configuration;

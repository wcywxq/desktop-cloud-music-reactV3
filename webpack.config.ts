import * as webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import WebpackBarPlguin from "webpackbar";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
// css 压缩
// import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

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
  entry: path.resolve(__dirname, "src/renderer/index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: CURRENT_DEVELOPMENT === "prod" ? "static/js/[name].[contenthash:8].js" : "static/js/[name].bundle.js",
    chunkFilename: CURRENT_DEVELOPMENT === "prod" ? "static/js/[name].[contenthash:8].js" : "static/js/[name].chunk.js",
    publicPath: "/",
    assetModuleFilename: "images/[hash][ext][query]"
  },
  devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [
      // css 压缩
      new CssMinimizerPlugin() as unknown,
      // js 压缩
      new UglifyJsPlugin({ sourceMap: CURRENT_DEVELOPMENT === "prod" })
    ],
    splitChunks: {
      chunks: "all",
      name: false
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
          { loader: "css-loader" },
          { loader: "postcss-loader" },
          { loader: "sass-loader" },
          { loader: "less-loader" }
        ]
      },
      { test: /\.(ts|tsx)$/, use: "ts-loader", exclude: "/node_modules" },
      {
        test: /\.(js|jsx)$/,
        use: ["thread-loader", "babel-loader"],
        include: path.resolve(__dirname, "src")
      }
    ]
  },
  resolve: {
    // 自动补全扩展名
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "src/renderer")
    }
  },
  plugins: [
    // webpack bar
    new WebpackBarPlguin({
      name: "编译进度",
      color: "#f40"
    }),
    // new webpack.ProgressPlugin((percentage, message, ...args) => {}),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
      title: "electron music"
    }),
    new MiniCssExtractPlugin({ filename: "static/css/[name].[contenthash].css" }) as unknown
    // css 压缩 optimize-css-assets-plugin 在 webpack 5 不再适用
    // new OptimizeCssAssetsPlugin(),
    // 自定义插件
    // new MyExampleWebpackPlugin(),
    // new MyExampleWebpackPlugin2()
  ].concat(CURRENT_DEVELOPMENT === "prod" ? new BundleAnalyzerPlugin() : []),
  performance: {
    hints: false
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    port: 7000,
    hot: true,
    overlay: true
  },
  watchOptions: {
    ignored: /node_modules/
  }
} as webpack.Configuration;

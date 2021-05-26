module.exports = {
  presets: [["@babel/preset-env", { modules: "commonjs" }], "@babel/preset-react"],
  plugins: [
    "@babel/plugin-transform-runtime",
    [
      "import",
      {
        libraryName: "antd",
        libraryDirectory: "css",
        style: "css"
      }
    ]
  ]
};

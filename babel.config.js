module.exports = {
  compact: false,
  presets: [["@babel/preset-env", { modules: "commonjs" }], "@babel/preset-react"],
  plugins: [
  //   // "@babel/plugin-transform-runtime",
    [
      "import",
      {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true
      }
    ]
  ]
};

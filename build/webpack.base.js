import path from "path"
import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"

const cssModulesOptions = {
  sourceMap: true,
  importLoaders: 1,
  modules: true,
  camelCase: true,
  localIdentName: "[hash:base64:5]"
}

const poscssOption = [
  require("postcss-import"),
  require("postcss-cssnext")({
    warnForDuplicates: false,
    browsers: ["last 1 versions", "iOS >= 9", "Android >= 4.4"]
  }),
  require("postcss-reporter"),
  require("cssnano")({
    zindex: false
  })
]

const baseConfig = {
  entry: {
    app: [path.join(process.cwd(), "src/main.js")],
    register: [path.join(process.cwd(), "src/webcomponents/index.js")]
  },
  output: {
    path: path.join(process.cwd(), "dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loaders: []
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "vue-style-loader",
          { loader: "css-loader", options: cssModulesOptions },
          { loader: "postcss-loader", options: { plugins: () => poscssOption } }
        ]
      },
      { test: /\.(png|svg)$/i, loaders: ["url-loader?name=[name].[ext]"] },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({}),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendor"
    // }),
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), "src/index.html"),
      inject: false,
    }),
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }
    })
  ]
}

export default baseConfig

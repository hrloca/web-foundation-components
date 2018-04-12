import path from "path"
import WebpackDevServer from "webpack-dev-server"
import ora from "ora"
import opn from "opn"
import webpack from "webpack"
import config from "./../build/webpack.dev"

const spinner = ora()

const port = "9000"
const host = "localhost"
const url = `http://${host}:${port}`
const hotModuleName = "webpack/hot/dev-server"
const hotModuleURL = `webpack-dev-server/client?${url}`
const webpackDevServerConfig = {
  contentBase: path.join(process.cwd(), "dist"),
  compress: true,
  hot: true
}

config.entry.app.unshift(hotModuleURL, hotModuleName)
const compiler = webpack(config)
const server = new WebpackDevServer(compiler, webpackDevServerConfig)

spinner.start("[dev] building...")
server.listen(port, host, () => {
  spinner.succeed("[dev] succeed.")
  opn(url)
})

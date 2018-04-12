import webpack from "webpack"
import ora from "ora"
import config from "./../build/webpack.prod"

const compiler = webpack(config)
const spinner = ora("building...")
spinner.start()

compiler.run((err, stats) => {
  if (err) spinner.fail("fauled.", err)
  spinner.succeed(
    stats.toString({
      chunks: false,
      colors: true
    })
  )
})

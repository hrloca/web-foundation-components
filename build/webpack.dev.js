import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import base from './webpack.base'
import WebpackBuildNotifierPlugin from 'webpack-build-notifier'

export default merge(base, {
  output: {
    filename: '[name].js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WebpackBuildNotifierPlugin(),
  ],
})

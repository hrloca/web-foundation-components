import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import base from './webpack.base'

const prod = merge(base, {
  output: {
    filename: '[name]-[hash].js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      parallel: { cache: true, workers: 2 },
    }),
  ],
})


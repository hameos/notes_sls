const path = require('path')
const nodeExternals = require('webpack-node-externals')

const config = {
  entry: ['./src/serverless/handler.ts'],
  mode: 'development',
  target: 'node',
  externalsPresets: { node: true }, // only for webpack 5
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ],
  },
  output: {
    path: path.resolve(__dirname, '.build'),
    library: {
      type: 'commonjs'
    },
    filename: 'lambdaFn.js',
  },
  resolve: {
    extensions: ['.ts'],
  },
  devtool: 'source-map',
}

module.exports = config

const path = require('path')
const nodeExternals = require('webpack-node-externals')

const config = {
  // For serverless: entry='./src/serverless/handler.ts'
  // For localserver: entry='./src/server.ts',
  entry: ['./src/server.ts'],
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

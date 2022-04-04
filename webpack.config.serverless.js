const devconfig = require('./webpack.config.js')

const config = { ...devconfig }
config.entry = ['./src/serverless/handler.ts']
module.exports = config

let initconfig = null

initconfig = process.env.NODE_ENV === 'development' ? require('./webpack.config.js') : require('./webpack.config.prod.js')

module.exports = initconfig

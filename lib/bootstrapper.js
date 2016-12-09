'use strict'
const logger = require('./services/logger')('bootstrapper')

module.exports = {
  checkConfiguration: function () {
    const self = this

    logger.info('node-emailer configuration check.')
    logger.info()

    Object.keys(self.keys).map(key => {
      logger.info(key, `${process.env[key]}`)

      if (self.keys[key].required && !process.env[key]) {
        throw new Error(`Environment variable ${key} is required but not set.`)
      }
    })

    logger.info()
    logger.info('Configuration OK.')
  },
  keys: {
    LOG_LEVEL: {},
    EMAIL: {},
    EMAILPW: {}
  },
  print: function (data) {}
}

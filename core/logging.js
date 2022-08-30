const pino = require('pino')

let logger

function setLogger (log) {
  logger = log
}

function getLogger (options = {}) {
  if (!logger) {
    logger = pino(options)
  }
  return logger
}

module.exports = {
  getLogger,
  setLogger
}

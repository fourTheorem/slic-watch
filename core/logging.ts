import pino from 'pino'

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

export default {
  getLogger,
  setLogger
}

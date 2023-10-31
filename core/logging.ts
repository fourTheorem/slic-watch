import pino from 'pino'

let logger

export function setLogger (log) {
  logger = log
}

export function getLogger (options = {}) {
  if (logger === undefined) {
    logger = pino(options)
  }
  return logger
}

// @ts-ignore
import pino from 'pino'

let logger

export function setLogger (log) {
  logger = log
}

export function getLogger (options = {}) {
  if (!logger) {
    logger = pino(options)
  }
  return logger
}

/**
 * This module providers a default logger (Pino) but allows the logger to be overridden for cases
 * where a specific logger is mandated (like Serverless Framework)
 */
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

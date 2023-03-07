'use strict'

/**
 * Log wrapper that provides standard logging functions backed by the single-level
 * Serverless logger provided in Serverless Framework v1 and v2
 * @param {*} serverless The Serverless instance provided by a Serverless plugin hook
 * @returns An object with standard logging functions
 */
export default function ServerlessV2Logger (serverless) {
  function log (str) {
    serverless.cli.log(...arguments)
  }

  return {
    log,
    error: log.bind(this, 'ERROR:'),
    warning: log.bind(this, 'WARNING:'),
    notice: log.bind(this, 'NOTICE:'),
    info: log.bind(this, 'INFO:'),
    debug: log.bind(this, 'DEBUG:')
  }
}

const { test } = require('tap')

const logging = require('../logging')

test('default logger is used', (t) => {
  const logger = logging.getLogger()
  t.ok(logger)
  t.ok(logger.info)
  t.end()
})

test('logger override persists', (t) => {
  const myLogger = {
    log: () => {},
    info: () => {},
    error: () => {},
    warning: () => {},
    notice: () => {},
    debug: () => {}
  }
  logging.setLogger(myLogger)
  t.equal(logging.getLogger(), myLogger)
  t.end()
})

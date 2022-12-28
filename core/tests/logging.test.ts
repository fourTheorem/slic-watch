import { test } from 'tap'

import { getLogger } from '../logging'

test('default logger is used', (t) => {
  const logger = getLogger()
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

import { test } from 'tap'

import { getLogger, setLogger  } from '../logging'

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
  
  setLogger(myLogger)
  t.equal(getLogger(), myLogger)
  t.end()
})

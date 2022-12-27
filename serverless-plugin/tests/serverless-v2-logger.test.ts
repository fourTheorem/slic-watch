import { test } from 'tap'

import ServerlessV2Logger from '../serverless-v2-logger'

test('v2 logger provides standard functions', (t) => {
  const invocationParams = []
  const serverless = {
    cli: {
      log: (...params) => {
        invocationParams.push(params)
      }
    }
  }
  const logger = ServerlessV2Logger(serverless)

  logger.log('a message')
  t.same(invocationParams.pop(), ['a message'])
  logger.error('a message')
  t.same(invocationParams.pop(), ['ERROR:', 'a message'])
  logger.warning('a message')
  t.same(invocationParams.pop(), ['WARNING:', 'a message'])
  logger.info('a message')
  t.same(invocationParams.pop(), ['INFO:', 'a message'])
  logger.notice('a message')
  t.same(invocationParams.pop(), ['NOTICE:', 'a message'])
  logger.debug('a message')
  t.same(invocationParams.pop(), ['DEBUG:', 'a message'])
  t.end()
})

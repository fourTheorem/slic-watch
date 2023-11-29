import { test } from 'tap'
import type { Template } from 'cloudform'
import { handler } from 'cf-macro-slic-watch/index'

import inputTemplate from './fixtures/sam-test-project-transformed-template.json'

test('sam-test-project snapshot', async (t) => {
  const response = await handler({ fragment: inputTemplate as Template, requestId: 'snapshot-test' })
  t.notOk(response.errorMessage)
  t.equal(response.status, 'success')
  t.equal(response.requestId, 'snapshot-test')
  t.matchSnapshot(response.fragment, 'fragment')
  t.end()
})

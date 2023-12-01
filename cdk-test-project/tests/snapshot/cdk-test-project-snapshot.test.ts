import { test } from 'tap'
import type { Template } from 'cloudform'
import { handler } from 'cf-macro-slic-watch/index'

import { setUpSnapshotDefaults } from 'test-utils/snapshot-utils'

import generalEuStack from './fixtures/CdkGeneralStackTest-Europe.template.json'
import generalUsStack from './fixtures/CdkGeneralStackTest-US.template.json'
import ecsStack from './fixtures/CdkECSStackTest-Europe.template.json'
import stepFunctionStack from './fixtures/CdkSFNStackTest-Europe.template.json'

const stacks = { generalEuStack, generalUsStack, ecsStack, stepFunctionStack }

test('the Macro adds SLIC Watch dashboards and alarms to synthesized CDK project', async (t) => {
  setUpSnapshotDefaults(t)
  for (const [name, stack] of Object.entries(stacks)) {
    await t.test(name, async (t) => {
      const response = await handler({ fragment: stack as Template, requestId: 'snapshot-test' })
      t.notOk(response.errorMessage)
      t.equal(response.status, 'success')
      t.equal(response.requestId, 'snapshot-test')
      t.matchSnapshot(response.fragment, `${name} fragment`)
    })
  }
  t.end()
})

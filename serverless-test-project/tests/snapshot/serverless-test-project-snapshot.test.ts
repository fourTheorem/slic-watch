import { test } from 'tap'
import { type Template } from 'cloudform-types'

import ServerlessPlugin from 'serverless-slic-watch-plugin/serverless-plugin'

import inputTemplate from './fixtures/cloudformation-template-update-stack.json'
import { createMockServerless } from 'test-utils/sls-test-utils'
import { setUpSnapshotDefaults } from 'test-utils/snapshot-utils'

const logger = {}

const pluginUtils = { log: logger }

test('serverless-test-project snapshot', (t) => {
  setUpSnapshotDefaults(t)
  const mockServerless = createMockServerless(inputTemplate as Template)
  const plugin = new ServerlessPlugin(mockServerless, null, pluginUtils)
  plugin.createSlicWatchResources()
  const generatedTemplate = mockServerless.service.provider.compiledCloudFormationTemplate
  t.matchSnapshot(generatedTemplate, 'serverless-test-project template')
  t.end()
})

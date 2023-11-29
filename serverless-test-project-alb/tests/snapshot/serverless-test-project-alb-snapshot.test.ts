import { test } from 'tap'
import ServerlessPlugin from 'serverless-slic-watch-plugin/serverless-plugin'

import inputTemplate from './fixtures/cloudformation-template-update-stack.json'
import { createMockServerless } from 'test-utils/sls-test-utils'
import type { ResourceType } from 'slic-watch-core'

const logger = {}

const pluginUtils = { log: logger }

test('serverless-test-project-alb snapshot', (t) => {
  const mockServerless = createMockServerless(inputTemplate.Resources as ResourceType)
  const plugin = new ServerlessPlugin(mockServerless, null, pluginUtils)
  plugin.createSlicWatchResources()
  const generatedTemplate = mockServerless.service.provider.compiledCloudFormationTemplate
  t.matchSnapshot(generatedTemplate, 'serverless-test-project-alb template')
  t.end()
})

import { test } from 'tap'
import path from 'node:path'
import { readFileSync } from 'node:fs'
import { type Template } from 'cloudform-types'

import { parse } from 'yaml'

import ServerlessPlugin from 'serverless-slic-watch-plugin/serverless-plugin'

import inputTemplate from './fixtures/cloudformation-template-update-stack.json'
import { createMockServerless } from 'test-utils/sls-test-utils'
import { setUpSnapshotDefaults } from 'test-utils/snapshot-utils'

const logger = {}

const pluginUtils = { log: logger }

test('the plugin adds SLIC Watch dashboards and alarms to a serverless-generated CloudFormation template with ALB resources', (t) => {
  setUpSnapshotDefaults(t)
  const slsConfig = readFileSync(path.join(__dirname, '..', '..', 'serverless.yml')).toString()
  const mockServerless = createMockServerless(inputTemplate as Template, parse(slsConfig))
  const plugin = new ServerlessPlugin(mockServerless, null, pluginUtils)
  plugin.createSlicWatchResources()
  const generatedTemplate = mockServerless.service.provider.compiledCloudFormationTemplate
  t.matchSnapshot(generatedTemplate, 'serverless-test-project-alb template')
  t.end()
})

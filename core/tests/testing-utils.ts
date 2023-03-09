'use strict'

import path from 'path'
import fs from 'fs'
import _ from 'lodash'
import { fileURLToPath } from 'url'
import YAML from 'yaml'
import { cascade } from '../inputs/cascading-config'
import defaultCfTemplate from '../cf-resources/cloudformation-template-stack.json' assert { type: 'json'}
import albCfTemplate from '../cf-resources/alb-cloudformation-template-stack.json' assert { type: 'json'}
import appSyncCfTemplate from '../cf-resources/appsync-cloudformation-template-stack.json' assert { type: 'json'}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const slsYamlPath = path.resolve(
  dirname,
  '../../serverless-test-project/serverless.yml'
)

const slsYaml = YAML.parse(fs.readFileSync(slsYamlPath, 'utf8'))

const testContext = { alarmActions: ['dummy-arn'] }

function assertCommonAlarmProperties (t, al): void {
  t.ok(al.AlarmDescription)
  t.ok(al.ActionsEnabled)
  t.equal(al.AlarmActions.length, 1)
  t.ok(al.AlarmActions)
  t.ok(al.ComparisonOperator)
}

/**
 * Derive an alarm 'type' by stripping the last component from the underscore-delimited name
 * @param {*} alarmName The alarm name as a string or {'Fn::Sub': ...} objectj
 * @returns The inferred type
 */
function alarmNameToType (alarmName) {
  const resolvedName = alarmName['Fn::Sub'] ? alarmName['Fn::Sub'] : alarmName
  const components = resolvedName.split('_')
  components.pop()
  return components.join('_')
}

function createTestConfig (from, cascadingChanges): any {
  return cascade(
    _.merge(
      {},
      from,
      cascadingChanges
    )
  )
}

function createTestCloudFormationTemplate (stackDefinition = null) {
  const data = stackDefinition ?? defaultCfTemplate

  return { compiledTemplate: _.cloneDeep(data), additionalResources: {} }
}

export {
  slsYaml,
  albCfTemplate,
  appSyncCfTemplate,
  defaultCfTemplate,
  testContext,
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate
}

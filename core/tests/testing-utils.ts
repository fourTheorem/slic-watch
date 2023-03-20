'use strict'

import path from 'path'
import fs from 'fs'
import _ from 'lodash'
import { fileURLToPath } from 'url'
import YAML from 'yaml'
import type Template from 'cloudform-types/types/template'
import { cascade } from '../inputs/cascading-config'
import _defaultCfTemplate from '../cf-resources/cloudformation-template-stack.json' assert { type: 'json'}
import _albCfTemplate from '../cf-resources/alb-cloudformation-template-stack.json' assert { type: 'json'}
import _appSyncCfTemplate from '../cf-resources/appsync-cloudformation-template-stack.json' assert { type: 'json'}
const defaultCfTemplate = _defaultCfTemplate as Template
const albCfTemplate = _albCfTemplate as Template
const appSyncCfTemplate = _appSyncCfTemplate as unknown as Template

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
 * @param {*} alarmName The alarm name as a string or {'Fn::Sub': ...} object
 * @returns The inferred type
 */
function alarmNameToType (alarmName) {
  const resolvedName = alarmName['Fn::Sub'] ?? alarmName
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

function createTestCloudFormationTemplate (stackDefinition = defaultCfTemplate): Template {
  return _.cloneDeep(stackDefinition)
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

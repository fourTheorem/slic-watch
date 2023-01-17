'use strict'

import path from 'path'
import fs from 'fs'
import _ from 'lodash'
import { createRequire } from 'module'
import {fileURLToPath} from 'url'
import YAML from 'yaml'

import CloudFormationTemplate from '../cf-template'
import { AllAlarmsConfig } from '../default-config-alarms'
import { DashboardConfig } from '../default-config-dashboard'
import { cascade } from '../cascading-config'

const require = createRequire(import.meta.url)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const defaultCfTemplate = require('./resources/cloudformation-template-stack.json')
const albCfTemplate = require('./resources/alb-cloudformation-template-stack.json')
const appSyncCfTemplate = require('./resources/appsync-cloudformation-template-stack.json')

const slsYamlPath = path.resolve(
  __dirname,
  '../../serverless-test-project/serverless.yml'
)

const slsYaml = YAML.parse(fs.readFileSync(slsYamlPath, 'utf8'))

const testContext = { alarmActions: ['dummy-arn'] }

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

function assertCommonAlarmProperties (t, al) {
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

function createTestConfig (from, cascadingChanges) {
  return cascade(
    _.merge(
      {},
      from,
      cascadingChanges
    )
  )
}

function createTestCloudFormationTemplate (stackDefinition = null) {
  const data = stackDefinition || defaultCfTemplate

  return CloudFormationTemplate(_.cloneDeep(data), {})
}

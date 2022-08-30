'use strict'

const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const YAML = require('yaml')

const { cascade } = require('../cascading-config')
const CloudFormationTemplate = require('../cf-template')
const defaultCfTemplate = require('./resources/cloudformation-template-stack.json')

const slsYamlPath = path.resolve(
  __dirname,
  '../../serverless-test-project/serverless.yml'
)
const slsYaml = YAML.parse(fs.readFileSync(slsYamlPath, 'utf8'))

const testContext = { alarmActions: ['dummy-arn'] }

module.exports = {
  slsYaml,
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

function alarmNameToType (alarmName) {
  if (alarmName['Fn::Sub']) {
    return alarmName['Fn::Sub'].split('_')[0]
  }
  return alarmName.split('_')[0]
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

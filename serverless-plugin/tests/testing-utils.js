'use strict'

const _ = require('lodash')
const { cascade } = require('../cascading-config')
const CloudFormationTemplate = require('../cf-template')
const defaultCfTemplate = require('./resources/cloudformation-template-stack.json')

const testContext = {
  alarmActions: ['dummy-arn'],
  stackName: 'testStack',
  region: 'eu-west-1'
}

const slsMock = {
  cli: {
    log: () => {}
  }
}

module.exports = {
  slsMock,
  defaultCfTemplate,
  testContext,
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate
}

function assertCommonAlarmProperties (t, al) {
  t.ok(al.AlarmDescription.length > 0)
  t.ok(al.ActionsEnabled)
  t.equal(al.AlarmActions.length, 1)
  t.ok(al.AlarmActions)
  t.ok(al.ComparisonOperator)
}

function alarmNameToType (alarmName) {
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

  return CloudFormationTemplate(
    _.cloneDeep(data),
    {},
    slsMock
  )
}

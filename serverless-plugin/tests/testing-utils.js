'use strict'

const _ = require('lodash')
const sourceCFTemplate = require('./resources/cloudformation-template-stack.json')
const { cascade } = require('../cascading-config')
const CloudFormationTemplate = require('../cf-template')

module.exports = {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate
}

const slsMock = {
  cli: {
    log: () => {}
  }
}

function assertCommonAlarmProperties (t, al) {
  t.ok(al.AlarmDescription.length > 0)
  t.ok(al.ActionsEnabled)
  t.equal(al.AlarmActions.length, 1)
  t.ok(al.AlarmActions)
  t.equal(al.ComparisonOperator, 'GreaterThanThreshold')
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
  const data = stackDefinition || sourceCFTemplate

  return CloudFormationTemplate(
    _.cloneDeep(data),
    slsMock
  )
}

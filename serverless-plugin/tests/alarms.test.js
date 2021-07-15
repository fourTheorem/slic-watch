'use strict'

const { test } = require('tap')

const alarms = require('../alarms')
const defaultConfig = require('../default-config')
const { createTestCloudFormationTemplate, slsMock, createTestConfig, testContext } = require('./testing-utils')

test('Alarms create all service alarms', (t) => {
  const cfTemplate = createTestCloudFormationTemplate()
  const funcAlarmConfigs = {}
  for (const func of cfTemplate.getFunctionNames()) {
    funcAlarmConfigs[func] = {}
  }
  const { addAlarms } = alarms(slsMock, defaultConfig.alarms, funcAlarmConfigs, testContext)
  addAlarms(cfTemplate)
  const namespaces = new Set()
  for (const resource of Object.values(
    cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  )) {
    if (resource.Properties.Namespace) {
      namespaces.add(resource.Properties.Namespace)
    }
  }
  t.same(namespaces, new Set(['AWS/Lambda', 'AWS/ApiGateway', 'AWS/States', 'AWS/DynamoDB', 'AWS/Kinesis', 'AWS/SQS']))
  t.end()
})

test('Alarms are not created when disabled globally', (t) => {
  const config = createTestConfig(
    defaultConfig.alarms,
    {
      enabled: false
    }
  )
  const cfTemplate = createTestCloudFormationTemplate()
  const funcAlarmConfigs = {}
  for (const func of cfTemplate.getFunctionNames()) {
    funcAlarmConfigs[func] = {}
  }
  const { addAlarms } = alarms(slsMock, config, funcAlarmConfigs, testContext)
  addAlarms(cfTemplate)

  const alarmsCreated = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  t.same({}, alarmsCreated)
  t.end()
})

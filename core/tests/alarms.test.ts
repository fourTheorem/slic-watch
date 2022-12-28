'use strict'

import { test } from 'tap'

import alarms from '../alarms'
import defaultConfig from '../default-config'
import { createTestCloudFormationTemplate, albCfTemplate, createTestConfig, testContext } from './testing-utils'

test('Alarms create all service alarms', (t) => {
  const cfTemplate = createTestCloudFormationTemplate()
  const funcAlarmConfigs = {}
  for (const funcLogicalId of Object.keys(cfTemplate.getResourcesByType('AWS::Lambda::Function'))) {
    funcAlarmConfigs[funcLogicalId] = {}
  }
  const { addAlarms } = alarms(defaultConfig.alarms, funcAlarmConfigs, testContext)
  addAlarms(cfTemplate)
  const namespaces = new Set()
  for (const resource of Object.values(
    cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  )) {
    // @ts-ignore
    if (resource.Properties.Namespace) {
      // @ts-ignore
      namespaces.add(resource.Properties.Namespace)
    }
  }
  t.same(namespaces, new Set(['AWS/Lambda', 'AWS/ApiGateway', 'AWS/States', 'AWS/DynamoDB', 'AWS/Kinesis', 'AWS/SQS', 'AWS/ECS', 'AWS/SNS', 'AWS/Events']))
  t.end()
})

test('Alarms create all ALB service alarms', (t) => {
  const cfTemplate = createTestCloudFormationTemplate(albCfTemplate)
  const funcAlarmConfigs = {}
  for (const funcLogicalId of Object.keys(cfTemplate.getResourcesByType('AWS::Lambda::Function'))) {
    funcAlarmConfigs[funcLogicalId] = {}
  }
  const { addAlarms } = alarms(defaultConfig.alarms, funcAlarmConfigs, testContext)
  addAlarms(cfTemplate)
  const namespaces = new Set()
  for (const resource of Object.values(
    cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  )) {
    // @ts-ignore
    if (resource.Properties.Namespace) {
      // @ts-ignore
      namespaces.add(resource.Properties.Namespace)
    }
  }
  t.same(namespaces, new Set(['AWS/Lambda', 'AWS/ApplicationELB']))
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
  for (const funcLogicalId of Object.keys(cfTemplate.getResourcesByType('AWS::Lambda::Function'))) {
    funcAlarmConfigs[funcLogicalId] = {}
  }
  const { addAlarms } = alarms(config, funcAlarmConfigs, testContext)
  addAlarms(cfTemplate)

  const alarmsCreated = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  t.same({}, alarmsCreated)
  t.end()
})

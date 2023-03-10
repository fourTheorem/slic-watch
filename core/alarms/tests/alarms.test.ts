'use strict'

import { test } from 'tap'

import addAlarms from '../alarms'
import defaultConfig from '../../inputs/default-config'
import { createTestCloudFormationTemplate, albCfTemplate, createTestConfig, testContext } from '../../tests/testing-utils'
import { getResourcesByType } from '../../cf-template'

test('Alarms create all service alarms', (t) => {
  const { compiledTemplate, additionalResources } = createTestCloudFormationTemplate()
  const funcAlarmPropertiess = {}
  for (const funcLogicalId of Object.keys(getResourcesByType('AWS::Lambda::Function', compiledTemplate))) {
    funcAlarmPropertiess[funcLogicalId] = {}
  }
  addAlarms(defaultConfig.alarms, funcAlarmPropertiess, testContext, compiledTemplate, additionalResources)
  const namespaces = new Set()
  for (const resource of Object.values(
    getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)
  )) {
    if (resource.Properties?.Namespace != null) {
      namespaces.add(resource.Properties.Namespace)
    }
  }
  t.same(namespaces, new Set(['AWS/Lambda', 'AWS/ApiGateway', 'AWS/States', 'AWS/DynamoDB', 'AWS/Kinesis', 'AWS/SQS', 'AWS/ECS', 'AWS/SNS', 'AWS/Events']))
  t.end()
})

test('Alarms create all ALB service alarms', (t) => {
  const { compiledTemplate, additionalResources } = createTestCloudFormationTemplate(albCfTemplate)
  const funcAlarmPropertiess = {}
  for (const funcLogicalId of Object.keys(getResourcesByType('AWS::Lambda::Function', compiledTemplate))) {
    funcAlarmPropertiess[funcLogicalId] = {}
  }
  addAlarms(defaultConfig.alarms, funcAlarmPropertiess, testContext, compiledTemplate, additionalResources)
  const namespaces = new Set()
  for (const resource of Object.values(
    getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)
  )) {
    if (resource.Properties?.Namespace != null) {
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
      ActionsEnabled: false
    }
  )
  const { compiledTemplate, additionalResources } = createTestCloudFormationTemplate()
  const funcAlarmPropertiess = {}
  for (const funcLogicalId of Object.keys(getResourcesByType('AWS::Lambda::Function', compiledTemplate))) {
    funcAlarmPropertiess[funcLogicalId] = {}
  }
  addAlarms(config, funcAlarmPropertiess, testContext, compiledTemplate, additionalResources)

  const alarmsCreated = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)

  t.same({}, alarmsCreated)
  t.end()
})

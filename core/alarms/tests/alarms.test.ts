import { test } from 'tap'

import addAlarms from '../alarms'
import defaultConfig from '../../inputs/default-config'
import { createTestCloudFormationTemplate, albCfTemplate, createTestConfig, testAlarmActionsConfig } from '../../tests/testing-utils'
import { getResourcesByType } from '../../cf-template'

test('Alarms create all service alarms', (t) => {
  const compiledTemplate = createTestCloudFormationTemplate()
  addAlarms(defaultConfig.alarms, testAlarmActionsConfig, compiledTemplate)
  const namespaces = new Set()
  for (const resource of Object.values(
    getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)
  )) {
    if (resource.Properties?.Namespace != null) {
      namespaces.add(resource.Properties.Namespace)
    }
  }
  t.same(namespaces, new Set(['AWS/Lambda', 'AWS/ApiGateway', 'AWS/States', 'AWS/DynamoDB', 'AWS/Kinesis', 'AWS/SQS', 'AWS/ECS', 'AWS/SNS', 'AWS/Events', 'AWS/S3']))
  t.end()
})

test('Alarms create all ALB service alarms', (t) => {
  const compiledTemplate = createTestCloudFormationTemplate(albCfTemplate)
  addAlarms(defaultConfig.alarms, testAlarmActionsConfig, compiledTemplate)
  const namespaces = new Set()
  for (const resource of Object.values(
    getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)
  )) {
    if (resource.Properties?.Namespace != null) {
      namespaces.add(resource.Properties.Namespace)
    }
  }
  t.same(namespaces, new Set(['AWS/Lambda', 'AWS/ApplicationELB', 'AWS/S3']))
  t.end()
})

test('Alarms are not created when disabled globally', (t) => {
  const config = createTestConfig(
    defaultConfig.alarms,
    {
      enabled: false
    }
  )
  const compiledTemplate = createTestCloudFormationTemplate()
  addAlarms(config, testAlarmActionsConfig, compiledTemplate)

  const alarmsCreated = getResourcesByType('AWS::CloudWatch::Alarm', compiledTemplate)

  t.same({}, alarmsCreated)
  t.end()
})

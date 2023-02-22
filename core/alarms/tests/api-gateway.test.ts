'use strict'

import apiGatewayAlarms, { resolveRestApiNameAsCfn, resolveRestApiNameForSub } from '../api-gateway'
import { test } from 'tap'
import defaultConfig from '../../inputs/default-config'
import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  testContext
} from '../../tests/testing-utils'

export type AlarmsByType ={
  APIGW_4XXError
  APIGW_5XXError
  APIGW_Latency
}

test('resolveRestApiNameAsCfn', (t) => {
  const fromLiteral = resolveRestApiNameAsCfn({ Properties: { Name: 'my-api-name' } }, 'logicalId')
  t.equal(fromLiteral, 'my-api-name')

  const fromRef = resolveRestApiNameAsCfn({ Properties: { Name: { Ref: 'AWS::Stack' } } }, 'logicalId')
  t.same(fromRef, { Ref: 'AWS::Stack' })

  const fromGetAtt = resolveRestApiNameAsCfn({ Properties: { Name: { GetAtt: ['myResource', 'MyProperty'] } } }, 'logicalId')
  t.same(fromGetAtt, { GetAtt: ['myResource', 'MyProperty'] })

  const fromOpenApiRef = resolveRestApiNameAsCfn({ Properties: { Body: { info: { title: { Ref: 'AWS::Stack' } } } } }, 'logicalId')
  t.same(fromOpenApiRef, { Ref: 'AWS::Stack' })

  t.throws(() => resolveRestApiNameAsCfn({ Properties: {} }, 'logicalId'))
  t.end()
})

test('resolveRestApiNameForSub', (t) => {
  const fromLiteral = resolveRestApiNameForSub({ Properties: { Name: 'my-api-name' } }, 'logicalId')
  t.equal(fromLiteral, 'my-api-name')

  const fromRef = resolveRestApiNameForSub({ Properties: { Name: { Ref: 'AWS::Stack' } } }, 'logicalId')
  t.same(fromRef, '$' + '{AWS::Stack}')

  const fromGetAtt = resolveRestApiNameForSub({ Properties: { Name: { GetAtt: ['myResource', 'MyProperty'] } } }, 'logicalId')
  t.same(fromGetAtt, '$' + '{myResource.MyProperty}')

  const fromOpenApiRef = resolveRestApiNameForSub({ Properties: { Body: { info: { title: { Ref: 'AWS::Stack' } } } } }, 'logicalId')
  t.same(fromOpenApiRef, '$' + '{AWS::Stack}')

  // eslint-disable-next-line no-template-curly-in-string
  const fromSub = resolveRestApiNameForSub({ Properties: { Name: { 'Fn::Sub': '${AWS::StackName}Suffix' } } }, 'logicalId')
  t.same(fromSub, '$' + '{AWS::StackName}Suffix')

  t.throws(() => resolveRestApiNameForSub({ Properties: {} }, 'logicalId'))
  t.end()
})

test('API Gateway alarms are created', (t) => {
  const AlarmProperties = createTestConfig(
    defaultConfig.alarms,
    {
      Period: 120,
      EvaluationPeriods: 2,
      TreatMissingData: 'breaching',
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      ApiGateway: {
        '5XXError': {
          Threshold: 0.0
        },
        '4XXError': {
          Threshold: 0.05
        },
        Latency: {
          Threshold: 5000
        }
      }
    }
  )
  const apiGwAlarmProperties = AlarmProperties.ApiGateway

  const { createApiGatewayAlarms } = apiGatewayAlarms(apiGwAlarmProperties, testContext)
  const cfTemplate = createTestCloudFormationTemplate()
  createApiGatewayAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  function getAlarmByType ():AlarmsByType {
    const alarmsByType = {}
    for (const alarmResource of Object.values(alarmResources)) {
      const al = alarmResource.Properties
      assertCommonAlarmProperties(t, al)
      const alarmType = alarmNameToType(al.AlarmName)
      alarmsByType[alarmType] = alarmsByType[alarmType] || new Set()
      alarmsByType[alarmType].add(al)
    }
    return alarmsByType as AlarmsByType
  }
  t.equal(Object.keys(alarmResources).length, 3)
  const alarmsByType = getAlarmByType()
  t.same(Object.keys(alarmsByType).sort(), [
    'APIGW_4XXError',
    'APIGW_5XXError',
    'APIGW_Latency'
  ])
  t.equal(alarmsByType.APIGW_5XXError.size, 1)
  for (const al of alarmsByType.APIGW_5XXError) {
    t.equal(al.MetricName, '5XXError')
    t.equal(al.Statistic, 'Average')
    t.equal(al.Threshold, apiGwAlarmProperties['5XXError'].Threshold)
    t.equal(al.EvaluationPeriods, 2)
    t.equal(al.TreatMissingData, 'breaching')
    t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al.Namespace, 'AWS/ApiGateway')
    t.equal(al.Period, 120)
    t.same(al.Dimensions, [
      {
        Name: 'ApiName',
        Value: 'dev-serverless-test-project'
      }
    ])
  }
  for (const al of alarmsByType.APIGW_4XXError) {
    t.equal(al.MetricName, '4XXError')
    t.equal(al.Statistic, 'Average')
    t.equal(al.Threshold, apiGwAlarmProperties['4XXError'].Threshold)
    t.equal(al.EvaluationPeriods, 2)
    t.equal(al.TreatMissingData, 'breaching')
    t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al.Namespace, 'AWS/ApiGateway')
    t.equal(al.Period, 120)
    t.same(al.Dimensions, [
      {
        Name: 'ApiName',
        Value: 'dev-serverless-test-project'
      }
    ])
  }
  for (const al of alarmsByType.APIGW_Latency) {
    t.equal(al.MetricName, 'Latency')
    t.equal(al.ExtendedStatistic, 'p99')
    t.equal(al.Threshold, apiGwAlarmProperties.Latency.Threshold)
    t.equal(al.EvaluationPeriods, 2)
    t.equal(al.TreatMissingData, 'breaching')
    t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al.Namespace, 'AWS/ApiGateway')
    t.equal(al.Period, 120)
    t.same(al.Dimensions, [
      {
        Name: 'ApiName',
        Value: 'dev-serverless-test-project'
      }
    ])
  }

  t.end()
})

test('API Gateway alarms are not created when disabled globally', (t) => {
  const AlarmProperties = createTestConfig(
    defaultConfig.alarms,
    {
      ApiGateway: {
        ActionsEnabled: false, // disabled globally
        Period: 60,
        '5XXError': {
          Threshold: 0.0
        },
        '4XXError': {
          Threshold: 0.05
        },
        Latency: {
          Threshold: 5000
        }
      }
    }
  )
  const apiGwAlarmProperties = AlarmProperties.ApiGateway

  const { createApiGatewayAlarms } = apiGatewayAlarms(apiGwAlarmProperties, testContext)

  const cfTemplate = createTestCloudFormationTemplate()
  createApiGatewayAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  t.same({}, alarmResources)
  t.end()
})

test('API Gateway alarms are not created when disabled individually', (t) => {
  const AlarmProperties = createTestConfig(
    defaultConfig.alarms,
    {
      ApiGateway: {
        ActionsEnabled: true, // enabled globally
        Period: 60,
        '5XXError': {
          ActionsEnabled: false, // disabled locally
          Threshold: 0.0
        },
        '4XXError': {
          ActionsEnabled: false, // disabled locally
          Threshold: 0.05
        },
        Latency: {
          ActionsEnabled: false, // disabled locally
          Threshold: 5000
        }
      }
    }
  )
  const apiGwAlarmProperties = AlarmProperties.ApiGateway

  const { createApiGatewayAlarms } = apiGatewayAlarms(apiGwAlarmProperties, testContext)

  const cfTemplate = createTestCloudFormationTemplate()
  createApiGatewayAlarms(cfTemplate)

  const alarmResources = cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')

  t.same({}, alarmResources)
  t.end()
})

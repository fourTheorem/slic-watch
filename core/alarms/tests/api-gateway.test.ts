import { test } from 'tap'

import createApiGatewayAlarms, { resolveRestApiNameAsCfn, resolveRestApiNameForSub } from '../api-gateway'
import defaultConfig from '../../inputs/default-config'
import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  testContext
} from '../../tests/testing-utils'
import type { ResourceType } from '../../cf-template'

export interface AlarmsByType {
  APIGW_4XXError?
  APIGW_5XXError?
  APIGW_Latency?
}

test('resolveRestApiNameAsCfn', (t) => {
  const fromLiteral = resolveRestApiNameAsCfn({
    Properties: { Name: 'my-api-name' },
    Type: ''
  }, 'logicalId')
  t.equal(fromLiteral, 'my-api-name')

  const fromRef = resolveRestApiNameAsCfn({
    Properties: { Name: { Ref: 'AWS::Stack' } },
    Type: ''
  }, 'logicalId')
  t.same(fromRef, { Ref: 'AWS::Stack' })

  const fromGetAtt = resolveRestApiNameAsCfn({
    Properties: { Name: { GetAtt: ['myResource', 'MyProperty'] } },
    Type: ''
  }, 'logicalId')
  t.same(fromGetAtt, { GetAtt: ['myResource', 'MyProperty'] })

  const fromOpenApiRef = resolveRestApiNameAsCfn({
    Properties: { Body: { info: { title: { Ref: 'AWS::Stack' } } } },
    Type: ''
  }, 'logicalId')
  t.same(fromOpenApiRef, { Ref: 'AWS::Stack' })

  t.throws(() => resolveRestApiNameAsCfn({
    Properties: {},
    Type: ''
  }, 'logicalId'))
  t.end()
})

test('resolveRestApiNameForSub', (t) => {
  const fromLiteral = resolveRestApiNameForSub({
    Properties: { Name: 'my-api-name' },
    Type: ''
  }, 'logicalId')
  t.equal(fromLiteral, 'my-api-name')

  const fromRef = resolveRestApiNameForSub({
    Properties: { Name: { Ref: 'AWS::Stack' } },
    Type: ''
  }, 'logicalId')
  t.same(fromRef, { Ref: 'AWS::Stack' })

  const fromGetAtt = resolveRestApiNameForSub({
    Properties: { Name: { GetAtt: ['myResource', 'MyProperty'] } },
    Type: ''
  }, 'logicalId')
  t.same(fromGetAtt, { GetAtt: ['myResource', 'MyProperty'] })

  const fromOpenApiRef = resolveRestApiNameForSub({
    Properties: { Body: { info: { title: { Ref: 'AWS::Stack' } } } },
    Type: ''
  }, 'logicalId')
  t.same(fromOpenApiRef, { Ref: 'AWS::Stack' })

  const fromSub = resolveRestApiNameForSub({
    Properties: { Name: { 'Fn::Sub': '${AWS::StackName}Suffix' } },
    Type: ''
  }, 'logicalId')
  t.same(fromSub, '$' + '{AWS::StackName}Suffix')

  t.throws(() => resolveRestApiNameForSub({
    Properties: {},
    Type: ''
  }, 'logicalId'))
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
  const compiledTemplate = createTestCloudFormationTemplate()

  const alarmResources: ResourceType = createApiGatewayAlarms(apiGwAlarmProperties, testContext, compiledTemplate)

  const alarmsByType: AlarmsByType = {}
  t.equal(Object.keys(alarmResources).length, 3)
  for (const alarmResource of Object.values(alarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al?.AlarmName)
    alarmsByType[alarmType] = (alarmsByType[alarmType] === true) || new Set()
    alarmsByType[alarmType].add(al)
  }
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
        enabled: false, // disabled globally
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
  const compiledTemplate = createTestCloudFormationTemplate()

  const alarmResources = createApiGatewayAlarms(apiGwAlarmProperties, testContext, compiledTemplate)

  t.same({}, alarmResources)
  t.end()
})

test('API Gateway alarms are not created when disabled individually', (t) => {
  const AlarmProperties = createTestConfig(
    defaultConfig.alarms,
    {
      ApiGateway: {
        enabled: true, // enabled globally
        Period: 60,
        '5XXError': {
          enabled: false, // disabled locally
          Threshold: 0.0
        },
        '4XXError': {
          enabled: false, // disabled locally
          Threshold: 0.05
        },
        Latency: {
          enabled: false, // disabled locally
          Threshold: 5000
        }
      }
    }
  )
  const apiGwAlarmProperties = AlarmProperties.ApiGateway
  const compiledTemplate = createTestCloudFormationTemplate()

  const alarmResources = createApiGatewayAlarms(apiGwAlarmProperties, testContext, compiledTemplate)
  t.same({}, alarmResources)
  t.end()
})

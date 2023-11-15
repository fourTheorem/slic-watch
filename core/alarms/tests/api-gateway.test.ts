import { test } from 'tap'

import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'

import createApiGatewayAlarms, { resolveRestApiNameAsCfn, resolveRestApiNameForSub } from '../api-gateway'
import defaultConfig from '../../inputs/default-config'
import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  testAlarmActionsConfig
} from '../../tests/testing-utils'
import type { ResourceType } from '../../cf-template'
import type Resource from 'cloudform-types/types/resource'

export interface AlarmsByType {
  ApiGW_4XXError?
  ApiGW_5XXError?
  ApiGW_Latency?
}

test('resolveRestApiNameAsCfn', (t) => {
  const fromLiteral = resolveRestApiNameAsCfn({
    Properties: { Name: 'my-api-name' },
    Type: ''
  }, 'logicalId')
  t.equal(fromLiteral, 'my-api-name')

  const fromRef = resolveRestApiNameAsCfn({
    Properties: { Name: { Ref: 'AWS::StackName' } },
    Type: ''
  }, 'logicalId')
  t.same(fromRef, { Ref: 'AWS::StackName' })

  const fromGetAtt = resolveRestApiNameAsCfn({
    Properties: { Name: { GetAtt: ['myResource', 'MyProperty'] } },
    Type: ''
  }, 'logicalId')
  t.same(fromGetAtt, { GetAtt: ['myResource', 'MyProperty'] })

  const fromOpenApiRef = resolveRestApiNameAsCfn({
    Properties: { Body: { info: { title: { Ref: 'AWS::StackName' } } } },
    Type: ''
  }, 'logicalId')
  t.same(fromOpenApiRef, { Ref: 'AWS::StackName' })

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
    Properties: { Name: { Ref: 'AWS::StackName' } },
    Type: ''
  }, 'logicalId')
  t.same(fromRef, '${AWS::StackName}')

  const fromGetAtt = resolveRestApiNameForSub({
    Properties: { Name: { GetAtt: ['myResource', 'MyProperty'] } },
    Type: ''
  }, 'logicalId')
  t.same(fromGetAtt, '$' + '{myResource.MyProperty}')
  console.log(fromGetAtt)

  const fromOpenApiRef = resolveRestApiNameForSub({
    Properties: { Body: { info: { title: { Ref: 'AWS::StackName' } } } },
    Type: ''
  }, 'logicalId')
  t.same(fromOpenApiRef, '${AWS::StackName}')

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
  const testConfig = createTestConfig(
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
  const apiGwAlarmConfig = testConfig.ApiGateway

  t.test('with full template', (t) => {
    const compiledTemplate = createTestCloudFormationTemplate()

    const alarmResources: ResourceType = createApiGatewayAlarms(apiGwAlarmConfig, testAlarmActionsConfig, compiledTemplate)

    const alarmsByType: AlarmsByType = {}
    t.equal(Object.keys(alarmResources).length, 3)
    for (const alarmResource of Object.values(alarmResources)) {
      const al = alarmResource.Properties as AlarmProperties
      assertCommonAlarmProperties(t, al)
      const alarmType = alarmNameToType(al?.AlarmName)
      alarmsByType[alarmType] = (alarmsByType[alarmType] === true) || new Set()
      alarmsByType[alarmType].add(al)
    }
    t.same(Object.keys(alarmsByType).sort(), [
      'ApiGW_4XXError',
      'ApiGW_5XXError',
      'ApiGW_Latency'
    ])

    t.equal(alarmsByType.ApiGW_5XXError.size, 1)
    for (const al of alarmsByType.ApiGW_5XXError) {
      t.equal(al.MetricName, '5XXError')
      t.equal(al.Statistic, 'Average')
      t.equal(al.Threshold, apiGwAlarmConfig['5XXError'].Threshold)
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

    for (const al of alarmsByType.ApiGW_4XXError) {
      t.equal(al.MetricName, '4XXError')
      t.equal(al.Statistic, 'Average')
      t.equal(al.Threshold, apiGwAlarmConfig['4XXError'].Threshold)
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

    for (const al of alarmsByType.ApiGW_Latency) {
      t.equal(al.MetricName, 'Latency')
      t.equal(al.ExtendedStatistic, 'p99')
      t.equal(al.Threshold, apiGwAlarmConfig.Latency.Threshold)
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

  t.test('API Gateway alarms are not created when disabled globally', (t) => {
    const testConfig = createTestConfig(
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
    const apiGwAlarmConfig = testConfig.ApiGateway
    const compiledTemplate = createTestCloudFormationTemplate()

    const alarmResources = createApiGatewayAlarms(apiGwAlarmConfig, testAlarmActionsConfig, compiledTemplate)

    t.same({}, alarmResources)
    t.end()
  })

  t.test('alarm logical IDs are correct when an intrinsic function is used in the API Gateway name', (t) => {
    const compiledTemplate = createTestCloudFormationTemplate({
      Resources: {
        myApi: {
          Type: 'AWS::ApiGateway::RestApi',
          Properties: {
            Name: { Ref: 'AWS::StackName' }
          }
        }
      }
    })
    const alarmResources: ResourceType = createApiGatewayAlarms(apiGwAlarmConfig, testAlarmActionsConfig, compiledTemplate)
    t.same(Object.keys(alarmResources).sort(), [
      'slicWatchApi4XXErrorAlarmAWSStackName',
      'slicWatchApi5XXErrorAlarmAWSStackName',
      'slicWatchApiLatencyAlarmAWSStackName'
    ])
    t.end()
  })
  t.end()
})

test('resource config overrides take precedence', (t) => {
  const testConfig = createTestConfig(defaultConfig.alarms)
  const template = createTestCloudFormationTemplate();

  (template.Resources as ResourceType).ApiGatewayRestApi.Metadata = {
    slicWatch: {
      alarms: {
        Period: 900,
        '5XXError': {
          enabled: true,
          Threshold: 9.9
        },
        '4XXError': {
          enabled: false,
          Threshold: 0.05
        },
        Latency: {
          Threshold: 4321
        }
      }
    }
  }

  const alarmResources = createApiGatewayAlarms(testConfig.ApiGateway, testAlarmActionsConfig, template)
  t.same(Object.keys(alarmResources).length, 2)

  const code5xxAlarm = Object.values(alarmResources).filter(a => a?.Properties?.MetricName === '5XXError')[0]
  const latencyAlarm = Object.values(alarmResources).filter(a => a?.Properties?.MetricName === 'Latency')[0]

  t.equal(code5xxAlarm?.Properties?.Threshold, 9.9)
  t.equal(code5xxAlarm?.Properties?.Period, 900)
  t.equal(latencyAlarm?.Properties?.Threshold, 4321)
  t.equal(latencyAlarm?.Properties?.Period, 900)
  t.end()
})

test('API Gateway alarms are not created when disabled individually', (t) => {
  const testConfig = createTestConfig(
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
  const apiGwAlarmConfig = testConfig.ApiGateway
  const compiledTemplate = createTestCloudFormationTemplate()

  const alarmResources = createApiGatewayAlarms(apiGwAlarmConfig, testAlarmActionsConfig, compiledTemplate)
  t.same({}, alarmResources)
  t.end()
})

test('Alarm Resource Id should have a postfix using the Name of the Api', (t) => {
  const testConfig = createTestConfig(defaultConfig.alarms, {})
  const apiGatewayResource: Resource = { Type: 'AWS::ApiGateway::RestApi', Properties: { Name: 'SimpleTest' } }
  const Resources: Record<string, Resource> = { test: apiGatewayResource }
  const apiGatewayAlarms = createApiGatewayAlarms(testConfig.ApiGateway, testAlarmActionsConfig, { Resources })
  t.same(Object.keys(apiGatewayAlarms), ['slicWatchApi5XXErrorAlarmSimpleTest', 'slicWatchApi4XXErrorAlarmSimpleTest', 'slicWatchApiLatencyAlarmSimpleTest'])
  t.end()
})

test('Alarm Resource Id should have a postfix using the Title of the Api Body', (t) => {
  const testConfig = createTestConfig(defaultConfig.alarms, {})
  const apiGatewayResource: Resource = { Type: 'AWS::ApiGateway::RestApi', Properties: { Body: { info: { title: 'UsingTitle' } } } }
  const Resources: Record<string, Resource> = { test: apiGatewayResource }
  const apiGatewayAlarms = createApiGatewayAlarms(testConfig.ApiGateway, testAlarmActionsConfig, { Resources })
  t.same(Object.keys(apiGatewayAlarms), ['slicWatchApi5XXErrorAlarmUsingTitle', 'slicWatchApi4XXErrorAlarmUsingTitle', 'slicWatchApiLatencyAlarmUsingTitle'])
  t.end()
})

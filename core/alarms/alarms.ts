import type Resource from 'cloudform-types/types/resource'
import type Template from 'cloudform-types/types/template'

import { cascade } from '../inputs/cascading-config'
import { applyAlarmConfig } from '../inputs/function-config'
import type { Context, SlicWatchCascadeAlarmsConfig } from './alarm-types'

import createLambdaAlarms from './lambda'
import type { FunctionAlarmProperties } from './lambda'
import createApiGatewayAlarms from './api-gateway'
import createStatesAlarms from './step-functions'
import createDynamoDbAlarms from './dynamodb'
import createKinesisAlarms from './kinesis'
import createSQSAlarms from './sqs'
import createECSAlarms from './ecs'
import createSNSAlarms from './sns'
import createRuleAlarms from './eventbridge'
import createALBAlarms from './alb'
import createALBTargetAlarms from './alb-target-group'
import createAppSyncAlarms from './appsync'
import { addResource } from '../cf-template'

export default function addAlarms (alarmProperties: SlicWatchCascadeAlarmsConfig, functionAlarmProperties: FunctionAlarmProperties, context: Context, compiledTemplate: Template) {
  const {
    Lambda: lambdaConfig,
    ApiGateway: apiGwConfig,
    States: sfConfig,
    DynamoDB: dynamoDbConfig,
    Kinesis: kinesisConfig,
    SQS: sqsConfig,
    ECS: ecsConfig,
    SNS: snsConfig,
    Events: ruleConfig,
    ApplicationELB: albConfig,
    ApplicationELBTarget: albTargetConfig,
    AppSync: appSyncConfig
  } = cascade(alarmProperties) as SlicWatchCascadeAlarmsConfig

  const cascadedFunctionAlarmProperties = applyAlarmConfig(lambdaConfig, functionAlarmProperties)

  const funcsWithConfig = [
    { config: apiGwConfig, alarmFunc: createApiGatewayAlarms },
    { config: sfConfig, alarmFunc: createStatesAlarms },
    { config: dynamoDbConfig, alarmFunc: createDynamoDbAlarms },
    { config: kinesisConfig, alarmFunc: createKinesisAlarms },
    { config: sqsConfig, alarmFunc: createSQSAlarms },
    { config: ecsConfig, alarmFunc: createECSAlarms },
    { config: snsConfig, alarmFunc: createSNSAlarms },
    { config: ruleConfig, alarmFunc: createRuleAlarms },
    { config: albConfig, alarmFunc: createALBAlarms },
    { config: albTargetConfig, alarmFunc: createALBTargetAlarms },
    { config: appSyncConfig, alarmFunc: createAppSyncAlarms }
  ]
  const resources = {}

  if (alarmProperties.enabled ?? true) {
    Object.assign(resources, createLambdaAlarms(cascadedFunctionAlarmProperties, context, compiledTemplate))
    for (const { config, alarmFunc } of funcsWithConfig) {
      if (config?.enabled != null) {
        Object.assign(resources, alarmFunc(config as any, context, compiledTemplate))
      }
    }
  }
  for (const [resourceName, resource] of Object.entries(resources)) {
    addResource(resourceName, resource as Resource, compiledTemplate)
  }
}

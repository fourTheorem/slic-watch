'use strict'

import { cascade, type SlicWatchAlarmsConfig } from '../inputs/cascading-config'
import { applyAlarmConfig } from '../inputs/function-config'
import { type FunctionAlarmPropertiess, type Context } from './default-config-alarms'
import type Template from 'cloudform-types/types/template'

import createLambdaAlarms from './lambda'
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
import { type ResourceType } from './../cf-template'

export default function addAlarms (AlarmProperties: SlicWatchAlarmsConfig, functionAlarmProperties: FunctionAlarmPropertiess, context: Context, compiledTemplate: Template, additionalResources: ResourceType = {}): void {
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
  } = cascade(AlarmProperties)

  const cascadedFunctionAlarmProperties = applyAlarmConfig(lambdaConfig, functionAlarmProperties)

  if (AlarmProperties.enabled) {
    createLambdaAlarms(cascadedFunctionAlarmProperties, context, compiledTemplate, additionalResources)
    apiGwConfig?.enabled != null && createApiGatewayAlarms(apiGwConfig, context, compiledTemplate, additionalResources)
    sfConfig?.enabled != null && createStatesAlarms(sfConfig, context, compiledTemplate, additionalResources)
    dynamoDbConfig?.enabled != null && createDynamoDbAlarms(dynamoDbConfig, context, compiledTemplate, additionalResources)
    kinesisConfig?.enabled != null && createKinesisAlarms(kinesisConfig, context, compiledTemplate, additionalResources)
    sqsConfig?.enabled != null && createSQSAlarms(sqsConfig, context, compiledTemplate, additionalResources)
    ecsConfig?.enabled != null && createECSAlarms(ecsConfig, context, compiledTemplate, additionalResources)
    snsConfig?.enabled != null && createSNSAlarms(snsConfig, context, compiledTemplate, additionalResources)
    ruleConfig?.enabled != null && createRuleAlarms(ruleConfig, context, compiledTemplate, additionalResources)
    albConfig?.enabled != null && createALBAlarms(albConfig, context, compiledTemplate, additionalResources)
    albTargetConfig?.enabled != null && createALBTargetAlarms(albTargetConfig, context, compiledTemplate, additionalResources)
    appSyncConfig?.enabled != null && createAppSyncAlarms(appSyncConfig, context, compiledTemplate, additionalResources)
  }
}

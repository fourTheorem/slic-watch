'use strict'

import { cascade, AlarmsCascade } from '../inputs/cascading-config'
import { applyAlarmConfig } from '../inputs/function-config'
import { FunctionAlarmPropertiess, Context } from './default-config-alarms'
import Template from 'cloudform-types/types/template'

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
import { ResourceType } from './../cf-template'

export default function addAlarms (AlarmProperties:AlarmsCascade, functionAlarmProperties: FunctionAlarmPropertiess, context: Context, compiledTemplate: Template, additionalResources: ResourceType = {}) {
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

  if (AlarmProperties.ActionsEnabled) {
    createLambdaAlarms(cascadedFunctionAlarmProperties, context, compiledTemplate, additionalResources)
    apiGwConfig.ActionsEnabled && createApiGatewayAlarms(apiGwConfig, context, compiledTemplate, additionalResources)
    sfConfig.ActionsEnabled && createStatesAlarms(sfConfig, context, compiledTemplate, additionalResources)
    dynamoDbConfig.ActionsEnabled && createDynamoDbAlarms(dynamoDbConfig, context, compiledTemplate, additionalResources)
    kinesisConfig.ActionsEnabled && createKinesisAlarms(kinesisConfig, context, compiledTemplate, additionalResources)
    sqsConfig.ActionsEnabled && createSQSAlarms(sqsConfig, context, compiledTemplate, additionalResources)
    ecsConfig.ActionsEnabled && createECSAlarms(ecsConfig, context, compiledTemplate, additionalResources)
    snsConfig.ActionsEnabled && createSNSAlarms(snsConfig, context, compiledTemplate, additionalResources)
    ruleConfig.ActionsEnabled && createRuleAlarms(ruleConfig, context, compiledTemplate, additionalResources)
    albConfig.ActionsEnabled && createALBAlarms(albConfig, context, compiledTemplate, additionalResources)
    albTargetConfig.ActionsEnabled && createALBTargetAlarms(albTargetConfig, context, compiledTemplate, additionalResources)
    appSyncConfig.ActionsEnabled && createAppSyncAlarms(appSyncConfig, context, compiledTemplate, additionalResources)
  }
}

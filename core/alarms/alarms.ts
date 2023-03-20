'use strict'

import { cascade } from '../inputs/cascading-config'
import { applyAlarmConfig } from '../inputs/function-config'
import { type FunctionAlarmProperties, type Context, type AllAlarmsConfig } from './default-config-alarms'
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

export default function addAlarms (alarmProperties: AllAlarmsConfig, functionAlarmProperties: FunctionAlarmProperties, context: Context, compiledTemplate: Template): void {
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
  } = cascade(alarmProperties)

  const cascadedFunctionAlarmProperties = applyAlarmConfig(lambdaConfig, functionAlarmProperties)

  if (alarmProperties.enabled ?? true) {
    createLambdaAlarms(cascadedFunctionAlarmProperties, context, compiledTemplate)
    apiGwConfig?.enabled != null && createApiGatewayAlarms(apiGwConfig, context, compiledTemplate)
    sfConfig?.enabled != null && createStatesAlarms(sfConfig, context, compiledTemplate)
    dynamoDbConfig?.enabled != null && createDynamoDbAlarms(dynamoDbConfig, context, compiledTemplate)
    kinesisConfig?.enabled != null && createKinesisAlarms(kinesisConfig, context, compiledTemplate)
    sqsConfig?.enabled != null && createSQSAlarms(sqsConfig, context, compiledTemplate)
    ecsConfig?.enabled != null && createECSAlarms(ecsConfig, context, compiledTemplate)
    snsConfig?.enabled != null && createSNSAlarms(snsConfig, context, compiledTemplate)
    ruleConfig?.enabled != null && createRuleAlarms(ruleConfig, context, compiledTemplate)
    albConfig?.enabled != null && createALBAlarms(albConfig, context, compiledTemplate)
    albTargetConfig?.enabled != null && createALBTargetAlarms(albTargetConfig, context, compiledTemplate)
    appSyncConfig?.enabled != null && createAppSyncAlarms(appSyncConfig, context, compiledTemplate)
  }
}

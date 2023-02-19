'use strict'

import { cascade, AlarmsCascade } from '../inputs/cascading-config'
import { applyAlarmConfig } from '../inputs/function-config'
import { FunctionAlarmConfigs, Context } from './default-config-alarms'
import { CloudFormationTemplate } from '../cf-template'

import lambdaAlarms from './lambda'
import apiGatewayAlarms from './api-gateway'
import stepFunctionAlarms from './step-functions'
import dynamoDbAlarms from './dynamodb'
import kinesisAlarms from './kinesis'
import sqsAlarms from './sqs'
import ecsAlarms from './ecs'
import snsAlarms from './sns'
import ruleAlarms from './eventbridge'
import albAlarms from './alb'
import albTargetAlarms from './alb-target-group'
import appSyncAlarms from './appsync'

export default function alarms (AlarmProperties:AlarmsCascade , functionAlarmConfigs: FunctionAlarmConfigs, context: Context) {
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

  const cascadedFunctionAlarmPropertiess = applyAlarmConfig(lambdaConfig, functionAlarmConfigs )
  const { createLambdaAlarms } = lambdaAlarms(cascadedFunctionAlarmPropertiess, context)
  const { createApiGatewayAlarms } = apiGatewayAlarms(apiGwConfig, context)
  const { createStatesAlarms } = stepFunctionAlarms(sfConfig, context)
  const { createDynamoDbAlarms } = dynamoDbAlarms(dynamoDbConfig, context)
  const { createKinesisAlarms } = kinesisAlarms(kinesisConfig, context)
  const { createSQSAlarms } = sqsAlarms(sqsConfig, context)
  const { createECSAlarms } = ecsAlarms(ecsConfig, context)
  const { createSNSAlarms } = snsAlarms(snsConfig, context)
  const { createRuleAlarms } = ruleAlarms(ruleConfig, context)
  const { createALBAlarms } = albAlarms(albConfig, context)
  const { createALBTargetAlarms } = albTargetAlarms(albTargetConfig, context)
  const { createAppSyncAlarms } = appSyncAlarms(appSyncConfig, context)
  return {
    addAlarms
  }

  /**
   * Add all required alarms to the provided CloudFormation template
   * based on the resources found within
   *
   * A CloudFormation template object
   */
  function addAlarms (cfTemplate: CloudFormationTemplate) {
    if (AlarmProperties.ActionsEnabled) {
      createLambdaAlarms(cfTemplate)
      apiGwConfig.ActionsEnabled && createApiGatewayAlarms(cfTemplate)
      sfConfig.ActionsEnabled && createStatesAlarms(cfTemplate)
      dynamoDbConfig.ActionsEnabled && createDynamoDbAlarms(cfTemplate)
      kinesisConfig.ActionsEnabled && createKinesisAlarms(cfTemplate)
      sqsConfig.ActionsEnabled && createSQSAlarms(cfTemplate)
      ecsConfig.ActionsEnabled && createECSAlarms(cfTemplate)
      snsConfig.ActionsEnabled && createSNSAlarms(cfTemplate)
      ruleConfig.ActionsEnabled && createRuleAlarms(cfTemplate)
      albConfig.ActionsEnabled && createALBAlarms(cfTemplate)
      albTargetConfig.ActionsEnabled && createALBTargetAlarms(cfTemplate)
      appSyncConfig.ActionsEnabled && createAppSyncAlarms(cfTemplate)
    }
  }
}

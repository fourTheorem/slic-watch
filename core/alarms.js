'use strict'

const { cascade } = require('./cascading-config')
const { applyAlarmConfig } = require('./function-config')

const lambdaAlarms = require('./alarms-lambda')
const apiGatewayAlarms = require('./alarms-api-gateway')
const stepFunctionAlarms = require('./alarms-step-functions')
const dynamoDbAlarms = require('./alarms-dynamodb')
const kinesisAlarms = require('./alarms-kinesis')
const sqsAlarms = require('./alarms-sqs')
const ecsAlarms = require('./alarms-ecs')
const snsAlarms = require('./alarms-sns')
const ruleAlarms = require('./alarms-eventbridge')
const albAlarms = require('./alarms-alb')

module.exports = function alarms (alarmConfig, functionAlarmConfigs, context) {
  const {
    ApiGateway: apiGwConfig,
    States: sfConfig,
    DynamoDB: dynamoDbConfig,
    Kinesis: kinesisConfig,
    SQS: sqsConfig,
    Lambda: lambdaConfig,
    ECS: ecsConfig,
    SNS: snsConfig,
    Events: ruleConfig,
    ApplicationELB: albConfig
  } = cascade(alarmConfig)

  const cascadedFunctionAlarmConfigs = applyAlarmConfig(lambdaConfig, functionAlarmConfigs)
  const { createLambdaAlarms } = lambdaAlarms(cascadedFunctionAlarmConfigs, context)
  const { createApiGatewayAlarms } = apiGatewayAlarms(apiGwConfig, context)
  const { createStatesAlarms } = stepFunctionAlarms(sfConfig, context)
  const { createDynamoDbAlarms } = dynamoDbAlarms(dynamoDbConfig, context)
  const { createKinesisAlarms } = kinesisAlarms(kinesisConfig, context)
  const { createSQSAlarms } = sqsAlarms(sqsConfig, context)
  const { createECSAlarms } = ecsAlarms(ecsConfig, context)
  const { createSNSAlarms } = snsAlarms(snsConfig, context)
  const { createRuleAlarms } = ruleAlarms(ruleConfig, context)

  const { createALBAlarms } = albAlarms(albConfig, context, serverless)
  return {
    addAlarms
  }

  /**
   * Add all required alarms to the provided CloudFormation template
   * based on the resources found within
   *
   * @param {CloudFormationTemplate} cfTemplate A CloudFormation template object
   */
  function addAlarms (cfTemplate) {
    if (alarmConfig.enabled) {
      createLambdaAlarms(cfTemplate)
      apiGwConfig.enabled && createApiGatewayAlarms(cfTemplate)
      sfConfig.enabled && createStatesAlarms(cfTemplate)
      dynamoDbConfig.enabled && createDynamoDbAlarms(cfTemplate)
      kinesisConfig.enabled && createKinesisAlarms(cfTemplate)
      sqsConfig.enabled && createSQSAlarms(cfTemplate)
      ecsConfig.enabled && createECSAlarms(cfTemplate)
      snsConfig.enabled && createSNSAlarms(cfTemplate)
      ruleConfig.enabled && createRuleAlarms(cfTemplate)
      albConfig.enabled && createALBAlarms(cfTemplate)
    }
  }
}

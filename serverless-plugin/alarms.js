'use strict'

const { cascade } = require('./cascading-config')

const lambdaAlarms = require('./alarms-lambda')
const apiGatewayAlarms = require('./alarms-api-gateway')
const stepFunctionAlarms = require('./alarms-step-functions')
const dynamoDbAlarms = require('./alarms-dynamodb')
const kinesisAlarms = require('./alarms-kinesis')
const sqsAlarms = require('./alarms-sqs')

module.exports = function alarms (serverless, alarmConfig, context) {
  const {
    Lambda: lambdaConfig,
    ApiGateway: apiGwConfig,
    States: sfConfig,
    DynamoDB: dynamoDbConfig,
    Kinesis: kinesisConfig,
    SQS: sqsConfig
  } = cascade(alarmConfig)
  const { createLambdaAlarms } = lambdaAlarms(lambdaConfig, context)
  const { createApiGatewayAlarms } = apiGatewayAlarms(apiGwConfig, context)
  const { createStatesAlarms } = stepFunctionAlarms(sfConfig, context)
  const { createDynamoDbAlarms } = dynamoDbAlarms(dynamoDbConfig, context)
  const { createKinesisAlarms } = kinesisAlarms(kinesisConfig, context)
  const { createSQSAlarms } = sqsAlarms(sqsConfig, context)

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
      lambdaConfig.enabled && createLambdaAlarms(cfTemplate)
      apiGwConfig.enabled && createApiGatewayAlarms(cfTemplate)
      sfConfig.enabled && createStatesAlarms(cfTemplate)
      dynamoDbConfig.enabled && createDynamoDbAlarms(cfTemplate)
      kinesisConfig.enabled && createKinesisAlarms(cfTemplate)
      sqsConfig.enabled && createSQSAlarms(cfTemplate)
    }
  }
}

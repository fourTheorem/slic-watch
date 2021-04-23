'use strict'

const { cascade } = require('./cascading-config')

const lambdaAlarms = require('./alarms-lambda')
const apiGatewayAlarms = require('./alarms-api-gateway')
const stepFunctionAlarms = require('./alarms-step-functions')

module.exports = function alarms (serverless, alarmConfig, context) {
  const {
    Lambda: lambdaConfig,
    ApiGateway: apiGwConfig,
    States: sfConfig
  } = cascade(alarmConfig)
  const { createLambdaAlarms } = lambdaAlarms(lambdaConfig, context)
  const { createApiGatewayAlarms } = apiGatewayAlarms(apiGwConfig, context)
  const { createStatesAlarms } = stepFunctionAlarms(sfConfig, context)

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
    createLambdaAlarms(cfTemplate)
    createApiGatewayAlarms(cfTemplate)
    createStatesAlarms(cfTemplate)
  }
}

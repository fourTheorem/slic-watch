'use strict'

const { cascade } = require('./cascading-config')

const lambdaAlarms = require('./alarms-lambda')
const apiGatewayAlarms = require('./alarms-api-gateway')

module.exports = function alarms(serverless, config, context) {
  const alarmConfig = cascade(config.alarms)
  const { createLambdaAlarms } = lambdaAlarms(alarmConfig.Lambda, context)
  const { createApiGatewayAlarms } = apiGatewayAlarms(
    alarmConfig.ApiGateway,
    context
  )

  return {
    addAlarms,
  }

  /**
   * Add all required alarms to the provided CloudFormation template
   * based on the resources found within
   *
   * @param {CloudFormationTemplate} cfTemplate A CloudFormation template object
   */
  function addAlarms(cfTemplate) {
    createLambdaAlarms(cfTemplate)
    createApiGatewayAlarms(cfTemplate)
  }
}

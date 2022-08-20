'use strict'

const _ = require('lodash')
const Ajv = require('ajv')

const alarms = require('slic-watch-core/alarms')
const dashboard = require('slic-watch-core/dashboard')
const { pluginConfigSchema, functionConfigSchema, slicWatchSchema } = require('slic-watch-core/config-schema')
const defaultConfig = require('slic-watch-core/default-config')
const CloudFormationTemplate = require('slic-watch-core/cf-template')

const ServerlessError = require('serverless/lib/serverless-error')

class ServerlessPlugin {
  constructor (serverless, options) {
    this.serverless = serverless
    this.options = options
    this.providerNaming = serverless.providers.aws.naming

    if (serverless.service.provider.name !== 'aws') {
      throw new ServerlessError('SLIC Watch only supports AWS')
    }

    if (serverless.configSchemaHandler) {
      serverless.configSchemaHandler.defineCustomProperties(pluginConfigSchema)
      serverless.configSchemaHandler.defineFunctionProperties('aws', functionConfigSchema)
    }

    // Use the latest possible hook to ensure that `Resources` are included in the compiled Template
    this.hooks = {
      'before:package:finalize': this.finalizeHook.bind(this)
    }
  }

  /**
   * Modify the CloudFormation template before the package is finalized
   */
  finalizeHook () {
    const slicWatchConfig = (this.serverless.service.custom || {}).slicWatch || {}

    const ajv = new Ajv({
      unicodeRegExp: false
    })
    const slicWatchValidate = ajv.compile(slicWatchSchema)
    const slicWatchValid = slicWatchValidate(slicWatchConfig)
    if (!slicWatchValid) {
      throw new ServerlessError('SLIC Watch configuration is invalid: ' + ajv.errorsText(slicWatchValidate.errors))
    }

    const alarmActions = []

    if (slicWatchConfig.enabled === false) {
      return
    }

    if (slicWatchConfig.topicArn) {
      alarmActions.push(slicWatchConfig.topicArn)
    }
    // Validate and fail fast on config validation errors since this is a warning in Serverless Framework 2.x
    const context = {
      region: this.serverless.service.provider.region,
      stackName: this.providerNaming.getStackName(),
      alarmActions
    }

    const config = _.merge(defaultConfig, slicWatchConfig)

    const awsProvider = this.serverless.getProvider('aws')

    const cfTemplate = CloudFormationTemplate(
      this.serverless.service.provider.compiledCloudFormationTemplate,
      this.serverless.service.resources ? this.serverless.service.resources.Resources : {}
    )

    const functionAlarmConfigs = {}
    const functionDashboardConfigs = {}
    for (const funcName of this.serverless.service.getAllFunctions()) {
      const func = this.serverless.service.getFunction(funcName)
      const functionResName = awsProvider.naming.getLambdaLogicalId(funcName)
      const functionName = cfTemplate.getResourceByName(functionResName).Properties.FunctionName
      const funcConfig = func.slicWatch || {}
      functionAlarmConfigs[functionName] = funcConfig.alarms || {}
      functionDashboardConfigs[functionName] = funcConfig.dashboard
    }

    this.dashboard = dashboard(this.serverless, config.dashboard, functionDashboardConfigs, context)
    this.alarms = alarms(this.serverless, config.alarms, functionAlarmConfigs, context)
    this.dashboard.addDashboard(cfTemplate)
    this.alarms.addAlarms(cfTemplate)
  }
}

module.exports = ServerlessPlugin

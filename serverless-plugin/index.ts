'use strict'

import _ from 'lodash'
import Ajv from 'ajv'

import alarms from 'slic-watch-core/alarms'
import dashboard from 'slic-watch-core/dashboard'
import { pluginConfigSchema, functionConfigSchema, slicWatchSchema } from 'slic-watch-core/config-schema'
import defaultConfig from 'slic-watch-core/default-config'
import CloudFormationTemplate from 'slic-watch-core/cf-template'
import * as logging from 'slic-watch-core/logging'

import ServerlessError from 'serverless/lib/serverless-error'

class ServerlessPlugin {
  /**
   * Plugin constructor according to the Serverless Framework v2/v3 plugin signature
   * @param {*} serverless The Serverless isntance
   * @param {*} cliOptions Serverless framework CLI options
   * @param {*} pluginUtils V3 utilitiessss, including the logger
   */
  constructor (serverless, cliOptions, pluginUtils = {}) {
    this.serverless = serverless
    const logger = pluginUtils.log
    if (logger) {
      logging.setLogger(logger)
    } else {
      // Use serverless v2 logger
      logging.setLogger(require('./serverless-v2-logger')(serverless))
    }
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
      'after:aws:package:finalize:mergeCustomProviderResources': this.createSlicWatchResources.bind(this)
    }
  }

  /**
   * Modify the CloudFormation template before the package is finalized
   */
  createSlicWatchResources () {
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
    const context = { alarmActions }

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
      const funcConfig = func.slicWatch || {}
      functionAlarmConfigs[functionResName] = funcConfig.alarms || {}
      functionDashboardConfigs[functionResName] = funcConfig.dashboard
    }

    this.dashboard = dashboard(config.dashboard, functionDashboardConfigs, context)
    this.alarms = alarms(config.alarms, functionAlarmConfigs, context)
    this.dashboard.addDashboard(cfTemplate)
    this.alarms.addAlarms(cfTemplate)
  }
}

module.exports = ServerlessPlugin

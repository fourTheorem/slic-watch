'use strict'

import _ from 'lodash'
import Ajv from 'ajv'

import alarms from '../core/alarms'
import dashboard from '../core/dashboard'
import { pluginConfigSchema, functionConfigSchema, slicWatchSchema } from '../core/config-schema'
import defaultConfig from '../core/default-config'
import CloudFormationTemplate from '../core/cf-template'
import * as logging from '../core/logging'
import log from './serverless-v2-logger'

import Serverless from 'serverless'

class ServerlessPlugin {
  /**
   * Plugin constructor according to the Serverless Framework v2/v3 plugin signature
   * @param {*} serverless The Serverless isntance
   * @param {*} cliOptions Serverless framework CLI options
   * @param {*} pluginUtils V3 utilitiessss, including the logger
   */
  constructor (serverless, cliOptions, pluginUtils = {}) {
    // @ts-ignore
    this.serverless = serverless
    // @ts-ignore
    const logger = pluginUtils.log
    if (logger) {
      logging.setLogger(logger)
    } else {
      logging.setLogger(log(serverless))
    }
    // @ts-ignore
    this.providerNaming = serverless.providers.aws.naming

    if (serverless.service.provider.name !== 'aws') {
      throw new Serverless('SLIC Watch only supports AWS')
    }

    if (serverless.configSchemaHandler) {
      serverless.configSchemaHandler.defineCustomProperties(pluginConfigSchema)
      serverless.configSchemaHandler.defineFunctionProperties('aws', functionConfigSchema)
    }

    // Use the latest possible hook to ensure that `Resources` are included in the compiled Template
    // @ts-ignore
    this.hooks = {
      'after:aws:package:finalize:mergeCustomProviderResources': this.createSlicWatchResources.bind(this)
    }
  }

  /**
   * Modify the CloudFormation template before the package is finalized
   */
  createSlicWatchResources () {
    // @ts-ignore
    const slicWatchConfig = (this.serverless.service.custom || {}).slicWatch || {}

    const ajv = new Ajv({
      unicodeRegExp: false
    })
    const slicWatchValidate = ajv.compile(slicWatchSchema)
    const slicWatchValid = slicWatchValidate(slicWatchConfig)
    if (!slicWatchValid) {
      throw new Serverless('SLIC Watch configuration is invalid: ' + ajv.errorsText(slicWatchValidate.errors))
    }

    const alarmActions = []
    // @ts-ignore
    if (slicWatchConfig.enabled === false) {
      return
    }
    // @ts-ignore
    if (slicWatchConfig.topicArn) {
      // @ts-ignore
      alarmActions.push(slicWatchConfig.topicArn)
    }
    // Validate and fail fast on config validation errors since this is a warning in Serverless Framework 2.x
    const context = { alarmActions }

    const config = _.merge(defaultConfig, slicWatchConfig)
    // @ts-ignore
    const awsProvider = this.serverless.getProvider('aws')

    const cfTemplate = CloudFormationTemplate(
      // @ts-ignore
      this.serverless.service.provider.compiledCloudFormationTemplate,
      // @ts-ignore
      this.serverless.service.resources ? this.serverless.service.resources.Resources : {}
    )

    const functionAlarmConfigs = {}
    const functionDashboardConfigs = {}
    // @ts-ignore
    for (const funcName of this.serverless.service.getAllFunctions()) {
      // @ts-ignore
      const func = this.serverless.service.getFunction(funcName)
      const functionResName = awsProvider.naming.getLambdaLogicalId(funcName)
      const funcConfig = func.slicWatch || {}
      functionAlarmConfigs[functionResName] = funcConfig.alarms || {}
      functionDashboardConfigs[functionResName] = funcConfig.dashboard
    }
    // @ts-ignore
    this.dashboard = dashboard(config.dashboard, functionDashboardConfigs, context)
    // @ts-ignore
    this.alarms = alarms(config.alarms, functionAlarmConfigs, context)
    // @ts-ignore
    this.dashboard.addDashboard(cfTemplate)
    // @ts-ignore
    this.alarms.addAlarms(cfTemplate)
  }
}

export default ServerlessPlugin
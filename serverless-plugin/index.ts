'use strict'

import _ from 'lodash'
import Ajv from 'ajv'

import alarms from '../core/alarms/alarms'
import dashboard from 'slic-watch-core/dashboards/dashboard'
import { pluginConfigSchema, functionConfigSchema, slicWatchSchema } from '../core/config-schema'
import defaultConfig from '../core/default-config'
import CloudFormationTemplate from '../core/cf-template'
import * as logging from '../core/logging'
import log from './serverless-v2-logger'

import Serverless from 'serverless'
import PluginUtils from 'serverless-plugin-utils'
import Hooks from 'serverless-hooks-plugin'
import Aws from 'serverless/plugins/aws/provider/awsProvider';


class ServerlessPlugin {
  serverless: Serverless
  hooks: Hooks
  providerNaming: Aws
  dashboard: { addDashboard: (cfTemplate: import("../core/cf-template.d").CloudFormationTemplate) => void; };
  alarms: { addAlarms: (cfTemplate: import("../core/cf-template.d").CloudFormationTemplate) => void; };

  /**
   * Plugin constructor according to the Serverless Framework v2/v3 plugin signature
   * @param {*} serverless The Serverless instance
   * @param {*} cliOptions Serverless framework CLI options
   * @param {*} pluginUtils V3 utilities, including the logger
   */
  constructor (serverless, cliOptions, pluginUtils: PluginUtils  = {}) {
    this.serverless = serverless
    const logger = pluginUtils.log
    if (logger) {
      logging.setLogger(logger)
    } else {
      logging.setLogger(log(serverless))
    }
    this.providerNaming = serverless.providers.aws.naming

    if (serverless.service.provider.name !== 'aws') {
      throw new Serverless('SLIC Watch only supports AWS')
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

    type SlicWatchConfig = {
      topicArn: string 
      enabled: boolean
    }

    const slicWatchConfig: SlicWatchConfig = (this.serverless.service.custom || {}).slicWatch || {}

    const ajv = new Ajv({
      unicodeRegExp: false
    })
    const slicWatchValidate = ajv.compile(slicWatchSchema)
    const slicWatchValid = slicWatchValidate(slicWatchConfig)
    if (!slicWatchValid) {
      throw new Serverless('SLIC Watch configuration is invalid: ' + ajv.errorsText(slicWatchValidate.errors))
    }

    const alarmActions = []

    if (slicWatchConfig.enabled === false) {
      return
    }

    if (slicWatchConfig.topicArn) {
      // @ts-ignore
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
      // @ts-ignore
      const functionResName = awsProvider.naming.getLambdaLogicalId(funcName)
      // @ts-ignore
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

export default ServerlessPlugin
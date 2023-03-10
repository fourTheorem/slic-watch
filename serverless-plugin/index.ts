
'use strict'

import _ from 'lodash'
import Ajv from 'ajv'
import addAlarms from '../core/alarms/alarms'
import addDashboard from '../core/dashboards/dashboard'
import { pluginConfigSchema, functionConfigSchema, slicWatchSchema } from '../core/inputs/config-schema'
import defaultConfig from '../core/inputs/default-config'
import Serverless from 'serverless'
import type Hooks from 'serverless-hooks-plugin'
import type Aws from 'serverless/plugins/aws/provider/awsProvider'
import { type ResourceType } from './../core/cf-template'

interface SlicWatchConfig {
  topicArn?: string
  enabled?: boolean
}
class ServerlessPlugin {
  serverless: Serverless
  hooks: Hooks
  providerNaming: Aws

  /**
   * Plugin constructor according to the Serverless Framework v2/v3 plugin signature
   * @param {*} serverless The Serverless instance
   */
  constructor (serverless) {
    this.serverless = serverless

    this.providerNaming = serverless.providers.aws.naming

    if (serverless.service.provider.name !== 'aws') {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new Serverless('SLIC Watch only supports AWS')
    }

    if (serverless.configSchemaHandler != null) {
      serverless.configSchemaHandler.defineCustomProperties(pluginConfigSchema)
      serverless.configSchemaHandler.defineFunctionProperties('aws', functionConfigSchema)
    }

    // Use the latest possible hook to ensure that `Resources` are included in the compiled Template
    this.hooks = { 'after:aws:package:finalize:mergeCustomProviderResources': this.createSlicWatchResources.bind(this) }
  }

  /**
   * Modify the CloudFormation template before the package is finalized
   */
  createSlicWatchResources (): void {
    const slicWatchConfig: SlicWatchConfig = this.serverless.service.custom?.slicWatch ?? {}

    const ajv = new Ajv({
      unicodeRegExp: false
    })
    const slicWatchValidate = ajv.compile(slicWatchSchema)
    const slicWatchValid = slicWatchValidate(slicWatchConfig)
    if (!slicWatchValid) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new Serverless('SLIC Watch configuration is invalid: ' + ajv.errorsText(slicWatchValidate.errors))
    }

    const alarmActions: string[] = []

    if (!(slicWatchConfig.enabled ?? true)) {
      return
    }

    slicWatchConfig.topicArn != null && alarmActions.push(slicWatchConfig.topicArn)

    // Validate and fail fast on config validation errors since this is a warning in Serverless Framework 2.x
    const context = { alarmActions }

    const config = _.merge(defaultConfig, slicWatchConfig)
    const awsProvider = this.serverless.getProvider('aws')

    const functionAlarmConfigs = {}
    const functionDashboardConfigs = {}
    for (const funcName of this.serverless.service.getAllFunctions()) {
      const func = this.serverless.service.getFunction(funcName) as any // check why they don't return slicWatch
      const functionResName = awsProvider.naming.getLambdaLogicalId(funcName)
      const funcConfig = func.slicWatch ?? {}
      functionAlarmConfigs[functionResName] = funcConfig.alarms ?? {}
      functionDashboardConfigs[functionResName] = funcConfig.dashboard
    }
    const compiledTemplate = this.serverless.service.provider.compiledCloudFormationTemplate
    const additionalResources = this.serverless.service.resources as ResourceType
    addDashboard(config.dashboard, functionDashboardConfigs, compiledTemplate, additionalResources)
    addAlarms(config.alarms, functionAlarmConfigs, context, compiledTemplate, additionalResources)
  }
}

export default ServerlessPlugin

import { merge } from 'lodash'
import type Serverless from 'serverless'
import ServerlessError from 'serverless/lib/serverless-error'
import type Hooks from 'serverless-hooks-plugin'
import { type Template } from 'cloudform-types'
import type Resource from 'cloudform-types/types/resource'
import { type ResourceType } from '../core/index'
import { addAlarms, addDashboard, pluginConfigSchema, functionConfigSchema } from '../core/index'
import { resolveSlicWatchConfig, type ResolvedConfiguration, type SlicWatchConfig } from '../core/inputs/general-config'
import { setLogger } from '../core/logging'

interface ServerlessPluginUtils {
  log: any // The Serverless Framework's logger which may be used by plugins to create output
}

class ServerlessPlugin {
  serverless: Serverless
  hooks: Hooks

  /**
     * Plugin constructor according to the Serverless Framework v3 plugin signature
     *
     * @param {*} serverless The Serverless instance
     */
  constructor (serverless: Serverless, _cliOptions: any, pluginUtils: ServerlessPluginUtils) {
    this.serverless = serverless

    if (serverless.service.provider.name !== 'aws') {
      throw new ServerlessError('SLIC Watch only supports AWS')
    }

    // Serverless framework provides the logger we must use to output updates and errors
    setLogger(pluginUtils.log)

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
  createSlicWatchResources () {
    const slicWatchConfig: SlicWatchConfig = this.serverless.service.custom?.slicWatch ?? {}

    let config: ResolvedConfiguration
    try {
      config = resolveSlicWatchConfig(slicWatchConfig)
    } catch (err) {
      throw new ServerlessError((err as Error).message)
    }

    if (config.enabled) {
      const awsProvider = this.serverless.getProvider('aws')

      const compiledTemplate = this.serverless.service.provider.compiledCloudFormationTemplate as Template
      const additionalResources = this.serverless.service.resources as ResourceType

      // Each Lambda Function declared in serverless.yml may have a slicWatch configuration
      // to set configuration overrides for the specific function. We transform those into
      // CloudFormation Metadata on the generate AWS::Lambda::Function resource
      for (const funcName of this.serverless.service.getAllFunctions()) {
        const func = this.serverless.service.getFunction(funcName) as any
        const funcConfig = func.slicWatch ?? {}
        const functionLogicalId = awsProvider.naming.getLambdaLogicalId(funcName)

        const templateResources = compiledTemplate.Resources as Record<string, Resource>
        templateResources[functionLogicalId].Metadata = {
          ...templateResources[functionLogicalId].Metadata ?? {},
          slicWatch: funcConfig
        }
      }

      merge(compiledTemplate, additionalResources)
      addDashboard(config.dashboard, compiledTemplate)
      addAlarms(config.alarms, config.alarmActionsConfig, compiledTemplate)
    }
  }
}

export default ServerlessPlugin

'use strict'

const _ = require('lodash')
const alarms = require('./alarms')
const dashboard = require('./dashboard')
const configSchema = require('./config-schema')
const defaultConfig = require('./default-config')
const CloudFormationTemplate = require('./cf-template')

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
      serverless.configSchemaHandler.defineCustomProperties(configSchema)
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
    const { topicArn, ...pluginConfig } = (
      this.serverless.service.custom || {}
    ).slicWatch
    if (!topicArn) {
      throw new ServerlessError('topicArn not specified in custom.slicWatch')
    }

    const context = {
      region: this.serverless.service.provider.region,
      stackName: this.providerNaming.getStackName(),
      topicArn
    }

    const config = _.merge(defaultConfig, pluginConfig)

    this.dashboard = dashboard(this.serverless, config.dashboard, context)
    this.alarms = alarms(this.serverless, config.alarms, context)
    const cfTemplate = CloudFormationTemplate(
      this.serverless.service.provider.compiledCloudFormationTemplate,
      this.serverless.service.resources.Resources
    )
    this.dashboard.addDashboard(cfTemplate)
    this.alarms.addAlarms(cfTemplate)
  }
}

module.exports = ServerlessPlugin

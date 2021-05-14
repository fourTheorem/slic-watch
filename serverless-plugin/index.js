'use strict'

const _ = require('lodash')
const alarms = require('./alarms')
const dashboard = require('./dashboard')
const defaultConfig = require('./default-config')
const CloudFormationTemplate = require('./cf-template')

class ServerlessPlugin {
  constructor (serverless, options) {
    this.serverless = serverless
    this.options = options
    this.providerNaming = serverless.providers.aws.naming

    const { topicArn, ...pluginConfig } = (
      serverless.service.custom || {}
    ).slicWatch
    if (!topicArn) {
      throw new Error('topicArn not specified in custom.slicWatch')
    }

    const context = {
      region: serverless.service.provider.region,
      stackName: this.providerNaming.getStackName(),
      topicArn
    }

    const config = _.merge(defaultConfig, pluginConfig)

    this.serverless.cli.log(`slicWatch config: ${JSON.stringify(config)}`)

    this.dashboard = dashboard(serverless, config.dashboard, context)
    this.alarms = alarms(serverless, config.alarms, context)

    // Use the latest possible hook to ensure that `Resources` are included in the compiled Template
    this.hooks = {
      'before:package:finalize': this.finalizeHook.bind(this)
    }
  }

  /**
   * Modify the CloudFormation template before the package is finalized
   */
  finalizeHook () {
    const cfTemplate = CloudFormationTemplate(
      this.serverless.service.provider.compiledCloudFormationTemplate,
      this.serverless.service.resources.Resources
    )
    this.dashboard.addDashboard(cfTemplate)
    this.alarms.addAlarms(cfTemplate)
  }
}

module.exports = ServerlessPlugin

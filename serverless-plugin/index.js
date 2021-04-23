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

    this.hooks = {
      'package:compileEvents': this.compileEvents.bind(this)
    }
  }

  compileEvents () {
    const cfTemplate = CloudFormationTemplate(
      this.serverless.service.provider.compiledCloudFormationTemplate
    )
    this.dashboard.addDashboard(cfTemplate)
    this.alarms.addAlarms(cfTemplate)
  }
}

module.exports = ServerlessPlugin

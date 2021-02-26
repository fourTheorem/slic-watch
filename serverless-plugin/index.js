'use strict'

const dashboard = require('./dashboard')
const alarms = require('./alarms')

const DEFAULT_PLUGIN_CONFIG = {
  alarmPeriod: 60,
  durationPercentTimeoutThreshold: 95,
  errorsThreshold: 0,
  throttlesPercentThreshold: 0,
}

class ServerlessPlugin {
  constructor(serverless, options) {
  debugger
    this.serverless = serverless
    this.options = options
    this.providerNaming = serverless.providers.aws.naming

    this.config = {
      ...DEFAULT_PLUGIN_CONFIG,
      ...((serverless.service.custom || {}).slicWatch || {}),
      region: serverless.service.provider.region,
      stackName: this.providerNaming.getStackName(),
    }

    this.serverless.cli.log(`slicWatch config: ${JSON.stringify(this.config)}`)

    if (!this.config.topicArn) {
      throw new Error('topicArn not specified in custom.slicWatch')
    }
    this.dashboard = dashboard(serverless, this.config)
    this.alarms = alarms(serverless, this.config)

    this.hooks = {
      'package:compileEvents': this.compileEvents.bind(this),
    }
  }

  compileEvents() {
    const cfTemplate = this.serverless.service.provider
      .compiledCloudFormationTemplate
    this.dashboard.addDashboard(cfTemplate)
    this.alarms.addAlarms(cfTemplate)
  }
}

module.exports = ServerlessPlugin

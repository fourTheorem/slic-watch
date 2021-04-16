'use strict'

const _ = require('lodash')
const alarms = require('./alarms')
const dashboard = require('./dashboard')
const defaultConfig = require('./default-config')
const CloudFormationTemplate = require('./cf-template')

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless
    this.options = options
    this.providerNaming = serverless.providers.aws.naming

    this.config = _.merge(
      defaultConfig,
      (serverless.service.custom || {}).slicWatch,
      {
        region: serverless.service.provider.region,
        stackName: this.providerNaming.getStackName(),
      }
    )

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
    const cfTemplate = CloudFormationTemplate(
      this.serverless.service.provider.compiledCloudFormationTemplate
    )
    this.dashboard.addDashboard(cfTemplate)
    this.alarms.addAlarms(cfTemplate)
  }
}

module.exports = ServerlessPlugin

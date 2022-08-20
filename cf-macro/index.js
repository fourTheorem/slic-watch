'use strict'

const _ = require('lodash')
const Ajv = require('ajv')

const alarms = require('slic-watch-core/alarms')
const dashboard = require('slic-watch-core/dashboard')
const CloudFormationTemplate = require('slic-watch-core/cf-template')
const defaultConfig = require('slic-watch-core/default-config')
const { slicWatchSchema } = require('slic-watch-core/config-schema')

exports.handler = async function (event, context) {
  console.info('Received event', { event })
  const response = processFragment(event)
  console.info('Returning', JSON.stringify(response))
  return response
}

function processFragment (event) {
  let status = 'success'
  let outputFragment = event.fragment
  try {
    const slicWatchConfig = (outputFragment.Metadata || {}).slicWatch || {}
    const ajv = new Ajv({
      unicodeRegExp: false
    })
    const config = _.merge(defaultConfig, slicWatchConfig)

    const slicWatchValidate = ajv.compile(slicWatchSchema)
    const slicWatchValid = slicWatchValidate(slicWatchConfig)

    if (!slicWatchValid) {
      throw new Error('SLIC Watch configuration is invalid: ' + ajv.errorsText(slicWatchValidate.errors))
    }

    if (slicWatchConfig.enabled !== false) {
      const alarmActions = []

      if (slicWatchConfig.topicArn) {
        alarmActions.push(slicWatchConfig.topicArn)
      }

      const context = {
        region: event.region,
        stackName: (event.templateParameterValues.stack) ? event.templateParameterValues.stack : '',
        alarmActions
      }

      const cfTemplate = CloudFormationTemplate(
        outputFragment
      )
      const serverless = { cli: console }
      const functionAlarmConfigs = {}
      const functionDashboardConfigs = {}

      const lambdaResources = cfTemplate.getResourcesByType(
        'AWS::Lambda::Function'
      )
      for (const [, funcResource] of Object.entries(lambdaResources)) {
        const funcConfig = funcResource.Metadata.slicWatch || {}
        functionAlarmConfigs[funcResource.Properties.FunctionName] = funcConfig.alarms || {}
        functionDashboardConfigs[funcResource.Properties.FunctionName] = funcConfig.dashboard || {}
      }

      const alarmService = alarms(serverless, config.alarms, functionAlarmConfigs, context)
      alarmService.addAlarms(cfTemplate)
      const dashboardService = dashboard(serverless, config.dashboard, functionDashboardConfigs, context)
      dashboardService.addDashboard(cfTemplate)
      outputFragment = cfTemplate.getSourceObject()
    }
  } catch (err) {
    console.error(err)
    status = 'fail'
  }

  return {
    requestId: event.requestId,
    status: status,
    fragment: outputFragment
  }
}

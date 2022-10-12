'use strict'

const _ = require('lodash')
const Ajv = require('ajv')

const alarms = require('slic-watch-core/alarms')
const dashboard = require('slic-watch-core/dashboard')
const CloudFormationTemplate = require('slic-watch-core/cf-template')
const defaultConfig = require('slic-watch-core/default-config')
const { slicWatchSchema } = require('slic-watch-core/config-schema')
const { getLogger } = require('slic-watch-core/logging')

const logger = getLogger({ name: 'macroHandler' })

exports.handler = async function (event) {
  let status = 'success'
  logger.info({ event })

  let outputFragment = event.fragment
  try {
    const slicWatchConfig = (outputFragment.Metadata || {}).slicWatch || {}

    if (slicWatchConfig.enabled !== false) {
      const ajv = new Ajv({
        unicodeRegExp: false
      })
      const config = _.merge(defaultConfig, slicWatchConfig)

      const slicWatchValidate = ajv.compile(slicWatchSchema)
      const slicWatchValid = slicWatchValidate(slicWatchConfig)

      if (!slicWatchValid) {
        throw new Error('SLIC Watch configuration is invalid: ' + ajv.errorsText(slicWatchValidate.errors))
      }

      const alarmActions = []

      if (slicWatchConfig.topicArn) {
        alarmActions.push(slicWatchConfig.topicArn)
      } else if (process.env.SNSTopic) {
        alarmActions.push(process.env.SNSTopic)
      }

      const context = {
        alarmActions
      }

      const cfTemplate = CloudFormationTemplate(
        outputFragment
      )
      const functionAlarmConfigs = {}
      const functionDashboardConfigs = {}

      const lambdaResources = cfTemplate.getResourcesByType(
        'AWS::Lambda::Function'
      )

      for (const [funcResourceName, funcResource] of Object.entries(lambdaResources)) {
        const funcConfig = funcResource.Metadata?.slicWatch || {}
        functionAlarmConfigs[funcResourceName] = funcConfig.alarms || {}
        functionDashboardConfigs[funcResourceName] = funcConfig.dashboard || {}
      }

      const alarmService = alarms(config.alarms, functionAlarmConfigs, context)
      alarmService.addAlarms(cfTemplate)
      const dashboardService = dashboard(config.dashboard, functionDashboardConfigs, context)
      dashboardService.addDashboard(cfTemplate)
      outputFragment = cfTemplate.getSourceObject()
    }
  } catch (err) {
    console.error(err)
    status = 'fail'
  }
  logger.info({ outputFragment })

  return {
    requestId: event.requestId,
    status: status,
    fragment: outputFragment
  }
}

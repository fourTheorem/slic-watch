'use strict'

import _ from 'lodash'
import Ajv from 'ajv'

import alarms from 'slic-watch-core/alarms/alarms'
import dashboard from 'slic-watch-core/dashboards/dashboard'
import CloudFormationTemplate from 'slic-watch-core/cf-template'
import defaultConfig from 'slic-watch-core/default-config'
import { slicWatchSchema}  from 'slic-watch-core/config-schema'
import { getLogger } from 'slic-watch-core/logging'

const logger = getLogger({ name: 'macroHandler' })

type Event = {
  requestId
  status: string
  fragment
}
export async function handler (event: Event) {
  let status = 'success'
  logger.info({ event })
  

  let outputFragment = event.fragment
  try {
    const slicWatchConfig = (outputFragment.Metadata || {}).slicWatch || {}

    if (slicWatchConfig.enabled !== false) {
      const ajv = new Ajv({
        unicodeRegExp: false
      })
      const config = _.merge(defaultConfig, slicWatchConfig )

      const slicWatchValidate = ajv.compile(slicWatchSchema )
      const slicWatchValid = slicWatchValidate(slicWatchConfig)

      if (!slicWatchValid) {
        throw new Error('SLIC Watch configuration is invalid: ' + ajv.errorsText(slicWatchValidate.errors))
      }

      const alarmActions = []
      // @ts-ignore
      if (slicWatchConfig.topicArn) {
        // @ts-ignore
        alarmActions.push(slicWatchConfig.topicArn)
      } else if (process.env.ALARM_SNS_TOPIC) {
        // @ts-ignore
        alarmActions.push(process.env.ALARM_SNS_TOPIC)
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
        // @ts-ignore
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

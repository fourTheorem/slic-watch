import _ from 'lodash'
import Ajv from 'ajv'
import pino from 'pino'

import addAlarms from '../core/alarms/alarms'
import addDashboard from '../core/dashboards/dashboard'
import defaultConfig from '../core/inputs/default-config'
import { slicWatchSchema } from '../core/inputs/config-schema'
import { getResourcesByType } from '../core/cf-template'

const logger = pino({ name: 'macroHandler' })

interface Event {
  requestId?
  status?: string
  fragment
}

interface SlicWatchConfig {
  topicArn?: string
  enabled?: boolean
}
export function handler (event: Event) {
  let status = 'success'
  logger.info({ event })
  const outputFragment = event.fragment
  try {
    const slicWatchConfig: SlicWatchConfig = outputFragment.Metadata?.slicWatch ?? {}
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

      const alarmActions: string[] = []
      slicWatchConfig?.topicArn != null && alarmActions.push(slicWatchConfig.topicArn)
      process.env.ALARM_SNS_TOPIC != null && alarmActions.push(process.env.ALARM_SNS_TOPIC)

      const context = {
        alarmActions
      }
      const functionAlarmConfigs = {}
      const functionDashboardConfigs = {}

      const lambdaResources = getResourcesByType(
        'AWS::Lambda::Function',
        outputFragment
      )

      for (const [funcResourceName, funcResource] of Object.entries(lambdaResources)) {
        const funcConfig = funcResource.Metadata?.slicWatch ?? {}
        functionAlarmConfigs[funcResourceName] = funcConfig.alarms ?? {}
        functionDashboardConfigs[funcResourceName] = funcConfig.dashboard
      }

      _.merge(outputFragment)
      addAlarms(config.alarms, functionAlarmConfigs, context, outputFragment)
      addDashboard(config.dashboard, functionDashboardConfigs, outputFragment)
    }
  } catch (err) {
    logger.error(err)
    status = 'fail'
  }
  logger.info({ outputFragment })

  return {
    requestId: event.requestId,
    status,
    fragment: outputFragment
  }
}

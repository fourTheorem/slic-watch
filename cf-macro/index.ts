import _ from 'lodash'
import pino from 'pino'

import { addAlarms, addDashboard, getResourcesByType } from '../core/index'
import { setLogger } from 'slic-watch-core/logging'
import { type SlicWatchConfig, resolveSlicWatchConfig } from 'slic-watch-core/inputs/general-config'

const logger = pino({ name: 'macroHandler' })
setLogger(logger)

interface Event {
  requestId?
  status?: string
  fragment
}

// macro requires handler to be async
export async function handler (event: Event) {
  let status = 'success'
  let errorMessage: string | undefined

  logger.info({ event })
  const outputFragment = event.fragment
  try {
    const slicWatchConfig: SlicWatchConfig = outputFragment.Metadata?.slicWatch ?? {}

    const config = resolveSlicWatchConfig(slicWatchConfig)

    const functionAlarmConfigs = {}
    const functionDashboardConfigs = {}

    const lambdaResources = getResourcesByType('AWS::Lambda::Function', outputFragment)

    for (const [funcResourceName, funcResource] of Object.entries(lambdaResources)) {
      const funcConfig = funcResource.Metadata?.slicWatch ?? {}
      functionAlarmConfigs[funcResourceName] = funcConfig.alarms ?? {}
      functionDashboardConfigs[funcResourceName] = funcConfig.dashboard
    }

    _.merge(outputFragment)
    addAlarms(config.alarms, functionAlarmConfigs, config.alarmActionsConfig, outputFragment)
    addDashboard(config.dashboard, functionDashboardConfigs, outputFragment)
  } catch (err) {
    logger.error(err)
    errorMessage = (err as Error).message
    status = 'fail'
  }

  logger.info({ outputFragment })

  return {
    status,
    errorMessage,
    requestId: event.requestId,
    fragment: outputFragment
  }
}

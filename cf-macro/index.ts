import _ from 'lodash'
import pino from 'pino'

import { addAlarms, addDashboard, getResourcesByType } from '../core/index'
import { setLogger } from 'slic-watch-core/logging'
import { type SlicWatchConfig, resolveSlicWatchConfig } from 'slic-watch-core/inputs/general-config'
import { type Template } from 'cloudform-types'

const logger = pino({ name: 'macroHandler', level: process.env.DEBUG_LEVEL ?? 'DEBUG' })

setLogger(logger)

interface Event {
  requestId: string
  fragment: Template
}

interface MacroResponse {
  requestId: string
  status: string
  errorMessage?: string
  fragment?: Template
}

/**
 * CloudFormation Macro implementation. Accepts the CloudFormation fragment to be transformed
 * and generates the transformed teamplte with alarms and dashboard
 */
export async function handler (event: Event): Promise<MacroResponse> {
  let status = 'success'
  let errorMessage: string | undefined

  logger.debug({ event })
  const transformedTemplate = event.fragment
  let outputFragment: Template | undefined
  try {
    const slicWatchConfig: SlicWatchConfig = transformedTemplate.Metadata?.slicWatch ?? {}

    const config = resolveSlicWatchConfig(slicWatchConfig)

    const functionAlarmConfigs = {}
    const functionDashboardConfigs = {}

    const lambdaResources = getResourcesByType('AWS::Lambda::Function', transformedTemplate)

    for (const [funcResourceName, funcResource] of Object.entries(lambdaResources)) {
      const funcConfig = funcResource.Metadata?.slicWatch ?? {}
      functionAlarmConfigs[funcResourceName] = funcConfig.alarms ?? {}
      functionDashboardConfigs[funcResourceName] = funcConfig.dashboard
    }

    _.merge(transformedTemplate)
    addAlarms(config.alarms, functionAlarmConfigs, config.alarmActionsConfig, transformedTemplate)
    addDashboard(config.dashboard, functionDashboardConfigs, transformedTemplate)
    outputFragment = transformedTemplate
  } catch (err) {
    logger.error(err)
    errorMessage = (err as Error).message
    status = 'fail'
  }

  logger.debug({ outputFragment: transformedTemplate })

  return {
    status,
    errorMessage,
    requestId: event.requestId,
    fragment: outputFragment
  }
}

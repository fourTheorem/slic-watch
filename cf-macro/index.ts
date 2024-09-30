import { type Template } from 'cloudform-types'
import pino from 'pino'

import { addAlarms, addDashboard } from 'slic-watch-core/index'
import { setLogger } from 'slic-watch-core/logging'
import { type SlicWatchConfig, resolveSlicWatchConfig } from 'slic-watch-core/inputs/general-config'

const logger = pino({ name: 'macroHandler', level: process.env.DEBUG_LEVEL ?? 'debug' })

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
 * and generates the transformed template with alarms and dashboard
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

    addAlarms(config.alarms, config.alarmActionsConfig, transformedTemplate)
    addDashboard(config.dashboard, transformedTemplate)
    outputFragment = transformedTemplate
  } catch (err) {
    logger.error({ err })
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

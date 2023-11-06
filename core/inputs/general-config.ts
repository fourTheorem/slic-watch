import { merge } from 'lodash'
import Ajv from 'ajv'
import { type AlarmActionsConfig } from '../alarms/alarm-types'
import { slicWatchSchema } from './config-schema'
import { defaultConfig, type DefaultConfig } from './default-config'

export interface SlicWatchConfig {
  /**
   * Legacy way to specify the SNS Topic ARN for Alarm actions
   */
  topicArn?: string
  /**
   * Recommended way to specify the SNS Topic ARN for Alarm and OK status actions
   */
  alarmActionsConfig?: AlarmActionsConfig
  /**
   * Enable or disable notifications to configured SNS Topics
   */
  enabled?: boolean
}

export interface ResolvedConfiguration extends DefaultConfig, SlicWatchConfig {
  enabled: boolean
  alarmActionsConfig: AlarmActionsConfig
}

export class ConfigError extends Error {
}

/**
 * Validates and transforms the user-provided top-level configuration for SLIC Watch.
 * The configuration is validated accoring to the config schema. Defaults are applied
 * where not provided by the user. Finally, the alarm actions are addded.
 *
 * @param slicWatchConfig The user-provided configuration
 * @returns Resolved configuration
 */
export function resolveSlicWatchConfig (slicWatchConfig: SlicWatchConfig): ResolvedConfiguration {
  const ajv = new Ajv({
    unicodeRegExp: false
  })
  const slicWatchValidate = ajv.compile(slicWatchSchema)
  const slicWatchValid = slicWatchValidate(slicWatchConfig)
  if (!slicWatchValid) {
    throw new ConfigError('SLIC Watch configuration is invalid: ' + ajv.errorsText(slicWatchValidate.errors))
  }

  // Resolve alarm actions using the older config syntax (topicArn) and the more flexible,
  // newer syntax (AlarmActionsConfig)
  const defaultAlarmActions: string[] = []
  if (slicWatchConfig.topicArn != null && slicWatchConfig.topicArn.length > 0) {
    defaultAlarmActions.push(slicWatchConfig.topicArn)
  }

  const alarmActionsConfig: AlarmActionsConfig = {
    actionsEnabled: slicWatchConfig.alarmActionsConfig?.actionsEnabled ?? true,
    alarmActions: (slicWatchConfig.alarmActionsConfig?.alarmActions ?? defaultAlarmActions),
    okActions: slicWatchConfig.alarmActionsConfig?.okActions ?? []
  }

  const config = merge(defaultConfig, slicWatchConfig)
  return {
    enabled: slicWatchConfig.enabled ?? true,
    ...config,
    alarmActionsConfig
  }
}

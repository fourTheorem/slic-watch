
import {get, merge} from 'lodash'

import { cascade } from './cascading-config'
import defaultConfig from './default-config'
import type { SlicWatchLambdaAlarmsConfig } from '../alarms/lambda'
import { type SlicWatchMergedConfig } from '../alarms/alarm-types'

/**
 * Merges the global Lambda alarm configuration with any function-specific overrides, ensuring
 * that function overrides take precedence over any global configuration
 *
 * cascadedLambdaAlarmConfig
 * functionAlarmConfig An object per function name specifying any function-specific alarm configuration overrides
 * A per-function configuration consolidating all inputs
 */
function applyAlarmConfig (cascadedLambdaAlarmConfig, functionAlarmConfigs): SlicWatchLambdaAlarmsConfig<SlicWatchMergedConfig> {
  // Add all alarm properties to functionAlarmConfig so we can cascade top-level configuration down
  const mergedFuncAlarmConfigs = {}
  for (const func of Object.keys(functionAlarmConfigs)) {
    const funcConfig = { ...(functionAlarmConfigs[func].Lambda ?? {}) }
    for (const metric of Object.keys(defaultConfig.alarms.Lambda ?? {})) {
      funcConfig[metric] = get(functionAlarmConfigs, [func, 'Lambda', metric], {})
    }
    mergedFuncAlarmConfigs[func] = merge({}, cascadedLambdaAlarmConfig, cascade(funcConfig))
  }
  return mergedFuncAlarmConfigs as SlicWatchLambdaAlarmsConfig<SlicWatchMergedConfig>
}

/**
 * Support for function-specific configuration for AWS Lambda overrides at a function level
 */
export {
  applyAlarmConfig
}

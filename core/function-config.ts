'use strict'

import merge from 'lodash/merge'
import get from 'lodash/get'

import { cascade } from './cascading-config'
import defaultConfig from './default-config'
import { FunctionAlarmConfigs } from './default-config-alarms'
import { LambdaFunctionAlarmConfigs } from './alarms-lambda'

/**
 * Support for function-specific configuration for AWS Lambda overrides at a function level
 */
export {
  applyAlarmConfig
}

/**
 * Merges the global Lambda alarm configuration with any function-specific overrides, ensuring
 * that function overrides take precedence over any global configuration
 *
 * cascadedLambdaAlarmConfig
 * functionAlarmConfig An object per function name specifying any function-specific alarm configuration overrides
 * A per-function configuration consolidating all inputs
 */
function applyAlarmConfig (cascadedLambdaAlarmConfig: LambdaFunctionAlarmConfigs, functionAlarmConfigs:FunctionAlarmConfigs) {
  // Add all alarm properties to functionAlarmConfig so we can cascade top-level configuration down
  const mergedFuncAlarmConfigs = {}
  for (const func of Object.keys(functionAlarmConfigs)) {
    const funcConfig = { ...(functionAlarmConfigs[func].Lambda || {}) }
    // @ts-ignore
    for (const metric of Object.keys(defaultConfig.alarms.Lambda)) {
      funcConfig[metric] = get(functionAlarmConfigs, [func, 'Lambda', metric], {})
    }
    mergedFuncAlarmConfigs[func] = merge({}, cascadedLambdaAlarmConfig, cascade(funcConfig))
  }
  return mergedFuncAlarmConfigs
}

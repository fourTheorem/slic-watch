'use strict'

import { getResourcesByType } from '../cf-template'
import type { Context, DefaultAlarmsProperties, CfAlarmsProperties } from './default-config-alarms'
import { createAlarm } from './default-config-alarms'
import type Template from 'cloudform-types/types/template'

export interface SfAlarmsConfig {
  enabled?: boolean
  Statistic: string
  ExecutionThrottled: DefaultAlarmsProperties
  ExecutionsFailed: DefaultAlarmsProperties
  ExecutionsTimedOut: DefaultAlarmsProperties
}

const executionMetrics = [
  'ExecutionThrottled',
  'ExecutionsFailed',
  'ExecutionsTimedOut'
]

/**
 * @param {object} sfAlarmProperties The fully resolved States alarm configuration
 */
export default function createStatesAlarms (sfAlarmProperties: SfAlarmsConfig, context: Context, compiledTemplate: Template) {
  /**
   * Add all required Step Function alarms to the provided CloudFormation template
   * based on the resources found within
   *
   * A CloudFormation template object
   */

  const resources = {}
  const smResources = getResourcesByType('AWS::StepFunctions::StateMachine', compiledTemplate)

  for (const [logicalId] of Object.entries(smResources)) {
    for (const metric of executionMetrics) {
      const config: DefaultAlarmsProperties = sfAlarmProperties[metric]
      if (sfAlarmProperties[metric].enabled !== false) {
        const { enabled, ...rest } = config
        const smAlarmProperties: CfAlarmsProperties = {
          AlarmName: `StepFunctions_${metric}_\${${logicalId}.Name}`,
          AlarmDescription: `StepFunctions_${metric} ${config.Statistic} for \${${logicalId}.Name}  breaches ${config.Threshold}`,
          MetricName: metric,
          Namespace: 'AWS/States',
          Dimensions: [{ Name: 'StateMachineArn', Value: { Ref: logicalId } as any }],
          ...rest
        }
        const resourceName = `slicWatchStates${metric}Alarm${logicalId}`
        const resource = createAlarm(smAlarmProperties, context)
        resources[resourceName] = resource
      }
    }
  }
  return resources
}

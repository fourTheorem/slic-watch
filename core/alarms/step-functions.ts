'use strict'

import { getResourcesByType, addResource, type ResourceType } from '../cf-template'
import { type Context, createAlarm, type DefaultAlarmsProperties } from './default-config-alarms'
import { type AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'

export interface SfAlarmsConfig {
  enabled?: boolean
  Statistic: string
  ExecutionThrottled: DefaultAlarmsProperties
  ExecutionsFailed: DefaultAlarmsProperties
  ExecutionsTimedOut: DefaultAlarmsProperties
}

export type SmAlarm = AlarmProperties & {
  StateMachineArn: string
}

/**
 * @param {object} sfAlarmProperties The fully resolved States alarm configuration
 */
export default function createStatesAlarms (sfAlarmProperties: SfAlarmsConfig, context: Context, compiledTemplate: Template, additionalResources: ResourceType = {}): void {
  /**
   * Add all required Step Function alarms to the provided CloudFormation template
   * based on the resources found within
   *
   * A CloudFormation template object
   */
  const smResources = getResourcesByType('AWS::StepFunctions::StateMachine', compiledTemplate, additionalResources)
  const executionMetrics = [
    'ExecutionThrottled',
    'ExecutionsFailed',
    'ExecutionsTimedOut'
  ]

  for (const [logicalId] of Object.entries(smResources)) {
    for (const metric of executionMetrics) {
      if (sfAlarmProperties[metric].enabled !== false) {
        const config: DefaultAlarmsProperties = sfAlarmProperties[metric]
        const alarmResourceName = `slicWatchStates${metric}Alarm${logicalId}`
        const smAlarmProperties: SmAlarm = {
          AlarmName: `StepFunctions_${metric}_\${${logicalId}.Name}`,
          AlarmDescription: `StepFunctions_${metric} ${config.Statistic} for \${${logicalId}.Name}  breaches ${config.Threshold}`,
          StateMachineArn: `${logicalId}`,
          MetricName: metric,
          Namespace: 'AWS/States',
          Dimensions: [{ Name: 'StateMachineArn', Value: { Ref: logicalId } as any }],
          ...config
        }
        const alarmResource = createAlarm(smAlarmProperties, context)
        addResource(alarmResourceName, alarmResource, compiledTemplate)
      }
    }
  }
}

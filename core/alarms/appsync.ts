import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'
import { Fn } from 'cloudform'

import type { AlarmActionsConfig, CloudFormationResources, InputOutput, SlicWatchAlarmConfig, SlicWatchMergedConfig } from './alarm-types'
import { createAlarm, getStatisticName, makeAlarmLogicalId } from './alarm-utils'
import { getResourcesByType } from '../cf-template'

export interface SlicWatchAppSyncAlarmsConfig<T extends InputOutput> extends SlicWatchAlarmConfig {
  '5XXError': T
  Latency: T
}

const executionMetrics = ['5XXError', 'Latency']

/**
 * Add all required AppSync alarms to the provided CloudFormation template
 * based on the AppSync resources found within
 *
 * @param appSyncAlarmsConfig The fully resolved alarm configuration
 * @param alarmActionsConfig Notification configuration for alarm status change events
 * @param compiledTemplate  A CloudFormation template object
 *
 * @returns AppSync-specific CloudFormation Alarm resources
 */
export default function createAppSyncAlarms (
  appSyncAlarmsConfig: SlicWatchAppSyncAlarmsConfig<SlicWatchMergedConfig>, alarmActionsConfig: AlarmActionsConfig, compiledTemplate: Template
): CloudFormationResources {
  const resources = {}
  const appSyncResources = getResourcesByType('AWS::AppSync::GraphQLApi', compiledTemplate)

  for (const [appSyncLogicalId, appSyncResource] of Object.entries(appSyncResources)) {
    for (const metric of executionMetrics) {
      const config: SlicWatchMergedConfig = appSyncAlarmsConfig[metric]
      if (config.enabled) {
        const { enabled, ...rest } = config
        const graphQLName: string = appSyncResource.Properties?.Name
        const appSyncAlarmProperties: AlarmProperties = {
          AlarmName: `AppSync_${metric}Alarm_${graphQLName}`,
          AlarmDescription: `AppSync ${metric} ${getStatisticName(config)} for ${graphQLName} breaches ${config.Threshold}`,
          MetricName: metric,
          Namespace: 'AWS/AppSync',
          Dimensions: [
            { Name: 'GraphQLAPIId', Value: Fn.GetAtt(appSyncLogicalId, 'ApiId') }
          ],
          ...rest
        }
        const alarmLogicalId = makeAlarmLogicalId('AppSync', graphQLName, metric)
        const resource = createAlarm(appSyncAlarmProperties, alarmActionsConfig)
        resources[alarmLogicalId] = resource
      }
    }
  }
  return resources
}

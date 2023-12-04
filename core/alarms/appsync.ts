import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'
import { Fn } from 'cloudform'

import type { AlarmActionsConfig, CloudFormationResources, InputOutput, SlicWatchMergedConfig } from './alarm-types'
import { createAlarm, getStatisticName, makeAlarmLogicalId } from './alarm-utils'
import { getResourceAlarmConfigurationsByType } from '../cf-template'
import { ConfigType } from '../inputs/config-types'

export type SlicWatchAppSyncAlarmsConfig<T extends InputOutput> = T & {
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
  const configuredResources = getResourceAlarmConfigurationsByType(ConfigType.AppSync, compiledTemplate, appSyncAlarmsConfig)

  for (const [appSyncLogicalId, appSyncResource] of Object.entries(configuredResources.resources)) {
    for (const metric of executionMetrics) {
      const config: SlicWatchMergedConfig = configuredResources.alarmConfigurations[appSyncLogicalId][metric]
      const { enabled, ...rest } = config
      if (enabled) {
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

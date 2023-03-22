'use strict'

import { getResourcesByType } from '../cf-template'
import type { Context, DefaultAlarmsProperties, CfAlarmsProperties } from './default-config-alarms'
import { createAlarm } from './default-config-alarms'
import { getStatisticName } from './get-statistic-name'
import { makeResourceName } from './make-name'
import type Template from 'cloudform-types/types/template'

export interface AppSyncAlarmsConfig {
  enabled?: boolean
  '5XXError': DefaultAlarmsProperties
  Latency: DefaultAlarmsProperties
}

type AppSyncMetrics = '5XXError' | 'Latency'

const executionMetrics: AppSyncMetrics[] = ['5XXError', 'Latency']

/**
 * AppSyncAlarmsConfig The fully resolved alarm configuration
 */
export default function createAppSyncAlarms (appSyncAlarmsConfig: AppSyncAlarmsConfig, context: Context, compiledTemplate: Template) {
  /**
   * Add all required AppSync alarms to the provided CloudFormation template
   * based on the AppSync resources found within
   *
   * A CloudFormation template object
   */

  const resources = {}
  const appSyncResources = getResourcesByType('AWS::AppSync::GraphQLApi', compiledTemplate)

  for (const [appSyncResourceName, appSyncResource] of Object.entries(appSyncResources)) {
    for (const metric of executionMetrics) {
      const config: DefaultAlarmsProperties = appSyncAlarmsConfig[metric]
      const { enabled, ...rest } = config
      if (config.enabled !== false) {
        const graphQLName: string = appSyncResource.Properties?.Name
        const AppSyncAlarmsConfig: CfAlarmsProperties = {
          AlarmName: `AppSync${metric}Alarm_${graphQLName}`,
          AlarmDescription: `AppSync ${metric} ${getStatisticName(config)} for ${graphQLName} breaches ${config.Threshold}`,
          MetricName: metric,
          Namespace: 'AWS/AppSync',
          Dimensions: [
            { Name: 'GraphQLAPIId', Value: `\${${appSyncResourceName}.ApiId}}` }
          ],
          ...rest
        }
        const resourceName = makeResourceName('AppSync', graphQLName, metric)
        const resource = createAlarm(AppSyncAlarmsConfig, context)
        resources[resourceName] = resource
      }
    }
  }
  return resources
}

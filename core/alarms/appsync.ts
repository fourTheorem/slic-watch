'use strict'

import { getResourcesByType, addResource, type ResourceType } from '../cf-template'
import { type Context, createAlarm, type DefaultAlarmsProperties } from './default-config-alarms'
import { getStatisticName } from './get-statistic-name'
import { makeResourceName } from './make-name'
import { type AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'
import type Template from 'cloudform-types/types/template'

export interface AppSyncAlarmProperties {
  enabled?: boolean
  '5XXError': DefaultAlarmsProperties
  Latency: DefaultAlarmsProperties
}

export type AppSyncAlarm = AlarmProperties & {
  AppSyncResourceName: string
}

type AppSyncMetrics = '5XXError' | 'Latency'

const executionMetrics: AppSyncMetrics[] = ['5XXError', 'Latency']

/**
 * appSyncAlarmProperties The fully resolved alarm configuration
 */
export default function createAppSyncAlarms (appSyncAlarmProperties: AppSyncAlarmProperties, context: Context, compiledTemplate: Template, additionalResources: ResourceType = {}) {
  /**
   * Add all required AppSync alarms to the provided CloudFormation template
   * based on the AppSync resources found within
   *
   * A CloudFormation template object
   */
  const appSyncResources = getResourcesByType('AWS::AppSync::GraphQLApi', compiledTemplate, additionalResources)

  for (const [appSyncResourceName, appSyncResource] of Object.entries(appSyncResources)) {
    for (const metric of executionMetrics) {
      const config = appSyncAlarmProperties[metric]
      if (config.enabled !== false) {
        const graphQLName: string = appSyncResource.Properties?.Name
        const threshold = config.Threshold
        delete config.enabled
        const appSyncAlarmProperties: AppSyncAlarm = {
          AlarmName: `AppSync${metric}Alarm_${graphQLName}`,
          AlarmDescription: `AppSync ${metric} ${getStatisticName(config)} for ${graphQLName} breaches ${threshold}`,
          AppSyncResourceName: appSyncResourceName,
          MetricName: metric,
          Namespace: 'AWS/AppSync',
          Dimensions: [
            { Name: 'GraphQLAPIId', Value: `\${${appSyncResourceName}.ApiId}}` }
          ],
          ...config
        }
        const resourceName = makeResourceName('AppSync', graphQLName, metric)
        const resource = createAlarm(appSyncAlarmProperties, context)
        addResource(resourceName, resource, compiledTemplate)
      }
    }
  }
}

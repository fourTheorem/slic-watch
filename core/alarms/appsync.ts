'use strict'

import { getResourcesByType, addResource } from '../cf-template'
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

type AppSyncMetrics = '5XXError' | 'Latency'

const executionMetrics: AppSyncMetrics[] = ['5XXError', 'Latency']

/**
 * appSyncAlarmProperties The fully resolved alarm configuration
 */
export default function createAppSyncAlarms (appSyncAlarmProperties: AppSyncAlarmProperties, context: Context, compiledTemplate: Template) {
  /**
   * Add all required AppSync alarms to the provided CloudFormation template
   * based on the AppSync resources found within
   *
   * A CloudFormation template object
   */
  const appSyncResources = getResourcesByType('AWS::AppSync::GraphQLApi', compiledTemplate)

  for (const [appSyncResourceName, appSyncResource] of Object.entries(appSyncResources)) {
    for (const metric of executionMetrics) {
      const config = appSyncAlarmProperties[metric]
      if (config.enabled !== false) {
        const graphQLName: string = appSyncResource.Properties?.Name
        delete config.enabled
        const appSyncAlarmProperties: AlarmProperties = {
          AlarmName: `AppSync${metric}Alarm_${graphQLName}`,
          AlarmDescription: `AppSync ${metric} ${getStatisticName(config)} for ${graphQLName} breaches ${config.Threshold}`,
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

'use strict'

import { getResourcesByType } from '../cf-template'
import type { Context, DefaultAlarmsProperties, CfAlarmsProperties } from './default-config-alarms'
import { createAlarm } from './default-config-alarms'
import { getStatisticName } from './get-statistic-name'
import { makeResourceName } from './make-name'
import type Template from 'cloudform-types/types/template'

export interface AlbAlarmProperties {
  enabled?: boolean
  HTTPCode_ELB_5XX_Count: DefaultAlarmsProperties
  RejectedConnectionCount: DefaultAlarmsProperties
}

type AlbMetrics = 'HTTPCode_ELB_5XX_Count' | 'RejectedConnectionCount'

const executionMetrics: AlbMetrics[] = [
  'HTTPCode_ELB_5XX_Count',
  'RejectedConnectionCount'
]

/**
 * albAlarmProperties The fully resolved alarm configuration
 */
export default function createALBAlarms (albAlarmProperties: AlbAlarmProperties, context: Context, compiledTemplate: Template) {
  /**
   * Add all required Application Load Balancer alarms for Application Load Balancer to the provided CloudFormation template
   * based on the resources found within
   *
   *  A CloudFormation template object
   */
  const loadBalancerResources = getResourcesByType('AWS::ElasticLoadBalancingV2::LoadBalancer', compiledTemplate)

  const resources = {}

  for (const [loadBalancerResourceName] of Object.entries(loadBalancerResources)) {
    for (const metric of executionMetrics) {
      const config = albAlarmProperties[metric]
      if (config.enabled !== false) {
        const { enabled, ...rest } = config
        const albAlarmProperties: CfAlarmsProperties = {
          AlarmName: `LoadBalancer${metric.replaceAll('_', '')}Alarm_${loadBalancerResourceName}`,
          AlarmDescription: `LoadBalancer ${metric} ${getStatisticName(config)} for ${loadBalancerResourceName} breaches ${config.Threshold}`,
          MetricName: metric,
          Namespace: 'AWS/ApplicationELB',
          Dimensions: [
            { Name: 'LoadBalancer', Value: `\${${loadBalancerResourceName}.LoadBalancerFullName}` }
          ],
          ...rest
        }
        const resourceName = makeResourceName('LoadBalancer', loadBalancerResourceName, metric)
        const resource = createAlarm(albAlarmProperties, context)
        resources[resourceName] = resource
      }
    }
  }
  return resources
}

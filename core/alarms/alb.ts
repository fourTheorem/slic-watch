
import type { Context, DefaultAlarmsProperties } from './default-config-alarms'
import { fetchAlarmResources } from './default-config-alarms'
import type Template from 'cloudform-types/types/template'
import { getStatisticName } from './get-statistic-name'

export interface AlbAlarmsConfig {
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
 * AlbAlarmsConfig The fully resolved alarm configuration
 * Add all required Application Load Balancer alarms for Application Load Balancer to the provided CloudFormation template
 * based on the resources found within
 *  A CloudFormation template object
 */
export default function createALBAlarms (albAlarmsConfig: AlbAlarmsConfig, context: Context, compiledTemplate: Template) {
  return fetchAlarmResources('AWS::ElasticLoadBalancingV2::LoadBalancer', 'LoadBalancer', executionMetrics, albAlarmsConfig, context, compiledTemplate,
    ({ metric, resourceName, config }) => ({
      AlarmName: `LoadBalancer${metric.replaceAll('_', '')}Alarm_${resourceName}`,
      AlarmDescription: `LoadBalancer ${metric} ${getStatisticName(config)} for ${resourceName} breaches ${config.Threshold}`,
      Namespace: 'AWS/ApplicationELB',
      Dimensions: [
        { Name: 'LoadBalancer', Value: `\${${resourceName}.LoadBalancerFullName}` }
      ]
    }))
}

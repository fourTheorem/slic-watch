import pino from 'pino'
import type { Entries } from 'type-fest'
import type Template from 'cloudform-types/types/template'
// import * as fs from 'fs'

import { cascade } from '../inputs/cascading-config'
import { getResourcesByType, getEventSourceMappingFunctions, addResource } from '../cf-template'
import type { ResourceType } from '../cf-template'
import type { CreateMetricWidget, DashboardBodyProperties, FunctionDashboardConfigs, MetricDefs, ServiceDashConfig, SlicWatchDashboardConfig, Widgets } from './dashboard-types'

// import { findLoadBalancersForTargetGroup } from '../alarms/alb-target-group'
import { resolveRestApiNameForSub } from '../alarms/api-gateway'
// import { resolveEcsClusterNameForSub, resolveGraphlQLId, resolveLoadBalancerFullNameForSub, resolveTargetGroupFullNameForSub } from './dashboard-utils'

import readme from './dashboard.md'

declare global {
  interface ObjectConstructor {
    // eslint-disable-next-line @typescript-eslint/method-signature-style
    entries<T extends object>(obj: T): Entries<T>
  }
}

const MAX_WIDTH = 24

const logger = pino()

/**
 * @param {*} dashboardConfig The global plugin dashboard configuration
 * @param {*} functionDashboardConfigs The dashboard configuration override by function name
 * @param {*} compiledTemplate A CloudFormation template object
 */
export default function addDashboard (dashboardConfig: SlicWatchDashboardConfig, functionDashboardConfigs: FunctionDashboardConfigs, compiledTemplate: Template) {
  const {
    timeRange,
    widgets: {
      Lambda: lambdaDashConfig,
      ApiGateway: apiGwDashConfig
      // States: sfDashConfig,
      // DynamoDB: dynamoDbDashConfig,
      // Kinesis: kinesisDashConfig,
      // SQS: sqsDashConfig,
      // ECS: ecsDashConfig,
      // SNS: snsDashConfig,
      // Events: ruleDashConfig,
      // ApplicationELB: albDashConfig,
      // ApplicationELBTarget: albTargetDashConfig,
      // AppSync: appSyncDashConfig
    }
  } = cascade(dashboardConfig) as SlicWatchDashboardConfig

  /**
   * Adds a dashboard to the specified CloudFormation template
   * based on the resources provided in the template.
   *
   * A CloudFormation template
   */
  const apiResources = getResourcesByType('AWS::ApiGateway::RestApi', compiledTemplate)
  // const stateMachineResources = getResourcesByType('AWS::StepFunctions::StateMachine', compiledTemplate)
  const lambdaResources = getResourcesByType('AWS::Lambda::Function', compiledTemplate)
  // const tableResources = getResourcesByType('AWS::DynamoDB::Table', compiledTemplate)
  // const streamResources = getResourcesByType('AWS::Kinesis::Stream', compiledTemplate)
  // const queueResources = getResourcesByType('AWS::SQS::Queue', compiledTemplate)
  // const ecsServiceResources = getResourcesByType('AWS::ECS::Service', compiledTemplate)
  // const topicResources = getResourcesByType('AWS::SNS::Topic', compiledTemplate)
  // const ruleResources = getResourcesByType('AWS::Events::Rule', compiledTemplate)
  // const loadBalancerResources = getResourcesByType('AWS::ElasticLoadBalancingV2::LoadBalancer', compiledTemplate)
  // const targetGroupResources = getResourcesByType('AWS::ElasticLoadBalancingV2::TargetGroup', compiledTemplate)

  // const appSyncResources = getResourcesByType('AWS::AppSync::GraphQLApi', compiledTemplate)

  const textWidget = createTextWidget('', dashboardConfig)
  const eventSourceMappingFunctions = getEventSourceMappingFunctions(compiledTemplate)
  const apiWidgets = createApiWidgets(apiResources)
  // const stateMachineWidgets = createStateMachineWidgets(stateMachineResources)
  // const dynamoDbWidgets = createDynamoDbWidgets(tableResources)
  const lambdaWidgets = createLambdaWidgets(lambdaResources, Object.keys(eventSourceMappingFunctions))
  // const streamWidgets = createStreamWidgets(streamResources)
  // const queueWidgets = createQueueWidgets(queueResources)
  // const ecsWidgets = createEcsWidgets(ecsServiceResources)
  // const topicWidgets = createTopicWidgets(topicResources)
  // const ruleWidgets = createRuleWidgets(ruleResources)
  // const loadBalancerWidgets = createLoadBalancerWidgets(loadBalancerResources)
  // const targetGroupWidgets = createTargetGroupWidgets(targetGroupResources, compiledTemplate)
  // const appSyncWidgets = createAppSyncWidgets(appSyncResources)

  const positionedWidgets = layOutWidgets([
    ...apiWidgets,
    // ...stateMachineWidgets,
    // ...dynamoDbWidgets,
    ...lambdaWidgets,
    // ...streamWidgets,
    // ...queueWidgets,
    // ...ecsWidgets,
    // ...topicWidgets,
    // ...ruleWidgets,
    // ...loadBalancerWidgets,
    // ...targetGroupWidgets,
    // ...appSyncWidgets
    textWidget
  ])

  if (positionedWidgets.length > 0) {
    const dash = { start: timeRange?.start, end: timeRange?.end, widgets: positionedWidgets }
    const dashboardResource = {
      Type: 'AWS::CloudWatch::Dashboard',
      Properties: {
        DashboardName: { 'Fn::Sub': '${AWS::StackName}-${AWS::Region}-Dashboard' },
        DashboardBody: { 'Fn::Sub': JSON.stringify(dash) }
      }
    }
    addResource('slicWatchDashboard', dashboardResource, compiledTemplate)
  } else {
    logger.info('No dashboard widgets are enabled in SLIC Watch. Dashboard creation will be skipped.')
  }

  /**
   * Create a metric for the specified metrics
   *
   * @param {string} title The metric title
   * @param {Array.<object>} metricDefs The metric definitions to render
   * @param {Object} config Cascaded widget/metric configuration
   */
  function createMetricWidget (title: string, metricDefs: MetricDefs[], config: DashboardBodyProperties): CreateMetricWidget {
    const metrics = metricDefs.map(
      ({ namespace, metric, dimensions, stat, yAxis }) => [
        namespace,
        metric,
        ...Object.entries(dimensions).reduce(
          (acc: string[], [name, value]) => [...acc, name, value],
          []
        ),
        { stat, yAxis }
      ]
    )
    return {
      type: 'metric',
      properties: {
        metrics,
        title,
        view: 'timeSeries',
        region: '${AWS::Region}',
        period: config.metricPeriod
      },
      width: config.width as number,
      height: config.height as number
    }
  }

  /**
   * Create a metric for the specified metrics
   *
   * @param {string} title The metric title
   * @param {Array.<object>} metricDefs The metric definitions to render
   * @param {Object} config Cascaded widget/metric configuration
   */
  function createTextWidget (markdown: string, config: DashboardBodyProperties) {
    return {
      type: 'text',
      properties: {
        // markdown: fs.readFileSync('./dashboad.md').toString('utf-8'),
        markdown: readme
      },
      width: 3,
      height: 6
    }
  }

  /**
   * Create a set of CloudWatch Dashboard widgets for the Lambda
   * CloudFormation resources provided
   *
   * Object with CloudFormation Lambda Function resources by resource name
   * eventSourceMappingFunctionResourceNames Names of Lambda function resources that are linked to EventSourceMappings
   */
  function createLambdaWidgets (functionResources: FunctionDashboardConfigs, eventSourceMappingFunctionResourceNames: string[]): CreateMetricWidget[] {
    const lambdaWidgets: any = []
    if (Object.keys(functionResources).length > 0) {
      for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(lambdaDashConfig))) {
        if (metricConfig?.enabled !== false) {
          if (metric !== 'IteratorAge' as any) {
            for (const stat of metricConfig?.Statistic ?? []) {
              const metricDefs: MetricDefs[] = []
              for (const logicalId of Object.keys(functionResources)) {
                const functionConfig = functionDashboardConfigs[logicalId] ?? {}
                const functionMetricConfig = functionConfig[metric] ?? {}
                if (functionConfig.enabled !== false && (functionMetricConfig.enabled !== false)) {
                  metricDefs.push({
                    namespace: 'AWS/Lambda',
                    metric,
                    dimensions: { FunctionName: `\${${logicalId}}` },
                    stat
                  })
                }
              }

              if (metricDefs.length > 0) {
                const metricStatWidget = createMetricWidget(
                  `Lambda ${metric} ${stat} per Function`,
                  metricDefs,
                  metricConfig as Widgets
                )
                lambdaWidgets.push(metricStatWidget)
              }
            }
          } else {
            for (const logicalId of eventSourceMappingFunctionResourceNames) {
              const functionConfig = functionDashboardConfigs[logicalId] ?? {}
              const functionMetricConfig = functionConfig[metric] ?? {}
              if (functionConfig.enabled !== false && (functionMetricConfig.enabled !== false)) {
                const stats: string[] = []
                metricConfig?.Statistic?.forEach(a => stats.push(a))
                const iteratorAgeWidget = createMetricWidget(
                  `Lambda IteratorAge \${${logicalId}} ${stats?.join(',')}`,
                  stats.map(stat => ({
                    namespace: 'AWS/Lambda',
                    metric: 'IteratorAge',
                    dimensions: { FunctionName: `\${${logicalId}}` },
                    stat
                  })),
                  metricConfig as Widgets
                )
                lambdaWidgets.push(iteratorAgeWidget)
              }
            }
          }
        }
      }
    }
    return lambdaWidgets
  }

  /**
   * Extract the metrics from a service's dashboard configuration.
   * These config objects mix cascaded config literals (like `alarmPeriod: 300`) and metric
   * configurations (like `Errors: { Statistic: ['Sum'] }`) so here we extract the latter.
   *
   * @param serviceDashConfig t The config object for a specific service within the dashboard
   * @returns {Iterable} An iterable over the alarm-config Object entries
   */
  function getConfiguredMetrics (serviceDashConfig): ServiceDashConfig {
    return Object.fromEntries(Object.entries(serviceDashConfig).filter((_, metricConfig) => typeof metricConfig !== 'object'))
  }

  /**
   * Create a set of CloudWatch Dashboard widgets for the API Gateway REST API
   * CloudFormation resources provided
   *
   * Object of CloudFormation RestApi resources by resource name
   */

  function createApiWidgets (apiResources: ResourceType): any[] {
    const apiWidgets: any = []
    for (const [resourceName, res] of Object.entries(apiResources)) {
      const apiName: string = resolveRestApiNameForSub(res, resourceName) // e.g., ${AWS::Stack} (Ref), ${OtherResource.Name} (GetAtt)
      const widgetMetrics: MetricDefs[] = []
      for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(apiGwDashConfig))) {
        if (metricConfig?.enabled !== false) {
          for (const stat of metricConfig?.Statistic ?? []) {
            widgetMetrics.push({
              namespace: 'AWS/ApiGateway',
              metric,
              dimensions: {
                ApiName: apiName
              },
              stat
            })
          }
        }
        if (widgetMetrics.length > 0) {
          const metricStatWidget = createMetricWidget(
            `${metric} API ${apiName}`,
            widgetMetrics,
            apiGwDashConfig as Widgets
          )

          const textStatWidget = createTextWidget(
            'Hello world',
            apiGwDashConfig as Widgets
          )
          apiWidgets.push(textStatWidget)
          apiWidgets.push(metricStatWidget)
        }
      }
    }
    return apiWidgets
  }

  /**
   * Create a set of CloudWatch Dashboard widgets for the Step Function State Machines
   * CloudFormation resources provided
   *
   * Object of Step Function State Machine resources by resource name
   */
  // function createStateMachineWidgets (smResources: ResourceType): CreateMetricWidget[] {
  //   const smWidgets: CreateMetricWidget[] = []
  //   for (const [logicalId] of Object.entries(smResources)) {
  //     const widgetMetrics: MetricDefs[] = []
  //     for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(sfDashConfig))) {
  //       if (metricConfig?.enabled !== false) {
  //         for (const stat of metricConfig?.Statistic ?? []) {
  //           widgetMetrics.push({
  //             namespace: 'AWS/States',
  //             metric,
  //             dimensions: {
  //               StateMachineArn: `\${${logicalId}}`
  //             },
  //             stat
  //           })
  //         }
  //       }
  //     }
  //     if (widgetMetrics.length > 0) {
  //       const metricStatWidget = createMetricWidget(
  //         `\${${logicalId}.Name} Step Function Executions`,
  //         widgetMetrics,
  //         sfDashConfig as Widgets
  //       )
  //       smWidgets.push(metricStatWidget)
  //     }
  //   }
  //   return smWidgets
  // }

  /**
   * Create a set of CloudWatch Dashboard widgets for DynamoDB tables and global secondary indices.
   *
   * Object of DynamoDB table resources by resource name
   */
  // function createDynamoDbWidgets (tableResources: ResourceType): CreateMetricWidget[] {
  //   const ddbWidgets: CreateMetricWidget[] = []
  //   for (const [logicalId, res] of Object.entries(tableResources)) {
  //     const widgetMetrics: MetricDefs[] = []
  //     for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(dynamoDbDashConfig))) {
  //       if (metricConfig?.enabled !== false) {
  //         for (const stat of metricConfig?.Statistic ?? []) {
  //           widgetMetrics.push({
  //             namespace: 'AWS/DynamoDB',
  //             metric,
  //             dimensions: {
  //               TableName: `\${${logicalId}}`
  //             },
  //             stat
  //           })
  //         }
  //         if (widgetMetrics.length > 0) {
  //           const metricStatWidget = createMetricWidget(
  //             `${metric} Table $\{${logicalId}}`,
  //             widgetMetrics,
  //             dynamoDbDashConfig as Widgets
  //           )
  //           ddbWidgets.push(metricStatWidget)
  //         }
  //         for (const gsi of res.Properties?.GlobalSecondaryIndexes ?? []) {
  //           const gsiName: string = gsi.IndexName
  //           for (const stat of metricConfig?.Statistic ?? []) {
  //             widgetMetrics.push({
  //               namespace: 'AWS/DynamoDB',
  //               metric,
  //               dimensions: {
  //                 TableName: `\${${logicalId}}`,
  //                 GlobalSecondaryIndex: gsiName
  //               },
  //               stat
  //             })
  //           }
  //           if (widgetMetrics.length > 0) {
  //             const metricStatWidget = createMetricWidget(
  //               `${metric} GSI ${gsiName} in \${${logicalId}}`,
  //               widgetMetrics,
  //               dynamoDbDashConfig as Widgets
  //             )
  //             ddbWidgets.push(metricStatWidget)
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return ddbWidgets
  // }

  /**
   * Create a set of CloudWatch Dashboard widgets for the Kinesis Data Stream CloudFormation resources provided
   *
   * Object with CloudFormation Kinesis Data Stream resources by resource name
   */
  // function createStreamWidgets (streamResources: ResourceType): CreateMetricWidget[] {
  //   const streamWidgets: CreateMetricWidget[] = []

  //   const metricGroups = {
  //     IteratorAge: ['GetRecords.IteratorAgeMilliseconds'],
  //     'Get/Put Success': ['PutRecord.Success', 'PutRecords.Success', 'GetRecords.Success'],
  //     'Provisioned Throughput': ['ReadProvisionedThroughputExceeded', 'WriteProvisionedThroughputExceeded']
  //   }
  //   const metricConfigs = getConfiguredMetrics(kinesisDashConfig)

  //   for (const [logicalId] of Object.entries(streamResources)) {
  //     for (const [group, metrics] of Object.entries(metricGroups)) {
  //       const widgetMetrics: MetricDefs[] = []
  //       for (const metric of metrics) {
  //         const metricConfig = metricConfigs[metric]
  //         if (metricConfig.enabled as boolean) {
  //           for (const stat of metricConfig.Statistic) {
  //             widgetMetrics.push({
  //               namespace: 'AWS/Kinesis',
  //               metric,
  //               dimensions: { StreamName: `\${${logicalId}}` },
  //               stat
  //             })
  //           }
  //         }
  //       }
  //       if (widgetMetrics.length > 0) {
  //         streamWidgets.push(createMetricWidget(
  //           `${group} $\{${logicalId}} Kinesis`,
  //           widgetMetrics,
  //           kinesisDashConfig as Widgets
  //         ))
  //       }
  //     }
  //   }
  //   return streamWidgets
  // }

  /**
   * Create a set of CloudWatch Dashboard widgets for the SQS resources provided
   * Object with CloudFormation SQS resources by resource name
   */
  // function createQueueWidgets (queueResources: ResourceType): CreateMetricWidget[] {
  //   const queueWidgets: CreateMetricWidget[] = []

  //   const metricGroups = {
  //     Messages: ['NumberOfMessagesSent', 'NumberOfMessagesReceived', 'NumberOfMessagesDeleted'],
  //     'Oldest Message age': ['ApproximateAgeOfOldestMessage'],
  //     'Messages in queue': ['ApproximateNumberOfMessagesVisible']
  //   }
  //   const metricConfigs = getConfiguredMetrics(sqsDashConfig)

  //   for (const [logicalId] of Object.entries(queueResources)) {
  //     for (const [group, metrics] of Object.entries(metricGroups)) {
  //       const widgetMetrics: MetricDefs[] = []
  //       for (const metric of metrics) {
  //         const metricConfig = metricConfigs[metric]
  //         if (metricConfig.enabled !== false) {
  //           for (const stat of metricConfig.Statistic) {
  //             widgetMetrics.push({
  //               namespace: 'AWS/SQS',
  //               metric,
  //               dimensions: {
  //                 QueueName: `\${${logicalId}.QueueName}`
  //               },
  //               stat
  //             })
  //           }
  //         }
  //       }
  //       if (widgetMetrics.length > 0) {
  //         queueWidgets.push(createMetricWidget(
  //           `${group} \${${logicalId}.QueueName} SQS`,
  //           widgetMetrics,
  //           sqsDashConfig as Widgets
  //         ))
  //       }
  //     }
  //   }

  //   return queueWidgets
  // }

  /**
   * Create a set of CloudWatch Dashboard widgets for ECS services.
   *
   * Object of ECS Service resources by resource name
   */
  // function createEcsWidgets (ecsServiceResources: ResourceType): CreateMetricWidget[] {
  //   const ecsWidgets: CreateMetricWidget[] = []
  //   for (const [logicalId, res] of Object.entries(ecsServiceResources)) {
  //     const clusterName = resolveEcsClusterNameForSub(res.Properties?.Cluster)

  //     const widgetMetrics: MetricDefs[] = []
  //     for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(ecsDashConfig))) {
  //       if (metricConfig?.enabled !== false) {
  //         for (const stat of metricConfig?.Statistic ?? []) {
  //           widgetMetrics.push({
  //             namespace: 'AWS/ECS',
  //             metric,
  //             dimensions: {
  //               ServiceName: `\${${logicalId}.Name}`,
  //               ClusterName: clusterName
  //             },
  //             stat
  //           })
  //         }
  //       }
  //     }
  //     if (widgetMetrics.length > 0) {
  //       const metricStatWidget = createMetricWidget(
  //         `ECS Service \${${logicalId}.Name}`,
  //         widgetMetrics,
  //         ecsDashConfig as Widgets
  //       )
  //       ecsWidgets.push(metricStatWidget)
  //     }
  //   }
  //   return ecsWidgets
  // }

  /**
   * Create a set of CloudWatch Dashboard widgets for SNS services.
   *
   * Object of SNS Service resources by resource name
   */
  // function createTopicWidgets (topicResources: ResourceType): CreateMetricWidget[] {
  //   const topicWidgets: CreateMetricWidget[] = []
  //   for (const logicalId of Object.keys(topicResources)) {
  //     const widgetMetrics: MetricDefs[] = []
  //     for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(snsDashConfig))) {
  //       if (metricConfig?.enabled !== false) {
  //         for (const stat of metricConfig?.Statistic ?? []) {
  //           widgetMetrics.push({
  //             namespace: 'AWS/SNS',
  //             metric,
  //             dimensions: {
  //               TopicName: `\${${logicalId}.TopicName}`
  //             },
  //             stat
  //           })
  //         }
  //       }
  //     }
  //     if (widgetMetrics.length > 0) {
  //       const metricStatWidget = createMetricWidget(
  //         `SNS Topic \${${logicalId}.TopicName}`,
  //         widgetMetrics,
  //         snsDashConfig as Widgets
  //       )
  //       topicWidgets.push(metricStatWidget)
  //     }
  //   }
  //   return topicWidgets
  // }

  /**
   * Create a set of CloudWatch Dashboard widgets for EventBridge services.
   *
   *  Object of EventBridge Service resources by resource name
   */
  // function createRuleWidgets (ruleResources: ResourceType): CreateMetricWidget[] {
  //   const ruleWidgets: CreateMetricWidget[] = []
  //   for (const [logicalId] of Object.entries(ruleResources)) {
  //     const widgetMetrics: MetricDefs[] = []
  //     for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(ruleDashConfig))) {
  //       if (metricConfig?.enabled !== false) {
  //         for (const stat of metricConfig?.Statistic ?? []) {
  //           widgetMetrics.push({
  //             namespace: 'AWS/Events',
  //             metric,
  //             dimensions: { RuleName: `\${${logicalId}}` },
  //             stat
  //           })
  //         }
  //       }
  //     }
  //     if (widgetMetrics.length > 0) {
  //       const metricStatWidget = createMetricWidget(
  //         `EventBridge Rule \${${logicalId}}`,
  //         widgetMetrics,
  //         ruleDashConfig as Widgets
  //       )
  //       ruleWidgets.push(metricStatWidget)
  //     }
  //   }
  //   return ruleWidgets
  // }

  /**
   * Create a set of CloudWatch Dashboard widgets for Application Load Balancer services.
   *
   * Object of Application Load Balancer Service resources by resource name
   */
  // function createLoadBalancerWidgets (loadBalancerResources: ResourceType): CreateMetricWidget[] {
  //   const loadBalancerWidgets: CreateMetricWidget[] = []
  //   for (const [logicalId] of Object.entries(loadBalancerResources)) {
  //     const loadBalancerName = `\${${logicalId}.LoadBalancerName}`

  //     const loadBalancerFullName = resolveLoadBalancerFullNameForSub(logicalId)
  //     const widgetMetrics: MetricDefs[] = []
  //     for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(albDashConfig))) {
  //       if (metricConfig?.enabled !== false) {
  //         for (const stat of metricConfig?.Statistic ?? []) {
  //           widgetMetrics.push({
  //             namespace: 'AWS/ApplicationELB',
  //             metric,
  //             dimensions: {
  //               LoadBalancer: loadBalancerFullName
  //             },
  //             stat
  //           })
  //         }
  //       }
  //     }
  //     if (widgetMetrics.length > 0) {
  //       const metricStatWidget = createMetricWidget(
  //         `ALB ${loadBalancerName}`,
  //         widgetMetrics,
  //         albDashConfig as Widgets
  //       )
  //       loadBalancerWidgets.push(metricStatWidget)
  //     }
  //   }
  //   return loadBalancerWidgets
  // }

  /**
   * Create a set of CloudWatch Dashboard widgets for Application Load Balancer Target Group services .
   *
   * Object of Application Load Balancer Service Target Group resources by resource name
   * The full CloudFormation template instance used to look up associated listener and ALB resources
   */
  // function createTargetGroupWidgets (targetGroupResources: ResourceType, compiledTemplate): CreateMetricWidget[] {
  //   const targetGroupWidgets: CreateMetricWidget[] = []
  //   for (const [tgLogicalId, targetGroupResource] of Object.entries(targetGroupResources)) {
  //     const loadBalancerLogicalIds = findLoadBalancersForTargetGroup(tgLogicalId, compiledTemplate)
  //     for (const loadBalancerLogicalId of loadBalancerLogicalIds) {
  //       const targetGroupFullName = resolveTargetGroupFullNameForSub(tgLogicalId)
  //       const loadBalancerFullName = `\${${loadBalancerLogicalId}.LoadBalancerFullName}`
  //       const widgetMetrics: MetricDefs[] = []
  //       for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(albTargetDashConfig))) {
  //         if ((metricConfig?.enabled !== false) &&
  //           (targetGroupResource.Properties?.TargetType === 'lambda' || !['LambdaUserError', 'LambdaInternalError'].includes(metric))
  //         ) {
  //           for (const stat of metricConfig?.Statistic ?? []) {
  //             widgetMetrics.push({
  //               namespace: 'AWS/ApplicationELB',
  //               metric,
  //               dimensions: {
  //                 LoadBalancer: loadBalancerFullName,
  //                 TargetGroup: targetGroupFullName
  //               },
  //               stat
  //             })
  //           }
  //         }
  //       }
  //       if (widgetMetrics.length > 0) {
  //         const metricStatWidget = createMetricWidget(
  //           `Target Group \${${loadBalancerLogicalId}.LoadBalancerName}/\${${tgLogicalId}.TargetGroupName}`,
  //           widgetMetrics,
  //           albTargetDashConfig as Widgets
  //         )
  //         targetGroupWidgets.push(metricStatWidget)
  //       }
  //     }
  //   }
  //   return targetGroupWidgets
  // }

  /**
   * Create a set of CloudWatch Dashboard widgets for AppSync services.
   *
   * Object of AppSync Service resources by resource name
   */
  // function createAppSyncWidgets (appSyncResources: ResourceType): CreateMetricWidget[] {
  //   const appSyncWidgets: CreateMetricWidget[] = []
  //   const metricGroups = {
  //     API: ['5XXError', '4XXError', 'Latency', 'Requests'],
  //     'Real-time Subscriptions': ['ConnectServerError', 'DisconnectServerError', 'SubscribeServerError', 'UnsubscribeServerError', 'PublishDataMessageServerError']
  //   }
  //   const metricConfigs = getConfiguredMetrics(appSyncDashConfig)
  //   for (const res of Object.values(appSyncResources)) {
  //     const appSyncResourceName: string = res.Properties?.Name
  //     for (const [logicalId] of Object.entries(appSyncResources)) {
  //       const graphQLAPIId = resolveGraphlQLId(logicalId)
  //       for (const [group, metrics] of Object.entries(metricGroups)) {
  //         const widgetMetrics: MetricDefs[] = []
  //         for (const metric of metrics) {
  //           const metricConfig: DashboardBodyProperties | Widgets = metricConfigs[metric]
  //           if (metricConfig?.enabled !== false) {
  //             const stats: string[] = []
  //             metricConfig?.Statistic?.forEach(stat => stats.push(stat))
  //             for (const stat of stats) {
  //               widgetMetrics.push({
  //                 namespace: 'AWS/AppSync',
  //                 metric,
  //                 dimensions: { GraphQLAPIId: graphQLAPIId },
  //                 stat,
  //                 yAxis: metricConfig.yAxis
  //               })
  //             }
  //           }
  //         }
  //         if (widgetMetrics.length > 0) {
  //           appSyncWidgets.push(createMetricWidget(
  //             `AppSync ${group} ${appSyncResourceName}`,
  //             widgetMetrics,
  //             sqsDashConfig as Widgets
  //           ))
  //         }
  //       }
  //     }
  //   }
  //   return appSyncWidgets
  // }

  /**
   * Set the location and dimension properties of each provided widget
   *
   * A set of dashboard widgets
   * A set of dashboard widgets with layout properties set
   */
  function layOutWidgets (widgets: CreateMetricWidget[]) {
    let x = 0
    let y = 0

    return widgets.map((widget) => {
      const { width, height } = widget
      if (x + width > MAX_WIDTH) {
        y += height
        x = 0
      }
      const positionedWidget = {
        ...widget,
        x,
        y
      }
      x += width
      return positionedWidget
    })
  }
}

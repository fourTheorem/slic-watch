import type Template from 'cloudform-types/types/template'
import { type Dashboard, type WidgetMetric, type Statistic, type YAxisPosition } from 'cloudwatch-dashboard-types'

import { cascade } from '../inputs/cascading-config'
import { getEventSourceMappingFunctions, addResource, getResourceDashboardConfigurationsByType } from '../cf-template'
import type {
  WidgetMetricProperties, MetricDefs, SlicWatchDashboardConfig, SlicWatchInputDashboardConfig,
  Widgets, WidgetWithSize
} from './dashboard-types'

import { findLoadBalancersForTargetGroup } from '../alarms/alb-target-group'
import { resolveRestApiNameForSub } from '../alarms/api-gateway'
import {
  resolveEcsClusterNameForSub, resolveGraphQLId,
  resolveLoadBalancerFullNameForSub, resolveTargetGroupFullNameForSub
} from './dashboard-utils'
import { getLogger } from '../logging'

const MAX_WIDTH = 24

const logger = getLogger()

/**
 * Adds a dashboard to the specified CloudFormation template based on the resources provided in the template.
 *
 * A CloudFormation template
 *
 * @param {*} dashboardConfig The global plugin dashboard configuration
 * @param {*} compiledTemplate A CloudFormation template object
 */
export default function addDashboard (dashboardConfig: SlicWatchInputDashboardConfig, compiledTemplate: Template) {
  const {
    timeRange,
    widgets: {
      Lambda: lambdaDashConfig,
      ApiGateway: apiGwDashConfig,
      States: sfDashConfig,
      DynamoDB: dynamoDbDashConfig,
      Kinesis: kinesisDashConfig,
      SQS: sqsDashConfig,
      ECS: ecsDashConfig,
      SNS: snsDashConfig,
      Events: ruleDashConfig,
      ApplicationELB: albDashConfig,
      ApplicationELBTarget: albTargetDashConfig,
      AppSync: appSyncDashConfig
    }
  } = cascade(dashboardConfig) as SlicWatchDashboardConfig

  const apiWidgets = createApiWidgets()
  const stateMachineWidgets = createStateMachineWidgets()
  const dynamoDbWidgets = createDynamoDbWidgets()
  const lambdaWidgets = createLambdaWidgets()
  const streamWidgets = createStreamWidgets()
  const queueWidgets = createQueueWidgets()
  const ecsWidgets = createEcsWidgets()
  const topicWidgets = createTopicWidgets()
  const ruleWidgets = createRuleWidgets()
  const loadBalancerWidgets = createLoadBalancerWidgets()
  const targetGroupWidgets = createTargetGroupWidgets()
  const appSyncWidgets = createAppSyncWidgets()

  const positionedWidgets = layOutWidgets([
    ...apiWidgets,
    ...stateMachineWidgets,
    ...dynamoDbWidgets,
    ...lambdaWidgets,
    ...streamWidgets,
    ...queueWidgets,
    ...ecsWidgets,
    ...topicWidgets,
    ...ruleWidgets,
    ...loadBalancerWidgets,
    ...targetGroupWidgets,
    ...appSyncWidgets
  ])

  if (positionedWidgets.length > 0) {
    const dash: Dashboard = { start: timeRange?.start, end: timeRange?.end, widgets: positionedWidgets }
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
   * TODO - allow Widget Metric Properties to specify x and y axes configuration
   *
   * @param {string} title The metric title
   * @param {Array.<object>} metricDefs The metric definitions to render
   * @param {Object} config Cascaded widget/metric configuration
   */
  function createMetricWidget (title: string, metricDefs: MetricDefs[], config: WidgetMetricProperties): WidgetWithSize {
    const metrics: WidgetMetric[] = metricDefs.map(
      ({ namespace, metric, dimensions, stat, yAxis }) => [
        namespace,
        metric,
        ...Object.entries(dimensions).reduce(
          (acc: string[], [name, value]) => [...acc, name, value],
          []
        ),
        { stat: stat as Statistic, yAxis: yAxis as YAxisPosition }
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
      width: config.width,
      height: config.height
    }
  }

  /**
   * Create a set of CloudWatch Dashboard widgets for the Lambda Functions in the specified template
   *
   * @return * Object with CloudFormation Lambda Function resources by resource name
   */
  function createLambdaWidgets (): WidgetWithSize[] {
    const configuredResources = getResourceDashboardConfigurationsByType('AWS::Lambda::Function', compiledTemplate, lambdaDashConfig)
    const eventSourceMappingFunctions = getEventSourceMappingFunctions(compiledTemplate)

    const lambdaWidgets: any = []

    if (Object.keys(configuredResources.resources).length > 0) {
      for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(lambdaDashConfig))) {
        if (metric !== 'IteratorAge' as any) {
          for (const stat of metricConfig.Statistic) {
            const metricDefs: MetricDefs[] = []
            for (const funcLogicalId of Object.keys(configuredResources.resources)) {
              const funcConfig = configuredResources.dashConfigurations[funcLogicalId]
              const metricConfig = funcConfig[metric]
              if (metricConfig.enabled !== false) {
                metricDefs.push({
                  namespace: 'AWS/Lambda',
                  metric,
                  dimensions: { FunctionName: `\${${funcLogicalId}}` },
                  stat,
                  yAxis: metricConfig.yAxis
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
          for (const funcLogicalId of Object.keys(eventSourceMappingFunctions)) {
            // Add IteratorAge alarm if the Lambda function has an EventSourceMapping trigger
            const funcConfig = configuredResources.dashConfigurations[funcLogicalId]
            const functionMetricConfig = funcConfig[metric]
            if (functionMetricConfig.enabled !== false) {
              const stats: string[] = []
              metricConfig?.Statistic?.forEach(a => stats.push(a))
              const iteratorAgeWidget = createMetricWidget(
                `Lambda IteratorAge \${${funcLogicalId}} ${stats?.join(',')}`,
                stats.map(stat => ({
                  namespace: 'AWS/Lambda',
                  metric: 'IteratorAge',
                  dimensions: { FunctionName: `\${${funcLogicalId}}` },
                  stat: stat as Statistic,
                  yAxis: metricConfig.yAxis
                })),
                metricConfig as Widgets
              )
              lambdaWidgets.push(iteratorAgeWidget)
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
   * @param serviceDashConfig The config object for a specific service within the dashboard
   * @returns An object with the metric's properties by metric name
   */
  function getConfiguredMetrics (serviceDashConfig: WidgetMetricProperties): Record<string, WidgetMetricProperties> {
    return Object.fromEntries(Object.entries(serviceDashConfig).filter(
      ([_, metricConfig]) => typeof metricConfig === 'object')
    ) as unknown as Record<string, WidgetMetricProperties>
  }

  /**
   * Create a set of CloudWatch Dashboard widgets for the API Gateway REST API
   * CloudFormation resources provided
   *
   * Object of CloudFormation RestApi resources by resource name
   */

  function createApiWidgets (): WidgetWithSize[] {
    const configuredResources = getResourceDashboardConfigurationsByType('AWS::ApiGateway::RestApi', compiledTemplate, apiGwDashConfig)
    const apiWidgets: WidgetWithSize[] = []
    for (const [logicalId, res] of Object.entries(configuredResources.resources)) {
      const apiName: string = resolveRestApiNameForSub(res, logicalId) // e.g., ${AWS::Stack} (Ref), ${OtherResource.Name} (GetAtt)
      const mergedConfig = configuredResources.dashConfigurations[logicalId]
      for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(mergedConfig))) {
        const widgetMetrics: MetricDefs[] = []
        if (metricConfig.enabled) {
          for (const stat of metricConfig.Statistic) {
            widgetMetrics.push({
              namespace: 'AWS/ApiGateway',
              metric,
              dimensions: {
                ApiName: apiName
              },
              stat,
              yAxis: metricConfig.yAxis
            })
          }
        }
        if (widgetMetrics.length > 0) {
          const metricStatWidget = createMetricWidget(
            `${metric} API ${apiName}`,
            widgetMetrics,
            metricConfig
          )
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
  function createStateMachineWidgets (): WidgetWithSize[] {
    const stateMachineResources = getResourceDashboardConfigurationsByType('AWS::StepFunctions::StateMachine', compiledTemplate, sfDashConfig)
    const smWidgets: WidgetWithSize[] = []
    for (const [logicalId] of Object.entries(stateMachineResources.resources)) {
      const mergedConfig = stateMachineResources.dashConfigurations[logicalId]
      const widgetMetrics: MetricDefs[] = []
      for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(mergedConfig))) {
        if (metricConfig.enabled) {
          for (const stat of metricConfig.Statistic) {
            widgetMetrics.push({
              namespace: 'AWS/States',
              metric,
              dimensions: {
                StateMachineArn: `\${${logicalId}}`
              },
              stat,
              yAxis: metricConfig.yAxis
            })
          }
        }
      }
      if (widgetMetrics.length > 0) {
        const metricStatWidget = createMetricWidget(
          `\${${logicalId}.Name} Step Function Executions`,
          widgetMetrics,
          mergedConfig
        )
        smWidgets.push(metricStatWidget)
      }
    }
    return smWidgets
  }

  /**
   * Create a set of CloudWatch Dashboard widgets for DynamoDB tables and global secondary indices.
   *
   * Object of DynamoDB table resources by resource name
   */
  function createDynamoDbWidgets (): WidgetWithSize[] {
    const configuredResources = getResourceDashboardConfigurationsByType('AWS::DynamoDB::Table', compiledTemplate, dynamoDbDashConfig)
    const ddbWidgets: WidgetWithSize[] = []
    for (const [logicalId, res] of Object.entries(configuredResources.resources)) {
      const mergedConfig = configuredResources.dashConfigurations[logicalId]
      for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(mergedConfig))) {
        if (metricConfig.enabled) {
          const widgetMetrics: MetricDefs[] = []
          for (const stat of metricConfig.Statistic) {
            widgetMetrics.push({
              namespace: 'AWS/DynamoDB',
              metric,
              dimensions: {
                TableName: `\${${logicalId}}`
              },
              stat,
              yAxis: metricConfig.yAxis
            })
          }
          if (widgetMetrics.length > 0) {
            const metricStatWidget = createMetricWidget(
              `${metric} Table $\{${logicalId}}`,
              widgetMetrics,
              metricConfig
            )
            ddbWidgets.push(metricStatWidget)
          }
          for (const gsi of res.Properties?.GlobalSecondaryIndexes ?? []) {
            const gsiWidgetMetrics: MetricDefs[] = []
            const gsiName: string = gsi.IndexName
            for (const stat of metricConfig.Statistic) {
              gsiWidgetMetrics.push({
                namespace: 'AWS/DynamoDB',
                metric,
                dimensions: {
                  TableName: `\${${logicalId}}`,
                  GlobalSecondaryIndex: gsiName
                },
                stat,
                yAxis: metricConfig.yAxis
              })
            }
            if (gsiWidgetMetrics.length > 0) {
              const metricStatWidget = createMetricWidget(
                `${metric} GSI ${gsiName} in \${${logicalId}}`,
                gsiWidgetMetrics,
                metricConfig
              )
              ddbWidgets.push(metricStatWidget)
            }
          }
        }
      }
    }
    return ddbWidgets
  }

  /**
   * Create a set of CloudWatch Dashboard widgets for the Kinesis Data Stream CloudFormation resources provided
   *
   * Object with CloudFormation Kinesis Data Stream resources by resource name
   */
  function createStreamWidgets (): WidgetWithSize[] {
    const configuredResources = getResourceDashboardConfigurationsByType('AWS::Kinesis::Stream', compiledTemplate, kinesisDashConfig)
    const streamWidgets: WidgetWithSize[] = []

    const metricGroups = {
      IteratorAge: ['GetRecords.IteratorAgeMilliseconds'],
      'Get/Put Success': ['PutRecord.Success', 'PutRecords.Success', 'GetRecords.Success'],
      'Provisioned Throughput': ['ReadProvisionedThroughputExceeded', 'WriteProvisionedThroughputExceeded']
    }

    for (const [logicalId] of Object.entries(configuredResources.resources)) {
      const streamConfig = configuredResources.dashConfigurations[logicalId]
      for (const [group, metrics] of Object.entries(metricGroups)) {
        const widgetMetrics: MetricDefs[] = []
        for (const metric of metrics) {
          const metricConfig = streamConfig[metric]
          if (metricConfig.enabled !== false) {
            for (const stat of metricConfig.Statistic) {
              widgetMetrics.push({
                namespace: 'AWS/Kinesis',
                metric,
                dimensions: { StreamName: `\${${logicalId}}` },
                stat,
                yAxis: metricConfig.yAxis
              })
            }
          }
        }
        if (widgetMetrics.length > 0) {
          streamWidgets.push(createMetricWidget(
            `${group} $\{${logicalId}} Kinesis`,
            widgetMetrics,
            streamConfig
          ))
        }
      }
    }
    return streamWidgets
  }

  /**
   * Create a set of CloudWatch Dashboard widgets for the SQS resources provided
   * Object with CloudFormation SQS resources by resource name
   */
  function createQueueWidgets (): WidgetWithSize[] {
    const configuredResources = getResourceDashboardConfigurationsByType('AWS::SQS::Queue', compiledTemplate, sqsDashConfig)
    const queueWidgets: WidgetWithSize[] = []

    const metricGroups = {
      Messages: ['NumberOfMessagesSent', 'NumberOfMessagesReceived', 'NumberOfMessagesDeleted'],
      'Oldest Message age': ['ApproximateAgeOfOldestMessage'],
      'Messages in queue': ['ApproximateNumberOfMessagesVisible']
    }
    for (const [logicalId] of Object.entries(configuredResources.resources)) {
      const mergedConfig = configuredResources.dashConfigurations[logicalId]
      for (const [group, metrics] of Object.entries(metricGroups)) {
        const widgetMetrics: MetricDefs[] = []
        for (const metric of metrics) {
          const metricConfig = mergedConfig[metric]
          if (metricConfig.enabled !== false) {
            for (const stat of metricConfig.Statistic) {
              widgetMetrics.push({
                namespace: 'AWS/SQS',
                metric,
                dimensions: {
                  QueueName: `\${${logicalId}.QueueName}`
                },
                stat
              })
            }
          }
        }
        if (widgetMetrics.length > 0) {
          queueWidgets.push(createMetricWidget(
            `${group} \${${logicalId}.QueueName} SQS`,
            widgetMetrics,
            sqsDashConfig
          ))
        }
      }
    }

    return queueWidgets
  }

  /**
   * Create a set of CloudWatch Dashboard widgets for ECS services.
   *
   * Object of ECS Service resources by resource name
   */
  function createEcsWidgets (): WidgetWithSize[] {
    const configuredResources = getResourceDashboardConfigurationsByType('AWS::ECS::Service', compiledTemplate, ecsDashConfig)
    const ecsWidgets: WidgetWithSize[] = []
    for (const [logicalId, res] of Object.entries(configuredResources.resources)) {
      const clusterName = resolveEcsClusterNameForSub(res.Properties?.Cluster)
      const mergedConfig = configuredResources.dashConfigurations[logicalId]
      const widgetMetrics: MetricDefs[] = []
      for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(mergedConfig))) {
        if (metricConfig.enabled) {
          for (const stat of metricConfig.Statistic) {
            widgetMetrics.push({
              namespace: 'AWS/ECS',
              metric,
              dimensions: {
                ServiceName: `\${${logicalId}.Name}`,
                ClusterName: clusterName
              },
              stat
            })
          }
        }
      }
      if (widgetMetrics.length > 0) {
        const metricStatWidget = createMetricWidget(
          `ECS Service \${${logicalId}.Name}`,
          widgetMetrics,
          ecsDashConfig
        )
        ecsWidgets.push(metricStatWidget)
      }
    }
    return ecsWidgets
  }

  /**
   * Create a set of CloudWatch Dashboard widgets for SNS services.
   */
  function createTopicWidgets (): WidgetWithSize[] {
    const configuredResources = getResourceDashboardConfigurationsByType('AWS::SNS::Topic', compiledTemplate, snsDashConfig)
    const topicWidgets: WidgetWithSize[] = []
    for (const logicalId of Object.keys(configuredResources.resources)) {
      const widgetMetrics: MetricDefs[] = []
      const mergedConfig = configuredResources.dashConfigurations[logicalId]
      for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(mergedConfig))) {
        if (metricConfig.enabled) {
          for (const stat of metricConfig.Statistic) {
            widgetMetrics.push({
              namespace: 'AWS/SNS',
              metric,
              dimensions: {
                TopicName: `\${${logicalId}.TopicName}`
              },
              stat
            })
          }
        }
      }
      if (widgetMetrics.length > 0) {
        const metricStatWidget = createMetricWidget(
          `SNS Topic \${${logicalId}.TopicName}`,
          widgetMetrics,
          snsDashConfig
        )
        topicWidgets.push(metricStatWidget)
      }
    }
    return topicWidgets
  }

  /**
   * Create a set of CloudWatch Dashboard widgets for EventBridge services.
   *
   *  Object of EventBridge Service resources by resource name
   */
  function createRuleWidgets (): WidgetWithSize[] {
    const configuredResources = getResourceDashboardConfigurationsByType('AWS::Events::Rule', compiledTemplate, ruleDashConfig)
    const ruleWidgets: WidgetWithSize[] = []
    for (const [logicalId] of Object.entries(configuredResources.resources)) {
      const widgetMetrics: MetricDefs[] = []
      const mergedConfig = configuredResources.dashConfigurations[logicalId]
      for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(mergedConfig))) {
        if (metricConfig.enabled) {
          for (const stat of metricConfig.Statistic) {
            widgetMetrics.push({
              namespace: 'AWS/Events',
              metric,
              dimensions: { RuleName: `\${${logicalId}}` },
              stat
            })
          }
        }
      }
      if (widgetMetrics.length > 0) {
        const metricStatWidget = createMetricWidget(
          `EventBridge Rule \${${logicalId}}`,
          widgetMetrics,
          mergedConfig
        )
        ruleWidgets.push(metricStatWidget)
      }
    }
    return ruleWidgets
  }

  /**
   * Create a set of CloudWatch Dashboard widgets for Application Load Balancer services.
   */
  function createLoadBalancerWidgets (): WidgetWithSize[] {
    const configuredResources = getResourceDashboardConfigurationsByType('AWS::ElasticLoadBalancingV2::LoadBalancer', compiledTemplate, albDashConfig)
    const loadBalancerWidgets: WidgetWithSize[] = []
    for (const [logicalId] of Object.entries(configuredResources.resources)) {
      const loadBalancerName = `\${${logicalId}.LoadBalancerName}`
      const mergedConfig = configuredResources.dashConfigurations[logicalId]

      const loadBalancerFullName = resolveLoadBalancerFullNameForSub(logicalId)
      const widgetMetrics: MetricDefs[] = []
      for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(mergedConfig))) {
        if (metricConfig.enabled) {
          for (const stat of metricConfig.Statistic) {
            widgetMetrics.push({
              namespace: 'AWS/ApplicationELB',
              metric,
              dimensions: {
                LoadBalancer: loadBalancerFullName
              },
              stat
            })
          }
        }
      }
      if (widgetMetrics.length > 0) {
        const metricStatWidget = createMetricWidget(
          `ALB ${loadBalancerName}`,
          widgetMetrics,
          mergedConfig
        )
        loadBalancerWidgets.push(metricStatWidget)
      }
    }
    return loadBalancerWidgets
  }

  /**
   * Create a set of CloudWatch Dashboard widgets for Application Load Balancer Target Group services .
   *
   * Object of Application Load Balancer Service Target Group resources by resource name
   * The full CloudFormation template instance used to look up associated listener and ALB resources
   */
  function createTargetGroupWidgets (): WidgetWithSize[] {
    const configuredResources = getResourceDashboardConfigurationsByType('AWS::ElasticLoadBalancingV2::TargetGroup', compiledTemplate, albTargetDashConfig)

    const targetGroupWidgets: WidgetWithSize[] = []
    for (const [tgLogicalId, targetGroupResource] of Object.entries(configuredResources.resources)) {
      const mergedConfig = configuredResources.dashConfigurations[tgLogicalId]
      const loadBalancerLogicalIds = findLoadBalancersForTargetGroup(tgLogicalId, compiledTemplate)
      for (const loadBalancerLogicalId of loadBalancerLogicalIds) {
        const targetGroupFullName = resolveTargetGroupFullNameForSub(tgLogicalId)
        const loadBalancerFullName = `\${${loadBalancerLogicalId}.LoadBalancerFullName}`
        const widgetMetrics: MetricDefs[] = []
        for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(mergedConfig))) {
          if (metricConfig.enabled &&
            (targetGroupResource.Properties?.TargetType === 'lambda' || !['LambdaUserError', 'LambdaInternalError'].includes(metric))
          ) {
            for (const stat of metricConfig.Statistic) {
              widgetMetrics.push({
                namespace: 'AWS/ApplicationELB',
                metric,
                dimensions: {
                  LoadBalancer: loadBalancerFullName,
                  TargetGroup: targetGroupFullName
                },
                stat
              })
            }
          }
        }
        if (widgetMetrics.length > 0) {
          const metricStatWidget = createMetricWidget(
            `Target Group \${${loadBalancerLogicalId}.LoadBalancerName}/\${${tgLogicalId}.TargetGroupName}`,
            widgetMetrics,
            mergedConfig
          )
          targetGroupWidgets.push(metricStatWidget)
        }
      }
    }
    return targetGroupWidgets
  }

  /**
   * Create a set of CloudWatch Dashboard widgets for AppSync services.
   *
   * Object of AppSync Service resources by resource name
   */
  function createAppSyncWidgets (): WidgetWithSize[] {
    const configuredResources = getResourceDashboardConfigurationsByType('AWS::AppSync::GraphQLApi', compiledTemplate, appSyncDashConfig)

    const appSyncWidgets: WidgetWithSize[] = []
    const metricGroups = {
      API: ['5XXError', '4XXError', 'Latency', 'Requests'],
      'Real-time Subscriptions': ['ConnectServerError', 'DisconnectServerError', 'SubscribeServerError', 'UnsubscribeServerError', 'PublishDataMessageServerError']
    }
    for (const [logicalId, res] of Object.entries(configuredResources.resources)) {
      const appSyncResourceName: string = res.Properties?.Name
      const mergedConfig = configuredResources.dashConfigurations[logicalId]
      const graphQLAPIId = resolveGraphQLId(logicalId)
      for (const [group, metrics] of Object.entries(metricGroups)) {
        const widgetMetrics: MetricDefs[] = []
        for (const metric of metrics) {
          const metricConfig = mergedConfig[metric]
          if (metricConfig.enabled !== false) {
            const stats: string[] = []
            metricConfig?.Statistic?.forEach(stat => stats.push(stat))
            for (const stat of stats) {
              widgetMetrics.push({
                namespace: 'AWS/AppSync',
                metric,
                dimensions: { GraphQLAPIId: graphQLAPIId },
                stat: stat as Statistic,
                yAxis: metricConfig.yAxis as YAxisPosition
              })
            }
          }
        }
        if (widgetMetrics.length > 0) {
          appSyncWidgets.push(createMetricWidget(
            `AppSync ${group} ${appSyncResourceName}`,
            widgetMetrics,
            mergedConfig
          ))
        }
      }
    }
    return appSyncWidgets
  }

  /**
   * Set the location and dimension properties of each provided widget
   *
   * A set of dashboard widgets
   * A set of dashboard widgets with layout properties set
   */
  function layOutWidgets (widgets: WidgetWithSize[]) {
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

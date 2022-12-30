'use strict'

import { cascade } from './cascading-config'
import {
  resolveEcsClusterNameForSub,
  resolveRestApiNameForSub,
  resolveLoadBalancerFullNameForSub,
  resolveTargetGroupFullNameForSub,
  findLoadBalancersForTargetGroup,
  resolveGraphlQLId
} from './util'
import { getLogger } from './logging'

const MAX_WIDTH = 24

const logger = getLogger()

/**
 * @param {*} dashboardConfig The global plugin dashboard configuration
 * @param {*} functionDashboardConfigs The dashboard configuration override by function name
 * @param {*} context The plugin context
 */
export default function dashboard (dashboardConfig, functionDashboardConfigs, context) {
  const {
    // @ts-ignore
    timeRange,
    // @ts-ignore
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
  } = cascade(dashboardConfig)

  return {
    addDashboard
  }

  /**
   * Adds a dashboard to the specified CloudFormation template
   * based on the resources provided in the template.
   *
   * A CloudFormation template
   */
  function addDashboard (cfTemplate) {
    const apiResources = cfTemplate.getResourcesByType(
      'AWS::ApiGateway::RestApi'
    )
    const stateMachineResources = cfTemplate.getResourcesByType(
      'AWS::StepFunctions::StateMachine'
    )
    const lambdaResources = cfTemplate.getResourcesByType(
      'AWS::Lambda::Function'
    )
    const tableResources = cfTemplate.getResourcesByType(
      'AWS::DynamoDB::Table'
    )
    const streamResources = cfTemplate.getResourcesByType(
      'AWS::Kinesis::Stream'
    )
    const queueResources = cfTemplate.getResourcesByType(
      'AWS::SQS::Queue'
    )
    const ecsServiceResources = cfTemplate.getResourcesByType(
      'AWS::ECS::Service'
    )
    const topicResources = cfTemplate.getResourcesByType(
      'AWS::SNS::Topic'
    )
    const ruleResources = cfTemplate.getResourcesByType(
      'AWS::Events::Rule'
    )
    const loadBalancerResources = cfTemplate.getResourcesByType(
      'AWS::ElasticLoadBalancingV2::LoadBalancer'
    )

    const targetGroupResources = cfTemplate.getResourcesByType(
      'AWS::ElasticLoadBalancingV2::TargetGroup'
    )

    const appSyncResources = cfTemplate.getResourcesByType(
      'AWS::AppSync::GraphQLApi'
    )

    const eventSourceMappingFunctions = cfTemplate.getEventSourceMappingFunctions()
    const apiWidgets = createApiWidgets(apiResources)
    const stateMachineWidgets = createStateMachineWidgets(stateMachineResources)
    const dynamoDbWidgets = createDynamoDbWidgets(tableResources)
    const lambdaWidgets = createLambdaWidgets(
      lambdaResources,
      Object.keys(eventSourceMappingFunctions)
    )
    const streamWidgets = createStreamWidgets(streamResources)
    const queueWidgets = createQueueWidgets(queueResources)
    const ecsWidgets = createEcsWidgets(ecsServiceResources)
    const topicWidgets = createTopicWidgets(topicResources)
    const ruleWidgets = createRuleWidgets(ruleResources)
    const loadBalancerWidgets = createLoadBalancerWidgets(loadBalancerResources)
    const targetGroupWidgets = createTargetGroupWidgets(targetGroupResources, cfTemplate)
    const appSyncWidgets = createAppSyncWidgets(appSyncResources)

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
      const dash = { start: timeRange.start, end: timeRange.end, widgets: positionedWidgets }
      const dashboardResource = {
        Type: 'AWS::CloudWatch::Dashboard',
        Properties: {
          // eslint-disable-next-line no-template-curly-in-string
          DashboardName: { 'Fn::Sub': '${AWS::StackName}-${AWS::Region}-Dashboard' },
          DashboardBody: { 'Fn::Sub': JSON.stringify(dash) }
        }
      }
      cfTemplate.addResource('slicWatchDashboard', dashboardResource)
    } else {
      logger.info('No dashboard widgets are enabled in SLIC Watch. Dashboard creation will be skipped.')
    }
  }

  /**
   * Create a metric for the specified metrics
   *
   * @param {string} title The metric title
   * @param {Array.<object>} metrics The metric definitions to render
   * @param {Object} Cascaded widget/metric configuration
   */
  function createMetricWidget (title: string, metricDefs: Array<object>, config) {
    const metrics = metricDefs.map(
      // @ts-ignore
      ({ namespace, metric, dimensions, stat, yAxis }) => [
        namespace,
        metric,
        ...Object.entries(dimensions).reduce(
          (acc, [name, value]) => [...acc, name, value],
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
        // eslint-disable-next-line no-template-curly-in-string
        region: '${AWS::Region}',
        period: config.metricPeriod
      },
      width: config.width,
      height: config.height
    }
  }

  /**
   * Create a set of CloudWatch Dashboard widgets for the Lambda
   * CloudFormation resources provided
   *
   * Object with CloudFormation Lambda Function resources by resource name
   * eventSourceMappingFunctionResourceNames Names of Lambda function resources that are linked to EventSourceMappings
   */
  function createLambdaWidgets (
    functionResources: object,
    eventSourceMappingFunctionResourceNames: string[]
  ) {
    const lambdaWidgets = []
    if (Object.keys(functionResources).length > 0) {
      for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(lambdaDashConfig))) {
         // @ts-ignore
        if (metricConfig.enabled) {
          if (metric !== 'IteratorAge') {
             // @ts-ignore
            for (const stat of metricConfig.Statistic) {
              const metricDefs = []
              for (const logicalId of Object.keys(functionResources)) {
                const functionConfig = functionDashboardConfigs[logicalId] || {}
                const functionMetricConfig = functionConfig[metric] || {}
                if (functionConfig.enabled !== false && (functionMetricConfig.enabled !== false)) {
                  metricDefs.push({
                    namespace: 'AWS/Lambda',
                    metric,
                    // eslint-disable-next-line no-template-curly-in-string
                    dimensions: { FunctionName: `\${${logicalId}}` },
                    stat
                  })
                }
              }

              if (metricDefs.length > 0) {
                const metricStatWidget = createMetricWidget(
                  `Lambda ${metric} ${stat} per Function`,
                  metricDefs,
                  metricConfig
                )
                lambdaWidgets.push(metricStatWidget)
              }
            }
          } else {
            for (const logicalId of eventSourceMappingFunctionResourceNames) {
              const functionConfig = functionDashboardConfigs[logicalId] || {}
              const functionMetricConfig = functionConfig[metric] || {}
              if (functionConfig.enabled !== false && (functionMetricConfig.enabled !== false)) {
                 // @ts-ignore
                const stats = metricConfig.Statistic
                const iteratorAgeWidget = createMetricWidget(
                  `Lambda IteratorAge \${${logicalId}} ${stats.join(',')}`,
                  stats.map(stat => ({
                    namespace: 'AWS/Lambda',
                    metric: 'IteratorAge',
                    // eslint-disable-next-line no-template-curly-in-string
                    dimensions: { FunctionName: `\${${logicalId}}` },
                    stat
                  })),
                  metricConfig
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
   *  The config object for a specific service within the dashboard
   * @returns {Iterable} An iterable over the alarm-config Object entries
   */
  function getConfiguredMetrics (serviceDashConfig:object) {
    const extractedConfig = {}
    for (const [metric, metricConfig] of Object.entries(serviceDashConfig)) {
      if (typeof metricConfig === 'object') {
        extractedConfig[metric] = metricConfig
      }
    }
    return extractedConfig
  }

  /**
   * Create a set of CloudWatch Dashboard widgets for the API Gateway REST API
   * CloudFormation resources provided
   *
   * Object of CloudFormation RestApi resources by resource name
   */
  function createApiWidgets (apiResources: object) {
    const apiWidgets = []
    for (const [resourceName, res] of Object.entries(apiResources)) {
      const apiName = resolveRestApiNameForSub(res, resourceName) // e.g., ${AWS::Stack} (Ref), ${OtherResource.Name} (GetAtt)
      for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(apiGwDashConfig))) {
         // @ts-ignore
        if (metricConfig.enabled) {
          const metricStatWidget = createMetricWidget(
            `${metric} API ${apiName}`,
             // @ts-ignore
            Object.values(metricConfig.Statistic).map((stat) => ({
              namespace: 'AWS/ApiGateway',
              metric,
              dimensions: {
                ApiName: apiName
              },
              stat
            })),
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
  function createStateMachineWidgets (smResources: object) {
    const smWidgets = []
    for (const [logicalId] of Object.entries(smResources)) {
      const widgetMetrics = []
      for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(sfDashConfig))) {
         // @ts-ignore
        if (metricConfig.enabled) {
           // @ts-ignore
          for (const stat of metricConfig.Statistic) {
            widgetMetrics.push({
              namespace: 'AWS/States',
              metric,
              dimensions: {
                StateMachineArn: `\${${logicalId}}`
              },
              stat
            })
          }
        }
      }
      if (widgetMetrics.length > 0) {
        const metricStatWidget = createMetricWidget(
          `\${${logicalId}.Name} Step Function Executions`,
          widgetMetrics,
          sfDashConfig
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
  function createDynamoDbWidgets (tableResources: object) {
    const ddbWidgets = []
    for (const [logicalId, res] of Object.entries(tableResources)) {
      for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(dynamoDbDashConfig))) {
         // @ts-ignore
        if (metricConfig.enabled) {
          ddbWidgets.push(createMetricWidget(
            `${metric} Table $\{${logicalId}}`,
             // @ts-ignore
            Object.values(metricConfig.Statistic).map((stat) => ({
              namespace: 'AWS/DynamoDB',
              metric,
              dimensions: {
                TableName: `\${${logicalId}}`
              },
              stat
            })),
            metricConfig
          ))
          for (const gsi of res.Properties.GlobalSecondaryIndexes || []) {
            const gsiName = gsi.IndexName
            ddbWidgets.push(createMetricWidget(
              `${metric} GSI ${gsiName} in \${${logicalId}}`,
               // @ts-ignore
              Object.values(metricConfig.Statistic).map((stat) => ({
                namespace: 'AWS/DynamoDB',
                metric,
                dimensions: {
                  TableName: `\${${logicalId}}`,
                  GlobalSecondaryIndex: gsiName
                },
                stat
              })),
              metricConfig
            ))
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
  function createStreamWidgets (streamResources: object) {
    const streamWidgets = []

    const metricGroups = {
      IteratorAge: ['GetRecords.IteratorAgeMilliseconds'],
      'Get/Put Success': ['PutRecord.Success', 'PutRecords.Success', 'GetRecords.Success'],
      'Provisioned Throughput': ['ReadProvisionedThroughputExceeded', 'WriteProvisionedThroughputExceeded']
    }
    const metricConfigs = getConfiguredMetrics(kinesisDashConfig)

    for (const [logicalId] of Object.entries(streamResources)) {
      for (const [group, metrics] of Object.entries(metricGroups)) {
        const widgetMetrics = []
        for (const metric of metrics) {
          const metricConfig = metricConfigs[metric]
          if (metricConfig.enabled) {
            for (const stat of metricConfig.Statistic) {
              widgetMetrics.push({
                namespace: 'AWS/Kinesis',
                metric,
                dimensions: { StreamName: `\${${logicalId}}` },
                stat
              })
            }
          }
        }
        if (widgetMetrics.length > 0) {
          streamWidgets.push(createMetricWidget(
            `${group} $\{${logicalId}} Kinesis`,
            widgetMetrics,
            kinesisDashConfig
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
  function createQueueWidgets (queueResources: object) {
    const queueWidgets = []

    const metricGroups = {
      Messages: ['NumberOfMessagesSent', 'NumberOfMessagesReceived', 'NumberOfMessagesDeleted'],
      'Oldest Message age': ['ApproximateAgeOfOldestMessage'],
      'Messages in queue': ['ApproximateNumberOfMessagesVisible']
    }
    const metricConfigs = getConfiguredMetrics(sqsDashConfig)

    for (const [logicalId] of Object.entries(queueResources)) {
      for (const [group, metrics] of Object.entries(metricGroups)) {
        const widgetMetrics = []
        for (const metric of metrics) {
          const metricConfig = metricConfigs[metric]
          if (metricConfig.enabled) {
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
  function createEcsWidgets (ecsServiceResources: object) {
    const ecsWidgets = []
    for (const [logicalId, res] of Object.entries(ecsServiceResources)) {
      const clusterName = resolveEcsClusterNameForSub(res.Properties.Cluster)

      const widgetMetrics = []
      for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(ecsDashConfig))) {
         // @ts-ignore
        if (metricConfig.enabled) {
           // @ts-ignore
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
   *
   * Object of SNS Service resources by resource name
   */
  function createTopicWidgets (topicResources: object) {
    const topicWidgets = []
    for (const logicalId of Object.keys(topicResources)) {
      const widgetMetrics = []
      for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(snsDashConfig))) {
         // @ts-ignore
        if (metricConfig.enabled) {
           // @ts-ignore
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
  function createRuleWidgets (ruleResources: object) {
    const ruleWidgets = []
    for (const [logicalId] of Object.entries(ruleResources)) {
      const widgetMetrics = []
      for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(ruleDashConfig))) {
         // @ts-ignore
        if (metricConfig.enabled) {
           // @ts-ignore
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
          ruleDashConfig
        )
        ruleWidgets.push(metricStatWidget)
      }
    }
    return ruleWidgets
  }

  /**
   * Create a set of CloudWatch Dashboard widgets for Application Load Balancer services.
   *
   * Object of Application Load Balancer Service resources by resource name
   */
  function createLoadBalancerWidgets (loadBalancerResources: object) {
    const loadBalancerWidgets = []
    for (const [logicalId] of Object.entries(loadBalancerResources)) {
      const loadBalancerName = `\${${logicalId}.LoadBalancerName}`

      const loadBalancerFullName = resolveLoadBalancerFullNameForSub(logicalId)
      const widgetMetrics = []
      for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(albDashConfig))) {
         // @ts-ignore
        if (metricConfig.enabled) {
           // @ts-ignore
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
          albDashConfig
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
  function createTargetGroupWidgets (targetGroupResources: object, cfTemplate) {
    const targetGroupWidgets = []
    for (const [tgLogicalId, targetGroupResource] of Object.entries(targetGroupResources)) {
      const loadBalancerLogicalIds = findLoadBalancersForTargetGroup(tgLogicalId, cfTemplate)
      for (const loadBalancerLogicalId of loadBalancerLogicalIds) {
        const targetGroupFullName = resolveTargetGroupFullNameForSub(tgLogicalId)
        const loadBalancerFullName = `\${${loadBalancerLogicalId}.LoadBalancerFullName}`
        const widgetMetrics = []
        for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(albTargetDashConfig))) {
           // @ts-ignore
          if (metricConfig.enabled &&
            (targetGroupResource.Properties.TargetType === 'lambda' || !['LambdaUserError', 'LambdaInternalError'].includes(metric))
          ) {
             // @ts-ignore
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
            albTargetDashConfig
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
  function createAppSyncWidgets (appSyncResources: object) {
    const appSyncWidgets = []
    const metricGroups = {
      API: ['5XXError', '4XXError', 'Latency', 'Requests'],
      'Real-time Subscriptions': ['ConnectServerError', 'DisconnectServerError', 'SubscribeServerError', 'UnsubscribeServerError', 'PublishDataMessageServerError']
    }
    const metricConfigs = getConfiguredMetrics(appSyncDashConfig)
    for (const res of Object.values(appSyncResources)) {
      const appSyncResourceName = res.Properties.Name
      for (const [logicalId] of Object.entries(appSyncResources)) {
        const graphQLAPIId = resolveGraphlQLId(logicalId)
        for (const [group, metrics] of Object.entries(metricGroups)) {
          const widgetMetrics = []
          for (const metric of metrics) {
            const metricConfig = metricConfigs[metric]
            if (metricConfig.enabled) {
              for (const stat of metricConfig.Statistic) {
                widgetMetrics.push({
                  namespace: 'AWS/AppSync',
                  metric,
                  dimensions: { GraphQLAPIId: graphQLAPIId },
                  stat,
                  yAxis: metricConfig.yAxis
                })
              }
            }
          }
          if (widgetMetrics.length > 0) {
            appSyncWidgets.push(createMetricWidget(
              `AppSync ${group} ${appSyncResourceName}`,
              widgetMetrics,
              sqsDashConfig
            ))
          }
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
  function layOutWidgets (widgets: Array<object>) {
    let x = 0
    let y = 0

    return widgets.map((widget) => {
       // @ts-ignore
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

'use strict'

const { cascade } = require('./cascading-config')

const MAX_WIDTH = 24

/**
 * @param {*} serverless  The serverless framework instance
 * @param {*} dashboardConfig The global plugin dashboard configuration
 * @param {*} functionDashboardConfigs The dashboard configuration override by function name
 * @param {*} context The plugin context
 */
module.exports = function dashboard (serverless, dashboardConfig, functionDashboardConfigs, context) {
  const {
    timeRange,
    widgets: {
      Lambda: lambdaDashConfig,
      ApiGateway: apiGwDashConfig,
      States: sfDashConfig,
      DynamoDB: dynamoDbDashConfig,
      Kinesis: kinesisDashConfig,
      SQS: sqsDashConfig
    }
  } = cascade(dashboardConfig)

  return {
    addDashboard
  }

  /**
   * Adds a dashboard to the specified CloudFormation template
   * based on the resources provided in the template.
   *
   * @param {object} cfTemplate A CloudFormation template
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

    const positionedWidgets = layOutWidgets([
      ...apiWidgets,
      ...stateMachineWidgets,
      ...dynamoDbWidgets,
      ...lambdaWidgets,
      ...streamWidgets,
      ...queueWidgets
    ])
    if (positionedWidgets.length > 0) {
      const dash = { start: timeRange.start, end: timeRange.end, widgets: positionedWidgets }
      const dashboardResource = {
        Type: 'AWS::CloudWatch::Dashboard',
        Properties: {
          DashboardName: `${context.stackName}Dashboard`,
          DashboardBody: { 'Fn::Sub': JSON.stringify(dash) }
        }
      }
      cfTemplate.addResource('slicWatchDashboard', dashboardResource)
    } else {
      serverless.cli.log('No dashboard widgets are enabled in SLIC Watch. Dashboard creation will be skipped.')
    }
  }

  /**
   * Create a metric for the specified metrics
   *
   * @param {string} title The metric title
   * @param {Array.<object>} metrics The metric definitions to render
   * @param {Object} Cascaded widget/metric configuration
   */
  function createMetricWidget (title, metricDefs, config) {
    const metrics = metricDefs.map(
      ({ namespace, metric, dimensions, stat }) => [
        namespace,
        metric,
        ...Object.entries(dimensions).reduce(
          (acc, [name, value]) => [...acc, name, value],
          []
        ),
        { stat }
      ]
    )

    return {
      type: 'metric',
      properties: {
        metrics,
        title,
        view: 'timeSeries',
        region: context.region,
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
   * @param {object} functionResources Object with CloudFormation Lambda Function resources by resource name
   * @param {Array.<string>} eventSourceMappingFunctionResourceNames Names of Lambda function resources that are linked to EventSourceMappings
   */
  function createLambdaWidgets (
    functionResources,
    eventSourceMappingFunctionResourceNames
  ) {
    const lambdaWidgets = []
    if (Object.keys(functionResources).length > 0) {
      for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(lambdaDashConfig))) {
        if (metricConfig.enabled) {
          if (metric !== 'IteratorAge') {
            for (const stat of metricConfig.Statistic) {
              const metricDefs = []
              for (const res of Object.values(functionResources)) {
                const functionName = res.Properties.FunctionName
                const functionConfig = (functionDashboardConfigs[functionName] || {}).dashboard || {}
                const functionMetricConfig = functionConfig[metric] || {}
                if (functionConfig.enabled !== false && (functionMetricConfig.enabled !== false)) {
                  metricDefs.push({
                    namespace: 'AWS/Lambda',
                    metric,
                    dimensions: { FunctionName: functionName },
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
            for (const funcResName of eventSourceMappingFunctionResourceNames) {
              const functionName = functionResources[funcResName].Properties.FunctionName
              const functionConfig = (functionDashboardConfigs[functionName] || {}).dashboard || {}
              const functionMetricConfig = functionConfig[metric] || {}
              if (functionConfig.enabled !== false && (functionMetricConfig.enabled !== false)) {
                const stats = metricConfig.Statistic
                const iteratorAgeWidget = createMetricWidget(
                  `Lambda IteratorAge ${functionName} ${stats.join(',')}`,
                  stats.map(stat => ({
                    namespace: 'AWS/Lambda',
                    metric: 'IteratorAge',
                    dimensions: {
                      FunctionName: functionResources[funcResName].Properties.FunctionName
                    },
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
   * @param {object} serviceDashConfig The config object for a specific service within the dashboard
   * @returns {Iterable} An iterable over the alarm-config Object entries
   */
  function getConfiguredMetrics (serviceDashConfig) {
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
   * @param {object} apiResources Object of CloudFormation RestApi resources by resource name
   */
  function createApiWidgets (apiResources) {
    const apiWidgets = []
    for (const res of Object.values(apiResources)) {
      const apiName = res.Properties.Name // TODO: Allow for Ref usage in resource names
      for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(apiGwDashConfig))) {
        if (metricConfig.enabled) {
          const metricStatWidget = createMetricWidget(
            `${metric} API ${apiName}`,
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
   * @param {object} smResources Object of Step Function State Machine resources by resource name
   */
  function createStateMachineWidgets (smResources) {
    const smWidgets = []
    for (const res of Object.values(smResources)) {
      const smName = res.Properties.StateMachineName // TODO: Allow for Ref usage in resource names (see #14)
      const widgetMetrics = []
      for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(sfDashConfig))) {
        if (metricConfig.enabled) {
          for (const stat of metricConfig.Statistic) {
            widgetMetrics.push({
              namespace: 'AWS/States',
              metric,
              dimensions: {
                StateMachineArn: `arn:aws:states:\${AWS::Region}:\${AWS::AccountId}:stateMachine:${smName}`
              },
              stat
            })
          }
        }
      }
      const metricStatWidget = createMetricWidget(
        `${smName} Step Function Executions`,
        widgetMetrics,
        sfDashConfig
      )
      smWidgets.push(metricStatWidget)
    }
    return smWidgets
  }

  /**
   * Create a set of CloudWatch Dashboard widgets for DynamoDB tables and global secondary indices.
   *
   * @param {object} ddbResources Object of DynamoDB table resources by resource name
   */
  function createDynamoDbWidgets (tableResources) {
    const ddbWidgets = []
    for (const res of Object.values(tableResources)) {
      const tableName = res.Properties.TableName
      for (const [metric, metricConfig] of Object.entries(getConfiguredMetrics(dynamoDbDashConfig))) {
        if (metricConfig.enabled) {
          ddbWidgets.push(createMetricWidget(
            `${metric} Table ${tableName}`,
            Object.values(metricConfig.Statistic).map((stat) => ({
              namespace: 'AWS/DynamoDB',
              metric,
              dimensions: {
                TableName: tableName
              },
              stat
            })),
            metricConfig
          ))
          for (const gsi of res.Properties.GlobalSecondaryIndexes || []) {
            const gsiName = gsi.IndexName
            ddbWidgets.push(createMetricWidget(
              `${metric} GSI ${gsiName} in ${tableName}`,
              Object.values(metricConfig.Statistic).map((stat) => ({
                namespace: 'AWS/DynamoDB',
                metric,
                dimensions: {
                  TableName: tableName,
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
   * @param {object} streamResources Object with CloudFormation Kinesis Data Stream resources by resource name
   */
  function createStreamWidgets (streamResources) {
    const streamWidgets = []

    const metricGroups = {
      IteratorAge: ['GetRecords.IteratorAgeMilliseconds'],
      'Get/Put Success': ['PutRecord.Success', 'PutRecords.Success', 'GetRecords.Success'],
      'Provisioned Throughput': ['ReadProvisionedThroughputExceeded', 'WriteProvisionedThroughputExceeded']
    }
    const metricConfigs = getConfiguredMetrics(kinesisDashConfig)

    for (const streamResource of Object.values(streamResources)) {
      const streamName = streamResource.Properties.Name
      for (const [group, metrics] of Object.entries(metricGroups)) {
        const widgetMetrics = []
        for (const metric of metrics) {
          const metricConfig = metricConfigs[metric]
          if (metricConfig.enabled) {
            for (const stat of metricConfig.Statistic) {
              widgetMetrics.push({
                namespace: 'AWS/Kinesis',
                metric,
                dimensions: { StreamName: streamName },
                stat
              })
            }
          }
        }
        if (widgetMetrics.length > 0) {
          streamWidgets.push(createMetricWidget(
            `${group} ${streamName} Kinesis`,
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
   *
   * @param {object} queueResources Object with CloudFormation SQS resources by resource name
   */
  function createQueueWidgets (queueResources) {
    const queueWidgets = []

    const metricGroups = {
      Messages: ['NumberOfMessagesSent', 'NumberOfMessagesReceived', 'NumberOfMessagesDeleted'],
      'Oldest Message age': ['ApproximateAgeOfOldestMessage'],
      'Messages in queue': ['ApproximateNumberOfMessagesVisible']
    }
    const metricConfigs = getConfiguredMetrics(sqsDashConfig)

    for (const queueResource of Object.values(queueResources)) {
      const queueName = queueResource.Properties.QueueName
      for (const [group, metrics] of Object.entries(metricGroups)) {
        const widgetMetrics = []
        for (const metric of metrics) {
          const metricConfig = metricConfigs[metric]
          if (metricConfig.enabled) {
            for (const stat of metricConfig.Statistic) {
              widgetMetrics.push({
                namespace: 'AWS/SQS',
                metric,
                dimensions: { QueueName: queueName },
                stat
              })
            }
          }
        }
        if (widgetMetrics.length > 0) {
          queueWidgets.push(createMetricWidget(
            `${group} ${queueName} SQS`,
            widgetMetrics,
            sqsDashConfig
          ))
        }
      }
    }

    return queueWidgets
  }

  /**
   * Set the location and dimension properties of each provided widget
   *
   * @param {Array.<object>} widgets A set of dashboard widgets
   * @return {Array.<object>} A set of dashboard widgets with layout properties set
   */
  function layOutWidgets (widgets) {
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

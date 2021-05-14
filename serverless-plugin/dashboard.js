'use strict'

const { cascade } = require('./cascading-config')

const MAX_WIDTH = 24

module.exports = function dashboard (serverless, dashboardConfig, context) {
  const {
    timeRange,
    widgets: {
      Lambda: lambdaDashConfig,
      ApiGateway: apiGwDashConfig,
      States: sfDashConfig,
      DynamoDB: dynamoDbDashConfig
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

    const eventSourceMappingFunctions = cfTemplate.getEventSourceMappingFunctions()
    const apiWidgets = createApiWidgets(apiResources)
    const stateMachineWidgets = createStateMachineWidgets(stateMachineResources)
    const dynamoDbWidgets = createDynamoDbWidgets(tableResources)
    const lambdaWidgets = createLambdaWidgets(
      lambdaResources,
      Object.keys(eventSourceMappingFunctions)
    )
    const positionedWidgets = layOutWidgets([
      ...apiWidgets,
      ...stateMachineWidgets,
      ...dynamoDbWidgets,
      ...lambdaWidgets
    ])
    const dash = { start: timeRange.start, end: timeRange.end, widgets: positionedWidgets }
    const dashboardResource = {
      Type: 'AWS::CloudWatch::Dashboard',
      Properties: {
        DashboardName: `${context.stackName}Dashboard`,
        DashboardBody: { 'Fn::Sub': JSON.stringify(dash) }
      }
    }
    cfTemplate.addResource('slicWatchDashboard', dashboardResource)
  }

  /**
   * Create a metric for the specified metrics
   *
   * @param {string} title The metric title
   * @param {Array.<object>} metrics The metric definitions to render
   * @param {Object} Cascaded metric configuration
   */
  function createMetricWidget (title, metricDefs, metricConfig) {
    const metrics = metricDefs.map(
      ({ namespace, metric, dimensions, stat }) => [
        namespace,
        metric,
        ...Object.entries(dimensions).reduce(
          (acc, [name, value]) => [...acc, name, value],
          []
        ),
        [{ stat }]
      ]
    )

    return {
      type: 'metric',
      properties: {
        metrics,
        title,
        view: 'timeSeries',
        region: context.region,
        period: metricConfig.metricPeriod
      },
      width: metricConfig.width,
      height: metricConfig.height
    }
  }

  /**
   * Create a set of CloudWatch Dashboard widgets for the Lambda
   * CloudFormation resources provided
   *
   * @param {object} functionResources Object with of CloudFormation Lambda Function resources by resource name
   * @param {Array.<string>} eventSourceMappingFunctionResourceNames Names of Lambda function resources that are linked to EventSourceMappings
   */
  function createLambdaWidgets (
    functionResources,
    eventSourceMappingFunctionResourceNames
  ) {
    const lambdaWidgets = []
    if (Object.keys(functionResources).length > 0) {
      for (const [metric, metricConfig] of getConfiguredMetrics(lambdaDashConfig)) {
        if (metric !== 'IteratorAge') {
          for (const stat of metricConfig.Statistic) {
            const metricStatWidget = createMetricWidget(
              `Lambda ${metric} ${stat} per Function`,
              Object.values(functionResources).map((res) => ({
                namespace: 'AWS/Lambda',
                metric,
                dimensions: {
                  FunctionName: res.Properties.FunctionName
                },
                stat
              })),
              metricConfig
            )
            lambdaWidgets.push(metricStatWidget)
          }
        } else {
          for (const funcResName of eventSourceMappingFunctionResourceNames) {
            const functionName = functionResources[funcResName].Properties.FunctionName
            const stats = metricConfig.Statistic
            const iteratorAgeWidget = createMetricWidget(
              `IteratorAge ${functionName} ${stats.join(',')}`,
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
    return Object.entries(extractedConfig)
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
      for (const [metric, metricConfig] of getConfiguredMetrics(apiGwDashConfig)) {
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
      for (const [metric, metricConfig] of getConfiguredMetrics(sfDashConfig)) {
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
      for (const [metric, metricConfig] of getConfiguredMetrics(dynamoDbDashConfig)) {
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
    return ddbWidgets
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

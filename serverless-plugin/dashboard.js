'use strict'

const DASHBOARD_PERIOD = '-PT3H'
const METRIC_PERIOD = 60
const WIDGET_WIDTH = 24
const WIDGET_HEIGHT = 6
const MAX_WIDTH = 24

const LAMBDA_METRICS = {
  Errors: ['Sum'],
  Throttles: ['Sum'],
  Duration: ['Average', 'p95', 'Maximum'],
  Invocations: ['Sum'],
  ConcurrentExecutions: ['Maximum'],
}

const API_METRICS = {
  '5XXError': ['Sum'],
  '4XXError': ['Sum'],
  Latency: ['Average', 'p95'],
  Count: ['Sum'],
}

module.exports = function dashboard(serverless, config, context) {
  return {
    addDashboard,
  }

  /**
   * Adds a dashboard to the specified CloudFormation template
   * based on the resources provided in the template.
   *
   * @param {object} cfTemplate A CloudFormation template
   */
  function addDashboard(cfTemplate) {
    const apiResources = cfTemplate.getResourcesByType(
      'AWS::ApiGateway::RestApi'
    )
    const lambdaResources = cfTemplate.getResourcesByType(
      'AWS::Lambda::Function'
    )
    const eventSourceMappingFunctions = cfTemplate.getEventSourceMappingFunctions()
    const apiWidgets = createApiWidgets(apiResources)
    const lambdaWidgets = createLambdaWidgets(
      lambdaResources,
      Object.keys(eventSourceMappingFunctions)
    )
    const positionedWidgets = layOutWidgets([...apiWidgets, ...lambdaWidgets])
    const dash = { start: DASHBOARD_PERIOD, widgets: positionedWidgets }
    const dashboardResource = {
      Type: 'AWS::CloudWatch::Dashboard',
      Properties: {
        DashboardName: `${context.stackName}Dashboard`,
        DashboardBody: JSON.stringify(dash),
      },
    }
    cfTemplate.addResource('slicWatchDashboard', dashboardResource)
  }

  /**
   * Create a metric for the specified metrics
   *
   * @param {string} title The metric title
   * @param {Array.<object>} metrics The metric definitions to render
   */
  function createMetricWidget(title, metricDefs) {
    const metrics = metricDefs.map(
      ({ namespace, metric, dimensions, stat }) => [
        namespace,
        metric,
        ...Object.entries(dimensions).reduce(
          (acc, [name, value]) => [...acc, name, value],
          []
        ),
        [{ stat }],
      ]
    )

    return {
      type: 'metric',
      properties: {
        metrics,
        title,
        view: 'timeSeries',
        region: context.region,
        period: METRIC_PERIOD,
      },
    }
  }

  /**
   * Create a set of CloudWatch Dashboard widgets for the Lambda
   * CloudFormation resources provided
   *
   * @param {object} functionResources Object with of CloudFormation Lambda Function resources by resource name
   * @param {Array.<string>} eventSourceMappingFunctionResourceNames Names of Lambda function resources that are linked to EventSourceMappings
   */
  function createLambdaWidgets(
    functionResources,
    eventSourceMappingFunctionResourceNames
  ) {
    const lambdaWidgets = []
    for (const [metric, stats] of Object.entries(LAMBDA_METRICS)) {
      for (const stat of stats) {
        const metricStatWidget = createMetricWidget(
          `${metric} ${stat} per Function`,
          Object.values(functionResources).map((res) => ({
            namespace: 'AWS/Lambda',
            metric,
            dimensions: {
              FunctionName: res.Properties.FunctionName,
            },
            stat,
          }))
        )
        lambdaWidgets.push(metricStatWidget)
      }
    }
    if (eventSourceMappingFunctionResourceNames.length > 0) {
      const iteratorAgeWidget = createMetricWidget(
        `IteratorAge Maximum per Function`,
        Object.keys(functionResources)
          .filter((resName) =>
            eventSourceMappingFunctionResourceNames.includes(resName)
          )
          .map((resName) => ({
            namespace: 'AWS/Lambda',
            metric: 'IteratorAge',
            dimensions: {
              FunctionName: functionResources[resName].Properties.FunctionName,
            },
            stat: 'Maximum',
          }))
      )
      lambdaWidgets.push(iteratorAgeWidget)
    }

    return lambdaWidgets
  }

  /**
   * Create a set of CloudWatch Dashboard widgets for the API Gateway REST API
   * CloudFormation resources provided
   *
   * @param {object} apiResources Object of CloudFormation RestApi resources by resource name
   */
  function createApiWidgets(apiResources) {
    const apiWidgets = []
    for (const res of Object.values(apiResources)) {
      const apiName = res.Properties.Name // TODO: Allow for Ref usage in resource names
      for (const [metric, stats] of Object.entries(API_METRICS)) {
        const metricStatWidget = createMetricWidget(
          `${metric} for ${apiName} API`,
          Object.values(stats).map((stat) => ({
            namespace: 'AWS/ApiGateway',
            metric,
            dimensions: {
              ApiName: apiName,
            },
            stat,
          }))
        )
        apiWidgets.push(metricStatWidget)
      }
    }
    return apiWidgets
  }

  /**
   * Set the location and dimension properties of each provided widget
   *
   * @param {Array.<object>} widgets A set of dashboard widgets
   * @return {Array.<object>} A set of dashboard widgets with layout properties set
   */
  function layOutWidgets(widgets) {
    let x = 0
    let y = 0

    return widgets.map((widget) => {
      if (x + WIDGET_WIDTH > MAX_WIDTH) {
        y += WIDGET_HEIGHT
        x = 0
      }
      const positionedWidget = {
        ...widget,
        x,
        y,
        width: WIDGET_WIDTH,
        height: WIDGET_HEIGHT,
      }
      x += WIDGET_WIDTH
      return positionedWidget
    })
  }
}

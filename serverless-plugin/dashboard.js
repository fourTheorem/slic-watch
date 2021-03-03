'use strict'

const { filterObject } = require('./util')

const DASHBOARD_PERIOD = '-PT3H'
const METRIC_PERIOD = 60
const WIDGET_WIDTH = 24
const WIDGET_HEIGHT = 6
const MAX_WIDTH = 24

const LAMBDA_FUNCTION_METRICS = {
  Duration: ['Average', 'p95', 'Maximum'],
  Invocations: ['Sum'],
  ConcurrentExecutions: ['Maximum'],
  Throttles: ['Sum'],
  Errors: ['Sum'],
}

module.exports = function dashboard(serverless, config) {
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
    const lambdaResources = filterObject(
      cfTemplate.Resources,
      (resource) => resource.Type === 'AWS::Lambda::Function'
    )
    const widgets = createLambdaWidgets(lambdaResources)
    const positionedWidgets = layOutWidgets(widgets)
    const dash = { start: DASHBOARD_PERIOD, widgets: positionedWidgets }
    const dashboardResource = {
      Type: 'AWS::CloudWatch::Dashboard',
      Properties: {
        DashboardName: `${config.stackName}Dashboard`,
        DashboardBody: JSON.stringify(dash),
      },
    }
    cfTemplate.Resources.slicWatchDashboard = dashboardResource
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
        region: config.region,
        period: METRIC_PERIOD,
      },
    }
  }

  /**
   * Create a set of CloudWatch Dashboard widgets for the Lambda
   * CloudFormation resources provided
   *
   * @param {Array.<object>} functionResources List of CloudFormation Lambda Function resources
   */
  function createLambdaWidgets(functionResources) {
    const lambdaWidgets = []
    Object.entries(LAMBDA_FUNCTION_METRICS).forEach(([metric, stats]) => {
      stats.forEach((stat) => {
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
      })
    })

    return lambdaWidgets
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

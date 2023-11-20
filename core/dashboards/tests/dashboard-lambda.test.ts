import { merge } from 'lodash'

import { test } from 'tap'
import { type MetricWidgetProperties } from 'cloudwatch-dashboard-types'

import addDashboard from '../dashboard'
import defaultConfig from '../../inputs/default-config'

import { createTestCloudFormationTemplate, getDashboardFromTemplate, getDashboardWidgetsByTitle } from '../../tests/testing-utils'
import { getResourcesByType, type ResourceType } from '../../cf-template'

test('dashboard contains configured Lambda Function resources', (t) => {
  const lambdaMetrics = ['Errors', 'Duration', 'IteratorAge', 'Invocations', 'ConcurrentExecutions', 'Throttles']

  t.test('dashboards includes Lambda metrics', (t) => {
    const template = createTestCloudFormationTemplate()
    addDashboard(defaultConfig.dashboard, template)
    const { dashboard } = getDashboardFromTemplate(template)

    const widgets = getDashboardWidgetsByTitle(dashboard,
      /Lambda Duration Average/,
      /Lambda Duration p95/,
      /Lambda Duration Maximum/,
      /Lambda Invocations/,
      /Lambda IteratorAge .* Maximum/,
      /Lambda ConcurrentExecutions/,
      /Lambda Throttles/,
      /Lambda Errors/
    )

    for (const widget of widgets) {
      t.ok(widget)
    }

    const [
      durationAvgWidget, durationP95Widget, durationMaxWidget, invocationsWidget, iteratorAgeWidget, concurrentExecutionsWidget, throttlesWidget, errorsWidget
    ] = widgets

    t.match((durationAvgWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Lambda', 'Duration', 'FunctionName', '${HelloLambdaFunction}', { stat: 'Average', yAxis: 'left' }]
    ])
    t.match((durationP95Widget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Lambda', 'Duration', 'FunctionName', '${HelloLambdaFunction}', { stat: 'p95', yAxis: 'left' }]
    ])
    t.match((durationMaxWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Lambda', 'Duration', 'FunctionName', '${HelloLambdaFunction}', { stat: 'Maximum', yAxis: 'left' }]
    ])
    t.match((invocationsWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Lambda', 'Invocations', 'FunctionName', '${HelloLambdaFunction}', { stat: 'Sum', yAxis: 'left' }]
    ])
    t.match((iteratorAgeWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Lambda', 'IteratorAge', 'FunctionName', '${StreamProcessorLambdaFunction}', { stat: 'Maximum', yAxis: 'left' }]
    ])
    t.match((concurrentExecutionsWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Lambda', 'ConcurrentExecutions', 'FunctionName', '${HelloLambdaFunction}', { stat: 'Maximum', yAxis: 'left' }]
    ])
    t.match((throttlesWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Lambda', 'Throttles', 'FunctionName', '${HelloLambdaFunction}', { stat: 'Sum', yAxis: 'left' }]
    ])
    t.match((errorsWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Lambda', 'Errors', 'FunctionName', '${HelloLambdaFunction}', { stat: 'Sum', yAxis: 'left' }]
    ])

    for (const widget of widgets) {
      const props: MetricWidgetProperties = widget.properties as MetricWidgetProperties
      t.ok((props.metrics?.length ?? 0) > 0)
      t.equal(props.period, 300)
      t.equal(props.view, 'timeSeries')
    }

    t.end()
  })

  t.test('service config overrides take precedence', (t) => {
    const template = createTestCloudFormationTemplate()

    const config = merge({}, defaultConfig.dashboard, {
      widgets: {
        Lambda: {
          metricPeriod: 900,
          width: 8,
          height: 12,
          Errors: {
            Statistic: ['ts80'],
            yAxis: 'right'
          },
          Throttles: {
            Statistic: ['Maximum'],
            enabled: false
          },
          Duration: {
            Statistic: ['p90', 'Average', 'Maximum']
          },
          Invocations: {
            Statistic: ['ts90']
          },
          ConcurrentExecutions: {
            Statistic: ['p95']
          },
          IteratorAge: {
            Statistic: ['p98']
          }
        }
      }
    })

    addDashboard(config, template)

    const { dashboard } = getDashboardFromTemplate(template)
    const widgets = getDashboardWidgetsByTitle(dashboard,
      /Lambda Duration Average/,
      /Lambda Duration p90/,
      /Lambda Duration Maximum/,
      /Lambda Invocations/,
      /Lambda IteratorAge .* p98/,
      /Lambda ConcurrentExecutions/,
      /Lambda Throttles/,
      /Lambda Errors/
    )

    const [
      durationAvgWidget, durationP90Widget, durationMaxWidget, invocationsWidget, iteratorAgeWidget, concurrentExecutionsWidget, throttlesWidget, errorsWidget
    ] = widgets

    t.match((durationAvgWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Lambda', 'Duration', 'FunctionName', '${HelloLambdaFunction}', { stat: 'Average', yAxis: 'left' }]
    ])

    t.match((durationP90Widget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Lambda', 'Duration', 'FunctionName', '${HelloLambdaFunction}', { stat: 'p90', yAxis: 'left' }]
    ])

    t.match((durationMaxWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Lambda', 'Duration', 'FunctionName', '${HelloLambdaFunction}', { stat: 'Maximum', yAxis: 'left' }]
    ])

    for (const widget of widgets) {
      if (widget !== undefined) {
        t.match(widget, { width: 8, height: 12 })
        t.equal((widget.properties as MetricWidgetProperties).period, 900)
      }
    }
    t.notOk(throttlesWidget)

    t.match((invocationsWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Lambda', 'Invocations', 'FunctionName', '${HelloLambdaFunction}', { stat: 'ts90', yAxis: 'left' }]
    ])
    t.match((iteratorAgeWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Lambda', 'IteratorAge', 'FunctionName', '${StreamProcessorLambdaFunction}', { stat: 'p98', yAxis: 'left' }]
    ])
    t.match((concurrentExecutionsWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Lambda', 'ConcurrentExecutions', 'FunctionName', '${HelloLambdaFunction}', { stat: 'p95', yAxis: 'left' }]
    ])
    t.match((errorsWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Lambda', 'Errors', 'FunctionName', '${HelloLambdaFunction}', { stat: 'ts80', yAxis: 'right' }]
    ])

    t.end()
  })

  t.test('resource config overrides take precedence', (t) => {
    const template = createTestCloudFormationTemplate();

    (template.Resources as ResourceType).HelloLambdaFunction.Metadata = {
      slicWatch: {
        dashboard: {
          Errors: {
            yAxis: 'right'
          }
        }
      }
    }

    addDashboard(defaultConfig.dashboard, template)

    const { dashboard } = getDashboardFromTemplate(template)
    const widgets = getDashboardWidgetsByTitle(dashboard,
      /Lambda Errors/
    )

    const [errorsWidget] = widgets
    t.equal((errorsWidget.properties as MetricWidgetProperties).period, 300)

    t.match((errorsWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Lambda', 'Errors', 'FunctionName', '${HelloLambdaFunction}', { stat: 'Sum', yAxis: 'right' }]
    ])

    t.end()
  })

  test('A widget is not created for Lambda if disabled at a function level', (t) => {
    for (const metric of lambdaMetrics) {
      const compiledTemplate = createTestCloudFormationTemplate();
      (compiledTemplate.Resources as ResourceType).HelloLambdaFunction.Metadata = {
        slicWatch: {
          dashboard: { enabled: false }
        }
      }

      addDashboard(defaultConfig.dashboard, compiledTemplate)
      const dashResources = getResourcesByType('AWS::CloudWatch::Dashboard', compiledTemplate)
      const [, dashResource] = Object.entries(dashResources)[0]
      const dashboard = JSON.parse(dashResource.Properties?.DashboardBody['Fn::Sub'])

      const widgets = dashboard.widgets.filter(({ properties: { title } }) =>
        title.startsWith(`Lambda ${metric}`)
      )
      const widgetMetrics = widgets[0].properties.metrics
      const functionNames = widgetMetrics.map(widgetMetric => widgetMetric[3])
      t.ok(functionNames.length > 0)
      t.equal(functionNames.indexOf('serverless-test-project-dev-hello'), -1, `${metric} is disabled`)
    }
    t.end()
  })

  test('No Lambda widgets are created if all metrics for functions are disabled', (t) => {
    const compiledTemplate = createTestCloudFormationTemplate()
    const allFunctionLogicalIds = Object.keys(getResourcesByType('AWS::Lambda::Function', compiledTemplate))
    for (const funcLogicalId of allFunctionLogicalIds) {
      (compiledTemplate.Resources as ResourceType)[funcLogicalId].Metadata = {
        slicWatch: {
          dashboard: Object.fromEntries(lambdaMetrics.map((metric) => ([
            metric, { enabled: false }
          ])))
        }
      }
    }

    addDashboard(defaultConfig.dashboard, compiledTemplate)
    const dashResources = getResourcesByType('AWS::CloudWatch::Dashboard', compiledTemplate)
    const [, dashResource] = Object.entries(dashResources)[0]
    const dashboard = JSON.parse(dashResource.Properties?.DashboardBody['Fn::Sub'])

    const widgets = dashboard.widgets.filter(({ properties: { title } }) =>
      title.startsWith('Lambda')
    )
    t.equal(widgets.length, 0)
    t.end()
  })

  test('A widget is not created for Lambda if disabled at a function level for each metric', (t) => {
    for (const metric of lambdaMetrics) {
      const compiledTemplate = createTestCloudFormationTemplate();
      (compiledTemplate.Resources as ResourceType).HelloLambdaFunction.Metadata = {
        slicWatch: {
          dashboard: Object.fromEntries(lambdaMetrics.map((metric) => ([
            metric, { enabled: false }
          ])))
        }
      }

      addDashboard(defaultConfig.dashboard, compiledTemplate)
      const dashResources = getResourcesByType('AWS::CloudWatch::Dashboard', compiledTemplate)
      const [, dashResource] = Object.entries(dashResources)[0]
      const dashboard = JSON.parse(dashResource.Properties?.DashboardBody['Fn::Sub'])

      const widgets = dashboard.widgets.filter(({ properties: { title } }) =>
        title.startsWith(`Lambda ${metric}`)
      )
      const widgetMetrics = widgets[0].properties.metrics
      const functionNames = widgetMetrics.map(widgetMetric => widgetMetric[3])
      t.ok(functionNames.length > 0)
      t.equal(functionNames.indexOf('serverless-test-project-dev-hello'), -1, `${metric} is disabled`)
    }
    t.end()
  })

  t.end()
})

import { merge } from 'lodash'

import { test } from 'tap'
import { type MetricWidgetProperties } from 'cloudwatch-dashboard-types'

import addDashboard from '../dashboard'
import defaultConfig from '../../inputs/default-config'

import { createTestCloudFormationTemplate, getDashboardFromTemplate, getDashboardWidgetsByTitle } from '../../tests/testing-utils'
import { type ResourceType } from '../../cf-template'

test('dashboard contains configured Lambda Function resources', (t) => {
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
  t.end()
})

import { merge } from 'lodash'
import { test } from 'tap'
import { type MetricWidgetProperties } from 'cloudwatch-dashboard-types'

import { type ResourceType } from '../../cf-template'
import addDashboard from '../dashboard'
import defaultConfig from '../../inputs/default-config'

import { createTestCloudFormationTemplate, getDashboardFromTemplate, getDashboardWidgetsByTitle } from '../../tests/testing-utils'

test('dashboard contains configured Step Function resources', (t) => {
  t.test('dashboards includes Step Function metrics', (t) => {
    const template = createTestCloudFormationTemplate()
    addDashboard(defaultConfig.dashboard, template)
    const { dashboard } = getDashboardFromTemplate(template)

    const widgets = getDashboardWidgetsByTitle(dashboard,
      /\${Workflow\.Name\} Step Function Executions/,
      /\${ExpressWorkflow\.Name\} Step Function Executions/
    )

    for (const widget of widgets) {
      t.ok(widget)
    }

    const [
      standardWidget, expressWidget
    ] = widgets

    t.match((standardWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/States', 'ExecutionsFailed', 'StateMachineArn', '${Workflow}', { stat: 'Sum', yAxis: 'left' }],
      ['AWS/States', 'ExecutionThrottled', 'StateMachineArn', '${Workflow}', { stat: 'Sum', yAxis: 'left' }],
      ['AWS/States', 'ExecutionsTimedOut', 'StateMachineArn', '${Workflow}', { stat: 'Sum', yAxis: 'left' }]
    ])

    t.match((expressWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/States', 'ExecutionsFailed', 'StateMachineArn', '${ExpressWorkflow}', { stat: 'Sum', yAxis: 'left' }],
      ['AWS/States', 'ExecutionThrottled', 'StateMachineArn', '${ExpressWorkflow}', { stat: 'Sum', yAxis: 'left' }],
      ['AWS/States', 'ExecutionsTimedOut', 'StateMachineArn', '${ExpressWorkflow}', { stat: 'Sum', yAxis: 'left' }]
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
        States: {
          metricPeriod: 900,
          width: 8,
          height: 12,
          ExecutionsFailed: {
            Statistic: ['ts80'],
            yAxis: 'right'
          },
          ExecutionsTimedOut: {
            enabled: false,
            Statistic: ['ts80'],
            yAxis: 'right'
          }
        }
      }
    })
    addDashboard(config, template)
    const { dashboard } = getDashboardFromTemplate(template)

    const widgets = getDashboardWidgetsByTitle(dashboard,
      /\${Workflow\.Name\} Step Function Executions/,
      /\${ExpressWorkflow\.Name\} Step Function Executions/
    )

    for (const widget of widgets) {
      t.ok(widget)
    }

    const [
      standardWidget, expressWidget
    ] = widgets

    t.match((standardWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/States', 'ExecutionsFailed', 'StateMachineArn', '${Workflow}', { stat: 'ts80', yAxis: 'right' }],
      ['AWS/States', 'ExecutionThrottled', 'StateMachineArn', '${Workflow}', { stat: 'Sum', yAxis: 'left' }]
    ])

    t.match((expressWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/States', 'ExecutionsFailed', 'StateMachineArn', '${ExpressWorkflow}', { stat: 'ts80', yAxis: 'right' }],
      ['AWS/States', 'ExecutionThrottled', 'StateMachineArn', '${ExpressWorkflow}', { stat: 'Sum', yAxis: 'left' }]
    ])

    for (const widget of widgets) {
      const props: MetricWidgetProperties = widget.properties as MetricWidgetProperties
      t.ok((props.metrics?.length ?? 0) > 0)
      t.equal(props.period, 900)
      t.equal(props.view, 'timeSeries')
    }

    t.end()
  })

  t.test('resource config overrides take precedence', (t) => {
    const template = createTestCloudFormationTemplate();
    (template.Resources as ResourceType).ExpressWorkflow.Metadata = {
      slicWatch: {
        dashboard: {
          ExecutionsFailed: {
            Statistic: ['ts80'],
            yAxis: 'right'
          },
          ExecutionsTimedOut: {
            enabled: false,
            Statistic: ['ts80'],
            yAxis: 'right'
          }
        }
      }
    }

    addDashboard(defaultConfig.dashboard, template)
    const { dashboard } = getDashboardFromTemplate(template)

    const widgets = getDashboardWidgetsByTitle(dashboard,
      /\${Workflow\.Name\} Step Function Executions/,
      /\${ExpressWorkflow\.Name\} Step Function Executions/
    )

    for (const widget of widgets) {
      t.ok(widget)
    }

    const [
      standardWidget, expressWidget
    ] = widgets

    t.match((standardWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/States', 'ExecutionsFailed', 'StateMachineArn', '${Workflow}', { stat: 'Sum', yAxis: 'left' }],
      ['AWS/States', 'ExecutionThrottled', 'StateMachineArn', '${Workflow}', { stat: 'Sum', yAxis: 'left' }]
    ])

    t.match((expressWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/States', 'ExecutionsFailed', 'StateMachineArn', '${ExpressWorkflow}', { stat: 'ts80', yAxis: 'right' }],
      ['AWS/States', 'ExecutionThrottled', 'StateMachineArn', '${ExpressWorkflow}', { stat: 'Sum', yAxis: 'left' }]
    ])

    for (const widget of widgets) {
      const props: MetricWidgetProperties = widget.properties as MetricWidgetProperties
      t.ok((props.metrics?.length ?? 0) > 0)
      t.equal(props.period, 300)
      t.equal(props.view, 'timeSeries')
    }

    t.end()
  })

  t.end()
})

import { test } from 'tap'
import { type MetricWidgetProperties } from 'cloudwatch-dashboard-types'

import addDashboard from '../dashboard'
import defaultConfig from '../../inputs/default-config'

import { createTestCloudFormationTemplate, getDashboardFromTemplate, getDashboardWidgetsByTitle } from '../../tests/testing-utils'
import { type ResourceType } from '../../cf-template'

test('dashboard contains configured API Gateway resources', (t) => {
  t.test('includes API metrics', (t) => {
    const template = createTestCloudFormationTemplate()
    addDashboard(defaultConfig.dashboard, template)

    const { dashboard } = getDashboardFromTemplate(template)
    const widgets = getDashboardWidgetsByTitle(dashboard,
      /4XXError API /,
      /5XXError API /,
      /Count API /,
      /Latency API /
    )
    const [code4xxWidget, code5xxWidget, countWidget, latencyWidget] = widgets

    t.same((code4xxWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/ApiGateway', '4XXError', 'ApiName', 'dev-serverless-test-project', { stat: 'Sum', yAxis: 'left' }]
    ])

    t.same((code5xxWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/ApiGateway', '5XXError', 'ApiName', 'dev-serverless-test-project', { stat: 'Sum', yAxis: 'left' }]
    ])

    t.same((countWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/ApiGateway', 'Count', 'ApiName', 'dev-serverless-test-project', { stat: 'Sum', yAxis: 'left' }]
    ])

    t.same((latencyWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/ApiGateway', 'Latency', 'ApiName', 'dev-serverless-test-project', { stat: 'Average', yAxis: 'left' }],
      ['AWS/ApiGateway', 'Latency', 'ApiName', 'dev-serverless-test-project', { stat: 'p95', yAxis: 'left' }]
    ])

    for (const widget of widgets) {
      const props: MetricWidgetProperties = widget.properties as MetricWidgetProperties
      t.ok((props.metrics?.length ?? 0) > 0)
      t.equal(props.period, 300)
      t.equal(props.view, 'timeSeries')
    }

    t.end()
  })

  t.test('resource config overrides take precedence', (t) => {
    const template = createTestCloudFormationTemplate();

    (template.Resources as ResourceType).ApiGatewayRestApi.Metadata = {
      slicWatch: {
        dashboard: {
          metricPeriod: 900,
          width: 24,
          height: 12,
          '5XXError': {
            enabled: true,
            Statistic: ['p95']
          },
          '4XXError': {
            enabled: false,
            Statistic: ['p10']
          },
          Count: {
            Statistic: ['Maximum', 'Minimum']
          },
          Latency: {
            yAxis: 'right',
            width: 24,
            height: 24,
            Statistic: ['Average', 'p50']
          }
        }
      }
    }

    addDashboard(defaultConfig.dashboard, template)

    const { dashboard } = getDashboardFromTemplate(template)
    const widgets = getDashboardWidgetsByTitle(dashboard,
      /4XXError API /,
      /5XXError API /,
      /Count API /,
      /Latency API /
    )
    const [code4xxWidget, code5xxWidget, countWidget, latencyWidget] = widgets

    t.notOk(code4xxWidget)

    t.same((code5xxWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/ApiGateway', '5XXError', 'ApiName', 'dev-serverless-test-project', { stat: 'p95', yAxis: 'left' }]
    ])
    t.match(code5xxWidget, { width: 24, height: 12 })

    t.same((countWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/ApiGateway', 'Count', 'ApiName', 'dev-serverless-test-project', { stat: 'Maximum', yAxis: 'left' }],
      ['AWS/ApiGateway', 'Count', 'ApiName', 'dev-serverless-test-project', { stat: 'Minimum', yAxis: 'left' }]
    ])

    t.same((latencyWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/ApiGateway', 'Latency', 'ApiName', 'dev-serverless-test-project', { stat: 'Average', yAxis: 'right' }],
      ['AWS/ApiGateway', 'Latency', 'ApiName', 'dev-serverless-test-project', { stat: 'p50', yAxis: 'right' }]
    ])
    t.match(latencyWidget, { width: 24, height: 24 })

    for (const widget of widgets.filter(widget => Boolean(widget))) {
      const props: MetricWidgetProperties = widget.properties as MetricWidgetProperties
      t.ok((props.metrics?.length ?? 0) > 0)
      t.equal(props.period, 900)
      t.equal(props.view, 'timeSeries')
    }

    t.end()
  })
  t.end()
})

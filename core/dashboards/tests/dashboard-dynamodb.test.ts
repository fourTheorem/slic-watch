import { merge } from 'lodash'
import { test } from 'tap'
import { type MetricWidgetProperties } from 'cloudwatch-dashboard-types'

import { type ResourceType } from '../../cf-template'
import addDashboard from '../dashboard'
import defaultConfig from '../../inputs/default-config'

import { createTestCloudFormationTemplate, getDashboardFromTemplate, getDashboardWidgetsByTitle } from '../../tests/testing-utils'

test('dashboard contains configured DynamoDB resources', (t) => {
  t.test('dashboards includes DynamoDB metrics', (t) => {
    const template = createTestCloudFormationTemplate()
    addDashboard(defaultConfig.dashboard, template)
    const { dashboard } = getDashboardFromTemplate(template)

    const widgets = getDashboardWidgetsByTitle(dashboard,
      /ReadThrottleEvents Table /,
      /ReadThrottleEvents GSI GSI1 in /,
      /WriteThrottleEvents Table /,
      /WriteThrottleEvents GSI GSI1 in /
    )

    for (const widget of widgets) {
      t.ok(widget)
    }

    const [
      readThrottlesWidget, readThrottlesGsiWidget, writeThrottlesWidget, writeThrottlesGsiWidget
    ] = widgets
    t.match((readThrottlesWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/DynamoDB', 'ReadThrottleEvents', 'TableName', '${dataTable}', { stat: 'Sum', yAxis: 'left' }]
    ])
    t.match((readThrottlesGsiWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/DynamoDB', 'ReadThrottleEvents', 'TableName', '${dataTable}', 'GlobalSecondaryIndex', 'GSI1', { stat: 'Sum', yAxis: 'left' }]
    ])
    t.match((writeThrottlesWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/DynamoDB', 'WriteThrottleEvents', 'TableName', '${dataTable}', { stat: 'Sum', yAxis: 'left' }]
    ])
    t.match((writeThrottlesGsiWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/DynamoDB', 'WriteThrottleEvents', 'TableName', '${dataTable}', 'GlobalSecondaryIndex', 'GSI1', { stat: 'Sum', yAxis: 'left' }]
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
        DynamoDB: {
          metricPeriod: 900,
          width: 8,
          height: 12,
          ReadThrottleEvents: {
            Statistic: ['ts80'],
            yAxis: 'right',
            enabled: false
          },
          WriteThrottleEvents: {
            Statistic: ['ts80'],
            yAxis: 'right'
          }
        }
      }
    })

    addDashboard(config, template)
    const { dashboard } = getDashboardFromTemplate(template)
    const widgets = getDashboardWidgetsByTitle(dashboard,
      /ReadThrottleEvents Table /,
      /ReadThrottleEvents GSI GSI1 in /,
      /WriteThrottleEvents Table /,
      /WriteThrottleEvents GSI GSI1 in /
    )

    const [
      readThrottlesWidget, readThrottlesGsiWidget, writeThrottlesWidget, writeThrottlesGsiWidget
    ] = widgets
    t.ok(writeThrottlesWidget)
    t.ok(writeThrottlesGsiWidget)
    t.notOk(readThrottlesWidget)
    t.notOk(readThrottlesGsiWidget)

    t.match((writeThrottlesWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/DynamoDB', 'WriteThrottleEvents', 'TableName', '${dataTable}', { stat: 'ts80', yAxis: 'right' }]
    ])
    t.match((writeThrottlesGsiWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/DynamoDB', 'WriteThrottleEvents', 'TableName', '${dataTable}', 'GlobalSecondaryIndex', 'GSI1', { stat: 'ts80', yAxis: 'right' }]
    ])

    for (const widget of widgets.filter(w => Boolean(w))) {
      const props: MetricWidgetProperties = widget.properties as MetricWidgetProperties
      t.equal(props.period, 900)
      t.equal(props.view, 'timeSeries')
      t.equal(widget.width, 8)
      t.equal(widget.height, 12)
    }
    t.end()
  })

  t.test('resource config overrides take precedence', (t) => {
    const template = createTestCloudFormationTemplate();
    (template.Resources as ResourceType).dataTable.Metadata = {
      slicWatch: {
        dashboard: {
          ThrottledPutRecordCount: {
            Statistic: ['Average'],
            yAxis: 'right',
            enabled: true
          },
          ReadThrottleEvents: {
            enabled: false,
            metricPeriod: 600
          }
        }
      }
    }

    addDashboard(defaultConfig.dashboard, template)

    const { dashboard } = getDashboardFromTemplate(template)
    const widgets = getDashboardWidgetsByTitle(dashboard,
      /ReadThrottleEvents Table /,
      /ReadThrottleEvents GSI GSI1 in /,
      /WriteThrottleEvents Table /,
      /WriteThrottleEvents GSI GSI1 in /,
      /ThrottledPutRecordCount Table /,
      /ThrottledPutRecordCount GSI GSI1 in /
    )

    const [
      readThrottlesWidget, readThrottlesGsiWidget, writeThrottlesWidget, writeThrottlesGsiWidget,
      throttledPutRecordWidget, throttledPutRecordGsiWidget
    ] = widgets
    t.ok(writeThrottlesWidget)
    t.ok(writeThrottlesGsiWidget)
    t.notOk(readThrottlesWidget)
    t.notOk(readThrottlesGsiWidget)
    t.ok(throttledPutRecordWidget)
    t.ok(throttledPutRecordGsiWidget)

    t.match((writeThrottlesWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/DynamoDB', 'WriteThrottleEvents', 'TableName', '${dataTable}', { stat: 'Sum', yAxis: 'left' }]
    ])
    t.match((writeThrottlesGsiWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/DynamoDB', 'WriteThrottleEvents', 'TableName', '${dataTable}', 'GlobalSecondaryIndex', 'GSI1', { stat: 'Sum', yAxis: 'left' }]
    ])
    const throttledPutRecordProps = throttledPutRecordWidget.properties as MetricWidgetProperties
    t.equal(throttledPutRecordProps.period, 300)
    t.equal(throttledPutRecordProps.view, 'timeSeries')
    t.match(throttledPutRecordProps.metrics, [
      ['AWS/DynamoDB', 'ThrottledPutRecordCount', 'TableName', '${dataTable}', { stat: 'Average', yAxis: 'right' }]
    ])
    const throttledPutRecordGsiProps = throttledPutRecordGsiWidget.properties as MetricWidgetProperties
    t.equal(throttledPutRecordGsiProps.period, 300)
    t.match(throttledPutRecordGsiProps.metrics, [
      ['AWS/DynamoDB', 'ThrottledPutRecordCount', 'TableName', '${dataTable}', 'GlobalSecondaryIndex', 'GSI1', { stat: 'Average', yAxis: 'right' }]
    ])
    t.end()
  })

  t.end()
})

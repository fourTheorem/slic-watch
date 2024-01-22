import { merge } from 'lodash'

import { test } from 'tap'
import { type MetricWidgetProperties } from 'cloudwatch-dashboard-types'

import addDashboard from '../dashboard'
import defaultConfig from '../../inputs/default-config'

import { createTestCloudFormationTemplate, getDashboardFromTemplate, getDashboardWidgetsByTitle } from '../../tests/testing-utils'
import { type ResourceType } from '../../cf-template'

test('dashboard contains configured Kinesis Data Stream resources', (t) => {
  t.test('dashboards includes stream metrics', (t) => {
    const template = createTestCloudFormationTemplate()
    addDashboard(defaultConfig.dashboard, template)
    const { dashboard } = getDashboardFromTemplate(template)

    const widgets = getDashboardWidgetsByTitle(dashboard,
      /IteratorAge .* Kinesis/,
      /Get\/Put Success .* Kinesis/,
      /Provisioned Throughput .* Kinesis/
    )

    for (const widget of widgets) {
      t.ok(widget)
    }

    const [
      iteratorAgeWidget, getPutSuccessWidget, provisionedThroughputWidget
    ] = widgets
    t.same((iteratorAgeWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Kinesis', 'GetRecords.IteratorAgeMilliseconds', 'StreamName', '${stream}', { stat: 'Maximum', yAxis: 'left' }]
    ])

    t.same((getPutSuccessWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Kinesis', 'PutRecord.Success', 'StreamName', '${stream}', { stat: 'Average', yAxis: 'left' }],
      ['AWS/Kinesis', 'PutRecords.Success', 'StreamName', '${stream}', { stat: 'Average', yAxis: 'left' }],
      ['AWS/Kinesis', 'GetRecords.Success', 'StreamName', '${stream}', { stat: 'Average', yAxis: 'left' }]
    ])

    t.same((provisionedThroughputWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Kinesis', 'ReadProvisionedThroughputExceeded', 'StreamName', '${stream}', { stat: 'Sum', yAxis: 'left' }],
      ['AWS/Kinesis', 'WriteProvisionedThroughputExceeded', 'StreamName', '${stream}', { stat: 'Sum', yAxis: 'left' }]
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
        Kinesis: {
          metricPeriod: 900,
          width: 8,
          height: 12,
          'GetRecord.Success': {
            yAxis: 'right'
          },
          WriteProvisionedThroughputExceeded: {
            Statistic: ['ts80'],
            yAxis: 'right'
          }
        }
      }
    })

    addDashboard(config, template)
    const { dashboard } = getDashboardFromTemplate(template)

    const widgets = getDashboardWidgetsByTitle(dashboard,
      /IteratorAge .* Kinesis/,
      /Get\/Put Success .* Kinesis/,
      /Provisioned Throughput .* Kinesis/
    )

    for (const widget of widgets) {
      t.ok(widget)
    }

    const [
      iteratorAgeWidget, getPutSuccessWidget, provisionedThroughputWidget
    ] = widgets
    t.same((iteratorAgeWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Kinesis', 'GetRecords.IteratorAgeMilliseconds', 'StreamName', '${stream}', { stat: 'Maximum', yAxis: 'left' }]
    ])

    t.same((getPutSuccessWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Kinesis', 'PutRecord.Success', 'StreamName', '${stream}', { stat: 'Average', yAxis: 'left' }],
      ['AWS/Kinesis', 'PutRecords.Success', 'StreamName', '${stream}', { stat: 'Average', yAxis: 'left' }],
      ['AWS/Kinesis', 'GetRecords.Success', 'StreamName', '${stream}', { stat: 'Average', yAxis: 'left' }]
    ])

    t.same((provisionedThroughputWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Kinesis', 'ReadProvisionedThroughputExceeded', 'StreamName', '${stream}', { stat: 'Sum', yAxis: 'left' }],
      ['AWS/Kinesis', 'WriteProvisionedThroughputExceeded', 'StreamName', '${stream}', { stat: 'ts80', yAxis: 'right' }]
    ])

    for (const widget of widgets) {
      const props: MetricWidgetProperties = widget.properties as MetricWidgetProperties
      t.equal(widget.width, 8)
      t.equal(widget.height, 12)
      t.ok((props.metrics?.length ?? 0) > 0)
      t.equal(props.period, 900)
      t.equal(props.view, 'timeSeries')
    }

    t.end()
  })

  t.test('resource config overrides take precedence', (t) => {
    const template = createTestCloudFormationTemplate();
    (template.Resources as ResourceType).stream.Metadata = {
      slicWatch: {
        dashboard: {
          'GetRecords.IteratorAgeMilliseconds': {
            Statistic: ['Average'],
            yAxis: 'right',
            enabled: true
          },
          ReadProvisionedThroughputExceeded: {
            enabled: false,
            metricPeriod: 600
          },
          WriteProvisionedThroughputExceeded: {
            yAxis: 'right'
          }
        }
      }
    }

    addDashboard(defaultConfig.dashboard, template)
    const { dashboard } = getDashboardFromTemplate(template)

    const widgets = getDashboardWidgetsByTitle(dashboard,
      /IteratorAge .* Kinesis/,
      /Get\/Put Success .* Kinesis/,
      /Provisioned Throughput .* Kinesis/
    )

    for (const widget of widgets) {
      t.ok(widget)
    }

    const [
      iteratorAgeWidget, getPutSuccessWidget, provisionedThroughputWidget
    ] = widgets
    t.same((iteratorAgeWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Kinesis', 'GetRecords.IteratorAgeMilliseconds', 'StreamName', '${stream}', { stat: 'Average', yAxis: 'right' }]
    ])

    t.same((getPutSuccessWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Kinesis', 'PutRecord.Success', 'StreamName', '${stream}', { stat: 'Average', yAxis: 'left' }],
      ['AWS/Kinesis', 'PutRecords.Success', 'StreamName', '${stream}', { stat: 'Average', yAxis: 'left' }],
      ['AWS/Kinesis', 'GetRecords.Success', 'StreamName', '${stream}', { stat: 'Average', yAxis: 'left' }]
    ])

    t.same((provisionedThroughputWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Kinesis', 'WriteProvisionedThroughputExceeded', 'StreamName', '${stream}', { stat: 'Sum', yAxis: 'right' }]
    ])

    t.end()
  })
  t.end()
})

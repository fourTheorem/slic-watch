import { merge } from 'lodash'
import { test } from 'tap'
import { type MetricWidgetProperties } from 'cloudwatch-dashboard-types'

import { type ResourceType } from '../../cf-template'
import addDashboard from '../dashboard'
import defaultConfig from '../../inputs/default-config'

import { createTestCloudFormationTemplate, getDashboardFromTemplate, getDashboardWidgetsByTitle } from '../../tests/testing-utils'

test('dashboard contains configured SQS resources', (t) => {
  t.test('dashboards includes SQS metrics', (t) => {
    const template = createTestCloudFormationTemplate()
    addDashboard(defaultConfig.dashboard, template)
    const { dashboard } = getDashboardFromTemplate(template)

    const widgets = getDashboardWidgetsByTitle(dashboard,
      /Messages \$\{regularQueue\.QueueName\} SQS/,
      /Oldest Message age .*regular.* SQS/,
      /Messages in queue .*regular.* SQS/,
      /Messages \$\{fifoQueue\.QueueName\} SQS/,
      /Oldest Message age .*fifo.* SQS/,
      /Messages in queue .*fifo.* SQS/
    )

    for (const widget of widgets) {
      t.ok(widget)
    }

    const [
      regularMessagesWidget, regularOldestMessageAgeWidget, regularQueueMessagesWidget,
      fifoMessagesWidget, fifoOldestMessageAgeWidget, fifoQueueMessagesWidget
    ] = widgets

    t.same((regularMessagesWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/SQS', 'NumberOfMessagesSent', 'QueueName', '${regularQueue.QueueName}', { stat: 'Sum', yAxis: 'left' }],
      ['AWS/SQS', 'NumberOfMessagesReceived', 'QueueName', '${regularQueue.QueueName}', { stat: 'Sum', yAxis: 'left' }],
      ['AWS/SQS', 'NumberOfMessagesDeleted', 'QueueName', '${regularQueue.QueueName}', { stat: 'Sum', yAxis: 'left' }]
    ])

    t.same((regularOldestMessageAgeWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/SQS', 'ApproximateAgeOfOldestMessage', 'QueueName', '${regularQueue.QueueName}', { stat: 'Maximum', yAxis: 'left' }]
    ])

    t.same((regularQueueMessagesWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/SQS', 'ApproximateNumberOfMessagesVisible', 'QueueName', '${regularQueue.QueueName}', { stat: 'Maximum', yAxis: 'left' }]
    ])

    t.same((fifoMessagesWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/SQS', 'NumberOfMessagesSent', 'QueueName', '${fifoQueue.QueueName}', { stat: 'Sum', yAxis: 'left' }],
      ['AWS/SQS', 'NumberOfMessagesReceived', 'QueueName', '${fifoQueue.QueueName}', { stat: 'Sum', yAxis: 'left' }],
      ['AWS/SQS', 'NumberOfMessagesDeleted', 'QueueName', '${fifoQueue.QueueName}', { stat: 'Sum', yAxis: 'left' }]
    ])

    t.same((fifoOldestMessageAgeWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/SQS', 'ApproximateAgeOfOldestMessage', 'QueueName', '${fifoQueue.QueueName}', { stat: 'Maximum', yAxis: 'left' }]
    ])

    t.same((fifoQueueMessagesWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/SQS', 'ApproximateNumberOfMessagesVisible', 'QueueName', '${fifoQueue.QueueName}', { stat: 'Maximum', yAxis: 'left' }]

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
        SQS: {
          metricPeriod: 900,
          width: 8,
          height: 12,
          NumberOfMessagesSent: {
            enabled: false
          },
          NumberOfMessagesReceived: {
            Statistic: ['ts80'],
            yAxis: 'right'
          },
          NumberOfMessagesDeleted: {
            enabled: false
          },
          ApproximateAgeOfOldestMessage: {
            Statistic: ['ts85'],
            yAxis: 'left'
          },
          ApproximateNumberOfMessagesVisible: {
            Statistic: ['ts90'],
            enabled: false
          }
        }
      }
    })

    addDashboard(config, template)
    const { dashboard } = getDashboardFromTemplate(template)

    const widgets = getDashboardWidgetsByTitle(dashboard,
      /Messages \$\{regularQueue\.QueueName\} SQS/,
      /Oldest Message age .*regular.* SQS/,
      /Messages in queue .*regular.* SQS/,
      /Messages \$\{fifoQueue\.QueueName\} SQS/,
      /Oldest Message age .*fifo.* SQS/,
      /Messages in queue .*fifo.* SQS/
    )

    const [
      regularMessagesWidget, regularOldestMessageAgeWidget, regularQueueMessagesWidget,
      fifoMessagesWidget, fifoOldestMessageAgeWidget, fifoQueueMessagesWidget
    ] = widgets
    t.ok(regularMessagesWidget)
    t.ok(regularOldestMessageAgeWidget)
    t.notOk(regularQueueMessagesWidget)
    t.ok(fifoMessagesWidget)
    t.ok(fifoOldestMessageAgeWidget)
    t.notOk(fifoQueueMessagesWidget)

    t.same((regularMessagesWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/SQS', 'NumberOfMessagesReceived', 'QueueName', '${regularQueue.QueueName}', { stat: 'ts80', yAxis: 'right' }]
    ])

    t.same((regularOldestMessageAgeWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/SQS', 'ApproximateAgeOfOldestMessage', 'QueueName', '${regularQueue.QueueName}', { stat: 'ts85', yAxis: 'left' }]
    ])

    t.same((fifoMessagesWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/SQS', 'NumberOfMessagesReceived', 'QueueName', '${fifoQueue.QueueName}', { stat: 'ts80', yAxis: 'right' }]
    ])

    t.same((fifoOldestMessageAgeWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/SQS', 'ApproximateAgeOfOldestMessage', 'QueueName', '${fifoQueue.QueueName}', { stat: 'ts85', yAxis: 'left' }]
    ])

    for (const widget of widgets) {
      if (widget !== undefined) {
        const props: MetricWidgetProperties = widget.properties as MetricWidgetProperties
        t.ok((props.metrics?.length ?? 0) > 0)
        t.equal(props.period, 900)
        t.equal(props.view, 'timeSeries')
      }
    }

    t.end()
  })

  t.test('resource config overrides take precedence', (t) => {
    const template = createTestCloudFormationTemplate();
    (template.Resources as ResourceType).fifoQueue.Metadata = {
      slicWatch: {
        dashboard: {
          NumberOfMessagesSent: {
            enabled: false
          },
          NumberOfMessagesReceived: {
            Statistic: ['ts80'],
            yAxis: 'right'
          },
          NumberOfMessagesDeleted: {
            enabled: false
          },
          ApproximateAgeOfOldestMessage: {
            Statistic: ['ts85'],
            yAxis: 'left'
          },
          ApproximateNumberOfMessagesVisible: {
            Statistic: ['ts90'],
            enabled: false
          }
        }
      }
    }

    addDashboard(defaultConfig.dashboard, template)

    const { dashboard } = getDashboardFromTemplate(template)
    const widgets = getDashboardWidgetsByTitle(dashboard,
      /Messages \$\{regularQueue\.QueueName\} SQS/,
      /Oldest Message age .*regular.* SQS/,
      /Messages in queue .*regular.* SQS/,
      /Messages \$\{fifoQueue\.QueueName\} SQS/,
      /Oldest Message age .*fifo.* SQS/,
      /Messages in queue .*fifo.* SQS/
    )

    const [
      regularMessagesWidget, regularOldestMessageAgeWidget, regularQueueMessagesWidget,
      fifoMessagesWidget, fifoOldestMessageAgeWidget, fifoQueueMessagesWidget
    ] = widgets
    t.ok(regularMessagesWidget)
    t.ok(regularOldestMessageAgeWidget)
    t.ok(regularQueueMessagesWidget)
    t.ok(fifoMessagesWidget)
    t.ok(fifoOldestMessageAgeWidget)
    t.notOk(fifoQueueMessagesWidget)

    t.same((regularMessagesWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/SQS', 'NumberOfMessagesSent', 'QueueName', '${regularQueue.QueueName}', { stat: 'Sum', yAxis: 'left' }],
      ['AWS/SQS', 'NumberOfMessagesReceived', 'QueueName', '${regularQueue.QueueName}', { stat: 'Sum', yAxis: 'left' }],
      ['AWS/SQS', 'NumberOfMessagesDeleted', 'QueueName', '${regularQueue.QueueName}', { stat: 'Sum', yAxis: 'left' }]
    ])

    t.same((regularOldestMessageAgeWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/SQS', 'ApproximateAgeOfOldestMessage', 'QueueName', '${regularQueue.QueueName}', { stat: 'Maximum', yAxis: 'left' }]
    ])

    t.same((regularQueueMessagesWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/SQS', 'ApproximateNumberOfMessagesVisible', 'QueueName', '${regularQueue.QueueName}', { stat: 'Maximum', yAxis: 'left' }]
    ])

    t.same((fifoMessagesWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/SQS', 'NumberOfMessagesReceived', 'QueueName', '${fifoQueue.QueueName}', { stat: 'ts80', yAxis: 'right' }]
    ])

    t.same((fifoOldestMessageAgeWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/SQS', 'ApproximateAgeOfOldestMessage', 'QueueName', '${fifoQueue.QueueName}', { stat: 'ts85', yAxis: 'left' }]
    ])

    for (const widget of widgets) {
      if (widget !== undefined) {
        const props: MetricWidgetProperties = widget.properties as MetricWidgetProperties
        t.ok((props.metrics?.length ?? 0) > 0)
        t.equal(props.period, 300)
        t.equal(props.view, 'timeSeries')
      }
    }

    t.end()
  })

  t.end()
})

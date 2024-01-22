import { merge } from 'lodash'
import { test } from 'tap'
import { type MetricWidgetProperties } from 'cloudwatch-dashboard-types'

import { type ResourceType } from '../../cf-template'
import addDashboard from '../dashboard'
import defaultConfig from '../../inputs/default-config'

import { createTestCloudFormationTemplate, getDashboardFromTemplate, getDashboardWidgetsByTitle } from '../../tests/testing-utils'

test('dashboard contains configured SNS resources', (t) => {
  t.test('dashboards includes SQS metrics', (t) => {
    const template = createTestCloudFormationTemplate()
    addDashboard(defaultConfig.dashboard, template)
    const { dashboard } = getDashboardFromTemplate(template)

    const widgets = getDashboardWidgetsByTitle(dashboard,
      /SNS Topic/
    )

    const [snsTopicWidget] = widgets
    t.ok(snsTopicWidget)
    t.same((snsTopicWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/SNS', 'NumberOfNotificationsFilteredOut-InvalidAttributes', 'TopicName', '${topic.TopicName}', { stat: 'Sum', yAxis: 'left' }],
      ['AWS/SNS', 'NumberOfNotificationsFailed', 'TopicName', '${topic.TopicName}', { stat: 'Sum', yAxis: 'left' }]
    ])

    t.end()
  })

  t.test('service config overrides take precedence', (t) => {
    const template = createTestCloudFormationTemplate()

    const config = merge({}, defaultConfig.dashboard, {
      widgets: {
        SNS: {
          metricPeriod: 900,
          width: 8,
          height: 12,
          'NumberOfNotificationsFilteredOut-InvalidAttributes': {
            Statistic: ['ts80'],
            yAxis: 'right'
          },
          NumberOfNotificationsFailed: {
            Statistic: ['ts85'],
            yAxis: 'left'
          }
        }
      }
    })

    addDashboard(config, template)
    const { dashboard } = getDashboardFromTemplate(template)

    const widgets = getDashboardWidgetsByTitle(dashboard,
      /SNS Topic/
    )

    const [snsTopicWidget] = widgets
    t.ok(snsTopicWidget)
    t.same((snsTopicWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/SNS', 'NumberOfNotificationsFilteredOut-InvalidAttributes', 'TopicName', '${topic.TopicName}', { stat: 'ts80', yAxis: 'right' }],
      ['AWS/SNS', 'NumberOfNotificationsFailed', 'TopicName', '${topic.TopicName}', { stat: 'ts85', yAxis: 'left' }]
    ])

    t.end()
  })

  t.test('resource config overrides take precedence', (t) => {
    const template = createTestCloudFormationTemplate();
    (template.Resources as ResourceType).topic.Metadata = {
      slicWatch: {
        dashboard: {
          'NumberOfNotificationsFilteredOut-InvalidAttributes': {
            Statistic: ['ts80'],
            yAxis: 'right',
            enabled: false
          },
          NumberOfNotificationsFailed: {
            Statistic: ['ts90'],
            yAxis: 'right'
          }
        }
      }
    }

    addDashboard(defaultConfig.dashboard, template)
    const { dashboard } = getDashboardFromTemplate(template)

    const widgets = getDashboardWidgetsByTitle(dashboard,
      /SNS Topic/
    )

    const [snsTopicWidget] = widgets
    t.ok(snsTopicWidget)
    t.same((snsTopicWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/SNS', 'NumberOfNotificationsFailed', 'TopicName', '${topic.TopicName}', { stat: 'ts90', yAxis: 'right' }]
    ])

    t.end()
  })

  t.end()
})

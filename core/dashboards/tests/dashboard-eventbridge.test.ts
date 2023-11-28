import { merge } from 'lodash'
import { test } from 'tap'
import { type MetricWidgetProperties } from 'cloudwatch-dashboard-types'

import { type ResourceType } from '../../cf-template'
import addDashboard from '../dashboard'
import defaultConfig from '../../inputs/default-config'

import { createTestCloudFormationTemplate, getDashboardFromTemplate, getDashboardWidgetsByTitle } from '../../tests/testing-utils'

test('dashboard contains configured EventBridge resources', (t) => {
  t.test('dashboards includes EventBridge metrics', (t) => {
    const template = createTestCloudFormationTemplate()
    addDashboard(defaultConfig.dashboard, template)
    const { dashboard } = getDashboardFromTemplate(template)

    const widgets = getDashboardWidgetsByTitle(dashboard, /EventBridge Rule/)
    const [ruleWidget] = widgets

    t.ok(ruleWidget)

    t.same((ruleWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Events', 'FailedInvocations', 'RuleName', '${ServerlesstestprojectdeveventsRulerule1EventBridgeRule}', { stat: 'Sum', yAxis: 'left' }],
      ['AWS/Events', 'ThrottledRules', 'RuleName', '${ServerlesstestprojectdeveventsRulerule1EventBridgeRule}', { stat: 'Sum', yAxis: 'left' }],
      ['AWS/Events', 'Invocations', 'RuleName', '${ServerlesstestprojectdeveventsRulerule1EventBridgeRule}', { stat: 'Sum', yAxis: 'left' }]
    ])

    const props: MetricWidgetProperties = ruleWidget.properties as MetricWidgetProperties
    t.ok((props.metrics?.length ?? 0) > 0)
    t.equal(props.period, 300)
    t.equal(props.view, 'timeSeries')
    t.end()
  })

  t.test('service config overrides take precedence', (t) => {
    const template = createTestCloudFormationTemplate()

    const config = merge({}, defaultConfig.dashboard, {
      widgets: {
        Events: {
          metricPeriod: 900,
          width: 8,
          height: 12,
          FailedInvocations: {
            Statistic: ['Count']
          },
          ThrottledRules: {
            Statistic: ['Sum'],
            enabled: false
          },
          Invocations: {
            Statistic: ['ts85'],
            yAxis: 'right'
          }
        }
      }
    })

    addDashboard(config, template)
    const { dashboard } = getDashboardFromTemplate(template)
    const widgets = getDashboardWidgetsByTitle(dashboard, /EventBridge Rule/)

    const [ruleWidget] = widgets
    t.ok(ruleWidget)
    t.same((ruleWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Events', 'FailedInvocations', 'RuleName', '${ServerlesstestprojectdeveventsRulerule1EventBridgeRule}', { stat: 'Count', yAxis: 'left' }],
      ['AWS/Events', 'Invocations', 'RuleName', '${ServerlesstestprojectdeveventsRulerule1EventBridgeRule}', { stat: 'ts85', yAxis: 'right' }]
    ])

    const props: MetricWidgetProperties = ruleWidget.properties as MetricWidgetProperties
    t.ok((props.metrics?.length ?? 0) > 0)
    t.equal(props.period, 900)
    t.equal(props.view, 'timeSeries')

    t.end()
  })

  t.test('resource config overrides take precedence', (t) => {
    const template = createTestCloudFormationTemplate();
    (template.Resources as ResourceType).ServerlesstestprojectdeveventsRulerule1EventBridgeRule.Metadata = {
      slicWatch: {
        dashboard: {
          FailedInvocations: {
            Statistic: ['ts85'],
            yAxis: 'left',
            enabled: true
          },
          ThrottledRules: {
            Statistic: ['Sum'],
            enabled: false
          },
          Invocations: {
            Statistic: ['ts85'],
            yAxis: 'right'
          }
        }
      }
    }

    addDashboard(defaultConfig.dashboard, template)
    const { dashboard } = getDashboardFromTemplate(template)
    const widgets = getDashboardWidgetsByTitle(dashboard, /EventBridge Rule/)

    const [ruleWidget] = widgets
    t.ok(ruleWidget)
    t.same((ruleWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/Events', 'FailedInvocations', 'RuleName', '${ServerlesstestprojectdeveventsRulerule1EventBridgeRule}', { stat: 'ts85', yAxis: 'left' }],
      ['AWS/Events', 'Invocations', 'RuleName', '${ServerlesstestprojectdeveventsRulerule1EventBridgeRule}', { stat: 'ts85', yAxis: 'right' }]
    ])

    const props: MetricWidgetProperties = ruleWidget.properties as MetricWidgetProperties
    t.ok((props.metrics?.length ?? 0) > 0)
    t.equal(props.period, 300)
    t.equal(props.view, 'timeSeries')

    t.end()
  })

  t.end()
})

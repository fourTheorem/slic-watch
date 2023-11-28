import { merge } from 'lodash'
import { test } from 'tap'
import { type MetricWidgetProperties } from 'cloudwatch-dashboard-types'

import { type ResourceType } from '../../cf-template'
import addDashboard from '../dashboard'
import defaultConfig from '../../inputs/default-config'

import { createTestCloudFormationTemplate, getDashboardFromTemplate, getDashboardWidgetsByTitle } from '../../tests/testing-utils'

test('dashboard contains configured ECS resources', (t) => {
  t.test('dashboard includes ECS metrics', (t) => {
    const template = createTestCloudFormationTemplate()
    addDashboard(defaultConfig.dashboard, template)
    const { dashboard } = getDashboardFromTemplate(template)

    const widgets = getDashboardWidgetsByTitle(dashboard, /ECS/)
    const [ecsWidget] = widgets

    t.ok(ecsWidget)
    t.same((ecsWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/ECS', 'MemoryUtilization', 'ServiceName', '${ecsService.Name}', 'ClusterName', '${ecsCluster}', { stat: 'Average', yAxis: 'left' }],
      ['AWS/ECS', 'CPUUtilization', 'ServiceName', '${ecsService.Name}', 'ClusterName', '${ecsCluster}', { stat: 'Average', yAxis: 'left' }]
    ])

    const props: MetricWidgetProperties = ecsWidget.properties as MetricWidgetProperties
    t.ok((props.metrics?.length ?? 0) > 0)
    t.equal(props.period, 300)
    t.equal(props.view, 'timeSeries')

    t.end()
  })

  t.test('service config overrides take precedence', (t) => {
    const template = createTestCloudFormationTemplate()
    addDashboard(merge({}, defaultConfig.dashboard, {
      widgets: {
        ECS: {
          metricPeriod: 900,
          width: 8,
          height: 12,
          MemoryUtilization: {
            Statistic: ['P99']
          },
          CPUUtilization: {
            Statistic: ['P95'],
            yAxis: 'right'
          }
        }
      }
    }), template)
    const { dashboard } = getDashboardFromTemplate(template)

    const widgets = getDashboardWidgetsByTitle(dashboard, /ECS/)
    const [ecsWidget] = widgets

    t.ok(ecsWidget)
    t.same((ecsWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/ECS', 'MemoryUtilization', 'ServiceName', '${ecsService.Name}', 'ClusterName', '${ecsCluster}', { stat: 'P99', yAxis: 'left' }],
      ['AWS/ECS', 'CPUUtilization', 'ServiceName', '${ecsService.Name}', 'ClusterName', '${ecsCluster}', { stat: 'P95', yAxis: 'right' }]
    ])
    const props: MetricWidgetProperties = ecsWidget.properties as MetricWidgetProperties
    t.ok((props.metrics?.length ?? 0) > 0)
    t.equal(props.period, 900)
    t.equal(props.view, 'timeSeries')

    t.end()
  })

  t.test('resource config overrides take precedence', (t) => {
    const template = createTestCloudFormationTemplate();

    (template.Resources as ResourceType).ecsService.Metadata = {
      slicWatch: {
        dashboard: {
          MemoryUtilization: {
            Statistic: ['P90'],
            yAxis: 'right'
          },
          CPUUtilization: {
            Statistic: ['P50'],
            yAxis: 'left',
            enabled: false
          }
        }
      }
    }
    addDashboard(defaultConfig.dashboard, template)
    const { dashboard } = getDashboardFromTemplate(template)

    const widgets = getDashboardWidgetsByTitle(dashboard, /ECS/)
    const [ecsWidget] = widgets

    t.ok(ecsWidget)
    t.same((ecsWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/ECS', 'MemoryUtilization', 'ServiceName', '${ecsService.Name}', 'ClusterName', '${ecsCluster}', { stat: 'P90', yAxis: 'right' }]
    ])
    const props: MetricWidgetProperties = ecsWidget.properties as MetricWidgetProperties
    t.ok((props.metrics?.length ?? 0) > 0)
    t.equal(props.period, 300)
    t.equal(props.view, 'timeSeries')
    t.end()
  })

  t.end()
})

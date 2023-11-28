import { merge } from 'lodash'
import { test } from 'tap'
import { type MetricWidgetProperties } from 'cloudwatch-dashboard-types'

import { type ResourceType } from '../../cf-template'
import addDashboard from '../dashboard'
import defaultConfig from '../../inputs/default-config'

import { albCfTemplate, createTestCloudFormationTemplate, getDashboardFromTemplate, getDashboardWidgetsByTitle } from '../../tests/testing-utils'

test('dashboard contains configured ALB resources', (t) => {
  t.test('dashboards includes ALB metrics', (t) => {
    const template = createTestCloudFormationTemplate(albCfTemplate)
    addDashboard(defaultConfig.dashboard, template)
    const { dashboard } = getDashboardFromTemplate(template)

    const widgets = getDashboardWidgetsByTitle(dashboard,
      /ALB/,
      /Target Group/
    )

    const [albWidget, targetGroupWidget] = widgets
    t.ok(albWidget)
    t.ok(targetGroupWidget)
    t.same((albWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/ApplicationELB', 'HTTPCode_ELB_5XX_Count', 'LoadBalancer', '${alb.LoadBalancerFullName}', { stat: 'Sum', yAxis: 'left' }],
      ['AWS/ApplicationELB', 'RejectedConnectionCount', 'LoadBalancer', '${alb.LoadBalancerFullName}', { stat: 'Sum', yAxis: 'left' }]
    ])
    t.same((targetGroupWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/ApplicationELB', 'HTTPCode_Target_5XX_Count', 'LoadBalancer', '${alb.LoadBalancerFullName}', 'TargetGroup', '${AlbEventAlbTargetGrouphttpListener.TargetGroupFullName}', { stat: 'Sum', yAxis: 'left' }],
      ['AWS/ApplicationELB', 'UnHealthyHostCount', 'LoadBalancer', '${alb.LoadBalancerFullName}', 'TargetGroup', '${AlbEventAlbTargetGrouphttpListener.TargetGroupFullName}', { stat: 'Average', yAxis: 'left' }],
      ['AWS/ApplicationELB', 'LambdaInternalError', 'LoadBalancer', '${alb.LoadBalancerFullName}', 'TargetGroup', '${AlbEventAlbTargetGrouphttpListener.TargetGroupFullName}', { stat: 'Sum', yAxis: 'left' }],
      ['AWS/ApplicationELB', 'LambdaUserError', 'LoadBalancer', '${alb.LoadBalancerFullName}', 'TargetGroup', '${AlbEventAlbTargetGrouphttpListener.TargetGroupFullName}', { stat: 'Sum', yAxis: 'left' }]
    ])

    t.end()
  })

  t.test('service config overrides take precedence', (t) => {
    const template = createTestCloudFormationTemplate(albCfTemplate)

    const config = merge({}, defaultConfig.dashboard, {
      widgets: {
        ApplicationELB: {
          metricPeriod: 900,
          width: 8,
          height: 12,
          HTTPCode_ELB_5XX_Count: {
            Statistic: ['Average'],
            enabled: false
          },
          RejectedConnectionCount: {
            Statistic: ['ts90'],
            yAxis: 'right'
          }
        },
        ApplicationELBTarget: {
          metricPeriod: 900,
          width: 24,
          height: 12,
          HTTPCode_Target_5XX_Count: {
            Statistic: ['ts80'],
            yAxis: 'right'
          },
          UnHealthyHostCount: {
            Statistic: ['Count'],
            yAxis: 'right'
          },
          LambdaInternalError: {
            Statistic: ['P99'],
            yAxis: 'left'
          },
          LambdaUserError: {
            Statistic: ['Sum'],
            enabled: false
          }
        }
      }
    })

    addDashboard(config, template)
    const { dashboard } = getDashboardFromTemplate(template)

    const widgets = getDashboardWidgetsByTitle(dashboard,
      /ALB/,
      /Target Group/
    )

    const [albWidget, targetGroupWidget] = widgets
    t.ok(albWidget)
    t.ok(targetGroupWidget)
    t.same((albWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/ApplicationELB', 'RejectedConnectionCount', 'LoadBalancer', '${alb.LoadBalancerFullName}', { stat: 'ts90', yAxis: 'right' }]
    ])
    t.same((targetGroupWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/ApplicationELB', 'HTTPCode_Target_5XX_Count', 'LoadBalancer', '${alb.LoadBalancerFullName}', 'TargetGroup', '${AlbEventAlbTargetGrouphttpListener.TargetGroupFullName}', { stat: 'ts80', yAxis: 'right' }],
      ['AWS/ApplicationELB', 'UnHealthyHostCount', 'LoadBalancer', '${alb.LoadBalancerFullName}', 'TargetGroup', '${AlbEventAlbTargetGrouphttpListener.TargetGroupFullName}', { stat: 'Count', yAxis: 'right' }],
      ['AWS/ApplicationELB', 'LambdaInternalError', 'LoadBalancer', '${alb.LoadBalancerFullName}', 'TargetGroup', '${AlbEventAlbTargetGrouphttpListener.TargetGroupFullName}', { stat: 'P99', yAxis: 'left' }]
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
    const template = createTestCloudFormationTemplate(albCfTemplate)
    const resources = template.Resources as ResourceType
    resources.alb.Metadata = {
      slicWatch: {
        dashboard: {
          HTTPCode_ELB_5XX_Count: {
            Statistic: ['Average'],
            enabled: false
          },
          RejectedConnectionCount: {
            Statistic: ['ts90'],
            yAxis: 'right'
          }
        }
      }
    }

    resources.AlbEventAlbTargetGrouphttpListener.Metadata = {
      slicWatch: {
        dashboard: {
          HTTPCode_Target_5XX_Count: {
            Statistic: ['ts99'],
            yAxis: 'right'
          },
          UnHealthyHostCount: {
            Statistic: ['Count'],
            yAxis: 'right',
            enabled: false
          },
          LambdaInternalError: {
            Statistic: ['P99'],
            yAxis: 'left'
          },
          LambdaUserError: {
            Statistic: ['Sum'],
            enabled: false
          }
        }
      }
    }
    addDashboard(defaultConfig.dashboard, template)
    const { dashboard } = getDashboardFromTemplate(template)

    const widgets = getDashboardWidgetsByTitle(dashboard,
      /ALB/,
      /Target Group/
    )

    const [albWidget, targetGroupWidget] = widgets
    t.ok(albWidget)
    t.ok(targetGroupWidget)
    t.same((albWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/ApplicationELB', 'RejectedConnectionCount', 'LoadBalancer', '${alb.LoadBalancerFullName}', { stat: 'ts90', yAxis: 'right' }]
    ])
    t.same((targetGroupWidget.properties as MetricWidgetProperties).metrics, [
      ['AWS/ApplicationELB', 'HTTPCode_Target_5XX_Count', 'LoadBalancer', '${alb.LoadBalancerFullName}', 'TargetGroup', '${AlbEventAlbTargetGrouphttpListener.TargetGroupFullName}', { stat: 'ts99', yAxis: 'right' }],
      ['AWS/ApplicationELB', 'LambdaInternalError', 'LoadBalancer', '${alb.LoadBalancerFullName}', 'TargetGroup', '${AlbEventAlbTargetGrouphttpListener.TargetGroupFullName}', { stat: 'P99', yAxis: 'left' }]
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

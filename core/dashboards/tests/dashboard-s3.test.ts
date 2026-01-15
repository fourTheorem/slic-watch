import { merge } from 'lodash'
import { test } from 'tap'
import { type MetricWidgetProperties } from 'cloudwatch-dashboard-types'

import { type ResourceType } from '../../cf-template'
import addDashboard from '../dashboard'
import defaultConfig from '../../inputs/default-config'

import { createTestCloudFormationTemplate, defaultCfTemplate, getDashboardFromTemplate } from '../../tests/testing-utils'

// Helper function to get all widgets with S3 in the title
function getS3Widgets(dashboard: any) {
  const allWidgets = dashboard.widgets || []
  return allWidgets.filter((widget: any) => {
    const props = widget.properties as MetricWidgetProperties
    return typeof props?.title === 'string' && props.title.includes('S3')
  })
}

// Helper function to get widgets for a specific bucket by checking the dimensions
function getWidgetsForBucket(widgets: any[], bucketLogicalId: string) {
  return widgets.filter((widget: any) => {
    const props = widget.properties as MetricWidgetProperties
    const metrics = props.metrics || []
    
    return metrics.some((metric: any) => {
      // Check if this metric includes the bucket in its dimensions
      if (Array.isArray(metric)) {
        // Metric format: ['AWS/S3', metricName, 'BucketName', bucketRef, 'FilterId', 'EntireBucket', ...options]
        if (metric.length >= 6 && metric[0] === 'AWS/S3' && metric[2] === 'BucketName') {
          return metric[3] === `\${${bucketLogicalId}}` || metric[3] === `\${${bucketLogicalId}.BucketName}`
        }
      }
      return false
    })
  })
}

test('dashboard contains configured S3 resources', (t) => {
  t.test('dashboard includes S3 metrics', (t) => {
    const template = createTestCloudFormationTemplate()
    addDashboard(defaultConfig.dashboard, template)
    const { dashboard } = getDashboardFromTemplate(template)

    // Get all S3 widgets
    const s3Widgets = getS3Widgets(dashboard)
    t.ok(s3Widgets.length > 0, 'Should have S3 widgets')

    // Get widgets for the 'bucket' resource
    const bucketWidgets = getWidgetsForBucket(s3Widgets, 'bucket')
    t.ok(bucketWidgets.length > 0, 'Should have widgets for bucket resource')

    // Since there are multiple widgets (one per metric per statistic), 
    // we need to check that all expected metrics are present
    const expectedMetrics = [
      { name: 'FirstByteLatency', stat: 'p99' },
      { name: 'HeadRequests', stat: 'Sum' },
      { name: '5xxErrors', stat: 'Sum' },
      { name: '4xxErrors', stat: 'Sum' },
      { name: 'TotalRequestLatency', stat: 'p99' },
      { name: 'AllRequests', stat: 'Sum' }
    ]

    // Check each expected metric exists
    for (const expectedMetric of expectedMetrics) {
      const matchingWidget = bucketWidgets.find((widget: any) => {
        const props = widget.properties as MetricWidgetProperties
        return props.metrics?.some((metric: any) => 
          Array.isArray(metric) &&
          metric[0] === 'AWS/S3' && 
          metric[1] === expectedMetric.name && 
          metric[6]?.stat === expectedMetric.stat
        )
      })
      t.ok(matchingWidget, `Should have widget for ${expectedMetric.name} with ${expectedMetric.stat}`)
      
      if (matchingWidget) {
        const props = matchingWidget.properties as MetricWidgetProperties
        // Find the metric for our bucket
        const metric = props.metrics?.find((m: any) => 
          Array.isArray(m) && 
          m[0] === 'AWS/S3' && 
          m[1] === expectedMetric.name && 
          m[3] === '${bucket}'
        )
        t.same(metric, [
          'AWS/S3',
          expectedMetric.name,
          'BucketName',
          '${bucket}',
          'FilterId',
          'EntireBucket',
          { stat: expectedMetric.stat, yAxis: 'left' }
        ], `Metric ${expectedMetric.name} should have correct structure`)
      }
    }

    t.end()
  })

  t.test('service config overrides take precedence', (t) => {
    const template = createTestCloudFormationTemplate(defaultCfTemplate)

    const config = merge({}, defaultConfig.dashboard, {
      widgets: {
        S3: {
          metricPeriod: 900,
          width: 8,
          height: 12,
          FirstByteLatency: {
            Statistic: ['Average'],
            yAxis: 'right'
          },
          HeadRequests: {
            Statistic: ['Sum'],
            yAxis: 'left'
          }
        }
      }
    })

    addDashboard(config, template)
    const { dashboard } = getDashboardFromTemplate(template)

    const s3Widgets = getS3Widgets(dashboard)
    const bucketWidgets = getWidgetsForBucket(s3Widgets, 'bucket')

    // Find the FirstByteLatency widget with Average statistic
    const firstByteWidget = bucketWidgets.find((widget: any) => {
      const props = widget.properties as MetricWidgetProperties
      return props.metrics?.some((metric: any) => 
        Array.isArray(metric) &&
        metric[0] === 'AWS/S3' && 
        metric[1] === 'FirstByteLatency' && 
        metric[6]?.stat === 'Average'
      )
    })
    
    t.ok(firstByteWidget, 'Should have FirstByteLatency widget with Average statistic')
    if (firstByteWidget) {
      const props = firstByteWidget.properties as MetricWidgetProperties
      const metric = props.metrics?.find((m: any) => 
        Array.isArray(m) && 
        m[0] === 'AWS/S3' && 
        m[1] === 'FirstByteLatency' && 
        m[3] === '${bucket}'
      )
      t.same(metric, [
        'AWS/S3',
        'FirstByteLatency',
        'BucketName',
        '${bucket}',
        'FilterId',
        'EntireBucket',
        { stat: 'Average', yAxis: 'right' }
      ], 'FirstByteLatency should use Average statistic and right yAxis from service override')
    }

    // Find the HeadRequests widget
    const headRequestsWidget = bucketWidgets.find((widget: any) => {
      const props = widget.properties as MetricWidgetProperties
      return props.metrics?.some((metric: any) => 
        Array.isArray(metric) &&
        metric[0] === 'AWS/S3' && 
        metric[1] === 'HeadRequests'
      )
    })
    
    t.ok(headRequestsWidget, 'Should have HeadRequests widget')
    if (headRequestsWidget) {
      const props = headRequestsWidget.properties as MetricWidgetProperties
      const metric = props.metrics?.find((m: any) => 
        Array.isArray(m) && 
        m[0] === 'AWS/S3' && 
        m[1] === 'HeadRequests' && 
        m[3] === '${bucket}'
      )
      t.same(metric, [
        'AWS/S3',
        'HeadRequests',
        'BucketName',
        '${bucket}',
        'FilterId',
        'EntireBucket',
        { stat: 'Sum', yAxis: 'left' }
      ], 'HeadRequests should use Sum statistic and left yAxis')
    }

    t.end()
  })

  t.test('resource config overrides take precedence', (t) => {
    const template = createTestCloudFormationTemplate(defaultCfTemplate)
    const resources = template.Resources as ResourceType
    resources.bucket.Metadata = {
      slicWatch: {
        dashboard: {
          FirstByteLatency: {
            Statistic: ['Average'],
            yAxis: 'right',
            enabled: false
          },
          HeadRequests: {
            Statistic: ['Sum'],
            yAxis: 'right'
          }
        }
      }
    }

    addDashboard(defaultConfig.dashboard, template)
    const { dashboard } = getDashboardFromTemplate(template)

    const s3Widgets = getS3Widgets(dashboard)
    const bucketWidgets = getWidgetsForBucket(s3Widgets, 'bucket')

    // FirstByteLatency should be disabled
    const firstByteWidget = bucketWidgets.find((widget: any) => {
      const props = widget.properties as MetricWidgetProperties
      return props.metrics?.some((metric: any) => 
        Array.isArray(metric) &&
        metric[0] === 'AWS/S3' && 
        metric[1] === 'FirstByteLatency'
      )
    })
    t.notOk(firstByteWidget, 'FirstByteLatency should be disabled for bucket resource')

    // HeadRequests should have custom config
    const headRequestsWidget = bucketWidgets.find((widget: any) => {
      const props = widget.properties as MetricWidgetProperties
      return props.metrics?.some((metric: any) => 
        Array.isArray(metric) &&
        metric[0] === 'AWS/S3' && 
        metric[1] === 'HeadRequests'
      )
    })
    
    t.ok(headRequestsWidget, 'Should have HeadRequests widget')
    if (headRequestsWidget) {
      const props = headRequestsWidget.properties as MetricWidgetProperties
      const metric = props.metrics?.find((m: any) => 
        Array.isArray(m) && 
        m[0] === 'AWS/S3' && 
        m[1] === 'HeadRequests' && 
        m[3] === '${bucket}'
      )
      t.same(metric, [
        'AWS/S3',
        'HeadRequests',
        'BucketName',
        '${bucket}',
        'FilterId',
        'EntireBucket',
        { stat: 'Sum', yAxis: 'right' }
      ], 'HeadRequests should use resource override (right yAxis)')
    }

    const errors5xxWidget = bucketWidgets.find((widget: any) => {
      const props = widget.properties as MetricWidgetProperties
      return props.metrics?.some((metric: any) => 
        Array.isArray(metric) &&
        metric[0] === 'AWS/S3' && 
        metric[1] === '5xxErrors'
      )
    })
    
    t.ok(errors5xxWidget, 'Should have 5xxErrors widget')
    if (errors5xxWidget) {
      const props = errors5xxWidget.properties as MetricWidgetProperties
      const metric = props.metrics?.find((m: any) => 
        Array.isArray(m) && 
        m[0] === 'AWS/S3' && 
        m[1] === '5xxErrors' && 
        m[3] === '${bucket}'
      )
      t.same(metric, [
        'AWS/S3',
        '5xxErrors',
        'BucketName',
        '${bucket}',
        'FilterId',
        'EntireBucket',
        { stat: 'Sum', yAxis: 'left' }
      ], '5xxErrors should use default config (left yAxis)')
    }

    t.end()
  })

  t.end()
})
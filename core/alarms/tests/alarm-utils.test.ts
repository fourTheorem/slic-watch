import { test } from 'tap'

import { getStatisticName, makeAlarmLogicalId } from '../alarm-utils'

test('getStatisticName chooses Statistic then ExtendedStatistic property', (t) => {
  t.equal(getStatisticName({
    Statistic: 'Sum',
    ComparisonOperator: '',
    EvaluationPeriods: 0
  }), 'Sum')
  t.equal(getStatisticName({
    ExtendedStatistic: 'p99',
    ComparisonOperator: '',
    EvaluationPeriods: 0
  }), 'p99')
  t.equal(getStatisticName({
    Statistic: 'Average',
    ExtendedStatistic: 'p99',
    ComparisonOperator: '',
    EvaluationPeriods: 0
  }), 'Average')
  t.end()
})

test('makeAlarmLogicalId takes a human readable name for the service, resourceLogicalId, and metric then creates a valid CloudFormation logical ID', (t) => {
  t.equal(makeAlarmLogicalId('SNS', 'topic', 'NumberOfNotificationsFilteredOutInvalidAttributes'), 'slicWatchSNSNumberOfNotificationsFilteredOutInvalidAttributesAlarmtopic')
  t.equal(makeAlarmLogicalId('SNS', 'topic', 'NumberOfNotificationsFailed'), 'slicWatchSNSNumberOfNotificationsFailedAlarmtopic')
  t.equal(makeAlarmLogicalId('InfiniDash', '$Dash_!@#$$&*()7', 'Number_Of_Dashes'), 'slicWatchInfiniDashNumberOfDashesAlarmDash7')
  t.equal(makeAlarmLogicalId(
    'LoadBalancer', 'AlbEventAlbTargetGrouphttpListener', 'UnHealthyHostCount'
  ), 'slicWatchLoadBalancerUnHealthyHostCountAlarmAlbEventAlbTargetGrouphttpListener')
  t.end()
})

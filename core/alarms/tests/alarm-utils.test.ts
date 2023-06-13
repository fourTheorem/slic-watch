import { test } from 'tap'

import { getStatisticName, makeResourceName } from '../alarm-utils'

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

test('makeResourceName takes a human readable name for the service, resourceLogicalId, and metric then creates proper resource names  ', (t) => {
  t.equal(makeResourceName('SNS', 'topic', 'NumberOfNotificationsFilteredOutInvalidAttributes'), 'slicWatchSNSNumberOfNotificationsFilteredOutInvalidAttributesAlarmtopic')
  t.equal(makeResourceName('SNS', 'topic', 'NumberOfNotificationsFailed'), 'slicWatchSNSNumberOfNotificationsFailedAlarmtopic')
  t.equal(makeResourceName('LoadBalancer', 'AlbEventAlbTargetGrouphttpListener', 'UnHealthyHostCount'), 'slicWatchLoadBalancerUnHealthyHostCountAlarmAlbEventAlbTargetGrouphttpListener')
  t.end()
})

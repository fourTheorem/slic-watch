import { test } from 'tap'

import { getStatisticName, makeResourceName } from '../alarm-utils'

test('getStatisticName chooses Statistic then ExtendedStatistic property', (t) => {
  t.equal(getStatisticName({ Statistic: 'Sum' }), 'Sum')
  t.equal(getStatisticName({ ExtendedStatistic: 'p99' }), 'p99')
  t.equal(getStatisticName({ Statistic: 'Average', ExtendedStatistic: 'p99' }), 'Average')
  t.end()
})

test('makeResourceName takes a human readable name for the service, resourceLogicalId, and metric then creates proper resource names  ', (t) => {
  t.equal(makeResourceName('SNS', 'topic', 'NumberOfNotificationsFilteredOutInvalidAttributes'), 'slicWatchSNSNumberOfNotificationsFilteredOutInvalidAttributesAlarmTopic')
  t.equal(makeResourceName('SNS', 'topic', 'NumberOfNotificationsFailed'), 'slicWatchSNSNumberOfNotificationsFailedAlarmTopic')
  t.equal(makeResourceName('LoadBalancer', 'AlbEventAlbTargetGrouphttpListener', 'UnHealthyHostCount'), 'slicWatchLoadBalancerUnHealthyHostCountAlarmAlbEventAlbTargetGrouphttpListener')
  t.end()
})

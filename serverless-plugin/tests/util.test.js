'use strict'

const { test } = require('tap')

const {
  filterObject,
  resolveEcsClusterNameAsCfn,
  resolveEcsClusterNameForSub,
  getStatisticName
} = require('../util')

test('getResourcesFullName', async (t) => {
  const { getLoadBalancerFullName, getTargetGroupFullName } = t.mock('../util.js', {
    '@aws-sdk/client-elastic-load-balancing-v2': {
      ElasticLoadBalancingV2Client: function () {
        this.send = async command => {
          return {
            TargetGroups: [{ TargetGroupArn: 'dummy-arn/1234567/1234890' }],
            LoadBalancers: [{ LoadBalancerArn: 'dummy-arn/app/awesome-alb/1234890' }]
          }
        }
      },
      DescribeTargetGroupsCommand: function ({ Names }) {},
      DescribeLoadBalancersCommand: function ({ Names }) {}
    }
  })
  const targetResource = { SomeTargetGroup: { Properties: { Name: 'TargetGroup' } } }
  const loadBalancerResource = { SomeLoadBalancer: { Properties: { Name: 'LoadBalancer' } } }
  const targetGroupFullName = await getTargetGroupFullName(targetResource)
  const loadBalancerFullName = await getLoadBalancerFullName(loadBalancerResource)
  t.equal('targetgroup/1234567/1234890', targetGroupFullName)
  t.equal('app/awesome-alb/1234890', loadBalancerFullName)
  t.end()
})

test('filterObject filters out', (t) => {
  const obj = { a: 1, b: 2, c: 3 }
  const res = filterObject(obj, () => false)
  t.same(res, {})
  t.end()
})

test('filterObject filters in', (t) => {
  const obj = { a: 1, b: 2, c: 3 }
  const res = filterObject(obj, () => true)
  t.same(res, obj)
  t.end()
})

test('filterObject filters on value', (t) => {
  const obj = { a: 1, b: 2, c: 3 }
  const res = filterObject(obj, (val) => val > 1)
  t.same(res, { b: 2, c: 3 })
  t.end()
})

test('filterObject filters on value and key', (t) => {
  const obj = { a: 1, b: 2, c: 3 }
  const res = filterObject(obj, (val, key) => key === 'b')
  t.same(res, { b: 2 })
  t.end()
})

test('resolveEcsClusterNameAsCfn', (t) => {
  const fromLiteral = resolveEcsClusterNameAsCfn('my-cluster')
  t.equal(fromLiteral, 'my-cluster')

  const fromArn = resolveEcsClusterNameAsCfn('arn:aws:ecs:us-east-1:123456789012:cluster/my-cluster')
  t.equal(fromArn, 'my-cluster')

  const fromRef = resolveEcsClusterNameAsCfn({ Ref: 'my-cluster' })
  t.same(fromRef, { Ref: 'my-cluster' })

  const fromGetAtt = resolveEcsClusterNameAsCfn({ GetAtt: ['my-cluster', 'Arn'] })
  t.same(fromGetAtt, { Ref: 'my-cluster' })

  const fromSub = resolveEcsClusterNameAsCfn({ 'Fn::Sub': '$' + '{my-cluster}' })
  t.same(fromSub, { 'Fn::Sub': '$' + '{my-cluster}' })

  t.end()
})

test('resolveEcsClusterNameForSub', (t) => {
  const fromLiteral = resolveEcsClusterNameForSub('my-cluster')
  t.equal(fromLiteral, 'my-cluster')

  const fromArn = resolveEcsClusterNameForSub('arn:aws:ecs:us-east-1:123456789012:cluster/my-cluster')
  t.equal(fromArn, 'my-cluster')

  const fromRef = resolveEcsClusterNameForSub({ Ref: 'my-cluster' })
  t.same(fromRef, '$' + '{my-cluster}')

  const fromGetAtt = resolveEcsClusterNameForSub({ GetAtt: ['my-cluster', 'Arn'] })
  t.same(fromGetAtt, '$' + '{my-cluster}')

  const fromSub = resolveEcsClusterNameForSub({ 'Fn::Sub': '$' + '{my-cluster}' })
  t.same(fromSub, '$' + '{my-cluster}')

  const unexpected = { Unexpected: 'syntax' }
  const fromUnexpected = resolveEcsClusterNameForSub(unexpected)
  t.same(fromUnexpected, unexpected)
  t.end()
})

test('getStatisticName chooses Statistic then ExtendedStatistic property', (t) => {
  t.equal(getStatisticName({ Statistic: 'Sum' }), 'Sum')
  t.equal(getStatisticName({ ExtendedStatistic: 'p99' }), 'p99')
  t.equal(getStatisticName({ Statistic: 'Average', ExtendedStatistic: 'p99' }), 'Average')
  t.end()
})

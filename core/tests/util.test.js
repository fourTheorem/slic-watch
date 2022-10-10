'use strict'

const { test } = require('tap')

const {
  filterObject,
  resolveEcsClusterNameAsCfn,
  resolveEcsClusterNameForSub,
  resolveRestApiNameAsCfn,
  resolveRestApiNameForSub,
  getStatisticName
} = require('../util')

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

test('resolveRestApiNameAsCfn', (t) => {
  const fromLiteral = resolveRestApiNameAsCfn({ Properties: { Name: 'my-api-name' } }, 'logicalId')
  t.equal(fromLiteral, 'my-api-name')

  const fromRef = resolveRestApiNameAsCfn({ Properties: { Name: { Ref: 'AWS::Stack' } } }, 'logicalId')
  t.same(fromRef, { Ref: 'AWS::Stack' })

  const fromGetAtt = resolveRestApiNameAsCfn({ Properties: { Name: { GetAtt: ['myResource', 'MyProperty'] } } }, 'logicalId')
  t.same(fromGetAtt, { GetAtt: ['myResource', 'MyProperty'] })

  const fromOpenApiRef = resolveRestApiNameAsCfn({ Properties: { Body: { info: { title: { Ref: 'AWS::Stack' } } } } }, 'logicalId')
  t.same(fromOpenApiRef, { Ref: 'AWS::Stack' })

  t.throws(() => resolveRestApiNameAsCfn({ Properties: {} }, 'logicalId'))
  t.end()
})

test('resolveRestApiNameForSub', (t) => {
  const fromLiteral = resolveRestApiNameForSub({ Properties: { Name: 'my-api-name' } }, 'logicalId')
  t.equal(fromLiteral, 'my-api-name')

  const fromRef = resolveRestApiNameForSub({ Properties: { Name: { Ref: 'AWS::Stack' } } }, 'logicalId')
  t.same(fromRef, '$' + '{AWS::Stack}')

  const fromGetAtt = resolveRestApiNameForSub({ Properties: { Name: { GetAtt: ['myResource', 'MyProperty'] } } }, 'logicalId')
  t.same(fromGetAtt, '$' + '{myResource.MyProperty}')

  const fromOpenApiRef = resolveRestApiNameForSub({ Properties: { Body: { info: { title: { Ref: 'AWS::Stack' } } } } }, 'logicalId')
  t.same(fromOpenApiRef, '$' + '{AWS::Stack}')

  // eslint-disable-next-line no-template-curly-in-string
  const fromSub = resolveRestApiNameForSub({ Properties: { Name: { 'Fn::Sub': '${AWS::StackName}Suffix' } } }, 'logicalId')
  t.same(fromSub, '$' + '{AWS::StackName}Suffix')

  t.throws(() => resolveRestApiNameForSub({ Properties: {} }, 'logicalId'))
  t.end()
})

test('getStatisticName chooses Statistic then ExtendedStatistic property', (t) => {
  t.equal(getStatisticName({ Statistic: 'Sum' }), 'Sum')
  t.equal(getStatisticName({ ExtendedStatistic: 'p99' }), 'p99')
  t.equal(getStatisticName({ Statistic: 'Average', ExtendedStatistic: 'p99' }), 'Average')
  t.end()
})

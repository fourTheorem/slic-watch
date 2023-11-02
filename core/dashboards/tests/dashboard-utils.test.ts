
import { test } from 'tap'

import { resolveEcsClusterNameForSub } from '../dashboard-utils'

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

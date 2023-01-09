'use strict'

import { test } from 'tap'

import {
  filterObject,
  resolveEcsClusterNameAsCfn,
  resolveEcsClusterNameForSub,
  resolveRestApiNameAsCfn,
  resolveRestApiNameForSub,
  getStatisticName,
  findLoadBalancersForTargetGroup
} from '../util'

import { albCfTemplate } from './testing-utils'
import CloudFormationTemplate from '../cf-template'
const albCfTemp = CloudFormationTemplate(albCfTemplate)

test('findLoadBalancersForTargetGroup', (t) => {
  test('finds the associated Load Balancer if it exists in the CloudFormation template for the Target Group', (t) => {
    const targetGroupLogicalId = 'AlbEventAlbTargetGrouphttpListener'
    const loadBalancerLogicalIds = findLoadBalancersForTargetGroup(targetGroupLogicalId, albCfTemp)
    t.same(loadBalancerLogicalIds, ['alb'])
    t.end()
  })

  test('returns empty list for non-existent listener', (t) => {
    // @ts-ignore
    const loadBalancerLogicalIds = findLoadBalancersForTargetGroup('fakeListener', CloudFormationTemplate({}))
    t.equal(loadBalancerLogicalIds.length, 0)
    t.end()
  })

  test('includes an ALB from the DefaultActions', (t) => {
    const template = CloudFormationTemplate({
      Resources: {
        // @ts-ignore
        listener: {
          Type: 'AWS::ElasticLoadBalancingV2::Listener',
          Properties: {
            DefaultActions: [
              {
                TargetGroupArn: { Ref: 'tg' }
              }
            ],
            LoadBalancerArn: { Ref: 'alb' }
          }
        },
        tg: {
          Type: 'AWS::ElasticLoadBalancingV2::TargetGroup'
        },
        alb: {}
      }
    })

    const loadBalancerLogicalIds = findLoadBalancersForTargetGroup('tg', template)
    t.same(loadBalancerLogicalIds, ['alb'])
    t.end()
  })

  test('excludes DefaultActions with a literal load balancer ARN', (t) => {
    const template = CloudFormationTemplate({
      Resources: {
        // @ts-ignore
        listener: {
          Type: 'AWS::ElasticLoadBalancingV2::Listener',
          Properties: {
            DefaultActions: [
              {
                TargetGroupArn: { Ref: 'tg' }
              }
            ],
            LoadBalancerArn: 'arn:aws:elasticloadbalancing:us-west-2:123456789012:loadbalancer/app/my-load-balancer/50dc6c495c0c9188'
          }
        },
        tg: {
          Type: 'AWS::ElasticLoadBalancingV2::TargetGroup'
        },
        alb: {}
      }
    })

    const loadBalancerLogicalIds = findLoadBalancersForTargetGroup('tg', template)
    t.equal(loadBalancerLogicalIds.length, 0)
    t.end()
  })
  test('finds load balancers through listener rule target groups', (t) => {
    const template = CloudFormationTemplate({
      Resources: {
        // @ts-ignore
        listenerRuleA: {
          Type: 'AWS::ElasticLoadBalancingV2::ListenerRule',
          Properties: {
            Actions: [{ TargetGroupArn: { Ref: 'tgA' } }],
            ListenerArn: { Ref: 'listener' }
          }
        },
        listenerRuleB: {
          Type: 'AWS::ElasticLoadBalancingV2::ListenerRule',
          Properties: {
            Actions: [{ TargetGroupArn: { Ref: 'tgB' } }],
            ListenerArn: { Ref: 'listener' }
          }
        },
        listener: {
          Type: 'AWS::ElasticLoadBalancingV2::Listener',
          Properties: {
            LoadBalancerArn: { Ref: 'alb' }
          }
        }
      }
    })
    const loadBalancerLogicalIds = findLoadBalancersForTargetGroup('tgA', template)
    t.same(loadBalancerLogicalIds, ['alb'])
    t.end()
  })

  test('omits listener rules with no load balancer', (t) => {
    const template = CloudFormationTemplate({
      Resources: {
        // @ts-ignore
        listenerRule: {
          Type: 'AWS::ElasticLoadBalancingV2::ListenerRule',
          Properties: {
            Actions: [{ TargetGroupArn: { Ref: 'tg' } }],
            ListenerArn: { Ref: 'listener' }
          }
        },
        listener: {
          Type: 'AWS::ElasticLoadBalancingV2::Listener',
          Properties: {}
        }
      }
    })
    const loadBalancerLogicalIds = findLoadBalancersForTargetGroup('tg', template)
    t.equal(loadBalancerLogicalIds.length, 0)
    t.end()
  })

  test('omits listener rules with no actions', (t) => {
    const template = CloudFormationTemplate({
      Resources: {
        // @ts-ignore
        listenerRule: {
          Type: 'AWS::ElasticLoadBalancingV2::ListenerRule',
          Properties: {
            ListenerArn: { Ref: 'listener' }
          }
        }
      }
    })
    const loadBalancerLogicalIds = findLoadBalancersForTargetGroup('tg', template)
    t.equal(loadBalancerLogicalIds.length, 0)
    t.end()
  })

  test('omits listener rules a literal listener ARN', (t) => {
    const template = CloudFormationTemplate({
      Resources: {
        // @ts-ignore
        listenerRule: {
          Type: 'AWS::ElasticLoadBalancingV2::ListenerRule',
          Properties: {
            Actions: [{ TargetGroupArn: { Ref: 'tgA' } }],
            ListenerArn: 'arn:aws:elasticloadbalancing:us-west-2:123456789012:listener/app/my-load-balancer/50dc6c495c0c9188/f2f7dc8efc522ab2'
          }
        }
      }
    })
    const loadBalancerLogicalIds = findLoadBalancersForTargetGroup('tgA', template)
    t.equal(loadBalancerLogicalIds.length, 0)
    t.end()
  })

  test('omits listeners with a literal load balancer ARN', (t) => {
    const template = CloudFormationTemplate({
      Resources: {
        // @ts-ignore
        listenerRuleA: {
          Type: 'AWS::ElasticLoadBalancingV2::ListenerRule',
          Properties: {
            Actions: [{ TargetGroupArn: { Ref: 'tgA' } }],
            ListenerArn: { Ref: 'listener' }
          }
        },
        listener: {
          Type: 'AWS::ElasticLoadBalancingV2::Listener',
          Properties: {
            LoadBalancerArn: 'arn:aws:elasticloadbalancing:us-west-2:123456789012:loadbalancer/app/my-load-balancer/50dc6c495c0c9188'
          }
        }
      }
    })
    const loadBalancerLogicalIds = findLoadBalancersForTargetGroup('tgA', template)
    t.equal(loadBalancerLogicalIds.length, 0)
    t.end()
  })

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

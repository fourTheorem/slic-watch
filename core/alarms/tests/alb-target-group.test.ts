'use strict'

import albTargetAlarms, {AlbTargetAlarmConfig, findLoadBalancersForTargetGroup} from '../alb-target-group'
import { test } from 'tap'
import { defaultConfig } from '../../inputs/default-config'
import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  albCfTemplate,
  testContext
} from '../../tests/testing-utils'

import CloudFormationTemplate from '../../cf-template'
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

test('ALB Target Group alarms are created', (t) => {
  const alarmConfigTargetGroup = createTestConfig(
    defaultConfig.alarms,
    {
      Period: 120,
      EvaluationPeriods: 2,
      TreatMissingData: 'breaching',
      ComparisonOperator: 'GreaterThanOrEqualToThreshold',
      ApplicationELBTarget: {
        HTTPCode_Target_5XX_Count: {
          Threshold: 50
        },
        UnHealthyHostCount: {
          Threshold: 50
        },
        LambdaInternalError: {
          Threshold: 50
        },
        LambdaUserError: {
          Threshold: 50
        }
      }
    }

  )
  function createAlarmResources (elbAlarmConfig:AlbTargetAlarmConfig) {
    const { createALBTargetAlarms } = albTargetAlarms(elbAlarmConfig, testContext)
    const cfTemplate = createTestCloudFormationTemplate(albCfTemplate)
    createALBTargetAlarms(cfTemplate)
    return cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  }
  const targeGroupAlarmResources = createAlarmResources(alarmConfigTargetGroup.ApplicationELBTarget)

  const expectedTypesTargetGroup = {
    LoadBalancerHTTPCodeTarget5XXCountAlarm: 'HTTPCode_Target_5XX_Count',
    LoadBalancerUnHealthyHostCountAlarm: 'UnHealthyHostCount',
    LoadBalancerLambdaInternalErrorAlarm: 'LambdaInternalError',
    LoadBalancerLambdaUserErrorAlarm: 'LambdaUserError'
  }

  t.equal(Object.keys(targeGroupAlarmResources).length, Object.keys(expectedTypesTargetGroup).length)
  for (const alarmResource of Object.values(targeGroupAlarmResources)) {
    const al = alarmResource.Properties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al.AlarmName)
    const expectedMetric = expectedTypesTargetGroup[alarmType]
    t.equal(al.MetricName, expectedMetric)
    t.ok(al.Statistic)
    t.equal(al.Threshold, alarmConfigTargetGroup.ApplicationELBTarget[expectedMetric].Threshold)
    t.equal(al.EvaluationPeriods, 2)
    t.equal(al.TreatMissingData, 'breaching')
    t.equal(al.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al.Namespace, 'AWS/ApplicationELB')
    t.equal(al.Period, 120)
    t.same(al.Dimensions, [
      {
        Name: 'TargetGroup',
        Value: '${AlbEventAlbTargetGrouphttpListener.TargetGroupFullName}' 
      },
      {
        Name: 'LoadBalancer',
        Value: '${alb.LoadBalancerFullName}'
      }
    ])
  }

  // for (const alarmType in targeGroupAlarmResources){
  //   console.log('helllooo',alarmType)
  // }
  

  t.end()
})


test('ALB alarms are not created when disabled globally', (t) => {
  const alarmConfigTargetGroup = createTestConfig(
    defaultConfig.alarms,
    {
      ApplicationELBTarget: {
        enabled: false, // disabled globally
        Period: 60,
        HTTPCode_Target_5XX_Count: {
          Threshold: 50
        },
        UnHealthyHostCount: {
          Threshold: 50
        },
        LambdaInternalError: {
          Threshold: 50
        },
        LambdaUserError: {
          Threshold: 50
        }
      }
    }
  )

  function createAlarmResources (elbAlarmConfig:AlbTargetAlarmConfig) {
    const { createALBTargetAlarms } = albTargetAlarms(elbAlarmConfig, testContext)
    const cfTemplate = createTestCloudFormationTemplate(albCfTemplate)
    createALBTargetAlarms(cfTemplate)
    return cfTemplate.getResourcesByType('AWS::CloudWatch::Alarm')
  }
  const targeGroupAlarmResources = createAlarmResources(alarmConfigTargetGroup.ApplicationELBTarget)

  t.same({}, targeGroupAlarmResources)
  t.end()
})

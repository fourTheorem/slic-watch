import { test } from 'tap'

import type { AlarmProperties } from 'cloudform-types/types/cloudWatch/alarm'

import createAlbTargetAlarms, { findLoadBalancersForTargetGroup } from '../alb-target-group'
import { defaultConfig } from '../../inputs/default-config'
import {
  assertCommonAlarmProperties,
  alarmNameToType,
  createTestConfig,
  createTestCloudFormationTemplate,
  albCfTemplate,
  testAlarmActionsConfig
} from '../../tests/testing-utils'
import type { ResourceType } from '../../cf-template'

test('findLoadBalancersForTargetGroup', (t) => {
  test('finds the associated Load Balancer if it exists in the CloudFormation template for the Target Group', (t) => {
    const targetGroupLogicalId = 'AlbEventAlbTargetGrouphttpListener'
    const loadBalancerLogicalIds = findLoadBalancersForTargetGroup(targetGroupLogicalId, albCfTemplate)
    t.same(loadBalancerLogicalIds, ['alb'])
    t.end()
  })

  test('returns empty list for non-existent listener', (t) => {
    const loadBalancerLogicalIds = findLoadBalancersForTargetGroup('fakeListener', {})
    t.equal(loadBalancerLogicalIds.length, 0)
    t.end()
  })

  test('includes an ALB from the DefaultActions', (t) => {
    const compiledTemplate = {
      Resources: {
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
        alb: { Type: '' }
      }
    }

    const loadBalancerLogicalIds = findLoadBalancersForTargetGroup('tg', compiledTemplate)
    t.same(loadBalancerLogicalIds, ['alb'])
    t.end()
  })

  test('excludes DefaultActions with a literal load balancer ARN', (t) => {
    const compiledTemplate = {
      Resources: {
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
        alb: { Type: '' }
      }
    }

    const loadBalancerLogicalIds = findLoadBalancersForTargetGroup('tg', compiledTemplate)
    t.equal(loadBalancerLogicalIds.length, 0)
    t.end()
  })

  test('finds load balancers through listener rule target groups', (t) => {
    const compiledTemplate = {
      Resources: {
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
    }
    const loadBalancerLogicalIds = findLoadBalancersForTargetGroup('tgA', compiledTemplate)
    t.same(loadBalancerLogicalIds, ['alb'])
    t.end()
  })

  test('omits listener rules with no load balancer', (t) => {
    const compiledTemplate = {
      Resources: {
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
    }
    const loadBalancerLogicalIds = findLoadBalancersForTargetGroup('tg', compiledTemplate)
    t.equal(loadBalancerLogicalIds.length, 0)
    t.end()
  })

  test('omits listener rules with no actions', (t) => {
    const compiledTemplate = {
      Resources: {
        listenerRule: {
          Type: 'AWS::ElasticLoadBalancingV2::ListenerRule',
          Properties: {
            ListenerArn: { Ref: 'listener' }
          }
        }
      }
    }
    const loadBalancerLogicalIds = findLoadBalancersForTargetGroup('tg', compiledTemplate)
    t.equal(loadBalancerLogicalIds.length, 0)
    t.end()
  })

  test('omits listener rules a literal listener ARN', (t) => {
    const compiledTemplate = {
      Resources: {
        listenerRule: {
          Type: 'AWS::ElasticLoadBalancingV2::ListenerRule',
          Properties: {
            Actions: [{ TargetGroupArn: { Ref: 'tgA' } }],
            ListenerArn: 'arn:aws:elasticloadbalancing:us-west-2:123456789012:listener/app/my-load-balancer/50dc6c495c0c9188/f2f7dc8efc522ab2'
          }
        }
      }
    }
    const loadBalancerLogicalIds = findLoadBalancersForTargetGroup('tgA', compiledTemplate)
    t.equal(loadBalancerLogicalIds.length, 0)
    t.end()
  })

  test('omits listeners with a literal load balancer ARN', (t) => {
    const compiledTemplate = {
      Resources: {
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
    }
    const loadBalancerLogicalIds = findLoadBalancersForTargetGroup('tgA', compiledTemplate)
    t.equal(loadBalancerLogicalIds.length, 0)
    t.end()
  })

  t.end()
})

test('handles actions without a target group', (t) => {
  const compiledTemplate = {
    Resources: {
      listenerRuleA: {
        Type: 'AWS::ElasticLoadBalancingV2::ListenerRule',
        Properties: {
          Actions: [{ AuthenticateOidcConfig: {} }],
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
  }
  const loadBalancerLogicalIds = findLoadBalancersForTargetGroup('tgA', compiledTemplate)
  t.equal(loadBalancerLogicalIds.length, 0)
  t.end()
})

test('ALB Target Group alarms are created', (t) => {
  const testConfig = createTestConfig(
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

  const albAlarmConfig = testConfig.ApplicationELBTarget
  const compiledTemplate = createTestCloudFormationTemplate(albCfTemplate)

  const targetGroupAlarmResources: ResourceType = createAlbTargetAlarms(albAlarmConfig, testAlarmActionsConfig, compiledTemplate)

  const expectedTypesTargetGroup = {
    LoadBalancer_HTTPCodeTarget5XXCountAlarm: 'HTTPCode_Target_5XX_Count',
    LoadBalancer_UnHealthyHostCountAlarm: 'UnHealthyHostCount',
    LoadBalancer_LambdaInternalErrorAlarm: 'LambdaInternalError',
    LoadBalancer_LambdaUserErrorAlarm: 'LambdaUserError'
  }

  t.equal(Object.keys(targetGroupAlarmResources).length, Object.keys(expectedTypesTargetGroup).length)
  for (const alarmResource of Object.values(targetGroupAlarmResources)) {
    const al = alarmResource.Properties as AlarmProperties
    assertCommonAlarmProperties(t, al)
    const alarmType = alarmNameToType(al?.AlarmName)
    const expectedMetric = expectedTypesTargetGroup[alarmType]
    t.equal(al?.MetricName, expectedMetric)
    t.ok(al?.Statistic)
    t.equal(al?.Threshold, albAlarmConfig[expectedMetric].Threshold)
    t.equal(al?.EvaluationPeriods, 2)
    t.equal(al?.TreatMissingData, 'breaching')
    t.equal(al?.ComparisonOperator, 'GreaterThanOrEqualToThreshold')
    t.equal(al?.Namespace, 'AWS/ApplicationELB')
    t.equal(al?.Period, 120)
    t.same(al?.Dimensions, [
      {
        Name: 'TargetGroup',
        Value: {
          name: 'Fn::GetAtt',
          payload: [
            'AlbEventAlbTargetGrouphttpListener',
            'TargetGroupFullName'
          ]
        }
      },
      {
        Name: 'LoadBalancer',
        Value: {
          name: 'Fn::GetAtt',
          payload: [
            'alb',
            'LoadBalancerFullName'
          ]
        }
      }
    ])
  }

  t.end()
})

test('ALB resource configuration overrides take precedence', (t) => {
  const testConfig = createTestConfig(defaultConfig.alarms)
  const template = createTestCloudFormationTemplate(albCfTemplate);
  (template.Resources as ResourceType).AlbEventAlbTargetGrouphttpListener.Metadata = {
    slicWatch: {
      alarms: {
        Period: 900,
        HTTPCode_Target_5XX_Count: {
          Threshold: 55
        },
        UnHealthyHostCount: {
          Threshold: 56
        },
        LambdaInternalError: {
          Threshold: 57
        },
        LambdaUserError: {
          Threshold: 58,
          enabled: false
        }
      }
    }
  }

  const targetGroupAlarmResources = createAlbTargetAlarms(testConfig.ApplicationELBTarget, testAlarmActionsConfig, template)
  t.same(Object.keys(targetGroupAlarmResources).length, 3)

  const code5xxAlarm = Object.values(targetGroupAlarmResources).filter(a => a?.Properties?.MetricName === 'HTTPCode_Target_5XX_Count')[0]
  const unHealthyHostCountAlarm = Object.values(targetGroupAlarmResources).filter(a => a?.Properties?.MetricName === 'UnHealthyHostCount')[0]
  const lambdaInternalErrorAlarm = Object.values(targetGroupAlarmResources).filter(a => a?.Properties?.MetricName === 'LambdaInternalError')[0]

  t.equal(code5xxAlarm?.Properties?.Threshold, 55)
  t.equal(unHealthyHostCountAlarm?.Properties?.Threshold, 56)
  t.equal(lambdaInternalErrorAlarm?.Properties?.Threshold, 57)
  t.end()
})

test('ALB alarms are not created when disabled globally', (t) => {
  const testConfig = createTestConfig(
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

  const albAlarmConfig = testConfig.ApplicationELBTarget
  const compiledTemplate = createTestCloudFormationTemplate(albCfTemplate)
  const targetGroupAlarmResources = createAlbTargetAlarms(albAlarmConfig, testAlarmActionsConfig, compiledTemplate)

  t.same({}, targetGroupAlarmResources)
  t.end()
})

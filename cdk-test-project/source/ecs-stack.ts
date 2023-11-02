import * as cdk from 'aws-cdk-lib'
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as ecsp from 'aws-cdk-lib/aws-ecs-patterns'

export class CdkECSStack extends cdk.Stack {
  constructor (scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    this.addTransform('SlicWatch-v3')
    this.templateOptions.metadata = {
      slicWatch: {
        enabled: true,
        // "topicArn": "arn:aws:xxxxxx:mytopic",
        alarms: {
          Lambda: {
            Invocations: {
              enabled: true,
              Threshold: 10
            }
          },
          SQS: {
            AgeOfOldestMessage: {
              Statistic: 'Maximum',
              enabled: true,
              Threshold: 60
            },
            InFlightMessagesPc: {
              Statistic: 'Maximum',
              Threshold: 1
            }
          }
        }
      }
    }

    new ecsp.ApplicationLoadBalancedFargateService(this, 'MyWebServer', {
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample')
      },
      publicLoadBalancer: true
    })
  }
}

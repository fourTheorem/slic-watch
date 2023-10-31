import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as sns from 'aws-cdk-lib/aws-sns'
import { Duration } from 'aws-cdk-lib'
import type { CfnResource } from 'aws-cdk-lib'
import * as sfn from 'aws-cdk-lib/aws-stepfunctions'
import { LambdaInvoke } from 'aws-cdk-lib/aws-stepfunctions-tasks'

export class CdkSFNStack extends cdk.Stack {
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

    const topic = new sns.Topic(this, 'MyTopic')
    this.templateOptions.metadata.slicWatch.topicArn = topic.topicArn

    const hello = new lambda.Function(this, 'HelloHandler',
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        code: lambda.Code.fromAsset('lambda'),
        handler: 'hello.handler'
      })

    const cfnFuncHello = hello.node.defaultChild as CfnResource
    cfnFuncHello.cfnOptions.metadata = {
      slicWatch: {
        alarms: {
          Lambda: {
            Invocations: {
              Threshold: 4
            }
          }
        }
      }
    }

    const submitJob = new LambdaInvoke(this, 'Submit Job', {
      lambdaFunction: hello,
      // Lambda's result is in the attribute `Payload`
      outputPath: '$.Payload'
    })

    const waitX = new sfn.Wait(this, 'Wait X Seconds', {
      time: sfn.WaitTime.secondsPath('$.waitSeconds')
    })

    const getStatus = new LambdaInvoke(this, 'Get Job Status', {
      lambdaFunction: hello,
      // Pass just the field named "guid" into the Lambda, put the
      // Lambda's result in a field called "status" in the response
      inputPath: '$.guid',
      outputPath: '$.Payload'
    })

    const jobFailed = new sfn.Fail(this, 'Job Failed', {
      cause: 'AWS Batch Job Failed',
      error: 'DescribeJob returned FAILED'
    })

    const finalStatus = new LambdaInvoke(this, 'Get Final Job Status', {
      lambdaFunction: hello,
      // Use "guid" field as input
      inputPath: '$.guid',
      outputPath: '$.Payload'
    })

    const definition = submitJob
      .next(waitX)
      .next(getStatus)
      .next(new sfn.Choice(this, 'Job Complete?')
        // Look at the "status" field
        .when(sfn.Condition.stringEquals('$.status', 'FAILED'), jobFailed)
        .when(sfn.Condition.stringEquals('$.status', 'SUCCEEDED'), finalStatus)
        .otherwise(waitX))

    new sfn.StateMachine(this, 'StateMachine', {
      definition,
      timeout: Duration.minutes(5)
    })
  }
}

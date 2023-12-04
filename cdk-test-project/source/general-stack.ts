import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as sns from 'aws-cdk-lib/aws-sns'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import * as sqs from 'aws-cdk-lib/aws-sqs'
import type { CfnResource } from 'aws-cdk-lib'
import * as events from 'aws-cdk-lib/aws-events'
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets'

export class CdkTestGeneralStack extends cdk.Stack {
  constructor (scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    this.addTransform('SlicWatch-v3')
    this.templateOptions.metadata = {
      slicWatch: {
        enabled: true,
        topicArn: 'arn:aws:xxxxxx:mytopic',
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
    this.templateOptions.metadata.slicWatch.alarmActionsConfig = {
      alarmActions: [topic.topicArn]
    }

    const helloFunction = new lambda.Function(this, 'HelloHandler',
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        code: lambda.Code.fromAsset('lambda'),
        handler: 'hello.handler'
      })

    const cfnFuncHello = helloFunction.node.defaultChild as CfnResource
    cfnFuncHello.cfnOptions.metadata = {
      slicWatch: {
        alarms: {
          Invocations: {
            Threshold: 4
          }
        }
      }
    }

    const pingFunction = new lambda.Function(this, 'PingHandler',
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        code: lambda.Code.fromAsset('lambda'),
        handler: 'hello.handler'
      })

    const cfnFuncPing = pingFunction.node.defaultChild as CfnResource
    cfnFuncPing.cfnOptions.metadata = {
      slicWatch: {
        dashboard: {
          enabled: false
        }
      }
    }

    new lambda.Function(this, 'ThrottlerHandler',
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        code: lambda.Code.fromAsset('lambda'),
        handler: 'hello.handler',
        reservedConcurrentExecutions: 0
      })

    new lambda.Function(this, 'DriveStreamHandler',
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        code: lambda.Code.fromAsset('lambda'),
        handler: 'stream-test-handler.handleDrive'
      })

    new lambda.Function(this, 'DriveQueueHandler',
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        code: lambda.Code.fromAsset('lambda'),
        handler: 'hello.handler'
      })

    new lambda.Function(this, 'DriveTableHandler',
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        code: lambda.Code.fromAsset('lambda'),
        handler: 'hello.handler'
      })

    new apigateway.LambdaRestApi(this, 'myapi', {
      handler: helloFunction
    })

    new dynamodb.Table(this, 'Table', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
    })

    const rule = new events.Rule(this, 'rule', {
      eventPattern: {
        source: ['aws.ec2']
      }
    })

    const dlq = new sqs.Queue(this, 'DeadLetterQueue')
    rule.addTarget(new LambdaFunction(helloFunction, {
      deadLetterQueue: dlq, // Optional: add a dead letter queue
      maxEventAge: cdk.Duration.hours(2), // Optional: set the maxEventAge retry policy
      retryAttempts: 2 // Optional: set the max number of retry attempts
    }))
  }
}

# slic-watch

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![npm version](https://img.shields.io/npm/v/serverless-slic-watch-plugin)](https://npm.im/serverless-slic-watch-plugin)
[![Build](https://github.com/fourTheorem/slic-watch/actions/workflows/build.yml/badge.svg)](https://github.com/fourTheorem/slic-watch/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/fourTheorem/slic-watch/badge.svg)](https://coveralls.io/github/fourTheorem/slic-watch)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Automatic, best-practice CloudWatch **Dashboards** and **Alarms** for your SAM, CloudFormation, CDK and Serverless Framework applications.

SLIC Watch supports: _AWS Lambda, API Gateway, DynamoDB, Kinesis Data Streams, SQS Queues, Step Functions, ECS (Fargate or EC2), SNS, EventBridge, Application Load Balancer and AppSync._  

Supported tools include:
 * ⚡️ **Serverless Framework** v3 via the [_SLIC Watch Serverless Plugin_](#getting-started-with-serverless-framework)
 * 🐿 **AWS SAM**, 📦 **AWS CDK**  and ☁️ **CloudFormation** using the [_CloudFormation Macro_](#getting-started-with-aws-sam-cdk-or-cloudformation), published in the Serverless Application Repository (SAR).

## Contents
- [slic-watch](#slic-watch)
  - [Contents](#contents)
  - [Getting Started with Serverless Framework](#getting-started-with-serverless-framework)
  - [Getting Started with AWS SAM, CDK or CloudFormation](#getting-started-with-aws-sam-cdk-or-cloudformation)
    - [Deploying the SLIC Watch Macro](#deploying-the-slic-watch-macro)
    - [Adding the SLIC Watch Transform to SAM or CloudFormation templates](#adding-the-slic-watch-transform-to-sam-or-cloudformation-templates)
    - [Adding the SLIC Watch Transform to CDK Apps](#adding-the-slic-watch-transform-to-cdk-apps)
  - [Features](#features)
    - [Lambda Functions](#lambda-functions)
    - [API Gateway](#api-gateway)
    - [DynamoDB](#dynamodb)
    - [Kinesis Data Streams](#kinesis-data-streams)
    - [SQS Queues](#sqs-queues)
    - [Step Functions](#step-functions)
    - [ECS / Fargate](#ecs--fargate)
    - [SNS](#sns)
    - [EventBridge](#eventbridge)
    - [Application Load Balancer](#application-load-balancer)
    - [AppSync](#appsync)
  - [Configuration](#configuration)
    - [Top-level configuration](#top-level-configuration)
    - [Function-level configuration](#function-level-configuration)
      - [Serverless Framework function-level configuration](#serverless-framework-function-level-configuration)
      - [SAM/CloudFormation function-level configuration](#samcloudformation-function-level-configuration)
      - [CDK function-level configuration](#cdk-function-level-configuration)
  - [A note on CloudWatch cost](#a-note-on-cloudwatch-cost)
  - [References](#references)
    - [Other Projects](#other-projects)
    - [Reading](#reading)
  - [LICENSE](#license)
## Getting Started with Serverless Framework

_If you are using AWS SAM or CloudFormation, skip to the section below._

1. 📦 Install the plugin:
```bash
npm install serverless-slic-watch-plugin --save-dev
```
2. 🖋️ Add the plugin to the `plugins` section of `serverless.yml`:
```yaml
plugins:
  - serverless-slic-watch-plugin
```
3. 🪛 _Optionally_, add some configuration for the plugin to the `custom -> slicWatch` section of `serverless.yml`.
Here, you can specify a reference to the SNS topic for alarms. This is optional, but it's usually something you want
so you can receive alarm notifications via email, Slack, etc.

```yaml
custom:
  slicWatch:
    topicArn: {'Fn::Ref': myTopic}
```
See the [Configuration](#configuration) section below for more detailed instructions on fine tuning SLIC Watch to your needs.


4. 🚢 Deploy your application in the usual way, for example:
```
sls deploy
```
5. 👀 Head to the CloudWatch section of the AWS Console to check out your new dashboards 📊 and alarms ⏰ !


## Getting Started with AWS SAM, CDK or CloudFormation

ℹ️ **IMPORTANT**: If you are using AWS SAM, CDK, or just plain CloudFormation, the most important thing to know is that your AWS account/region should have the **SLIC Watch Macro** deployed before you do anything. Once that's done, it is very simple to add this macro as a transform to your SAM or CloudFormation template.

### Deploying the SLIC Watch Macro
It would be nice if CloudFormation allowed us to publicly publish a macro so you don't need this step, but for now, you can deploy the SLIC Watch Macro using any of the following options. We have made the macro available as a _Serverless Application Repository (SAR)_ app. This SAR app is used in Options 1 and 2 below. Option 3 is a manual option where you deploy the macro from this repository directly without using SAR.

- **Option 1** using the Service Application Repository (SAR) console: Go to [SLIC Watch in the Serverless Application Repository](https://serverlessrepo.aws.amazon.com/applications/eu-west-1/949339270388/slic-watch-app) and click the _Deploy_ button.
- **Option 2** (using SAR with CloudFormation): If you prefer to automate the deployment of SAR apps using Infrastructure as Code, you can add the SAR app as a resource in any CloudFormation template. Note that this cannot be the same template as the application in which you want to use SLIC Watch!
The snippet of CloudFormation is as follows.
 ```yaml
  Resources:
    ...
    SlicWatchMacro:
      Type: AWS::Serverless::Application
      Properties:
        Location:
          ApplicationId: arn:aws:serverlessrepo:eu-west-1:949339270388:applications~slic-watch-app 
          SemanticVersion: <enter latest version>
 ```
To determine the list of available versions, you can use the AWS CLI:
```bash
aws serverlessrepo list-application-versions \
  --application-id arn:aws:serverlessrepo:eu-west-1:949339270388:applications/slic-watch-app
```
- **Option 3** (manual Macro deployment using SAM directly from source):
```bash
npm install
sam build --base-dir . --template-file cf-macro/template.yaml
sam deploy --guided
```
### Adding the SLIC Watch Transform to SAM or CloudFormation templates
Once you have deployed the macro, you can start using SLIC Watch in SAM or CloudFormation templates by adding this to the **Transform** section:

```yaml
Transform:
  - ...
  - SlicWatch-v3
```

🪛 _Optionally_, add some configuration for the plugin to the `Metadata -> slicWatch` section of `template.yml`.
Here, you can specify a reference to the SNS topic for alarms. This is optional, but it's usually something you want
so you can receive alarm notifications via email, Slack, etc.

```yaml
Metadata:
  slicWatch:
    enabled: true
    topicArn: !Ref MonitoringTopic
```
See the [Configuration](#configuration) section below for more detailed instructions on fine tuning SLIC Watch to your needs.

If you want to override the default alarm and dashboard settings for each Lambda Functino resource, add the `slicWatch` property to the `Metadata` section.

### Adding the SLIC Watch Transform to CDK Apps
Once you have deployed the macro, add it to CDK Stack in the constructor of the class that extends Stack. It should be done for every Stack in the CDK App.

```javascript
// JavaScript/TypeScript:
export class MyStack extends cdk.Stack {
  constructor (scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    this.addTransform('SlicWatch-v3')
    ...
  }
}
```

```python
# Python:
self.add_transform("SlicWatch-v3")
```
```csharp
// C#:
this.AddTransform("SlicWatch-v3")
```

```java
// Java:
this.addTransform("SlicWatch-v3");
```

🪛 _Optionally_, add some configuration for the plugin as below:

```javascript
this.templateOptions.metadata = {
  slicWatch: {
    enabled: true,
    topicArn: "arn:aws:sns:eu-west-1:xxxxxxx:topic",
  }
}
```

## Features

CloudWatch Alarms and Dashboard widgets are created for all supported resources in the CloudFormation stack generated by The Serverless Framework. This includes generated resources as well as resources specifed explicitly in the `resources` section.
Any feature can be configured or disabled completely - see the section on [configuration](#configuration) to see how.

### Lambda Functions

Lambda Function alarms are created for:
1. _Errors_
2. _Throttles_, as a percentage of the number of invocations
3. _Duration_, as a percentage of the function's configured timeout
4. _Invocations_, disabled by default
5. _IteratorAge_, for functions triggered by an [Event Source Mapping](https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventsourcemapping.html)

Lambda dashboard widgets show:

|Errors|Throttles|Duration Average, P95 and Maximum|
|--|--|--|
|![Errors](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/lambdaErrors.png)|![Throttles](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/lambdaThrottles.png) |![Throttles](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/lambdaDurationP95.png) |
|**Invocations**|**Concurrent Executions**|**Iterator Age**|
|![Invocations](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/lambdaInvocations.png) |![concurrent executions](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/lambdaConcurrentExecutions.png) |![Iterator Age](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/lambdaIteratorAge.png) |

### API Gateway

API Gateway alarms are created for:
1. 5XX Errors
2. 4XX Errors
3. Latency

API Gateway dashboard widgets show:

|5XX Errors|4XX Errors|Latency|Count|
|--|--|--|--|
|![5XX Errors](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/api5xx.png)|![4XX Errors](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/api4xx.png) |![Latency](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/apiLatency.png) |![Count](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/apiCount.png) |

### DynamoDB

DynamoDB alarms are created for:
1. Read Throttle Events (Table and GSI)
2. Write Throttle Events (Table and GSI)
3. UserErrors
4. SystemErrors

Dashboard widgets are created for tables and GSIs:
dynamodbGSIReadThrottle.png    dynamodbGSIWriteThrottle.png     dynamodbTableWriteThrottle.png

|ReadThrottleEvents (Table)| WriteThrottleEvent (Table)|
|---|---|
|![WriteThrottleEvents Table](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/dynamodbTableWriteThrottle.png)|![WriteThrottleEvents Table](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/dynamodbTableWriteThrottle.png)|
|**ReadThrottleEvents (GSI)**|**WriteThrottleEvent (GSI)**|
|![WriteThrottleEvents GSI](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/dynamodbGSIWriteThrottle.png)|![WriteThrottleEvents GSI](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/dynamodbGSIWriteThrottle.png)|

### Kinesis Data Streams
Kinesis data stream alarms are created for:
1. Iterator Age
2. Read Provisioned Throughput Exceeded
2. Write Provisioned Throughput Exceeded
3. PutRecord.Success
3. PutRecords.Success
4. GetRecords.Success

Kinesis data stream dashboard widgets show:

|Iterator Age|Read Provisioned Throughput Exceeded|Write Provisioned Throughput Exceeded|
|--|--|--|
|![Iterator Age](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/kinesisIteratorAge.png)|![Provisioned Throughput Exceeded](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/kinesisProvisionedThroughput.png) |![Put/Get Success](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/kinesisPutGetSuccess.png) |

### SQS Queues

SQS Queue alarms are create for:
1. Age Of Oldest Message (disabled by default). If enabled, a threshold in seconds should be specified.
2. In Flight Messages Percentage. This is a percentage of the [AWS hard limits](https://aws.amazon.com/sqs/faqs/) (20,000 messages for FIFO queues and 120,000 for standard queues).

SQS queue dashboard widgets show:

|Messages Sent, Received and Deleted|Messages Visible|Age of Oldest Message|
|--|--|--|
|![Messages](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/sqsMessages.png)|![Messages Visible](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/sqsMessagesInQueue.png) |![Oldest Message](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/sqsOldestMessage.png) |

### Step Functions

Step Function alarms are created for:
1. Execution Throttled
2. Executions Failed
3. Executions Timed Out

The dashboard contains one widget per Step Function:
|ExecutionsFailed ExecutionThrottled, ExecutionsTimedOut|
|--|
|![Step Function widget](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/stepFunctions.png)

### ECS / Fargate

ECS alarms are created for Fargate or EC2 clusters:
1. Memory Utilization
2. CPU Utilization

### SNS

SNS alarms are created for:
1. Number of Notifications Filtered Out due to Invalid Attributes
2. Number of Notifications Failed

SNS Topic dashboard widgets show:

|Messages Filtered Out - Invalid Attributes|Notifications Failed|
|--|--|
|![Invalid Attributes](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/snsInvalidAttributes.png)|![Notifications Failed](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/snsNotificationsFailed.png) |

### EventBridge

EventBridge alarms are created for:
1. Failed Invocations
2. Throttled Rules

EventBridge Rule dashboard widgets show:

|Failed Invocations|Invocations|
|--|--|
|![FailedInvocations](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/eventBridgeFailedInvocations.png)|![Invocations](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/eventBridgeInvocations.png)|

### Application Load Balancer
Application Load Balancer alarms are created for:
1. HTTP Code ELB 5XX Count
2. Rejected Connection Count
3. HTTP Code Target 5XX Count
4. UnHealthy Host Count
5. Lambda Internal Error
6. Lambda User Error

Application Load Balancer dashboard widgets show:

|HTTP Code ELB 5XX Count|HTTP Code Target 5XX Count|Rejected Connection Count| 
|--|--|--|
|![HTTPCode_ELB_5XX_Count](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/httpCodeElb5XXCount.png) |![HTTPCode_Target_5XX_Count](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/httpCodeTarget5XXCount.png)| |
|**UnHealthy Host Count**|**Lambda User Error**|**Lambda Internal Error**|
|![UnHealthyHostCount](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/unHealthyHostCount.png) |![LambdaUserError](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/lambdaUserError.png)| |

### AppSync
AppSync alarms are created for:
1. 5XX Error
2. Latency

AppSync dashboard widgets show:

|5XX Error, Latency, 4XX Error, Request|
|--|
|![API Widget](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/appsyncAPI.png)|
|**Connect Server Error**, **Disconnect Server Error**, **Subscribe Server Error**, **Unsubscribe Server Error**,**PublishDataMessageServerError**|
|![Real-time Subscriptions Widget](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/appsyncRealTimeSubscriptions.png)|
## Configuration

Configuration is entirely optional - SLIC Watch provides defaults that work out of the box.

**Note**: Alarm configuration is _cascading_. This means that configuration properties are automatically propagated from parent to children nodes (unless an override is present at the given node).

You can customize the configuration:
- at the top level, for all resources in each service, and/or
- at the level of individual functions.

### Top-level configuration
SLIC Watch configuration can be specified:
- For *Serverless Framework applications*, in the `custom` → `slicWatch` section of `serverless.yml`:
```yaml
custom:
  slicWatch:
    enabled: true
    ...
```
- For *CloudFormation or SAM templates*, in the `Metadata` → `slicWatch` section of the template:
```yaml
Metadata:
  slicWatch:
    enabled: true
    ...
```

- For *CDK Stacks, the top-level SLIC Watch configuration can be set as follows.
```typescript
this.templateOptions.metadata = {
  slicWatch: {
    enabled: true,
    ....
  }
}
```

- The `topicArn` may be optionally provided as an SNS Topic destination for all alarms.  If you omit the topic, alarms are still created but are not sent to any destination.
- Alarms or dashboards can be disabled at any level in the configuration by adding `enabled: false`. You can even disable all plugin functionality by specifying `enabled: false` at the top-level plugin configuration.

A complete set of supported options along with their defaults are shown in [default-config.js](./core/default-config.js)

Example projects are also provided for reference: 
- [serverless-test-project](./serverless-test-project)
- [sam-test-project](./sam-test-project)

### Function-level configuration

For each function, add the `slicWatch` property to configure specific overrides for alarms and dashboards relating to the AWS Lambda Function resource. 

#### Serverless Framework function-level configuration
```yaml
functions:
  hello:
    handler: basic-handler.hello
    slicWatch:
      dashboard:
        enabled: false    # No Lambda widgets will be created for this function
      alarms:
        Lambda:
          Invocations:
            Threshold: 2  # The invocation threshold is specific to
                          # this function's expected invocation count
```

To disable all alarms for any given function, use:

```yaml
functions:
  hello:
    handler: basic-handler.hello
    slicWatch:
      alarms:
        Lambda:
          enabled: false
```

#### SAM/CloudFormation function-level configuration
```yaml
Resources:
  LambdaFunction1:
    Type: AWS::Serverless::Function  # Can also be applied to AWS::Lambda::Function resources
    Properties:
      Handler: lambda1.functionHandler
    Metadata:
      slicWatch:
        alarms:
          Lambda:
            Invocations:
              Threshold: 3
        dashboard:
          enabled: true
```

To disable all alarms for any given function, use:

```yaml
Resources:
  LambdaFunction1:
    Type: AWS::Serverless::Function  # Can also be applied to AWS::Lambda::Function resources
    Properties:
      Handler: lambda1.functionHandler
    Metadata:
      slicWatch:
        alarms:
          Lambda:
            enabled: false
```
#### CDK function-level configuration
```typescript
const hello: lambda.Function;
const cfnFuncHello = hello.node.defaultChild as CfnResource;
cfnFuncHello.cfnOptions.metadata = {
  slicWatch: {
    alarms: {
      Lambda: {
        Invocations: {
          Threshold: 2
        }
      }
    }
  }
}
```

## A note on CloudWatch cost

This plugin creates additional CloudWatch resources that, apart from a limited free tier, have an associated cost.
Depending on what you enable, SLIC Watch creates one dashboard and multiple alarms. The number of each depend on the number of resources in your stack and the number of stacks you have.

Check out the AWS [CloudWatch Pricing](https://aws.amazon.com/cloudwatch/pricing/) page to understand the cost impact of creating CloudWatch resources.

## References

### Other Projects

1. [serverless-plugin-aws-alerts](https://www.npmjs.com/package/serverless-plugin-aws-alerts)
2. [Real World Serverless Application - Serverless Operations](https://github.com/awslabs/realworld-serverless-application/wiki/Serverless-Operations)
3. [CDK Watchful](https://github.com/cdklabs/cdk-watchful)
4. [CDK Patterns - The CloudWatch Dashboard](https://github.com/cdk-patterns/serverless/blob/main/the-cloudwatch-dashboard/README.md)

### Reading

1. [AWS Well Architected Serverless Applications Lens](https://docs.aws.amazon.com/wellarchitected/latest/serverless-applications-lens/welcome.html)
2. [How to Monitor Lambda with CloudWatch Metrics - Yan Cui](https://lumigo.io/serverless-monitoring-guide/how-to-monitor-lambda-with-cloudwatch-metrics/)

## LICENSE

Apache - [LICENSE](./LICENSE)

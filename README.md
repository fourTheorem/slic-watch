# slic-watch

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![npm version](https://img.shields.io/npm/v/serverless-slic-watch-plugin)](https://npm.im/serverless-slic-watch-plugin)
[![Build](https://github.com/fourTheorem/slic-watch/actions/workflows/build.yml/badge.svg)](https://github.com/fourTheorem/slic-watch/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/fourTheorem/slic-watch/badge.svg)](https://coveralls.io/github/fourTheorem/slic-watch)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


**SLIC Watch** creates instant, best-practice CloudWatch **Dashboards** and **Alarms** for your AWS applications. The supported AWS services are:

 1. AWS Lambda
 2. API Gateway
 3. DynamoDB
 4. Kinesis Data Streams
 5. SQS Queues
 6. Step Functions
 7. ECS (Fargate or EC2)
 8. SNS
 9. EventBridge

SLIC Watch is available for **Serverless Framework**, **AWS SAM** and **CloudFormation**.

 * Serverless Framework v2 and v3 are supported in the _SLIC Watch Serverless Plugin_.
 * SLIC Watch is available as a _CloudFormation Macro_ published in the Serverless Application Repository (SAR). This allows you to add SLIC Watch to SAM or CloudFormation templates by simply adding a `Transform` to your template.

<!-- TOC -->

- [1. Contents](#1-contents)
- [2. Getting Started with Serverless Framework](#2-getting-started-with-serverless-framework)
- [3. Getting Started with AWS SAM or CloudFormation](#3-getting-started-with-aws-sam-or-cloudformation)
  - [3.1. Deploying the SLIC Watch Macro](#31-deploying-the-slic-watch-macro)
  - [3.2. Adding the SLIC Watch Transform:](#32-adding-the-slic-watch-transform)
- [4. Features](#4-features)
  - [4.1. Lambda Functions](#41-lambda-functions)
  - [4.2. API Gateway](#42-api-gateway)
  - [4.3. DynamoDB](#43-dynamodb)
  - [4.4. Kinesis Data Streams](#44-kinesis-data-streams)
  - [4.5. SQS Queues](#45-sqs-queues)
  - [4.6. Step Functions](#46-step-functions)
  - [4.7. ECS / Fargate](#47-ecs--fargate)
  - [4.8. SNS](#48-sns)
  - [4.9. EventBridge](#49-eventbridge)
- [5. Configuration](#5-configuration)
  - [5.1. Top-level configuration](#51-top-level-configuration)
  - [5.2. Function-level configuration](#52-function-level-configuration)
    - [5.2.1. Serverless Framework function-level configuration](#521-serverless-framework-function-level-configuration)
    - [5.2.2. SAM/CloudFormation function-level configuration](#522-samcloudformation-function-level-configuration)
- [6. A note on CloudWatch cost](#6-a-note-on-cloudwatch-cost)
- [7. References](#7-references)
  - [7.1. Other Projects](#71-other-projects)
  - [7.2. Reading](#72-reading)
- [8. LICENSE](#8-license)

<!-- /TOC -->
## 2. Getting Started with Serverless Framework

_If you are using AWS SAM or CloudFormation, skip to the section below._

1. 📦 Install the plugin:
```
npm install serverless-slic-watch-plugin --save-dev
```
2. 🖋️ Add the plugin to the `plugins` section of `serverless.yml`:
```
plugins:
  - serverless-slic-watch-plugin
```

3. 🪛 _Optionally_, add some configuration for the plugin to the `custom -> slicWatch` section of `serverless.yml`.
Here, you can specify a reference to the SNS topic for alarms. This is optional, but it's usually something you want
so you can receive alarm notifications via email, Slack, etc.

```
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


## 3. Getting Started with AWS SAM or CloudFormation

This method uses the SLIC Watch _CloudFormation Macro_. It is very simple to add this macro as a transform to your SAM or CloudFormation template, but first you must ensure that the SLIC Watch Macro has been deployed to the same AWS account/region as your application.

### 3.1. Deploying the SLIC Watch Macro
Deploy the SLIC Watch Macro in your account: 
- _Method 1 using the Service Application Repository (SAR) console_: Go to [SLIC Watch in the Serverless Application Repository](https://serverlessrepo.aws.amazon.com/applications/eu-west-1/949339270388/slic-watch-app) and click the Deploy button.
- _Method 2 (using SAR with CloudFormation)_: Add the SLIC Watch SAR application as a resource in a template:
 ```yaml
 SlicWatchMacro:
  Type: AWS::Serverless::Application
  Properties:
    Location:
      ApplicationId: arn:aws:serverlessrepo:eu-west-1:949339270388:applications~slic-watch-app 
      SemanticVersion: <enter latest version>
 ```
- _Method 3 (manual Macro deployment using SAM)_:
```
npm install
sam build --base-dir . --template-file cf-macro/template.yaml
sam deploy --guided
```
### 3.2. Adding the SLIC Watch Transform:
Once you have deployed the macro, add it to a SAM or CloudFormation template in the **Transform** section :

```
Transform:
  - ...
  - SlicWatch-v2
```

3. 🪛 _Optionally_, add some configuration for the plugin to the `Metadata -> slicWatch` section of `template.yml`.
Here, you can specify a reference to the SNS topic for alarms. This is optional, but it's usually something you want
so you can receive alarm notifications via email, Slack, etc.

```
Metadata:
  slicWatch:
    enabled: true
    topicArn: !Ref MonitoringTopic
```
See the [Configuration](#configuration) section below for more detailed instructions on fine tuning SLIC Watch to your needs.

If you want to override the default alarm and dashboard settings for each Lambda Functino resource, add the `slicWatch` property to the `Metadata` section.

## 4. Features

CloudWatch Alarms and Dashboard widgets are created for all supported resources in the CloudFormation stack generated by The Serverless Framework. This includes generated resources as well as resources specifed explicitly in the `resources` section.
Any feature can be configured or disabled completely - see the section on [configuration](#configuration) to see how.

### 4.1. Lambda Functions

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

### 4.2. API Gateway

API Gateway alarms are created for:
1. 5XX Errors
2. 4XX Errors
3. Latency

API Gateway dashboard widgets show:

|5XX Errors|4XX Errors|Latency|Count|
|--|--|--|--|
|![5XX Errors](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/api5xx.png)|![4XX Errors](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/api4xx.png) |![Latency](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/apiLatency.png) |![Count](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/apiCount.png) |

### 4.3. DynamoDB

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

### 4.4. Kinesis Data Streams
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

### 4.5. SQS Queues

SQS Queue alarms are create for:
1. Age Of Oldest Message (disabled by default). If enabled, a threshold in seconds should be specified.
2. In Flight Messages Percentage. This is a percentage of the [AWS hard limits](https://aws.amazon.com/sqs/faqs/) (20,000 messages for FIFO queues and 120,000 for standard queues).

SQS queue dashboard widgets show:

|Messages Sent, Received and Deleted|Messages Visible|Age of Oldest Message|
|--|--|--|
|![Messages](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/sqsMessages.png)|![Messages Visible](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/sqsMessagesInQueue.png) |![Oldest Message](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/sqsOldestMessage.png) |

### 4.6. Step Functions

Step Function alarms are created for:
1. Execution Throttled
2. Executions Failed
3. Executions Timed Out

The dashboard contains one widget per Step Function:
|ExecutionsFailed ExecutionThrottled, ExecutionsTimedOut|
|--|
|![Step Function widget](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/stepFunctions.png)

### 4.7. ECS / Fargate

ECS alarms are created for Fargate or EC2 clusters:
1. Memory Utilization
2. CPU Utilization

### 4.8. SNS

SNS alarms are created for:
1. Number of Notifications Filtered Out due to Invalid Attributes
2. Number of Notifications Failed

SNS Topic dashboard widgets show:

|Messages Filtered Out - Invalid Attributes|Notifications Failed|
|--|--|
|![Invalid Attributes](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/snsInvalidAttributes.png)|![Notifications Failed](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/snsNotificationsFailed.png) |

### 4.9. EventBridge

EventBridge alarms are created for:
1. Failed Invocations
2. Throttled Rules

EventBridge Rule dashboard widgets show:

|Failed Invocations|Invocations|
|--|--|
|![FailedInvocations](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/eventBridgeFailedInvocations.png)|![Invocations](https://raw.githubusercontent.com/fourtheorem/slic-watch/main/docs/eventBridgeInvocations.png)|

## 5. Configuration

Configuration is entirely optional - SLIC Watch provides defaults that work out of the box.

**Note**: Alarm configuration is _cascading_. This means that configuration properties are automatically propagated from parent to children nodes (unless an override is present at the given node).

You can customize the configuration:
- at the top level, for all resources in each service, and/or
- at the level of individual functions.

### 5.1. Top-level configuration
SLIC Watch configuration can be specified:
- For *Serverless Framework applications*, in the `custom` → `slicWatch` section of `serverless.yml`, e.g:
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

- The `topicArn` may be optionally provided as an SNS Topic destination for all alarms.  If you omit the topic, alarms are still created but are not sent to any destination.
- Alarms or dashboards can be disabled at any level in the configuration by adding `enabled: false`. You can even disable all plugin functionality by specifying `enabled: false` at the top-level plugin configuration.

A complete set of supported options along with their defaults are shown in [default-config.yaml](./core/default-config.yaml)

Example projects are also provided for reference: 
- [serverless-test-project](./serverless-test-project)
- [sam-test-project](./sam-test-project)

### 5.2. Function-level configuration

For each function, add the `slicWatch` property to configure specific overrides for alarms and dashboards relating to the AWS Lambda Function resource. 

#### 5.2.1. Serverless Framework function-level configuration
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

#### 5.2.2. SAM/CloudFormation function-level configuration
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
## 6. A note on CloudWatch cost

This plugin creates additional CloudWatch resources that, apart from a limited free tier, have an associated cost.
Depending on what you enable, SLIC Watch creates one dashboard and multiple alarms. The number of each depend on the number of resources in your stack and the number of stacks you have.

Check out the AWS [CloudWatch Pricing](https://aws.amazon.com/cloudwatch/pricing/) page to understand the cost impact of creating CloudWatch resources.


## 7. References

### 7.1. Other Projects

1. [serverless-plugin-aws-alerts](https://www.npmjs.com/package/serverless-plugin-aws-alerts)
2. [Real World Serverless Application - Serverless Operations](https://github.com/awslabs/realworld-serverless-application/wiki/Serverless-Operations)
3. [CDK Watchful](https://github.com/cdklabs/cdk-watchful)
4. [CDK Patterns - The CloudWatch Dashboard](https://github.com/cdk-patterns/serverless/blob/main/the-cloudwatch-dashboard/README.md)

### 7.2. Reading

1. [AWS Well Architected Serverless Applications Lens](https://docs.aws.amazon.com/wellarchitected/latest/serverless-applications-lens/welcome.html)
2. [How to Monitor Lambda with CloudWatch Metrics - Yan Cui](https://lumigo.io/serverless-monitoring-guide/how-to-monitor-lambda-with-cloudwatch-metrics/)

## 8. LICENSE

Apache - [LICENSE](./LICENSE)

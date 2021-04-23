# slic-watch

[![CircleCI Build Status](https://circleci.com/gh/fourTheorem/slic-watch.svg?style=shield)](https://app.circleci.com/pipelines/github/fourTheorem/slic-watch)
[![Coverage Status](https://coveralls.io/repos/github/fourTheorem/slic-watch/badge.svg?branch=master)](https://coveralls.io/github/fourTheorem/slic-watch?branch=master)

SLIC Watch provides a CloudWatch Dashboard and Alarms for:

 1. AWS Lambda
 2. API Gateway
 3. Kinesis Data Streams (available for Lambda consumers, more coming soon)
 4. DynamoDB Tables (Coming soon)
 5. SQS Queues (Coming soon)

Currently, SLIC Watch is available as a Serverless Framework plugin.

## Installation

```
npm install serverless-slic-watch-plugin --save-dev
```

## Configuration


The `topic` configuration must be configured with the ARN of an SNS Topic.
Alarm configuration is _cascading_. This means that configuration properties are automatically propagated from parent to children nodes (unless an override is present at the given node).
Supported options along with their defaults are shown below.


```yaml
...

custom:
  slicWatch:
    topic: SNS_TOPIC_ARN
    alarms:
      Period: 60 
      EvaluationPeriods: 1
      TreatMissingData: notBreaching
      ComparisonOperator: GreaterThanThreshold
      Lambda:
        Errors:
          Threshold: 0
          Statistic: Sum
        ThrottlesPc:
          Threshold: 0
        DurationPc:
          Threshold: 95
          Statistic: Maximum
        Invocations:
          Threshold: null
          Statistic: Sum
        IteratorAge:
          Threshold: 10000
          Statistic: Maximum
      ApiGateway:
        5XXError:
          Statistic: Average
          Threshold: 0
        4XXError:
          Statistic: Average
          Threshold: 0.05
        Latency:
          ExtendedStatistic: p99
          Threshold: 5000
```

An example project is provided for reference: [serverless-test-project](./serverless-test-project)

## LICENSE

Apache - [LICENSE](./LICENSE)

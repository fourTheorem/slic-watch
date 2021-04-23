# slic-watch

[![Build](https://github.com/fourTheorem/slic-watch/actions/workflows/build.yml/badge.svg)](https://github.com/fourTheorem/slic-watch/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/fourTheorem/slic-watch/badge.svg?branch=main)](https://coveralls.io/github/fourTheorem/slic-watch?branch=main)

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

## References

### Other Projects
1. [serverless-plugin-aws-alerts](https://www.npmjs.com/package/serverless-plugin-aws-alerts)
2. [Real World Serverless Application - Serverless Operations](https://github.com/awslabs/realworld-serverless-application/wiki/Serverless-Operations)
3. [CDK Patterns - The CloudWatch Dashboard](https://github.com/cdk-patterns/serverless/blob/main/the-cloudwatch-dashboard/README.md)

### Reading
1. [AWS Well Architected Serverless Applications Lens](https://docs.aws.amazon.com/wellarchitected/latest/serverless-applications-lens/welcome.html)
2. [How to Monitor Lambda with CloudWatch Metrics - Yan Cui](https://lumigo.io/serverless-monitoring-guide/how-to-monitor-lambda-with-cloudwatch-metrics/)

## LICENSE

Apache - [LICENSE](./LICENSE)

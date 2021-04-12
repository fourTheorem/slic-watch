# slic-watch

[![CircleCI Build Status](https://circleci.com/gh/fourTheorem/slic-watch.svg?style=shield)](https://app.circleci.com/pipelines/github/fourTheorem/slic-watch)
[![Coverage Status](https://coveralls.io/repos/github/fourTheorem/slic-watch/badge.svg?branch=master)](https://coveralls.io/github/fourTheorem/slic-watch?branch=master)

SLIC Watch provides a CloudWatch Dashboard and Alarms for:

 1. AWS Lambda
 2. API Gateway (Coming soon)
 3. Kinesis Data Streams (Coming soon - already available for Lambda consumers)
 4. DynamoDB Tables (Coming soon)
 5. SQS Queues (Coming soon)

Currently, SLIC Watch is available as a Serverless Framework plugin.

## Installation

```
npm install serverless-slic-watch-plugin --save-dev
```

## Configuration


The `topic` configuration must be configured with the ARN of an SNS Topic.
Alarm configuration values may also be specified. These variables along with their defaults are shown in this sample configuration:


```yaml
...

custom:
  slicWatch:
    topic: SNS_TOPIC_ARN
    alarmPeriod: 60,                      # The period in seconds in which metrics are evaluated
    durationPercentTimeoutThreshold: 95,  # The % of the function's timeout at which to alarm on function duration
    errorsThreshold: 0,                   # The number of errors to allow without alarming on function errors
    throttlesPercentThreshold: 0,         # The % of throttled function invocations to allow before alarming
    iteratorAgeThreshold: 10000,          # The stream iterator age in milliseconds beyond which to alarm
```

An example project is provided for reference: [serverless-test-project](../serverless-test-project)

## LICENSE

Apache - [LICENSE](../LICENSE)

# slic-watch

[![CircleCI Build Status](https://circleci.com/gh/fourTheorem/slic-watch.svg?style=shield)](https://app.circleci.com/pipelines/github/fourTheorem/slic-watch)
[![Coverage Status](https://coveralls.io/repos/github/fourTheorem/slic-watch/badge.svg?branch=master)](https://coveralls.io/github/fourTheorem/slic-watch?branch=master)

SLIC Watch provides a CloudWatch Dashboard and Alarms for:

 1. AWS Lambda
 2. API Gateway (Coming soon)
 3. Kinesis Data Streams (Coming soon)
 4. DynamoDB Tables (Coming soon)
 5. SQS Queues (Coming soon)

Currently, SLIC Watch is available as a Serverless Framework plugin.

## Installation

```
npm install serverless-slic-watch-plugin --save-dev
```

## Configuration

At a minimum, you are required to specify an SNS Topic. This topic is the destination for all alarms.

```yaml
...

custom:
  slicWatch:
    topicArn: <YOUR_TOPIC_ARN>
```

An example project is provided for reference: [serverless-test-project](../serverless-test-project)

## LICENSE

Apache - [LICENSE](../LICENSE)

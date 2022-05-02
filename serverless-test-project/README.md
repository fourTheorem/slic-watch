# Serverless test project for SLIC Watch

This is a sample Serverless V3 project that showcases how you can configure and deploy a Serverless project using SLIC Watch.

## Requirements

Install all the necessary requirements with:

```bash
npm i
```

Make sure to have the AWS CLI installed and configured.

## Deployment

To deploy the test project you should:

  1. Create an SNS topic in `eu-west-1` and grab it's ARN
  2. Run `ALARM_TOPIC=<your_sns_topic_arn> sls deploy`

If all went well you should see the following output:

```plain
Running "serverless" from node_modules

Deploying serverless-test-project to stage dev (eu-west-1)

✔ Service deployed to stack serverless-test-project-dev (117s)

endpoint: GET - https://1234567890.execute-api.eu-west-1.amazonaws.com/dev/item
functions:
  hello: serverless-test-project-dev-hello (305 kB)
  ping: serverless-test-project-dev-ping (305 kB)
  throttler: serverless-test-project-dev-throttler (305 kB)
  driveStream: serverless-test-project-dev-driveStream (305 kB)
  driveQueue: serverless-test-project-dev-driveQueue (305 kB)
  driveTable: serverless-test-project-dev-driveTable (305 kB)
  streamProcessor: serverless-test-project-dev-streamProcessor (305 kB)
  httpGetter: serverless-test-project-dev-httpGetter (305 kB)
```

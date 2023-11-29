/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`sam-test-project/tests/snapshot/sam-test-project-snapshot.test.ts > TAP > sam-test-project snapshot > fragment 1`] = `
Object {
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "sam-test-project",
  "Metadata": Object {
    "slicWatch": Object {
      "alarmActionsConfig": Object {
        "actionsEnabled": true,
        "alarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "okActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
      },
      "alarms": Object {
        "Lambda": Object {
          "Invocations": Object {
            "enabled": true,
            "Threshold": 10,
          },
        },
        "SQS": Object {
          "AgeOfOldestMessage": Object {
            "enabled": true,
            "Statistic": "Maximum",
            "Threshold": 60,
          },
          "InFlightMessagesPc": Object {
            "Statistic": "Maximum",
            "Threshold": 1,
          },
        },
      },
      "enabled": true,
    },
  },
  "Resources": Object {
    "dataTable": Object {
      "DeletionPolicy": "Delete",
      "Metadata": Object {
        "SamResourceId": "dataTable",
      },
      "Properties": Object {
        "AttributeDefinitions": Array [
          Object {
            "AttributeName": "pk",
            "AttributeType": "S",
          },
          Object {
            "AttributeName": "sk",
            "AttributeType": "S",
          },
          Object {
            "AttributeName": "gsi1pk",
            "AttributeType": "S",
          },
          Object {
            "AttributeName": "gsi1sk",
            "AttributeType": "S",
          },
          Object {
            "AttributeName": "timestamp",
            "AttributeType": "N",
          },
        ],
        "GlobalSecondaryIndexes": Array [
          Object {
            "IndexName": "GSI1",
            "KeySchema": Array [
              Object {
                "AttributeName": "gsi1pk",
                "KeyType": "HASH",
              },
              Object {
                "AttributeName": "gsi1sk",
                "KeyType": "RANGE",
              },
            ],
            "Projection": Object {
              "NonKeyAttributes": Array [
                "address",
              ],
              "ProjectionType": "INCLUDE",
            },
            "ProvisionedThroughput": Object {
              "ReadCapacityUnits": 1,
              "WriteCapacityUnits": 1,
            },
          },
        ],
        "KeySchema": Array [
          Object {
            "AttributeName": "pk",
            "KeyType": "HASH",
          },
          Object {
            "AttributeName": "sk",
            "KeyType": "RANGE",
          },
        ],
        "LocalSecondaryIndexes": Array [
          Object {
            "IndexName": "LSI1",
            "KeySchema": Array [
              Object {
                "AttributeName": "pk",
                "KeyType": "HASH",
              },
              Object {
                "AttributeName": "timestamp",
                "KeyType": "RANGE",
              },
            ],
            "Projection": Object {
              "NonKeyAttributes": Array [
                "name",
              ],
              "ProjectionType": "INCLUDE",
            },
          },
        ],
        "ProvisionedThroughput": Object {
          "ReadCapacityUnits": 1,
          "WriteCapacityUnits": 1,
        },
      },
      "Type": "AWS::DynamoDB::Table",
    },
    "driveQueue": Object {
      "Metadata": Object {
        "SamResourceId": "driveQueue",
      },
      "Properties": Object {
        "Code": Object {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/841a60f2d379216bd90fa34e033d0596",
        },
        "Handler": "basic-handler.hello",
        "Role": Object {
          "Fn::GetAtt": Array [
            "driveQueueRole",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
        "Tags": Array [
          Object {
            "Key": "lambda:createdBy",
            "Value": "SAM",
          },
        ],
      },
      "Type": "AWS::Lambda::Function",
    },
    "driveQueueRole": Object {
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": Array [
                "sts:AssumeRole",
              ],
              "Effect": "Allow",
              "Principal": Object {
                "Service": Array [
                  "lambda.amazonaws.com",
                ],
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        ],
        "Tags": Array [
          Object {
            "Key": "lambda:createdBy",
            "Value": "SAM",
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "driveStream": Object {
      "Metadata": Object {
        "SamResourceId": "driveStream",
      },
      "Properties": Object {
        "Code": Object {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/841a60f2d379216bd90fa34e033d0596",
        },
        "Handler": "stream-test-handler.handleDrive",
        "Role": Object {
          "Fn::GetAtt": Array [
            "driveStreamRole",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
        "Tags": Array [
          Object {
            "Key": "lambda:createdBy",
            "Value": "SAM",
          },
        ],
      },
      "Type": "AWS::Lambda::Function",
    },
    "driveStreamRole": Object {
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": Array [
                "sts:AssumeRole",
              ],
              "Effect": "Allow",
              "Principal": Object {
                "Service": Array [
                  "lambda.amazonaws.com",
                ],
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        ],
        "Tags": Array [
          Object {
            "Key": "lambda:createdBy",
            "Value": "SAM",
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "driveTable": Object {
      "Metadata": Object {
        "SamResourceId": "driveTable",
      },
      "Properties": Object {
        "Code": Object {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/841a60f2d379216bd90fa34e033d0596",
        },
        "Handler": "basic-handler.hello",
        "Role": Object {
          "Fn::GetAtt": Array [
            "driveTableRole",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
        "Tags": Array [
          Object {
            "Key": "lambda:createdBy",
            "Value": "SAM",
          },
        ],
      },
      "Type": "AWS::Lambda::Function",
    },
    "driveTableRole": Object {
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": Array [
                "sts:AssumeRole",
              ],
              "Effect": "Allow",
              "Principal": Object {
                "Service": Array [
                  "lambda.amazonaws.com",
                ],
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        ],
        "Tags": Array [
          Object {
            "Key": "lambda:createdBy",
            "Value": "SAM",
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "ecsCluster": Object {
      "Metadata": Object {
        "SamResourceId": "ecsCluster",
      },
      "Type": "AWS::ECS::Cluster",
    },
    "ecsService": Object {
      "Metadata": Object {
        "SamResourceId": "ecsService",
      },
      "Properties": Object {
        "Cluster": Object {
          "Ref": "ecsCluster",
        },
        "DesiredCount": 0,
        "LaunchType": "FARGATE",
        "NetworkConfiguration": Object {
          "AwsvpcConfiguration": Object {
            "AssignPublicIp": "ENABLED",
            "SecurityGroups": Array [],
            "Subnets": Array [
              Object {
                "Ref": "subnet",
              },
            ],
          },
        },
        "TaskDefinition": Object {
          "Ref": "taskDef",
        },
      },
      "Type": "AWS::ECS::Service",
    },
    "eventsRule": Object {
      "Metadata": Object {
        "SamResourceId": "eventsRule",
        "slicWatch": Object {
          "alarms": Object {
            "Lambda": Object {
              "enabled": false,
            },
          },
        },
      },
      "Properties": Object {
        "Code": Object {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/841a60f2d379216bd90fa34e033d0596",
        },
        "Handler": "rule-handler.handleRule",
        "Role": Object {
          "Fn::GetAtt": Array [
            "eventsRuleRole",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
        "Tags": Array [
          Object {
            "Key": "lambda:createdBy",
            "Value": "SAM",
          },
        ],
      },
      "Type": "AWS::Lambda::Function",
    },
    "eventsRuleRole": Object {
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": Array [
                "sts:AssumeRole",
              ],
              "Effect": "Allow",
              "Principal": Object {
                "Service": Array [
                  "lambda.amazonaws.com",
                ],
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        ],
        "Tags": Array [
          Object {
            "Key": "lambda:createdBy",
            "Value": "SAM",
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "eventsRuleTrigger": Object {
      "Properties": Object {
        "EventPattern": Object {
          "detail-type": Array [
            "Invoke Lambda Function",
          ],
        },
        "Targets": Array [
          Object {
            "Arn": Object {
              "Fn::GetAtt": Array [
                "eventsRule",
                "Arn",
              ],
            },
            "Id": "eventsRuleTriggerLambdaTarget",
            "RetryPolicy": Object {
              "MaximumEventAgeInSeconds": 60,
              "MaximumRetryAttempts": 0,
            },
          },
        ],
      },
      "Type": "AWS::Events::Rule",
    },
    "eventsRuleTriggerPermission": Object {
      "Properties": Object {
        "Action": "lambda:InvokeFunction",
        "FunctionName": Object {
          "Ref": "eventsRule",
        },
        "Principal": "events.amazonaws.com",
        "SourceArn": Object {
          "Fn::GetAtt": Array [
            "eventsRuleTrigger",
            "Arn",
          ],
        },
      },
      "Type": "AWS::Lambda::Permission",
    },
    "fifoQueue": Object {
      "Metadata": Object {
        "SamResourceId": "fifoQueue",
      },
      "Properties": Object {
        "FifoQueue": true,
      },
      "Type": "AWS::SQS::Queue",
    },
    "hello": Object {
      "Metadata": Object {
        "SamResourceId": "hello",
        "slicWatch": Object {
          "alarms": Object {
            "Lambda": Object {
              "Invocations": Object {
                "Threshold": 2,
              },
            },
          },
        },
      },
      "Properties": Object {
        "Code": Object {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/841a60f2d379216bd90fa34e033d0596",
        },
        "Handler": "basic-handler.hello",
        "Role": Object {
          "Fn::GetAtt": Array [
            "helloRole",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
        "Tags": Array [
          Object {
            "Key": "lambda:createdBy",
            "Value": "SAM",
          },
        ],
      },
      "Type": "AWS::Lambda::Function",
    },
    "helloRole": Object {
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": Array [
                "sts:AssumeRole",
              ],
              "Effect": "Allow",
              "Principal": Object {
                "Service": Array [
                  "lambda.amazonaws.com",
                ],
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        ],
        "Tags": Array [
          Object {
            "Key": "lambda:createdBy",
            "Value": "SAM",
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "httpGetter": Object {
      "Metadata": Object {
        "SamResourceId": "httpGetter",
      },
      "Properties": Object {
        "Code": Object {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/841a60f2d379216bd90fa34e033d0596",
        },
        "Handler": "apigw-handler.handleGet",
        "Role": Object {
          "Fn::GetAtt": Array [
            "httpGetterRole",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
        "Tags": Array [
          Object {
            "Key": "lambda:createdBy",
            "Value": "SAM",
          },
        ],
        "Timeout": 30,
      },
      "Type": "AWS::Lambda::Function",
    },
    "httpGetterHttpApiEventPermission": Object {
      "Properties": Object {
        "Action": "lambda:InvokeFunction",
        "FunctionName": Object {
          "Ref": "httpGetter",
        },
        "Principal": "apigateway.amazonaws.com",
        "SourceArn": Object {
          "Fn::Sub": Array [
            "arn:\${AWS::Partition}:execute-api:\${AWS::Region}:\${AWS::AccountId}:\${__ApiId__}/\${__Stage__}/GETitem",
            Object {
              "__ApiId__": Object {
                "Ref": "ServerlessHttpApi",
              },
              "__Stage__": "*",
            },
          ],
        },
      },
      "Type": "AWS::Lambda::Permission",
    },
    "httpGetterRole": Object {
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": Array [
                "sts:AssumeRole",
              ],
              "Effect": "Allow",
              "Principal": Object {
                "Service": Array [
                  "lambda.amazonaws.com",
                ],
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        ],
        "Tags": Array [
          Object {
            "Key": "lambda:createdBy",
            "Value": "SAM",
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "MonitoringTopic": Object {
      "Metadata": Object {
        "SamResourceId": "MonitoringTopic",
      },
      "Properties": Object {
        "TopicName": "SS-Alarm-Topic3",
      },
      "Type": "AWS::SNS::Topic",
    },
    "ping": Object {
      "Metadata": Object {
        "SamResourceId": "ping",
        "slicWatch": Object {
          "dashboard": Object {
            "enabled": false,
          },
        },
      },
      "Properties": Object {
        "Code": Object {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/841a60f2d379216bd90fa34e033d0596",
        },
        "Handler": "basic-handler.hello",
        "Role": Object {
          "Fn::GetAtt": Array [
            "pingRole",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
        "Tags": Array [
          Object {
            "Key": "lambda:createdBy",
            "Value": "SAM",
          },
        ],
      },
      "Type": "AWS::Lambda::Function",
    },
    "pingRole": Object {
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": Array [
                "sts:AssumeRole",
              ],
              "Effect": "Allow",
              "Principal": Object {
                "Service": Array [
                  "lambda.amazonaws.com",
                ],
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        ],
        "Tags": Array [
          Object {
            "Key": "lambda:createdBy",
            "Value": "SAM",
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "regularQueue": Object {
      "Metadata": Object {
        "SamResourceId": "regularQueue",
      },
      "Type": "AWS::SQS::Queue",
    },
    "ServerlessHttpApi": Object {
      "Properties": Object {
        "Body": Object {
          "info": Object {
            "title": Object {
              "Ref": "AWS::StackName",
            },
            "version": "1.0",
          },
          "openapi": "3.0.1",
          "paths": Object {
            "item": Object {
              "get": Object {
                "responses": Object {},
                "x-amazon-apigateway-integration": Object {
                  "httpMethod": "POST",
                  "payloadFormatVersion": "2.0",
                  "type": "aws_proxy",
                  "uri": Object {
                    "Fn::Sub": "arn:\${AWS::Partition}:apigateway:\${AWS::Region}:lambda:path/2015-03-31/functions/\${httpGetter.Arn}/invocations",
                  },
                },
              },
            },
          },
          "tags": Array [
            Object {
              "name": "httpapi:createdBy",
              "x-amazon-apigateway-tag-value": "SAM",
            },
          ],
        },
      },
      "Type": "AWS::ApiGatewayV2::Api",
    },
    "ServerlessHttpApiApiGatewayDefaultStage": Object {
      "Properties": Object {
        "ApiId": Object {
          "Ref": "ServerlessHttpApi",
        },
        "AutoDeploy": true,
        "StageName": "$default",
        "Tags": Object {
          "httpapi:createdBy": "SAM",
        },
      },
      "Type": "AWS::ApiGatewayV2::Stage",
    },
    "slicWatchDashboard": Object {
      "Properties": Object {
        "DashboardBody": Object {
          "Fn::Sub": "{\\"start\\":\\"-PT3H\\",\\"widgets\\":[{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/States\\",\\"ExecutionsFailed\\",\\"StateMachineArn\\",\\"\${TestStateMachine}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/States\\",\\"ExecutionThrottled\\",\\"StateMachineArn\\",\\"\${TestStateMachine}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/States\\",\\"ExecutionsTimedOut\\",\\"StateMachineArn\\",\\"\${TestStateMachine}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"\${TestStateMachine.Name} Step Function Executions\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":0},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/DynamoDB\\",\\"ReadThrottleEvents\\",\\"TableName\\",\\"\${dataTable}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"ReadThrottleEvents Table \${dataTable}\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":0},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/DynamoDB\\",\\"ReadThrottleEvents\\",\\"TableName\\",\\"\${dataTable}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/DynamoDB\\",\\"ReadThrottleEvents\\",\\"TableName\\",\\"\${dataTable}\\",\\"GlobalSecondaryIndex\\",\\"GSI1\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"ReadThrottleEvents GSI GSI1 in \${dataTable}\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":0},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/DynamoDB\\",\\"ReadThrottleEvents\\",\\"TableName\\",\\"\${dataTable}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/DynamoDB\\",\\"ReadThrottleEvents\\",\\"TableName\\",\\"\${dataTable}\\",\\"GlobalSecondaryIndex\\",\\"GSI1\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/DynamoDB\\",\\"WriteThrottleEvents\\",\\"TableName\\",\\"\${dataTable}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"WriteThrottleEvents Table \${dataTable}\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":6},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/DynamoDB\\",\\"ReadThrottleEvents\\",\\"TableName\\",\\"\${dataTable}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/DynamoDB\\",\\"ReadThrottleEvents\\",\\"TableName\\",\\"\${dataTable}\\",\\"GlobalSecondaryIndex\\",\\"GSI1\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/DynamoDB\\",\\"WriteThrottleEvents\\",\\"TableName\\",\\"\${dataTable}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/DynamoDB\\",\\"WriteThrottleEvents\\",\\"TableName\\",\\"\${dataTable}\\",\\"GlobalSecondaryIndex\\",\\"GSI1\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"WriteThrottleEvents GSI GSI1 in \${dataTable}\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":6},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Errors\\",\\"FunctionName\\",\\"\${hello}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Errors\\",\\"FunctionName\\",\\"\${throttler}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Errors\\",\\"FunctionName\\",\\"\${driveStream}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Errors\\",\\"FunctionName\\",\\"\${driveQueue}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Errors\\",\\"FunctionName\\",\\"\${driveTable}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Errors\\",\\"FunctionName\\",\\"\${streamProcessor}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Errors\\",\\"FunctionName\\",\\"\${httpGetter}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Errors\\",\\"FunctionName\\",\\"\${eventsRule}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"Lambda Errors Sum per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":6},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Throttles\\",\\"FunctionName\\",\\"\${hello}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Throttles\\",\\"FunctionName\\",\\"\${throttler}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Throttles\\",\\"FunctionName\\",\\"\${driveStream}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Throttles\\",\\"FunctionName\\",\\"\${driveQueue}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Throttles\\",\\"FunctionName\\",\\"\${driveTable}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Throttles\\",\\"FunctionName\\",\\"\${streamProcessor}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Throttles\\",\\"FunctionName\\",\\"\${httpGetter}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Throttles\\",\\"FunctionName\\",\\"\${eventsRule}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"Lambda Throttles Sum per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":12},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${hello}\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${throttler}\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${driveStream}\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${driveQueue}\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${driveTable}\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${streamProcessor}\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${httpGetter}\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${eventsRule}\\",{\\"stat\\":\\"Average\\"}]],\\"title\\":\\"Lambda Duration Average per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":12},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${hello}\\",{\\"stat\\":\\"p95\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${throttler}\\",{\\"stat\\":\\"p95\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${driveStream}\\",{\\"stat\\":\\"p95\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${driveQueue}\\",{\\"stat\\":\\"p95\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${driveTable}\\",{\\"stat\\":\\"p95\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${streamProcessor}\\",{\\"stat\\":\\"p95\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${httpGetter}\\",{\\"stat\\":\\"p95\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${eventsRule}\\",{\\"stat\\":\\"p95\\"}]],\\"title\\":\\"Lambda Duration p95 per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":12},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${hello}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${throttler}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${driveStream}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${driveQueue}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${driveTable}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${streamProcessor}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${httpGetter}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${eventsRule}\\",{\\"stat\\":\\"Maximum\\"}]],\\"title\\":\\"Lambda Duration Maximum per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":18},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Invocations\\",\\"FunctionName\\",\\"\${hello}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Invocations\\",\\"FunctionName\\",\\"\${throttler}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Invocations\\",\\"FunctionName\\",\\"\${driveStream}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Invocations\\",\\"FunctionName\\",\\"\${driveQueue}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Invocations\\",\\"FunctionName\\",\\"\${driveTable}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Invocations\\",\\"FunctionName\\",\\"\${streamProcessor}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Invocations\\",\\"FunctionName\\",\\"\${httpGetter}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Invocations\\",\\"FunctionName\\",\\"\${eventsRule}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"Lambda Invocations Sum per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":18},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"ConcurrentExecutions\\",\\"FunctionName\\",\\"\${hello}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"ConcurrentExecutions\\",\\"FunctionName\\",\\"\${throttler}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"ConcurrentExecutions\\",\\"FunctionName\\",\\"\${driveStream}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"ConcurrentExecutions\\",\\"FunctionName\\",\\"\${driveQueue}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"ConcurrentExecutions\\",\\"FunctionName\\",\\"\${driveTable}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"ConcurrentExecutions\\",\\"FunctionName\\",\\"\${streamProcessor}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"ConcurrentExecutions\\",\\"FunctionName\\",\\"\${httpGetter}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"ConcurrentExecutions\\",\\"FunctionName\\",\\"\${eventsRule}\\",{\\"stat\\":\\"Maximum\\"}]],\\"title\\":\\"Lambda ConcurrentExecutions Maximum per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":18},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"IteratorAge\\",\\"FunctionName\\",\\"\${streamProcessor}\\",{\\"stat\\":\\"Maximum\\"}]],\\"title\\":\\"Lambda IteratorAge \${streamProcessor} Maximum\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":24},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Kinesis\\",\\"GetRecords.IteratorAgeMilliseconds\\",\\"StreamName\\",\\"\${stream}\\",{\\"stat\\":\\"Maximum\\"}]],\\"title\\":\\"IteratorAge \${stream} Kinesis\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":24},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Kinesis\\",\\"PutRecord.Success\\",\\"StreamName\\",\\"\${stream}\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/Kinesis\\",\\"PutRecords.Success\\",\\"StreamName\\",\\"\${stream}\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/Kinesis\\",\\"GetRecords.Success\\",\\"StreamName\\",\\"\${stream}\\",{\\"stat\\":\\"Average\\"}]],\\"title\\":\\"Get/Put Success \${stream} Kinesis\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":24},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Kinesis\\",\\"ReadProvisionedThroughputExceeded\\",\\"StreamName\\",\\"\${stream}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Kinesis\\",\\"WriteProvisionedThroughputExceeded\\",\\"StreamName\\",\\"\${stream}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"Provisioned Throughput \${stream} Kinesis\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":30},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/SQS\\",\\"NumberOfMessagesSent\\",\\"QueueName\\",\\"\${regularQueue.QueueName}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/SQS\\",\\"NumberOfMessagesReceived\\",\\"QueueName\\",\\"\${regularQueue.QueueName}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/SQS\\",\\"NumberOfMessagesDeleted\\",\\"QueueName\\",\\"\${regularQueue.QueueName}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"Messages \${regularQueue.QueueName} SQS\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":30},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/SQS\\",\\"ApproximateAgeOfOldestMessage\\",\\"QueueName\\",\\"\${regularQueue.QueueName}\\",{\\"stat\\":\\"Maximum\\"}]],\\"title\\":\\"Oldest Message age \${regularQueue.QueueName} SQS\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":30},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/SQS\\",\\"ApproximateNumberOfMessagesVisible\\",\\"QueueName\\",\\"\${regularQueue.QueueName}\\",{\\"stat\\":\\"Maximum\\"}]],\\"title\\":\\"Messages in queue \${regularQueue.QueueName} SQS\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":36},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/SQS\\",\\"NumberOfMessagesSent\\",\\"QueueName\\",\\"\${fifoQueue.QueueName}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/SQS\\",\\"NumberOfMessagesReceived\\",\\"QueueName\\",\\"\${fifoQueue.QueueName}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/SQS\\",\\"NumberOfMessagesDeleted\\",\\"QueueName\\",\\"\${fifoQueue.QueueName}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"Messages \${fifoQueue.QueueName} SQS\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":36},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/SQS\\",\\"ApproximateAgeOfOldestMessage\\",\\"QueueName\\",\\"\${fifoQueue.QueueName}\\",{\\"stat\\":\\"Maximum\\"}]],\\"title\\":\\"Oldest Message age \${fifoQueue.QueueName} SQS\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":36},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/SQS\\",\\"ApproximateNumberOfMessagesVisible\\",\\"QueueName\\",\\"\${fifoQueue.QueueName}\\",{\\"stat\\":\\"Maximum\\"}]],\\"title\\":\\"Messages in queue \${fifoQueue.QueueName} SQS\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":42},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/ECS\\",\\"MemoryUtilization\\",\\"ServiceName\\",\\"\${ecsService.Name}\\",\\"ClusterName\\",\\"\${ecsCluster}\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/ECS\\",\\"CPUUtilization\\",\\"ServiceName\\",\\"\${ecsService.Name}\\",\\"ClusterName\\",\\"\${ecsCluster}\\",{\\"stat\\":\\"Average\\"}]],\\"title\\":\\"ECS Service \${ecsService.Name}\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":42},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/SNS\\",\\"NumberOfNotificationsFilteredOut-InvalidAttributes\\",\\"TopicName\\",\\"\${MonitoringTopic.TopicName}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/SNS\\",\\"NumberOfNotificationsFailed\\",\\"TopicName\\",\\"\${MonitoringTopic.TopicName}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"SNS Topic \${MonitoringTopic.TopicName}\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":42},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Events\\",\\"FailedInvocations\\",\\"RuleName\\",\\"\${eventsRuleTrigger}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Events\\",\\"ThrottledRules\\",\\"RuleName\\",\\"\${eventsRuleTrigger}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Events\\",\\"Invocations\\",\\"RuleName\\",\\"\${eventsRuleTrigger}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"EventBridge Rule \${eventsRuleTrigger}\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":48}]}",
        },
        "DashboardName": Object {
          "Fn::Sub": "\${AWS::StackName}-\${AWS::Region}-Dashboard",
        },
      },
      "Type": "AWS::CloudWatch::Dashboard",
    },
    "slicWatchECSCPUAlarmecsService": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "ECS CPUUtilization for \${ecsService.Name} breaches 90",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "ECS_CPUAlarm_\${ecsService.Name}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "ServiceName",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "ecsService",
                "Name",
              ],
            },
          },
          Object {
            "Name": "ClusterName",
            "Value": Object {
              "Ref": "ecsCluster",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "CPUUtilization",
        "Namespace": "AWS/ECS",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 90,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchECSMemoryAlarmecsService": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "ECS MemoryUtilization for \${ecsService.Name} breaches 90",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "ECS_MemoryAlarm_\${ecsService.Name}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "ServiceName",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "ecsService",
                "Name",
              ],
            },
          },
          Object {
            "Name": "ClusterName",
            "Value": Object {
              "Ref": "ecsCluster",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "MemoryUtilization",
        "Namespace": "AWS/ECS",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 90,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchEventsFailedInvocationsAlarmEventsRuleTrigger": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "EventBridge FailedInvocations for \${eventsRuleTrigger} breaches 1",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Events_FailedInvocations_Alarm_\${eventsRuleTrigger}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "RuleName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "eventsRuleTrigger",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "FailedInvocations",
        "Namespace": "AWS/Events",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchEventsThrottledRulesAlarmEventsRuleTrigger": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "EventBridge ThrottledRules for \${eventsRuleTrigger} breaches 1",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Events_ThrottledRules_Alarm_\${eventsRuleTrigger}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "RuleName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "eventsRuleTrigger",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ThrottledRules",
        "Namespace": "AWS/Events",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchGSIReadThrottleEventsAlarmdataTableGSI1": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DynamoDB Sum for \${dataTable}GSI1 breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DDB_ReadThrottleEvents_Alarm_\${dataTable}GSI1",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TableName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "dataTable",
            },
          },
          Object {
            "Name": "GlobalSecondaryIndex",
            "Value": "GSI1",
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ReadThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchGSIWriteThrottleEventsAlarmdataTableGSI1": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DynamoDB Sum for \${dataTable}GSI1 breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DDB_WriteThrottleEvents_Alarm_\${dataTable}GSI1",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TableName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "dataTable",
            },
          },
          Object {
            "Name": "GlobalSecondaryIndex",
            "Value": "GSI1",
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "WriteThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchKinesisStreamGetRecordsSuccessAlarmStream": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Kinesis Average GetRecords.Success for \${stream} breaches 1 milliseconds",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Kinesis_StreamGetRecordsSuccess_\${stream}",
            Object {},
          ],
        },
        "ComparisonOperator": "LessThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "StreamName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "stream",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "GetRecords.Success",
        "Namespace": "AWS/Kinesis",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 1,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchKinesisStreamIteratorAgeAlarmStream": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Kinesis Maximum GetRecords.IteratorAgeMilliseconds for \${stream} breaches 10000 milliseconds",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Kinesis_StreamIteratorAge_\${stream}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "StreamName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "stream",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "GetRecords.IteratorAgeMilliseconds",
        "Namespace": "AWS/Kinesis",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 10000,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchKinesisStreamPutRecordsSuccessAlarmStream": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Kinesis Average PutRecords.Success for \${stream} breaches 1 milliseconds",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Kinesis_StreamPutRecordsSuccess_\${stream}",
            Object {},
          ],
        },
        "ComparisonOperator": "LessThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "StreamName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "stream",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "PutRecords.Success",
        "Namespace": "AWS/Kinesis",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 1,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchKinesisStreamPutRecordSuccessAlarmStream": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Kinesis Average PutRecord.Success for \${stream} breaches 1 milliseconds",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Kinesis_StreamPutRecordSuccess_\${stream}",
            Object {},
          ],
        },
        "ComparisonOperator": "LessThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "StreamName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "stream",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "PutRecord.Success",
        "Namespace": "AWS/Kinesis",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 1,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchKinesisStreamReadThroughputAlarmStream": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Kinesis Sum ReadProvisionedThroughputExceeded for \${stream} breaches 0 milliseconds",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Kinesis_StreamReadThroughput_\${stream}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "StreamName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "stream",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ReadProvisionedThroughputExceeded",
        "Namespace": "AWS/Kinesis",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchKinesisStreamWriteThroughputAlarmStream": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Kinesis Sum WriteProvisionedThroughputExceeded for \${stream} breaches 0 milliseconds",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Kinesis_StreamWriteThroughput_\${stream}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "StreamName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "stream",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "WriteProvisionedThroughputExceeded",
        "Namespace": "AWS/Kinesis",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaDurationAlarmdriveQueue": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Max duration for \${driveQueue} breaches 95% of timeout (3)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Duration_\${driveQueue}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "driveQueue",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaDurationAlarmdriveStream": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Max duration for \${driveStream} breaches 95% of timeout (3)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Duration_\${driveStream}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "driveStream",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaDurationAlarmdriveTable": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Max duration for \${driveTable} breaches 95% of timeout (3)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Duration_\${driveTable}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "driveTable",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaDurationAlarmhello": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Max duration for \${hello} breaches 95% of timeout (3)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Duration_\${hello}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "hello",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaDurationAlarmhttpGetter": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Max duration for \${httpGetter} breaches 95% of timeout (30)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Duration_\${httpGetter}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "httpGetter",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 28500,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaDurationAlarmping": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Max duration for \${ping} breaches 95% of timeout (3)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Duration_\${ping}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "ping",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaDurationAlarmstreamProcessor": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Max duration for \${streamProcessor} breaches 95% of timeout (3)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Duration_\${streamProcessor}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "streamProcessor",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaDurationAlarmthrottler": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Max duration for \${throttler} breaches 95% of timeout (3)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Duration_\${throttler}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "throttler",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaErrorsAlarmdriveQueue": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Error count for \${driveQueue} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Errors_\${driveQueue}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "driveQueue",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaErrorsAlarmdriveStream": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Error count for \${driveStream} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Errors_\${driveStream}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "driveStream",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaErrorsAlarmdriveTable": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Error count for \${driveTable} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Errors_\${driveTable}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "driveTable",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaErrorsAlarmhello": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Error count for \${hello} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Errors_\${hello}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "hello",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaErrorsAlarmhttpGetter": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Error count for \${httpGetter} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Errors_\${httpGetter}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "httpGetter",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaErrorsAlarmping": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Error count for \${ping} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Errors_\${ping}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "ping",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaErrorsAlarmstreamProcessor": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Error count for \${streamProcessor} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Errors_\${streamProcessor}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "streamProcessor",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaErrorsAlarmthrottler": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Error count for \${throttler} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Errors_\${throttler}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "throttler",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaInvocationsAlarmdriveQueue": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Total invocations for \${driveQueue} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Invocations_\${driveQueue}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "driveQueue",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaInvocationsAlarmdriveStream": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Total invocations for \${driveStream} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Invocations_\${driveStream}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "driveStream",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaInvocationsAlarmdriveTable": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Total invocations for \${driveTable} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Invocations_\${driveTable}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "driveTable",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaInvocationsAlarmhello": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Total invocations for \${hello} breaches 2",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Invocations_\${hello}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "hello",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 2,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaInvocationsAlarmhttpGetter": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Total invocations for \${httpGetter} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Invocations_\${httpGetter}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "httpGetter",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaInvocationsAlarmping": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Total invocations for \${ping} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Invocations_\${ping}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "ping",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaInvocationsAlarmstreamProcessor": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Total invocations for \${streamProcessor} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Invocations_\${streamProcessor}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "streamProcessor",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaInvocationsAlarmthrottler": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Total invocations for \${throttler} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Invocations_\${throttler}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "throttler",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaIteratorAgeAlarmstreamProcessor": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "IteratorAge for \${streamProcessor} breaches 10000",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_IteratorAge_\${streamProcessor}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "streamProcessor",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "IteratorAge",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 10000,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaThrottlesAlarmdriveQueue": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Throttles % for \${driveQueue} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Throttles_\${driveQueue}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": Array [
          Object {
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Id": "throttles_pc",
            "Label": "% Throttles",
            "ReturnData": true,
          },
          Object {
            "Id": "throttles",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "driveQueue",
                    },
                  },
                ],
                "MetricName": "Throttles",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
          Object {
            "Id": "invocations",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "driveQueue",
                    },
                  },
                ],
                "MetricName": "Invocations",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
        ],
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaThrottlesAlarmdriveStream": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Throttles % for \${driveStream} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Throttles_\${driveStream}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": Array [
          Object {
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Id": "throttles_pc",
            "Label": "% Throttles",
            "ReturnData": true,
          },
          Object {
            "Id": "throttles",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "driveStream",
                    },
                  },
                ],
                "MetricName": "Throttles",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
          Object {
            "Id": "invocations",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "driveStream",
                    },
                  },
                ],
                "MetricName": "Invocations",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
        ],
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaThrottlesAlarmdriveTable": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Throttles % for \${driveTable} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Throttles_\${driveTable}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": Array [
          Object {
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Id": "throttles_pc",
            "Label": "% Throttles",
            "ReturnData": true,
          },
          Object {
            "Id": "throttles",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "driveTable",
                    },
                  },
                ],
                "MetricName": "Throttles",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
          Object {
            "Id": "invocations",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "driveTable",
                    },
                  },
                ],
                "MetricName": "Invocations",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
        ],
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaThrottlesAlarmhello": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Throttles % for \${hello} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Throttles_\${hello}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": Array [
          Object {
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Id": "throttles_pc",
            "Label": "% Throttles",
            "ReturnData": true,
          },
          Object {
            "Id": "throttles",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "hello",
                    },
                  },
                ],
                "MetricName": "Throttles",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
          Object {
            "Id": "invocations",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "hello",
                    },
                  },
                ],
                "MetricName": "Invocations",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
        ],
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaThrottlesAlarmhttpGetter": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Throttles % for \${httpGetter} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Throttles_\${httpGetter}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": Array [
          Object {
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Id": "throttles_pc",
            "Label": "% Throttles",
            "ReturnData": true,
          },
          Object {
            "Id": "throttles",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "httpGetter",
                    },
                  },
                ],
                "MetricName": "Throttles",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
          Object {
            "Id": "invocations",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "httpGetter",
                    },
                  },
                ],
                "MetricName": "Invocations",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
        ],
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaThrottlesAlarmping": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Throttles % for \${ping} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Throttles_\${ping}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": Array [
          Object {
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Id": "throttles_pc",
            "Label": "% Throttles",
            "ReturnData": true,
          },
          Object {
            "Id": "throttles",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "ping",
                    },
                  },
                ],
                "MetricName": "Throttles",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
          Object {
            "Id": "invocations",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "ping",
                    },
                  },
                ],
                "MetricName": "Invocations",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
        ],
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaThrottlesAlarmstreamProcessor": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Throttles % for \${streamProcessor} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Throttles_\${streamProcessor}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": Array [
          Object {
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Id": "throttles_pc",
            "Label": "% Throttles",
            "ReturnData": true,
          },
          Object {
            "Id": "throttles",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "streamProcessor",
                    },
                  },
                ],
                "MetricName": "Throttles",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
          Object {
            "Id": "invocations",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "streamProcessor",
                    },
                  },
                ],
                "MetricName": "Invocations",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
        ],
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaThrottlesAlarmthrottler": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Throttles % for \${throttler} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Throttles_\${throttler}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": Array [
          Object {
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Id": "throttles_pc",
            "Label": "% Throttles",
            "ReturnData": true,
          },
          Object {
            "Id": "throttles",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "throttler",
                    },
                  },
                ],
                "MetricName": "Throttles",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
          Object {
            "Id": "invocations",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "throttler",
                    },
                  },
                ],
                "MetricName": "Invocations",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
        ],
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchSNSNumberOfNotificationsFailedAlarmMonitoringTopic": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SNS NumberOfNotificationsFailed for \${MonitoringTopic.TopicName} breaches 1",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SNS_NumberOfNotificationsFailed_Alarm_\${MonitoringTopic.TopicName}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TopicName",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "MonitoringTopic",
                "TopicName",
              ],
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "NumberOfNotificationsFailed",
        "Namespace": "AWS/SNS",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchSNSNumberOfNotificationsFilteredOutInvalidAttributesAlarmMonitoringTopic": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SNS NumberOfNotificationsFilteredOutInvalidAttributes for \${MonitoringTopic.TopicName} breaches 1",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SNS_NumberOfNotificationsFilteredOutInvalidAttributes_Alarm_\${MonitoringTopic.TopicName}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TopicName",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "MonitoringTopic",
                "TopicName",
              ],
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "NumberOfNotificationsFilteredOut-InvalidAttributes",
        "Namespace": "AWS/SNS",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchSQSInFlightMsgsAlarmfifoQueue": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SQS in-flight messages for \${fifoQueue.QueueName} breaches 200 (1% of the hard limit of 20000)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SQS_ApproximateNumberOfMessagesNotVisible_\${fifoQueue.QueueName}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "QueueName",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "fifoQueue",
                "QueueName",
              ],
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ApproximateNumberOfMessagesNotVisible",
        "Namespace": "AWS/SQS",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 200,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchSQSInFlightMsgsAlarmregularQueue": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SQS in-flight messages for \${regularQueue.QueueName} breaches 1200 (1% of the hard limit of 120000)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SQS_ApproximateNumberOfMessagesNotVisible_\${regularQueue.QueueName}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "QueueName",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "regularQueue",
                "QueueName",
              ],
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ApproximateNumberOfMessagesNotVisible",
        "Namespace": "AWS/SQS",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 1200,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchSQSOldestMsgAgeAlarmfifoQueue": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SQS age of oldest message in the queue \${fifoQueue.QueueName} breaches 60",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SQS_ApproximateAgeOfOldestMessage_\${fifoQueue.QueueName}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "QueueName",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "fifoQueue",
                "QueueName",
              ],
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ApproximateAgeOfOldestMessage",
        "Namespace": "AWS/SQS",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 60,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchSQSOldestMsgAgeAlarmregularQueue": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SQS age of oldest message in the queue \${regularQueue.QueueName} breaches 60",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SQS_ApproximateAgeOfOldestMessage_\${regularQueue.QueueName}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "QueueName",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "regularQueue",
                "QueueName",
              ],
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ApproximateAgeOfOldestMessage",
        "Namespace": "AWS/SQS",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 60,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchStatesExecutionsFailedAlarmTestStateMachine": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "StepFunctions ExecutionsFailed Sum for \${TestStateMachine.Name}  breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "StepFunctions_ExecutionsFailedAlarm_\${TestStateMachine.Name}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "StateMachineArn",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "TestStateMachine",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ExecutionsFailed",
        "Namespace": "AWS/States",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchStatesExecutionsTimedOutAlarmTestStateMachine": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "StepFunctions ExecutionsTimedOut Sum for \${TestStateMachine.Name}  breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "StepFunctions_ExecutionsTimedOutAlarm_\${TestStateMachine.Name}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "StateMachineArn",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "TestStateMachine",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ExecutionsTimedOut",
        "Namespace": "AWS/States",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchStatesExecutionThrottledAlarmTestStateMachine": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "StepFunctions ExecutionThrottled Sum for \${TestStateMachine.Name}  breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "StepFunctions_ExecutionThrottledAlarm_\${TestStateMachine.Name}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "StateMachineArn",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "TestStateMachine",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ExecutionThrottled",
        "Namespace": "AWS/States",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchTableReadThrottleEventsAlarmdataTable": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DynamoDB Sum for \${dataTable} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DDB_ReadThrottleEvents_Alarm_\${dataTable}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TableName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "dataTable",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ReadThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchTableSystemErrorsAlarmdataTable": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DynamoDB Sum for \${dataTable} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DDB_SystemErrors_Alarm_\${dataTable}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TableName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "dataTable",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "SystemErrors",
        "Namespace": "AWS/DynamoDB",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchTableUserErrorsAlarmdataTable": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DynamoDB Sum for \${dataTable} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DDB_UserErrors_Alarm_\${dataTable}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TableName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "dataTable",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "UserErrors",
        "Namespace": "AWS/DynamoDB",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchTableWriteThrottleEventsAlarmdataTable": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DynamoDB Sum for \${dataTable} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DDB_WriteThrottleEvents_Alarm_\${dataTable}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TableName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "dataTable",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "WriteThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "OKActions": Array [
          Object {
            "Ref": "MonitoringTopic",
          },
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "stream": Object {
      "Metadata": Object {
        "SamResourceId": "stream",
      },
      "Properties": Object {
        "ShardCount": 1,
      },
      "Type": "AWS::Kinesis::Stream",
    },
    "streamProcessor": Object {
      "Metadata": Object {
        "SamResourceId": "streamProcessor",
      },
      "Properties": Object {
        "Code": Object {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/841a60f2d379216bd90fa34e033d0596",
        },
        "Handler": "basic-handler.hello",
        "Role": Object {
          "Fn::GetAtt": Array [
            "streamProcessorRole",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
        "Tags": Array [
          Object {
            "Key": "lambda:createdBy",
            "Value": "SAM",
          },
        ],
      },
      "Type": "AWS::Lambda::Function",
    },
    "streamProcessorRole": Object {
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": Array [
                "sts:AssumeRole",
              ],
              "Effect": "Allow",
              "Principal": Object {
                "Service": Array [
                  "lambda.amazonaws.com",
                ],
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
          "arn:aws:iam::aws:policy/service-role/AWSLambdaKinesisExecutionRole",
        ],
        "Tags": Array [
          Object {
            "Key": "lambda:createdBy",
            "Value": "SAM",
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "streamProcessorStream": Object {
      "Properties": Object {
        "EventSourceArn": Object {
          "Fn::GetAtt": Array [
            "stream",
            "Arn",
          ],
        },
        "FunctionName": Object {
          "Ref": "streamProcessor",
        },
        "MaximumRetryAttempts": 0,
        "StartingPosition": "LATEST",
      },
      "Type": "AWS::Lambda::EventSourceMapping",
    },
    "subnet": Object {
      "Metadata": Object {
        "SamResourceId": "subnet",
      },
      "Properties": Object {
        "AvailabilityZone": Object {
          "Fn::Select": Array [
            0,
            Object {
              "Fn::GetAZs": Object {
                "Ref": "AWS::Region",
              },
            },
          ],
        },
        "CidrBlock": "10.0.16.0/20",
        "VpcId": Object {
          "Ref": "vpc",
        },
      },
      "Type": "AWS::EC2::Subnet",
    },
    "taskDef": Object {
      "Metadata": Object {
        "SamResourceId": "taskDef",
      },
      "Properties": Object {
        "ContainerDefinitions": Array [
          Object {
            "Command": Array [
              "/bin/sh -c \\"while true; do echo Hello; sleep 10; done\\"",
            ],
            "Cpu": 256,
            "EntryPoint": Array [
              "sh",
              "-c",
            ],
            "Essential": true,
            "Image": "busybox",
            "Memory": 512,
            "Name": "busybox",
          },
        ],
        "Cpu": 256,
        "Memory": 512,
        "NetworkMode": "awsvpc",
        "RequiresCompatibilities": Array [
          "FARGATE",
        ],
      },
      "Type": "AWS::ECS::TaskDefinition",
    },
    "TestStateMachine": Object {
      "Metadata": Object {
        "SamResourceId": "TestStateMachine",
      },
      "Properties": Object {
        "DefinitionS3Location": Object {
          "Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "Key": "sam-test-project/754f906d12f592f99c5651c04a6a0a51",
        },
        "DefinitionSubstitutions": Object {
          "AnotherHelloArn": Object {
            "Fn::GetAtt": Array [
              "hello",
              "Arn",
            ],
          },
          "HelloArn": Object {
            "Fn::GetAtt": Array [
              "hello",
              "Arn",
            ],
          },
        },
        "RoleArn": Object {
          "Fn::GetAtt": Array [
            "TestStateMachineRole",
            "Arn",
          ],
        },
        "Tags": Array [
          Object {
            "Key": "stateMachine:createdBy",
            "Value": "SAM",
          },
        ],
      },
      "Type": "AWS::StepFunctions::StateMachine",
    },
    "TestStateMachineRole": Object {
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": Array [
                "sts:AssumeRole",
              ],
              "Effect": "Allow",
              "Principal": Object {
                "Service": Array [
                  "states.amazonaws.com",
                ],
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [],
        "Policies": Array [
          Object {
            "PolicyDocument": Object {
              "Statement": Array [
                Object {
                  "Action": Array [
                    "lambda:InvokeFunction",
                  ],
                  "Effect": "Allow",
                  "Resource": Object {
                    "Fn::Sub": Array [
                      "arn:\${AWS::Partition}:lambda:\${AWS::Region}:\${AWS::AccountId}:function:\${functionName}*",
                      Object {
                        "functionName": Object {
                          "Ref": "hello",
                        },
                      },
                    ],
                  },
                },
              ],
            },
            "PolicyName": "TestStateMachineRolePolicy0",
          },
          Object {
            "PolicyDocument": Object {
              "Statement": Array [
                Object {
                  "Action": Array [
                    "lambda:InvokeFunction",
                  ],
                  "Effect": "Allow",
                  "Resource": Object {
                    "Fn::Sub": Array [
                      "arn:\${AWS::Partition}:lambda:\${AWS::Region}:\${AWS::AccountId}:function:\${functionName}*",
                      Object {
                        "functionName": Object {
                          "Ref": "hello",
                        },
                      },
                    ],
                  },
                },
              ],
            },
            "PolicyName": "TestStateMachineRolePolicy1",
          },
        ],
        "Tags": Array [
          Object {
            "Key": "stateMachine:createdBy",
            "Value": "SAM",
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "throttler": Object {
      "Metadata": Object {
        "SamResourceId": "throttler",
      },
      "Properties": Object {
        "Code": Object {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/841a60f2d379216bd90fa34e033d0596",
        },
        "Handler": "basic-handler.hello",
        "ReservedConcurrentExecutions": 0,
        "Role": Object {
          "Fn::GetAtt": Array [
            "throttlerRole",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
        "Tags": Array [
          Object {
            "Key": "lambda:createdBy",
            "Value": "SAM",
          },
        ],
      },
      "Type": "AWS::Lambda::Function",
    },
    "throttlerRole": Object {
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": Array [
                "sts:AssumeRole",
              ],
              "Effect": "Allow",
              "Principal": Object {
                "Service": Array [
                  "lambda.amazonaws.com",
                ],
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        ],
        "Tags": Array [
          Object {
            "Key": "lambda:createdBy",
            "Value": "SAM",
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "vpc": Object {
      "Metadata": Object {
        "SamResourceId": "vpc",
      },
      "Properties": Object {
        "CidrBlock": "10.0.0.0/16",
      },
      "Type": "AWS::EC2::VPC",
    },
  },
}
`

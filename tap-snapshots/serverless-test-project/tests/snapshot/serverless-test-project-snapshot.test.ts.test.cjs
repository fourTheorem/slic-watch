/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`serverless-test-project/tests/snapshot/serverless-test-project-snapshot.test.ts > TAP > serverless-test-project snapshot > serverless-test-project template 1`] = `
Object {
  "ApiGatewayDeployment1701242215363": Object {
    "DependsOn": Array [
      "ApiGatewayMethodItemGet",
      "ApiGatewayMethodSubscriptionPost",
    ],
    "Properties": Object {
      "RestApiId": Object {
        "Ref": "ApiGatewayRestApi",
      },
      "StageName": "dev",
    },
    "Type": "AWS::ApiGateway::Deployment",
  },
  "ApiGatewayMethodItemGet": Object {
    "DependsOn": Array [
      "HttpGetterLambdaPermissionApiGateway",
    ],
    "Properties": Object {
      "ApiKeyRequired": false,
      "AuthorizationType": "NONE",
      "HttpMethod": "GET",
      "Integration": Object {
        "IntegrationHttpMethod": "POST",
        "Type": "AWS_PROXY",
        "Uri": Object {
          "Fn::Join": Array [
            "",
            Array [
              "arn:",
              Object {
                "Ref": "AWS::Partition",
              },
              ":apigateway:",
              Object {
                "Ref": "AWS::Region",
              },
              ":lambda:path/2015-03-31/functions/",
              Object {
                "Fn::GetAtt": Array [
                  "HttpGetterLambdaFunction",
                  "Arn",
                ],
              },
              "/invocations",
            ],
          ],
        },
      },
      "MethodResponses": Array [],
      "RequestParameters": Object {},
      "ResourceId": Object {
        "Ref": "ApiGatewayResourceItem",
      },
      "RestApiId": Object {
        "Ref": "ApiGatewayRestApi",
      },
    },
    "Type": "AWS::ApiGateway::Method",
  },
  "ApiGatewayMethodSubscriptionPost": Object {
    "DependsOn": Array [
      "SubscriptionHandlerLambdaPermissionApiGateway",
    ],
    "Properties": Object {
      "ApiKeyRequired": false,
      "AuthorizationType": "NONE",
      "HttpMethod": "POST",
      "Integration": Object {
        "IntegrationHttpMethod": "POST",
        "Type": "AWS_PROXY",
        "Uri": Object {
          "Fn::Join": Array [
            "",
            Array [
              "arn:",
              Object {
                "Ref": "AWS::Partition",
              },
              ":apigateway:",
              Object {
                "Ref": "AWS::Region",
              },
              ":lambda:path/2015-03-31/functions/",
              Object {
                "Fn::GetAtt": Array [
                  "SubscriptionHandlerLambdaFunction",
                  "Arn",
                ],
              },
              "/invocations",
            ],
          ],
        },
      },
      "MethodResponses": Array [],
      "RequestParameters": Object {},
      "ResourceId": Object {
        "Ref": "ApiGatewayResourceSubscription",
      },
      "RestApiId": Object {
        "Ref": "ApiGatewayRestApi",
      },
    },
    "Type": "AWS::ApiGateway::Method",
  },
  "ApiGatewayResourceItem": Object {
    "Properties": Object {
      "ParentId": Object {
        "Fn::GetAtt": Array [
          "ApiGatewayRestApi",
          "RootResourceId",
        ],
      },
      "PathPart": "item",
      "RestApiId": Object {
        "Ref": "ApiGatewayRestApi",
      },
    },
    "Type": "AWS::ApiGateway::Resource",
  },
  "ApiGatewayResourceSubscription": Object {
    "Properties": Object {
      "ParentId": Object {
        "Fn::GetAtt": Array [
          "ApiGatewayRestApi",
          "RootResourceId",
        ],
      },
      "PathPart": "subscription",
      "RestApiId": Object {
        "Ref": "ApiGatewayRestApi",
      },
    },
    "Type": "AWS::ApiGateway::Resource",
  },
  "ApiGatewayRestApi": Object {
    "Properties": Object {
      "EndpointConfiguration": Object {
        "Types": Array [
          "REGIONAL",
        ],
      },
      "Name": "dev-serverless-test-project",
      "Policy": "",
    },
    "Type": "AWS::ApiGateway::RestApi",
  },
  "bucket": Object {
    "Properties": Object {
      "BucketName": Object {
        "Fn::Sub": "slic-watch-test-project-bucket-\${AWS::AccountId}-\${AWS::Region}",
      },
    },
    "Type": "AWS::S3::Bucket",
  },
  "dataTable": Object {
    "DeletionPolicy": "Delete",
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
      "TableName": "MyTable",
    },
    "Type": "AWS::DynamoDB::Table",
  },
  "DriveQueueLambdaFunction": Object {
    "DependsOn": Array [
      "DriveQueueLogGroup",
    ],
    "Metadata": Object {
      "slicWatch": Object {},
    },
    "Properties": Object {
      "Code": Object {
        "S3Bucket": Object {
          "Ref": "ServerlessDeploymentBucket",
        },
        "S3Key": "serverless/serverless-test-project/dev/1701242216679-2023-11-29T07:16:56.679Z/serverless-test-project.zip",
      },
      "FunctionName": "serverless-test-project-dev-driveQueue",
      "Handler": "queue-test-handler.handleDrive",
      "MemorySize": 1024,
      "Role": Object {
        "Fn::GetAtt": Array [
          "IamRoleLambdaExecution",
          "Arn",
        ],
      },
      "Runtime": "nodejs18.x",
      "Timeout": 6,
    },
    "Type": "AWS::Lambda::Function",
  },
  "DriveQueueLambdaVersionTmzx8HCxfunJ3etrLOOYLg8zG05MzRauykeVpZFz8WY": Object {
    "DeletionPolicy": "Retain",
    "Properties": Object {
      "CodeSha256": "8+6CAXAhHnCOtQPN1A6d4fRjjFV13css2+2nirSNse0=",
      "FunctionName": Object {
        "Ref": "DriveQueueLambdaFunction",
      },
    },
    "Type": "AWS::Lambda::Version",
  },
  "DriveQueueLogGroup": Object {
    "Properties": Object {
      "LogGroupName": "/aws/lambda/serverless-test-project-dev-driveQueue",
    },
    "Type": "AWS::Logs::LogGroup",
  },
  "DriveStreamLambdaFunction": Object {
    "DependsOn": Array [
      "DriveStreamLogGroup",
    ],
    "Metadata": Object {
      "slicWatch": Object {},
    },
    "Properties": Object {
      "Code": Object {
        "S3Bucket": Object {
          "Ref": "ServerlessDeploymentBucket",
        },
        "S3Key": "serverless/serverless-test-project/dev/1701242216679-2023-11-29T07:16:56.679Z/serverless-test-project.zip",
      },
      "Environment": Object {
        "Variables": Object {
          "STREAM_NAME": Object {
            "Ref": "stream",
          },
        },
      },
      "FunctionName": "serverless-test-project-dev-driveStream",
      "Handler": "stream-test-handler.handleDrive",
      "MemorySize": 1024,
      "Role": Object {
        "Fn::GetAtt": Array [
          "IamRoleLambdaExecution",
          "Arn",
        ],
      },
      "Runtime": "nodejs18.x",
      "Timeout": 6,
    },
    "Type": "AWS::Lambda::Function",
  },
  "DriveStreamLambdaVersionsWkqlV7IV7mJdqIqQToVljMizTzZoDCso7qMazjI": Object {
    "DeletionPolicy": "Retain",
    "Properties": Object {
      "CodeSha256": "8+6CAXAhHnCOtQPN1A6d4fRjjFV13css2+2nirSNse0=",
      "FunctionName": Object {
        "Ref": "DriveStreamLambdaFunction",
      },
    },
    "Type": "AWS::Lambda::Version",
  },
  "DriveStreamLogGroup": Object {
    "Properties": Object {
      "LogGroupName": "/aws/lambda/serverless-test-project-dev-driveStream",
    },
    "Type": "AWS::Logs::LogGroup",
  },
  "DriveTableLambdaFunction": Object {
    "DependsOn": Array [
      "DriveTableLogGroup",
    ],
    "Metadata": Object {
      "slicWatch": Object {},
    },
    "Properties": Object {
      "Code": Object {
        "S3Bucket": Object {
          "Ref": "ServerlessDeploymentBucket",
        },
        "S3Key": "serverless/serverless-test-project/dev/1701242216679-2023-11-29T07:16:56.679Z/serverless-test-project.zip",
      },
      "FunctionName": "serverless-test-project-dev-driveTable",
      "Handler": "table-test-hander.handleDrive",
      "MemorySize": 1024,
      "Role": Object {
        "Fn::GetAtt": Array [
          "IamRoleLambdaExecution",
          "Arn",
        ],
      },
      "Runtime": "nodejs18.x",
      "Timeout": 6,
    },
    "Type": "AWS::Lambda::Function",
  },
  "DriveTableLambdaVersionkqI0DCnUasgza04mnCpqj0q5vePTOojYtyi4hxfE3ME": Object {
    "DeletionPolicy": "Retain",
    "Properties": Object {
      "CodeSha256": "8+6CAXAhHnCOtQPN1A6d4fRjjFV13css2+2nirSNse0=",
      "FunctionName": Object {
        "Ref": "DriveTableLambdaFunction",
      },
    },
    "Type": "AWS::Lambda::Version",
  },
  "DriveTableLogGroup": Object {
    "Properties": Object {
      "LogGroupName": "/aws/lambda/serverless-test-project-dev-driveTable",
    },
    "Type": "AWS::Logs::LogGroup",
  },
  "ecsCluster": Object {
    "Properties": Object {
      "ClusterName": "awesome-cluster",
    },
    "Type": "AWS::ECS::Cluster",
  },
  "ecsService": Object {
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
      "ServiceName": "awesome-service",
      "TaskDefinition": Object {
        "Ref": "taskDef",
      },
    },
    "Type": "AWS::ECS::Service",
  },
  "EventsRuleEventBridgeLambdaPermission1": Object {
    "Properties": Object {
      "Action": "lambda:InvokeFunction",
      "FunctionName": Object {
        "Fn::GetAtt": Array [
          "EventsRuleLambdaFunction",
          "Arn",
        ],
      },
      "Principal": "events.amazonaws.com",
      "SourceArn": Object {
        "Fn::Join": Array [
          ":",
          Array [
            "arn",
            Object {
              "Ref": "AWS::Partition",
            },
            "events",
            Object {
              "Ref": "AWS::Region",
            },
            Object {
              "Ref": "AWS::AccountId",
            },
            Object {
              "Fn::Join": Array [
                "/",
                Array [
                  "rule",
                  "serverless-test-project-dev-eventsRule-rule-1",
                ],
              ],
            },
          ],
        ],
      },
    },
    "Type": "AWS::Lambda::Permission",
  },
  "EventsRuleLambdaFunction": Object {
    "DependsOn": Array [
      "EventsRuleLogGroup",
    ],
    "Metadata": Object {
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
        "S3Bucket": Object {
          "Ref": "ServerlessDeploymentBucket",
        },
        "S3Key": "serverless/serverless-test-project/dev/1701242216679-2023-11-29T07:16:56.679Z/serverless-test-project.zip",
      },
      "FunctionName": "serverless-test-project-dev-eventsRule",
      "Handler": "rule-handler.handleRule",
      "MemorySize": 1024,
      "Role": Object {
        "Fn::GetAtt": Array [
          "IamRoleLambdaExecution",
          "Arn",
        ],
      },
      "Runtime": "nodejs18.x",
      "Timeout": 6,
    },
    "Type": "AWS::Lambda::Function",
  },
  "EventsRuleLambdaVersionxBuN447jfeozyKD2CEV3oCIHhShTUOVe5XKOkBlbchQ": Object {
    "DeletionPolicy": "Retain",
    "Properties": Object {
      "CodeSha256": "8+6CAXAhHnCOtQPN1A6d4fRjjFV13css2+2nirSNse0=",
      "FunctionName": Object {
        "Ref": "EventsRuleLambdaFunction",
      },
    },
    "Type": "AWS::Lambda::Version",
  },
  "EventsRuleLogGroup": Object {
    "Properties": Object {
      "LogGroupName": "/aws/lambda/serverless-test-project-dev-eventsRule",
    },
    "Type": "AWS::Logs::LogGroup",
  },
  "ExpressWorkflow": Object {
    "DependsOn": Array [
      "ExpressWorkflowRole",
    ],
    "Properties": Object {
      "DefinitionString": Object {
        "Fn::Sub": Array [
          String(
            {
              "StartAt": "What Next?",
              "States": {
                "What Next?": {
                  "Type": "Choice",
                  "Choices": [
                    {
                      "Variable": "$.destination",
                      "StringEquals": "fail",
                      "Next": "Fail"
                    },
                    {
                      "Variable": "$.destination",
                      "StringEquals": "timeoutTask",
                      "Next": "TimeoutTask"
                    },
                    {
                      "Variable": "$.destination",
                      "StringEquals": "keepWaiting",
                      "Next": "KeepWaiting"
                    }
                  ],
                  "Default": "Succeed"
                },
                "TimeoutTask": {
                  "Type": "Task",
                  "TimeoutSeconds": 1,
                  "Resource": "\${085edd942ce144c5bd80364a6e973e4d}",
                  "Parameters": {
                    "sleepSeconds": 3
                  },
                  "Next": "Succeed"
                },
                "KeepWaiting": {
                  "Type": "Wait",
                  "Seconds": 1,
                  "Next": "KeepWaiting"
                },
                "Fail": {
                  "Type": "Fail"
                },
                "Succeed": {
                  "Type": "Pass",
                  "End": true
                }
              }
            }
          ),
          Object {
            "085edd942ce144c5bd80364a6e973e4d": Object {
              "Fn::GetAtt": Array [
                "PingLambdaFunction",
                "Arn",
              ],
            },
          },
        ],
      },
      "LoggingConfiguration": Object {
        "Destinations": Array [
          Object {
            "CloudWatchLogsLogGroup": Object {
              "LogGroupArn": Object {
                "Fn::GetAtt": Array [
                  "expressWorkflowLogGroup",
                  "Arn",
                ],
              },
            },
          },
        ],
        "IncludeExecutionData": true,
        "Level": "ALL",
      },
      "RoleArn": Object {
        "Fn::GetAtt": Array [
          "ExpressWorkflowRole",
          "Arn",
        ],
      },
      "StateMachineName": "ExpressWorkflow",
      "StateMachineType": "EXPRESS",
    },
    "Type": "AWS::StepFunctions::StateMachine",
  },
  "expressWorkflowLogGroup": Object {
    "Properties": Object {
      "LogGroupName": "ExpressWorkflowLogs",
      "RetentionInDays": 1,
    },
    "Type": "AWS::Logs::LogGroup",
  },
  "ExpressWorkflowRole": Object {
    "Properties": Object {
      "AssumeRolePolicyDocument": Object {
        "Statement": Array [
          Object {
            "Action": "sts:AssumeRole",
            "Effect": "Allow",
            "Principal": Object {
              "Service": Object {
                "Fn::Sub": "states.\${AWS::Region}.amazonaws.com",
              },
            },
          },
        ],
        "Version": "2012-10-17",
      },
      "Policies": Array [
        Object {
          "PolicyDocument": Object {
            "Statement": Array [
              Object {
                "Action": Array [
                  "lambda:InvokeFunction",
                ],
                "Effect": "Allow",
                "Resource": Array [
                  Object {
                    "Fn::GetAtt": Array [
                      "PingLambdaFunction",
                      "Arn",
                    ],
                  },
                  Object {
                    "Fn::Sub": Array [
                      "\${functionArn}:*",
                      Object {
                        "functionArn": Object {
                          "Fn::GetAtt": Array [
                            "PingLambdaFunction",
                            "Arn",
                          ],
                        },
                      },
                    ],
                  },
                ],
              },
              Object {
                "Action": Array [
                  "logs:CreateLogDelivery",
                  "logs:GetLogDelivery",
                  "logs:UpdateLogDelivery",
                  "logs:DeleteLogDelivery",
                  "logs:ListLogDeliveries",
                  "logs:PutResourcePolicy",
                  "logs:DescribeResourcePolicies",
                  "logs:DescribeLogGroups",
                ],
                "Effect": "Allow",
                "Resource": "*",
              },
            ],
            "Version": "2012-10-17",
          },
          "PolicyName": "dev-serverless-test-project-statemachine",
        },
      ],
    },
    "Type": "AWS::IAM::Role",
  },
  "fifoQueue": Object {
    "Properties": Object {
      "FifoQueue": true,
      "QueueName": "SomeFifoQueue.fifo",
    },
    "Type": "AWS::SQS::Queue",
  },
  "HelloLambdaFunction": Object {
    "DependsOn": Array [
      "HelloLogGroup",
    ],
    "Metadata": Object {
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
        "S3Bucket": Object {
          "Ref": "ServerlessDeploymentBucket",
        },
        "S3Key": "serverless/serverless-test-project/dev/1701242216679-2023-11-29T07:16:56.679Z/serverless-test-project.zip",
      },
      "FunctionName": "serverless-test-project-dev-hello",
      "Handler": "basic-handler.hello",
      "MemorySize": 1024,
      "Role": Object {
        "Fn::GetAtt": Array [
          "IamRoleLambdaExecution",
          "Arn",
        ],
      },
      "Runtime": "nodejs18.x",
      "Timeout": 6,
    },
    "Type": "AWS::Lambda::Function",
  },
  "HelloLambdaVersioncvZrQjYr4FdYsM3CaTj5TKuOJmUjyL07tfIDVXBSw4": Object {
    "DeletionPolicy": "Retain",
    "Properties": Object {
      "CodeSha256": "8+6CAXAhHnCOtQPN1A6d4fRjjFV13css2+2nirSNse0=",
      "FunctionName": Object {
        "Ref": "HelloLambdaFunction",
      },
    },
    "Type": "AWS::Lambda::Version",
  },
  "HelloLogGroup": Object {
    "Properties": Object {
      "LogGroupName": "/aws/lambda/serverless-test-project-dev-hello",
    },
    "Type": "AWS::Logs::LogGroup",
  },
  "HttpGetterLambdaFunction": Object {
    "DependsOn": Array [
      "HttpGetterLogGroup",
    ],
    "Metadata": Object {
      "slicWatch": Object {},
    },
    "Properties": Object {
      "Code": Object {
        "S3Bucket": Object {
          "Ref": "ServerlessDeploymentBucket",
        },
        "S3Key": "serverless/serverless-test-project/dev/1701242216679-2023-11-29T07:16:56.679Z/serverless-test-project.zip",
      },
      "FunctionName": "serverless-test-project-dev-httpGetter",
      "Handler": "apigw-handler.handleGet",
      "MemorySize": 1024,
      "Role": Object {
        "Fn::GetAtt": Array [
          "IamRoleLambdaExecution",
          "Arn",
        ],
      },
      "Runtime": "nodejs18.x",
      "Timeout": 30,
    },
    "Type": "AWS::Lambda::Function",
  },
  "HttpGetterLambdaPermissionApiGateway": Object {
    "Properties": Object {
      "Action": "lambda:InvokeFunction",
      "FunctionName": Object {
        "Fn::GetAtt": Array [
          "HttpGetterLambdaFunction",
          "Arn",
        ],
      },
      "Principal": "apigateway.amazonaws.com",
      "SourceArn": Object {
        "Fn::Join": Array [
          "",
          Array [
            "arn:",
            Object {
              "Ref": "AWS::Partition",
            },
            ":execute-api:",
            Object {
              "Ref": "AWS::Region",
            },
            ":",
            Object {
              "Ref": "AWS::AccountId",
            },
            ":",
            Object {
              "Ref": "ApiGatewayRestApi",
            },
            "/*/*",
          ],
        ],
      },
    },
    "Type": "AWS::Lambda::Permission",
  },
  "HttpGetterLambdaVersionvK2ALwc1DFqBccIyulxoBU3GveALO98nQc2xP94J8": Object {
    "DeletionPolicy": "Retain",
    "Properties": Object {
      "CodeSha256": "8+6CAXAhHnCOtQPN1A6d4fRjjFV13css2+2nirSNse0=",
      "FunctionName": Object {
        "Ref": "HttpGetterLambdaFunction",
      },
    },
    "Type": "AWS::Lambda::Version",
  },
  "HttpGetterLogGroup": Object {
    "Properties": Object {
      "LogGroupName": "/aws/lambda/serverless-test-project-dev-httpGetter",
    },
    "Type": "AWS::Logs::LogGroup",
  },
  "IamRoleLambdaExecution": Object {
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
      "Path": "/",
      "Policies": Array [
        Object {
          "PolicyDocument": Object {
            "Statement": Array [
              Object {
                "Action": Array [
                  "logs:CreateLogStream",
                  "logs:CreateLogGroup",
                  "logs:TagResource",
                ],
                "Effect": "Allow",
                "Resource": Array [
                  Object {
                    "Fn::Sub": "arn:\${AWS::Partition}:logs:\${AWS::Region}:\${AWS::AccountId}:log-group:/aws/lambda/serverless-test-project-dev*:*",
                  },
                ],
              },
              Object {
                "Action": Array [
                  "logs:PutLogEvents",
                ],
                "Effect": "Allow",
                "Resource": Array [
                  Object {
                    "Fn::Sub": "arn:\${AWS::Partition}:logs:\${AWS::Region}:\${AWS::AccountId}:log-group:/aws/lambda/serverless-test-project-dev*:*:*",
                  },
                ],
              },
              Object {
                "Action": Array [
                  "kinesis:GetRecords",
                  "kinesis:GetShardIterator",
                  "kinesis:DescribeStream",
                  "kinesis:ListStreams",
                ],
                "Effect": "Allow",
                "Resource": Array [
                  Object {
                    "Fn::GetAtt": Array [
                      "stream",
                      "Arn",
                    ],
                  },
                ],
              },
            ],
            "Version": "2012-10-17",
          },
          "PolicyName": Object {
            "Fn::Join": Array [
              "-",
              Array [
                "serverless-test-project",
                "dev",
                "lambda",
              ],
            ],
          },
        },
      ],
      "RoleName": Object {
        "Fn::Join": Array [
          "-",
          Array [
            "serverless-test-project",
            "dev",
            Object {
              "Ref": "AWS::Region",
            },
            "lambdaRole",
          ],
        ],
      },
    },
    "Type": "AWS::IAM::Role",
  },
  "PingLambdaFunction": Object {
    "DependsOn": Array [
      "PingLogGroup",
    ],
    "Metadata": Object {
      "slicWatch": Object {
        "dashboard": Object {
          "enabled": false,
        },
      },
    },
    "Properties": Object {
      "Code": Object {
        "S3Bucket": Object {
          "Ref": "ServerlessDeploymentBucket",
        },
        "S3Key": "serverless/serverless-test-project/dev/1701242216679-2023-11-29T07:16:56.679Z/serverless-test-project.zip",
      },
      "FunctionName": "serverless-test-project-dev-ping",
      "Handler": "basic-handler.hello",
      "MemorySize": 1024,
      "Role": Object {
        "Fn::GetAtt": Array [
          "IamRoleLambdaExecution",
          "Arn",
        ],
      },
      "Runtime": "nodejs18.x",
      "Timeout": 6,
    },
    "Type": "AWS::Lambda::Function",
  },
  "PingLambdaVersionSQcuddhSFqI0xKYCyuQTTJMvwrlKCB77CNQ16xyQ": Object {
    "DeletionPolicy": "Retain",
    "Properties": Object {
      "CodeSha256": "8+6CAXAhHnCOtQPN1A6d4fRjjFV13css2+2nirSNse0=",
      "FunctionName": Object {
        "Ref": "PingLambdaFunction",
      },
    },
    "Type": "AWS::Lambda::Version",
  },
  "PingLogGroup": Object {
    "Properties": Object {
      "LogGroupName": "/aws/lambda/serverless-test-project-dev-ping",
    },
    "Type": "AWS::Logs::LogGroup",
  },
  "regularQueue": Object {
    "Properties": Object {
      "QueueName": "SomeRegularQueue",
    },
    "Type": "AWS::SQS::Queue",
  },
  "ServerlessDeploymentBucket": Object {
    "Properties": Object {
      "BucketEncryption": Object {
        "ServerSideEncryptionConfiguration": Array [
          Object {
            "ServerSideEncryptionByDefault": Object {
              "SSEAlgorithm": "AES256",
            },
          },
        ],
      },
    },
    "Type": "AWS::S3::Bucket",
  },
  "ServerlessDeploymentBucketPolicy": Object {
    "Properties": Object {
      "Bucket": Object {
        "Ref": "ServerlessDeploymentBucket",
      },
      "PolicyDocument": Object {
        "Statement": Array [
          Object {
            "Action": "s3:*",
            "Condition": Object {
              "Bool": Object {
                "aws:SecureTransport": false,
              },
            },
            "Effect": "Deny",
            "Principal": "*",
            "Resource": Array [
              Object {
                "Fn::Join": Array [
                  "",
                  Array [
                    "arn:",
                    Object {
                      "Ref": "AWS::Partition",
                    },
                    ":s3:::",
                    Object {
                      "Ref": "ServerlessDeploymentBucket",
                    },
                    "/*",
                  ],
                ],
              },
              Object {
                "Fn::Join": Array [
                  "",
                  Array [
                    "arn:",
                    Object {
                      "Ref": "AWS::Partition",
                    },
                    ":s3:::",
                    Object {
                      "Ref": "ServerlessDeploymentBucket",
                    },
                  ],
                ],
              },
            ],
          },
        ],
      },
    },
    "Type": "AWS::S3::BucketPolicy",
  },
  "ServerlesstestprojectdeveventsRulerule1EventBridgeRule": Object {
    "Properties": Object {
      "EventPattern": Object {
        "detail-type": Array [
          "Invoke Lambda Function",
        ],
      },
      "Name": "serverless-test-project-dev-eventsRule-rule-1",
      "State": "ENABLED",
      "Targets": Array [
        Object {
          "Arn": Object {
            "Fn::GetAtt": Array [
              "EventsRuleLambdaFunction",
              "Arn",
            ],
          },
          "Id": "serverless-test-project-dev-eventsRule-rule-1-target",
          "RetryPolicy": Object {
            "MaximumEventAgeInSeconds": 60,
            "MaximumRetryAttempts": 2,
          },
        },
      ],
    },
    "Type": "AWS::Events::Rule",
  },
  "stream": Object {
    "Properties": Object {
      "Name": Object {
        "Fn::Sub": "slic-watch-test-project-stream-\${AWS::AccountId}-\${AWS::Region}",
      },
      "ShardCount": 1,
    },
    "Type": "AWS::Kinesis::Stream",
  },
  "StreamProcessorEventSourceMappingKinesisStream": Object {
    "DependsOn": Array [
      "IamRoleLambdaExecution",
    ],
    "Properties": Object {
      "BatchSize": 10,
      "Enabled": true,
      "EventSourceArn": Object {
        "Fn::GetAtt": Array [
          "stream",
          "Arn",
        ],
      },
      "FunctionName": Object {
        "Fn::GetAtt": Array [
          "StreamProcessorLambdaFunction",
          "Arn",
        ],
      },
      "MaximumRetryAttempts": 0,
      "StartingPosition": "LATEST",
    },
    "Type": "AWS::Lambda::EventSourceMapping",
  },
  "StreamProcessorLambdaFunction": Object {
    "DependsOn": Array [
      "StreamProcessorLogGroup",
    ],
    "Metadata": Object {
      "slicWatch": Object {},
    },
    "Properties": Object {
      "Code": Object {
        "S3Bucket": Object {
          "Ref": "ServerlessDeploymentBucket",
        },
        "S3Key": "serverless/serverless-test-project/dev/1701242216679-2023-11-29T07:16:56.679Z/serverless-test-project.zip",
      },
      "FunctionName": "serverless-test-project-dev-streamProcessor",
      "Handler": "stream-handler.handle",
      "MemorySize": 1024,
      "Role": Object {
        "Fn::GetAtt": Array [
          "IamRoleLambdaExecution",
          "Arn",
        ],
      },
      "Runtime": "nodejs18.x",
      "Timeout": 6,
    },
    "Type": "AWS::Lambda::Function",
  },
  "StreamProcessorLambdaVersion24Kwch4oq5ogXKcIDJuLGB1qAJWt8aqgW43aCjKI": Object {
    "DeletionPolicy": "Retain",
    "Properties": Object {
      "CodeSha256": "8+6CAXAhHnCOtQPN1A6d4fRjjFV13css2+2nirSNse0=",
      "FunctionName": Object {
        "Ref": "StreamProcessorLambdaFunction",
      },
    },
    "Type": "AWS::Lambda::Version",
  },
  "StreamProcessorLogGroup": Object {
    "Properties": Object {
      "LogGroupName": "/aws/lambda/serverless-test-project-dev-streamProcessor",
    },
    "Type": "AWS::Logs::LogGroup",
  },
  "subnet": Object {
    "Properties": Object {
      "AvailabilityZone": "eu-west-1a",
      "CidrBlock": "10.0.16.0/20",
      "VpcId": Object {
        "Ref": "vpc",
      },
    },
    "Type": "AWS::EC2::Subnet",
  },
  "SubscriptionHandlerLambdaFunction": Object {
    "DependsOn": Array [
      "SubscriptionHandlerLogGroup",
    ],
    "Metadata": Object {
      "slicWatch": Object {},
    },
    "Properties": Object {
      "Code": Object {
        "S3Bucket": Object {
          "Ref": "ServerlessDeploymentBucket",
        },
        "S3Key": "serverless/serverless-test-project/dev/1701242216679-2023-11-29T07:16:56.679Z/serverless-test-project.zip",
      },
      "FunctionName": "serverless-test-project-dev-subscriptionHandler",
      "Handler": "apigw-handler.handleSubscription",
      "MemorySize": 1024,
      "Role": Object {
        "Fn::GetAtt": Array [
          "IamRoleLambdaExecution",
          "Arn",
        ],
      },
      "Runtime": "nodejs18.x",
      "Timeout": 30,
    },
    "Type": "AWS::Lambda::Function",
  },
  "SubscriptionHandlerLambdaPermissionApiGateway": Object {
    "Properties": Object {
      "Action": "lambda:InvokeFunction",
      "FunctionName": Object {
        "Fn::GetAtt": Array [
          "SubscriptionHandlerLambdaFunction",
          "Arn",
        ],
      },
      "Principal": "apigateway.amazonaws.com",
      "SourceArn": Object {
        "Fn::Join": Array [
          "",
          Array [
            "arn:",
            Object {
              "Ref": "AWS::Partition",
            },
            ":execute-api:",
            Object {
              "Ref": "AWS::Region",
            },
            ":",
            Object {
              "Ref": "AWS::AccountId",
            },
            ":",
            Object {
              "Ref": "ApiGatewayRestApi",
            },
            "/*/*",
          ],
        ],
      },
    },
    "Type": "AWS::Lambda::Permission",
  },
  "SubscriptionHandlerLambdaVersion4kKEYaIgWsMN0XYzRQn4VAailfQcZ23kdSSOKepfB4A": Object {
    "DeletionPolicy": "Retain",
    "Properties": Object {
      "CodeSha256": "8+6CAXAhHnCOtQPN1A6d4fRjjFV13css2+2nirSNse0=",
      "FunctionName": Object {
        "Ref": "SubscriptionHandlerLambdaFunction",
      },
    },
    "Type": "AWS::Lambda::Version",
  },
  "SubscriptionHandlerLogGroup": Object {
    "Properties": Object {
      "LogGroupName": "/aws/lambda/serverless-test-project-dev-subscriptionHandler",
    },
    "Type": "AWS::Logs::LogGroup",
  },
  "subscriptionTest": Object {
    "Properties": Object {
      "Endpoint": Object {
        "Fn::Sub": "https://\${ApiGatewayRestApi}.execute-api.\${AWS::Region}.amazonaws.com/dev/subscription",
      },
      "Protocol": "https",
      "TopicArn": Object {
        "Ref": "topic",
      },
    },
    "Type": "AWS::SNS::Subscription",
  },
  "taskDef": Object {
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
  "ThrottlerLambdaFunction": Object {
    "DependsOn": Array [
      "ThrottlerLogGroup",
    ],
    "Metadata": Object {
      "slicWatch": Object {},
    },
    "Properties": Object {
      "Code": Object {
        "S3Bucket": Object {
          "Ref": "ServerlessDeploymentBucket",
        },
        "S3Key": "serverless/serverless-test-project/dev/1701242216679-2023-11-29T07:16:56.679Z/serverless-test-project.zip",
      },
      "FunctionName": "serverless-test-project-dev-throttler",
      "Handler": "basic-handler.hello",
      "MemorySize": 1024,
      "ReservedConcurrentExecutions": 0,
      "Role": Object {
        "Fn::GetAtt": Array [
          "IamRoleLambdaExecution",
          "Arn",
        ],
      },
      "Runtime": "nodejs18.x",
      "Timeout": 6,
    },
    "Type": "AWS::Lambda::Function",
  },
  "ThrottlerLambdaVersion0UeWLgxZYywcyV3gGiutpyCQJEbO6Gk8zSSOP7dMEps": Object {
    "DeletionPolicy": "Retain",
    "Properties": Object {
      "CodeSha256": "8+6CAXAhHnCOtQPN1A6d4fRjjFV13css2+2nirSNse0=",
      "FunctionName": Object {
        "Ref": "ThrottlerLambdaFunction",
      },
    },
    "Type": "AWS::Lambda::Version",
  },
  "ThrottlerLogGroup": Object {
    "Properties": Object {
      "LogGroupName": "/aws/lambda/serverless-test-project-dev-throttler",
    },
    "Type": "AWS::Logs::LogGroup",
  },
  "topic": Object {
    "Properties": Object {
      "TopicName": Object {
        "Fn::Sub": "slic-watch-test-project-topic-\${AWS::AccountId}-\${AWS::Region}",
      },
    },
    "Type": "AWS::SNS::Topic",
  },
  "vpc": Object {
    "Properties": Object {
      "CidrBlock": "10.0.0.0/16",
    },
    "Type": "AWS::EC2::VPC",
  },
  "Workflow": Object {
    "DependsOn": Array [
      "WorkflowRole",
    ],
    "Properties": Object {
      "DefinitionString": Object {
        "Fn::Sub": Array [
          String(
            {
              "StartAt": "What Next?",
              "States": {
                "What Next?": {
                  "Type": "Choice",
                  "Choices": [
                    {
                      "Variable": "$.destination",
                      "StringEquals": "fail",
                      "Next": "Fail"
                    },
                    {
                      "Variable": "$.destination",
                      "StringEquals": "timeoutTask",
                      "Next": "TimeoutTask"
                    },
                    {
                      "Variable": "$.destination",
                      "StringEquals": "keepWaiting",
                      "Next": "KeepWaiting"
                    }
                  ],
                  "Default": "Succeed"
                },
                "TimeoutTask": {
                  "Type": "Task",
                  "TimeoutSeconds": 1,
                  "Resource": "\${085edd942ce144c5bd80364a6e973e4d}",
                  "Parameters": {
                    "sleepSeconds": 3
                  },
                  "Next": "Succeed"
                },
                "KeepWaiting": {
                  "Type": "Wait",
                  "Seconds": 1,
                  "Next": "KeepWaiting"
                },
                "Fail": {
                  "Type": "Fail"
                },
                "Succeed": {
                  "Type": "Pass",
                  "End": true
                }
              }
            }
          ),
          Object {
            "085edd942ce144c5bd80364a6e973e4d": Object {
              "Fn::GetAtt": Array [
                "PingLambdaFunction",
                "Arn",
              ],
            },
          },
        ],
      },
      "LoggingConfiguration": Object {
        "Destinations": Array [
          Object {
            "CloudWatchLogsLogGroup": Object {
              "LogGroupArn": Object {
                "Fn::GetAtt": Array [
                  "workflowLogGroup",
                  "Arn",
                ],
              },
            },
          },
        ],
        "IncludeExecutionData": true,
        "Level": "ALL",
      },
      "RoleArn": Object {
        "Fn::GetAtt": Array [
          "WorkflowRole",
          "Arn",
        ],
      },
      "StateMachineName": "Workflow",
    },
    "Type": "AWS::StepFunctions::StateMachine",
  },
  "workflowLogGroup": Object {
    "Properties": Object {
      "LogGroupName": "WorkflowLogs",
      "RetentionInDays": 1,
    },
    "Type": "AWS::Logs::LogGroup",
  },
  "WorkflowRole": Object {
    "Properties": Object {
      "AssumeRolePolicyDocument": Object {
        "Statement": Array [
          Object {
            "Action": "sts:AssumeRole",
            "Effect": "Allow",
            "Principal": Object {
              "Service": Object {
                "Fn::Sub": "states.\${AWS::Region}.amazonaws.com",
              },
            },
          },
        ],
        "Version": "2012-10-17",
      },
      "Policies": Array [
        Object {
          "PolicyDocument": Object {
            "Statement": Array [
              Object {
                "Action": Array [
                  "lambda:InvokeFunction",
                ],
                "Effect": "Allow",
                "Resource": Array [
                  Object {
                    "Fn::GetAtt": Array [
                      "PingLambdaFunction",
                      "Arn",
                    ],
                  },
                  Object {
                    "Fn::Sub": Array [
                      "\${functionArn}:*",
                      Object {
                        "functionArn": Object {
                          "Fn::GetAtt": Array [
                            "PingLambdaFunction",
                            "Arn",
                          ],
                        },
                      },
                    ],
                  },
                ],
              },
              Object {
                "Action": Array [
                  "logs:CreateLogDelivery",
                  "logs:GetLogDelivery",
                  "logs:UpdateLogDelivery",
                  "logs:DeleteLogDelivery",
                  "logs:ListLogDeliveries",
                  "logs:PutResourcePolicy",
                  "logs:DescribeResourcePolicies",
                  "logs:DescribeLogGroups",
                ],
                "Effect": "Allow",
                "Resource": "*",
              },
            ],
            "Version": "2012-10-17",
          },
          "PolicyName": "dev-serverless-test-project-statemachine",
        },
      ],
    },
    "Type": "AWS::IAM::Role",
  },
}
`

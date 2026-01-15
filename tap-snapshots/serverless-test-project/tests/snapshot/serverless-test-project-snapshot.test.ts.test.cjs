/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`serverless-test-project/tests/snapshot/serverless-test-project-snapshot.test.ts > TAP > the plugin adds SLIC Watch dashboards and alarms to a serverless-generated CloudFormation template > serverless-test-project template 1`] = `
{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "The AWS CloudFormation template for this Serverless application",
  "Outputs": {
    "DriveQueueLambdaFunctionQualifiedArn": {
      "Description": "Current Lambda function version",
      "Export": {
        "Name": "sls-serverless-test-project-dev-DriveQueueLambdaFunctionQualifiedArn"
      },
      "Value": {
        "Ref": "DriveQueueLambdaVersionO9yL7x2X7on8V1vfBzVj8OmtJsaRIkID1qjEuFRNI"
      }
    },
    "DriveStreamLambdaFunctionQualifiedArn": {
      "Description": "Current Lambda function version",
      "Export": {
        "Name": "sls-serverless-test-project-dev-DriveStreamLambdaFunctionQualifiedArn"
      },
      "Value": {
        "Ref": "DriveStreamLambdaVersionP4u4hk59XD9172r9elN9B3yQAKgOqsVMcEqn33HWk"
      }
    },
    "DriveTableLambdaFunctionQualifiedArn": {
      "Description": "Current Lambda function version",
      "Export": {
        "Name": "sls-serverless-test-project-dev-DriveTableLambdaFunctionQualifiedArn"
      },
      "Value": {
        "Ref": "DriveTableLambdaVersionCeL14112extLbZpU9IBiLCw0gjivyaXaSf664bPnc"
      }
    },
    "EventsRuleLambdaFunctionQualifiedArn": {
      "Description": "Current Lambda function version",
      "Export": {
        "Name": "sls-serverless-test-project-dev-EventsRuleLambdaFunctionQualifiedArn"
      },
      "Value": {
        "Ref": "EventsRuleLambdaVersioneJD8sIr8CoIFP1PPQEJI0gOwr9VlQOhSPmtxEJmpcA"
      }
    },
    "ExpressWorkflowArn": {
      "Description": "Current StateMachine Arn",
      "Export": {
        "Name": "sls-serverless-test-project-dev-ExpressWorkflowArn"
      },
      "Value": {
        "Ref": "ExpressWorkflow"
      }
    },
    "HelloLambdaFunctionQualifiedArn": {
      "Description": "Current Lambda function version",
      "Export": {
        "Name": "sls-serverless-test-project-dev-HelloLambdaFunctionQualifiedArn"
      },
      "Value": {
        "Ref": "HelloLambdaVersionf42jv6Soivw25tYtUcrbFwOQEe9r1Gm34YtgGMrPRgk"
      }
    },
    "HttpGetterLambdaFunctionQualifiedArn": {
      "Description": "Current Lambda function version",
      "Export": {
        "Name": "sls-serverless-test-project-dev-HttpGetterLambdaFunctionQualifiedArn"
      },
      "Value": {
        "Ref": "HttpGetterLambdaVersionXJnLiB6AgdCzJn6ySnDV3jZfZFbgvZRNWY853JOnws"
      }
    },
    "PingLambdaFunctionQualifiedArn": {
      "Description": "Current Lambda function version",
      "Export": {
        "Name": "sls-serverless-test-project-dev-PingLambdaFunctionQualifiedArn"
      },
      "Value": {
        "Ref": "PingLambdaVersionQn5C3FCwaJxuyEFz1PB1TbidW97srv2gHaU7DXZns"
      }
    },
    "ServerlessDeploymentBucketName": {
      "Export": {
        "Name": "sls-serverless-test-project-dev-ServerlessDeploymentBucketName"
      },
      "Value": {
        "Ref": "ServerlessDeploymentBucket"
      }
    },
    "ServiceEndpoint": {
      "Description": "URL of the service endpoint",
      "Export": {
        "Name": "sls-serverless-test-project-dev-ServiceEndpoint"
      },
      "Value": {
        "Fn::Join": [
          "",
          [
            "https://",
            {
              "Ref": "ApiGatewayRestApi"
            },
            ".execute-api.",
            {
              "Ref": "AWS::Region"
            },
            ".",
            {
              "Ref": "AWS::URLSuffix"
            },
            "/dev"
          ]
        ]
      }
    },
    "StreamProcessorLambdaFunctionQualifiedArn": {
      "Description": "Current Lambda function version",
      "Export": {
        "Name": "sls-serverless-test-project-dev-StreamProcessorLambdaFunctionQualifiedArn"
      },
      "Value": {
        "Ref": "StreamProcessorLambdaVersionVV0TLuhlwFPLxKh4EkN9lxAkgiMhMGAQYjd59YkRg4"
      }
    },
    "SubscriptionHandlerLambdaFunctionQualifiedArn": {
      "Description": "Current Lambda function version",
      "Export": {
        "Name": "sls-serverless-test-project-dev-SubscriptionHandlerLambdaFunctionQualifiedArn"
      },
      "Value": {
        "Ref": "SubscriptionHandlerLambdaVersionRV0txVJkRLsjV5coDIOXnNx4aRSCVyx5VOtiMOYugQ"
      }
    },
    "ThrottlerLambdaFunctionQualifiedArn": {
      "Description": "Current Lambda function version",
      "Export": {
        "Name": "sls-serverless-test-project-dev-ThrottlerLambdaFunctionQualifiedArn"
      },
      "Value": {
        "Ref": "ThrottlerLambdaVersiontRCTuOU8MbmZc930qzPjGs9fBwa7TSeXpdGX5TEBl4"
      }
    },
    "WorkflowArn": {
      "Description": "Current StateMachine Arn",
      "Export": {
        "Name": "sls-serverless-test-project-dev-WorkflowArn"
      },
      "Value": {
        "Ref": "Workflow"
      }
    }
  },
  "Resources": {
    "ApiGatewayDeployment1701792785979": {
      "DependsOn": [
        "ApiGatewayMethodItemGet",
        "ApiGatewayMethodSubscriptionPost"
      ],
      "Properties": {
        "RestApiId": {
          "Ref": "ApiGatewayRestApi"
        },
        "StageName": "dev"
      },
      "Type": "AWS::ApiGateway::Deployment"
    },
    "ApiGatewayMethodItemGet": {
      "DependsOn": [
        "HttpGetterLambdaPermissionApiGateway"
      ],
      "Properties": {
        "ApiKeyRequired": false,
        "AuthorizationType": "NONE",
        "HttpMethod": "GET",
        "Integration": {
          "IntegrationHttpMethod": "POST",
          "Type": "AWS_PROXY",
          "Uri": {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition"
                },
                ":apigateway:",
                {
                  "Ref": "AWS::Region"
                },
                ":lambda:path/2015-03-31/functions/",
                {
                  "Fn::GetAtt": [
                    "HttpGetterLambdaFunction",
                    "Arn"
                  ]
                },
                "/invocations"
              ]
            ]
          }
        },
        "MethodResponses": [],
        "RequestParameters": {},
        "ResourceId": {
          "Ref": "ApiGatewayResourceItem"
        },
        "RestApiId": {
          "Ref": "ApiGatewayRestApi"
        }
      },
      "Type": "AWS::ApiGateway::Method"
    },
    "ApiGatewayMethodSubscriptionPost": {
      "DependsOn": [
        "SubscriptionHandlerLambdaPermissionApiGateway"
      ],
      "Properties": {
        "ApiKeyRequired": false,
        "AuthorizationType": "NONE",
        "HttpMethod": "POST",
        "Integration": {
          "IntegrationHttpMethod": "POST",
          "Type": "AWS_PROXY",
          "Uri": {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition"
                },
                ":apigateway:",
                {
                  "Ref": "AWS::Region"
                },
                ":lambda:path/2015-03-31/functions/",
                {
                  "Fn::GetAtt": [
                    "SubscriptionHandlerLambdaFunction",
                    "Arn"
                  ]
                },
                "/invocations"
              ]
            ]
          }
        },
        "MethodResponses": [],
        "RequestParameters": {},
        "ResourceId": {
          "Ref": "ApiGatewayResourceSubscription"
        },
        "RestApiId": {
          "Ref": "ApiGatewayRestApi"
        }
      },
      "Type": "AWS::ApiGateway::Method"
    },
    "ApiGatewayResourceItem": {
      "Properties": {
        "ParentId": {
          "Fn::GetAtt": [
            "ApiGatewayRestApi",
            "RootResourceId"
          ]
        },
        "PathPart": "item",
        "RestApiId": {
          "Ref": "ApiGatewayRestApi"
        }
      },
      "Type": "AWS::ApiGateway::Resource"
    },
    "ApiGatewayResourceSubscription": {
      "Properties": {
        "ParentId": {
          "Fn::GetAtt": [
            "ApiGatewayRestApi",
            "RootResourceId"
          ]
        },
        "PathPart": "subscription",
        "RestApiId": {
          "Ref": "ApiGatewayRestApi"
        }
      },
      "Type": "AWS::ApiGateway::Resource"
    },
    "ApiGatewayRestApi": {
      "Properties": {
        "EndpointConfiguration": {
          "Types": [
            "REGIONAL"
          ]
        },
        "Name": "dev-serverless-test-project",
        "Policy": ""
      },
      "Type": "AWS::ApiGateway::RestApi"
    },
    "bucket": {
      "Properties": {
        "BucketName": {
          "Fn::Sub": "slic-watch-test-project-bucket-\${AWS::AccountId}-\${AWS::Region}"
        }
      },
      "Type": "AWS::S3::Bucket"
    },
    "dataTable": {
      "DeletionPolicy": "Delete",
      "Metadata": {
        "slicWatch": {
          "alarms": {
            "UserErrors": {
              "Threshold": 20
            }
          },
          "dashboard": {
            "ReadThrottleEvents": {
              "yAxis": "right"
            },
            "WriteThrottleEvents": {
              "yAxis": "right"
            }
          }
        }
      },
      "Properties": {
        "AttributeDefinitions": [
          {
            "AttributeName": "pk",
            "AttributeType": "S"
          },
          {
            "AttributeName": "sk",
            "AttributeType": "S"
          },
          {
            "AttributeName": "gsi1pk",
            "AttributeType": "S"
          },
          {
            "AttributeName": "gsi1sk",
            "AttributeType": "S"
          },
          {
            "AttributeName": "timestamp",
            "AttributeType": "N"
          }
        ],
        "GlobalSecondaryIndexes": [
          {
            "IndexName": "GSI1",
            "ProvisionedThroughput": {
              "ReadCapacityUnits": 1,
              "WriteCapacityUnits": 1
            },
            "KeySchema": [
              {
                "AttributeName": "gsi1pk",
                "KeyType": "HASH"
              },
              {
                "AttributeName": "gsi1sk",
                "KeyType": "RANGE"
              }
            ],
            "Projection": {
              "NonKeyAttributes": [
                "address"
              ],
              "ProjectionType": "INCLUDE"
            }
          }
        ],
        "KeySchema": [
          {
            "AttributeName": "pk",
            "KeyType": "HASH"
          },
          {
            "AttributeName": "sk",
            "KeyType": "RANGE"
          }
        ],
        "LocalSecondaryIndexes": [
          {
            "IndexName": "LSI1",
            "KeySchema": [
              {
                "AttributeName": "pk",
                "KeyType": "HASH"
              },
              {
                "AttributeName": "timestamp",
                "KeyType": "RANGE"
              }
            ],
            "Projection": {
              "NonKeyAttributes": [
                "name"
              ],
              "ProjectionType": "INCLUDE"
            }
          }
        ],
        "ProvisionedThroughput": {
          "ReadCapacityUnits": 1,
          "WriteCapacityUnits": 1
        },
        "TableName": "MyTable"
      },
      "Type": "AWS::DynamoDB::Table"
    },
    "DriveQueueLambdaFunction": {
      "DependsOn": [
        "DriveQueueLogGroup"
      ],
      "Metadata": {
        "slicWatch": {}
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Ref": "ServerlessDeploymentBucket"
          },
          "S3Key": "serverless/serverless-test-project/dev/1701792788693-2023-12-05T16:13:08.693Z/serverless-test-project.zip"
        },
        "FunctionName": "serverless-test-project-dev-driveQueue",
        "Handler": "queue-test-handler.handleDrive",
        "MemorySize": 1024,
        "Role": {
          "Fn::GetAtt": [
            "IamRoleLambdaExecution",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x",
        "Timeout": 6
      },
      "Type": "AWS::Lambda::Function"
    },
    "DriveQueueLambdaVersionO9yL7x2X7on8V1vfBzVj8OmtJsaRIkID1qjEuFRNI": {
      "DeletionPolicy": "Retain",
      "Properties": {
        "CodeSha256": "x4BBRU8H8eI5d76pgM61FHBjsk7qAO0pFBi6yBCXhyM=",
        "FunctionName": {
          "Ref": "DriveQueueLambdaFunction"
        }
      },
      "Type": "AWS::Lambda::Version"
    },
    "DriveQueueLogGroup": {
      "Properties": {
        "LogGroupName": "/aws/lambda/serverless-test-project-dev-driveQueue"
      },
      "Type": "AWS::Logs::LogGroup"
    },
    "DriveStreamLambdaFunction": {
      "DependsOn": [
        "DriveStreamLogGroup"
      ],
      "Metadata": {
        "slicWatch": {}
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Ref": "ServerlessDeploymentBucket"
          },
          "S3Key": "serverless/serverless-test-project/dev/1701792788693-2023-12-05T16:13:08.693Z/serverless-test-project.zip"
        },
        "Environment": {
          "Variables": {
            "STREAM_NAME": {
              "Ref": "stream"
            }
          }
        },
        "FunctionName": "serverless-test-project-dev-driveStream",
        "Handler": "stream-test-handler.handleDrive",
        "MemorySize": 1024,
        "Role": {
          "Fn::GetAtt": [
            "IamRoleLambdaExecution",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x",
        "Timeout": 6
      },
      "Type": "AWS::Lambda::Function"
    },
    "DriveStreamLambdaVersionP4u4hk59XD9172r9elN9B3yQAKgOqsVMcEqn33HWk": {
      "DeletionPolicy": "Retain",
      "Properties": {
        "CodeSha256": "x4BBRU8H8eI5d76pgM61FHBjsk7qAO0pFBi6yBCXhyM=",
        "FunctionName": {
          "Ref": "DriveStreamLambdaFunction"
        }
      },
      "Type": "AWS::Lambda::Version"
    },
    "DriveStreamLogGroup": {
      "Properties": {
        "LogGroupName": "/aws/lambda/serverless-test-project-dev-driveStream"
      },
      "Type": "AWS::Logs::LogGroup"
    },
    "DriveTableLambdaFunction": {
      "DependsOn": [
        "DriveTableLogGroup"
      ],
      "Metadata": {
        "slicWatch": {}
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Ref": "ServerlessDeploymentBucket"
          },
          "S3Key": "serverless/serverless-test-project/dev/1701792788693-2023-12-05T16:13:08.693Z/serverless-test-project.zip"
        },
        "FunctionName": "serverless-test-project-dev-driveTable",
        "Handler": "table-test-hander.handleDrive",
        "MemorySize": 1024,
        "Role": {
          "Fn::GetAtt": [
            "IamRoleLambdaExecution",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x",
        "Timeout": 6
      },
      "Type": "AWS::Lambda::Function"
    },
    "DriveTableLambdaVersionCeL14112extLbZpU9IBiLCw0gjivyaXaSf664bPnc": {
      "DeletionPolicy": "Retain",
      "Properties": {
        "CodeSha256": "x4BBRU8H8eI5d76pgM61FHBjsk7qAO0pFBi6yBCXhyM=",
        "FunctionName": {
          "Ref": "DriveTableLambdaFunction"
        }
      },
      "Type": "AWS::Lambda::Version"
    },
    "DriveTableLogGroup": {
      "Properties": {
        "LogGroupName": "/aws/lambda/serverless-test-project-dev-driveTable"
      },
      "Type": "AWS::Logs::LogGroup"
    },
    "ecsCluster": {
      "Properties": {
        "ClusterName": "awesome-cluster"
      },
      "Type": "AWS::ECS::Cluster"
    },
    "ecsService": {
      "Properties": {
        "Cluster": {
          "Ref": "ecsCluster"
        },
        "DesiredCount": 0,
        "LaunchType": "FARGATE",
        "NetworkConfiguration": {
          "AwsvpcConfiguration": {
            "AssignPublicIp": "ENABLED",
            "SecurityGroups": [],
            "Subnets": [
              {
                "Ref": "subnet"
              }
            ]
          }
        },
        "ServiceName": "awesome-service",
        "TaskDefinition": {
          "Ref": "taskDef"
        }
      },
      "Type": "AWS::ECS::Service"
    },
    "EventsRuleEventBridgeLambdaPermission1": {
      "Properties": {
        "Action": "lambda:InvokeFunction",
        "FunctionName": {
          "Fn::GetAtt": [
            "EventsRuleLambdaFunction",
            "Arn"
          ]
        },
        "Principal": "events.amazonaws.com",
        "SourceArn": {
          "Fn::Join": [
            ":",
            [
              "arn",
              {
                "Ref": "AWS::Partition"
              },
              "events",
              {
                "Ref": "AWS::Region"
              },
              {
                "Ref": "AWS::AccountId"
              },
              {
                "Fn::Join": [
                  "/",
                  [
                    "rule",
                    "serverless-test-project-dev-eventsRule-rule-1"
                  ]
                ]
              }
            ]
          ]
        }
      },
      "Type": "AWS::Lambda::Permission"
    },
    "EventsRuleLambdaFunction": {
      "DependsOn": [
        "EventsRuleLogGroup"
      ],
      "Metadata": {
        "slicWatch": {
          "alarms": {
            "Lambda": {
              "enabled": false
            }
          }
        }
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Ref": "ServerlessDeploymentBucket"
          },
          "S3Key": "serverless/serverless-test-project/dev/1701792788693-2023-12-05T16:13:08.693Z/serverless-test-project.zip"
        },
        "FunctionName": "serverless-test-project-dev-eventsRule",
        "Handler": "rule-handler.handleRule",
        "MemorySize": 1024,
        "Role": {
          "Fn::GetAtt": [
            "IamRoleLambdaExecution",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x",
        "Timeout": 6
      },
      "Type": "AWS::Lambda::Function"
    },
    "EventsRuleLambdaVersioneJD8sIr8CoIFP1PPQEJI0gOwr9VlQOhSPmtxEJmpcA": {
      "DeletionPolicy": "Retain",
      "Properties": {
        "CodeSha256": "x4BBRU8H8eI5d76pgM61FHBjsk7qAO0pFBi6yBCXhyM=",
        "FunctionName": {
          "Ref": "EventsRuleLambdaFunction"
        }
      },
      "Type": "AWS::Lambda::Version"
    },
    "EventsRuleLogGroup": {
      "Properties": {
        "LogGroupName": "/aws/lambda/serverless-test-project-dev-eventsRule"
      },
      "Type": "AWS::Logs::LogGroup"
    },
    "ExpressWorkflow": {
      "DependsOn": [
        "ExpressWorkflowRole"
      ],
      "Properties": {
        "DefinitionString": {
          "Fn::Sub": [
            "{\\n  \\"StartAt\\": \\"What Next?\\",\\n  \\"States\\": {\\n    \\"What Next?\\": {\\n      \\"Type\\": \\"Choice\\",\\n      \\"Choices\\": [\\n        {\\n          \\"Variable\\": \\"$.destination\\",\\n          \\"StringEquals\\": \\"fail\\",\\n          \\"Next\\": \\"Fail\\"\\n        },\\n        {\\n          \\"Variable\\": \\"$.destination\\",\\n          \\"StringEquals\\": \\"timeoutTask\\",\\n          \\"Next\\": \\"TimeoutTask\\"\\n        },\\n        {\\n          \\"Variable\\": \\"$.destination\\",\\n          \\"StringEquals\\": \\"keepWaiting\\",\\n          \\"Next\\": \\"KeepWaiting\\"\\n        }\\n      ],\\n      \\"Default\\": \\"Succeed\\"\\n    },\\n    \\"TimeoutTask\\": {\\n      \\"Type\\": \\"Task\\",\\n      \\"TimeoutSeconds\\": 1,\\n      \\"Resource\\": \\"\${085edd942ce144c5bd80364a6e973e4d}\\",\\n      \\"Parameters\\": {\\n        \\"sleepSeconds\\": 3\\n      },\\n      \\"Next\\": \\"Succeed\\"\\n    },\\n    \\"KeepWaiting\\": {\\n      \\"Type\\": \\"Wait\\",\\n      \\"Seconds\\": 1,\\n      \\"Next\\": \\"KeepWaiting\\"\\n    },\\n    \\"Fail\\": {\\n      \\"Type\\": \\"Fail\\"\\n    },\\n    \\"Succeed\\": {\\n      \\"Type\\": \\"Pass\\",\\n      \\"End\\": true\\n    }\\n  }\\n}",
            {
              "085edd942ce144c5bd80364a6e973e4d": {
                "Fn::GetAtt": [
                  "PingLambdaFunction",
                  "Arn"
                ]
              }
            }
          ]
        },
        "LoggingConfiguration": {
          "Destinations": [
            {
              "CloudWatchLogsLogGroup": {
                "LogGroupArn": {
                  "Fn::GetAtt": [
                    "expressWorkflowLogGroup",
                    "Arn"
                  ]
                }
              }
            }
          ],
          "IncludeExecutionData": true,
          "Level": "ALL"
        },
        "RoleArn": {
          "Fn::GetAtt": [
            "ExpressWorkflowRole",
            "Arn"
          ]
        },
        "StateMachineName": "ExpressWorkflow",
        "StateMachineType": "EXPRESS"
      },
      "Type": "AWS::StepFunctions::StateMachine"
    },
    "expressWorkflowLogGroup": {
      "Properties": {
        "LogGroupName": "ExpressWorkflowLogs",
        "RetentionInDays": 1
      },
      "Type": "AWS::Logs::LogGroup"
    },
    "ExpressWorkflowRole": {
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "Service": {
                  "Fn::Sub": "states.\${AWS::Region}.amazonaws.com"
                }
              },
              "Action": "sts:AssumeRole"
            }
          ],
          "Version": "2012-10-17"
        },
        "Policies": [
          {
            "PolicyName": "dev-serverless-test-project-statemachine",
            "PolicyDocument": {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Effect": "Allow",
                  "Action": [
                    "lambda:InvokeFunction"
                  ],
                  "Resource": [
                    {
                      "Fn::GetAtt": [
                        "PingLambdaFunction",
                        "Arn"
                      ]
                    },
                    {
                      "Fn::Sub": [
                        "\${functionArn}:*",
                        {
                          "functionArn": {
                            "Fn::GetAtt": [
                              "PingLambdaFunction",
                              "Arn"
                            ]
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "Effect": "Allow",
                  "Action": [
                    "logs:CreateLogDelivery",
                    "logs:GetLogDelivery",
                    "logs:UpdateLogDelivery",
                    "logs:DeleteLogDelivery",
                    "logs:ListLogDeliveries",
                    "logs:PutResourcePolicy",
                    "logs:DescribeResourcePolicies",
                    "logs:DescribeLogGroups"
                  ],
                  "Resource": "*"
                }
              ]
            }
          }
        ]
      },
      "Type": "AWS::IAM::Role"
    },
    "fifoQueue": {
      "Properties": {
        "FifoQueue": true,
        "QueueName": "SomeFifoQueue.fifo"
      },
      "Type": "AWS::SQS::Queue"
    },
    "HelloLambdaFunction": {
      "DependsOn": [
        "HelloLogGroup"
      ],
      "Metadata": {
        "slicWatch": {
          "alarms": {
            "Lambda": {
              "Invocations": {
                "Threshold": 2
              }
            }
          }
        }
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Ref": "ServerlessDeploymentBucket"
          },
          "S3Key": "serverless/serverless-test-project/dev/1701792788693-2023-12-05T16:13:08.693Z/serverless-test-project.zip"
        },
        "FunctionName": "serverless-test-project-dev-hello",
        "Handler": "basic-handler.hello",
        "MemorySize": 1024,
        "Role": {
          "Fn::GetAtt": [
            "IamRoleLambdaExecution",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x",
        "Timeout": 6
      },
      "Type": "AWS::Lambda::Function"
    },
    "HelloLambdaVersionf42jv6Soivw25tYtUcrbFwOQEe9r1Gm34YtgGMrPRgk": {
      "DeletionPolicy": "Retain",
      "Properties": {
        "CodeSha256": "x4BBRU8H8eI5d76pgM61FHBjsk7qAO0pFBi6yBCXhyM=",
        "FunctionName": {
          "Ref": "HelloLambdaFunction"
        }
      },
      "Type": "AWS::Lambda::Version"
    },
    "HelloLogGroup": {
      "Properties": {
        "LogGroupName": "/aws/lambda/serverless-test-project-dev-hello"
      },
      "Type": "AWS::Logs::LogGroup"
    },
    "HttpGetterLambdaFunction": {
      "DependsOn": [
        "HttpGetterLogGroup"
      ],
      "Metadata": {
        "slicWatch": {}
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Ref": "ServerlessDeploymentBucket"
          },
          "S3Key": "serverless/serverless-test-project/dev/1701792788693-2023-12-05T16:13:08.693Z/serverless-test-project.zip"
        },
        "FunctionName": "serverless-test-project-dev-httpGetter",
        "Handler": "apigw-handler.handleGet",
        "MemorySize": 1024,
        "Role": {
          "Fn::GetAtt": [
            "IamRoleLambdaExecution",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x",
        "Timeout": 30
      },
      "Type": "AWS::Lambda::Function"
    },
    "HttpGetterLambdaPermissionApiGateway": {
      "Properties": {
        "Action": "lambda:InvokeFunction",
        "FunctionName": {
          "Fn::GetAtt": [
            "HttpGetterLambdaFunction",
            "Arn"
          ]
        },
        "Principal": "apigateway.amazonaws.com",
        "SourceArn": {
          "Fn::Join": [
            "",
            [
              "arn:",
              {
                "Ref": "AWS::Partition"
              },
              ":execute-api:",
              {
                "Ref": "AWS::Region"
              },
              ":",
              {
                "Ref": "AWS::AccountId"
              },
              ":",
              {
                "Ref": "ApiGatewayRestApi"
              },
              "/*/*"
            ]
          ]
        }
      },
      "Type": "AWS::Lambda::Permission"
    },
    "HttpGetterLambdaVersionXJnLiB6AgdCzJn6ySnDV3jZfZFbgvZRNWY853JOnws": {
      "DeletionPolicy": "Retain",
      "Properties": {
        "CodeSha256": "x4BBRU8H8eI5d76pgM61FHBjsk7qAO0pFBi6yBCXhyM=",
        "FunctionName": {
          "Ref": "HttpGetterLambdaFunction"
        }
      },
      "Type": "AWS::Lambda::Version"
    },
    "HttpGetterLogGroup": {
      "Properties": {
        "LogGroupName": "/aws/lambda/serverless-test-project-dev-httpGetter"
      },
      "Type": "AWS::Logs::LogGroup"
    },
    "IamRoleLambdaExecution": {
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "Service": [
                  "lambda.amazonaws.com"
                ]
              },
              "Action": [
                "sts:AssumeRole"
              ]
            }
          ],
          "Version": "2012-10-17"
        },
        "Path": "/",
        "Policies": [
          {
            "PolicyName": {
              "Fn::Join": [
                "-",
                [
                  "serverless-test-project",
                  "dev",
                  "lambda"
                ]
              ]
            },
            "PolicyDocument": {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Effect": "Allow",
                  "Action": [
                    "logs:CreateLogStream",
                    "logs:CreateLogGroup",
                    "logs:TagResource"
                  ],
                  "Resource": [
                    {
                      "Fn::Sub": "arn:\${AWS::Partition}:logs:\${AWS::Region}:\${AWS::AccountId}:log-group:/aws/lambda/serverless-test-project-dev*:*"
                    }
                  ]
                },
                {
                  "Effect": "Allow",
                  "Action": [
                    "logs:PutLogEvents"
                  ],
                  "Resource": [
                    {
                      "Fn::Sub": "arn:\${AWS::Partition}:logs:\${AWS::Region}:\${AWS::AccountId}:log-group:/aws/lambda/serverless-test-project-dev*:*:*"
                    }
                  ]
                },
                {
                  "Effect": "Allow",
                  "Action": [
                    "kinesis:GetRecords",
                    "kinesis:GetShardIterator",
                    "kinesis:DescribeStream",
                    "kinesis:ListStreams"
                  ],
                  "Resource": [
                    {
                      "Fn::GetAtt": [
                        "stream",
                        "Arn"
                      ]
                    }
                  ]
                }
              ]
            }
          }
        ],
        "RoleName": {
          "Fn::Join": [
            "-",
            [
              "serverless-test-project",
              "dev",
              {
                "Ref": "AWS::Region"
              },
              "lambdaRole"
            ]
          ]
        }
      },
      "Type": "AWS::IAM::Role"
    },
    "PingLambdaFunction": {
      "DependsOn": [
        "PingLogGroup"
      ],
      "Metadata": {
        "slicWatch": {
          "dashboard": {
            "enabled": false
          }
        }
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Ref": "ServerlessDeploymentBucket"
          },
          "S3Key": "serverless/serverless-test-project/dev/1701792788693-2023-12-05T16:13:08.693Z/serverless-test-project.zip"
        },
        "FunctionName": "serverless-test-project-dev-ping",
        "Handler": "basic-handler.hello",
        "MemorySize": 1024,
        "Role": {
          "Fn::GetAtt": [
            "IamRoleLambdaExecution",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x",
        "Timeout": 6
      },
      "Type": "AWS::Lambda::Function"
    },
    "PingLambdaVersionQn5C3FCwaJxuyEFz1PB1TbidW97srv2gHaU7DXZns": {
      "DeletionPolicy": "Retain",
      "Properties": {
        "CodeSha256": "x4BBRU8H8eI5d76pgM61FHBjsk7qAO0pFBi6yBCXhyM=",
        "FunctionName": {
          "Ref": "PingLambdaFunction"
        }
      },
      "Type": "AWS::Lambda::Version"
    },
    "PingLogGroup": {
      "Properties": {
        "LogGroupName": "/aws/lambda/serverless-test-project-dev-ping"
      },
      "Type": "AWS::Logs::LogGroup"
    },
    "regularQueue": {
      "Properties": {
        "QueueName": "SomeRegularQueue"
      },
      "Type": "AWS::SQS::Queue"
    },
    "ServerlessDeploymentBucket": {
      "Properties": {
        "BucketEncryption": {
          "ServerSideEncryptionConfiguration": [
            {
              "ServerSideEncryptionByDefault": {
                "SSEAlgorithm": "AES256"
              }
            }
          ]
        }
      },
      "Type": "AWS::S3::Bucket"
    },
    "ServerlessDeploymentBucketPolicy": {
      "Properties": {
        "Bucket": {
          "Ref": "ServerlessDeploymentBucket"
        },
        "PolicyDocument": {
          "Statement": [
            {
              "Action": "s3:*",
              "Effect": "Deny",
              "Principal": "*",
              "Resource": [
                {
                  "Fn::Join": [
                    "",
                    [
                      "arn:",
                      {
                        "Ref": "AWS::Partition"
                      },
                      ":s3:::",
                      {
                        "Ref": "ServerlessDeploymentBucket"
                      },
                      "/*"
                    ]
                  ]
                },
                {
                  "Fn::Join": [
                    "",
                    [
                      "arn:",
                      {
                        "Ref": "AWS::Partition"
                      },
                      ":s3:::",
                      {
                        "Ref": "ServerlessDeploymentBucket"
                      }
                    ]
                  ]
                }
              ],
              "Condition": {
                "Bool": {
                  "aws:SecureTransport": false
                }
              }
            }
          ]
        }
      },
      "Type": "AWS::S3::BucketPolicy"
    },
    "ServerlesstestprojectdeveventsRulerule1EventBridgeRule": {
      "Properties": {
        "EventPattern": {
          "detail-type": [
            "Invoke Lambda Function"
          ]
        },
        "Name": "serverless-test-project-dev-eventsRule-rule-1",
        "State": "ENABLED",
        "Targets": [
          {
            "Arn": {
              "Fn::GetAtt": [
                "EventsRuleLambdaFunction",
                "Arn"
              ]
            },
            "Id": "serverless-test-project-dev-eventsRule-rule-1-target",
            "RetryPolicy": {
              "MaximumEventAgeInSeconds": 60,
              "MaximumRetryAttempts": 2
            }
          }
        ]
      },
      "Type": "AWS::Events::Rule"
    },
    "slicWatchApi4XXErrorAlarmdevserverlesstestproject": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "API Gateway 4XXError Average for dev-serverless-test-project breaches 0.05",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "ApiGW_4XXError_dev-serverless-test-project",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "ApiName",
            "Value": "dev-serverless-test-project"
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "4XXError",
        "Namespace": "AWS/ApiGateway",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 0.05,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchApi5XXErrorAlarmdevserverlesstestproject": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "API Gateway 5XXError Average for dev-serverless-test-project breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "ApiGW_5XXError_dev-serverless-test-project",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "ApiName",
            "Value": "dev-serverless-test-project"
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "5XXError",
        "Namespace": "AWS/ApiGateway",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchApiLatencyAlarmdevserverlesstestproject": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "API Gateway Latency p99 for dev-serverless-test-project breaches 5000",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "ApiGW_Latency_dev-serverless-test-project",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "ApiName",
            "Value": "dev-serverless-test-project"
          }
        ],
        "EvaluationPeriods": 1,
        "ExtendedStatistic": "p99",
        "MetricName": "Latency",
        "Namespace": "AWS/ApiGateway",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Threshold": 5000,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchDashboard": {
      "Properties": {
        "DashboardBody": {
          "Fn::Sub": {
            "start": "-PT3H",
            "widgets": [
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/ApiGateway",
                      "5XXError",
                      "ApiName",
                      "dev-serverless-test-project",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "5XXError API dev-serverless-test-project",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 0,
                "y": 0
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/ApiGateway",
                      "4XXError",
                      "ApiName",
                      "dev-serverless-test-project",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "4XXError API dev-serverless-test-project",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 8,
                "y": 0
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/ApiGateway",
                      "Latency",
                      "ApiName",
                      "dev-serverless-test-project",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "Latency",
                      "ApiName",
                      "dev-serverless-test-project",
                      {
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "Latency API dev-serverless-test-project",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 16,
                "y": 0
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/ApiGateway",
                      "Count",
                      "ApiName",
                      "dev-serverless-test-project",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "Count API dev-serverless-test-project",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 0,
                "y": 6
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/States",
                      "ExecutionsFailed",
                      "StateMachineArn",
                      "\${Workflow}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/States",
                      "ExecutionThrottled",
                      "StateMachineArn",
                      "\${Workflow}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/States",
                      "ExecutionsTimedOut",
                      "StateMachineArn",
                      "\${Workflow}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "\${Workflow.Name} Step Function Executions",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 8,
                "y": 6
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/States",
                      "ExecutionsFailed",
                      "StateMachineArn",
                      "\${ExpressWorkflow}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/States",
                      "ExecutionThrottled",
                      "StateMachineArn",
                      "\${ExpressWorkflow}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/States",
                      "ExecutionsTimedOut",
                      "StateMachineArn",
                      "\${ExpressWorkflow}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "\${ExpressWorkflow.Name} Step Function Executions",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 16,
                "y": 6
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/DynamoDB",
                      "ReadThrottleEvents",
                      "TableName",
                      "\${dataTable}",
                      {
                        "stat": "Sum",
                        "yAxis": "right"
                      }
                    ]
                  ],
                  "title": "ReadThrottleEvents Table \${dataTable}",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 0,
                "y": 12
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/DynamoDB",
                      "ReadThrottleEvents",
                      "TableName",
                      "\${dataTable}",
                      "GlobalSecondaryIndex",
                      "GSI1",
                      {
                        "stat": "Sum",
                        "yAxis": "right"
                      }
                    ]
                  ],
                  "title": "ReadThrottleEvents GSI GSI1 in \${dataTable}",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 8,
                "y": 12
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/DynamoDB",
                      "WriteThrottleEvents",
                      "TableName",
                      "\${dataTable}",
                      {
                        "stat": "Sum",
                        "yAxis": "right"
                      }
                    ]
                  ],
                  "title": "WriteThrottleEvents Table \${dataTable}",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 16,
                "y": 12
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/DynamoDB",
                      "WriteThrottleEvents",
                      "TableName",
                      "\${dataTable}",
                      "GlobalSecondaryIndex",
                      "GSI1",
                      {
                        "stat": "Sum",
                        "yAxis": "right"
                      }
                    ]
                  ],
                  "title": "WriteThrottleEvents GSI GSI1 in \${dataTable}",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 0,
                "y": 18
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${HelloLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${ThrottlerLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${DriveStreamLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${DriveQueueLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${DriveTableLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${StreamProcessorLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${HttpGetterLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${SubscriptionHandlerLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${EventsRuleLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "Lambda Errors Sum per Function",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 8,
                "y": 18
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${HelloLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${ThrottlerLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${DriveStreamLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${DriveQueueLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${DriveTableLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${StreamProcessorLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${HttpGetterLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${SubscriptionHandlerLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${EventsRuleLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "Lambda Throttles Sum per Function",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 16,
                "y": 18
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${HelloLambdaFunction}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${ThrottlerLambdaFunction}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveStreamLambdaFunction}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveQueueLambdaFunction}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveTableLambdaFunction}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${StreamProcessorLambdaFunction}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${HttpGetterLambdaFunction}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${SubscriptionHandlerLambdaFunction}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${EventsRuleLambdaFunction}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "Lambda Duration Average per Function",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 0,
                "y": 24
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${HelloLambdaFunction}",
                      {
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${ThrottlerLambdaFunction}",
                      {
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveStreamLambdaFunction}",
                      {
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveQueueLambdaFunction}",
                      {
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveTableLambdaFunction}",
                      {
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${StreamProcessorLambdaFunction}",
                      {
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${HttpGetterLambdaFunction}",
                      {
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${SubscriptionHandlerLambdaFunction}",
                      {
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${EventsRuleLambdaFunction}",
                      {
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "Lambda Duration p95 per Function",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 8,
                "y": 24
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${HelloLambdaFunction}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${ThrottlerLambdaFunction}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveStreamLambdaFunction}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveQueueLambdaFunction}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveTableLambdaFunction}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${StreamProcessorLambdaFunction}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${HttpGetterLambdaFunction}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${SubscriptionHandlerLambdaFunction}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${EventsRuleLambdaFunction}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "Lambda Duration Maximum per Function",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 16,
                "y": 24
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${HelloLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${ThrottlerLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${DriveStreamLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${DriveQueueLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${DriveTableLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${StreamProcessorLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${HttpGetterLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${SubscriptionHandlerLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${EventsRuleLambdaFunction}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "Lambda Invocations Sum per Function",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 0,
                "y": 30
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${HelloLambdaFunction}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${ThrottlerLambdaFunction}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${DriveStreamLambdaFunction}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${DriveQueueLambdaFunction}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${DriveTableLambdaFunction}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${StreamProcessorLambdaFunction}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${HttpGetterLambdaFunction}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${SubscriptionHandlerLambdaFunction}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${EventsRuleLambdaFunction}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "Lambda ConcurrentExecutions Maximum per Function",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 8,
                "y": 30
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "IteratorAge",
                      "FunctionName",
                      "\${StreamProcessorLambdaFunction}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "Lambda IteratorAge \${StreamProcessorLambdaFunction} Maximum",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 16,
                "y": 30
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Kinesis",
                      "GetRecords.IteratorAgeMilliseconds",
                      "StreamName",
                      "\${stream}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "IteratorAge \${stream} Kinesis",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 0,
                "y": 36
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Kinesis",
                      "PutRecord.Success",
                      "StreamName",
                      "\${stream}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Kinesis",
                      "PutRecords.Success",
                      "StreamName",
                      "\${stream}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Kinesis",
                      "GetRecords.Success",
                      "StreamName",
                      "\${stream}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "Get/Put Success \${stream} Kinesis",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 8,
                "y": 36
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Kinesis",
                      "ReadProvisionedThroughputExceeded",
                      "StreamName",
                      "\${stream}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Kinesis",
                      "WriteProvisionedThroughputExceeded",
                      "StreamName",
                      "\${stream}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "Provisioned Throughput \${stream} Kinesis",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 16,
                "y": 36
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/SQS",
                      "NumberOfMessagesSent",
                      "QueueName",
                      "\${regularQueue.QueueName}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/SQS",
                      "NumberOfMessagesReceived",
                      "QueueName",
                      "\${regularQueue.QueueName}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/SQS",
                      "NumberOfMessagesDeleted",
                      "QueueName",
                      "\${regularQueue.QueueName}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "Messages \${regularQueue.QueueName} SQS",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 0,
                "y": 42
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/SQS",
                      "ApproximateAgeOfOldestMessage",
                      "QueueName",
                      "\${regularQueue.QueueName}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "Oldest Message age \${regularQueue.QueueName} SQS",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 8,
                "y": 42
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/SQS",
                      "ApproximateNumberOfMessagesVisible",
                      "QueueName",
                      "\${regularQueue.QueueName}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "Messages in queue \${regularQueue.QueueName} SQS",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 16,
                "y": 42
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/SQS",
                      "NumberOfMessagesSent",
                      "QueueName",
                      "\${fifoQueue.QueueName}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/SQS",
                      "NumberOfMessagesReceived",
                      "QueueName",
                      "\${fifoQueue.QueueName}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/SQS",
                      "NumberOfMessagesDeleted",
                      "QueueName",
                      "\${fifoQueue.QueueName}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "Messages \${fifoQueue.QueueName} SQS",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 0,
                "y": 48
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/SQS",
                      "ApproximateAgeOfOldestMessage",
                      "QueueName",
                      "\${fifoQueue.QueueName}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "Oldest Message age \${fifoQueue.QueueName} SQS",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 8,
                "y": 48
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/SQS",
                      "ApproximateNumberOfMessagesVisible",
                      "QueueName",
                      "\${fifoQueue.QueueName}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "Messages in queue \${fifoQueue.QueueName} SQS",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 16,
                "y": 48
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/ECS",
                      "MemoryUtilization",
                      "ServiceName",
                      "\${ecsService.Name}",
                      "ClusterName",
                      "\${ecsCluster}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/ECS",
                      "CPUUtilization",
                      "ServiceName",
                      "\${ecsService.Name}",
                      "ClusterName",
                      "\${ecsCluster}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "ECS Service \${ecsService.Name}",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 0,
                "y": 54
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/SNS",
                      "NumberOfNotificationsFilteredOut-InvalidAttributes",
                      "TopicName",
                      "\${topic.TopicName}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/SNS",
                      "NumberOfNotificationsFailed",
                      "TopicName",
                      "\${topic.TopicName}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "SNS Topic \${topic.TopicName}",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 8,
                "y": 54
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Events",
                      "FailedInvocations",
                      "RuleName",
                      "\${ServerlesstestprojectdeveventsRulerule1EventBridgeRule}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Events",
                      "ThrottledRules",
                      "RuleName",
                      "\${ServerlesstestprojectdeveventsRulerule1EventBridgeRule}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Events",
                      "Invocations",
                      "RuleName",
                      "\${ServerlesstestprojectdeveventsRulerule1EventBridgeRule}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "EventBridge Rule \${ServerlesstestprojectdeveventsRulerule1EventBridgeRule}",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 16,
                "y": 54
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/S3",
                      "FirstByteLatency",
                      "BucketName",
                      "\${ServerlessDeploymentBucket}",
                      "FilterId",
                      "EntireBucket",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/S3",
                      "FirstByteLatency",
                      "BucketName",
                      "\${bucket}",
                      "FilterId",
                      "EntireBucket",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "S3 FirstByteLatency Average per Bucket",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 0,
                "y": 60
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/S3",
                      "FirstByteLatency",
                      "BucketName",
                      "\${ServerlessDeploymentBucket}",
                      "FilterId",
                      "EntireBucket",
                      {
                        "stat": "p99",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/S3",
                      "FirstByteLatency",
                      "BucketName",
                      "\${bucket}",
                      "FilterId",
                      "EntireBucket",
                      {
                        "stat": "p99",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "S3 FirstByteLatency p99 per Bucket",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 8,
                "y": 60
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/S3",
                      "HeadRequests",
                      "BucketName",
                      "\${ServerlessDeploymentBucket}",
                      "FilterId",
                      "EntireBucket",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/S3",
                      "HeadRequests",
                      "BucketName",
                      "\${bucket}",
                      "FilterId",
                      "EntireBucket",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "S3 HeadRequests Sum per Bucket",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 16,
                "y": 60
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/S3",
                      "5xxErrors",
                      "BucketName",
                      "\${ServerlessDeploymentBucket}",
                      "FilterId",
                      "EntireBucket",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/S3",
                      "5xxErrors",
                      "BucketName",
                      "\${bucket}",
                      "FilterId",
                      "EntireBucket",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "S3 5xxErrors Sum per Bucket",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 0,
                "y": 66
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/S3",
                      "4xxErrors",
                      "BucketName",
                      "\${ServerlessDeploymentBucket}",
                      "FilterId",
                      "EntireBucket",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/S3",
                      "4xxErrors",
                      "BucketName",
                      "\${bucket}",
                      "FilterId",
                      "EntireBucket",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "S3 4xxErrors Sum per Bucket",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 8,
                "y": 66
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/S3",
                      "TotalRequestLatency",
                      "BucketName",
                      "\${ServerlessDeploymentBucket}",
                      "FilterId",
                      "EntireBucket",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/S3",
                      "TotalRequestLatency",
                      "BucketName",
                      "\${bucket}",
                      "FilterId",
                      "EntireBucket",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "S3 TotalRequestLatency Average per Bucket",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 16,
                "y": 66
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/S3",
                      "TotalRequestLatency",
                      "BucketName",
                      "\${ServerlessDeploymentBucket}",
                      "FilterId",
                      "EntireBucket",
                      {
                        "stat": "p99",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/S3",
                      "TotalRequestLatency",
                      "BucketName",
                      "\${bucket}",
                      "FilterId",
                      "EntireBucket",
                      {
                        "stat": "p99",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "S3 TotalRequestLatency p99 per Bucket",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 0,
                "y": 72
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/S3",
                      "AllRequests",
                      "BucketName",
                      "\${ServerlessDeploymentBucket}",
                      "FilterId",
                      "EntireBucket",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/S3",
                      "AllRequests",
                      "BucketName",
                      "\${bucket}",
                      "FilterId",
                      "EntireBucket",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "S3 AllRequests Sum per Bucket",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 8,
                "y": 72
              }
            ]
          }
        }
      },
      "Type": "AWS::CloudWatch::Dashboard"
    },
    "slicWatchECSCPUAlarmecsService": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "ECS CPUUtilization for \${ecsService.Name} breaches 90",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "ECS_CPUAlarm_\${ecsService.Name}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "ServiceName",
            "Value": {
              "Fn::GetAtt": [
                "ecsService",
                "Name"
              ]
            }
          },
          {
            "Name": "ClusterName",
            "Value": {
              "Ref": "ecsCluster"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "CPUUtilization",
        "Namespace": "AWS/ECS",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 90,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchECSMemoryAlarmecsService": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "ECS MemoryUtilization for \${ecsService.Name} breaches 90",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "ECS_MemoryAlarm_\${ecsService.Name}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "ServiceName",
            "Value": {
              "Fn::GetAtt": [
                "ecsService",
                "Name"
              ]
            }
          },
          {
            "Name": "ClusterName",
            "Value": {
              "Ref": "ecsCluster"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "MemoryUtilization",
        "Namespace": "AWS/ECS",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 90,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchEventsFailedInvocationsAlarmServerlesstestprojectdeveventsRulerule1EventBridgeRule": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "EventBridge FailedInvocations for \${ServerlesstestprojectdeveventsRulerule1EventBridgeRule} breaches 1",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Events_FailedInvocations_Alarm_\${ServerlesstestprojectdeveventsRulerule1EventBridgeRule}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "RuleName",
            "Value": {
              "Ref": "ServerlesstestprojectdeveventsRulerule1EventBridgeRule"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "FailedInvocations",
        "Namespace": "AWS/Events",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchEventsThrottledRulesAlarmServerlesstestprojectdeveventsRulerule1EventBridgeRule": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "EventBridge ThrottledRules for \${ServerlesstestprojectdeveventsRulerule1EventBridgeRule} breaches 1",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Events_ThrottledRules_Alarm_\${ServerlesstestprojectdeveventsRulerule1EventBridgeRule}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "RuleName",
            "Value": {
              "Ref": "ServerlesstestprojectdeveventsRulerule1EventBridgeRule"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ThrottledRules",
        "Namespace": "AWS/Events",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchGSIReadThrottleEventsAlarmdataTableGSI1": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${dataTable}GSI1 breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "DDB_ReadThrottleEvents_Alarm_\${dataTable}GSI1",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "dataTable"
            }
          },
          {
            "Name": "GlobalSecondaryIndex",
            "Value": "GSI1"
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ReadThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchGSIWriteThrottleEventsAlarmdataTableGSI1": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${dataTable}GSI1 breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "DDB_WriteThrottleEvents_Alarm_\${dataTable}GSI1",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "dataTable"
            }
          },
          {
            "Name": "GlobalSecondaryIndex",
            "Value": "GSI1"
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "WriteThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchKinesisStreamGetRecordsSuccessAlarmStream": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Kinesis Average GetRecords.Success for \${stream} breaches 1 milliseconds",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Kinesis_StreamGetRecordsSuccess_\${stream}",
            {}
          ]
        },
        "ComparisonOperator": "LessThanThreshold",
        "Dimensions": [
          {
            "Name": "StreamName",
            "Value": {
              "Ref": "stream"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "GetRecords.Success",
        "Namespace": "AWS/Kinesis",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 1,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchKinesisStreamIteratorAgeAlarmStream": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Kinesis Maximum GetRecords.IteratorAgeMilliseconds for \${stream} breaches 10000 milliseconds",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Kinesis_StreamIteratorAge_\${stream}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "StreamName",
            "Value": {
              "Ref": "stream"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "GetRecords.IteratorAgeMilliseconds",
        "Namespace": "AWS/Kinesis",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 10000,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchKinesisStreamPutRecordsSuccessAlarmStream": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Kinesis Average PutRecords.Success for \${stream} breaches 1 milliseconds",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Kinesis_StreamPutRecordsSuccess_\${stream}",
            {}
          ]
        },
        "ComparisonOperator": "LessThanThreshold",
        "Dimensions": [
          {
            "Name": "StreamName",
            "Value": {
              "Ref": "stream"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "PutRecords.Success",
        "Namespace": "AWS/Kinesis",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 1,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchKinesisStreamPutRecordSuccessAlarmStream": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Kinesis Average PutRecord.Success for \${stream} breaches 1 milliseconds",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Kinesis_StreamPutRecordSuccess_\${stream}",
            {}
          ]
        },
        "ComparisonOperator": "LessThanThreshold",
        "Dimensions": [
          {
            "Name": "StreamName",
            "Value": {
              "Ref": "stream"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "PutRecord.Success",
        "Namespace": "AWS/Kinesis",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 1,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchKinesisStreamReadThroughputAlarmStream": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Kinesis Sum ReadProvisionedThroughputExceeded for \${stream} breaches 0 milliseconds",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Kinesis_StreamReadThroughput_\${stream}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "StreamName",
            "Value": {
              "Ref": "stream"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ReadProvisionedThroughputExceeded",
        "Namespace": "AWS/Kinesis",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchKinesisStreamWriteThroughputAlarmStream": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Kinesis Sum WriteProvisionedThroughputExceeded for \${stream} breaches 0 milliseconds",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Kinesis_StreamWriteThroughput_\${stream}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "StreamName",
            "Value": {
              "Ref": "stream"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "WriteProvisionedThroughputExceeded",
        "Namespace": "AWS/Kinesis",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmDriveQueueLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${DriveQueueLambdaFunction} breaches 95% of timeout (6)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${DriveQueueLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveQueueLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 5700,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmDriveStreamLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${DriveStreamLambdaFunction} breaches 95% of timeout (6)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${DriveStreamLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveStreamLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 5700,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmDriveTableLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${DriveTableLambdaFunction} breaches 95% of timeout (6)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${DriveTableLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveTableLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 5700,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmHelloLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${HelloLambdaFunction} breaches 95% of timeout (6)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${HelloLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 5700,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmHttpGetterLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${HttpGetterLambdaFunction} breaches 95% of timeout (30)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${HttpGetterLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HttpGetterLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 28500,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmPingLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${PingLambdaFunction} breaches 95% of timeout (6)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${PingLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "PingLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 5700,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmStreamProcessorLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${StreamProcessorLambdaFunction} breaches 95% of timeout (6)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${StreamProcessorLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "StreamProcessorLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 5700,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmSubscriptionHandlerLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${SubscriptionHandlerLambdaFunction} breaches 95% of timeout (30)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${SubscriptionHandlerLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "SubscriptionHandlerLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 28500,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmThrottlerLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${ThrottlerLambdaFunction} breaches 95% of timeout (6)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${ThrottlerLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "ThrottlerLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 5700,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmDriveQueueLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${DriveQueueLambdaFunction} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${DriveQueueLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveQueueLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmDriveStreamLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${DriveStreamLambdaFunction} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${DriveStreamLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveStreamLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmDriveTableLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${DriveTableLambdaFunction} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${DriveTableLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveTableLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmHelloLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${HelloLambdaFunction} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${HelloLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmHttpGetterLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${HttpGetterLambdaFunction} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${HttpGetterLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HttpGetterLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmPingLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${PingLambdaFunction} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${PingLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "PingLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmStreamProcessorLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${StreamProcessorLambdaFunction} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${StreamProcessorLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "StreamProcessorLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmSubscriptionHandlerLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${SubscriptionHandlerLambdaFunction} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${SubscriptionHandlerLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "SubscriptionHandlerLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmThrottlerLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${ThrottlerLambdaFunction} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${ThrottlerLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "ThrottlerLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmDriveQueueLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${DriveQueueLambdaFunction} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${DriveQueueLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveQueueLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmDriveStreamLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${DriveStreamLambdaFunction} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${DriveStreamLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveStreamLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmDriveTableLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${DriveTableLambdaFunction} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${DriveTableLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveTableLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmHelloLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${HelloLambdaFunction} breaches 2",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${HelloLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 2,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmHttpGetterLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${HttpGetterLambdaFunction} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${HttpGetterLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HttpGetterLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmPingLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${PingLambdaFunction} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${PingLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "PingLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmStreamProcessorLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${StreamProcessorLambdaFunction} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${StreamProcessorLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "StreamProcessorLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmSubscriptionHandlerLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${SubscriptionHandlerLambdaFunction} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${SubscriptionHandlerLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "SubscriptionHandlerLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmThrottlerLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${ThrottlerLambdaFunction} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${ThrottlerLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "ThrottlerLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaIteratorAgeAlarmStreamProcessorLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "IteratorAge for \${StreamProcessorLambdaFunction} breaches 10000",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_IteratorAge_\${StreamProcessorLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "StreamProcessorLambdaFunction"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "IteratorAge",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 10000,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmDriveQueueLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${DriveQueueLambdaFunction} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${DriveQueueLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": [
          {
            "Id": "throttles_pc",
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Label": "% Throttles",
            "ReturnData": true
          },
          {
            "Id": "throttles",
            "MetricStat": {
              "Metric": {
                "Namespace": "AWS/Lambda",
                "MetricName": "Throttles",
                "Dimensions": [
                  {
                    "Name": "FunctionName",
                    "Value": {
                      "Ref": "DriveQueueLambdaFunction"
                    }
                  }
                ]
              },
              "Period": 60,
              "Stat": "Sum"
            },
            "ReturnData": false
          },
          {
            "Id": "invocations",
            "MetricStat": {
              "Metric": {
                "Namespace": "AWS/Lambda",
                "MetricName": "Invocations",
                "Dimensions": [
                  {
                    "Name": "FunctionName",
                    "Value": {
                      "Ref": "DriveQueueLambdaFunction"
                    }
                  }
                ]
              },
              "Period": 60,
              "Stat": "Sum"
            },
            "ReturnData": false
          }
        ],
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmDriveStreamLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${DriveStreamLambdaFunction} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${DriveStreamLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": [
          {
            "Id": "throttles_pc",
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Label": "% Throttles",
            "ReturnData": true
          },
          {
            "Id": "throttles",
            "MetricStat": {
              "Metric": {
                "Namespace": "AWS/Lambda",
                "MetricName": "Throttles",
                "Dimensions": [
                  {
                    "Name": "FunctionName",
                    "Value": {
                      "Ref": "DriveStreamLambdaFunction"
                    }
                  }
                ]
              },
              "Period": 60,
              "Stat": "Sum"
            },
            "ReturnData": false
          },
          {
            "Id": "invocations",
            "MetricStat": {
              "Metric": {
                "Namespace": "AWS/Lambda",
                "MetricName": "Invocations",
                "Dimensions": [
                  {
                    "Name": "FunctionName",
                    "Value": {
                      "Ref": "DriveStreamLambdaFunction"
                    }
                  }
                ]
              },
              "Period": 60,
              "Stat": "Sum"
            },
            "ReturnData": false
          }
        ],
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmDriveTableLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${DriveTableLambdaFunction} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${DriveTableLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": [
          {
            "Id": "throttles_pc",
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Label": "% Throttles",
            "ReturnData": true
          },
          {
            "Id": "throttles",
            "MetricStat": {
              "Metric": {
                "Namespace": "AWS/Lambda",
                "MetricName": "Throttles",
                "Dimensions": [
                  {
                    "Name": "FunctionName",
                    "Value": {
                      "Ref": "DriveTableLambdaFunction"
                    }
                  }
                ]
              },
              "Period": 60,
              "Stat": "Sum"
            },
            "ReturnData": false
          },
          {
            "Id": "invocations",
            "MetricStat": {
              "Metric": {
                "Namespace": "AWS/Lambda",
                "MetricName": "Invocations",
                "Dimensions": [
                  {
                    "Name": "FunctionName",
                    "Value": {
                      "Ref": "DriveTableLambdaFunction"
                    }
                  }
                ]
              },
              "Period": 60,
              "Stat": "Sum"
            },
            "ReturnData": false
          }
        ],
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmHelloLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${HelloLambdaFunction} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${HelloLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": [
          {
            "Id": "throttles_pc",
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Label": "% Throttles",
            "ReturnData": true
          },
          {
            "Id": "throttles",
            "MetricStat": {
              "Metric": {
                "Namespace": "AWS/Lambda",
                "MetricName": "Throttles",
                "Dimensions": [
                  {
                    "Name": "FunctionName",
                    "Value": {
                      "Ref": "HelloLambdaFunction"
                    }
                  }
                ]
              },
              "Period": 60,
              "Stat": "Sum"
            },
            "ReturnData": false
          },
          {
            "Id": "invocations",
            "MetricStat": {
              "Metric": {
                "Namespace": "AWS/Lambda",
                "MetricName": "Invocations",
                "Dimensions": [
                  {
                    "Name": "FunctionName",
                    "Value": {
                      "Ref": "HelloLambdaFunction"
                    }
                  }
                ]
              },
              "Period": 60,
              "Stat": "Sum"
            },
            "ReturnData": false
          }
        ],
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmHttpGetterLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${HttpGetterLambdaFunction} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${HttpGetterLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": [
          {
            "Id": "throttles_pc",
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Label": "% Throttles",
            "ReturnData": true
          },
          {
            "Id": "throttles",
            "MetricStat": {
              "Metric": {
                "Namespace": "AWS/Lambda",
                "MetricName": "Throttles",
                "Dimensions": [
                  {
                    "Name": "FunctionName",
                    "Value": {
                      "Ref": "HttpGetterLambdaFunction"
                    }
                  }
                ]
              },
              "Period": 60,
              "Stat": "Sum"
            },
            "ReturnData": false
          },
          {
            "Id": "invocations",
            "MetricStat": {
              "Metric": {
                "Namespace": "AWS/Lambda",
                "MetricName": "Invocations",
                "Dimensions": [
                  {
                    "Name": "FunctionName",
                    "Value": {
                      "Ref": "HttpGetterLambdaFunction"
                    }
                  }
                ]
              },
              "Period": 60,
              "Stat": "Sum"
            },
            "ReturnData": false
          }
        ],
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmPingLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${PingLambdaFunction} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${PingLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": [
          {
            "Id": "throttles_pc",
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Label": "% Throttles",
            "ReturnData": true
          },
          {
            "Id": "throttles",
            "MetricStat": {
              "Metric": {
                "Namespace": "AWS/Lambda",
                "MetricName": "Throttles",
                "Dimensions": [
                  {
                    "Name": "FunctionName",
                    "Value": {
                      "Ref": "PingLambdaFunction"
                    }
                  }
                ]
              },
              "Period": 60,
              "Stat": "Sum"
            },
            "ReturnData": false
          },
          {
            "Id": "invocations",
            "MetricStat": {
              "Metric": {
                "Namespace": "AWS/Lambda",
                "MetricName": "Invocations",
                "Dimensions": [
                  {
                    "Name": "FunctionName",
                    "Value": {
                      "Ref": "PingLambdaFunction"
                    }
                  }
                ]
              },
              "Period": 60,
              "Stat": "Sum"
            },
            "ReturnData": false
          }
        ],
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmStreamProcessorLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${StreamProcessorLambdaFunction} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${StreamProcessorLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": [
          {
            "Id": "throttles_pc",
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Label": "% Throttles",
            "ReturnData": true
          },
          {
            "Id": "throttles",
            "MetricStat": {
              "Metric": {
                "Namespace": "AWS/Lambda",
                "MetricName": "Throttles",
                "Dimensions": [
                  {
                    "Name": "FunctionName",
                    "Value": {
                      "Ref": "StreamProcessorLambdaFunction"
                    }
                  }
                ]
              },
              "Period": 60,
              "Stat": "Sum"
            },
            "ReturnData": false
          },
          {
            "Id": "invocations",
            "MetricStat": {
              "Metric": {
                "Namespace": "AWS/Lambda",
                "MetricName": "Invocations",
                "Dimensions": [
                  {
                    "Name": "FunctionName",
                    "Value": {
                      "Ref": "StreamProcessorLambdaFunction"
                    }
                  }
                ]
              },
              "Period": 60,
              "Stat": "Sum"
            },
            "ReturnData": false
          }
        ],
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmSubscriptionHandlerLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${SubscriptionHandlerLambdaFunction} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${SubscriptionHandlerLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": [
          {
            "Id": "throttles_pc",
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Label": "% Throttles",
            "ReturnData": true
          },
          {
            "Id": "throttles",
            "MetricStat": {
              "Metric": {
                "Namespace": "AWS/Lambda",
                "MetricName": "Throttles",
                "Dimensions": [
                  {
                    "Name": "FunctionName",
                    "Value": {
                      "Ref": "SubscriptionHandlerLambdaFunction"
                    }
                  }
                ]
              },
              "Period": 60,
              "Stat": "Sum"
            },
            "ReturnData": false
          },
          {
            "Id": "invocations",
            "MetricStat": {
              "Metric": {
                "Namespace": "AWS/Lambda",
                "MetricName": "Invocations",
                "Dimensions": [
                  {
                    "Name": "FunctionName",
                    "Value": {
                      "Ref": "SubscriptionHandlerLambdaFunction"
                    }
                  }
                ]
              },
              "Period": 60,
              "Stat": "Sum"
            },
            "ReturnData": false
          }
        ],
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmThrottlerLambdaFunction": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${ThrottlerLambdaFunction} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${ThrottlerLambdaFunction}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": [
          {
            "Id": "throttles_pc",
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Label": "% Throttles",
            "ReturnData": true
          },
          {
            "Id": "throttles",
            "MetricStat": {
              "Metric": {
                "Namespace": "AWS/Lambda",
                "MetricName": "Throttles",
                "Dimensions": [
                  {
                    "Name": "FunctionName",
                    "Value": {
                      "Ref": "ThrottlerLambdaFunction"
                    }
                  }
                ]
              },
              "Period": 60,
              "Stat": "Sum"
            },
            "ReturnData": false
          },
          {
            "Id": "invocations",
            "MetricStat": {
              "Metric": {
                "Namespace": "AWS/Lambda",
                "MetricName": "Invocations",
                "Dimensions": [
                  {
                    "Name": "FunctionName",
                    "Value": {
                      "Ref": "ThrottlerLambdaFunction"
                    }
                  }
                ]
              },
              "Period": 60,
              "Stat": "Sum"
            },
            "ReturnData": false
          }
        ],
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchS34xxErrorsAlarmBucket": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "S3 4xxErrors for \${bucket} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "S3_4xxErrors_Alarm_\${bucket}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "BucketName",
            "Value": {
              "Ref": "bucket"
            }
          },
          {
            "Name": "FilterId",
            "Value": "EntireBucket"
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "4xxErrors",
        "Namespace": "AWS/S3",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchS34xxErrorsAlarmServerlessDeploymentBucket": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "S3 4xxErrors for \${ServerlessDeploymentBucket} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "S3_4xxErrors_Alarm_\${ServerlessDeploymentBucket}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "BucketName",
            "Value": {
              "Ref": "ServerlessDeploymentBucket"
            }
          },
          {
            "Name": "FilterId",
            "Value": "EntireBucket"
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "4xxErrors",
        "Namespace": "AWS/S3",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchS35xxErrorsAlarmBucket": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "S3 5xxErrors for \${bucket} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "S3_5xxErrors_Alarm_\${bucket}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "BucketName",
            "Value": {
              "Ref": "bucket"
            }
          },
          {
            "Name": "FilterId",
            "Value": "EntireBucket"
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "5xxErrors",
        "Namespace": "AWS/S3",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchS35xxErrorsAlarmServerlessDeploymentBucket": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "S3 5xxErrors for \${ServerlessDeploymentBucket} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "S3_5xxErrors_Alarm_\${ServerlessDeploymentBucket}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "BucketName",
            "Value": {
              "Ref": "ServerlessDeploymentBucket"
            }
          },
          {
            "Name": "FilterId",
            "Value": "EntireBucket"
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "5xxErrors",
        "Namespace": "AWS/S3",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchS3AllRequestsAlarmBucket": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "S3 AllRequests for \${bucket} breaches 1000",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "S3_AllRequests_Alarm_\${bucket}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "BucketName",
            "Value": {
              "Ref": "bucket"
            }
          },
          {
            "Name": "FilterId",
            "Value": "EntireBucket"
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "AllRequests",
        "Namespace": "AWS/S3",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1000,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchS3AllRequestsAlarmServerlessDeploymentBucket": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "S3 AllRequests for \${ServerlessDeploymentBucket} breaches 1000",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "S3_AllRequests_Alarm_\${ServerlessDeploymentBucket}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "BucketName",
            "Value": {
              "Ref": "ServerlessDeploymentBucket"
            }
          },
          {
            "Name": "FilterId",
            "Value": "EntireBucket"
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "AllRequests",
        "Namespace": "AWS/S3",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1000,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchS3FirstByteLatencyAlarmBucket": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "S3 FirstByteLatency for \${bucket} breaches 5000",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "S3_FirstByteLatency_Alarm_\${bucket}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "BucketName",
            "Value": {
              "Ref": "bucket"
            }
          },
          {
            "Name": "FilterId",
            "Value": "EntireBucket"
          }
        ],
        "EvaluationPeriods": 1,
        "ExtendedStatistic": "p99",
        "MetricName": "FirstByteLatency",
        "Namespace": "AWS/S3",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Threshold": 5000,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchS3FirstByteLatencyAlarmServerlessDeploymentBucket": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "S3 FirstByteLatency for \${ServerlessDeploymentBucket} breaches 5000",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "S3_FirstByteLatency_Alarm_\${ServerlessDeploymentBucket}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "BucketName",
            "Value": {
              "Ref": "ServerlessDeploymentBucket"
            }
          },
          {
            "Name": "FilterId",
            "Value": "EntireBucket"
          }
        ],
        "EvaluationPeriods": 1,
        "ExtendedStatistic": "p99",
        "MetricName": "FirstByteLatency",
        "Namespace": "AWS/S3",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Threshold": 5000,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchS3HeadRequestsAlarmBucket": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "S3 HeadRequests for \${bucket} breaches 200",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "S3_HeadRequests_Alarm_\${bucket}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "BucketName",
            "Value": {
              "Ref": "bucket"
            }
          },
          {
            "Name": "FilterId",
            "Value": "EntireBucket"
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "HeadRequests",
        "Namespace": "AWS/S3",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 200,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchS3HeadRequestsAlarmServerlessDeploymentBucket": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "S3 HeadRequests for \${ServerlessDeploymentBucket} breaches 200",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "S3_HeadRequests_Alarm_\${ServerlessDeploymentBucket}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "BucketName",
            "Value": {
              "Ref": "ServerlessDeploymentBucket"
            }
          },
          {
            "Name": "FilterId",
            "Value": "EntireBucket"
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "HeadRequests",
        "Namespace": "AWS/S3",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 200,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchS3TotalRequestLatencyAlarmBucket": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "S3 TotalRequestLatency for \${bucket} breaches 5000",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "S3_TotalRequestLatency_Alarm_\${bucket}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "BucketName",
            "Value": {
              "Ref": "bucket"
            }
          },
          {
            "Name": "FilterId",
            "Value": "EntireBucket"
          }
        ],
        "EvaluationPeriods": 1,
        "ExtendedStatistic": "p99",
        "MetricName": "TotalRequestLatency",
        "Namespace": "AWS/S3",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Threshold": 5000,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchS3TotalRequestLatencyAlarmServerlessDeploymentBucket": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "S3 TotalRequestLatency for \${ServerlessDeploymentBucket} breaches 5000",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "S3_TotalRequestLatency_Alarm_\${ServerlessDeploymentBucket}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "BucketName",
            "Value": {
              "Ref": "ServerlessDeploymentBucket"
            }
          },
          {
            "Name": "FilterId",
            "Value": "EntireBucket"
          }
        ],
        "EvaluationPeriods": 1,
        "ExtendedStatistic": "p99",
        "MetricName": "TotalRequestLatency",
        "Namespace": "AWS/S3",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Threshold": 5000,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchSNSNumberOfNotificationsFailedAlarmTopic": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "SNS NumberOfNotificationsFailed for \${topic.TopicName} breaches 1",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "SNS_NumberOfNotificationsFailed_Alarm_\${topic.TopicName}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TopicName",
            "Value": {
              "Fn::GetAtt": [
                "topic",
                "TopicName"
              ]
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "NumberOfNotificationsFailed",
        "Namespace": "AWS/SNS",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchSNSNumberOfNotificationsFilteredOutInvalidAttributesAlarmTopic": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "SNS NumberOfNotificationsFilteredOutInvalidAttributes for \${topic.TopicName} breaches 1",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "SNS_NumberOfNotificationsFilteredOutInvalidAttributes_Alarm_\${topic.TopicName}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TopicName",
            "Value": {
              "Fn::GetAtt": [
                "topic",
                "TopicName"
              ]
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "NumberOfNotificationsFilteredOut-InvalidAttributes",
        "Namespace": "AWS/SNS",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchSQSInFlightMsgsAlarmfifoQueue": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "SQS in-flight messages for \${fifoQueue.QueueName} breaches 200 (1% of the hard limit of 20000)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "SQS_ApproximateNumberOfMessagesNotVisible_\${fifoQueue.QueueName}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "QueueName",
            "Value": {
              "Fn::GetAtt": [
                "fifoQueue",
                "QueueName"
              ]
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ApproximateNumberOfMessagesNotVisible",
        "Namespace": "AWS/SQS",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 200,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchSQSInFlightMsgsAlarmregularQueue": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "SQS in-flight messages for \${regularQueue.QueueName} breaches 1200 (1% of the hard limit of 120000)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "SQS_ApproximateNumberOfMessagesNotVisible_\${regularQueue.QueueName}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "QueueName",
            "Value": {
              "Fn::GetAtt": [
                "regularQueue",
                "QueueName"
              ]
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ApproximateNumberOfMessagesNotVisible",
        "Namespace": "AWS/SQS",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 1200,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchSQSOldestMsgAgeAlarmfifoQueue": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "SQS age of oldest message in the queue \${fifoQueue.QueueName} breaches 60",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "SQS_ApproximateAgeOfOldestMessage_\${fifoQueue.QueueName}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "QueueName",
            "Value": {
              "Fn::GetAtt": [
                "fifoQueue",
                "QueueName"
              ]
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ApproximateAgeOfOldestMessage",
        "Namespace": "AWS/SQS",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 60,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchSQSOldestMsgAgeAlarmregularQueue": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "SQS age of oldest message in the queue \${regularQueue.QueueName} breaches 60",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "SQS_ApproximateAgeOfOldestMessage_\${regularQueue.QueueName}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "QueueName",
            "Value": {
              "Fn::GetAtt": [
                "regularQueue",
                "QueueName"
              ]
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ApproximateAgeOfOldestMessage",
        "Namespace": "AWS/SQS",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 60,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchStatesExecutionsFailedAlarmExpressWorkflow": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionsFailed Sum for \${ExpressWorkflow.Name}  breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionsFailedAlarm_\${ExpressWorkflow.Name}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "ExpressWorkflow"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ExecutionsFailed",
        "Namespace": "AWS/States",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchStatesExecutionsFailedAlarmWorkflow": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionsFailed Sum for \${Workflow.Name}  breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionsFailedAlarm_\${Workflow.Name}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "Workflow"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ExecutionsFailed",
        "Namespace": "AWS/States",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchStatesExecutionsTimedOutAlarmExpressWorkflow": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionsTimedOut Sum for \${ExpressWorkflow.Name}  breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionsTimedOutAlarm_\${ExpressWorkflow.Name}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "ExpressWorkflow"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ExecutionsTimedOut",
        "Namespace": "AWS/States",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchStatesExecutionsTimedOutAlarmWorkflow": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionsTimedOut Sum for \${Workflow.Name}  breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionsTimedOutAlarm_\${Workflow.Name}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "Workflow"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ExecutionsTimedOut",
        "Namespace": "AWS/States",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchStatesExecutionThrottledAlarmExpressWorkflow": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionThrottled Sum for \${ExpressWorkflow.Name}  breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionThrottledAlarm_\${ExpressWorkflow.Name}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "ExpressWorkflow"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ExecutionThrottled",
        "Namespace": "AWS/States",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchStatesExecutionThrottledAlarmWorkflow": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionThrottled Sum for \${Workflow.Name}  breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionThrottledAlarm_\${Workflow.Name}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "Workflow"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ExecutionThrottled",
        "Namespace": "AWS/States",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchTableReadThrottleEventsAlarmdataTable": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${dataTable} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "DDB_ReadThrottleEvents_Alarm_\${dataTable}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "dataTable"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ReadThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchTableSystemErrorsAlarmdataTable": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${dataTable} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "DDB_SystemErrors_Alarm_\${dataTable}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "dataTable"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "SystemErrors",
        "Namespace": "AWS/DynamoDB",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchTableUserErrorsAlarmdataTable": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${dataTable} breaches 20",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "DDB_UserErrors_Alarm_\${dataTable}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "dataTable"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "UserErrors",
        "Namespace": "AWS/DynamoDB",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 20,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchTableWriteThrottleEventsAlarmdataTable": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${dataTable} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "DDB_WriteThrottleEvents_Alarm_\${dataTable}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "dataTable"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "WriteThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "OKActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "stream": {
      "Properties": {
        "Name": {
          "Fn::Sub": "slic-watch-test-project-stream-\${AWS::AccountId}-\${AWS::Region}"
        },
        "ShardCount": 1
      },
      "Type": "AWS::Kinesis::Stream"
    },
    "StreamProcessorEventSourceMappingKinesisStream": {
      "DependsOn": [
        "IamRoleLambdaExecution"
      ],
      "Properties": {
        "BatchSize": 10,
        "Enabled": true,
        "EventSourceArn": {
          "Fn::GetAtt": [
            "stream",
            "Arn"
          ]
        },
        "FunctionName": {
          "Fn::GetAtt": [
            "StreamProcessorLambdaFunction",
            "Arn"
          ]
        },
        "MaximumRetryAttempts": 0,
        "StartingPosition": "LATEST"
      },
      "Type": "AWS::Lambda::EventSourceMapping"
    },
    "StreamProcessorLambdaFunction": {
      "DependsOn": [
        "StreamProcessorLogGroup"
      ],
      "Metadata": {
        "slicWatch": {}
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Ref": "ServerlessDeploymentBucket"
          },
          "S3Key": "serverless/serverless-test-project/dev/1701792788693-2023-12-05T16:13:08.693Z/serverless-test-project.zip"
        },
        "FunctionName": "serverless-test-project-dev-streamProcessor",
        "Handler": "stream-handler.handle",
        "MemorySize": 1024,
        "Role": {
          "Fn::GetAtt": [
            "IamRoleLambdaExecution",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x",
        "Timeout": 6
      },
      "Type": "AWS::Lambda::Function"
    },
    "StreamProcessorLambdaVersionVV0TLuhlwFPLxKh4EkN9lxAkgiMhMGAQYjd59YkRg4": {
      "DeletionPolicy": "Retain",
      "Properties": {
        "CodeSha256": "x4BBRU8H8eI5d76pgM61FHBjsk7qAO0pFBi6yBCXhyM=",
        "FunctionName": {
          "Ref": "StreamProcessorLambdaFunction"
        }
      },
      "Type": "AWS::Lambda::Version"
    },
    "StreamProcessorLogGroup": {
      "Properties": {
        "LogGroupName": "/aws/lambda/serverless-test-project-dev-streamProcessor"
      },
      "Type": "AWS::Logs::LogGroup"
    },
    "subnet": {
      "Properties": {
        "AvailabilityZone": "eu-west-1a",
        "CidrBlock": "10.0.16.0/20",
        "VpcId": {
          "Ref": "vpc"
        }
      },
      "Type": "AWS::EC2::Subnet"
    },
    "SubscriptionHandlerLambdaFunction": {
      "DependsOn": [
        "SubscriptionHandlerLogGroup"
      ],
      "Metadata": {
        "slicWatch": {}
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Ref": "ServerlessDeploymentBucket"
          },
          "S3Key": "serverless/serverless-test-project/dev/1701792788693-2023-12-05T16:13:08.693Z/serverless-test-project.zip"
        },
        "FunctionName": "serverless-test-project-dev-subscriptionHandler",
        "Handler": "apigw-handler.handleSubscription",
        "MemorySize": 1024,
        "Role": {
          "Fn::GetAtt": [
            "IamRoleLambdaExecution",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x",
        "Timeout": 30
      },
      "Type": "AWS::Lambda::Function"
    },
    "SubscriptionHandlerLambdaPermissionApiGateway": {
      "Properties": {
        "Action": "lambda:InvokeFunction",
        "FunctionName": {
          "Fn::GetAtt": [
            "SubscriptionHandlerLambdaFunction",
            "Arn"
          ]
        },
        "Principal": "apigateway.amazonaws.com",
        "SourceArn": {
          "Fn::Join": [
            "",
            [
              "arn:",
              {
                "Ref": "AWS::Partition"
              },
              ":execute-api:",
              {
                "Ref": "AWS::Region"
              },
              ":",
              {
                "Ref": "AWS::AccountId"
              },
              ":",
              {
                "Ref": "ApiGatewayRestApi"
              },
              "/*/*"
            ]
          ]
        }
      },
      "Type": "AWS::Lambda::Permission"
    },
    "SubscriptionHandlerLambdaVersionRV0txVJkRLsjV5coDIOXnNx4aRSCVyx5VOtiMOYugQ": {
      "DeletionPolicy": "Retain",
      "Properties": {
        "CodeSha256": "x4BBRU8H8eI5d76pgM61FHBjsk7qAO0pFBi6yBCXhyM=",
        "FunctionName": {
          "Ref": "SubscriptionHandlerLambdaFunction"
        }
      },
      "Type": "AWS::Lambda::Version"
    },
    "SubscriptionHandlerLogGroup": {
      "Properties": {
        "LogGroupName": "/aws/lambda/serverless-test-project-dev-subscriptionHandler"
      },
      "Type": "AWS::Logs::LogGroup"
    },
    "subscriptionTest": {
      "Properties": {
        "Endpoint": {
          "Fn::Sub": "https://\${ApiGatewayRestApi}.execute-api.\${AWS::Region}.amazonaws.com/dev/subscription"
        },
        "Protocol": "https",
        "TopicArn": {
          "Ref": "topic"
        }
      },
      "Type": "AWS::SNS::Subscription"
    },
    "taskDef": {
      "Properties": {
        "ContainerDefinitions": [
          {
            "Name": "busybox",
            "Image": "busybox",
            "Cpu": 256,
            "EntryPoint": [
              "sh",
              "-c"
            ],
            "Memory": 512,
            "Command": [
              "/bin/sh -c \\"while true; do echo Hello; sleep 10; done\\""
            ],
            "Essential": true
          }
        ],
        "Cpu": "256",
        "Memory": "512",
        "NetworkMode": "awsvpc",
        "RequiresCompatibilities": [
          "FARGATE"
        ]
      },
      "Type": "AWS::ECS::TaskDefinition"
    },
    "ThrottlerLambdaFunction": {
      "DependsOn": [
        "ThrottlerLogGroup"
      ],
      "Metadata": {
        "slicWatch": {}
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Ref": "ServerlessDeploymentBucket"
          },
          "S3Key": "serverless/serverless-test-project/dev/1701792788693-2023-12-05T16:13:08.693Z/serverless-test-project.zip"
        },
        "FunctionName": "serverless-test-project-dev-throttler",
        "Handler": "basic-handler.hello",
        "MemorySize": 1024,
        "ReservedConcurrentExecutions": 0,
        "Role": {
          "Fn::GetAtt": [
            "IamRoleLambdaExecution",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x",
        "Timeout": 6
      },
      "Type": "AWS::Lambda::Function"
    },
    "ThrottlerLambdaVersiontRCTuOU8MbmZc930qzPjGs9fBwa7TSeXpdGX5TEBl4": {
      "DeletionPolicy": "Retain",
      "Properties": {
        "CodeSha256": "x4BBRU8H8eI5d76pgM61FHBjsk7qAO0pFBi6yBCXhyM=",
        "FunctionName": {
          "Ref": "ThrottlerLambdaFunction"
        }
      },
      "Type": "AWS::Lambda::Version"
    },
    "ThrottlerLogGroup": {
      "Properties": {
        "LogGroupName": "/aws/lambda/serverless-test-project-dev-throttler"
      },
      "Type": "AWS::Logs::LogGroup"
    },
    "topic": {
      "Properties": {
        "TopicName": {
          "Fn::Sub": "slic-watch-test-project-topic-\${AWS::AccountId}-\${AWS::Region}"
        }
      },
      "Type": "AWS::SNS::Topic"
    },
    "vpc": {
      "Properties": {
        "CidrBlock": "10.0.0.0/16"
      },
      "Type": "AWS::EC2::VPC"
    },
    "Workflow": {
      "DependsOn": [
        "WorkflowRole"
      ],
      "Properties": {
        "DefinitionString": {
          "Fn::Sub": [
            "{\\n  \\"StartAt\\": \\"What Next?\\",\\n  \\"States\\": {\\n    \\"What Next?\\": {\\n      \\"Type\\": \\"Choice\\",\\n      \\"Choices\\": [\\n        {\\n          \\"Variable\\": \\"$.destination\\",\\n          \\"StringEquals\\": \\"fail\\",\\n          \\"Next\\": \\"Fail\\"\\n        },\\n        {\\n          \\"Variable\\": \\"$.destination\\",\\n          \\"StringEquals\\": \\"timeoutTask\\",\\n          \\"Next\\": \\"TimeoutTask\\"\\n        },\\n        {\\n          \\"Variable\\": \\"$.destination\\",\\n          \\"StringEquals\\": \\"keepWaiting\\",\\n          \\"Next\\": \\"KeepWaiting\\"\\n        }\\n      ],\\n      \\"Default\\": \\"Succeed\\"\\n    },\\n    \\"TimeoutTask\\": {\\n      \\"Type\\": \\"Task\\",\\n      \\"TimeoutSeconds\\": 1,\\n      \\"Resource\\": \\"\${085edd942ce144c5bd80364a6e973e4d}\\",\\n      \\"Parameters\\": {\\n        \\"sleepSeconds\\": 3\\n      },\\n      \\"Next\\": \\"Succeed\\"\\n    },\\n    \\"KeepWaiting\\": {\\n      \\"Type\\": \\"Wait\\",\\n      \\"Seconds\\": 1,\\n      \\"Next\\": \\"KeepWaiting\\"\\n    },\\n    \\"Fail\\": {\\n      \\"Type\\": \\"Fail\\"\\n    },\\n    \\"Succeed\\": {\\n      \\"Type\\": \\"Pass\\",\\n      \\"End\\": true\\n    }\\n  }\\n}",
            {
              "085edd942ce144c5bd80364a6e973e4d": {
                "Fn::GetAtt": [
                  "PingLambdaFunction",
                  "Arn"
                ]
              }
            }
          ]
        },
        "LoggingConfiguration": {
          "Destinations": [
            {
              "CloudWatchLogsLogGroup": {
                "LogGroupArn": {
                  "Fn::GetAtt": [
                    "workflowLogGroup",
                    "Arn"
                  ]
                }
              }
            }
          ],
          "IncludeExecutionData": true,
          "Level": "ALL"
        },
        "RoleArn": {
          "Fn::GetAtt": [
            "WorkflowRole",
            "Arn"
          ]
        },
        "StateMachineName": "Workflow"
      },
      "Type": "AWS::StepFunctions::StateMachine"
    },
    "workflowLogGroup": {
      "Properties": {
        "LogGroupName": "WorkflowLogs",
        "RetentionInDays": 1
      },
      "Type": "AWS::Logs::LogGroup"
    },
    "WorkflowRole": {
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "Service": {
                  "Fn::Sub": "states.\${AWS::Region}.amazonaws.com"
                }
              },
              "Action": "sts:AssumeRole"
            }
          ],
          "Version": "2012-10-17"
        },
        "Policies": [
          {
            "PolicyName": "dev-serverless-test-project-statemachine",
            "PolicyDocument": {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Effect": "Allow",
                  "Action": [
                    "lambda:InvokeFunction"
                  ],
                  "Resource": [
                    {
                      "Fn::GetAtt": [
                        "PingLambdaFunction",
                        "Arn"
                      ]
                    },
                    {
                      "Fn::Sub": [
                        "\${functionArn}:*",
                        {
                          "functionArn": {
                            "Fn::GetAtt": [
                              "PingLambdaFunction",
                              "Arn"
                            ]
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "Effect": "Allow",
                  "Action": [
                    "logs:CreateLogDelivery",
                    "logs:GetLogDelivery",
                    "logs:UpdateLogDelivery",
                    "logs:DeleteLogDelivery",
                    "logs:ListLogDeliveries",
                    "logs:PutResourcePolicy",
                    "logs:DescribeResourcePolicies",
                    "logs:DescribeLogGroups"
                  ],
                  "Resource": "*"
                }
              ]
            }
          }
        ]
      },
      "Type": "AWS::IAM::Role"
    }
  }
}
`

/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`serverless-test-project/tests/snapshot/serverless-test-project-snapshot.test.ts > TAP > serverless-test-project snapshot > serverless-test-project template 1`] = `
{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "The AWS CloudFormation template for this Serverless application",
  "Resources": {
    "ServerlessDeploymentBucket": {
      "Type": "AWS::S3::Bucket",
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
      }
    },
    "ServerlessDeploymentBucketPolicy": {
      "Type": "AWS::S3::BucketPolicy",
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
      }
    },
    "HelloLogGroup": {
      "Type": "AWS::Logs::LogGroup",
      "Properties": {
        "LogGroupName": "/aws/lambda/serverless-test-project-dev-hello"
      }
    },
    "PingLogGroup": {
      "Type": "AWS::Logs::LogGroup",
      "Properties": {
        "LogGroupName": "/aws/lambda/serverless-test-project-dev-ping"
      }
    },
    "ThrottlerLogGroup": {
      "Type": "AWS::Logs::LogGroup",
      "Properties": {
        "LogGroupName": "/aws/lambda/serverless-test-project-dev-throttler"
      }
    },
    "DriveStreamLogGroup": {
      "Type": "AWS::Logs::LogGroup",
      "Properties": {
        "LogGroupName": "/aws/lambda/serverless-test-project-dev-driveStream"
      }
    },
    "DriveQueueLogGroup": {
      "Type": "AWS::Logs::LogGroup",
      "Properties": {
        "LogGroupName": "/aws/lambda/serverless-test-project-dev-driveQueue"
      }
    },
    "DriveTableLogGroup": {
      "Type": "AWS::Logs::LogGroup",
      "Properties": {
        "LogGroupName": "/aws/lambda/serverless-test-project-dev-driveTable"
      }
    },
    "StreamProcessorLogGroup": {
      "Type": "AWS::Logs::LogGroup",
      "Properties": {
        "LogGroupName": "/aws/lambda/serverless-test-project-dev-streamProcessor"
      }
    },
    "HttpGetterLogGroup": {
      "Type": "AWS::Logs::LogGroup",
      "Properties": {
        "LogGroupName": "/aws/lambda/serverless-test-project-dev-httpGetter"
      }
    },
    "SubscriptionHandlerLogGroup": {
      "Type": "AWS::Logs::LogGroup",
      "Properties": {
        "LogGroupName": "/aws/lambda/serverless-test-project-dev-subscriptionHandler"
      }
    },
    "EventsRuleLogGroup": {
      "Type": "AWS::Logs::LogGroup",
      "Properties": {
        "LogGroupName": "/aws/lambda/serverless-test-project-dev-eventsRule"
      }
    },
    "IamRoleLambdaExecution": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
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
          ]
        },
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
        "Path": "/",
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
      }
    },
    "HelloLambdaFunction": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Ref": "ServerlessDeploymentBucket"
          },
          "S3Key": "serverless/serverless-test-project/dev/1701242216679-2023-11-29T07:16:56.679Z/serverless-test-project.zip"
        },
        "Handler": "basic-handler.hello",
        "Runtime": "nodejs18.x",
        "FunctionName": "serverless-test-project-dev-hello",
        "MemorySize": 1024,
        "Timeout": 6,
        "Role": {
          "Fn::GetAtt": [
            "IamRoleLambdaExecution",
            "Arn"
          ]
        }
      },
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
      }
    },
    "PingLambdaFunction": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Ref": "ServerlessDeploymentBucket"
          },
          "S3Key": "serverless/serverless-test-project/dev/1701242216679-2023-11-29T07:16:56.679Z/serverless-test-project.zip"
        },
        "Handler": "basic-handler.hello",
        "Runtime": "nodejs18.x",
        "FunctionName": "serverless-test-project-dev-ping",
        "MemorySize": 1024,
        "Timeout": 6,
        "Role": {
          "Fn::GetAtt": [
            "IamRoleLambdaExecution",
            "Arn"
          ]
        }
      },
      "DependsOn": [
        "PingLogGroup"
      ],
      "Metadata": {
        "slicWatch": {
          "dashboard": {
            "enabled": false
          }
        }
      }
    },
    "ThrottlerLambdaFunction": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Ref": "ServerlessDeploymentBucket"
          },
          "S3Key": "serverless/serverless-test-project/dev/1701242216679-2023-11-29T07:16:56.679Z/serverless-test-project.zip"
        },
        "Handler": "basic-handler.hello",
        "Runtime": "nodejs18.x",
        "FunctionName": "serverless-test-project-dev-throttler",
        "MemorySize": 1024,
        "Timeout": 6,
        "Role": {
          "Fn::GetAtt": [
            "IamRoleLambdaExecution",
            "Arn"
          ]
        },
        "ReservedConcurrentExecutions": 0
      },
      "DependsOn": [
        "ThrottlerLogGroup"
      ],
      "Metadata": {
        "slicWatch": {}
      }
    },
    "DriveStreamLambdaFunction": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Ref": "ServerlessDeploymentBucket"
          },
          "S3Key": "serverless/serverless-test-project/dev/1701242216679-2023-11-29T07:16:56.679Z/serverless-test-project.zip"
        },
        "Handler": "stream-test-handler.handleDrive",
        "Runtime": "nodejs18.x",
        "FunctionName": "serverless-test-project-dev-driveStream",
        "MemorySize": 1024,
        "Timeout": 6,
        "Environment": {
          "Variables": {
            "STREAM_NAME": {
              "Ref": "stream"
            }
          }
        },
        "Role": {
          "Fn::GetAtt": [
            "IamRoleLambdaExecution",
            "Arn"
          ]
        }
      },
      "DependsOn": [
        "DriveStreamLogGroup"
      ],
      "Metadata": {
        "slicWatch": {}
      }
    },
    "DriveQueueLambdaFunction": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Ref": "ServerlessDeploymentBucket"
          },
          "S3Key": "serverless/serverless-test-project/dev/1701242216679-2023-11-29T07:16:56.679Z/serverless-test-project.zip"
        },
        "Handler": "queue-test-handler.handleDrive",
        "Runtime": "nodejs18.x",
        "FunctionName": "serverless-test-project-dev-driveQueue",
        "MemorySize": 1024,
        "Timeout": 6,
        "Role": {
          "Fn::GetAtt": [
            "IamRoleLambdaExecution",
            "Arn"
          ]
        }
      },
      "DependsOn": [
        "DriveQueueLogGroup"
      ],
      "Metadata": {
        "slicWatch": {}
      }
    },
    "DriveTableLambdaFunction": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Ref": "ServerlessDeploymentBucket"
          },
          "S3Key": "serverless/serverless-test-project/dev/1701242216679-2023-11-29T07:16:56.679Z/serverless-test-project.zip"
        },
        "Handler": "table-test-hander.handleDrive",
        "Runtime": "nodejs18.x",
        "FunctionName": "serverless-test-project-dev-driveTable",
        "MemorySize": 1024,
        "Timeout": 6,
        "Role": {
          "Fn::GetAtt": [
            "IamRoleLambdaExecution",
            "Arn"
          ]
        }
      },
      "DependsOn": [
        "DriveTableLogGroup"
      ],
      "Metadata": {
        "slicWatch": {}
      }
    },
    "StreamProcessorLambdaFunction": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Ref": "ServerlessDeploymentBucket"
          },
          "S3Key": "serverless/serverless-test-project/dev/1701242216679-2023-11-29T07:16:56.679Z/serverless-test-project.zip"
        },
        "Handler": "stream-handler.handle",
        "Runtime": "nodejs18.x",
        "FunctionName": "serverless-test-project-dev-streamProcessor",
        "MemorySize": 1024,
        "Timeout": 6,
        "Role": {
          "Fn::GetAtt": [
            "IamRoleLambdaExecution",
            "Arn"
          ]
        }
      },
      "DependsOn": [
        "StreamProcessorLogGroup"
      ],
      "Metadata": {
        "slicWatch": {}
      }
    },
    "HttpGetterLambdaFunction": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Ref": "ServerlessDeploymentBucket"
          },
          "S3Key": "serverless/serverless-test-project/dev/1701242216679-2023-11-29T07:16:56.679Z/serverless-test-project.zip"
        },
        "Handler": "apigw-handler.handleGet",
        "Runtime": "nodejs18.x",
        "FunctionName": "serverless-test-project-dev-httpGetter",
        "MemorySize": 1024,
        "Timeout": 30,
        "Role": {
          "Fn::GetAtt": [
            "IamRoleLambdaExecution",
            "Arn"
          ]
        }
      },
      "DependsOn": [
        "HttpGetterLogGroup"
      ],
      "Metadata": {
        "slicWatch": {}
      }
    },
    "SubscriptionHandlerLambdaFunction": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Ref": "ServerlessDeploymentBucket"
          },
          "S3Key": "serverless/serverless-test-project/dev/1701242216679-2023-11-29T07:16:56.679Z/serverless-test-project.zip"
        },
        "Handler": "apigw-handler.handleSubscription",
        "Runtime": "nodejs18.x",
        "FunctionName": "serverless-test-project-dev-subscriptionHandler",
        "MemorySize": 1024,
        "Timeout": 30,
        "Role": {
          "Fn::GetAtt": [
            "IamRoleLambdaExecution",
            "Arn"
          ]
        }
      },
      "DependsOn": [
        "SubscriptionHandlerLogGroup"
      ],
      "Metadata": {
        "slicWatch": {}
      }
    },
    "EventsRuleLambdaFunction": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Ref": "ServerlessDeploymentBucket"
          },
          "S3Key": "serverless/serverless-test-project/dev/1701242216679-2023-11-29T07:16:56.679Z/serverless-test-project.zip"
        },
        "Handler": "rule-handler.handleRule",
        "Runtime": "nodejs18.x",
        "FunctionName": "serverless-test-project-dev-eventsRule",
        "MemorySize": 1024,
        "Timeout": 6,
        "Role": {
          "Fn::GetAtt": [
            "IamRoleLambdaExecution",
            "Arn"
          ]
        }
      },
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
      }
    },
    "HelloLambdaVersioncvZrQjYr4FdYsM3CaTj5TKuOJmUjyL07tfIDVXBSw4": {
      "Type": "AWS::Lambda::Version",
      "DeletionPolicy": "Retain",
      "Properties": {
        "FunctionName": {
          "Ref": "HelloLambdaFunction"
        },
        "CodeSha256": "8+6CAXAhHnCOtQPN1A6d4fRjjFV13css2+2nirSNse0="
      }
    },
    "PingLambdaVersionSQcuddhSFqI0xKYCyuQTTJMvwrlKCB77CNQ16xyQ": {
      "Type": "AWS::Lambda::Version",
      "DeletionPolicy": "Retain",
      "Properties": {
        "FunctionName": {
          "Ref": "PingLambdaFunction"
        },
        "CodeSha256": "8+6CAXAhHnCOtQPN1A6d4fRjjFV13css2+2nirSNse0="
      }
    },
    "ThrottlerLambdaVersion0UeWLgxZYywcyV3gGiutpyCQJEbO6Gk8zSSOP7dMEps": {
      "Type": "AWS::Lambda::Version",
      "DeletionPolicy": "Retain",
      "Properties": {
        "FunctionName": {
          "Ref": "ThrottlerLambdaFunction"
        },
        "CodeSha256": "8+6CAXAhHnCOtQPN1A6d4fRjjFV13css2+2nirSNse0="
      }
    },
    "DriveStreamLambdaVersionsWkqlV7IV7mJdqIqQToVljMizTzZoDCso7qMazjI": {
      "Type": "AWS::Lambda::Version",
      "DeletionPolicy": "Retain",
      "Properties": {
        "FunctionName": {
          "Ref": "DriveStreamLambdaFunction"
        },
        "CodeSha256": "8+6CAXAhHnCOtQPN1A6d4fRjjFV13css2+2nirSNse0="
      }
    },
    "DriveQueueLambdaVersionTmzx8HCxfunJ3etrLOOYLg8zG05MzRauykeVpZFz8WY": {
      "Type": "AWS::Lambda::Version",
      "DeletionPolicy": "Retain",
      "Properties": {
        "FunctionName": {
          "Ref": "DriveQueueLambdaFunction"
        },
        "CodeSha256": "8+6CAXAhHnCOtQPN1A6d4fRjjFV13css2+2nirSNse0="
      }
    },
    "DriveTableLambdaVersionkqI0DCnUasgza04mnCpqj0q5vePTOojYtyi4hxfE3ME": {
      "Type": "AWS::Lambda::Version",
      "DeletionPolicy": "Retain",
      "Properties": {
        "FunctionName": {
          "Ref": "DriveTableLambdaFunction"
        },
        "CodeSha256": "8+6CAXAhHnCOtQPN1A6d4fRjjFV13css2+2nirSNse0="
      }
    },
    "StreamProcessorLambdaVersion24Kwch4oq5ogXKcIDJuLGB1qAJWt8aqgW43aCjKI": {
      "Type": "AWS::Lambda::Version",
      "DeletionPolicy": "Retain",
      "Properties": {
        "FunctionName": {
          "Ref": "StreamProcessorLambdaFunction"
        },
        "CodeSha256": "8+6CAXAhHnCOtQPN1A6d4fRjjFV13css2+2nirSNse0="
      }
    },
    "HttpGetterLambdaVersionvK2ALwc1DFqBccIyulxoBU3GveALO98nQc2xP94J8": {
      "Type": "AWS::Lambda::Version",
      "DeletionPolicy": "Retain",
      "Properties": {
        "FunctionName": {
          "Ref": "HttpGetterLambdaFunction"
        },
        "CodeSha256": "8+6CAXAhHnCOtQPN1A6d4fRjjFV13css2+2nirSNse0="
      }
    },
    "SubscriptionHandlerLambdaVersion4kKEYaIgWsMN0XYzRQn4VAailfQcZ23kdSSOKepfB4A": {
      "Type": "AWS::Lambda::Version",
      "DeletionPolicy": "Retain",
      "Properties": {
        "FunctionName": {
          "Ref": "SubscriptionHandlerLambdaFunction"
        },
        "CodeSha256": "8+6CAXAhHnCOtQPN1A6d4fRjjFV13css2+2nirSNse0="
      }
    },
    "EventsRuleLambdaVersionxBuN447jfeozyKD2CEV3oCIHhShTUOVe5XKOkBlbchQ": {
      "Type": "AWS::Lambda::Version",
      "DeletionPolicy": "Retain",
      "Properties": {
        "FunctionName": {
          "Ref": "EventsRuleLambdaFunction"
        },
        "CodeSha256": "8+6CAXAhHnCOtQPN1A6d4fRjjFV13css2+2nirSNse0="
      }
    },
    "WorkflowRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
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
          ]
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
      }
    },
    "ExpressWorkflowRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
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
          ]
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
      }
    },
    "Workflow": {
      "Type": "AWS::StepFunctions::StateMachine",
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
        "RoleArn": {
          "Fn::GetAtt": [
            "WorkflowRole",
            "Arn"
          ]
        },
        "LoggingConfiguration": {
          "Level": "ALL",
          "IncludeExecutionData": true,
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
          ]
        },
        "StateMachineName": "Workflow"
      },
      "DependsOn": [
        "WorkflowRole"
      ]
    },
    "ExpressWorkflow": {
      "Type": "AWS::StepFunctions::StateMachine",
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
        "RoleArn": {
          "Fn::GetAtt": [
            "ExpressWorkflowRole",
            "Arn"
          ]
        },
        "StateMachineType": "EXPRESS",
        "LoggingConfiguration": {
          "Level": "ALL",
          "IncludeExecutionData": true,
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
          ]
        },
        "StateMachineName": "ExpressWorkflow"
      },
      "DependsOn": [
        "ExpressWorkflowRole"
      ]
    },
    "ApiGatewayRestApi": {
      "Type": "AWS::ApiGateway::RestApi",
      "Properties": {
        "Name": "dev-serverless-test-project",
        "EndpointConfiguration": {
          "Types": [
            "REGIONAL"
          ]
        },
        "Policy": ""
      }
    },
    "ApiGatewayResourceItem": {
      "Type": "AWS::ApiGateway::Resource",
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
      }
    },
    "ApiGatewayResourceSubscription": {
      "Type": "AWS::ApiGateway::Resource",
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
      }
    },
    "ApiGatewayMethodItemGet": {
      "Type": "AWS::ApiGateway::Method",
      "Properties": {
        "HttpMethod": "GET",
        "RequestParameters": {},
        "ResourceId": {
          "Ref": "ApiGatewayResourceItem"
        },
        "RestApiId": {
          "Ref": "ApiGatewayRestApi"
        },
        "ApiKeyRequired": false,
        "AuthorizationType": "NONE",
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
        "MethodResponses": []
      },
      "DependsOn": [
        "HttpGetterLambdaPermissionApiGateway"
      ]
    },
    "ApiGatewayMethodSubscriptionPost": {
      "Type": "AWS::ApiGateway::Method",
      "Properties": {
        "HttpMethod": "POST",
        "RequestParameters": {},
        "ResourceId": {
          "Ref": "ApiGatewayResourceSubscription"
        },
        "RestApiId": {
          "Ref": "ApiGatewayRestApi"
        },
        "ApiKeyRequired": false,
        "AuthorizationType": "NONE",
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
        "MethodResponses": []
      },
      "DependsOn": [
        "SubscriptionHandlerLambdaPermissionApiGateway"
      ]
    },
    "ApiGatewayDeployment1701242215363": {
      "Type": "AWS::ApiGateway::Deployment",
      "Properties": {
        "RestApiId": {
          "Ref": "ApiGatewayRestApi"
        },
        "StageName": "dev"
      },
      "DependsOn": [
        "ApiGatewayMethodItemGet",
        "ApiGatewayMethodSubscriptionPost"
      ]
    },
    "HttpGetterLambdaPermissionApiGateway": {
      "Type": "AWS::Lambda::Permission",
      "Properties": {
        "FunctionName": {
          "Fn::GetAtt": [
            "HttpGetterLambdaFunction",
            "Arn"
          ]
        },
        "Action": "lambda:InvokeFunction",
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
      }
    },
    "SubscriptionHandlerLambdaPermissionApiGateway": {
      "Type": "AWS::Lambda::Permission",
      "Properties": {
        "FunctionName": {
          "Fn::GetAtt": [
            "SubscriptionHandlerLambdaFunction",
            "Arn"
          ]
        },
        "Action": "lambda:InvokeFunction",
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
      }
    },
    "StreamProcessorEventSourceMappingKinesisStream": {
      "Type": "AWS::Lambda::EventSourceMapping",
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
        "StartingPosition": "LATEST",
        "MaximumRetryAttempts": 0
      }
    },
    "ServerlesstestprojectdeveventsRulerule1EventBridgeRule": {
      "Type": "AWS::Events::Rule",
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
      }
    },
    "EventsRuleEventBridgeLambdaPermission1": {
      "Type": "AWS::Lambda::Permission",
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
      }
    },
    "stream": {
      "Type": "AWS::Kinesis::Stream",
      "Properties": {
        "Name": {
          "Fn::Sub": "slic-watch-test-project-stream-\${AWS::AccountId}-\${AWS::Region}"
        },
        "ShardCount": 1
      }
    },
    "bucket": {
      "Type": "AWS::S3::Bucket",
      "Properties": {
        "BucketName": {
          "Fn::Sub": "slic-watch-test-project-bucket-\${AWS::AccountId}-\${AWS::Region}"
        }
      }
    },
    "dataTable": {
      "Type": "AWS::DynamoDB::Table",
      "DeletionPolicy": "Delete",
      "Properties": {
        "TableName": "MyTable",
        "ProvisionedThroughput": {
          "ReadCapacityUnits": 1,
          "WriteCapacityUnits": 1
        },
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
        ]
      }
    },
    "regularQueue": {
      "Type": "AWS::SQS::Queue",
      "Properties": {
        "QueueName": "SomeRegularQueue"
      }
    },
    "fifoQueue": {
      "Type": "AWS::SQS::Queue",
      "Properties": {
        "QueueName": "SomeFifoQueue.fifo",
        "FifoQueue": true
      }
    },
    "workflowLogGroup": {
      "Type": "AWS::Logs::LogGroup",
      "Properties": {
        "LogGroupName": "WorkflowLogs",
        "RetentionInDays": 1
      }
    },
    "expressWorkflowLogGroup": {
      "Type": "AWS::Logs::LogGroup",
      "Properties": {
        "LogGroupName": "ExpressWorkflowLogs",
        "RetentionInDays": 1
      }
    },
    "vpc": {
      "Type": "AWS::EC2::VPC",
      "Properties": {
        "CidrBlock": "10.0.0.0/16"
      }
    },
    "subnet": {
      "Type": "AWS::EC2::Subnet",
      "Properties": {
        "AvailabilityZone": "eu-west-1a",
        "CidrBlock": "10.0.16.0/20",
        "VpcId": {
          "Ref": "vpc"
        }
      }
    },
    "ecsCluster": {
      "Type": "AWS::ECS::Cluster",
      "Properties": {
        "ClusterName": "awesome-cluster"
      }
    },
    "ecsService": {
      "Type": "AWS::ECS::Service",
      "Properties": {
        "ServiceName": "awesome-service",
        "Cluster": {
          "Ref": "ecsCluster"
        },
        "DesiredCount": 0,
        "LaunchType": "FARGATE",
        "TaskDefinition": {
          "Ref": "taskDef"
        },
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
        }
      }
    },
    "taskDef": {
      "Type": "AWS::ECS::TaskDefinition",
      "Properties": {
        "RequiresCompatibilities": [
          "FARGATE"
        ],
        "Cpu": 256,
        "Memory": 512,
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
        "NetworkMode": "awsvpc"
      }
    },
    "topic": {
      "Type": "AWS::SNS::Topic",
      "Properties": {
        "TopicName": {
          "Fn::Sub": "slic-watch-test-project-topic-\${AWS::AccountId}-\${AWS::Region}"
        }
      }
    },
    "subscriptionTest": {
      "Type": "AWS::SNS::Subscription",
      "Properties": {
        "Endpoint": {
          "Fn::Sub": "https://\${ApiGatewayRestApi}.execute-api.\${AWS::Region}.amazonaws.com/dev/subscription"
        },
        "Protocol": "https",
        "TopicArn": {
          "Ref": "topic"
        }
      }
    },
    "slicWatchDashboard": {
      "Type": "AWS::CloudWatch::Dashboard",
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
                        "stat": "Sum"
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
                      "5XXError",
                      "ApiName",
                      "dev-serverless-test-project",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "4XXError",
                      "ApiName",
                      "dev-serverless-test-project",
                      {
                        "stat": "Sum"
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
                      "5XXError",
                      "ApiName",
                      "dev-serverless-test-project",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "4XXError",
                      "ApiName",
                      "dev-serverless-test-project",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "Latency",
                      "ApiName",
                      "dev-serverless-test-project",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "Latency",
                      "ApiName",
                      "dev-serverless-test-project",
                      {
                        "stat": "p95"
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
                      "5XXError",
                      "ApiName",
                      "dev-serverless-test-project",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "4XXError",
                      "ApiName",
                      "dev-serverless-test-project",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "Latency",
                      "ApiName",
                      "dev-serverless-test-project",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "Latency",
                      "ApiName",
                      "dev-serverless-test-project",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "Count",
                      "ApiName",
                      "dev-serverless-test-project",
                      {
                        "stat": "Sum"
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
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/States",
                      "ExecutionThrottled",
                      "StateMachineArn",
                      "\${Workflow}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/States",
                      "ExecutionsTimedOut",
                      "StateMachineArn",
                      "\${Workflow}",
                      {
                        "stat": "Sum"
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
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/States",
                      "ExecutionThrottled",
                      "StateMachineArn",
                      "\${ExpressWorkflow}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/States",
                      "ExecutionsTimedOut",
                      "StateMachineArn",
                      "\${ExpressWorkflow}",
                      {
                        "stat": "Sum"
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
                        "stat": "Sum"
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
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/DynamoDB",
                      "ReadThrottleEvents",
                      "TableName",
                      "\${dataTable}",
                      "GlobalSecondaryIndex",
                      "GSI1",
                      {
                        "stat": "Sum"
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
                      "ReadThrottleEvents",
                      "TableName",
                      "\${dataTable}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/DynamoDB",
                      "ReadThrottleEvents",
                      "TableName",
                      "\${dataTable}",
                      "GlobalSecondaryIndex",
                      "GSI1",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/DynamoDB",
                      "WriteThrottleEvents",
                      "TableName",
                      "\${dataTable}",
                      {
                        "stat": "Sum"
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
                      "ReadThrottleEvents",
                      "TableName",
                      "\${dataTable}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/DynamoDB",
                      "ReadThrottleEvents",
                      "TableName",
                      "\${dataTable}",
                      "GlobalSecondaryIndex",
                      "GSI1",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/DynamoDB",
                      "WriteThrottleEvents",
                      "TableName",
                      "\${dataTable}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/DynamoDB",
                      "WriteThrottleEvents",
                      "TableName",
                      "\${dataTable}",
                      "GlobalSecondaryIndex",
                      "GSI1",
                      {
                        "stat": "Sum"
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
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${PingLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${ThrottlerLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${DriveStreamLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${DriveQueueLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${DriveTableLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${StreamProcessorLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${HttpGetterLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${SubscriptionHandlerLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${EventsRuleLambdaFunction}",
                      {
                        "stat": "Sum"
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
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${PingLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${ThrottlerLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${DriveStreamLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${DriveQueueLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${DriveTableLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${StreamProcessorLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${HttpGetterLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${SubscriptionHandlerLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${EventsRuleLambdaFunction}",
                      {
                        "stat": "Sum"
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
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${PingLambdaFunction}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${ThrottlerLambdaFunction}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveStreamLambdaFunction}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveQueueLambdaFunction}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveTableLambdaFunction}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${StreamProcessorLambdaFunction}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${HttpGetterLambdaFunction}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${SubscriptionHandlerLambdaFunction}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${EventsRuleLambdaFunction}",
                      {
                        "stat": "Average"
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
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${PingLambdaFunction}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${ThrottlerLambdaFunction}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveStreamLambdaFunction}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveQueueLambdaFunction}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveTableLambdaFunction}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${StreamProcessorLambdaFunction}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${HttpGetterLambdaFunction}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${SubscriptionHandlerLambdaFunction}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${EventsRuleLambdaFunction}",
                      {
                        "stat": "p95"
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
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${PingLambdaFunction}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${ThrottlerLambdaFunction}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveStreamLambdaFunction}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveQueueLambdaFunction}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveTableLambdaFunction}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${StreamProcessorLambdaFunction}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${HttpGetterLambdaFunction}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${SubscriptionHandlerLambdaFunction}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${EventsRuleLambdaFunction}",
                      {
                        "stat": "Maximum"
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
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${PingLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${ThrottlerLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${DriveStreamLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${DriveQueueLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${DriveTableLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${StreamProcessorLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${HttpGetterLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${SubscriptionHandlerLambdaFunction}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${EventsRuleLambdaFunction}",
                      {
                        "stat": "Sum"
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
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${PingLambdaFunction}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${ThrottlerLambdaFunction}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${DriveStreamLambdaFunction}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${DriveQueueLambdaFunction}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${DriveTableLambdaFunction}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${StreamProcessorLambdaFunction}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${HttpGetterLambdaFunction}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${SubscriptionHandlerLambdaFunction}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${EventsRuleLambdaFunction}",
                      {
                        "stat": "Maximum"
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
                        "stat": "Maximum"
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
                        "stat": "Maximum"
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
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Kinesis",
                      "PutRecords.Success",
                      "StreamName",
                      "\${stream}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Kinesis",
                      "GetRecords.Success",
                      "StreamName",
                      "\${stream}",
                      {
                        "stat": "Average"
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
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Kinesis",
                      "WriteProvisionedThroughputExceeded",
                      "StreamName",
                      "\${stream}",
                      {
                        "stat": "Sum"
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
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/SQS",
                      "NumberOfMessagesReceived",
                      "QueueName",
                      "\${regularQueue.QueueName}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/SQS",
                      "NumberOfMessagesDeleted",
                      "QueueName",
                      "\${regularQueue.QueueName}",
                      {
                        "stat": "Sum"
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
                        "stat": "Maximum"
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
                        "stat": "Maximum"
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
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/SQS",
                      "NumberOfMessagesReceived",
                      "QueueName",
                      "\${fifoQueue.QueueName}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/SQS",
                      "NumberOfMessagesDeleted",
                      "QueueName",
                      "\${fifoQueue.QueueName}",
                      {
                        "stat": "Sum"
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
                        "stat": "Maximum"
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
                        "stat": "Maximum"
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
                        "stat": "Average"
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
                        "stat": "Average"
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
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/SNS",
                      "NumberOfNotificationsFailed",
                      "TopicName",
                      "\${topic.TopicName}",
                      {
                        "stat": "Sum"
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
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Events",
                      "ThrottledRules",
                      "RuleName",
                      "\${ServerlesstestprojectdeveventsRulerule1EventBridgeRule}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Events",
                      "Invocations",
                      "RuleName",
                      "\${ServerlesstestprojectdeveventsRulerule1EventBridgeRule}",
                      {
                        "stat": "Sum"
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
              }
            ]
          }
        }
      }
    },
    "slicWatchLambdaErrorsAlarmHelloLambdaFunction": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${HelloLambdaFunction}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${HelloLambdaFunction} breaches 0",
            {}
          ]
        },
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloLambdaFunction"
            }
          }
        ],
        "Statistic": "Sum",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 0
      }
    },
    "slicWatchLambdaThrottlesAlarmHelloLambdaFunction": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${HelloLambdaFunction}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${HelloLambdaFunction} breaches 0",
            {}
          ]
        },
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
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 0
      }
    },
    "slicWatchLambdaDurationAlarmHelloLambdaFunction": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${HelloLambdaFunction}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${HelloLambdaFunction} breaches 95% of timeout (6)",
            {}
          ]
        },
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloLambdaFunction"
            }
          }
        ],
        "Statistic": "Maximum",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 5700
      }
    },
    "slicWatchApi5XXErrorAlarmdevserverlesstestproject": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "ApiGW_5XXError_dev-serverless-test-project",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "API Gateway 5XXError Average for dev-serverless-test-project breaches 0",
            {}
          ]
        },
        "MetricName": "5XXError",
        "Namespace": "AWS/ApiGateway",
        "Dimensions": [
          {
            "Name": "ApiName",
            "Value": "dev-serverless-test-project"
          }
        ],
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Average",
        "Threshold": 0
      }
    },
    "slicWatchApi4XXErrorAlarmdevserverlesstestproject": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "ApiGW_4XXError_dev-serverless-test-project",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "API Gateway 4XXError Average for dev-serverless-test-project breaches 0.05",
            {}
          ]
        },
        "MetricName": "4XXError",
        "Namespace": "AWS/ApiGateway",
        "Dimensions": [
          {
            "Name": "ApiName",
            "Value": "dev-serverless-test-project"
          }
        ],
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Average",
        "Threshold": 0.05
      }
    },
    "slicWatchApiLatencyAlarmdevserverlesstestproject": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "ApiGW_Latency_dev-serverless-test-project",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "API Gateway Latency p99 for dev-serverless-test-project breaches 5000",
            {}
          ]
        },
        "MetricName": "Latency",
        "Namespace": "AWS/ApiGateway",
        "Dimensions": [
          {
            "Name": "ApiName",
            "Value": "dev-serverless-test-project"
          }
        ],
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "ExtendedStatistic": "p99",
        "Threshold": 5000
      }
    },
    "slicWatchStatesExecutionThrottledAlarmWorkflow": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "MetricName": "ExecutionThrottled",
        "Namespace": "AWS/States",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "Workflow"
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionThrottledAlarm_\${Workflow.Name}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionThrottled Sum for \${Workflow.Name}  breaches 0",
            {}
          ]
        },
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 0
      }
    },
    "slicWatchStatesExecutionsFailedAlarmWorkflow": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "MetricName": "ExecutionsFailed",
        "Namespace": "AWS/States",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "Workflow"
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionsFailedAlarm_\${Workflow.Name}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionsFailed Sum for \${Workflow.Name}  breaches 0",
            {}
          ]
        },
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 0
      }
    },
    "slicWatchStatesExecutionsTimedOutAlarmWorkflow": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "MetricName": "ExecutionsTimedOut",
        "Namespace": "AWS/States",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "Workflow"
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionsTimedOutAlarm_\${Workflow.Name}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionsTimedOut Sum for \${Workflow.Name}  breaches 0",
            {}
          ]
        },
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 0
      }
    },
    "slicWatchStatesExecutionThrottledAlarmExpressWorkflow": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "MetricName": "ExecutionThrottled",
        "Namespace": "AWS/States",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "ExpressWorkflow"
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionThrottledAlarm_\${ExpressWorkflow.Name}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionThrottled Sum for \${ExpressWorkflow.Name}  breaches 0",
            {}
          ]
        },
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 0
      }
    },
    "slicWatchStatesExecutionsFailedAlarmExpressWorkflow": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "MetricName": "ExecutionsFailed",
        "Namespace": "AWS/States",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "ExpressWorkflow"
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionsFailedAlarm_\${ExpressWorkflow.Name}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionsFailed Sum for \${ExpressWorkflow.Name}  breaches 0",
            {}
          ]
        },
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 0
      }
    },
    "slicWatchStatesExecutionsTimedOutAlarmExpressWorkflow": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "MetricName": "ExecutionsTimedOut",
        "Namespace": "AWS/States",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "ExpressWorkflow"
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionsTimedOutAlarm_\${ExpressWorkflow.Name}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionsTimedOut Sum for \${ExpressWorkflow.Name}  breaches 0",
            {}
          ]
        },
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 0
      }
    },
    "slicWatchTableReadThrottleEventsAlarmdataTable": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "DDB_ReadThrottleEvents_Alarm_\${dataTable}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${dataTable} breaches 10",
            {}
          ]
        },
        "MetricName": "ReadThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "dataTable"
            }
          }
        ],
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 10
      }
    },
    "slicWatchTableWriteThrottleEventsAlarmdataTable": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "DDB_WriteThrottleEvents_Alarm_\${dataTable}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${dataTable} breaches 10",
            {}
          ]
        },
        "MetricName": "WriteThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "dataTable"
            }
          }
        ],
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 10
      }
    },
    "slicWatchTableUserErrorsAlarmdataTable": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "DDB_UserErrors_Alarm_\${dataTable}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${dataTable} breaches 0",
            {}
          ]
        },
        "MetricName": "UserErrors",
        "Namespace": "AWS/DynamoDB",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "dataTable"
            }
          }
        ],
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 0
      }
    },
    "slicWatchTableSystemErrorsAlarmdataTable": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "DDB_SystemErrors_Alarm_\${dataTable}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${dataTable} breaches 0",
            {}
          ]
        },
        "MetricName": "SystemErrors",
        "Namespace": "AWS/DynamoDB",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "dataTable"
            }
          }
        ],
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 0
      }
    },
    "slicWatchGSIReadThrottleEventsAlarmdataTableGSI1": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "DDB_ReadThrottleEvents_Alarm_\${dataTable}GSI1",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${dataTable}GSI1 breaches 10",
            {}
          ]
        },
        "MetricName": "ReadThrottleEvents",
        "Namespace": "AWS/DynamoDB",
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
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 10
      }
    },
    "slicWatchGSIWriteThrottleEventsAlarmdataTableGSI1": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "DDB_WriteThrottleEvents_Alarm_\${dataTable}GSI1",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${dataTable}GSI1 breaches 10",
            {}
          ]
        },
        "MetricName": "WriteThrottleEvents",
        "Namespace": "AWS/DynamoDB",
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
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 10
      }
    },
    "slicWatchKinesisStreamIteratorAgeAlarmStream": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Kinesis_StreamIteratorAge_\${stream}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Kinesis Maximum GetRecords.IteratorAgeMilliseconds for \${stream} breaches 10000 milliseconds",
            {}
          ]
        },
        "MetricName": "GetRecords.IteratorAgeMilliseconds",
        "Namespace": "AWS/Kinesis",
        "Dimensions": [
          {
            "Name": "StreamName",
            "Value": {
              "Ref": "stream"
            }
          }
        ],
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Maximum",
        "Threshold": 10000
      }
    },
    "slicWatchKinesisStreamReadThroughputAlarmStream": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Kinesis_StreamReadThroughput_\${stream}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Kinesis Sum ReadProvisionedThroughputExceeded for \${stream} breaches 0 milliseconds",
            {}
          ]
        },
        "MetricName": "ReadProvisionedThroughputExceeded",
        "Namespace": "AWS/Kinesis",
        "Dimensions": [
          {
            "Name": "StreamName",
            "Value": {
              "Ref": "stream"
            }
          }
        ],
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 0
      }
    },
    "slicWatchKinesisStreamWriteThroughputAlarmStream": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Kinesis_StreamWriteThroughput_\${stream}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Kinesis Sum WriteProvisionedThroughputExceeded for \${stream} breaches 0 milliseconds",
            {}
          ]
        },
        "MetricName": "WriteProvisionedThroughputExceeded",
        "Namespace": "AWS/Kinesis",
        "Dimensions": [
          {
            "Name": "StreamName",
            "Value": {
              "Ref": "stream"
            }
          }
        ],
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 0
      }
    },
    "slicWatchKinesisStreamPutRecordSuccessAlarmStream": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Kinesis_StreamPutRecordSuccess_\${stream}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Kinesis Average PutRecord.Success for \${stream} breaches 1 milliseconds",
            {}
          ]
        },
        "MetricName": "PutRecord.Success",
        "Namespace": "AWS/Kinesis",
        "Dimensions": [
          {
            "Name": "StreamName",
            "Value": {
              "Ref": "stream"
            }
          }
        ],
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "LessThanThreshold",
        "Statistic": "Average",
        "Threshold": 1
      }
    },
    "slicWatchKinesisStreamPutRecordsSuccessAlarmStream": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Kinesis_StreamPutRecordsSuccess_\${stream}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Kinesis Average PutRecords.Success for \${stream} breaches 1 milliseconds",
            {}
          ]
        },
        "MetricName": "PutRecords.Success",
        "Namespace": "AWS/Kinesis",
        "Dimensions": [
          {
            "Name": "StreamName",
            "Value": {
              "Ref": "stream"
            }
          }
        ],
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "LessThanThreshold",
        "Statistic": "Average",
        "Threshold": 1
      }
    },
    "slicWatchKinesisStreamGetRecordsSuccessAlarmStream": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Kinesis_StreamGetRecordsSuccess_\${stream}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Kinesis Average GetRecords.Success for \${stream} breaches 1 milliseconds",
            {}
          ]
        },
        "MetricName": "GetRecords.Success",
        "Namespace": "AWS/Kinesis",
        "Dimensions": [
          {
            "Name": "StreamName",
            "Value": {
              "Ref": "stream"
            }
          }
        ],
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "LessThanThreshold",
        "Statistic": "Average",
        "Threshold": 1
      }
    },
    "slicWatchSQSInFlightMsgsAlarmregularQueue": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "SQS_ApproximateNumberOfMessagesNotVisible_\${regularQueue.QueueName}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "SQS in-flight messages for \${regularQueue.QueueName} breaches 96000 (80% of the hard limit of 120000)",
            {}
          ]
        },
        "MetricName": "ApproximateNumberOfMessagesNotVisible",
        "Namespace": "AWS/SQS",
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
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Maximum",
        "Threshold": 96000
      }
    },
    "slicWatchSQSInFlightMsgsAlarmfifoQueue": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "SQS_ApproximateNumberOfMessagesNotVisible_\${fifoQueue.QueueName}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "SQS in-flight messages for \${fifoQueue.QueueName} breaches 16000 (80% of the hard limit of 20000)",
            {}
          ]
        },
        "MetricName": "ApproximateNumberOfMessagesNotVisible",
        "Namespace": "AWS/SQS",
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
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Maximum",
        "Threshold": 16000
      }
    },
    "slicWatchECSMemoryAlarmecsService": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "ECS_MemoryAlarm_\${ecsService.Name}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "ECS MemoryUtilization for \${ecsService.Name} breaches 90",
            {}
          ]
        },
        "MetricName": "MemoryUtilization",
        "Namespace": "AWS/ECS",
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
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Average",
        "Threshold": 90
      }
    },
    "slicWatchECSCPUAlarmecsService": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "ECS_CPUAlarm_\${ecsService.Name}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "ECS CPUUtilization for \${ecsService.Name} breaches 90",
            {}
          ]
        },
        "MetricName": "CPUUtilization",
        "Namespace": "AWS/ECS",
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
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Average",
        "Threshold": 90
      }
    },
    "slicWatchSNSNumberOfNotificationsFilteredOutInvalidAttributesAlarmTopic": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "MetricName": "NumberOfNotificationsFilteredOut-InvalidAttributes",
        "Namespace": "AWS/SNS",
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
        "AlarmName": {
          "Fn::Sub": [
            "SNS_NumberOfNotificationsFilteredOutInvalidAttributes_Alarm_\${topic.TopicName}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "SNS NumberOfNotificationsFilteredOutInvalidAttributes for \${topic.TopicName} breaches 1",
            {}
          ]
        },
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 1
      }
    },
    "slicWatchSNSNumberOfNotificationsFailedAlarmTopic": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "MetricName": "NumberOfNotificationsFailed",
        "Namespace": "AWS/SNS",
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
        "AlarmName": {
          "Fn::Sub": [
            "SNS_NumberOfNotificationsFailed_Alarm_\${topic.TopicName}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "SNS NumberOfNotificationsFailed for \${topic.TopicName} breaches 1",
            {}
          ]
        },
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 1
      }
    },
    "slicWatchEventsFailedInvocationsAlarmServerlesstestprojectdeveventsRulerule1EventBridgeRule": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "MetricName": "FailedInvocations",
        "Namespace": "AWS/Events",
        "Dimensions": [
          {
            "Name": "RuleName",
            "Value": {
              "Ref": "ServerlesstestprojectdeveventsRulerule1EventBridgeRule"
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Events_FailedInvocations_Alarm_\${ServerlesstestprojectdeveventsRulerule1EventBridgeRule}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "EventBridge FailedInvocations for \${ServerlesstestprojectdeveventsRulerule1EventBridgeRule} breaches 1",
            {}
          ]
        },
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 1
      }
    },
    "slicWatchEventsThrottledRulesAlarmServerlesstestprojectdeveventsRulerule1EventBridgeRule": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "MetricName": "ThrottledRules",
        "Namespace": "AWS/Events",
        "Dimensions": [
          {
            "Name": "RuleName",
            "Value": {
              "Ref": "ServerlesstestprojectdeveventsRulerule1EventBridgeRule"
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Events_ThrottledRules_Alarm_\${ServerlesstestprojectdeveventsRulerule1EventBridgeRule}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "EventBridge ThrottledRules for \${ServerlesstestprojectdeveventsRulerule1EventBridgeRule} breaches 1",
            {}
          ]
        },
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 1
      }
    }
  },
  "Outputs": {
    "ServerlessDeploymentBucketName": {
      "Value": {
        "Ref": "ServerlessDeploymentBucket"
      },
      "Export": {
        "Name": "sls-serverless-test-project-dev-ServerlessDeploymentBucketName"
      }
    },
    "HelloLambdaFunctionQualifiedArn": {
      "Description": "Current Lambda function version",
      "Value": {
        "Ref": "HelloLambdaVersioncvZrQjYr4FdYsM3CaTj5TKuOJmUjyL07tfIDVXBSw4"
      },
      "Export": {
        "Name": "sls-serverless-test-project-dev-HelloLambdaFunctionQualifiedArn"
      }
    },
    "PingLambdaFunctionQualifiedArn": {
      "Description": "Current Lambda function version",
      "Value": {
        "Ref": "PingLambdaVersionSQcuddhSFqI0xKYCyuQTTJMvwrlKCB77CNQ16xyQ"
      },
      "Export": {
        "Name": "sls-serverless-test-project-dev-PingLambdaFunctionQualifiedArn"
      }
    },
    "ThrottlerLambdaFunctionQualifiedArn": {
      "Description": "Current Lambda function version",
      "Value": {
        "Ref": "ThrottlerLambdaVersion0UeWLgxZYywcyV3gGiutpyCQJEbO6Gk8zSSOP7dMEps"
      },
      "Export": {
        "Name": "sls-serverless-test-project-dev-ThrottlerLambdaFunctionQualifiedArn"
      }
    },
    "DriveStreamLambdaFunctionQualifiedArn": {
      "Description": "Current Lambda function version",
      "Value": {
        "Ref": "DriveStreamLambdaVersionsWkqlV7IV7mJdqIqQToVljMizTzZoDCso7qMazjI"
      },
      "Export": {
        "Name": "sls-serverless-test-project-dev-DriveStreamLambdaFunctionQualifiedArn"
      }
    },
    "DriveQueueLambdaFunctionQualifiedArn": {
      "Description": "Current Lambda function version",
      "Value": {
        "Ref": "DriveQueueLambdaVersionTmzx8HCxfunJ3etrLOOYLg8zG05MzRauykeVpZFz8WY"
      },
      "Export": {
        "Name": "sls-serverless-test-project-dev-DriveQueueLambdaFunctionQualifiedArn"
      }
    },
    "DriveTableLambdaFunctionQualifiedArn": {
      "Description": "Current Lambda function version",
      "Value": {
        "Ref": "DriveTableLambdaVersionkqI0DCnUasgza04mnCpqj0q5vePTOojYtyi4hxfE3ME"
      },
      "Export": {
        "Name": "sls-serverless-test-project-dev-DriveTableLambdaFunctionQualifiedArn"
      }
    },
    "StreamProcessorLambdaFunctionQualifiedArn": {
      "Description": "Current Lambda function version",
      "Value": {
        "Ref": "StreamProcessorLambdaVersion24Kwch4oq5ogXKcIDJuLGB1qAJWt8aqgW43aCjKI"
      },
      "Export": {
        "Name": "sls-serverless-test-project-dev-StreamProcessorLambdaFunctionQualifiedArn"
      }
    },
    "HttpGetterLambdaFunctionQualifiedArn": {
      "Description": "Current Lambda function version",
      "Value": {
        "Ref": "HttpGetterLambdaVersionvK2ALwc1DFqBccIyulxoBU3GveALO98nQc2xP94J8"
      },
      "Export": {
        "Name": "sls-serverless-test-project-dev-HttpGetterLambdaFunctionQualifiedArn"
      }
    },
    "SubscriptionHandlerLambdaFunctionQualifiedArn": {
      "Description": "Current Lambda function version",
      "Value": {
        "Ref": "SubscriptionHandlerLambdaVersion4kKEYaIgWsMN0XYzRQn4VAailfQcZ23kdSSOKepfB4A"
      },
      "Export": {
        "Name": "sls-serverless-test-project-dev-SubscriptionHandlerLambdaFunctionQualifiedArn"
      }
    },
    "EventsRuleLambdaFunctionQualifiedArn": {
      "Description": "Current Lambda function version",
      "Value": {
        "Ref": "EventsRuleLambdaVersionxBuN447jfeozyKD2CEV3oCIHhShTUOVe5XKOkBlbchQ"
      },
      "Export": {
        "Name": "sls-serverless-test-project-dev-EventsRuleLambdaFunctionQualifiedArn"
      }
    },
    "WorkflowArn": {
      "Description": "Current StateMachine Arn",
      "Value": {
        "Ref": "Workflow"
      },
      "Export": {
        "Name": "sls-serverless-test-project-dev-WorkflowArn"
      }
    },
    "ExpressWorkflowArn": {
      "Description": "Current StateMachine Arn",
      "Value": {
        "Ref": "ExpressWorkflow"
      },
      "Export": {
        "Name": "sls-serverless-test-project-dev-ExpressWorkflowArn"
      }
    },
    "ServiceEndpoint": {
      "Description": "URL of the service endpoint",
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
      },
      "Export": {
        "Name": "sls-serverless-test-project-dev-ServiceEndpoint"
      }
    }
  }
}
`

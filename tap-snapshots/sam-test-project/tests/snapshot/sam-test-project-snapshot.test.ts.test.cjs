/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`sam-test-project/tests/snapshot/sam-test-project-snapshot.test.ts > TAP > the Macro adds SLIC Watch dashboards and alarms to a transformed SAM template > fragment 1`] = `
{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "sam-test-project",
  "Metadata": {
    "slicWatch": {
      "enabled": true,
      "alarmActionsConfig": {
        "alarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "okActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "actionsEnabled": true
      },
      "alarms": {
        "Lambda": {
          "Invocations": {
            "enabled": true,
            "Threshold": 10
          }
        },
        "SQS": {
          "AgeOfOldestMessage": {
            "Statistic": "Maximum",
            "enabled": true,
            "Threshold": 60
          },
          "InFlightMessagesPc": {
            "Statistic": "Maximum",
            "Threshold": 1
          }
        }
      }
    }
  },
  "Resources": {
    "MonitoringTopic": {
      "Type": "AWS::SNS::Topic",
      "Properties": {
        "TopicName": "SS-Alarm-Topic3"
      },
      "Metadata": {
        "SamResourceId": "MonitoringTopic"
      }
    },
    "stream": {
      "Type": "AWS::Kinesis::Stream",
      "Properties": {
        "ShardCount": 1
      },
      "Metadata": {
        "SamResourceId": "stream"
      }
    },
    "regularQueue": {
      "Type": "AWS::SQS::Queue",
      "Metadata": {
        "SamResourceId": "regularQueue"
      }
    },
    "fifoQueue": {
      "Type": "AWS::SQS::Queue",
      "Properties": {
        "FifoQueue": true
      },
      "Metadata": {
        "SamResourceId": "fifoQueue"
      }
    },
    "vpc": {
      "Type": "AWS::EC2::VPC",
      "Properties": {
        "CidrBlock": "10.0.0.0/16"
      },
      "Metadata": {
        "SamResourceId": "vpc"
      }
    },
    "subnet": {
      "Type": "AWS::EC2::Subnet",
      "Properties": {
        "AvailabilityZone": {
          "Fn::Select": [
            0,
            {
              "Fn::GetAZs": {
                "Ref": "AWS::Region"
              }
            }
          ]
        },
        "CidrBlock": "10.0.16.0/20",
        "VpcId": {
          "Ref": "vpc"
        }
      },
      "Metadata": {
        "SamResourceId": "subnet"
      }
    },
    "ecsCluster": {
      "Type": "AWS::ECS::Cluster",
      "Metadata": {
        "SamResourceId": "ecsCluster"
      }
    },
    "ecsService": {
      "Type": "AWS::ECS::Service",
      "Properties": {
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
      },
      "Metadata": {
        "SamResourceId": "ecsService"
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
      },
      "Metadata": {
        "SamResourceId": "taskDef"
      }
    },
    "dataTable": {
      "Type": "AWS::DynamoDB::Table",
      "DeletionPolicy": "Delete",
      "Properties": {
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
      },
      "Metadata": {
        "SamResourceId": "dataTable"
      }
    },
    "hello": {
      "Type": "AWS::Lambda::Function",
      "Metadata": {
        "SamResourceId": "hello",
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
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/841a60f2d379216bd90fa34e033d0596"
        },
        "Handler": "basic-handler.hello",
        "Role": {
          "Fn::GetAtt": [
            "helloRole",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x",
        "Tags": [
          {
            "Key": "lambda:createdBy",
            "Value": "SAM"
          }
        ]
      }
    },
    "helloRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": [
                "sts:AssumeRole"
              ],
              "Effect": "Allow",
              "Principal": {
                "Service": [
                  "lambda.amazonaws.com"
                ]
              }
            }
          ]
        },
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
        ],
        "Tags": [
          {
            "Key": "lambda:createdBy",
            "Value": "SAM"
          }
        ]
      }
    },
    "ping": {
      "Type": "AWS::Lambda::Function",
      "Metadata": {
        "SamResourceId": "ping",
        "slicWatch": {
          "dashboard": {
            "enabled": false
          }
        }
      },
      "Properties": {
        "Code": {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/841a60f2d379216bd90fa34e033d0596"
        },
        "Handler": "basic-handler.hello",
        "Role": {
          "Fn::GetAtt": [
            "pingRole",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x",
        "Tags": [
          {
            "Key": "lambda:createdBy",
            "Value": "SAM"
          }
        ]
      }
    },
    "pingRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": [
                "sts:AssumeRole"
              ],
              "Effect": "Allow",
              "Principal": {
                "Service": [
                  "lambda.amazonaws.com"
                ]
              }
            }
          ]
        },
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
        ],
        "Tags": [
          {
            "Key": "lambda:createdBy",
            "Value": "SAM"
          }
        ]
      }
    },
    "throttler": {
      "Type": "AWS::Lambda::Function",
      "Metadata": {
        "SamResourceId": "throttler"
      },
      "Properties": {
        "Code": {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/841a60f2d379216bd90fa34e033d0596"
        },
        "Handler": "basic-handler.hello",
        "Role": {
          "Fn::GetAtt": [
            "throttlerRole",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x",
        "Tags": [
          {
            "Key": "lambda:createdBy",
            "Value": "SAM"
          }
        ],
        "ReservedConcurrentExecutions": 0
      }
    },
    "throttlerRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": [
                "sts:AssumeRole"
              ],
              "Effect": "Allow",
              "Principal": {
                "Service": [
                  "lambda.amazonaws.com"
                ]
              }
            }
          ]
        },
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
        ],
        "Tags": [
          {
            "Key": "lambda:createdBy",
            "Value": "SAM"
          }
        ]
      }
    },
    "driveStream": {
      "Type": "AWS::Lambda::Function",
      "Metadata": {
        "SamResourceId": "driveStream"
      },
      "Properties": {
        "Code": {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/841a60f2d379216bd90fa34e033d0596"
        },
        "Handler": "stream-test-handler.handleDrive",
        "Role": {
          "Fn::GetAtt": [
            "driveStreamRole",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x",
        "Tags": [
          {
            "Key": "lambda:createdBy",
            "Value": "SAM"
          }
        ]
      }
    },
    "driveStreamRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": [
                "sts:AssumeRole"
              ],
              "Effect": "Allow",
              "Principal": {
                "Service": [
                  "lambda.amazonaws.com"
                ]
              }
            }
          ]
        },
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
        ],
        "Tags": [
          {
            "Key": "lambda:createdBy",
            "Value": "SAM"
          }
        ]
      }
    },
    "driveQueue": {
      "Type": "AWS::Lambda::Function",
      "Metadata": {
        "SamResourceId": "driveQueue"
      },
      "Properties": {
        "Code": {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/841a60f2d379216bd90fa34e033d0596"
        },
        "Handler": "basic-handler.hello",
        "Role": {
          "Fn::GetAtt": [
            "driveQueueRole",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x",
        "Tags": [
          {
            "Key": "lambda:createdBy",
            "Value": "SAM"
          }
        ]
      }
    },
    "driveQueueRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": [
                "sts:AssumeRole"
              ],
              "Effect": "Allow",
              "Principal": {
                "Service": [
                  "lambda.amazonaws.com"
                ]
              }
            }
          ]
        },
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
        ],
        "Tags": [
          {
            "Key": "lambda:createdBy",
            "Value": "SAM"
          }
        ]
      }
    },
    "driveTable": {
      "Type": "AWS::Lambda::Function",
      "Metadata": {
        "SamResourceId": "driveTable"
      },
      "Properties": {
        "Code": {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/841a60f2d379216bd90fa34e033d0596"
        },
        "Handler": "basic-handler.hello",
        "Role": {
          "Fn::GetAtt": [
            "driveTableRole",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x",
        "Tags": [
          {
            "Key": "lambda:createdBy",
            "Value": "SAM"
          }
        ]
      }
    },
    "driveTableRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": [
                "sts:AssumeRole"
              ],
              "Effect": "Allow",
              "Principal": {
                "Service": [
                  "lambda.amazonaws.com"
                ]
              }
            }
          ]
        },
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
        ],
        "Tags": [
          {
            "Key": "lambda:createdBy",
            "Value": "SAM"
          }
        ]
      }
    },
    "streamProcessor": {
      "Type": "AWS::Lambda::Function",
      "Metadata": {
        "SamResourceId": "streamProcessor"
      },
      "Properties": {
        "Code": {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/841a60f2d379216bd90fa34e033d0596"
        },
        "Handler": "basic-handler.hello",
        "Role": {
          "Fn::GetAtt": [
            "streamProcessorRole",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x",
        "Tags": [
          {
            "Key": "lambda:createdBy",
            "Value": "SAM"
          }
        ]
      }
    },
    "streamProcessorRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": [
                "sts:AssumeRole"
              ],
              "Effect": "Allow",
              "Principal": {
                "Service": [
                  "lambda.amazonaws.com"
                ]
              }
            }
          ]
        },
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
          "arn:aws:iam::aws:policy/service-role/AWSLambdaKinesisExecutionRole"
        ],
        "Tags": [
          {
            "Key": "lambda:createdBy",
            "Value": "SAM"
          }
        ]
      }
    },
    "streamProcessorStream": {
      "Type": "AWS::Lambda::EventSourceMapping",
      "Properties": {
        "EventSourceArn": {
          "Fn::GetAtt": [
            "stream",
            "Arn"
          ]
        },
        "FunctionName": {
          "Ref": "streamProcessor"
        },
        "MaximumRetryAttempts": 0,
        "StartingPosition": "LATEST"
      }
    },
    "httpGetter": {
      "Type": "AWS::Lambda::Function",
      "Metadata": {
        "SamResourceId": "httpGetter"
      },
      "Properties": {
        "Code": {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/841a60f2d379216bd90fa34e033d0596"
        },
        "Handler": "apigw-handler.handleGet",
        "Role": {
          "Fn::GetAtt": [
            "httpGetterRole",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x",
        "Timeout": 30,
        "Tags": [
          {
            "Key": "lambda:createdBy",
            "Value": "SAM"
          }
        ]
      }
    },
    "httpGetterRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": [
                "sts:AssumeRole"
              ],
              "Effect": "Allow",
              "Principal": {
                "Service": [
                  "lambda.amazonaws.com"
                ]
              }
            }
          ]
        },
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
        ],
        "Tags": [
          {
            "Key": "lambda:createdBy",
            "Value": "SAM"
          }
        ]
      }
    },
    "httpGetterHttpApiEventPermission": {
      "Type": "AWS::Lambda::Permission",
      "Properties": {
        "Action": "lambda:InvokeFunction",
        "FunctionName": {
          "Ref": "httpGetter"
        },
        "Principal": "apigateway.amazonaws.com",
        "SourceArn": {
          "Fn::Sub": [
            "arn:\${AWS::Partition}:execute-api:\${AWS::Region}:\${AWS::AccountId}:\${__ApiId__}/\${__Stage__}/GETitem",
            {
              "__ApiId__": {
                "Ref": "ServerlessHttpApi"
              },
              "__Stage__": "*"
            }
          ]
        }
      }
    },
    "eventsRule": {
      "Type": "AWS::Lambda::Function",
      "Metadata": {
        "SamResourceId": "eventsRule",
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
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/841a60f2d379216bd90fa34e033d0596"
        },
        "Handler": "rule-handler.handleRule",
        "Role": {
          "Fn::GetAtt": [
            "eventsRuleRole",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x",
        "Tags": [
          {
            "Key": "lambda:createdBy",
            "Value": "SAM"
          }
        ]
      }
    },
    "eventsRuleRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": [
                "sts:AssumeRole"
              ],
              "Effect": "Allow",
              "Principal": {
                "Service": [
                  "lambda.amazonaws.com"
                ]
              }
            }
          ]
        },
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
        ],
        "Tags": [
          {
            "Key": "lambda:createdBy",
            "Value": "SAM"
          }
        ]
      }
    },
    "eventsRuleTrigger": {
      "Type": "AWS::Events::Rule",
      "Properties": {
        "EventPattern": {
          "detail-type": [
            "Invoke Lambda Function"
          ]
        },
        "Targets": [
          {
            "Arn": {
              "Fn::GetAtt": [
                "eventsRule",
                "Arn"
              ]
            },
            "Id": "eventsRuleTriggerLambdaTarget",
            "RetryPolicy": {
              "MaximumRetryAttempts": 0,
              "MaximumEventAgeInSeconds": 60
            }
          }
        ]
      }
    },
    "eventsRuleTriggerPermission": {
      "Type": "AWS::Lambda::Permission",
      "Properties": {
        "Action": "lambda:InvokeFunction",
        "FunctionName": {
          "Ref": "eventsRule"
        },
        "Principal": "events.amazonaws.com",
        "SourceArn": {
          "Fn::GetAtt": [
            "eventsRuleTrigger",
            "Arn"
          ]
        }
      }
    },
    "TestStateMachine": {
      "Type": "AWS::StepFunctions::StateMachine",
      "Metadata": {
        "SamResourceId": "TestStateMachine"
      },
      "Properties": {
        "DefinitionS3Location": {
          "Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "Key": "sam-test-project/754f906d12f592f99c5651c04a6a0a51"
        },
        "RoleArn": {
          "Fn::GetAtt": [
            "TestStateMachineRole",
            "Arn"
          ]
        },
        "Tags": [
          {
            "Key": "stateMachine:createdBy",
            "Value": "SAM"
          }
        ],
        "DefinitionSubstitutions": {
          "HelloArn": {
            "Fn::GetAtt": [
              "hello",
              "Arn"
            ]
          },
          "AnotherHelloArn": {
            "Fn::GetAtt": [
              "hello",
              "Arn"
            ]
          }
        }
      }
    },
    "TestStateMachineRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Action": [
                "sts:AssumeRole"
              ],
              "Effect": "Allow",
              "Principal": {
                "Service": [
                  "states.amazonaws.com"
                ]
              }
            }
          ]
        },
        "ManagedPolicyArns": [],
        "Policies": [
          {
            "PolicyName": "TestStateMachineRolePolicy0",
            "PolicyDocument": {
              "Statement": [
                {
                  "Action": [
                    "lambda:InvokeFunction"
                  ],
                  "Effect": "Allow",
                  "Resource": {
                    "Fn::Sub": [
                      "arn:\${AWS::Partition}:lambda:\${AWS::Region}:\${AWS::AccountId}:function:\${functionName}*",
                      {
                        "functionName": {
                          "Ref": "hello"
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            "PolicyName": "TestStateMachineRolePolicy1",
            "PolicyDocument": {
              "Statement": [
                {
                  "Action": [
                    "lambda:InvokeFunction"
                  ],
                  "Effect": "Allow",
                  "Resource": {
                    "Fn::Sub": [
                      "arn:\${AWS::Partition}:lambda:\${AWS::Region}:\${AWS::AccountId}:function:\${functionName}*",
                      {
                        "functionName": {
                          "Ref": "hello"
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ],
        "Tags": [
          {
            "Key": "stateMachine:createdBy",
            "Value": "SAM"
          }
        ]
      }
    },
    "ServerlessHttpApi": {
      "Type": "AWS::ApiGatewayV2::Api",
      "Properties": {
        "Body": {
          "info": {
            "version": "1.0",
            "title": {
              "Ref": "AWS::StackName"
            }
          },
          "paths": {
            "item": {
              "get": {
                "x-amazon-apigateway-integration": {
                  "httpMethod": "POST",
                  "type": "aws_proxy",
                  "uri": {
                    "Fn::Sub": "arn:\${AWS::Partition}:apigateway:\${AWS::Region}:lambda:path/2015-03-31/functions/\${httpGetter.Arn}/invocations"
                  },
                  "payloadFormatVersion": "2.0"
                },
                "responses": {}
              }
            }
          },
          "openapi": "3.0.1",
          "tags": [
            {
              "name": "httpapi:createdBy",
              "x-amazon-apigateway-tag-value": "SAM"
            }
          ]
        }
      }
    },
    "ServerlessHttpApiApiGatewayDefaultStage": {
      "Type": "AWS::ApiGatewayV2::Stage",
      "Properties": {
        "ApiId": {
          "Ref": "ServerlessHttpApi"
        },
        "StageName": "$default",
        "Tags": {
          "httpapi:createdBy": "SAM"
        },
        "AutoDeploy": true
      }
    },
    "slicWatchLambdaErrorsAlarmhello": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${hello}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${hello} breaches 0",
            {}
          ]
        },
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "hello"
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
    "slicWatchLambdaThrottlesAlarmhello": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${hello}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${hello} breaches 0",
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
                      "Ref": "hello"
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
                      "Ref": "hello"
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
    "slicWatchLambdaDurationAlarmhello": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${hello}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${hello} breaches 95% of timeout (3)",
            {}
          ]
        },
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "hello"
            }
          }
        ],
        "Statistic": "Maximum",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 2850
      }
    },
    "slicWatchLambdaInvocationsAlarmhello": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${hello}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${hello} breaches 2",
            {}
          ]
        },
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "hello"
            }
          }
        ],
        "Statistic": "Sum",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 2
      }
    },
    "slicWatchLambdaIteratorAgeAlarmstreamProcessor": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_IteratorAge_\${streamProcessor}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "IteratorAge for \${streamProcessor} breaches 10000",
            {}
          ]
        },
        "MetricName": "IteratorAge",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "streamProcessor"
            }
          }
        ],
        "Statistic": "Maximum",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 10000
      }
    },
    "slicWatchLambdaErrorsAlarmping": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${ping}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${ping} breaches 0",
            {}
          ]
        },
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "ping"
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
    "slicWatchLambdaThrottlesAlarmping": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${ping}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${ping} breaches 0",
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
                      "Ref": "ping"
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
                      "Ref": "ping"
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
    "slicWatchLambdaDurationAlarmping": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${ping}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${ping} breaches 95% of timeout (3)",
            {}
          ]
        },
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "ping"
            }
          }
        ],
        "Statistic": "Maximum",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 2850
      }
    },
    "slicWatchLambdaInvocationsAlarmping": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${ping}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${ping} breaches 10",
            {}
          ]
        },
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "ping"
            }
          }
        ],
        "Statistic": "Sum",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 10
      }
    },
    "slicWatchLambdaErrorsAlarmthrottler": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${throttler}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${throttler} breaches 0",
            {}
          ]
        },
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "throttler"
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
    "slicWatchLambdaThrottlesAlarmthrottler": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${throttler}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${throttler} breaches 0",
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
                      "Ref": "throttler"
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
                      "Ref": "throttler"
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
    "slicWatchLambdaDurationAlarmthrottler": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${throttler}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${throttler} breaches 95% of timeout (3)",
            {}
          ]
        },
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "throttler"
            }
          }
        ],
        "Statistic": "Maximum",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 2850
      }
    },
    "slicWatchLambdaInvocationsAlarmthrottler": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${throttler}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${throttler} breaches 10",
            {}
          ]
        },
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "throttler"
            }
          }
        ],
        "Statistic": "Sum",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 10
      }
    },
    "slicWatchLambdaErrorsAlarmdriveStream": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${driveStream}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${driveStream} breaches 0",
            {}
          ]
        },
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "driveStream"
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
    "slicWatchLambdaThrottlesAlarmdriveStream": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${driveStream}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${driveStream} breaches 0",
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
                      "Ref": "driveStream"
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
                      "Ref": "driveStream"
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
    "slicWatchLambdaDurationAlarmdriveStream": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${driveStream}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${driveStream} breaches 95% of timeout (3)",
            {}
          ]
        },
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "driveStream"
            }
          }
        ],
        "Statistic": "Maximum",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 2850
      }
    },
    "slicWatchLambdaInvocationsAlarmdriveStream": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${driveStream}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${driveStream} breaches 10",
            {}
          ]
        },
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "driveStream"
            }
          }
        ],
        "Statistic": "Sum",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 10
      }
    },
    "slicWatchLambdaErrorsAlarmdriveQueue": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${driveQueue}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${driveQueue} breaches 0",
            {}
          ]
        },
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "driveQueue"
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
    "slicWatchLambdaThrottlesAlarmdriveQueue": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${driveQueue}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${driveQueue} breaches 0",
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
                      "Ref": "driveQueue"
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
                      "Ref": "driveQueue"
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
    "slicWatchLambdaDurationAlarmdriveQueue": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${driveQueue}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${driveQueue} breaches 95% of timeout (3)",
            {}
          ]
        },
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "driveQueue"
            }
          }
        ],
        "Statistic": "Maximum",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 2850
      }
    },
    "slicWatchLambdaInvocationsAlarmdriveQueue": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${driveQueue}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${driveQueue} breaches 10",
            {}
          ]
        },
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "driveQueue"
            }
          }
        ],
        "Statistic": "Sum",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 10
      }
    },
    "slicWatchLambdaErrorsAlarmdriveTable": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${driveTable}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${driveTable} breaches 0",
            {}
          ]
        },
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "driveTable"
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
    "slicWatchLambdaThrottlesAlarmdriveTable": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${driveTable}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${driveTable} breaches 0",
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
                      "Ref": "driveTable"
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
                      "Ref": "driveTable"
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
    "slicWatchLambdaDurationAlarmdriveTable": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${driveTable}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${driveTable} breaches 95% of timeout (3)",
            {}
          ]
        },
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "driveTable"
            }
          }
        ],
        "Statistic": "Maximum",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 2850
      }
    },
    "slicWatchLambdaInvocationsAlarmdriveTable": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${driveTable}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${driveTable} breaches 10",
            {}
          ]
        },
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "driveTable"
            }
          }
        ],
        "Statistic": "Sum",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 10
      }
    },
    "slicWatchLambdaErrorsAlarmstreamProcessor": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${streamProcessor}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${streamProcessor} breaches 0",
            {}
          ]
        },
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "streamProcessor"
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
    "slicWatchLambdaThrottlesAlarmstreamProcessor": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${streamProcessor}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${streamProcessor} breaches 0",
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
                      "Ref": "streamProcessor"
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
                      "Ref": "streamProcessor"
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
    "slicWatchLambdaDurationAlarmstreamProcessor": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${streamProcessor}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${streamProcessor} breaches 95% of timeout (3)",
            {}
          ]
        },
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "streamProcessor"
            }
          }
        ],
        "Statistic": "Maximum",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 2850
      }
    },
    "slicWatchLambdaInvocationsAlarmstreamProcessor": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${streamProcessor}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${streamProcessor} breaches 10",
            {}
          ]
        },
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "streamProcessor"
            }
          }
        ],
        "Statistic": "Sum",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 10
      }
    },
    "slicWatchLambdaErrorsAlarmhttpGetter": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${httpGetter}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${httpGetter} breaches 0",
            {}
          ]
        },
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "httpGetter"
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
    "slicWatchLambdaThrottlesAlarmhttpGetter": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${httpGetter}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${httpGetter} breaches 0",
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
                      "Ref": "httpGetter"
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
                      "Ref": "httpGetter"
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
    "slicWatchLambdaDurationAlarmhttpGetter": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${httpGetter}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${httpGetter} breaches 95% of timeout (30)",
            {}
          ]
        },
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "httpGetter"
            }
          }
        ],
        "Statistic": "Maximum",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 28500
      }
    },
    "slicWatchLambdaInvocationsAlarmhttpGetter": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${httpGetter}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${httpGetter} breaches 10",
            {}
          ]
        },
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "httpGetter"
            }
          }
        ],
        "Statistic": "Sum",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 10
      }
    },
    "slicWatchStatesExecutionThrottledAlarmTestStateMachine": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "MetricName": "ExecutionThrottled",
        "Namespace": "AWS/States",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "TestStateMachine"
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionThrottledAlarm_\${TestStateMachine.Name}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionThrottled Sum for \${TestStateMachine.Name}  breaches 0",
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
    "slicWatchStatesExecutionsFailedAlarmTestStateMachine": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "MetricName": "ExecutionsFailed",
        "Namespace": "AWS/States",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "TestStateMachine"
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionsFailedAlarm_\${TestStateMachine.Name}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionsFailed Sum for \${TestStateMachine.Name}  breaches 0",
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
    "slicWatchStatesExecutionsTimedOutAlarmTestStateMachine": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "MetricName": "ExecutionsTimedOut",
        "Namespace": "AWS/States",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "TestStateMachine"
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionsTimedOutAlarm_\${TestStateMachine.Name}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionsTimedOut Sum for \${TestStateMachine.Name}  breaches 0",
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
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
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
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
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
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
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
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
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
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
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
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
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
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
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
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
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
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
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
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
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
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
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
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
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
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "SQS_ApproximateNumberOfMessagesNotVisible_\${regularQueue.QueueName}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "SQS in-flight messages for \${regularQueue.QueueName} breaches 1200 (1% of the hard limit of 120000)",
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
        "Threshold": 1200
      }
    },
    "slicWatchSQSOldestMsgAgeAlarmregularQueue": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "SQS_ApproximateAgeOfOldestMessage_\${regularQueue.QueueName}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "SQS age of oldest message in the queue \${regularQueue.QueueName} breaches 60",
            {}
          ]
        },
        "MetricName": "ApproximateAgeOfOldestMessage",
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
        "Threshold": 60
      }
    },
    "slicWatchSQSInFlightMsgsAlarmfifoQueue": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "SQS_ApproximateNumberOfMessagesNotVisible_\${fifoQueue.QueueName}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "SQS in-flight messages for \${fifoQueue.QueueName} breaches 200 (1% of the hard limit of 20000)",
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
        "Threshold": 200
      }
    },
    "slicWatchSQSOldestMsgAgeAlarmfifoQueue": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "SQS_ApproximateAgeOfOldestMessage_\${fifoQueue.QueueName}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "SQS age of oldest message in the queue \${fifoQueue.QueueName} breaches 60",
            {}
          ]
        },
        "MetricName": "ApproximateAgeOfOldestMessage",
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
        "Threshold": 60
      }
    },
    "slicWatchECSMemoryAlarmecsService": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
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
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
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
    "slicWatchSNSNumberOfNotificationsFilteredOutInvalidAttributesAlarmMonitoringTopic": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "MetricName": "NumberOfNotificationsFilteredOut-InvalidAttributes",
        "Namespace": "AWS/SNS",
        "Dimensions": [
          {
            "Name": "TopicName",
            "Value": {
              "Fn::GetAtt": [
                "MonitoringTopic",
                "TopicName"
              ]
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "SNS_NumberOfNotificationsFilteredOutInvalidAttributes_Alarm_\${MonitoringTopic.TopicName}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "SNS NumberOfNotificationsFilteredOutInvalidAttributes for \${MonitoringTopic.TopicName} breaches 1",
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
    "slicWatchSNSNumberOfNotificationsFailedAlarmMonitoringTopic": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "MetricName": "NumberOfNotificationsFailed",
        "Namespace": "AWS/SNS",
        "Dimensions": [
          {
            "Name": "TopicName",
            "Value": {
              "Fn::GetAtt": [
                "MonitoringTopic",
                "TopicName"
              ]
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "SNS_NumberOfNotificationsFailed_Alarm_\${MonitoringTopic.TopicName}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "SNS NumberOfNotificationsFailed for \${MonitoringTopic.TopicName} breaches 1",
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
    "slicWatchEventsFailedInvocationsAlarmEventsRuleTrigger": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "MetricName": "FailedInvocations",
        "Namespace": "AWS/Events",
        "Dimensions": [
          {
            "Name": "RuleName",
            "Value": {
              "Ref": "eventsRuleTrigger"
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Events_FailedInvocations_Alarm_\${eventsRuleTrigger}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "EventBridge FailedInvocations for \${eventsRuleTrigger} breaches 1",
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
    "slicWatchEventsThrottledRulesAlarmEventsRuleTrigger": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "MetricName": "ThrottledRules",
        "Namespace": "AWS/Events",
        "Dimensions": [
          {
            "Name": "RuleName",
            "Value": {
              "Ref": "eventsRuleTrigger"
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Events_ThrottledRules_Alarm_\${eventsRuleTrigger}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "EventBridge ThrottledRules for \${eventsRuleTrigger} breaches 1",
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
                      "AWS/States",
                      "ExecutionsFailed",
                      "StateMachineArn",
                      "\${TestStateMachine}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/States",
                      "ExecutionThrottled",
                      "StateMachineArn",
                      "\${TestStateMachine}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/States",
                      "ExecutionsTimedOut",
                      "StateMachineArn",
                      "\${TestStateMachine}",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "\${TestStateMachine.Name} Step Function Executions",
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
                "x": 8,
                "y": 0
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
                "x": 16,
                "y": 0
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
                "x": 0,
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
                "x": 8,
                "y": 6
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${hello}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${throttler}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${driveStream}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${driveQueue}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${driveTable}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${streamProcessor}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${httpGetter}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${eventsRule}",
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
                "x": 16,
                "y": 6
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${hello}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${throttler}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${driveStream}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${driveQueue}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${driveTable}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${streamProcessor}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${httpGetter}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${eventsRule}",
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
                "x": 0,
                "y": 12
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${hello}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${throttler}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${driveStream}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${driveQueue}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${driveTable}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${streamProcessor}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${httpGetter}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${eventsRule}",
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
                "x": 8,
                "y": 12
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${hello}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${throttler}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${driveStream}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${driveQueue}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${driveTable}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${streamProcessor}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${httpGetter}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${eventsRule}",
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
                "x": 16,
                "y": 12
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${hello}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${throttler}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${driveStream}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${driveQueue}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${driveTable}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${streamProcessor}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${httpGetter}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${eventsRule}",
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
                "x": 0,
                "y": 18
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${hello}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${throttler}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${driveStream}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${driveQueue}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${driveTable}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${streamProcessor}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${httpGetter}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${eventsRule}",
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
                "x": 8,
                "y": 18
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${hello}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${throttler}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${driveStream}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${driveQueue}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${driveTable}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${streamProcessor}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${httpGetter}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${eventsRule}",
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
                "x": 16,
                "y": 18
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "IteratorAge",
                      "FunctionName",
                      "\${streamProcessor}",
                      {
                        "stat": "Maximum"
                      }
                    ]
                  ],
                  "title": "Lambda IteratorAge \${streamProcessor} Maximum",
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
                "x": 8,
                "y": 24
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
                "x": 16,
                "y": 24
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
                "x": 0,
                "y": 30
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
                "x": 8,
                "y": 30
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
                "x": 16,
                "y": 30
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
                "x": 0,
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
                "x": 8,
                "y": 36
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
                "x": 16,
                "y": 36
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
                "x": 0,
                "y": 42
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
                "x": 8,
                "y": 42
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/SNS",
                      "NumberOfNotificationsFilteredOut-InvalidAttributes",
                      "TopicName",
                      "\${MonitoringTopic.TopicName}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/SNS",
                      "NumberOfNotificationsFailed",
                      "TopicName",
                      "\${MonitoringTopic.TopicName}",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "SNS Topic \${MonitoringTopic.TopicName}",
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
                      "AWS/Events",
                      "FailedInvocations",
                      "RuleName",
                      "\${eventsRuleTrigger}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Events",
                      "ThrottledRules",
                      "RuleName",
                      "\${eventsRuleTrigger}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Events",
                      "Invocations",
                      "RuleName",
                      "\${eventsRuleTrigger}",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "EventBridge Rule \${eventsRuleTrigger}",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 0,
                "y": 48
              }
            ]
          }
        }
      }
    }
  }
}
`

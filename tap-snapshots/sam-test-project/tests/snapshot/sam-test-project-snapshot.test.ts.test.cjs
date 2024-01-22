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
      "alarmActionsConfig": {
        "actionsEnabled": true,
        "alarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "okActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ]
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
            "enabled": true,
            "Statistic": "Maximum",
            "Threshold": 60
          },
          "InFlightMessagesPc": {
            "Statistic": "Maximum",
            "Threshold": 1
          }
        }
      },
      "enabled": true
    }
  },
  "Resources": {
    "dataTable": {
      "DeletionPolicy": "Delete",
      "Metadata": {
        "SamResourceId": "dataTable"
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
        }
      },
      "Type": "AWS::DynamoDB::Table"
    },
    "driveQueue": {
      "Metadata": {
        "SamResourceId": "driveQueue"
      },
      "Properties": {
        "Code": {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/41c0564f2b084a83461942c11a0c2e07"
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
      },
      "Type": "AWS::Lambda::Function"
    },
    "driveQueueRole": {
      "Properties": {
        "AssumeRolePolicyDocument": {
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
          ],
          "Version": "2012-10-17"
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
      },
      "Type": "AWS::IAM::Role"
    },
    "driveStream": {
      "Metadata": {
        "SamResourceId": "driveStream"
      },
      "Properties": {
        "Code": {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/41c0564f2b084a83461942c11a0c2e07"
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
      },
      "Type": "AWS::Lambda::Function"
    },
    "driveStreamRole": {
      "Properties": {
        "AssumeRolePolicyDocument": {
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
          ],
          "Version": "2012-10-17"
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
      },
      "Type": "AWS::IAM::Role"
    },
    "driveTable": {
      "Metadata": {
        "SamResourceId": "driveTable"
      },
      "Properties": {
        "Code": {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/41c0564f2b084a83461942c11a0c2e07"
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
      },
      "Type": "AWS::Lambda::Function"
    },
    "driveTableRole": {
      "Properties": {
        "AssumeRolePolicyDocument": {
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
          ],
          "Version": "2012-10-17"
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
      },
      "Type": "AWS::IAM::Role"
    },
    "ecsCluster": {
      "Metadata": {
        "SamResourceId": "ecsCluster"
      },
      "Type": "AWS::ECS::Cluster"
    },
    "ecsService": {
      "Metadata": {
        "SamResourceId": "ecsService"
      },
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
        "TaskDefinition": {
          "Ref": "taskDef"
        }
      },
      "Type": "AWS::ECS::Service"
    },
    "eventsRule": {
      "Metadata": {
        "SamResourceId": "eventsRule",
        "slicWatch": {
          "alarms": {
            "enabled": false
          }
        }
      },
      "Properties": {
        "Code": {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/41c0564f2b084a83461942c11a0c2e07"
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
      },
      "Type": "AWS::Lambda::Function"
    },
    "eventsRuleRole": {
      "Properties": {
        "AssumeRolePolicyDocument": {
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
          ],
          "Version": "2012-10-17"
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
      },
      "Type": "AWS::IAM::Role"
    },
    "eventsRuleTrigger": {
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
      },
      "Type": "AWS::Events::Rule"
    },
    "eventsRuleTriggerPermission": {
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
      },
      "Type": "AWS::Lambda::Permission"
    },
    "fifoQueue": {
      "Metadata": {
        "SamResourceId": "fifoQueue"
      },
      "Properties": {
        "FifoQueue": true
      },
      "Type": "AWS::SQS::Queue"
    },
    "hello": {
      "Metadata": {
        "SamResourceId": "hello",
        "slicWatch": {
          "alarms": {
            "Invocations": {
              "Threshold": 2
            }
          }
        }
      },
      "Properties": {
        "Code": {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/41c0564f2b084a83461942c11a0c2e07"
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
      },
      "Type": "AWS::Lambda::Function"
    },
    "helloRole": {
      "Properties": {
        "AssumeRolePolicyDocument": {
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
          ],
          "Version": "2012-10-17"
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
      },
      "Type": "AWS::IAM::Role"
    },
    "httpGetter": {
      "Metadata": {
        "SamResourceId": "httpGetter"
      },
      "Properties": {
        "Code": {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/41c0564f2b084a83461942c11a0c2e07"
        },
        "Handler": "apigw-handler.handleGet",
        "Role": {
          "Fn::GetAtt": [
            "httpGetterRole",
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
        "Timeout": 30
      },
      "Type": "AWS::Lambda::Function"
    },
    "httpGetterHttpApiEventPermission": {
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
      },
      "Type": "AWS::Lambda::Permission"
    },
    "httpGetterRole": {
      "Properties": {
        "AssumeRolePolicyDocument": {
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
          ],
          "Version": "2012-10-17"
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
      },
      "Type": "AWS::IAM::Role"
    },
    "MonitoringTopic": {
      "Metadata": {
        "SamResourceId": "MonitoringTopic"
      },
      "Properties": {
        "TopicName": "SS-Alarm-Topic3"
      },
      "Type": "AWS::SNS::Topic"
    },
    "ping": {
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
          "S3Key": "sam-test-project/41c0564f2b084a83461942c11a0c2e07"
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
      },
      "Type": "AWS::Lambda::Function"
    },
    "pingRole": {
      "Properties": {
        "AssumeRolePolicyDocument": {
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
          ],
          "Version": "2012-10-17"
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
      },
      "Type": "AWS::IAM::Role"
    },
    "regularQueue": {
      "Metadata": {
        "SamResourceId": "regularQueue",
        "slicWatch": {
          "alarms": {
            "InFlightMessagesPc": {
              "Threshold": 95
            }
          },
          "dashboard": {
            "ApproximateAgeOfOldestMessage": {
              "yAxis": "right"
            },
            "NumberOfMessagesReceived": {
              "enabled": false
            }
          }
        }
      },
      "Type": "AWS::SQS::Queue"
    },
    "ServerlessHttpApi": {
      "Properties": {
        "Body": {
          "info": {
            "title": {
              "Ref": "AWS::StackName"
            },
            "version": "1.0"
          },
          "openapi": "3.0.1",
          "paths": {
            "item": {
              "get": {
                "responses": {},
                "x-amazon-apigateway-integration": {
                  "httpMethod": "POST",
                  "payloadFormatVersion": "2.0",
                  "type": "aws_proxy",
                  "uri": {
                    "Fn::Sub": "arn:\${AWS::Partition}:apigateway:\${AWS::Region}:lambda:path/2015-03-31/functions/\${httpGetter.Arn}/invocations"
                  }
                }
              }
            }
          },
          "tags": [
            {
              "name": "httpapi:createdBy",
              "x-amazon-apigateway-tag-value": "SAM"
            }
          ]
        }
      },
      "Type": "AWS::ApiGatewayV2::Api"
    },
    "ServerlessHttpApiApiGatewayDefaultStage": {
      "Properties": {
        "ApiId": {
          "Ref": "ServerlessHttpApi"
        },
        "AutoDeploy": true,
        "StageName": "$default",
        "Tags": {
          "httpapi:createdBy": "SAM"
        }
      },
      "Type": "AWS::ApiGatewayV2::Stage"
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
                      "AWS/States",
                      "ExecutionsFailed",
                      "StateMachineArn",
                      "\${TestStateMachine}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/States",
                      "ExecutionThrottled",
                      "StateMachineArn",
                      "\${TestStateMachine}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/States",
                      "ExecutionsTimedOut",
                      "StateMachineArn",
                      "\${TestStateMachine}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
                        "stat": "Sum",
                        "yAxis": "left"
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
                      "GlobalSecondaryIndex",
                      "GSI1",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
                      "WriteThrottleEvents",
                      "TableName",
                      "\${dataTable}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
                      "WriteThrottleEvents",
                      "TableName",
                      "\${dataTable}",
                      "GlobalSecondaryIndex",
                      "GSI1",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${throttler}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${driveStream}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${driveQueue}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${driveTable}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${streamProcessor}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${httpGetter}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${eventsRule}",
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
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${throttler}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${driveStream}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${driveQueue}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${driveTable}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${streamProcessor}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${httpGetter}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${eventsRule}",
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
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${throttler}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${driveStream}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${driveQueue}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${driveTable}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${streamProcessor}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${httpGetter}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${eventsRule}",
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
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${throttler}",
                      {
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${driveStream}",
                      {
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${driveQueue}",
                      {
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${driveTable}",
                      {
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${streamProcessor}",
                      {
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${httpGetter}",
                      {
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${eventsRule}",
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
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${throttler}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${driveStream}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${driveQueue}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${driveTable}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${streamProcessor}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${httpGetter}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${eventsRule}",
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
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${throttler}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${driveStream}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${driveQueue}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${driveTable}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${streamProcessor}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${httpGetter}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${eventsRule}",
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
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${throttler}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${driveStream}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${driveQueue}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${driveTable}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${streamProcessor}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${httpGetter}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${eventsRule}",
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
                        "stat": "Maximum",
                        "yAxis": "left"
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
                        "stat": "Maximum",
                        "yAxis": "right"
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
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/SNS",
                      "NumberOfNotificationsFailed",
                      "TopicName",
                      "\${MonitoringTopic.TopicName}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Events",
                      "ThrottledRules",
                      "RuleName",
                      "\${eventsRuleTrigger}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Events",
                      "Invocations",
                      "RuleName",
                      "\${eventsRuleTrigger}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
      },
      "Type": "AWS::CloudWatch::Dashboard"
    },
    "slicWatchECSCPUAlarmecsService": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 90,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchEventsFailedInvocationsAlarmEventsRuleTrigger": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "EventBridge FailedInvocations for \${eventsRuleTrigger} breaches 1",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Events_FailedInvocations_Alarm_\${eventsRuleTrigger}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "RuleName",
            "Value": {
              "Ref": "eventsRuleTrigger"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "FailedInvocations",
        "Namespace": "AWS/Events",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchEventsThrottledRulesAlarmEventsRuleTrigger": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "EventBridge ThrottledRules for \${eventsRuleTrigger} breaches 1",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Events_ThrottledRules_Alarm_\${eventsRuleTrigger}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "RuleName",
            "Value": {
              "Ref": "eventsRuleTrigger"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ThrottledRules",
        "Namespace": "AWS/Events",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmdriveQueue": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${driveQueue} breaches 95% of timeout (3)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${driveQueue}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "driveQueue"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmdriveStream": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${driveStream} breaches 95% of timeout (3)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${driveStream}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "driveStream"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmdriveTable": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${driveTable} breaches 95% of timeout (3)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${driveTable}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "driveTable"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmhello": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${hello} breaches 95% of timeout (3)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${hello}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "hello"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmhttpGetter": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${httpGetter} breaches 95% of timeout (30)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${httpGetter}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "httpGetter"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 28500,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmping": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${ping} breaches 95% of timeout (3)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${ping}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "ping"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmstreamProcessor": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${streamProcessor} breaches 95% of timeout (3)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${streamProcessor}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "streamProcessor"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmthrottler": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${throttler} breaches 95% of timeout (3)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${throttler}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "throttler"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmdriveQueue": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${driveQueue} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${driveQueue}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "driveQueue"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmdriveStream": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${driveStream} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${driveStream}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "driveStream"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmdriveTable": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${driveTable} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${driveTable}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "driveTable"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmhello": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${hello} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${hello}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "hello"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmhttpGetter": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${httpGetter} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${httpGetter}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "httpGetter"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmping": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${ping} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${ping}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "ping"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmstreamProcessor": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${streamProcessor} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${streamProcessor}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "streamProcessor"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmthrottler": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${throttler} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${throttler}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "throttler"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmdriveQueue": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${driveQueue} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${driveQueue}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "driveQueue"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmdriveStream": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${driveStream} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${driveStream}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "driveStream"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmdriveTable": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${driveTable} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${driveTable}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "driveTable"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmhello": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${hello} breaches 2",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${hello}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "hello"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 2,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmhttpGetter": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${httpGetter} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${httpGetter}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "httpGetter"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmping": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${ping} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${ping}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "ping"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmstreamProcessor": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${streamProcessor} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${streamProcessor}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "streamProcessor"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmthrottler": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${throttler} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${throttler}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "throttler"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaIteratorAgeAlarmstreamProcessor": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "IteratorAge for \${streamProcessor} breaches 10000",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_IteratorAge_\${streamProcessor}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "streamProcessor"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "IteratorAge",
        "Namespace": "AWS/Lambda",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 10000,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmdriveQueue": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${driveQueue} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${driveQueue}",
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
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmdriveStream": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${driveStream} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${driveStream}",
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
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmdriveTable": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${driveTable} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${driveTable}",
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
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmhello": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${hello} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${hello}",
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
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmhttpGetter": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${httpGetter} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${httpGetter}",
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
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmping": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${ping} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${ping}",
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
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmstreamProcessor": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${streamProcessor} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${streamProcessor}",
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
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmthrottler": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${throttler} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${throttler}",
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
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchSNSNumberOfNotificationsFailedAlarmMonitoringTopic": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "SNS NumberOfNotificationsFailed for \${MonitoringTopic.TopicName} breaches 1",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "SNS_NumberOfNotificationsFailed_Alarm_\${MonitoringTopic.TopicName}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
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
        "EvaluationPeriods": 1,
        "MetricName": "NumberOfNotificationsFailed",
        "Namespace": "AWS/SNS",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchSNSNumberOfNotificationsFilteredOutInvalidAttributesAlarmMonitoringTopic": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "SNS NumberOfNotificationsFilteredOutInvalidAttributes for \${MonitoringTopic.TopicName} breaches 1",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "SNS_NumberOfNotificationsFilteredOutInvalidAttributes_Alarm_\${MonitoringTopic.TopicName}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
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
        "EvaluationPeriods": 1,
        "MetricName": "NumberOfNotificationsFilteredOut-InvalidAttributes",
        "Namespace": "AWS/SNS",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "SQS in-flight messages for \${regularQueue.QueueName} breaches 114000 (95% of the hard limit of 120000)",
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
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 114000,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchSQSOldestMsgAgeAlarmfifoQueue": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 60,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchStatesExecutionsFailedAlarmTestStateMachine": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionsFailed Sum for \${TestStateMachine.Name}  breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionsFailedAlarm_\${TestStateMachine.Name}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "TestStateMachine"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ExecutionsFailed",
        "Namespace": "AWS/States",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchStatesExecutionsTimedOutAlarmTestStateMachine": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionsTimedOut Sum for \${TestStateMachine.Name}  breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionsTimedOutAlarm_\${TestStateMachine.Name}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "TestStateMachine"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ExecutionsTimedOut",
        "Namespace": "AWS/States",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchStatesExecutionThrottledAlarmTestStateMachine": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionThrottled Sum for \${TestStateMachine.Name}  breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionThrottledAlarm_\${TestStateMachine.Name}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "TestStateMachine"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ExecutionThrottled",
        "Namespace": "AWS/States",
        "OKActions": [
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${dataTable} breaches 0",
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
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchTableWriteThrottleEventsAlarmdataTable": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MonitoringTopic"
          }
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
          {
            "Ref": "MonitoringTopic"
          }
        ],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "stream": {
      "Metadata": {
        "SamResourceId": "stream"
      },
      "Properties": {
        "ShardCount": 1
      },
      "Type": "AWS::Kinesis::Stream"
    },
    "streamProcessor": {
      "Metadata": {
        "SamResourceId": "streamProcessor"
      },
      "Properties": {
        "Code": {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/41c0564f2b084a83461942c11a0c2e07"
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
      },
      "Type": "AWS::Lambda::Function"
    },
    "streamProcessorRole": {
      "Properties": {
        "AssumeRolePolicyDocument": {
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
          ],
          "Version": "2012-10-17"
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
      },
      "Type": "AWS::IAM::Role"
    },
    "streamProcessorStream": {
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
      },
      "Type": "AWS::Lambda::EventSourceMapping"
    },
    "subnet": {
      "Metadata": {
        "SamResourceId": "subnet"
      },
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
      "Type": "AWS::EC2::Subnet"
    },
    "taskDef": {
      "Metadata": {
        "SamResourceId": "taskDef"
      },
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
        "Cpu": 256,
        "Memory": 512,
        "NetworkMode": "awsvpc",
        "RequiresCompatibilities": [
          "FARGATE"
        ]
      },
      "Type": "AWS::ECS::TaskDefinition"
    },
    "TestStateMachine": {
      "Metadata": {
        "SamResourceId": "TestStateMachine"
      },
      "Properties": {
        "DefinitionS3Location": {
          "Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "Key": "sam-test-project/754f906d12f592f99c5651c04a6a0a51"
        },
        "DefinitionSubstitutions": {
          "AnotherHelloArn": {
            "Fn::GetAtt": [
              "hello",
              "Arn"
            ]
          },
          "HelloArn": {
            "Fn::GetAtt": [
              "hello",
              "Arn"
            ]
          }
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
        ]
      },
      "Type": "AWS::StepFunctions::StateMachine"
    },
    "TestStateMachineRole": {
      "Properties": {
        "AssumeRolePolicyDocument": {
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
          ],
          "Version": "2012-10-17"
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
      },
      "Type": "AWS::IAM::Role"
    },
    "throttler": {
      "Metadata": {
        "SamResourceId": "throttler"
      },
      "Properties": {
        "Code": {
          "S3Bucket": "aws-sam-cli-managed-default-samclisourcebucket-167xnalzxxva4",
          "S3Key": "sam-test-project/41c0564f2b084a83461942c11a0c2e07"
        },
        "Handler": "basic-handler.hello",
        "ReservedConcurrentExecutions": 0,
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
        ]
      },
      "Type": "AWS::Lambda::Function"
    },
    "throttlerRole": {
      "Properties": {
        "AssumeRolePolicyDocument": {
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
          ],
          "Version": "2012-10-17"
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
      },
      "Type": "AWS::IAM::Role"
    },
    "vpc": {
      "Metadata": {
        "SamResourceId": "vpc"
      },
      "Properties": {
        "CidrBlock": "10.0.0.0/16"
      },
      "Type": "AWS::EC2::VPC"
    }
  }
}
`

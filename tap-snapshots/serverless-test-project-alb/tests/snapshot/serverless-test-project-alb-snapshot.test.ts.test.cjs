/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`serverless-test-project-alb/tests/snapshot/serverless-test-project-alb-snapshot.test.ts > TAP > the plugin adds SLIC Watch dashboards and alarms to a serverless-generated CloudFormation template with ALB resources > serverless-test-project-alb template 1`] = `
{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "The AWS CloudFormation template for this Serverless application",
  "Outputs": {
    "AlbEventLambdaFunctionQualifiedArn": {
      "Description": "Current Lambda function version",
      "Export": {
        "Name": "sls-serverless-test-project-alb-dev-AlbEventLambdaFunctionQualifiedArn"
      },
      "Value": {
        "Ref": "AlbEventLambdaVersion0XznAenLykwY99KhRhuWhGA2GO8nTdlRqGtjPoaDgg"
      }
    },
    "ServerlessDeploymentBucketName": {
      "Export": {
        "Name": "sls-serverless-test-project-alb-dev-ServerlessDeploymentBucketName"
      },
      "Value": {
        "Ref": "ServerlessDeploymentBucket"
      }
    }
  },
  "Resources": {
    "alb": {
      "Properties": {
        "Name": "awesome-loadBalancer",
        "SecurityGroups": [
          {
            "Ref": "albSecurityGroup"
          }
        ],
        "Subnets": [
          {
            "Ref": "subnetA"
          },
          {
            "Ref": "subnetB"
          }
        ],
        "Type": "application"
      },
      "Type": "AWS::ElasticLoadBalancingV2::LoadBalancer"
    },
    "AlbEventAlbListenerRule1": {
      "Properties": {
        "Actions": [
          {
            "Type": "forward",
            "TargetGroupArn": {
              "Ref": "AlbEventAlbTargetGrouphttpListener"
            }
          }
        ],
        "Conditions": [
          {
            "Field": "path-pattern",
            "Values": [
              "/handleALB"
            ]
          },
          {
            "Field": "http-request-method",
            "HttpRequestMethodConfig": {
              "Values": [
                "POST"
              ]
            }
          }
        ],
        "ListenerArn": {
          "Ref": "httpListener"
        },
        "Priority": 1
      },
      "Type": "AWS::ElasticLoadBalancingV2::ListenerRule"
    },
    "AlbEventAlbTargetGrouphttpListener": {
      "DependsOn": [
        "AlbEventLambdaPermissionRegisterTarget"
      ],
      "Properties": {
        "HealthCheckEnabled": true,
        "HealthCheckIntervalSeconds": 35,
        "HealthCheckPath": "/",
        "HealthCheckTimeoutSeconds": 30,
        "HealthyThresholdCount": 5,
        "Matcher": {
          "HttpCode": "200"
        },
        "Name": "1d5fdfd5099ec257209ef7b7c5ee8cb4",
        "Tags": [
          {
            "Key": "Name",
            "Value": "serverless-test-project-alb-albEvent-httpListener-dev"
          }
        ],
        "TargetGroupAttributes": [
          {
            "Key": "lambda.multi_value_headers.enabled",
            "Value": false
          }
        ],
        "Targets": [
          {
            "Id": {
              "Fn::GetAtt": [
                "AlbEventLambdaFunction",
                "Arn"
              ]
            }
          }
        ],
        "TargetType": "lambda",
        "UnhealthyThresholdCount": 5
      },
      "Type": "AWS::ElasticLoadBalancingV2::TargetGroup"
    },
    "AlbEventLambdaFunction": {
      "DependsOn": [
        "AlbEventLogGroup"
      ],
      "Metadata": {
        "slicWatch": {}
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Ref": "ServerlessDeploymentBucket"
          },
          "S3Key": "serverless/serverless-test-project-alb/dev/1701242684385-2023-11-29T07:24:44.385Z/serverless-test-project-alb.zip"
        },
        "FunctionName": "serverless-test-project-alb-dev-albEvent",
        "Handler": "alb-handler.handleALB",
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
    "AlbEventLambdaPermissionAlb": {
      "Properties": {
        "Action": "lambda:InvokeFunction",
        "FunctionName": {
          "Fn::GetAtt": [
            "AlbEventLambdaFunction",
            "Arn"
          ]
        },
        "Principal": "elasticloadbalancing.amazonaws.com",
        "SourceArn": {
          "Ref": "AlbEventAlbTargetGrouphttpListener"
        }
      },
      "Type": "AWS::Lambda::Permission"
    },
    "AlbEventLambdaPermissionRegisterTarget": {
      "Properties": {
        "Action": "lambda:InvokeFunction",
        "FunctionName": {
          "Fn::GetAtt": [
            "AlbEventLambdaFunction",
            "Arn"
          ]
        },
        "Principal": "elasticloadbalancing.amazonaws.com"
      },
      "Type": "AWS::Lambda::Permission"
    },
    "AlbEventLambdaVersion0XznAenLykwY99KhRhuWhGA2GO8nTdlRqGtjPoaDgg": {
      "DeletionPolicy": "Retain",
      "Properties": {
        "CodeSha256": "iF0ZcJ5dWZd/RnBzvEqO7WAQlHbLsco8p4dUx4U7AL8=",
        "FunctionName": {
          "Ref": "AlbEventLambdaFunction"
        }
      },
      "Type": "AWS::Lambda::Version"
    },
    "AlbEventLogGroup": {
      "Properties": {
        "LogGroupName": "/aws/lambda/serverless-test-project-alb-dev-albEvent"
      },
      "Type": "AWS::Logs::LogGroup"
    },
    "albSecurityGroup": {
      "Properties": {
        "GroupDescription": "Allow http to client host",
        "SecurityGroupIngress": [
          {
            "IpProtocol": "tcp",
            "FromPort": 80,
            "ToPort": 80,
            "CidrIp": "0.0.0.0/0"
          },
          {
            "IpProtocol": "tcp",
            "FromPort": 443,
            "ToPort": 443,
            "CidrIp": "0.0.0.0/0"
          }
        ],
        "VpcId": {
          "Ref": "vpcALB"
        }
      },
      "Type": "AWS::EC2::SecurityGroup"
    },
    "bucket": {
      "Type": "AWS::S3::Bucket"
    },
    "httpListener": {
      "Properties": {
        "DefaultActions": [
          {
            "Type": "redirect",
            "RedirectConfig": {
              "Protocol": "HTTP",
              "Port": 400,
              "Host": "#{host}",
              "Path": "/#{path}",
              "Query": "#{query}",
              "StatusCode": "HTTP_301"
            }
          }
        ],
        "LoadBalancerArn": {
          "Ref": "alb"
        },
        "Port": 80,
        "Protocol": "HTTP"
      },
      "Type": "AWS::ElasticLoadBalancingV2::Listener"
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
                  "serverless-test-project-alb",
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
                      "Fn::Sub": "arn:\${AWS::Partition}:logs:\${AWS::Region}:\${AWS::AccountId}:log-group:/aws/lambda/serverless-test-project-alb-dev*:*"
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
                      "Fn::Sub": "arn:\${AWS::Partition}:logs:\${AWS::Region}:\${AWS::AccountId}:log-group:/aws/lambda/serverless-test-project-alb-dev*:*:*"
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
              "serverless-test-project-alb",
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
    "internetGateway": {
      "Properties": {
        "Tags": [
          {
            "Key": "ProjectName",
            "Value": "serverless-test-project-alb"
          },
          {
            "Key": "Stage",
            "Value": "dev"
          }
        ]
      },
      "Type": "AWS::EC2::InternetGateway"
    },
    "routeTableA": {
      "Properties": {
        "Tags": [
          {
            "Key": "ProjectName",
            "Value": "serverless-test-project-alb"
          },
          {
            "Key": "Stage",
            "Value": "dev"
          }
        ],
        "VpcId": {
          "Ref": "vpcALB"
        }
      },
      "Type": "AWS::EC2::RouteTable"
    },
    "routeTableAInternetRoute": {
      "DependsOn": [
        "vpcGatewayAttachment"
      ],
      "Properties": {
        "DestinationCidrBlock": "0.0.0.0/0",
        "GatewayId": {
          "Ref": "internetGateway"
        },
        "RouteTableId": {
          "Ref": "routeTableA"
        }
      },
      "Type": "AWS::EC2::Route"
    },
    "routeTableAssociationSubnetA": {
      "Properties": {
        "RouteTableId": {
          "Ref": "routeTableA"
        },
        "SubnetId": {
          "Ref": "subnetA"
        }
      },
      "Type": "AWS::EC2::SubnetRouteTableAssociation"
    },
    "routeTableAssociationSubnetB": {
      "Properties": {
        "RouteTableId": {
          "Ref": "routeTableB"
        },
        "SubnetId": {
          "Ref": "subnetB"
        }
      },
      "Type": "AWS::EC2::SubnetRouteTableAssociation"
    },
    "routeTableB": {
      "Properties": {
        "Tags": [
          {
            "Key": "ProjectName",
            "Value": "serverless-test-project-alb"
          },
          {
            "Key": "Stage",
            "Value": "dev"
          }
        ],
        "VpcId": {
          "Ref": "vpcALB"
        }
      },
      "Type": "AWS::EC2::RouteTable"
    },
    "routeTableBInternetRoute": {
      "DependsOn": [
        "vpcGatewayAttachment"
      ],
      "Properties": {
        "DestinationCidrBlock": "0.0.0.0/0",
        "GatewayId": {
          "Ref": "internetGateway"
        },
        "RouteTableId": {
          "Ref": "routeTableB"
        }
      },
      "Type": "AWS::EC2::Route"
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
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${AlbEventLambdaFunction}",
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
                "x": 0,
                "y": 0
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${AlbEventLambdaFunction}",
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
                "x": 8,
                "y": 0
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${AlbEventLambdaFunction}",
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
                "x": 16,
                "y": 0
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${AlbEventLambdaFunction}",
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
                "x": 0,
                "y": 6
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${AlbEventLambdaFunction}",
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
                "x": 8,
                "y": 6
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${AlbEventLambdaFunction}",
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
                "x": 16,
                "y": 6
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${AlbEventLambdaFunction}",
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
                "x": 0,
                "y": 12
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/ApplicationELB",
                      "HTTPCode_ELB_5XX_Count",
                      "LoadBalancer",
                      "\${alb.LoadBalancerFullName}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/ApplicationELB",
                      "RejectedConnectionCount",
                      "LoadBalancer",
                      "\${alb.LoadBalancerFullName}",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "ALB \${alb.LoadBalancerName}",
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
                      "AWS/ApplicationELB",
                      "HTTPCode_Target_5XX_Count",
                      "LoadBalancer",
                      "\${alb.LoadBalancerFullName}",
                      "TargetGroup",
                      "\${AlbEventAlbTargetGrouphttpListener.TargetGroupFullName}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/ApplicationELB",
                      "UnHealthyHostCount",
                      "LoadBalancer",
                      "\${alb.LoadBalancerFullName}",
                      "TargetGroup",
                      "\${AlbEventAlbTargetGrouphttpListener.TargetGroupFullName}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/ApplicationELB",
                      "LambdaInternalError",
                      "LoadBalancer",
                      "\${alb.LoadBalancerFullName}",
                      "TargetGroup",
                      "\${AlbEventAlbTargetGrouphttpListener.TargetGroupFullName}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/ApplicationELB",
                      "LambdaUserError",
                      "LoadBalancer",
                      "\${alb.LoadBalancerFullName}",
                      "TargetGroup",
                      "\${AlbEventAlbTargetGrouphttpListener.TargetGroupFullName}",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "Target Group \${alb.LoadBalancerName}/\${AlbEventAlbTargetGrouphttpListener.TargetGroupName}",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 16,
                "y": 12
              }
            ]
          }
        }
      },
      "Type": "AWS::CloudWatch::Dashboard"
    },
    "slicWatchLoadBalancerHTTPCodeELB5XXCountAlarmAlb": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "AlarmDescription": "LoadBalancer HTTPCodeELB5XXCount Sum for alb  breaches 0",
        "AlarmName": "LoadBalancer_HTTPCodeELB5XXCountAlarm_alb",
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "LoadBalancer",
            "Value": {
              "Fn::GetAtt": [
                "alb",
                "LoadBalancerFullName"
              ]
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "HTTPCode_ELB_5XX_Count",
        "Namespace": "AWS/ApplicationELB",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLoadBalancerHTTPCodeTarget5XXCountAlarmAlbEventAlbTargetGrouphttpListener": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "AlarmDescription": "LoadBalancer HTTPCode_Target_5XX_Count Sum for AlbEventAlbTargetGrouphttpListener breaches 0",
        "AlarmName": "LoadBalancer_HTTPCodeTarget5XXCountAlarm_AlbEventAlbTargetGrouphttpListener",
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TargetGroup",
            "Value": {
              "Fn::GetAtt": [
                "AlbEventAlbTargetGrouphttpListener",
                "TargetGroupFullName"
              ]
            }
          },
          {
            "Name": "LoadBalancer",
            "Value": {
              "Fn::GetAtt": [
                "alb",
                "LoadBalancerFullName"
              ]
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "HTTPCode_Target_5XX_Count",
        "Namespace": "AWS/ApplicationELB",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLoadBalancerLambdaInternalErrorAlarmAlbEventAlbTargetGrouphttpListener": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "AlarmDescription": "LoadBalancer LambdaInternalError Sum for AlbEventAlbTargetGrouphttpListener breaches 0",
        "AlarmName": "LoadBalancer_LambdaInternalErrorAlarm_AlbEventAlbTargetGrouphttpListener",
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TargetGroup",
            "Value": {
              "Fn::GetAtt": [
                "AlbEventAlbTargetGrouphttpListener",
                "TargetGroupFullName"
              ]
            }
          },
          {
            "Name": "LoadBalancer",
            "Value": {
              "Fn::GetAtt": [
                "alb",
                "LoadBalancerFullName"
              ]
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "LambdaInternalError",
        "Namespace": "AWS/ApplicationELB",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLoadBalancerLambdaUserErrorAlarmAlbEventAlbTargetGrouphttpListener": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "AlarmDescription": "LoadBalancer LambdaUserError Sum for AlbEventAlbTargetGrouphttpListener breaches 0",
        "AlarmName": "LoadBalancer_LambdaUserErrorAlarm_AlbEventAlbTargetGrouphttpListener",
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TargetGroup",
            "Value": {
              "Fn::GetAtt": [
                "AlbEventAlbTargetGrouphttpListener",
                "TargetGroupFullName"
              ]
            }
          },
          {
            "Name": "LoadBalancer",
            "Value": {
              "Fn::GetAtt": [
                "alb",
                "LoadBalancerFullName"
              ]
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "LambdaUserError",
        "Namespace": "AWS/ApplicationELB",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLoadBalancerRejectedConnectionCountAlarmAlb": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "AlarmDescription": "LoadBalancer RejectedConnectionCount Sum for alb  breaches 0",
        "AlarmName": "LoadBalancer_RejectedConnectionCountAlarm_alb",
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "LoadBalancer",
            "Value": {
              "Fn::GetAtt": [
                "alb",
                "LoadBalancerFullName"
              ]
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "RejectedConnectionCount",
        "Namespace": "AWS/ApplicationELB",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLoadBalancerUnHealthyHostCountAlarmAlbEventAlbTargetGrouphttpListener": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "AlarmDescription": "LoadBalancer UnHealthyHostCount Average for AlbEventAlbTargetGrouphttpListener breaches 0",
        "AlarmName": "LoadBalancer_UnHealthyHostCountAlarm_AlbEventAlbTargetGrouphttpListener",
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TargetGroup",
            "Value": {
              "Fn::GetAtt": [
                "AlbEventAlbTargetGrouphttpListener",
                "TargetGroupFullName"
              ]
            }
          },
          {
            "Name": "LoadBalancer",
            "Value": {
              "Fn::GetAtt": [
                "alb",
                "LoadBalancerFullName"
              ]
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "UnHealthyHostCount",
        "Namespace": "AWS/ApplicationELB",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "subnetA": {
      "Properties": {
        "AvailabilityZone": "eu-west-1a",
        "CidrBlock": "10.0.5.0/24",
        "Tags": [
          {
            "Key": "ProjectName",
            "Value": "serverless-test-project-alb"
          },
          {
            "Key": "Stage",
            "Value": "dev"
          }
        ],
        "VpcId": {
          "Ref": "vpcALB"
        }
      },
      "Type": "AWS::EC2::Subnet"
    },
    "subnetB": {
      "Properties": {
        "AvailabilityZone": "eu-west-1b",
        "CidrBlock": "10.0.6.0/24",
        "Tags": [
          {
            "Key": "ProjectName",
            "Value": "serverless-test-project-alb"
          },
          {
            "Key": "Stage",
            "Value": "dev"
          }
        ],
        "VpcId": {
          "Ref": "vpcALB"
        }
      },
      "Type": "AWS::EC2::Subnet"
    },
    "vpcALB": {
      "Properties": {
        "CidrBlock": "10.0.0.0/20",
        "EnableDnsHostnames": true,
        "EnableDnsSupport": true,
        "InstanceTenancy": "default",
        "Tags": [
          {
            "Key": "ProjectName",
            "Value": "serverless-test-project-alb"
          },
          {
            "Key": "Stage",
            "Value": "dev"
          }
        ]
      },
      "Type": "AWS::EC2::VPC"
    },
    "vpcGatewayAttachment": {
      "Properties": {
        "InternetGatewayId": {
          "Ref": "internetGateway"
        },
        "VpcId": {
          "Ref": "vpcALB"
        }
      },
      "Type": "AWS::EC2::VPCGatewayAttachment"
    }
  }
}
`

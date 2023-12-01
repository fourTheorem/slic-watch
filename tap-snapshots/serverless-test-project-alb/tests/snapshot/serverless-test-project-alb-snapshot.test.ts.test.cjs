/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`serverless-test-project-alb/tests/snapshot/serverless-test-project-alb-snapshot.test.ts > TAP > serverless-test-project-alb snapshot > serverless-test-project-alb template 1`] = `
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
    "AlbEventLogGroup": {
      "Type": "AWS::Logs::LogGroup",
      "Properties": {
        "LogGroupName": "/aws/lambda/serverless-test-project-alb-dev-albEvent"
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
        "Path": "/",
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
      }
    },
    "AlbEventLambdaFunction": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Ref": "ServerlessDeploymentBucket"
          },
          "S3Key": "serverless/serverless-test-project-alb/dev/1701242684385-2023-11-29T07:24:44.385Z/serverless-test-project-alb.zip"
        },
        "Handler": "alb-handler.handleALB",
        "Runtime": "nodejs18.x",
        "FunctionName": "serverless-test-project-alb-dev-albEvent",
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
        "AlbEventLogGroup"
      ],
      "Metadata": {
        "slicWatch": {}
      }
    },
    "AlbEventLambdaVersion0XznAenLykwY99KhRhuWhGA2GO8nTdlRqGtjPoaDgg": {
      "Type": "AWS::Lambda::Version",
      "DeletionPolicy": "Retain",
      "Properties": {
        "FunctionName": {
          "Ref": "AlbEventLambdaFunction"
        },
        "CodeSha256": "iF0ZcJ5dWZd/RnBzvEqO7WAQlHbLsco8p4dUx4U7AL8="
      }
    },
    "AlbEventAlbTargetGrouphttpListener": {
      "Type": "AWS::ElasticLoadBalancingV2::TargetGroup",
      "Properties": {
        "TargetType": "lambda",
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
        "HealthCheckEnabled": true,
        "HealthCheckPath": "/",
        "HealthCheckIntervalSeconds": 35,
        "HealthCheckTimeoutSeconds": 30,
        "HealthyThresholdCount": 5,
        "UnhealthyThresholdCount": 5,
        "Matcher": {
          "HttpCode": "200"
        }
      },
      "DependsOn": [
        "AlbEventLambdaPermissionRegisterTarget"
      ]
    },
    "AlbEventAlbListenerRule1": {
      "Type": "AWS::ElasticLoadBalancingV2::ListenerRule",
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
      }
    },
    "AlbEventLambdaPermissionAlb": {
      "Type": "AWS::Lambda::Permission",
      "Properties": {
        "FunctionName": {
          "Fn::GetAtt": [
            "AlbEventLambdaFunction",
            "Arn"
          ]
        },
        "Action": "lambda:InvokeFunction",
        "Principal": "elasticloadbalancing.amazonaws.com",
        "SourceArn": {
          "Ref": "AlbEventAlbTargetGrouphttpListener"
        }
      }
    },
    "AlbEventLambdaPermissionRegisterTarget": {
      "Type": "AWS::Lambda::Permission",
      "Properties": {
        "FunctionName": {
          "Fn::GetAtt": [
            "AlbEventLambdaFunction",
            "Arn"
          ]
        },
        "Action": "lambda:InvokeFunction",
        "Principal": "elasticloadbalancing.amazonaws.com"
      }
    },
    "bucket": {
      "Type": "AWS::S3::Bucket"
    },
    "vpcALB": {
      "Type": "AWS::EC2::VPC",
      "Properties": {
        "CidrBlock": "10.0.0.0/20",
        "EnableDnsSupport": true,
        "EnableDnsHostnames": true,
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
      }
    },
    "internetGateway": {
      "Type": "AWS::EC2::InternetGateway",
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
      }
    },
    "vpcGatewayAttachment": {
      "Type": "AWS::EC2::VPCGatewayAttachment",
      "Properties": {
        "VpcId": {
          "Ref": "vpcALB"
        },
        "InternetGatewayId": {
          "Ref": "internetGateway"
        }
      }
    },
    "subnetA": {
      "Type": "AWS::EC2::Subnet",
      "Properties": {
        "AvailabilityZone": "eu-west-1a",
        "CidrBlock": "10.0.5.0/24",
        "VpcId": {
          "Ref": "vpcALB"
        },
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
      }
    },
    "subnetB": {
      "Type": "AWS::EC2::Subnet",
      "Properties": {
        "AvailabilityZone": "eu-west-1b",
        "CidrBlock": "10.0.6.0/24",
        "VpcId": {
          "Ref": "vpcALB"
        },
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
      }
    },
    "routeTableA": {
      "Type": "AWS::EC2::RouteTable",
      "Properties": {
        "VpcId": {
          "Ref": "vpcALB"
        },
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
      }
    },
    "routeTableB": {
      "Type": "AWS::EC2::RouteTable",
      "Properties": {
        "VpcId": {
          "Ref": "vpcALB"
        },
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
      }
    },
    "routeTableAssociationSubnetA": {
      "Type": "AWS::EC2::SubnetRouteTableAssociation",
      "Properties": {
        "SubnetId": {
          "Ref": "subnetA"
        },
        "RouteTableId": {
          "Ref": "routeTableA"
        }
      }
    },
    "routeTableAssociationSubnetB": {
      "Type": "AWS::EC2::SubnetRouteTableAssociation",
      "Properties": {
        "SubnetId": {
          "Ref": "subnetB"
        },
        "RouteTableId": {
          "Ref": "routeTableB"
        }
      }
    },
    "routeTableAInternetRoute": {
      "Type": "AWS::EC2::Route",
      "DependsOn": [
        "vpcGatewayAttachment"
      ],
      "Properties": {
        "RouteTableId": {
          "Ref": "routeTableA"
        },
        "DestinationCidrBlock": "0.0.0.0/0",
        "GatewayId": {
          "Ref": "internetGateway"
        }
      }
    },
    "routeTableBInternetRoute": {
      "Type": "AWS::EC2::Route",
      "DependsOn": [
        "vpcGatewayAttachment"
      ],
      "Properties": {
        "RouteTableId": {
          "Ref": "routeTableB"
        },
        "DestinationCidrBlock": "0.0.0.0/0",
        "GatewayId": {
          "Ref": "internetGateway"
        }
      }
    },
    "alb": {
      "Type": "AWS::ElasticLoadBalancingV2::LoadBalancer",
      "Properties": {
        "Name": "awesome-loadBalancer",
        "Type": "application",
        "Subnets": [
          {
            "Ref": "subnetA"
          },
          {
            "Ref": "subnetB"
          }
        ],
        "SecurityGroups": [
          {
            "Ref": "albSecurityGroup"
          }
        ]
      }
    },
    "httpListener": {
      "Type": "AWS::ElasticLoadBalancingV2::Listener",
      "Properties": {
        "LoadBalancerArn": {
          "Ref": "alb"
        },
        "Port": 80,
        "Protocol": "HTTP",
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
        ]
      }
    },
    "albSecurityGroup": {
      "Type": "AWS::EC2::SecurityGroup",
      "Properties": {
        "GroupDescription": "Allow http to client host",
        "VpcId": {
          "Ref": "vpcALB"
        },
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
        ]
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
      }
    },
    "slicWatchLoadBalancerHTTPCodeELB5XXCountAlarmAlb": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "MetricName": "HTTPCode_ELB_5XX_Count",
        "Namespace": "AWS/ApplicationELB",
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
        "AlarmName": "LoadBalancer_HTTPCodeELB5XXCountAlarm_alb",
        "AlarmDescription": "LoadBalancer HTTPCodeELB5XXCount Sum for alb  breaches 0",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 0
      }
    },
    "slicWatchLoadBalancerRejectedConnectionCountAlarmAlb": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "MetricName": "RejectedConnectionCount",
        "Namespace": "AWS/ApplicationELB",
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
        "AlarmName": "LoadBalancer_RejectedConnectionCountAlarm_alb",
        "AlarmDescription": "LoadBalancer RejectedConnectionCount Sum for alb  breaches 0",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 0
      }
    },
    "slicWatchLoadBalancerHTTPCodeTarget5XXCountAlarmAlbEventAlbTargetGrouphttpListener": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": "LoadBalancer_HTTPCodeTarget5XXCountAlarm_AlbEventAlbTargetGrouphttpListener",
        "AlarmDescription": "LoadBalancer HTTPCode_Target_5XX_Count Sum for AlbEventAlbTargetGrouphttpListener breaches 0",
        "MetricName": "HTTPCode_Target_5XX_Count",
        "Statistic": "Sum",
        "Namespace": "AWS/ApplicationELB",
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
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 0
      }
    },
    "slicWatchLoadBalancerUnHealthyHostCountAlarmAlbEventAlbTargetGrouphttpListener": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": "LoadBalancer_UnHealthyHostCountAlarm_AlbEventAlbTargetGrouphttpListener",
        "AlarmDescription": "LoadBalancer UnHealthyHostCount Average for AlbEventAlbTargetGrouphttpListener breaches 0",
        "MetricName": "UnHealthyHostCount",
        "Statistic": "Average",
        "Namespace": "AWS/ApplicationELB",
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
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 0
      }
    },
    "slicWatchLoadBalancerLambdaInternalErrorAlarmAlbEventAlbTargetGrouphttpListener": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": "LoadBalancer_LambdaInternalErrorAlarm_AlbEventAlbTargetGrouphttpListener",
        "AlarmDescription": "LoadBalancer LambdaInternalError Sum for AlbEventAlbTargetGrouphttpListener breaches 0",
        "MetricName": "LambdaInternalError",
        "Statistic": "Sum",
        "Namespace": "AWS/ApplicationELB",
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
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 0
      }
    },
    "slicWatchLoadBalancerLambdaUserErrorAlarmAlbEventAlbTargetGrouphttpListener": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": "LoadBalancer_LambdaUserErrorAlarm_AlbEventAlbTargetGrouphttpListener",
        "AlarmDescription": "LoadBalancer LambdaUserError Sum for AlbEventAlbTargetGrouphttpListener breaches 0",
        "MetricName": "LambdaUserError",
        "Statistic": "Sum",
        "Namespace": "AWS/ApplicationELB",
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
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 0
      }
    }
  },
  "Outputs": {
    "ServerlessDeploymentBucketName": {
      "Value": {
        "Ref": "ServerlessDeploymentBucket"
      },
      "Export": {
        "Name": "sls-serverless-test-project-alb-dev-ServerlessDeploymentBucketName"
      }
    },
    "AlbEventLambdaFunctionQualifiedArn": {
      "Description": "Current Lambda function version",
      "Value": {
        "Ref": "AlbEventLambdaVersion0XznAenLykwY99KhRhuWhGA2GO8nTdlRqGtjPoaDgg"
      },
      "Export": {
        "Name": "sls-serverless-test-project-alb-dev-AlbEventLambdaFunctionQualifiedArn"
      }
    }
  }
}
`

/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`serverless-test-project-alb/tests/snapshot/serverless-test-project-alb-snapshot.test.ts > TAP > serverless-test-project-alb snapshot > serverless-test-project-alb template 1`] = `
Object {
  "alb": Object {
    "Properties": Object {
      "Name": "awesome-loadBalancer",
      "SecurityGroups": Array [
        Object {
          "Ref": "albSecurityGroup",
        },
      ],
      "Subnets": Array [
        Object {
          "Ref": "subnetA",
        },
        Object {
          "Ref": "subnetB",
        },
      ],
      "Type": "application",
    },
    "Type": "AWS::ElasticLoadBalancingV2::LoadBalancer",
  },
  "AlbEventAlbListenerRule1": Object {
    "Properties": Object {
      "Actions": Array [
        Object {
          "TargetGroupArn": Object {
            "Ref": "AlbEventAlbTargetGrouphttpListener",
          },
          "Type": "forward",
        },
      ],
      "Conditions": Array [
        Object {
          "Field": "path-pattern",
          "Values": Array [
            "/handleALB",
          ],
        },
        Object {
          "Field": "http-request-method",
          "HttpRequestMethodConfig": Object {
            "Values": Array [
              "POST",
            ],
          },
        },
      ],
      "ListenerArn": Object {
        "Ref": "httpListener",
      },
      "Priority": 1,
    },
    "Type": "AWS::ElasticLoadBalancingV2::ListenerRule",
  },
  "AlbEventAlbTargetGrouphttpListener": Object {
    "DependsOn": Array [
      "AlbEventLambdaPermissionRegisterTarget",
    ],
    "Properties": Object {
      "HealthCheckEnabled": true,
      "HealthCheckIntervalSeconds": 35,
      "HealthCheckPath": "/",
      "HealthCheckTimeoutSeconds": 30,
      "HealthyThresholdCount": 5,
      "Matcher": Object {
        "HttpCode": "200",
      },
      "Name": "1d5fdfd5099ec257209ef7b7c5ee8cb4",
      "Tags": Array [
        Object {
          "Key": "Name",
          "Value": "serverless-test-project-alb-albEvent-httpListener-dev",
        },
      ],
      "TargetGroupAttributes": Array [
        Object {
          "Key": "lambda.multi_value_headers.enabled",
          "Value": false,
        },
      ],
      "Targets": Array [
        Object {
          "Id": Object {
            "Fn::GetAtt": Array [
              "AlbEventLambdaFunction",
              "Arn",
            ],
          },
        },
      ],
      "TargetType": "lambda",
      "UnhealthyThresholdCount": 5,
    },
    "Type": "AWS::ElasticLoadBalancingV2::TargetGroup",
  },
  "AlbEventLambdaFunction": Object {
    "DependsOn": Array [
      "AlbEventLogGroup",
    ],
    "Metadata": Object {
      "slicWatch": Object {},
    },
    "Properties": Object {
      "Code": Object {
        "S3Bucket": Object {
          "Ref": "ServerlessDeploymentBucket",
        },
        "S3Key": "serverless/serverless-test-project-alb/dev/1701242684385-2023-11-29T07:24:44.385Z/serverless-test-project-alb.zip",
      },
      "FunctionName": "serverless-test-project-alb-dev-albEvent",
      "Handler": "alb-handler.handleALB",
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
  "AlbEventLambdaPermissionAlb": Object {
    "Properties": Object {
      "Action": "lambda:InvokeFunction",
      "FunctionName": Object {
        "Fn::GetAtt": Array [
          "AlbEventLambdaFunction",
          "Arn",
        ],
      },
      "Principal": "elasticloadbalancing.amazonaws.com",
      "SourceArn": Object {
        "Ref": "AlbEventAlbTargetGrouphttpListener",
      },
    },
    "Type": "AWS::Lambda::Permission",
  },
  "AlbEventLambdaPermissionRegisterTarget": Object {
    "Properties": Object {
      "Action": "lambda:InvokeFunction",
      "FunctionName": Object {
        "Fn::GetAtt": Array [
          "AlbEventLambdaFunction",
          "Arn",
        ],
      },
      "Principal": "elasticloadbalancing.amazonaws.com",
    },
    "Type": "AWS::Lambda::Permission",
  },
  "AlbEventLambdaVersion0XznAenLykwY99KhRhuWhGA2GO8nTdlRqGtjPoaDgg": Object {
    "DeletionPolicy": "Retain",
    "Properties": Object {
      "CodeSha256": "iF0ZcJ5dWZd/RnBzvEqO7WAQlHbLsco8p4dUx4U7AL8=",
      "FunctionName": Object {
        "Ref": "AlbEventLambdaFunction",
      },
    },
    "Type": "AWS::Lambda::Version",
  },
  "AlbEventLogGroup": Object {
    "Properties": Object {
      "LogGroupName": "/aws/lambda/serverless-test-project-alb-dev-albEvent",
    },
    "Type": "AWS::Logs::LogGroup",
  },
  "albSecurityGroup": Object {
    "Properties": Object {
      "GroupDescription": "Allow http to client host",
      "SecurityGroupIngress": Array [
        Object {
          "CidrIp": "0.0.0.0/0",
          "FromPort": 80,
          "IpProtocol": "tcp",
          "ToPort": 80,
        },
        Object {
          "CidrIp": "0.0.0.0/0",
          "FromPort": 443,
          "IpProtocol": "tcp",
          "ToPort": 443,
        },
      ],
      "VpcId": Object {
        "Ref": "vpcALB",
      },
    },
    "Type": "AWS::EC2::SecurityGroup",
  },
  "bucket": Object {
    "Type": "AWS::S3::Bucket",
  },
  "httpListener": Object {
    "Properties": Object {
      "DefaultActions": Array [
        Object {
          "RedirectConfig": Object {
            "Host": "#{host}",
            "Path": "/#{path}",
            "Port": 400,
            "Protocol": "HTTP",
            "Query": "#{query}",
            "StatusCode": "HTTP_301",
          },
          "Type": "redirect",
        },
      ],
      "LoadBalancerArn": Object {
        "Ref": "alb",
      },
      "Port": 80,
      "Protocol": "HTTP",
    },
    "Type": "AWS::ElasticLoadBalancingV2::Listener",
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
                    "Fn::Sub": "arn:\${AWS::Partition}:logs:\${AWS::Region}:\${AWS::AccountId}:log-group:/aws/lambda/serverless-test-project-alb-dev*:*",
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
                    "Fn::Sub": "arn:\${AWS::Partition}:logs:\${AWS::Region}:\${AWS::AccountId}:log-group:/aws/lambda/serverless-test-project-alb-dev*:*:*",
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
                "serverless-test-project-alb",
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
            "serverless-test-project-alb",
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
  "internetGateway": Object {
    "Properties": Object {
      "Tags": Array [
        Object {
          "Key": "ProjectName",
          "Value": "serverless-test-project-alb",
        },
        Object {
          "Key": "Stage",
          "Value": "dev",
        },
      ],
    },
    "Type": "AWS::EC2::InternetGateway",
  },
  "routeTableA": Object {
    "Properties": Object {
      "Tags": Array [
        Object {
          "Key": "ProjectName",
          "Value": "serverless-test-project-alb",
        },
        Object {
          "Key": "Stage",
          "Value": "dev",
        },
      ],
      "VpcId": Object {
        "Ref": "vpcALB",
      },
    },
    "Type": "AWS::EC2::RouteTable",
  },
  "routeTableAInternetRoute": Object {
    "DependsOn": Array [
      "vpcGatewayAttachment",
    ],
    "Properties": Object {
      "DestinationCidrBlock": "0.0.0.0/0",
      "GatewayId": Object {
        "Ref": "internetGateway",
      },
      "RouteTableId": Object {
        "Ref": "routeTableA",
      },
    },
    "Type": "AWS::EC2::Route",
  },
  "routeTableAssociationSubnetA": Object {
    "Properties": Object {
      "RouteTableId": Object {
        "Ref": "routeTableA",
      },
      "SubnetId": Object {
        "Ref": "subnetA",
      },
    },
    "Type": "AWS::EC2::SubnetRouteTableAssociation",
  },
  "routeTableAssociationSubnetB": Object {
    "Properties": Object {
      "RouteTableId": Object {
        "Ref": "routeTableB",
      },
      "SubnetId": Object {
        "Ref": "subnetB",
      },
    },
    "Type": "AWS::EC2::SubnetRouteTableAssociation",
  },
  "routeTableB": Object {
    "Properties": Object {
      "Tags": Array [
        Object {
          "Key": "ProjectName",
          "Value": "serverless-test-project-alb",
        },
        Object {
          "Key": "Stage",
          "Value": "dev",
        },
      ],
      "VpcId": Object {
        "Ref": "vpcALB",
      },
    },
    "Type": "AWS::EC2::RouteTable",
  },
  "routeTableBInternetRoute": Object {
    "DependsOn": Array [
      "vpcGatewayAttachment",
    ],
    "Properties": Object {
      "DestinationCidrBlock": "0.0.0.0/0",
      "GatewayId": Object {
        "Ref": "internetGateway",
      },
      "RouteTableId": Object {
        "Ref": "routeTableB",
      },
    },
    "Type": "AWS::EC2::Route",
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
  "subnetA": Object {
    "Properties": Object {
      "AvailabilityZone": "eu-west-1a",
      "CidrBlock": "10.0.5.0/24",
      "Tags": Array [
        Object {
          "Key": "ProjectName",
          "Value": "serverless-test-project-alb",
        },
        Object {
          "Key": "Stage",
          "Value": "dev",
        },
      ],
      "VpcId": Object {
        "Ref": "vpcALB",
      },
    },
    "Type": "AWS::EC2::Subnet",
  },
  "subnetB": Object {
    "Properties": Object {
      "AvailabilityZone": "eu-west-1b",
      "CidrBlock": "10.0.6.0/24",
      "Tags": Array [
        Object {
          "Key": "ProjectName",
          "Value": "serverless-test-project-alb",
        },
        Object {
          "Key": "Stage",
          "Value": "dev",
        },
      ],
      "VpcId": Object {
        "Ref": "vpcALB",
      },
    },
    "Type": "AWS::EC2::Subnet",
  },
  "vpcALB": Object {
    "Properties": Object {
      "CidrBlock": "10.0.0.0/20",
      "EnableDnsHostnames": true,
      "EnableDnsSupport": true,
      "InstanceTenancy": "default",
      "Tags": Array [
        Object {
          "Key": "ProjectName",
          "Value": "serverless-test-project-alb",
        },
        Object {
          "Key": "Stage",
          "Value": "dev",
        },
      ],
    },
    "Type": "AWS::EC2::VPC",
  },
  "vpcGatewayAttachment": Object {
    "Properties": Object {
      "InternetGatewayId": Object {
        "Ref": "internetGateway",
      },
      "VpcId": Object {
        "Ref": "vpcALB",
      },
    },
    "Type": "AWS::EC2::VPCGatewayAttachment",
  },
}
`

/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`cdk-test-project/tests/snapshot/cdk-test-project-snapshot.test.ts > TAP > the Macro adds SLIC Watch dashboards and alarms to synthesized CDK project > ecsStack > ecsStack fragment 1`] = `
{
  "Transform": "SlicWatch-v3",
  "Metadata": {
    "slicWatch": {
      "enabled": true,
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
    "MyWebServerLB3B5FD3AB": {
      "Type": "AWS::ElasticLoadBalancingV2::LoadBalancer",
      "Properties": {
        "LoadBalancerAttributes": [
          {
            "Key": "deletion_protection.enabled",
            "Value": "false"
          }
        ],
        "Scheme": "internet-facing",
        "SecurityGroups": [
          {
            "Fn::GetAtt": [
              "MyWebServerLBSecurityGroup01B285AA",
              "GroupId"
            ]
          }
        ],
        "Subnets": [
          {
            "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1Subnet3C273B99"
          },
          {
            "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2Subnet95FF715A"
          }
        ],
        "Type": "application"
      },
      "DependsOn": [
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1DefaultRouteFF4E2178",
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1RouteTableAssociation8B583A17",
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2DefaultRouteB1375520",
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2RouteTableAssociation43E5803C"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/LB/Resource"
      }
    },
    "MyWebServerLBSecurityGroup01B285AA": {
      "Type": "AWS::EC2::SecurityGroup",
      "Properties": {
        "GroupDescription": "Automatically created Security Group for ELB CdkECSStackTestEuropeMyWebServerLBE298D4B6",
        "SecurityGroupIngress": [
          {
            "CidrIp": "0.0.0.0/0",
            "Description": "Allow from anyone on port 80",
            "FromPort": 80,
            "IpProtocol": "tcp",
            "ToPort": 80
          }
        ],
        "VpcId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521"
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/LB/SecurityGroup/Resource"
      }
    },
    "MyWebServerLBSecurityGrouptoCdkECSStackTestEuropeMyWebServerServiceSecurityGroup792A2ECD807CF0A9FB": {
      "Type": "AWS::EC2::SecurityGroupEgress",
      "Properties": {
        "GroupId": {
          "Fn::GetAtt": [
            "MyWebServerLBSecurityGroup01B285AA",
            "GroupId"
          ]
        },
        "IpProtocol": "tcp",
        "Description": "Load balancer to target",
        "DestinationSecurityGroupId": {
          "Fn::GetAtt": [
            "MyWebServerServiceSecurityGroup6788214A",
            "GroupId"
          ]
        },
        "FromPort": 80,
        "ToPort": 80
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/LB/SecurityGroup/to CdkECSStackTestEuropeMyWebServerServiceSecurityGroup792A2ECD:80"
      }
    },
    "MyWebServerLBPublicListener03D7C493": {
      "Type": "AWS::ElasticLoadBalancingV2::Listener",
      "Properties": {
        "DefaultActions": [
          {
            "TargetGroupArn": {
              "Ref": "MyWebServerLBPublicListenerECSGroup5AB9F1C3"
            },
            "Type": "forward"
          }
        ],
        "LoadBalancerArn": {
          "Ref": "MyWebServerLB3B5FD3AB"
        },
        "Port": 80,
        "Protocol": "HTTP"
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/LB/PublicListener/Resource"
      }
    },
    "MyWebServerLBPublicListenerECSGroup5AB9F1C3": {
      "Type": "AWS::ElasticLoadBalancingV2::TargetGroup",
      "Properties": {
        "Port": 80,
        "Protocol": "HTTP",
        "TargetGroupAttributes": [
          {
            "Key": "stickiness.enabled",
            "Value": "false"
          }
        ],
        "TargetType": "ip",
        "VpcId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521"
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/LB/PublicListener/ECSGroup/Resource"
      }
    },
    "MyWebServerTaskDefTaskRoleB23C17AA": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "ecs-tasks.amazonaws.com"
              }
            }
          ],
          "Version": "2012-10-17"
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/TaskDef/TaskRole/Resource"
      }
    },
    "MyWebServerTaskDef4CE825A0": {
      "Type": "AWS::ECS::TaskDefinition",
      "Properties": {
        "ContainerDefinitions": [
          {
            "Essential": true,
            "Image": "amazon/amazon-ecs-sample",
            "LogConfiguration": {
              "LogDriver": "awslogs",
              "Options": {
                "awslogs-group": {
                  "Ref": "MyWebServerTaskDefwebLogGroupC6EE23D4"
                },
                "awslogs-stream-prefix": "MyWebServer",
                "awslogs-region": "eu-west-1"
              }
            },
            "Name": "web",
            "PortMappings": [
              {
                "ContainerPort": 80,
                "Protocol": "tcp"
              }
            ]
          }
        ],
        "Cpu": "256",
        "ExecutionRoleArn": {
          "Fn::GetAtt": [
            "MyWebServerTaskDefExecutionRole3C69E361",
            "Arn"
          ]
        },
        "Family": "CdkECSStackTestEuropeMyWebServerTaskDef979012A1",
        "Memory": "512",
        "NetworkMode": "awsvpc",
        "RequiresCompatibilities": [
          "FARGATE"
        ],
        "TaskRoleArn": {
          "Fn::GetAtt": [
            "MyWebServerTaskDefTaskRoleB23C17AA",
            "Arn"
          ]
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/TaskDef/Resource"
      }
    },
    "MyWebServerTaskDefwebLogGroupC6EE23D4": {
      "Type": "AWS::Logs::LogGroup",
      "UpdateReplacePolicy": "Retain",
      "DeletionPolicy": "Retain",
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/TaskDef/web/LogGroup/Resource"
      }
    },
    "MyWebServerTaskDefExecutionRole3C69E361": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "ecs-tasks.amazonaws.com"
              }
            }
          ],
          "Version": "2012-10-17"
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/TaskDef/ExecutionRole/Resource"
      }
    },
    "MyWebServerTaskDefExecutionRoleDefaultPolicy2AEB4329": {
      "Type": "AWS::IAM::Policy",
      "Properties": {
        "PolicyDocument": {
          "Statement": [
            {
              "Action": [
                "logs:CreateLogStream",
                "logs:PutLogEvents"
              ],
              "Effect": "Allow",
              "Resource": {
                "Fn::GetAtt": [
                  "MyWebServerTaskDefwebLogGroupC6EE23D4",
                  "Arn"
                ]
              }
            }
          ],
          "Version": "2012-10-17"
        },
        "PolicyName": "MyWebServerTaskDefExecutionRoleDefaultPolicy2AEB4329",
        "Roles": [
          {
            "Ref": "MyWebServerTaskDefExecutionRole3C69E361"
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/TaskDef/ExecutionRole/DefaultPolicy/Resource"
      }
    },
    "MyWebServerService2FE7341D": {
      "Type": "AWS::ECS::Service",
      "Properties": {
        "Cluster": {
          "Ref": "EcsDefaultClusterMnL3mNNYN926A5246"
        },
        "DeploymentConfiguration": {
          "MaximumPercent": 200,
          "MinimumHealthyPercent": 50
        },
        "EnableECSManagedTags": false,
        "HealthCheckGracePeriodSeconds": 60,
        "LaunchType": "FARGATE",
        "LoadBalancers": [
          {
            "ContainerName": "web",
            "ContainerPort": 80,
            "TargetGroupArn": {
              "Ref": "MyWebServerLBPublicListenerECSGroup5AB9F1C3"
            }
          }
        ],
        "NetworkConfiguration": {
          "AwsvpcConfiguration": {
            "AssignPublicIp": "DISABLED",
            "SecurityGroups": [
              {
                "Fn::GetAtt": [
                  "MyWebServerServiceSecurityGroup6788214A",
                  "GroupId"
                ]
              }
            ],
            "Subnets": [
              {
                "Ref": "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1Subnet075EFF4C"
              },
              {
                "Ref": "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2SubnetE4CEDF73"
              }
            ]
          }
        },
        "TaskDefinition": {
          "Ref": "MyWebServerTaskDef4CE825A0"
        }
      },
      "DependsOn": [
        "MyWebServerLBPublicListenerECSGroup5AB9F1C3",
        "MyWebServerLBPublicListener03D7C493",
        "MyWebServerTaskDefTaskRoleB23C17AA"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/Service/Service"
      }
    },
    "MyWebServerServiceSecurityGroup6788214A": {
      "Type": "AWS::EC2::SecurityGroup",
      "Properties": {
        "GroupDescription": "CdkECSStackTest-Europe/MyWebServer/Service/SecurityGroup",
        "SecurityGroupEgress": [
          {
            "CidrIp": "0.0.0.0/0",
            "Description": "Allow all outbound traffic by default",
            "IpProtocol": "-1"
          }
        ],
        "VpcId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521"
        }
      },
      "DependsOn": [
        "MyWebServerTaskDefTaskRoleB23C17AA"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/Service/SecurityGroup/Resource"
      }
    },
    "MyWebServerServiceSecurityGroupfromCdkECSStackTestEuropeMyWebServerLBSecurityGroup8823910380E44CF71E": {
      "Type": "AWS::EC2::SecurityGroupIngress",
      "Properties": {
        "IpProtocol": "tcp",
        "Description": "Load balancer to target",
        "FromPort": 80,
        "GroupId": {
          "Fn::GetAtt": [
            "MyWebServerServiceSecurityGroup6788214A",
            "GroupId"
          ]
        },
        "SourceSecurityGroupId": {
          "Fn::GetAtt": [
            "MyWebServerLBSecurityGroup01B285AA",
            "GroupId"
          ]
        },
        "ToPort": 80
      },
      "DependsOn": [
        "MyWebServerTaskDefTaskRoleB23C17AA"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/Service/SecurityGroup/from CdkECSStackTestEuropeMyWebServerLBSecurityGroup88239103:80"
      }
    },
    "EcsDefaultClusterMnL3mNNYN926A5246": {
      "Type": "AWS::ECS::Cluster",
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Resource"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpc7788A521": {
      "Type": "AWS::EC2::VPC",
      "Properties": {
        "CidrBlock": "10.0.0.0/16",
        "EnableDnsHostnames": true,
        "EnableDnsSupport": true,
        "InstanceTenancy": "default",
        "Tags": [
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc"
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/Resource"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1Subnet3C273B99": {
      "Type": "AWS::EC2::Subnet",
      "Properties": {
        "VpcId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521"
        },
        "AvailabilityZone": {
          "Fn::Select": [
            0,
            {
              "Fn::GetAZs": ""
            }
          ]
        },
        "CidrBlock": "10.0.0.0/18",
        "MapPublicIpOnLaunch": true,
        "Tags": [
          {
            "Key": "aws-cdk:subnet-name",
            "Value": "Public"
          },
          {
            "Key": "aws-cdk:subnet-type",
            "Value": "Public"
          },
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1"
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1/Subnet"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1RouteTableA1FD6ACC": {
      "Type": "AWS::EC2::RouteTable",
      "Properties": {
        "VpcId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521"
        },
        "Tags": [
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1"
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1/RouteTable"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1RouteTableAssociation8B583A17": {
      "Type": "AWS::EC2::SubnetRouteTableAssociation",
      "Properties": {
        "RouteTableId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1RouteTableA1FD6ACC"
        },
        "SubnetId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1Subnet3C273B99"
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1/RouteTableAssociation"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1DefaultRouteFF4E2178": {
      "Type": "AWS::EC2::Route",
      "Properties": {
        "RouteTableId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1RouteTableA1FD6ACC"
        },
        "DestinationCidrBlock": "0.0.0.0/0",
        "GatewayId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcIGW9C2C2B8F"
        }
      },
      "DependsOn": [
        "EcsDefaultClusterMnL3mNNYNVpcVPCGW2447264E"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1/DefaultRoute"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1EIP8704DB2F": {
      "Type": "AWS::EC2::EIP",
      "Properties": {
        "Domain": "vpc",
        "Tags": [
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1"
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1/EIP"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1NATGateway5E3732C1": {
      "Type": "AWS::EC2::NatGateway",
      "Properties": {
        "SubnetId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1Subnet3C273B99"
        },
        "AllocationId": {
          "Fn::GetAtt": [
            "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1EIP8704DB2F",
            "AllocationId"
          ]
        },
        "Tags": [
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1"
          }
        ]
      },
      "DependsOn": [
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1DefaultRouteFF4E2178",
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1RouteTableAssociation8B583A17"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1/NATGateway"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2Subnet95FF715A": {
      "Type": "AWS::EC2::Subnet",
      "Properties": {
        "VpcId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521"
        },
        "AvailabilityZone": {
          "Fn::Select": [
            1,
            {
              "Fn::GetAZs": ""
            }
          ]
        },
        "CidrBlock": "10.0.64.0/18",
        "MapPublicIpOnLaunch": true,
        "Tags": [
          {
            "Key": "aws-cdk:subnet-name",
            "Value": "Public"
          },
          {
            "Key": "aws-cdk:subnet-type",
            "Value": "Public"
          },
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2"
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2/Subnet"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2RouteTable263DEAA5": {
      "Type": "AWS::EC2::RouteTable",
      "Properties": {
        "VpcId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521"
        },
        "Tags": [
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2"
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2/RouteTable"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2RouteTableAssociation43E5803C": {
      "Type": "AWS::EC2::SubnetRouteTableAssociation",
      "Properties": {
        "RouteTableId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2RouteTable263DEAA5"
        },
        "SubnetId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2Subnet95FF715A"
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2/RouteTableAssociation"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2DefaultRouteB1375520": {
      "Type": "AWS::EC2::Route",
      "Properties": {
        "RouteTableId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2RouteTable263DEAA5"
        },
        "DestinationCidrBlock": "0.0.0.0/0",
        "GatewayId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcIGW9C2C2B8F"
        }
      },
      "DependsOn": [
        "EcsDefaultClusterMnL3mNNYNVpcVPCGW2447264E"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2/DefaultRoute"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2EIPF0764873": {
      "Type": "AWS::EC2::EIP",
      "Properties": {
        "Domain": "vpc",
        "Tags": [
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2"
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2/EIP"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2NATGateway4C855E00": {
      "Type": "AWS::EC2::NatGateway",
      "Properties": {
        "SubnetId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2Subnet95FF715A"
        },
        "AllocationId": {
          "Fn::GetAtt": [
            "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2EIPF0764873",
            "AllocationId"
          ]
        },
        "Tags": [
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2"
          }
        ]
      },
      "DependsOn": [
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2DefaultRouteB1375520",
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2RouteTableAssociation43E5803C"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2/NATGateway"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1Subnet075EFF4C": {
      "Type": "AWS::EC2::Subnet",
      "Properties": {
        "VpcId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521"
        },
        "AvailabilityZone": {
          "Fn::Select": [
            0,
            {
              "Fn::GetAZs": ""
            }
          ]
        },
        "CidrBlock": "10.0.128.0/18",
        "MapPublicIpOnLaunch": false,
        "Tags": [
          {
            "Key": "aws-cdk:subnet-name",
            "Value": "Private"
          },
          {
            "Key": "aws-cdk:subnet-type",
            "Value": "Private"
          },
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet1"
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet1/Subnet"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1RouteTable4F1D2E36": {
      "Type": "AWS::EC2::RouteTable",
      "Properties": {
        "VpcId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521"
        },
        "Tags": [
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet1"
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet1/RouteTable"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1RouteTableAssociation34B92275": {
      "Type": "AWS::EC2::SubnetRouteTableAssociation",
      "Properties": {
        "RouteTableId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1RouteTable4F1D2E36"
        },
        "SubnetId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1Subnet075EFF4C"
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet1/RouteTableAssociation"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1DefaultRouteA5ADF694": {
      "Type": "AWS::EC2::Route",
      "Properties": {
        "RouteTableId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1RouteTable4F1D2E36"
        },
        "DestinationCidrBlock": "0.0.0.0/0",
        "NatGatewayId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1NATGateway5E3732C1"
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet1/DefaultRoute"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2SubnetE4CEDF73": {
      "Type": "AWS::EC2::Subnet",
      "Properties": {
        "VpcId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521"
        },
        "AvailabilityZone": {
          "Fn::Select": [
            1,
            {
              "Fn::GetAZs": ""
            }
          ]
        },
        "CidrBlock": "10.0.192.0/18",
        "MapPublicIpOnLaunch": false,
        "Tags": [
          {
            "Key": "aws-cdk:subnet-name",
            "Value": "Private"
          },
          {
            "Key": "aws-cdk:subnet-type",
            "Value": "Private"
          },
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet2"
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet2/Subnet"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2RouteTableDCE46591": {
      "Type": "AWS::EC2::RouteTable",
      "Properties": {
        "VpcId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521"
        },
        "Tags": [
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet2"
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet2/RouteTable"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2RouteTableAssociation111C622F": {
      "Type": "AWS::EC2::SubnetRouteTableAssociation",
      "Properties": {
        "RouteTableId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2RouteTableDCE46591"
        },
        "SubnetId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2SubnetE4CEDF73"
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet2/RouteTableAssociation"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2DefaultRoute20CE2D89": {
      "Type": "AWS::EC2::Route",
      "Properties": {
        "RouteTableId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2RouteTableDCE46591"
        },
        "DestinationCidrBlock": "0.0.0.0/0",
        "NatGatewayId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2NATGateway4C855E00"
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet2/DefaultRoute"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpcIGW9C2C2B8F": {
      "Type": "AWS::EC2::InternetGateway",
      "Properties": {
        "Tags": [
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc"
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/IGW"
      }
    },
    "EcsDefaultClusterMnL3mNNYNVpcVPCGW2447264E": {
      "Type": "AWS::EC2::VPCGatewayAttachment",
      "Properties": {
        "VpcId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521"
        },
        "InternetGatewayId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcIGW9C2C2B8F"
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/VPCGW"
      }
    },
    "CDKMetadata": {
      "Type": "AWS::CDK::Metadata",
      "Properties": {
        "Analytics": "v2:deflate64:H4sIAAAAAAAA/31Ry27CMBD8Fu7GbTlUXCmlCAm1UYK4IsfZpgvBjux1EIry73WepLSqFGlnx+PsembG58/8cSIudiqT0zTDmJcRCXlinjqUIO0hF0RglOWLPM9QCkKttlokLyITSkLyJkwqCCIwBUpgkAlLKDOviBsFqrSY8fLv24YtP3/2Yx1aAtVpejw63/nJQGujXV5LRm3FQPqZEUhnkK6D5H9ilRqw9he9US2/z2V9tg+WLHCxXyJysQJq9AMKtSPYiTiDG3/jFtZqic3yg7gGq01Ql3dBa2/lRVxZYLCoXR1+vFF1CjAI2k26bkE+s68zKKpfbnnZhbIT9vQKn6iwH3nPaEUCva8j7i7Qxo4OZs6n0OTRwYqhOPMy1O17mxpo702zYIsqlunU77TV6eB7j6uq7j4c5Y5YCFY7047sccWUToAf7UPxNOf+m02OFnFqnCI8Aw/b+g3+NWTOyAIAAA=="
      },
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/CDKMetadata/Default"
      }
    },
    "slicWatchECSMemoryAlarmMyWebServerService2FE7341D": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "ECS_MemoryAlarm_\${MyWebServerService2FE7341D.Name}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "ECS MemoryUtilization for \${MyWebServerService2FE7341D.Name} breaches 90",
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
                "MyWebServerService2FE7341D",
                "Name"
              ]
            }
          },
          {
            "Name": "ClusterName",
            "Value": {
              "Ref": "EcsDefaultClusterMnL3mNNYN926A5246"
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
    "slicWatchECSCPUAlarmMyWebServerService2FE7341D": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "ECS_CPUAlarm_\${MyWebServerService2FE7341D.Name}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "ECS CPUUtilization for \${MyWebServerService2FE7341D.Name} breaches 90",
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
                "MyWebServerService2FE7341D",
                "Name"
              ]
            }
          },
          {
            "Name": "ClusterName",
            "Value": {
              "Ref": "EcsDefaultClusterMnL3mNNYN926A5246"
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
    "slicWatchLoadBalancerHTTPCodeELB5XXCountAlarmMyWebServerLB3B5FD3AB": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "OKActions": [],
        "MetricName": "HTTPCode_ELB_5XX_Count",
        "Namespace": "AWS/ApplicationELB",
        "Dimensions": [
          {
            "Name": "LoadBalancer",
            "Value": {
              "Fn::GetAtt": [
                "MyWebServerLB3B5FD3AB",
                "LoadBalancerFullName"
              ]
            }
          }
        ],
        "AlarmName": "LoadBalancer_HTTPCodeELB5XXCountAlarm_MyWebServerLB3B5FD3AB",
        "AlarmDescription": "LoadBalancer HTTPCodeELB5XXCount Sum for MyWebServerLB3B5FD3AB  breaches 0",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 0
      }
    },
    "slicWatchLoadBalancerRejectedConnectionCountAlarmMyWebServerLB3B5FD3AB": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "OKActions": [],
        "MetricName": "RejectedConnectionCount",
        "Namespace": "AWS/ApplicationELB",
        "Dimensions": [
          {
            "Name": "LoadBalancer",
            "Value": {
              "Fn::GetAtt": [
                "MyWebServerLB3B5FD3AB",
                "LoadBalancerFullName"
              ]
            }
          }
        ],
        "AlarmName": "LoadBalancer_RejectedConnectionCountAlarm_MyWebServerLB3B5FD3AB",
        "AlarmDescription": "LoadBalancer RejectedConnectionCount Sum for MyWebServerLB3B5FD3AB  breaches 0",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 0
      }
    },
    "slicWatchLoadBalancerHTTPCodeTarget5XXCountAlarmMyWebServerLBPublicListenerECSGroup5AB9F1C3": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "OKActions": [],
        "AlarmName": "LoadBalancer_HTTPCodeTarget5XXCountAlarm_MyWebServerLBPublicListenerECSGroup5AB9F1C3",
        "AlarmDescription": "LoadBalancer HTTPCode_Target_5XX_Count Sum for MyWebServerLBPublicListenerECSGroup5AB9F1C3 breaches 0",
        "MetricName": "HTTPCode_Target_5XX_Count",
        "Statistic": "Sum",
        "Namespace": "AWS/ApplicationELB",
        "Dimensions": [
          {
            "Name": "TargetGroup",
            "Value": {
              "Fn::GetAtt": [
                "MyWebServerLBPublicListenerECSGroup5AB9F1C3",
                "TargetGroupFullName"
              ]
            }
          },
          {
            "Name": "LoadBalancer",
            "Value": {
              "Fn::GetAtt": [
                "MyWebServerLB3B5FD3AB",
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
    "slicWatchLoadBalancerUnHealthyHostCountAlarmMyWebServerLBPublicListenerECSGroup5AB9F1C3": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "OKActions": [],
        "AlarmName": "LoadBalancer_UnHealthyHostCountAlarm_MyWebServerLBPublicListenerECSGroup5AB9F1C3",
        "AlarmDescription": "LoadBalancer UnHealthyHostCount Average for MyWebServerLBPublicListenerECSGroup5AB9F1C3 breaches 0",
        "MetricName": "UnHealthyHostCount",
        "Statistic": "Average",
        "Namespace": "AWS/ApplicationELB",
        "Dimensions": [
          {
            "Name": "TargetGroup",
            "Value": {
              "Fn::GetAtt": [
                "MyWebServerLBPublicListenerECSGroup5AB9F1C3",
                "TargetGroupFullName"
              ]
            }
          },
          {
            "Name": "LoadBalancer",
            "Value": {
              "Fn::GetAtt": [
                "MyWebServerLB3B5FD3AB",
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
                      "AWS/ECS",
                      "MemoryUtilization",
                      "ServiceName",
                      "\${MyWebServerService2FE7341D.Name}",
                      "ClusterName",
                      "\${EcsDefaultClusterMnL3mNNYN926A5246}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/ECS",
                      "CPUUtilization",
                      "ServiceName",
                      "\${MyWebServerService2FE7341D.Name}",
                      "ClusterName",
                      "\${EcsDefaultClusterMnL3mNNYN926A5246}",
                      {
                        "stat": "Average"
                      }
                    ]
                  ],
                  "title": "ECS Service \${MyWebServerService2FE7341D.Name}",
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
                      "AWS/ApplicationELB",
                      "HTTPCode_ELB_5XX_Count",
                      "LoadBalancer",
                      "\${MyWebServerLB3B5FD3AB.LoadBalancerFullName}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/ApplicationELB",
                      "RejectedConnectionCount",
                      "LoadBalancer",
                      "\${MyWebServerLB3B5FD3AB.LoadBalancerFullName}",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "ALB \${MyWebServerLB3B5FD3AB.LoadBalancerName}",
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
                      "AWS/ApplicationELB",
                      "HTTPCode_Target_5XX_Count",
                      "LoadBalancer",
                      "\${MyWebServerLB3B5FD3AB.LoadBalancerFullName}",
                      "TargetGroup",
                      "\${MyWebServerLBPublicListenerECSGroup5AB9F1C3.TargetGroupFullName}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/ApplicationELB",
                      "UnHealthyHostCount",
                      "LoadBalancer",
                      "\${MyWebServerLB3B5FD3AB.LoadBalancerFullName}",
                      "TargetGroup",
                      "\${MyWebServerLBPublicListenerECSGroup5AB9F1C3.TargetGroupFullName}",
                      {
                        "stat": "Average"
                      }
                    ]
                  ],
                  "title": "Target Group \${MyWebServerLB3B5FD3AB.LoadBalancerName}/\${MyWebServerLBPublicListenerECSGroup5AB9F1C3.TargetGroupName}",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 16,
                "y": 0
              }
            ]
          }
        }
      }
    }
  },
  "Outputs": {
    "MyWebServerLoadBalancerDNSD1AFCC81": {
      "Value": {
        "Fn::GetAtt": [
          "MyWebServerLB3B5FD3AB",
          "DNSName"
        ]
      }
    },
    "MyWebServerServiceURLB0ED50F6": {
      "Value": {
        "Fn::Join": [
          "",
          [
            "http://",
            {
              "Fn::GetAtt": [
                "MyWebServerLB3B5FD3AB",
                "DNSName"
              ]
            }
          ]
        ]
      }
    }
  },
  "Parameters": {
    "BootstrapVersion": {
      "Type": "AWS::SSM::Parameter::Value<String>",
      "Default": "/cdk-bootstrap/hnb659fds/version",
      "Description": "Version of the CDK Bootstrap resources in this environment, automatically retrieved from SSM Parameter Store. [cdk:skip]"
    }
  },
  "Rules": {
    "CheckBootstrapVersion": {
      "Assertions": [
        {
          "Assert": {
            "Fn::Not": [
              {
                "Fn::Contains": [
                  [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5"
                  ],
                  {
                    "Ref": "BootstrapVersion"
                  }
                ]
              }
            ]
          },
          "AssertDescription": "CDK bootstrap stack version 6 required. Please run 'cdk bootstrap' with a recent version of the CDK CLI."
        }
      ]
    }
  }
}
`

exports[`cdk-test-project/tests/snapshot/cdk-test-project-snapshot.test.ts > TAP > the Macro adds SLIC Watch dashboards and alarms to synthesized CDK project > generalEuStack > generalEuStack fragment 1`] = `
{
  "Transform": "SlicWatch-v3",
  "Metadata": {
    "slicWatch": {
      "enabled": true,
      "topicArn": "arn:aws:xxxxxx:mytopic",
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
      },
      "alarmActionsConfig": {
        "alarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ]
      }
    }
  },
  "Resources": {
    "MyTopic86869434": {
      "Type": "AWS::SNS::Topic",
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/MyTopic/Resource"
      }
    },
    "HelloHandlerServiceRole11EF7C63": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              }
            }
          ],
          "Version": "2012-10-17"
        },
        "ManagedPolicyArns": [
          {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition"
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
              ]
            ]
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/HelloHandler/ServiceRole/Resource"
      }
    },
    "HelloHandler2E4FBA4D": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-eu-west-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Role": {
          "Fn::GetAtt": [
            "HelloHandlerServiceRole11EF7C63",
            "Arn"
          ]
        },
        "Handler": "hello.handler",
        "Runtime": "nodejs18.x"
      },
      "DependsOn": [
        "HelloHandlerServiceRole11EF7C63"
      ],
      "Metadata": {
        "slicWatch": {
          "alarms": {
            "Lambda": {
              "Invocations": {
                "Threshold": 4
              }
            }
          }
        }
      }
    },
    "PingHandlerServiceRole46086423": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              }
            }
          ],
          "Version": "2012-10-17"
        },
        "ManagedPolicyArns": [
          {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition"
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
              ]
            ]
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/PingHandler/ServiceRole/Resource"
      }
    },
    "PingHandler50068074": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-eu-west-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Role": {
          "Fn::GetAtt": [
            "PingHandlerServiceRole46086423",
            "Arn"
          ]
        },
        "Handler": "hello.handler",
        "Runtime": "nodejs18.x"
      },
      "DependsOn": [
        "PingHandlerServiceRole46086423"
      ],
      "Metadata": {
        "slicWatch": {
          "dashboard": {
            "enabled": false
          }
        }
      }
    },
    "ThrottlerHandlerServiceRoleA0481DAF": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              }
            }
          ],
          "Version": "2012-10-17"
        },
        "ManagedPolicyArns": [
          {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition"
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
              ]
            ]
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/ThrottlerHandler/ServiceRole/Resource"
      }
    },
    "ThrottlerHandler750A7C89": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-eu-west-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Role": {
          "Fn::GetAtt": [
            "ThrottlerHandlerServiceRoleA0481DAF",
            "Arn"
          ]
        },
        "Handler": "hello.handler",
        "ReservedConcurrentExecutions": 0,
        "Runtime": "nodejs18.x"
      },
      "DependsOn": [
        "ThrottlerHandlerServiceRoleA0481DAF"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/ThrottlerHandler/Resource",
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:is-bundled": false,
        "aws:asset:property": "Code"
      }
    },
    "DriveStreamHandlerServiceRoleD2BAFDD4": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              }
            }
          ],
          "Version": "2012-10-17"
        },
        "ManagedPolicyArns": [
          {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition"
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
              ]
            ]
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DriveStreamHandler/ServiceRole/Resource"
      }
    },
    "DriveStreamHandler62F1767B": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-eu-west-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Role": {
          "Fn::GetAtt": [
            "DriveStreamHandlerServiceRoleD2BAFDD4",
            "Arn"
          ]
        },
        "Handler": "stream-test-handler.handleDrive",
        "Runtime": "nodejs18.x"
      },
      "DependsOn": [
        "DriveStreamHandlerServiceRoleD2BAFDD4"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DriveStreamHandler/Resource",
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:is-bundled": false,
        "aws:asset:property": "Code"
      }
    },
    "DriveQueueHandlerServiceRoleD796850A": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              }
            }
          ],
          "Version": "2012-10-17"
        },
        "ManagedPolicyArns": [
          {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition"
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
              ]
            ]
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DriveQueueHandler/ServiceRole/Resource"
      }
    },
    "DriveQueueHandler9F657A00": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-eu-west-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Role": {
          "Fn::GetAtt": [
            "DriveQueueHandlerServiceRoleD796850A",
            "Arn"
          ]
        },
        "Handler": "hello.handler",
        "Runtime": "nodejs18.x"
      },
      "DependsOn": [
        "DriveQueueHandlerServiceRoleD796850A"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DriveQueueHandler/Resource",
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:is-bundled": false,
        "aws:asset:property": "Code"
      }
    },
    "DriveTableHandlerServiceRoleDDA3FBE1": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              }
            }
          ],
          "Version": "2012-10-17"
        },
        "ManagedPolicyArns": [
          {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition"
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
              ]
            ]
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DriveTableHandler/ServiceRole/Resource"
      }
    },
    "DriveTableHandler119966B0": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-eu-west-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Role": {
          "Fn::GetAtt": [
            "DriveTableHandlerServiceRoleDDA3FBE1",
            "Arn"
          ]
        },
        "Handler": "hello.handler",
        "Runtime": "nodejs18.x"
      },
      "DependsOn": [
        "DriveTableHandlerServiceRoleDDA3FBE1"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DriveTableHandler/Resource",
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:is-bundled": false,
        "aws:asset:property": "Code"
      }
    },
    "myapi162F20B8": {
      "Type": "AWS::ApiGateway::RestApi",
      "Properties": {
        "Name": "myapi"
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Resource"
      }
    },
    "myapiCloudWatchRoleEB425128": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "apigateway.amazonaws.com"
              }
            }
          ],
          "Version": "2012-10-17"
        },
        "ManagedPolicyArns": [
          {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition"
                },
                ":iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs"
              ]
            ]
          }
        ]
      },
      "UpdateReplacePolicy": "Retain",
      "DeletionPolicy": "Retain",
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/CloudWatchRole/Resource"
      }
    },
    "myapiAccountC3A4750C": {
      "Type": "AWS::ApiGateway::Account",
      "Properties": {
        "CloudWatchRoleArn": {
          "Fn::GetAtt": [
            "myapiCloudWatchRoleEB425128",
            "Arn"
          ]
        }
      },
      "DependsOn": [
        "myapi162F20B8"
      ],
      "UpdateReplacePolicy": "Retain",
      "DeletionPolicy": "Retain",
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Account"
      }
    },
    "myapiDeploymentB7EF8EB76dbd4bbbb18c5c458967fb55792b4830": {
      "Type": "AWS::ApiGateway::Deployment",
      "Properties": {
        "RestApiId": {
          "Ref": "myapi162F20B8"
        },
        "Description": "Automatically created by the RestApi construct"
      },
      "DependsOn": [
        "myapiproxyANYDD7FCE64",
        "myapiproxyB6DF4575",
        "myapiANY111D56B7"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Deployment/Resource"
      }
    },
    "myapiDeploymentStageprod329F21FF": {
      "Type": "AWS::ApiGateway::Stage",
      "Properties": {
        "RestApiId": {
          "Ref": "myapi162F20B8"
        },
        "DeploymentId": {
          "Ref": "myapiDeploymentB7EF8EB76dbd4bbbb18c5c458967fb55792b4830"
        },
        "StageName": "prod"
      },
      "DependsOn": [
        "myapiAccountC3A4750C"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/DeploymentStage.prod/Resource"
      }
    },
    "myapiproxyB6DF4575": {
      "Type": "AWS::ApiGateway::Resource",
      "Properties": {
        "ParentId": {
          "Fn::GetAtt": [
            "myapi162F20B8",
            "RootResourceId"
          ]
        },
        "PathPart": "{proxy+}",
        "RestApiId": {
          "Ref": "myapi162F20B8"
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Default/{proxy+}/Resource"
      }
    },
    "myapiproxyANYApiPermissionCdkGeneralStackTestEuropemyapi65F2E57FANYproxyBDBDCB62": {
      "Type": "AWS::Lambda::Permission",
      "Properties": {
        "Action": "lambda:InvokeFunction",
        "FunctionName": {
          "Fn::GetAtt": [
            "HelloHandler2E4FBA4D",
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
              ":execute-api:eu-west-1:",
              {
                "Ref": "AWS::AccountId"
              },
              ":",
              {
                "Ref": "myapi162F20B8"
              },
              "/",
              {
                "Ref": "myapiDeploymentStageprod329F21FF"
              },
              "/*/*"
            ]
          ]
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Default/{proxy+}/ANY/ApiPermission.CdkGeneralStackTestEuropemyapi65F2E57F.ANY..{proxy+}"
      }
    },
    "myapiproxyANYApiPermissionTestCdkGeneralStackTestEuropemyapi65F2E57FANYproxyF17A09F1": {
      "Type": "AWS::Lambda::Permission",
      "Properties": {
        "Action": "lambda:InvokeFunction",
        "FunctionName": {
          "Fn::GetAtt": [
            "HelloHandler2E4FBA4D",
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
              ":execute-api:eu-west-1:",
              {
                "Ref": "AWS::AccountId"
              },
              ":",
              {
                "Ref": "myapi162F20B8"
              },
              "/test-invoke-stage/*/*"
            ]
          ]
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Default/{proxy+}/ANY/ApiPermission.Test.CdkGeneralStackTestEuropemyapi65F2E57F.ANY..{proxy+}"
      }
    },
    "myapiproxyANYDD7FCE64": {
      "Type": "AWS::ApiGateway::Method",
      "Properties": {
        "HttpMethod": "ANY",
        "ResourceId": {
          "Ref": "myapiproxyB6DF4575"
        },
        "RestApiId": {
          "Ref": "myapi162F20B8"
        },
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
                ":apigateway:eu-west-1:lambda:path/2015-03-31/functions/",
                {
                  "Fn::GetAtt": [
                    "HelloHandler2E4FBA4D",
                    "Arn"
                  ]
                },
                "/invocations"
              ]
            ]
          }
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Default/{proxy+}/ANY/Resource"
      }
    },
    "myapiANYApiPermissionCdkGeneralStackTestEuropemyapi65F2E57FANYEF4BF8F6": {
      "Type": "AWS::Lambda::Permission",
      "Properties": {
        "Action": "lambda:InvokeFunction",
        "FunctionName": {
          "Fn::GetAtt": [
            "HelloHandler2E4FBA4D",
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
              ":execute-api:eu-west-1:",
              {
                "Ref": "AWS::AccountId"
              },
              ":",
              {
                "Ref": "myapi162F20B8"
              },
              "/",
              {
                "Ref": "myapiDeploymentStageprod329F21FF"
              },
              "/*/"
            ]
          ]
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Default/ANY/ApiPermission.CdkGeneralStackTestEuropemyapi65F2E57F.ANY.."
      }
    },
    "myapiANYApiPermissionTestCdkGeneralStackTestEuropemyapi65F2E57FANY3EBCCF8C": {
      "Type": "AWS::Lambda::Permission",
      "Properties": {
        "Action": "lambda:InvokeFunction",
        "FunctionName": {
          "Fn::GetAtt": [
            "HelloHandler2E4FBA4D",
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
              ":execute-api:eu-west-1:",
              {
                "Ref": "AWS::AccountId"
              },
              ":",
              {
                "Ref": "myapi162F20B8"
              },
              "/test-invoke-stage/*/"
            ]
          ]
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Default/ANY/ApiPermission.Test.CdkGeneralStackTestEuropemyapi65F2E57F.ANY.."
      }
    },
    "myapiANY111D56B7": {
      "Type": "AWS::ApiGateway::Method",
      "Properties": {
        "HttpMethod": "ANY",
        "ResourceId": {
          "Fn::GetAtt": [
            "myapi162F20B8",
            "RootResourceId"
          ]
        },
        "RestApiId": {
          "Ref": "myapi162F20B8"
        },
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
                ":apigateway:eu-west-1:lambda:path/2015-03-31/functions/",
                {
                  "Fn::GetAtt": [
                    "HelloHandler2E4FBA4D",
                    "Arn"
                  ]
                },
                "/invocations"
              ]
            ]
          }
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Default/ANY/Resource"
      }
    },
    "TableCD117FA1": {
      "Type": "AWS::DynamoDB::Table",
      "Properties": {
        "KeySchema": [
          {
            "AttributeName": "id",
            "KeyType": "HASH"
          }
        ],
        "AttributeDefinitions": [
          {
            "AttributeName": "id",
            "AttributeType": "S"
          }
        ],
        "BillingMode": "PAY_PER_REQUEST"
      },
      "UpdateReplacePolicy": "Retain",
      "DeletionPolicy": "Retain",
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/Table/Resource"
      }
    },
    "ruleF2C1DCDC": {
      "Type": "AWS::Events::Rule",
      "Properties": {
        "EventPattern": {
          "source": [
            "aws.ec2"
          ]
        },
        "State": "ENABLED",
        "Targets": [
          {
            "Arn": {
              "Fn::GetAtt": [
                "HelloHandler2E4FBA4D",
                "Arn"
              ]
            },
            "DeadLetterConfig": {
              "Arn": {
                "Fn::GetAtt": [
                  "DeadLetterQueue9F481546",
                  "Arn"
                ]
              }
            },
            "Id": "Target0",
            "RetryPolicy": {
              "MaximumEventAgeInSeconds": 7200,
              "MaximumRetryAttempts": 2
            }
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/rule/Resource"
      }
    },
    "ruleAllowEventRuleCdkGeneralStackTestEuropeHelloHandlerE25EBD9DD0F76E59": {
      "Type": "AWS::Lambda::Permission",
      "Properties": {
        "Action": "lambda:InvokeFunction",
        "FunctionName": {
          "Fn::GetAtt": [
            "HelloHandler2E4FBA4D",
            "Arn"
          ]
        },
        "Principal": "events.amazonaws.com",
        "SourceArn": {
          "Fn::GetAtt": [
            "ruleF2C1DCDC",
            "Arn"
          ]
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/rule/AllowEventRuleCdkGeneralStackTestEuropeHelloHandlerE25EBD9D"
      }
    },
    "DeadLetterQueue9F481546": {
      "Type": "AWS::SQS::Queue",
      "UpdateReplacePolicy": "Delete",
      "DeletionPolicy": "Delete",
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DeadLetterQueue/Resource"
      }
    },
    "DeadLetterQueuePolicyB1FB890C": {
      "Type": "AWS::SQS::QueuePolicy",
      "Properties": {
        "PolicyDocument": {
          "Statement": [
            {
              "Action": "sqs:SendMessage",
              "Condition": {
                "ArnEquals": {
                  "aws:SourceArn": {
                    "Fn::GetAtt": [
                      "ruleF2C1DCDC",
                      "Arn"
                    ]
                  }
                }
              },
              "Effect": "Allow",
              "Principal": {
                "Service": "events.amazonaws.com"
              },
              "Resource": {
                "Fn::GetAtt": [
                  "DeadLetterQueue9F481546",
                  "Arn"
                ]
              },
              "Sid": "AllowEventRuleCdkGeneralStackTestEuroperule6219EF60"
            }
          ],
          "Version": "2012-10-17"
        },
        "Queues": [
          {
            "Ref": "DeadLetterQueue9F481546"
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DeadLetterQueue/Policy/Resource"
      }
    },
    "CDKMetadata": {
      "Type": "AWS::CDK::Metadata",
      "Properties": {
        "Analytics": "v2:deflate64:H4sIAAAAAAAA/02Q30/DIBDH/5a9M9SZmL12Gp801rr3hdKzshaoPdhsGv53D5izCeE+9z24Xxu+feC3K3HGtWy6da9qPn84ITtG0mFGg3ze20FJ9vhpEgTWC103gs/P3kinrImhJZcwaoVIXmBKaD5XtocYiDYwvD8IRHDIi2jI5zsvO3A7gcDEoFrh4CwmPr+kQhWgKwaVEvxjIaX1xrEnGHo7aSAkdeHRFG2qmoG+Wj9KSEXK0f5Mf8olceZXcF+2iVKmwJrJCG0b2ste1HmOBIHBierQfip/Gc+n8b5Jevfgk5Yh3aXtlZyuYnZDuHbG0jpit8q08dmbd4N3y/YCM7YBfsSb092W09msjqjUeqRNKA28yvYXs0P/r9UBAAA="
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/CDKMetadata/Default"
      }
    },
    "slicWatchLambdaErrorsAlarmHelloHandler2E4FBA4D": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${HelloHandler2E4FBA4D}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${HelloHandler2E4FBA4D} breaches 0",
            {}
          ]
        },
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloHandler2E4FBA4D"
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
    "slicWatchLambdaThrottlesAlarmHelloHandler2E4FBA4D": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${HelloHandler2E4FBA4D}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${HelloHandler2E4FBA4D} breaches 0",
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
                      "Ref": "HelloHandler2E4FBA4D"
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
                      "Ref": "HelloHandler2E4FBA4D"
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
    "slicWatchLambdaDurationAlarmHelloHandler2E4FBA4D": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${HelloHandler2E4FBA4D}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${HelloHandler2E4FBA4D} breaches 95% of timeout (3)",
            {}
          ]
        },
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloHandler2E4FBA4D"
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
    "slicWatchLambdaInvocationsAlarmHelloHandler2E4FBA4D": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${HelloHandler2E4FBA4D}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${HelloHandler2E4FBA4D} breaches 4",
            {}
          ]
        },
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloHandler2E4FBA4D"
            }
          }
        ],
        "Statistic": "Sum",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 4
      }
    },
    "slicWatchLambdaErrorsAlarmPingHandler50068074": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${PingHandler50068074}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${PingHandler50068074} breaches 0",
            {}
          ]
        },
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "PingHandler50068074"
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
    "slicWatchLambdaThrottlesAlarmPingHandler50068074": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${PingHandler50068074}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${PingHandler50068074} breaches 0",
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
                      "Ref": "PingHandler50068074"
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
                      "Ref": "PingHandler50068074"
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
    "slicWatchLambdaDurationAlarmPingHandler50068074": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${PingHandler50068074}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${PingHandler50068074} breaches 95% of timeout (3)",
            {}
          ]
        },
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "PingHandler50068074"
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
    "slicWatchLambdaInvocationsAlarmPingHandler50068074": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${PingHandler50068074}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${PingHandler50068074} breaches 10",
            {}
          ]
        },
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "PingHandler50068074"
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
    "slicWatchLambdaErrorsAlarmThrottlerHandler750A7C89": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${ThrottlerHandler750A7C89}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${ThrottlerHandler750A7C89} breaches 0",
            {}
          ]
        },
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "ThrottlerHandler750A7C89"
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
    "slicWatchLambdaThrottlesAlarmThrottlerHandler750A7C89": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${ThrottlerHandler750A7C89}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${ThrottlerHandler750A7C89} breaches 0",
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
                      "Ref": "ThrottlerHandler750A7C89"
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
                      "Ref": "ThrottlerHandler750A7C89"
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
    "slicWatchLambdaDurationAlarmThrottlerHandler750A7C89": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${ThrottlerHandler750A7C89}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${ThrottlerHandler750A7C89} breaches 95% of timeout (3)",
            {}
          ]
        },
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "ThrottlerHandler750A7C89"
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
    "slicWatchLambdaInvocationsAlarmThrottlerHandler750A7C89": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${ThrottlerHandler750A7C89}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${ThrottlerHandler750A7C89} breaches 10",
            {}
          ]
        },
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "ThrottlerHandler750A7C89"
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
    "slicWatchLambdaErrorsAlarmDriveStreamHandler62F1767B": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${DriveStreamHandler62F1767B}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${DriveStreamHandler62F1767B} breaches 0",
            {}
          ]
        },
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveStreamHandler62F1767B"
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
    "slicWatchLambdaThrottlesAlarmDriveStreamHandler62F1767B": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${DriveStreamHandler62F1767B}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${DriveStreamHandler62F1767B} breaches 0",
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
                      "Ref": "DriveStreamHandler62F1767B"
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
                      "Ref": "DriveStreamHandler62F1767B"
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
    "slicWatchLambdaDurationAlarmDriveStreamHandler62F1767B": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${DriveStreamHandler62F1767B}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${DriveStreamHandler62F1767B} breaches 95% of timeout (3)",
            {}
          ]
        },
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveStreamHandler62F1767B"
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
    "slicWatchLambdaInvocationsAlarmDriveStreamHandler62F1767B": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${DriveStreamHandler62F1767B}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${DriveStreamHandler62F1767B} breaches 10",
            {}
          ]
        },
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveStreamHandler62F1767B"
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
    "slicWatchLambdaErrorsAlarmDriveQueueHandler9F657A00": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${DriveQueueHandler9F657A00}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${DriveQueueHandler9F657A00} breaches 0",
            {}
          ]
        },
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveQueueHandler9F657A00"
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
    "slicWatchLambdaThrottlesAlarmDriveQueueHandler9F657A00": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${DriveQueueHandler9F657A00}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${DriveQueueHandler9F657A00} breaches 0",
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
                      "Ref": "DriveQueueHandler9F657A00"
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
                      "Ref": "DriveQueueHandler9F657A00"
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
    "slicWatchLambdaDurationAlarmDriveQueueHandler9F657A00": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${DriveQueueHandler9F657A00}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${DriveQueueHandler9F657A00} breaches 95% of timeout (3)",
            {}
          ]
        },
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveQueueHandler9F657A00"
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
    "slicWatchLambdaInvocationsAlarmDriveQueueHandler9F657A00": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${DriveQueueHandler9F657A00}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${DriveQueueHandler9F657A00} breaches 10",
            {}
          ]
        },
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveQueueHandler9F657A00"
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
    "slicWatchLambdaErrorsAlarmDriveTableHandler119966B0": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${DriveTableHandler119966B0}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${DriveTableHandler119966B0} breaches 0",
            {}
          ]
        },
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveTableHandler119966B0"
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
    "slicWatchLambdaThrottlesAlarmDriveTableHandler119966B0": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${DriveTableHandler119966B0}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${DriveTableHandler119966B0} breaches 0",
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
                      "Ref": "DriveTableHandler119966B0"
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
                      "Ref": "DriveTableHandler119966B0"
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
    "slicWatchLambdaDurationAlarmDriveTableHandler119966B0": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${DriveTableHandler119966B0}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${DriveTableHandler119966B0} breaches 95% of timeout (3)",
            {}
          ]
        },
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveTableHandler119966B0"
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
    "slicWatchLambdaInvocationsAlarmDriveTableHandler119966B0": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${DriveTableHandler119966B0}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${DriveTableHandler119966B0} breaches 10",
            {}
          ]
        },
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveTableHandler119966B0"
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
    "slicWatchApi5XXErrorAlarmmyapi": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "ApiGW_5XXError_myapi",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "API Gateway 5XXError Average for myapi breaches 0",
            {}
          ]
        },
        "MetricName": "5XXError",
        "Namespace": "AWS/ApiGateway",
        "Dimensions": [
          {
            "Name": "ApiName",
            "Value": "myapi"
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
    "slicWatchApi4XXErrorAlarmmyapi": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "ApiGW_4XXError_myapi",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "API Gateway 4XXError Average for myapi breaches 0.05",
            {}
          ]
        },
        "MetricName": "4XXError",
        "Namespace": "AWS/ApiGateway",
        "Dimensions": [
          {
            "Name": "ApiName",
            "Value": "myapi"
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
    "slicWatchApiLatencyAlarmmyapi": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "ApiGW_Latency_myapi",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "API Gateway Latency p99 for myapi breaches 5000",
            {}
          ]
        },
        "MetricName": "Latency",
        "Namespace": "AWS/ApiGateway",
        "Dimensions": [
          {
            "Name": "ApiName",
            "Value": "myapi"
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
    "slicWatchTableReadThrottleEventsAlarmTableCD117FA1": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "DDB_ReadThrottleEvents_Alarm_\${TableCD117FA1}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${TableCD117FA1} breaches 10",
            {}
          ]
        },
        "MetricName": "ReadThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "TableCD117FA1"
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
    "slicWatchTableWriteThrottleEventsAlarmTableCD117FA1": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "DDB_WriteThrottleEvents_Alarm_\${TableCD117FA1}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${TableCD117FA1} breaches 10",
            {}
          ]
        },
        "MetricName": "WriteThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "TableCD117FA1"
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
    "slicWatchTableUserErrorsAlarmTableCD117FA1": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "DDB_UserErrors_Alarm_\${TableCD117FA1}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${TableCD117FA1} breaches 0",
            {}
          ]
        },
        "MetricName": "UserErrors",
        "Namespace": "AWS/DynamoDB",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "TableCD117FA1"
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
    "slicWatchTableSystemErrorsAlarmTableCD117FA1": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "DDB_SystemErrors_Alarm_\${TableCD117FA1}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${TableCD117FA1} breaches 0",
            {}
          ]
        },
        "MetricName": "SystemErrors",
        "Namespace": "AWS/DynamoDB",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "TableCD117FA1"
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
    "slicWatchSQSInFlightMsgsAlarmDeadLetterQueue9F481546": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "SQS_ApproximateNumberOfMessagesNotVisible_\${DeadLetterQueue9F481546.QueueName}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "SQS in-flight messages for \${DeadLetterQueue9F481546.QueueName} breaches 1200 (1% of the hard limit of 120000)",
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
                "DeadLetterQueue9F481546",
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
    "slicWatchSQSOldestMsgAgeAlarmDeadLetterQueue9F481546": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "SQS_ApproximateAgeOfOldestMessage_\${DeadLetterQueue9F481546.QueueName}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "SQS age of oldest message in the queue \${DeadLetterQueue9F481546.QueueName} breaches 60",
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
                "DeadLetterQueue9F481546",
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
    "slicWatchSNSNumberOfNotificationsFilteredOutInvalidAttributesAlarmMyTopic86869434": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "MetricName": "NumberOfNotificationsFilteredOut-InvalidAttributes",
        "Namespace": "AWS/SNS",
        "Dimensions": [
          {
            "Name": "TopicName",
            "Value": {
              "Fn::GetAtt": [
                "MyTopic86869434",
                "TopicName"
              ]
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "SNS_NumberOfNotificationsFilteredOutInvalidAttributes_Alarm_\${MyTopic86869434.TopicName}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "SNS NumberOfNotificationsFilteredOutInvalidAttributes for \${MyTopic86869434.TopicName} breaches 1",
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
    "slicWatchSNSNumberOfNotificationsFailedAlarmMyTopic86869434": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "MetricName": "NumberOfNotificationsFailed",
        "Namespace": "AWS/SNS",
        "Dimensions": [
          {
            "Name": "TopicName",
            "Value": {
              "Fn::GetAtt": [
                "MyTopic86869434",
                "TopicName"
              ]
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "SNS_NumberOfNotificationsFailed_Alarm_\${MyTopic86869434.TopicName}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "SNS NumberOfNotificationsFailed for \${MyTopic86869434.TopicName} breaches 1",
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
    "slicWatchEventsFailedInvocationsAlarmRuleF2C1DCDC": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "MetricName": "FailedInvocations",
        "Namespace": "AWS/Events",
        "Dimensions": [
          {
            "Name": "RuleName",
            "Value": {
              "Ref": "ruleF2C1DCDC"
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Events_FailedInvocations_Alarm_\${ruleF2C1DCDC}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "EventBridge FailedInvocations for \${ruleF2C1DCDC} breaches 1",
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
    "slicWatchEventsThrottledRulesAlarmRuleF2C1DCDC": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "MetricName": "ThrottledRules",
        "Namespace": "AWS/Events",
        "Dimensions": [
          {
            "Name": "RuleName",
            "Value": {
              "Ref": "ruleF2C1DCDC"
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Events_ThrottledRules_Alarm_\${ruleF2C1DCDC}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "EventBridge ThrottledRules for \${ruleF2C1DCDC} breaches 1",
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
                      "AWS/ApiGateway",
                      "5XXError",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "5XXError API myapi",
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
                      "myapi",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "4XXError",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "4XXError API myapi",
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
                      "myapi",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "4XXError",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "Latency",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "Latency",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "p95"
                      }
                    ]
                  ],
                  "title": "Latency API myapi",
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
                      "myapi",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "4XXError",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "Latency",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "Latency",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "Count",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "Count API myapi",
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
                      "\${TableCD117FA1}",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "ReadThrottleEvents Table \${TableCD117FA1}",
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
                      "AWS/DynamoDB",
                      "ReadThrottleEvents",
                      "TableName",
                      "\${TableCD117FA1}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/DynamoDB",
                      "WriteThrottleEvents",
                      "TableName",
                      "\${TableCD117FA1}",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "WriteThrottleEvents Table \${TableCD117FA1}",
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
                      "Errors",
                      "FunctionName",
                      "\${HelloHandler2E4FBA4D}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                "y": 12
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${HelloHandler2E4FBA4D}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                      "\${HelloHandler2E4FBA4D}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                      "\${HelloHandler2E4FBA4D}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                      "\${HelloHandler2E4FBA4D}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                      "\${HelloHandler2E4FBA4D}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                      "\${HelloHandler2E4FBA4D}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                "y": 24
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/SQS",
                      "NumberOfMessagesSent",
                      "QueueName",
                      "\${DeadLetterQueue9F481546.QueueName}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/SQS",
                      "NumberOfMessagesReceived",
                      "QueueName",
                      "\${DeadLetterQueue9F481546.QueueName}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/SQS",
                      "NumberOfMessagesDeleted",
                      "QueueName",
                      "\${DeadLetterQueue9F481546.QueueName}",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "Messages \${DeadLetterQueue9F481546.QueueName} SQS",
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
                      "AWS/SQS",
                      "ApproximateAgeOfOldestMessage",
                      "QueueName",
                      "\${DeadLetterQueue9F481546.QueueName}",
                      {
                        "stat": "Maximum"
                      }
                    ]
                  ],
                  "title": "Oldest Message age \${DeadLetterQueue9F481546.QueueName} SQS",
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
                      "AWS/SQS",
                      "ApproximateNumberOfMessagesVisible",
                      "QueueName",
                      "\${DeadLetterQueue9F481546.QueueName}",
                      {
                        "stat": "Maximum"
                      }
                    ]
                  ],
                  "title": "Messages in queue \${DeadLetterQueue9F481546.QueueName} SQS",
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
                      "AWS/SNS",
                      "NumberOfNotificationsFilteredOut-InvalidAttributes",
                      "TopicName",
                      "\${MyTopic86869434.TopicName}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/SNS",
                      "NumberOfNotificationsFailed",
                      "TopicName",
                      "\${MyTopic86869434.TopicName}",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "SNS Topic \${MyTopic86869434.TopicName}",
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
                      "AWS/Events",
                      "FailedInvocations",
                      "RuleName",
                      "\${ruleF2C1DCDC}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Events",
                      "ThrottledRules",
                      "RuleName",
                      "\${ruleF2C1DCDC}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Events",
                      "Invocations",
                      "RuleName",
                      "\${ruleF2C1DCDC}",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "EventBridge Rule \${ruleF2C1DCDC}",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 16,
                "y": 30
              }
            ]
          }
        }
      }
    }
  },
  "Outputs": {
    "myapiEndpoint8EB17201": {
      "Value": {
        "Fn::Join": [
          "",
          [
            "https://",
            {
              "Ref": "myapi162F20B8"
            },
            ".execute-api.eu-west-1.",
            {
              "Ref": "AWS::URLSuffix"
            },
            "/",
            {
              "Ref": "myapiDeploymentStageprod329F21FF"
            },
            "/"
          ]
        ]
      }
    }
  },
  "Parameters": {
    "BootstrapVersion": {
      "Type": "AWS::SSM::Parameter::Value<String>",
      "Default": "/cdk-bootstrap/hnb659fds/version",
      "Description": "Version of the CDK Bootstrap resources in this environment, automatically retrieved from SSM Parameter Store. [cdk:skip]"
    }
  },
  "Rules": {
    "CheckBootstrapVersion": {
      "Assertions": [
        {
          "Assert": {
            "Fn::Not": [
              {
                "Fn::Contains": [
                  [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5"
                  ],
                  {
                    "Ref": "BootstrapVersion"
                  }
                ]
              }
            ]
          },
          "AssertDescription": "CDK bootstrap stack version 6 required. Please run 'cdk bootstrap' with a recent version of the CDK CLI."
        }
      ]
    }
  }
}
`

exports[`cdk-test-project/tests/snapshot/cdk-test-project-snapshot.test.ts > TAP > the Macro adds SLIC Watch dashboards and alarms to synthesized CDK project > generalUsStack > generalUsStack fragment 1`] = `
{
  "Transform": "SlicWatch-v3",
  "Metadata": {
    "slicWatch": {
      "enabled": true,
      "topicArn": "arn:aws:xxxxxx:mytopic",
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
      },
      "alarmActionsConfig": {
        "alarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ]
      }
    }
  },
  "Resources": {
    "MyTopic86869434": {
      "Type": "AWS::SNS::Topic",
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/MyTopic/Resource"
      }
    },
    "HelloHandlerServiceRole11EF7C63": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              }
            }
          ],
          "Version": "2012-10-17"
        },
        "ManagedPolicyArns": [
          {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition"
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
              ]
            ]
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/HelloHandler/ServiceRole/Resource"
      }
    },
    "HelloHandler2E4FBA4D": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-us-east-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Role": {
          "Fn::GetAtt": [
            "HelloHandlerServiceRole11EF7C63",
            "Arn"
          ]
        },
        "Handler": "hello.handler",
        "Runtime": "nodejs18.x"
      },
      "DependsOn": [
        "HelloHandlerServiceRole11EF7C63"
      ],
      "Metadata": {
        "slicWatch": {
          "alarms": {
            "Lambda": {
              "Invocations": {
                "Threshold": 4
              }
            }
          }
        }
      }
    },
    "PingHandlerServiceRole46086423": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              }
            }
          ],
          "Version": "2012-10-17"
        },
        "ManagedPolicyArns": [
          {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition"
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
              ]
            ]
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/PingHandler/ServiceRole/Resource"
      }
    },
    "PingHandler50068074": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-us-east-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Role": {
          "Fn::GetAtt": [
            "PingHandlerServiceRole46086423",
            "Arn"
          ]
        },
        "Handler": "hello.handler",
        "Runtime": "nodejs18.x"
      },
      "DependsOn": [
        "PingHandlerServiceRole46086423"
      ],
      "Metadata": {
        "slicWatch": {
          "dashboard": {
            "enabled": false
          }
        }
      }
    },
    "ThrottlerHandlerServiceRoleA0481DAF": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              }
            }
          ],
          "Version": "2012-10-17"
        },
        "ManagedPolicyArns": [
          {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition"
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
              ]
            ]
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/ThrottlerHandler/ServiceRole/Resource"
      }
    },
    "ThrottlerHandler750A7C89": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-us-east-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Role": {
          "Fn::GetAtt": [
            "ThrottlerHandlerServiceRoleA0481DAF",
            "Arn"
          ]
        },
        "Handler": "hello.handler",
        "ReservedConcurrentExecutions": 0,
        "Runtime": "nodejs18.x"
      },
      "DependsOn": [
        "ThrottlerHandlerServiceRoleA0481DAF"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/ThrottlerHandler/Resource",
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:is-bundled": false,
        "aws:asset:property": "Code"
      }
    },
    "DriveStreamHandlerServiceRoleD2BAFDD4": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              }
            }
          ],
          "Version": "2012-10-17"
        },
        "ManagedPolicyArns": [
          {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition"
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
              ]
            ]
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/DriveStreamHandler/ServiceRole/Resource"
      }
    },
    "DriveStreamHandler62F1767B": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-us-east-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Role": {
          "Fn::GetAtt": [
            "DriveStreamHandlerServiceRoleD2BAFDD4",
            "Arn"
          ]
        },
        "Handler": "stream-test-handler.handleDrive",
        "Runtime": "nodejs18.x"
      },
      "DependsOn": [
        "DriveStreamHandlerServiceRoleD2BAFDD4"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/DriveStreamHandler/Resource",
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:is-bundled": false,
        "aws:asset:property": "Code"
      }
    },
    "DriveQueueHandlerServiceRoleD796850A": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              }
            }
          ],
          "Version": "2012-10-17"
        },
        "ManagedPolicyArns": [
          {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition"
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
              ]
            ]
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/DriveQueueHandler/ServiceRole/Resource"
      }
    },
    "DriveQueueHandler9F657A00": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-us-east-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Role": {
          "Fn::GetAtt": [
            "DriveQueueHandlerServiceRoleD796850A",
            "Arn"
          ]
        },
        "Handler": "hello.handler",
        "Runtime": "nodejs18.x"
      },
      "DependsOn": [
        "DriveQueueHandlerServiceRoleD796850A"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/DriveQueueHandler/Resource",
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:is-bundled": false,
        "aws:asset:property": "Code"
      }
    },
    "DriveTableHandlerServiceRoleDDA3FBE1": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              }
            }
          ],
          "Version": "2012-10-17"
        },
        "ManagedPolicyArns": [
          {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition"
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
              ]
            ]
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/DriveTableHandler/ServiceRole/Resource"
      }
    },
    "DriveTableHandler119966B0": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-us-east-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Role": {
          "Fn::GetAtt": [
            "DriveTableHandlerServiceRoleDDA3FBE1",
            "Arn"
          ]
        },
        "Handler": "hello.handler",
        "Runtime": "nodejs18.x"
      },
      "DependsOn": [
        "DriveTableHandlerServiceRoleDDA3FBE1"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/DriveTableHandler/Resource",
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:is-bundled": false,
        "aws:asset:property": "Code"
      }
    },
    "myapi162F20B8": {
      "Type": "AWS::ApiGateway::RestApi",
      "Properties": {
        "Name": "myapi"
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Resource"
      }
    },
    "myapiCloudWatchRoleEB425128": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "apigateway.amazonaws.com"
              }
            }
          ],
          "Version": "2012-10-17"
        },
        "ManagedPolicyArns": [
          {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition"
                },
                ":iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs"
              ]
            ]
          }
        ]
      },
      "UpdateReplacePolicy": "Retain",
      "DeletionPolicy": "Retain",
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/CloudWatchRole/Resource"
      }
    },
    "myapiAccountC3A4750C": {
      "Type": "AWS::ApiGateway::Account",
      "Properties": {
        "CloudWatchRoleArn": {
          "Fn::GetAtt": [
            "myapiCloudWatchRoleEB425128",
            "Arn"
          ]
        }
      },
      "DependsOn": [
        "myapi162F20B8"
      ],
      "UpdateReplacePolicy": "Retain",
      "DeletionPolicy": "Retain",
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Account"
      }
    },
    "myapiDeploymentB7EF8EB7fea2aa51ab5416f81a0b318c3a85d817": {
      "Type": "AWS::ApiGateway::Deployment",
      "Properties": {
        "RestApiId": {
          "Ref": "myapi162F20B8"
        },
        "Description": "Automatically created by the RestApi construct"
      },
      "DependsOn": [
        "myapiproxyANYDD7FCE64",
        "myapiproxyB6DF4575",
        "myapiANY111D56B7"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Deployment/Resource"
      }
    },
    "myapiDeploymentStageprod329F21FF": {
      "Type": "AWS::ApiGateway::Stage",
      "Properties": {
        "RestApiId": {
          "Ref": "myapi162F20B8"
        },
        "DeploymentId": {
          "Ref": "myapiDeploymentB7EF8EB7fea2aa51ab5416f81a0b318c3a85d817"
        },
        "StageName": "prod"
      },
      "DependsOn": [
        "myapiAccountC3A4750C"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/DeploymentStage.prod/Resource"
      }
    },
    "myapiproxyB6DF4575": {
      "Type": "AWS::ApiGateway::Resource",
      "Properties": {
        "ParentId": {
          "Fn::GetAtt": [
            "myapi162F20B8",
            "RootResourceId"
          ]
        },
        "PathPart": "{proxy+}",
        "RestApiId": {
          "Ref": "myapi162F20B8"
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Default/{proxy+}/Resource"
      }
    },
    "myapiproxyANYApiPermissionCdkGeneralStackTestUSmyapi9E6CC024ANYproxy61FC0812": {
      "Type": "AWS::Lambda::Permission",
      "Properties": {
        "Action": "lambda:InvokeFunction",
        "FunctionName": {
          "Fn::GetAtt": [
            "HelloHandler2E4FBA4D",
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
              ":execute-api:us-east-1:",
              {
                "Ref": "AWS::AccountId"
              },
              ":",
              {
                "Ref": "myapi162F20B8"
              },
              "/",
              {
                "Ref": "myapiDeploymentStageprod329F21FF"
              },
              "/*/*"
            ]
          ]
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Default/{proxy+}/ANY/ApiPermission.CdkGeneralStackTestUSmyapi9E6CC024.ANY..{proxy+}"
      }
    },
    "myapiproxyANYApiPermissionTestCdkGeneralStackTestUSmyapi9E6CC024ANYproxy352B4E19": {
      "Type": "AWS::Lambda::Permission",
      "Properties": {
        "Action": "lambda:InvokeFunction",
        "FunctionName": {
          "Fn::GetAtt": [
            "HelloHandler2E4FBA4D",
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
              ":execute-api:us-east-1:",
              {
                "Ref": "AWS::AccountId"
              },
              ":",
              {
                "Ref": "myapi162F20B8"
              },
              "/test-invoke-stage/*/*"
            ]
          ]
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Default/{proxy+}/ANY/ApiPermission.Test.CdkGeneralStackTestUSmyapi9E6CC024.ANY..{proxy+}"
      }
    },
    "myapiproxyANYDD7FCE64": {
      "Type": "AWS::ApiGateway::Method",
      "Properties": {
        "HttpMethod": "ANY",
        "ResourceId": {
          "Ref": "myapiproxyB6DF4575"
        },
        "RestApiId": {
          "Ref": "myapi162F20B8"
        },
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
                ":apigateway:us-east-1:lambda:path/2015-03-31/functions/",
                {
                  "Fn::GetAtt": [
                    "HelloHandler2E4FBA4D",
                    "Arn"
                  ]
                },
                "/invocations"
              ]
            ]
          }
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Default/{proxy+}/ANY/Resource"
      }
    },
    "myapiANYApiPermissionCdkGeneralStackTestUSmyapi9E6CC024ANY52E5EFEE": {
      "Type": "AWS::Lambda::Permission",
      "Properties": {
        "Action": "lambda:InvokeFunction",
        "FunctionName": {
          "Fn::GetAtt": [
            "HelloHandler2E4FBA4D",
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
              ":execute-api:us-east-1:",
              {
                "Ref": "AWS::AccountId"
              },
              ":",
              {
                "Ref": "myapi162F20B8"
              },
              "/",
              {
                "Ref": "myapiDeploymentStageprod329F21FF"
              },
              "/*/"
            ]
          ]
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Default/ANY/ApiPermission.CdkGeneralStackTestUSmyapi9E6CC024.ANY.."
      }
    },
    "myapiANYApiPermissionTestCdkGeneralStackTestUSmyapi9E6CC024ANY1136CBF8": {
      "Type": "AWS::Lambda::Permission",
      "Properties": {
        "Action": "lambda:InvokeFunction",
        "FunctionName": {
          "Fn::GetAtt": [
            "HelloHandler2E4FBA4D",
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
              ":execute-api:us-east-1:",
              {
                "Ref": "AWS::AccountId"
              },
              ":",
              {
                "Ref": "myapi162F20B8"
              },
              "/test-invoke-stage/*/"
            ]
          ]
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Default/ANY/ApiPermission.Test.CdkGeneralStackTestUSmyapi9E6CC024.ANY.."
      }
    },
    "myapiANY111D56B7": {
      "Type": "AWS::ApiGateway::Method",
      "Properties": {
        "HttpMethod": "ANY",
        "ResourceId": {
          "Fn::GetAtt": [
            "myapi162F20B8",
            "RootResourceId"
          ]
        },
        "RestApiId": {
          "Ref": "myapi162F20B8"
        },
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
                ":apigateway:us-east-1:lambda:path/2015-03-31/functions/",
                {
                  "Fn::GetAtt": [
                    "HelloHandler2E4FBA4D",
                    "Arn"
                  ]
                },
                "/invocations"
              ]
            ]
          }
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Default/ANY/Resource"
      }
    },
    "TableCD117FA1": {
      "Type": "AWS::DynamoDB::Table",
      "Properties": {
        "KeySchema": [
          {
            "AttributeName": "id",
            "KeyType": "HASH"
          }
        ],
        "AttributeDefinitions": [
          {
            "AttributeName": "id",
            "AttributeType": "S"
          }
        ],
        "BillingMode": "PAY_PER_REQUEST"
      },
      "UpdateReplacePolicy": "Retain",
      "DeletionPolicy": "Retain",
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/Table/Resource"
      }
    },
    "ruleF2C1DCDC": {
      "Type": "AWS::Events::Rule",
      "Properties": {
        "EventPattern": {
          "source": [
            "aws.ec2"
          ]
        },
        "State": "ENABLED",
        "Targets": [
          {
            "Arn": {
              "Fn::GetAtt": [
                "HelloHandler2E4FBA4D",
                "Arn"
              ]
            },
            "DeadLetterConfig": {
              "Arn": {
                "Fn::GetAtt": [
                  "DeadLetterQueue9F481546",
                  "Arn"
                ]
              }
            },
            "Id": "Target0",
            "RetryPolicy": {
              "MaximumEventAgeInSeconds": 7200,
              "MaximumRetryAttempts": 2
            }
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/rule/Resource"
      }
    },
    "ruleAllowEventRuleCdkGeneralStackTestUSHelloHandlerC75B8B54C6DD839C": {
      "Type": "AWS::Lambda::Permission",
      "Properties": {
        "Action": "lambda:InvokeFunction",
        "FunctionName": {
          "Fn::GetAtt": [
            "HelloHandler2E4FBA4D",
            "Arn"
          ]
        },
        "Principal": "events.amazonaws.com",
        "SourceArn": {
          "Fn::GetAtt": [
            "ruleF2C1DCDC",
            "Arn"
          ]
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/rule/AllowEventRuleCdkGeneralStackTestUSHelloHandlerC75B8B54"
      }
    },
    "DeadLetterQueue9F481546": {
      "Type": "AWS::SQS::Queue",
      "UpdateReplacePolicy": "Delete",
      "DeletionPolicy": "Delete",
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/DeadLetterQueue/Resource"
      }
    },
    "DeadLetterQueuePolicyB1FB890C": {
      "Type": "AWS::SQS::QueuePolicy",
      "Properties": {
        "PolicyDocument": {
          "Statement": [
            {
              "Action": "sqs:SendMessage",
              "Condition": {
                "ArnEquals": {
                  "aws:SourceArn": {
                    "Fn::GetAtt": [
                      "ruleF2C1DCDC",
                      "Arn"
                    ]
                  }
                }
              },
              "Effect": "Allow",
              "Principal": {
                "Service": "events.amazonaws.com"
              },
              "Resource": {
                "Fn::GetAtt": [
                  "DeadLetterQueue9F481546",
                  "Arn"
                ]
              },
              "Sid": "AllowEventRuleCdkGeneralStackTestUSruleB0D09E87"
            }
          ],
          "Version": "2012-10-17"
        },
        "Queues": [
          {
            "Ref": "DeadLetterQueue9F481546"
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/DeadLetterQueue/Policy/Resource"
      }
    },
    "CDKMetadata": {
      "Type": "AWS::CDK::Metadata",
      "Properties": {
        "Analytics": "v2:deflate64:H4sIAAAAAAAA/02Q30/DIBDH/5a9M9SZmL12Gp801rr3hdKzshaoPdhsGv53D5izCeE+9z24Xxu+feC3K3HGtWy6da9qPn84ITtG0mFGg3ze20FJ9vhpEgTWC103gs/P3kinrImhJZcwaoVIXmBKaD5XtocYiDYwvD8IRHDIi2jI5zsvO3A7gcDEoFrh4CwmPr+kQhWgKwaVEvxjIaX1xrEnGHo7aSAkdeHRFG2qmoG+Wj9KSEXK0f5Mf8olceZXcF+2iVKmwJrJCG0b2ste1HmOBIHBierQfip/Gc+n8b5Jevfgk5Yh3aXtlZyuYnZDuHbG0jpit8q08dmbd4N3y/YCM7YBfsSb092W09msjqjUeqRNKA28yvYXs0P/r9UBAAA="
      },
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/CDKMetadata/Default"
      }
    },
    "slicWatchLambdaErrorsAlarmHelloHandler2E4FBA4D": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${HelloHandler2E4FBA4D}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${HelloHandler2E4FBA4D} breaches 0",
            {}
          ]
        },
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloHandler2E4FBA4D"
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
    "slicWatchLambdaThrottlesAlarmHelloHandler2E4FBA4D": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${HelloHandler2E4FBA4D}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${HelloHandler2E4FBA4D} breaches 0",
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
                      "Ref": "HelloHandler2E4FBA4D"
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
                      "Ref": "HelloHandler2E4FBA4D"
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
    "slicWatchLambdaDurationAlarmHelloHandler2E4FBA4D": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${HelloHandler2E4FBA4D}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${HelloHandler2E4FBA4D} breaches 95% of timeout (3)",
            {}
          ]
        },
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloHandler2E4FBA4D"
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
    "slicWatchLambdaInvocationsAlarmHelloHandler2E4FBA4D": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${HelloHandler2E4FBA4D}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${HelloHandler2E4FBA4D} breaches 4",
            {}
          ]
        },
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloHandler2E4FBA4D"
            }
          }
        ],
        "Statistic": "Sum",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 4
      }
    },
    "slicWatchLambdaErrorsAlarmPingHandler50068074": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${PingHandler50068074}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${PingHandler50068074} breaches 0",
            {}
          ]
        },
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "PingHandler50068074"
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
    "slicWatchLambdaThrottlesAlarmPingHandler50068074": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${PingHandler50068074}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${PingHandler50068074} breaches 0",
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
                      "Ref": "PingHandler50068074"
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
                      "Ref": "PingHandler50068074"
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
    "slicWatchLambdaDurationAlarmPingHandler50068074": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${PingHandler50068074}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${PingHandler50068074} breaches 95% of timeout (3)",
            {}
          ]
        },
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "PingHandler50068074"
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
    "slicWatchLambdaInvocationsAlarmPingHandler50068074": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${PingHandler50068074}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${PingHandler50068074} breaches 10",
            {}
          ]
        },
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "PingHandler50068074"
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
    "slicWatchLambdaErrorsAlarmThrottlerHandler750A7C89": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${ThrottlerHandler750A7C89}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${ThrottlerHandler750A7C89} breaches 0",
            {}
          ]
        },
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "ThrottlerHandler750A7C89"
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
    "slicWatchLambdaThrottlesAlarmThrottlerHandler750A7C89": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${ThrottlerHandler750A7C89}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${ThrottlerHandler750A7C89} breaches 0",
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
                      "Ref": "ThrottlerHandler750A7C89"
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
                      "Ref": "ThrottlerHandler750A7C89"
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
    "slicWatchLambdaDurationAlarmThrottlerHandler750A7C89": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${ThrottlerHandler750A7C89}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${ThrottlerHandler750A7C89} breaches 95% of timeout (3)",
            {}
          ]
        },
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "ThrottlerHandler750A7C89"
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
    "slicWatchLambdaInvocationsAlarmThrottlerHandler750A7C89": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${ThrottlerHandler750A7C89}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${ThrottlerHandler750A7C89} breaches 10",
            {}
          ]
        },
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "ThrottlerHandler750A7C89"
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
    "slicWatchLambdaErrorsAlarmDriveStreamHandler62F1767B": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${DriveStreamHandler62F1767B}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${DriveStreamHandler62F1767B} breaches 0",
            {}
          ]
        },
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveStreamHandler62F1767B"
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
    "slicWatchLambdaThrottlesAlarmDriveStreamHandler62F1767B": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${DriveStreamHandler62F1767B}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${DriveStreamHandler62F1767B} breaches 0",
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
                      "Ref": "DriveStreamHandler62F1767B"
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
                      "Ref": "DriveStreamHandler62F1767B"
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
    "slicWatchLambdaDurationAlarmDriveStreamHandler62F1767B": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${DriveStreamHandler62F1767B}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${DriveStreamHandler62F1767B} breaches 95% of timeout (3)",
            {}
          ]
        },
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveStreamHandler62F1767B"
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
    "slicWatchLambdaInvocationsAlarmDriveStreamHandler62F1767B": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${DriveStreamHandler62F1767B}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${DriveStreamHandler62F1767B} breaches 10",
            {}
          ]
        },
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveStreamHandler62F1767B"
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
    "slicWatchLambdaErrorsAlarmDriveQueueHandler9F657A00": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${DriveQueueHandler9F657A00}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${DriveQueueHandler9F657A00} breaches 0",
            {}
          ]
        },
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveQueueHandler9F657A00"
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
    "slicWatchLambdaThrottlesAlarmDriveQueueHandler9F657A00": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${DriveQueueHandler9F657A00}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${DriveQueueHandler9F657A00} breaches 0",
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
                      "Ref": "DriveQueueHandler9F657A00"
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
                      "Ref": "DriveQueueHandler9F657A00"
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
    "slicWatchLambdaDurationAlarmDriveQueueHandler9F657A00": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${DriveQueueHandler9F657A00}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${DriveQueueHandler9F657A00} breaches 95% of timeout (3)",
            {}
          ]
        },
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveQueueHandler9F657A00"
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
    "slicWatchLambdaInvocationsAlarmDriveQueueHandler9F657A00": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${DriveQueueHandler9F657A00}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${DriveQueueHandler9F657A00} breaches 10",
            {}
          ]
        },
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveQueueHandler9F657A00"
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
    "slicWatchLambdaErrorsAlarmDriveTableHandler119966B0": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${DriveTableHandler119966B0}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${DriveTableHandler119966B0} breaches 0",
            {}
          ]
        },
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveTableHandler119966B0"
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
    "slicWatchLambdaThrottlesAlarmDriveTableHandler119966B0": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${DriveTableHandler119966B0}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${DriveTableHandler119966B0} breaches 0",
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
                      "Ref": "DriveTableHandler119966B0"
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
                      "Ref": "DriveTableHandler119966B0"
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
    "slicWatchLambdaDurationAlarmDriveTableHandler119966B0": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${DriveTableHandler119966B0}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${DriveTableHandler119966B0} breaches 95% of timeout (3)",
            {}
          ]
        },
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveTableHandler119966B0"
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
    "slicWatchLambdaInvocationsAlarmDriveTableHandler119966B0": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${DriveTableHandler119966B0}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${DriveTableHandler119966B0} breaches 10",
            {}
          ]
        },
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveTableHandler119966B0"
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
    "slicWatchApi5XXErrorAlarmmyapi": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "ApiGW_5XXError_myapi",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "API Gateway 5XXError Average for myapi breaches 0",
            {}
          ]
        },
        "MetricName": "5XXError",
        "Namespace": "AWS/ApiGateway",
        "Dimensions": [
          {
            "Name": "ApiName",
            "Value": "myapi"
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
    "slicWatchApi4XXErrorAlarmmyapi": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "ApiGW_4XXError_myapi",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "API Gateway 4XXError Average for myapi breaches 0.05",
            {}
          ]
        },
        "MetricName": "4XXError",
        "Namespace": "AWS/ApiGateway",
        "Dimensions": [
          {
            "Name": "ApiName",
            "Value": "myapi"
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
    "slicWatchApiLatencyAlarmmyapi": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "ApiGW_Latency_myapi",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "API Gateway Latency p99 for myapi breaches 5000",
            {}
          ]
        },
        "MetricName": "Latency",
        "Namespace": "AWS/ApiGateway",
        "Dimensions": [
          {
            "Name": "ApiName",
            "Value": "myapi"
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
    "slicWatchTableReadThrottleEventsAlarmTableCD117FA1": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "DDB_ReadThrottleEvents_Alarm_\${TableCD117FA1}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${TableCD117FA1} breaches 10",
            {}
          ]
        },
        "MetricName": "ReadThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "TableCD117FA1"
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
    "slicWatchTableWriteThrottleEventsAlarmTableCD117FA1": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "DDB_WriteThrottleEvents_Alarm_\${TableCD117FA1}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${TableCD117FA1} breaches 10",
            {}
          ]
        },
        "MetricName": "WriteThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "TableCD117FA1"
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
    "slicWatchTableUserErrorsAlarmTableCD117FA1": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "DDB_UserErrors_Alarm_\${TableCD117FA1}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${TableCD117FA1} breaches 0",
            {}
          ]
        },
        "MetricName": "UserErrors",
        "Namespace": "AWS/DynamoDB",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "TableCD117FA1"
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
    "slicWatchTableSystemErrorsAlarmTableCD117FA1": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "DDB_SystemErrors_Alarm_\${TableCD117FA1}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${TableCD117FA1} breaches 0",
            {}
          ]
        },
        "MetricName": "SystemErrors",
        "Namespace": "AWS/DynamoDB",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "TableCD117FA1"
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
    "slicWatchSQSInFlightMsgsAlarmDeadLetterQueue9F481546": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "SQS_ApproximateNumberOfMessagesNotVisible_\${DeadLetterQueue9F481546.QueueName}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "SQS in-flight messages for \${DeadLetterQueue9F481546.QueueName} breaches 1200 (1% of the hard limit of 120000)",
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
                "DeadLetterQueue9F481546",
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
    "slicWatchSQSOldestMsgAgeAlarmDeadLetterQueue9F481546": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "SQS_ApproximateAgeOfOldestMessage_\${DeadLetterQueue9F481546.QueueName}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "SQS age of oldest message in the queue \${DeadLetterQueue9F481546.QueueName} breaches 60",
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
                "DeadLetterQueue9F481546",
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
    "slicWatchSNSNumberOfNotificationsFilteredOutInvalidAttributesAlarmMyTopic86869434": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "MetricName": "NumberOfNotificationsFilteredOut-InvalidAttributes",
        "Namespace": "AWS/SNS",
        "Dimensions": [
          {
            "Name": "TopicName",
            "Value": {
              "Fn::GetAtt": [
                "MyTopic86869434",
                "TopicName"
              ]
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "SNS_NumberOfNotificationsFilteredOutInvalidAttributes_Alarm_\${MyTopic86869434.TopicName}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "SNS NumberOfNotificationsFilteredOutInvalidAttributes for \${MyTopic86869434.TopicName} breaches 1",
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
    "slicWatchSNSNumberOfNotificationsFailedAlarmMyTopic86869434": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "MetricName": "NumberOfNotificationsFailed",
        "Namespace": "AWS/SNS",
        "Dimensions": [
          {
            "Name": "TopicName",
            "Value": {
              "Fn::GetAtt": [
                "MyTopic86869434",
                "TopicName"
              ]
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "SNS_NumberOfNotificationsFailed_Alarm_\${MyTopic86869434.TopicName}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "SNS NumberOfNotificationsFailed for \${MyTopic86869434.TopicName} breaches 1",
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
    "slicWatchEventsFailedInvocationsAlarmRuleF2C1DCDC": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "MetricName": "FailedInvocations",
        "Namespace": "AWS/Events",
        "Dimensions": [
          {
            "Name": "RuleName",
            "Value": {
              "Ref": "ruleF2C1DCDC"
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Events_FailedInvocations_Alarm_\${ruleF2C1DCDC}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "EventBridge FailedInvocations for \${ruleF2C1DCDC} breaches 1",
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
    "slicWatchEventsThrottledRulesAlarmRuleF2C1DCDC": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "OKActions": [],
        "MetricName": "ThrottledRules",
        "Namespace": "AWS/Events",
        "Dimensions": [
          {
            "Name": "RuleName",
            "Value": {
              "Ref": "ruleF2C1DCDC"
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "Events_ThrottledRules_Alarm_\${ruleF2C1DCDC}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "EventBridge ThrottledRules for \${ruleF2C1DCDC} breaches 1",
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
                      "AWS/ApiGateway",
                      "5XXError",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "5XXError API myapi",
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
                      "myapi",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "4XXError",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "4XXError API myapi",
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
                      "myapi",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "4XXError",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "Latency",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "Latency",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "p95"
                      }
                    ]
                  ],
                  "title": "Latency API myapi",
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
                      "myapi",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "4XXError",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "Latency",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "Latency",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "Count",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "Count API myapi",
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
                      "\${TableCD117FA1}",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "ReadThrottleEvents Table \${TableCD117FA1}",
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
                      "AWS/DynamoDB",
                      "ReadThrottleEvents",
                      "TableName",
                      "\${TableCD117FA1}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/DynamoDB",
                      "WriteThrottleEvents",
                      "TableName",
                      "\${TableCD117FA1}",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "WriteThrottleEvents Table \${TableCD117FA1}",
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
                      "Errors",
                      "FunctionName",
                      "\${HelloHandler2E4FBA4D}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                "y": 12
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${HelloHandler2E4FBA4D}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                      "\${HelloHandler2E4FBA4D}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Average"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                      "\${HelloHandler2E4FBA4D}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "p95"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                      "\${HelloHandler2E4FBA4D}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                      "\${HelloHandler2E4FBA4D}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                      "\${HelloHandler2E4FBA4D}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Maximum"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                "y": 24
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/SQS",
                      "NumberOfMessagesSent",
                      "QueueName",
                      "\${DeadLetterQueue9F481546.QueueName}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/SQS",
                      "NumberOfMessagesReceived",
                      "QueueName",
                      "\${DeadLetterQueue9F481546.QueueName}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/SQS",
                      "NumberOfMessagesDeleted",
                      "QueueName",
                      "\${DeadLetterQueue9F481546.QueueName}",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "Messages \${DeadLetterQueue9F481546.QueueName} SQS",
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
                      "AWS/SQS",
                      "ApproximateAgeOfOldestMessage",
                      "QueueName",
                      "\${DeadLetterQueue9F481546.QueueName}",
                      {
                        "stat": "Maximum"
                      }
                    ]
                  ],
                  "title": "Oldest Message age \${DeadLetterQueue9F481546.QueueName} SQS",
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
                      "AWS/SQS",
                      "ApproximateNumberOfMessagesVisible",
                      "QueueName",
                      "\${DeadLetterQueue9F481546.QueueName}",
                      {
                        "stat": "Maximum"
                      }
                    ]
                  ],
                  "title": "Messages in queue \${DeadLetterQueue9F481546.QueueName} SQS",
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
                      "AWS/SNS",
                      "NumberOfNotificationsFilteredOut-InvalidAttributes",
                      "TopicName",
                      "\${MyTopic86869434.TopicName}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/SNS",
                      "NumberOfNotificationsFailed",
                      "TopicName",
                      "\${MyTopic86869434.TopicName}",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "SNS Topic \${MyTopic86869434.TopicName}",
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
                      "AWS/Events",
                      "FailedInvocations",
                      "RuleName",
                      "\${ruleF2C1DCDC}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Events",
                      "ThrottledRules",
                      "RuleName",
                      "\${ruleF2C1DCDC}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/Events",
                      "Invocations",
                      "RuleName",
                      "\${ruleF2C1DCDC}",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "EventBridge Rule \${ruleF2C1DCDC}",
                  "view": "timeSeries",
                  "region": "\${AWS::Region}",
                  "period": 300
                },
                "width": 8,
                "height": 6,
                "x": 16,
                "y": 30
              }
            ]
          }
        }
      }
    }
  },
  "Outputs": {
    "myapiEndpoint8EB17201": {
      "Value": {
        "Fn::Join": [
          "",
          [
            "https://",
            {
              "Ref": "myapi162F20B8"
            },
            ".execute-api.us-east-1.",
            {
              "Ref": "AWS::URLSuffix"
            },
            "/",
            {
              "Ref": "myapiDeploymentStageprod329F21FF"
            },
            "/"
          ]
        ]
      }
    }
  },
  "Parameters": {
    "BootstrapVersion": {
      "Type": "AWS::SSM::Parameter::Value<String>",
      "Default": "/cdk-bootstrap/hnb659fds/version",
      "Description": "Version of the CDK Bootstrap resources in this environment, automatically retrieved from SSM Parameter Store. [cdk:skip]"
    }
  },
  "Rules": {
    "CheckBootstrapVersion": {
      "Assertions": [
        {
          "Assert": {
            "Fn::Not": [
              {
                "Fn::Contains": [
                  [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5"
                  ],
                  {
                    "Ref": "BootstrapVersion"
                  }
                ]
              }
            ]
          },
          "AssertDescription": "CDK bootstrap stack version 6 required. Please run 'cdk bootstrap' with a recent version of the CDK CLI."
        }
      ]
    }
  }
}
`

exports[`cdk-test-project/tests/snapshot/cdk-test-project-snapshot.test.ts > TAP > the Macro adds SLIC Watch dashboards and alarms to synthesized CDK project > stepFunctionStack > stepFunctionStack fragment 1`] = `
{
  "Transform": "SlicWatch-v3",
  "Metadata": {
    "slicWatch": {
      "enabled": true,
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
      },
      "topicArn": {
        "Ref": "MyTopic86869434"
      }
    }
  },
  "Resources": {
    "MyTopic86869434": {
      "Type": "AWS::SNS::Topic",
      "Metadata": {
        "aws:cdk:path": "CdkSFNStackTest-Europe/MyTopic/Resource"
      }
    },
    "HelloHandlerServiceRole11EF7C63": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              }
            }
          ],
          "Version": "2012-10-17"
        },
        "ManagedPolicyArns": [
          {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition"
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
              ]
            ]
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkSFNStackTest-Europe/HelloHandler/ServiceRole/Resource"
      }
    },
    "HelloHandler2E4FBA4D": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-eu-west-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Role": {
          "Fn::GetAtt": [
            "HelloHandlerServiceRole11EF7C63",
            "Arn"
          ]
        },
        "Handler": "hello.handler",
        "Runtime": "nodejs18.x"
      },
      "DependsOn": [
        "HelloHandlerServiceRole11EF7C63"
      ],
      "Metadata": {
        "slicWatch": {
          "alarms": {
            "Lambda": {
              "Invocations": {
                "Threshold": 4
              }
            }
          }
        }
      }
    },
    "StateMachineRoleB840431D": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "states.eu-west-1.amazonaws.com"
              }
            }
          ],
          "Version": "2012-10-17"
        }
      },
      "Metadata": {
        "aws:cdk:path": "CdkSFNStackTest-Europe/StateMachine/Role/Resource"
      }
    },
    "StateMachineRoleDefaultPolicyDF1E6607": {
      "Type": "AWS::IAM::Policy",
      "Properties": {
        "PolicyDocument": {
          "Statement": [
            {
              "Action": "lambda:InvokeFunction",
              "Effect": "Allow",
              "Resource": [
                {
                  "Fn::GetAtt": [
                    "HelloHandler2E4FBA4D",
                    "Arn"
                  ]
                },
                {
                  "Fn::Join": [
                    "",
                    [
                      {
                        "Fn::GetAtt": [
                          "HelloHandler2E4FBA4D",
                          "Arn"
                        ]
                      },
                      ":*"
                    ]
                  ]
                }
              ]
            }
          ],
          "Version": "2012-10-17"
        },
        "PolicyName": "StateMachineRoleDefaultPolicyDF1E6607",
        "Roles": [
          {
            "Ref": "StateMachineRoleB840431D"
          }
        ]
      },
      "Metadata": {
        "aws:cdk:path": "CdkSFNStackTest-Europe/StateMachine/Role/DefaultPolicy/Resource"
      }
    },
    "StateMachine2E01A3A5": {
      "Type": "AWS::StepFunctions::StateMachine",
      "Properties": {
        "RoleArn": {
          "Fn::GetAtt": [
            "StateMachineRoleB840431D",
            "Arn"
          ]
        },
        "DefinitionString": {
          "Fn::Join": [
            "",
            [
              "{\\"StartAt\\":\\"Submit Job\\",\\"States\\":{\\"Submit Job\\":{\\"Next\\":\\"Wait X Seconds\\",\\"Retry\\":[{\\"ErrorEquals\\":[\\"Lambda.ServiceException\\",\\"Lambda.AWSLambdaException\\",\\"Lambda.SdkClientException\\"],\\"IntervalSeconds\\":2,\\"MaxAttempts\\":6,\\"BackoffRate\\":2}],\\"Type\\":\\"Task\\",\\"OutputPath\\":\\"$.Payload\\",\\"Resource\\":\\"arn:",
              {
                "Ref": "AWS::Partition"
              },
              ":states:::lambda:invoke\\",\\"Parameters\\":{\\"FunctionName\\":\\"",
              {
                "Fn::GetAtt": [
                  "HelloHandler2E4FBA4D",
                  "Arn"
                ]
              },
              "\\",\\"Payload.$\\":\\"$\\"}},\\"Wait X Seconds\\":{\\"Type\\":\\"Wait\\",\\"SecondsPath\\":\\"$.waitSeconds\\",\\"Next\\":\\"Get Job Status\\"},\\"Get Job Status\\":{\\"Next\\":\\"Job Complete?\\",\\"Retry\\":[{\\"ErrorEquals\\":[\\"Lambda.ServiceException\\",\\"Lambda.AWSLambdaException\\",\\"Lambda.SdkClientException\\"],\\"IntervalSeconds\\":2,\\"MaxAttempts\\":6,\\"BackoffRate\\":2}],\\"Type\\":\\"Task\\",\\"InputPath\\":\\"$.guid\\",\\"OutputPath\\":\\"$.Payload\\",\\"Resource\\":\\"arn:",
              {
                "Ref": "AWS::Partition"
              },
              ":states:::lambda:invoke\\",\\"Parameters\\":{\\"FunctionName\\":\\"",
              {
                "Fn::GetAtt": [
                  "HelloHandler2E4FBA4D",
                  "Arn"
                ]
              },
              "\\",\\"Payload.$\\":\\"$\\"}},\\"Job Complete?\\":{\\"Type\\":\\"Choice\\",\\"Choices\\":[{\\"Variable\\":\\"$.status\\",\\"StringEquals\\":\\"FAILED\\",\\"Next\\":\\"Job Failed\\"},{\\"Variable\\":\\"$.status\\",\\"StringEquals\\":\\"SUCCEEDED\\",\\"Next\\":\\"Get Final Job Status\\"}],\\"Default\\":\\"Wait X Seconds\\"},\\"Job Failed\\":{\\"Type\\":\\"Fail\\",\\"Error\\":\\"DescribeJob returned FAILED\\",\\"Cause\\":\\"AWS Batch Job Failed\\"},\\"Get Final Job Status\\":{\\"End\\":true,\\"Retry\\":[{\\"ErrorEquals\\":[\\"Lambda.ServiceException\\",\\"Lambda.AWSLambdaException\\",\\"Lambda.SdkClientException\\"],\\"IntervalSeconds\\":2,\\"MaxAttempts\\":6,\\"BackoffRate\\":2}],\\"Type\\":\\"Task\\",\\"InputPath\\":\\"$.guid\\",\\"OutputPath\\":\\"$.Payload\\",\\"Resource\\":\\"arn:",
              {
                "Ref": "AWS::Partition"
              },
              ":states:::lambda:invoke\\",\\"Parameters\\":{\\"FunctionName\\":\\"",
              {
                "Fn::GetAtt": [
                  "HelloHandler2E4FBA4D",
                  "Arn"
                ]
              },
              "\\",\\"Payload.$\\":\\"$\\"}}},\\"TimeoutSeconds\\":300}"
            ]
          ]
        }
      },
      "DependsOn": [
        "StateMachineRoleDefaultPolicyDF1E6607",
        "StateMachineRoleB840431D"
      ],
      "UpdateReplacePolicy": "Delete",
      "DeletionPolicy": "Delete",
      "Metadata": {
        "aws:cdk:path": "CdkSFNStackTest-Europe/StateMachine/Resource"
      }
    },
    "CDKMetadata": {
      "Type": "AWS::CDK::Metadata",
      "Properties": {
        "Analytics": "v2:deflate64:H4sIAAAAAAAA/11P0UoDQQz8lr7nolaQvtpCoaAgp+Djke6lbbp7u6XZq8iy/+7etoIIgZnJhEwyx8UT3s/oSxvT28bJFtN7JGOhtLqkXjF9hJMYWO18JRkcDdueMK1Hb6IEP1m/PIPQgKkNjqd2xbfgxHxP8soy6GNHqhwVnycoGpejsRyXpAwa+bS77dMuklrFl5q58Zdg/w1g+iSJsCZxsDoEMQzlgcivZA7i6xV/dc7QsobxXOZqeDH34vf12puRwYee8ah3l4cFlprPjirSnEcfZWBsr/gDsE52pTwBAAA="
      },
      "Metadata": {
        "aws:cdk:path": "CdkSFNStackTest-Europe/CDKMetadata/Default"
      }
    },
    "slicWatchLambdaErrorsAlarmHelloHandler2E4FBA4D": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${HelloHandler2E4FBA4D}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${HelloHandler2E4FBA4D} breaches 0",
            {}
          ]
        },
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloHandler2E4FBA4D"
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
    "slicWatchLambdaThrottlesAlarmHelloHandler2E4FBA4D": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${HelloHandler2E4FBA4D}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${HelloHandler2E4FBA4D} breaches 0",
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
                      "Ref": "HelloHandler2E4FBA4D"
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
                      "Ref": "HelloHandler2E4FBA4D"
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
    "slicWatchLambdaDurationAlarmHelloHandler2E4FBA4D": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${HelloHandler2E4FBA4D}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${HelloHandler2E4FBA4D} breaches 95% of timeout (3)",
            {}
          ]
        },
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloHandler2E4FBA4D"
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
    "slicWatchLambdaInvocationsAlarmHelloHandler2E4FBA4D": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${HelloHandler2E4FBA4D}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${HelloHandler2E4FBA4D} breaches 4",
            {}
          ]
        },
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloHandler2E4FBA4D"
            }
          }
        ],
        "Statistic": "Sum",
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Threshold": 4
      }
    },
    "slicWatchStatesExecutionThrottledAlarmStateMachine2E01A3A5": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "OKActions": [],
        "MetricName": "ExecutionThrottled",
        "Namespace": "AWS/States",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "StateMachine2E01A3A5"
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionThrottledAlarm_\${StateMachine2E01A3A5.Name}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionThrottled Sum for \${StateMachine2E01A3A5.Name}  breaches 0",
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
    "slicWatchStatesExecutionsFailedAlarmStateMachine2E01A3A5": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "OKActions": [],
        "MetricName": "ExecutionsFailed",
        "Namespace": "AWS/States",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "StateMachine2E01A3A5"
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionsFailedAlarm_\${StateMachine2E01A3A5.Name}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionsFailed Sum for \${StateMachine2E01A3A5.Name}  breaches 0",
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
    "slicWatchStatesExecutionsTimedOutAlarmStateMachine2E01A3A5": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "OKActions": [],
        "MetricName": "ExecutionsTimedOut",
        "Namespace": "AWS/States",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "StateMachine2E01A3A5"
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionsTimedOutAlarm_\${StateMachine2E01A3A5.Name}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionsTimedOut Sum for \${StateMachine2E01A3A5.Name}  breaches 0",
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
    "slicWatchSNSNumberOfNotificationsFilteredOutInvalidAttributesAlarmMyTopic86869434": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "OKActions": [],
        "MetricName": "NumberOfNotificationsFilteredOut-InvalidAttributes",
        "Namespace": "AWS/SNS",
        "Dimensions": [
          {
            "Name": "TopicName",
            "Value": {
              "Fn::GetAtt": [
                "MyTopic86869434",
                "TopicName"
              ]
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "SNS_NumberOfNotificationsFilteredOutInvalidAttributes_Alarm_\${MyTopic86869434.TopicName}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "SNS NumberOfNotificationsFilteredOutInvalidAttributes for \${MyTopic86869434.TopicName} breaches 1",
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
    "slicWatchSNSNumberOfNotificationsFailedAlarmMyTopic86869434": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "OKActions": [],
        "MetricName": "NumberOfNotificationsFailed",
        "Namespace": "AWS/SNS",
        "Dimensions": [
          {
            "Name": "TopicName",
            "Value": {
              "Fn::GetAtt": [
                "MyTopic86869434",
                "TopicName"
              ]
            }
          }
        ],
        "AlarmName": {
          "Fn::Sub": [
            "SNS_NumberOfNotificationsFailed_Alarm_\${MyTopic86869434.TopicName}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "SNS NumberOfNotificationsFailed for \${MyTopic86869434.TopicName} breaches 1",
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
                      "\${StateMachine2E01A3A5}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/States",
                      "ExecutionThrottled",
                      "StateMachineArn",
                      "\${StateMachine2E01A3A5}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/States",
                      "ExecutionsTimedOut",
                      "StateMachineArn",
                      "\${StateMachine2E01A3A5}",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "\${StateMachine2E01A3A5.Name} Step Function Executions",
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
                      "Errors",
                      "FunctionName",
                      "\${HelloHandler2E4FBA4D}",
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
                      "\${HelloHandler2E4FBA4D}",
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
                      "\${HelloHandler2E4FBA4D}",
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
                      "\${HelloHandler2E4FBA4D}",
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
                      "\${HelloHandler2E4FBA4D}",
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
                      "\${HelloHandler2E4FBA4D}",
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
                "y": 12
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${HelloHandler2E4FBA4D}",
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
                "y": 12
              },
              {
                "type": "metric",
                "properties": {
                  "metrics": [
                    [
                      "AWS/SNS",
                      "NumberOfNotificationsFilteredOut-InvalidAttributes",
                      "TopicName",
                      "\${MyTopic86869434.TopicName}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/SNS",
                      "NumberOfNotificationsFailed",
                      "TopicName",
                      "\${MyTopic86869434.TopicName}",
                      {
                        "stat": "Sum"
                      }
                    ]
                  ],
                  "title": "SNS Topic \${MyTopic86869434.TopicName}",
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
    }
  },
  "Parameters": {
    "BootstrapVersion": {
      "Type": "AWS::SSM::Parameter::Value<String>",
      "Default": "/cdk-bootstrap/hnb659fds/version",
      "Description": "Version of the CDK Bootstrap resources in this environment, automatically retrieved from SSM Parameter Store. [cdk:skip]"
    }
  },
  "Rules": {
    "CheckBootstrapVersion": {
      "Assertions": [
        {
          "Assert": {
            "Fn::Not": [
              {
                "Fn::Contains": [
                  [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5"
                  ],
                  {
                    "Ref": "BootstrapVersion"
                  }
                ]
              }
            ]
          },
          "AssertDescription": "CDK bootstrap stack version 6 required. Please run 'cdk bootstrap' with a recent version of the CDK CLI."
        }
      ]
    }
  }
}
`

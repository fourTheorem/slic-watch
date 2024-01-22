/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`cdk-test-project/tests/snapshot/cdk-test-project-snapshot.test.ts > TAP > the Macro adds SLIC Watch dashboards and alarms to synthesized CDK project > ecsStack > ecsStack fragment 1`] = `
{
  "Metadata": {
    "slicWatch": {
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
      "Default": "/cdk-bootstrap/hnb659fds/version",
      "Description": "Version of the CDK Bootstrap resources in this environment, automatically retrieved from SSM Parameter Store. [cdk:skip]",
      "Type": "AWS::SSM::Parameter::Value<String>"
    }
  },
  "Resources": {
    "CDKMetadata": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/CDKMetadata/Default"
      },
      "Properties": {
        "Analytics": "v2:deflate64:H4sIAAAAAAAA/31RTU8CMRD9LdxLRQ7GKyISEqMbIF7JbHdcR0q76UwhZrP/3ewHy4rG07x589r5eFN9f6cnIzjx2GT7saVUlxsBs1dw4l2JhncFiGBwrGdFYcmAkHfPHrIHsOAMZk8QchDcYDiSQYUWWMhYD1naKMjlx6ku/34d1Pz9Zz7UEQu6TnPGg/oWQo6yDD4WtWSQVgrNVJcbNDGQfPWS/4lFHpD5F71yLf9WmLr2lsxVElNLZhNTh9Loe7T2UXALqcULf+FmzN5QM3wvrsFildThBWQJgif4UkmgY33V/uOVq13AXtBO0mUzETAfB3RSb8667EzZAu8f8Z0cnVteM94JkMMw4K4Mbc7RQRtZWj86WCmCgy7Xvt23iYm3ZJoBW1Qp63PW5bPP+7ufcVXV2WuUIopaI/sY2pZnXCnnM9SffHOcTvTtRE9Gn0w0DtEJHVCv2/gNbRFl8sgCAAA="
      },
      "Type": "AWS::CDK::Metadata"
    },
    "EcsDefaultClusterMnL3mNNYN926A5246": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Resource"
      },
      "Type": "AWS::ECS::Cluster"
    },
    "EcsDefaultClusterMnL3mNNYNVpc7788A521": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/Resource"
      },
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
      "Type": "AWS::EC2::VPC"
    },
    "EcsDefaultClusterMnL3mNNYNVpcIGW9C2C2B8F": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/IGW"
      },
      "Properties": {
        "Tags": [
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc"
          }
        ]
      },
      "Type": "AWS::EC2::InternetGateway"
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1DefaultRouteA5ADF694": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet1/DefaultRoute"
      },
      "Properties": {
        "DestinationCidrBlock": "0.0.0.0/0",
        "NatGatewayId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1NATGateway5E3732C1"
        },
        "RouteTableId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1RouteTable4F1D2E36"
        }
      },
      "Type": "AWS::EC2::Route"
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1RouteTable4F1D2E36": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet1/RouteTable"
      },
      "Properties": {
        "Tags": [
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet1"
          }
        ],
        "VpcId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521"
        }
      },
      "Type": "AWS::EC2::RouteTable"
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1RouteTableAssociation34B92275": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet1/RouteTableAssociation"
      },
      "Properties": {
        "RouteTableId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1RouteTable4F1D2E36"
        },
        "SubnetId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1Subnet075EFF4C"
        }
      },
      "Type": "AWS::EC2::SubnetRouteTableAssociation"
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1Subnet075EFF4C": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet1/Subnet"
      },
      "Properties": {
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
        ],
        "VpcId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521"
        }
      },
      "Type": "AWS::EC2::Subnet"
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2DefaultRoute20CE2D89": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet2/DefaultRoute"
      },
      "Properties": {
        "DestinationCidrBlock": "0.0.0.0/0",
        "NatGatewayId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2NATGateway4C855E00"
        },
        "RouteTableId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2RouteTableDCE46591"
        }
      },
      "Type": "AWS::EC2::Route"
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2RouteTableAssociation111C622F": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet2/RouteTableAssociation"
      },
      "Properties": {
        "RouteTableId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2RouteTableDCE46591"
        },
        "SubnetId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2SubnetE4CEDF73"
        }
      },
      "Type": "AWS::EC2::SubnetRouteTableAssociation"
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2RouteTableDCE46591": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet2/RouteTable"
      },
      "Properties": {
        "Tags": [
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet2"
          }
        ],
        "VpcId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521"
        }
      },
      "Type": "AWS::EC2::RouteTable"
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2SubnetE4CEDF73": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet2/Subnet"
      },
      "Properties": {
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
        ],
        "VpcId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521"
        }
      },
      "Type": "AWS::EC2::Subnet"
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1DefaultRouteFF4E2178": {
      "DependsOn": [
        "EcsDefaultClusterMnL3mNNYNVpcVPCGW2447264E"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1/DefaultRoute"
      },
      "Properties": {
        "DestinationCidrBlock": "0.0.0.0/0",
        "GatewayId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcIGW9C2C2B8F"
        },
        "RouteTableId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1RouteTableA1FD6ACC"
        }
      },
      "Type": "AWS::EC2::Route"
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1EIP8704DB2F": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1/EIP"
      },
      "Properties": {
        "Domain": "vpc",
        "Tags": [
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1"
          }
        ]
      },
      "Type": "AWS::EC2::EIP"
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1NATGateway5E3732C1": {
      "DependsOn": [
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1DefaultRouteFF4E2178",
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1RouteTableAssociation8B583A17"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1/NATGateway"
      },
      "Properties": {
        "AllocationId": {
          "Fn::GetAtt": [
            "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1EIP8704DB2F",
            "AllocationId"
          ]
        },
        "SubnetId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1Subnet3C273B99"
        },
        "Tags": [
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1"
          }
        ]
      },
      "Type": "AWS::EC2::NatGateway"
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1RouteTableA1FD6ACC": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1/RouteTable"
      },
      "Properties": {
        "Tags": [
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1"
          }
        ],
        "VpcId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521"
        }
      },
      "Type": "AWS::EC2::RouteTable"
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1RouteTableAssociation8B583A17": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1/RouteTableAssociation"
      },
      "Properties": {
        "RouteTableId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1RouteTableA1FD6ACC"
        },
        "SubnetId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1Subnet3C273B99"
        }
      },
      "Type": "AWS::EC2::SubnetRouteTableAssociation"
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1Subnet3C273B99": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1/Subnet"
      },
      "Properties": {
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
        ],
        "VpcId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521"
        }
      },
      "Type": "AWS::EC2::Subnet"
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2DefaultRouteB1375520": {
      "DependsOn": [
        "EcsDefaultClusterMnL3mNNYNVpcVPCGW2447264E"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2/DefaultRoute"
      },
      "Properties": {
        "DestinationCidrBlock": "0.0.0.0/0",
        "GatewayId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcIGW9C2C2B8F"
        },
        "RouteTableId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2RouteTable263DEAA5"
        }
      },
      "Type": "AWS::EC2::Route"
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2EIPF0764873": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2/EIP"
      },
      "Properties": {
        "Domain": "vpc",
        "Tags": [
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2"
          }
        ]
      },
      "Type": "AWS::EC2::EIP"
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2NATGateway4C855E00": {
      "DependsOn": [
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2DefaultRouteB1375520",
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2RouteTableAssociation43E5803C"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2/NATGateway"
      },
      "Properties": {
        "AllocationId": {
          "Fn::GetAtt": [
            "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2EIPF0764873",
            "AllocationId"
          ]
        },
        "SubnetId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2Subnet95FF715A"
        },
        "Tags": [
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2"
          }
        ]
      },
      "Type": "AWS::EC2::NatGateway"
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2RouteTable263DEAA5": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2/RouteTable"
      },
      "Properties": {
        "Tags": [
          {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2"
          }
        ],
        "VpcId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521"
        }
      },
      "Type": "AWS::EC2::RouteTable"
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2RouteTableAssociation43E5803C": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2/RouteTableAssociation"
      },
      "Properties": {
        "RouteTableId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2RouteTable263DEAA5"
        },
        "SubnetId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2Subnet95FF715A"
        }
      },
      "Type": "AWS::EC2::SubnetRouteTableAssociation"
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2Subnet95FF715A": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2/Subnet"
      },
      "Properties": {
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
        ],
        "VpcId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521"
        }
      },
      "Type": "AWS::EC2::Subnet"
    },
    "EcsDefaultClusterMnL3mNNYNVpcVPCGW2447264E": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/VPCGW"
      },
      "Properties": {
        "InternetGatewayId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcIGW9C2C2B8F"
        },
        "VpcId": {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521"
        }
      },
      "Type": "AWS::EC2::VPCGatewayAttachment"
    },
    "MyWebServerLB3B5FD3AB": {
      "DependsOn": [
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1DefaultRouteFF4E2178",
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1RouteTableAssociation8B583A17",
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2DefaultRouteB1375520",
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2RouteTableAssociation43E5803C"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/LB/Resource"
      },
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
      "Type": "AWS::ElasticLoadBalancingV2::LoadBalancer"
    },
    "MyWebServerLBPublicListener03D7C493": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/LB/PublicListener/Resource"
      },
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
      "Type": "AWS::ElasticLoadBalancingV2::Listener"
    },
    "MyWebServerLBPublicListenerECSGroup5AB9F1C3": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/LB/PublicListener/ECSGroup/Resource"
      },
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
      "Type": "AWS::ElasticLoadBalancingV2::TargetGroup"
    },
    "MyWebServerLBSecurityGroup01B285AA": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/LB/SecurityGroup/Resource"
      },
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
      "Type": "AWS::EC2::SecurityGroup"
    },
    "MyWebServerLBSecurityGrouptoCdkECSStackTestEuropeMyWebServerServiceSecurityGroup792A2ECD807CF0A9FB": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/LB/SecurityGroup/to CdkECSStackTestEuropeMyWebServerServiceSecurityGroup792A2ECD:80"
      },
      "Properties": {
        "Description": "Load balancer to target",
        "DestinationSecurityGroupId": {
          "Fn::GetAtt": [
            "MyWebServerServiceSecurityGroup6788214A",
            "GroupId"
          ]
        },
        "FromPort": 80,
        "GroupId": {
          "Fn::GetAtt": [
            "MyWebServerLBSecurityGroup01B285AA",
            "GroupId"
          ]
        },
        "IpProtocol": "tcp",
        "ToPort": 80
      },
      "Type": "AWS::EC2::SecurityGroupEgress"
    },
    "MyWebServerService2FE7341D": {
      "DependsOn": [
        "MyWebServerLBPublicListenerECSGroup5AB9F1C3",
        "MyWebServerLBPublicListener03D7C493",
        "MyWebServerTaskDefTaskRoleB23C17AA"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/Service/Service"
      },
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
      "Type": "AWS::ECS::Service"
    },
    "MyWebServerServiceSecurityGroup6788214A": {
      "DependsOn": [
        "MyWebServerTaskDefTaskRoleB23C17AA"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/Service/SecurityGroup/Resource"
      },
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
      "Type": "AWS::EC2::SecurityGroup"
    },
    "MyWebServerServiceSecurityGroupfromCdkECSStackTestEuropeMyWebServerLBSecurityGroup8823910380E44CF71E": {
      "DependsOn": [
        "MyWebServerTaskDefTaskRoleB23C17AA"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/Service/SecurityGroup/from CdkECSStackTestEuropeMyWebServerLBSecurityGroup88239103:80"
      },
      "Properties": {
        "Description": "Load balancer to target",
        "FromPort": 80,
        "GroupId": {
          "Fn::GetAtt": [
            "MyWebServerServiceSecurityGroup6788214A",
            "GroupId"
          ]
        },
        "IpProtocol": "tcp",
        "SourceSecurityGroupId": {
          "Fn::GetAtt": [
            "MyWebServerLBSecurityGroup01B285AA",
            "GroupId"
          ]
        },
        "ToPort": 80
      },
      "Type": "AWS::EC2::SecurityGroupIngress"
    },
    "MyWebServerTaskDef4CE825A0": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/TaskDef/Resource"
      },
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
      "Type": "AWS::ECS::TaskDefinition"
    },
    "MyWebServerTaskDefExecutionRole3C69E361": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/TaskDef/ExecutionRole/Resource"
      },
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
      "Type": "AWS::IAM::Role"
    },
    "MyWebServerTaskDefExecutionRoleDefaultPolicy2AEB4329": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/TaskDef/ExecutionRole/DefaultPolicy/Resource"
      },
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
      "Type": "AWS::IAM::Policy"
    },
    "MyWebServerTaskDefTaskRoleB23C17AA": {
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/TaskDef/TaskRole/Resource"
      },
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
      "Type": "AWS::IAM::Role"
    },
    "MyWebServerTaskDefwebLogGroupC6EE23D4": {
      "DeletionPolicy": "Retain",
      "Metadata": {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/TaskDef/web/LogGroup/Resource"
      },
      "Type": "AWS::Logs::LogGroup",
      "UpdateReplacePolicy": "Retain"
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
                      "AWS/ECS",
                      "MemoryUtilization",
                      "ServiceName",
                      "\${MyWebServerService2FE7341D.Name}",
                      "ClusterName",
                      "\${EcsDefaultClusterMnL3mNNYN926A5246}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
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
                        "stat": "Average",
                        "yAxis": "left"
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
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/ApplicationELB",
                      "RejectedConnectionCount",
                      "LoadBalancer",
                      "\${MyWebServerLB3B5FD3AB.LoadBalancerFullName}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
                        "stat": "Sum",
                        "yAxis": "left"
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
                        "stat": "Average",
                        "yAxis": "left"
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
      },
      "Type": "AWS::CloudWatch::Dashboard"
    },
    "slicWatchECSCPUAlarmMyWebServerService2FE7341D": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "AlarmDescription": {
          "Fn::Sub": [
            "ECS CPUUtilization for \${MyWebServerService2FE7341D.Name} breaches 90",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "ECS_CPUAlarm_\${MyWebServerService2FE7341D.Name}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
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
        "EvaluationPeriods": 1,
        "MetricName": "CPUUtilization",
        "Namespace": "AWS/ECS",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 90,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchECSMemoryAlarmMyWebServerService2FE7341D": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "AlarmDescription": {
          "Fn::Sub": [
            "ECS MemoryUtilization for \${MyWebServerService2FE7341D.Name} breaches 90",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "ECS_MemoryAlarm_\${MyWebServerService2FE7341D.Name}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
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
        "EvaluationPeriods": 1,
        "MetricName": "MemoryUtilization",
        "Namespace": "AWS/ECS",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 90,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLoadBalancerHTTPCodeELB5XXCountAlarmMyWebServerLB3B5FD3AB": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "AlarmDescription": "LoadBalancer HTTPCodeELB5XXCount Sum for MyWebServerLB3B5FD3AB  breaches 0",
        "AlarmName": "LoadBalancer_HTTPCodeELB5XXCountAlarm_MyWebServerLB3B5FD3AB",
        "ComparisonOperator": "GreaterThanThreshold",
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
    "slicWatchLoadBalancerHTTPCodeTarget5XXCountAlarmMyWebServerLBPublicListenerECSGroup5AB9F1C3": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "AlarmDescription": "LoadBalancer HTTPCode_Target_5XX_Count Sum for MyWebServerLBPublicListenerECSGroup5AB9F1C3 breaches 0",
        "AlarmName": "LoadBalancer_HTTPCodeTarget5XXCountAlarm_MyWebServerLBPublicListenerECSGroup5AB9F1C3",
        "ComparisonOperator": "GreaterThanThreshold",
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
    "slicWatchLoadBalancerRejectedConnectionCountAlarmMyWebServerLB3B5FD3AB": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "AlarmDescription": "LoadBalancer RejectedConnectionCount Sum for MyWebServerLB3B5FD3AB  breaches 0",
        "AlarmName": "LoadBalancer_RejectedConnectionCountAlarm_MyWebServerLB3B5FD3AB",
        "ComparisonOperator": "GreaterThanThreshold",
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
    "slicWatchLoadBalancerUnHealthyHostCountAlarmMyWebServerLBPublicListenerECSGroup5AB9F1C3": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "AlarmDescription": "LoadBalancer UnHealthyHostCount Average for MyWebServerLBPublicListenerECSGroup5AB9F1C3 breaches 0",
        "AlarmName": "LoadBalancer_UnHealthyHostCountAlarm_MyWebServerLBPublicListenerECSGroup5AB9F1C3",
        "ComparisonOperator": "GreaterThanThreshold",
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
  },
  "Transform": "SlicWatch-v3"
}
`

exports[`cdk-test-project/tests/snapshot/cdk-test-project-snapshot.test.ts > TAP > the Macro adds SLIC Watch dashboards and alarms to synthesized CDK project > generalEuStack > generalEuStack fragment 1`] = `
{
  "Metadata": {
    "slicWatch": {
      "alarmActionsConfig": {
        "alarmActions": [
          {
            "Ref": "MyTopic86869434"
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
      "enabled": true,
      "topicArn": "arn:aws:xxxxxx:mytopic"
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
      "Default": "/cdk-bootstrap/hnb659fds/version",
      "Description": "Version of the CDK Bootstrap resources in this environment, automatically retrieved from SSM Parameter Store. [cdk:skip]",
      "Type": "AWS::SSM::Parameter::Value<String>"
    }
  },
  "Resources": {
    "CDKMetadata": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/CDKMetadata/Default"
      },
      "Properties": {
        "Analytics": "v2:deflate64:H4sIAAAAAAAA/02QTU/DMAyGf8vumSmbhLhuIE4gRrf75KamZGuTUjsbVZT/jpKOsUvex68jfy3g8QGKGZ55ruvjvDUVhK2gPio88z6wZQg71xutnj5thqha7KoaIbx4q8U4m1K3vKGhM8zG2agMdhBK11JKJI2Kl3tkJmFYJVG8hLXXR5I1MinsTYNCZxwhvOZGJbGsepML/ONKa+etqGfqWzd2ZCW5N9FWsMldJyiJnR805Sabwf2Mf86l8MRvJF+uTtZEUdWjxc7VFYQdVtMeGaKiE1lhCKW/rOfzet8M4cOTz94E+d241ujxak5hjNfJVD5HmtbYJn1799J7uR0vKutqggPfnRYF3BdQzA5szHzwVkxHUE76CyBn/pPVAQAA"
      },
      "Type": "AWS::CDK::Metadata"
    },
    "DeadLetterQueue9F481546": {
      "DeletionPolicy": "Delete",
      "Metadata": {
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
      "Type": "AWS::SQS::Queue",
      "UpdateReplacePolicy": "Delete"
    },
    "DeadLetterQueuePolicyB1FB890C": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DeadLetterQueue/Policy/Resource"
      },
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
      "Type": "AWS::SQS::QueuePolicy"
    },
    "DriveQueueHandler9F657A00": {
      "DependsOn": [
        "DriveQueueHandlerServiceRoleD796850A"
      ],
      "Metadata": {
        "aws:asset:is-bundled": false,
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:property": "Code",
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DriveQueueHandler/Resource"
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-eu-west-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Handler": "hello.handler",
        "Role": {
          "Fn::GetAtt": [
            "DriveQueueHandlerServiceRoleD796850A",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x"
      },
      "Type": "AWS::Lambda::Function"
    },
    "DriveQueueHandlerServiceRoleD796850A": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DriveQueueHandler/ServiceRole/Resource"
      },
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
      "Type": "AWS::IAM::Role"
    },
    "DriveStreamHandler62F1767B": {
      "DependsOn": [
        "DriveStreamHandlerServiceRoleD2BAFDD4"
      ],
      "Metadata": {
        "aws:asset:is-bundled": false,
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:property": "Code",
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DriveStreamHandler/Resource"
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-eu-west-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Handler": "stream-test-handler.handleDrive",
        "Role": {
          "Fn::GetAtt": [
            "DriveStreamHandlerServiceRoleD2BAFDD4",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x"
      },
      "Type": "AWS::Lambda::Function"
    },
    "DriveStreamHandlerServiceRoleD2BAFDD4": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DriveStreamHandler/ServiceRole/Resource"
      },
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
      "Type": "AWS::IAM::Role"
    },
    "DriveTableHandler119966B0": {
      "DependsOn": [
        "DriveTableHandlerServiceRoleDDA3FBE1"
      ],
      "Metadata": {
        "aws:asset:is-bundled": false,
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:property": "Code",
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DriveTableHandler/Resource"
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-eu-west-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Handler": "hello.handler",
        "Role": {
          "Fn::GetAtt": [
            "DriveTableHandlerServiceRoleDDA3FBE1",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x"
      },
      "Type": "AWS::Lambda::Function"
    },
    "DriveTableHandlerServiceRoleDDA3FBE1": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DriveTableHandler/ServiceRole/Resource"
      },
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
      "Type": "AWS::IAM::Role"
    },
    "HelloHandler2E4FBA4D": {
      "DependsOn": [
        "HelloHandlerServiceRole11EF7C63"
      ],
      "Metadata": {
        "slicWatch": {
          "alarms": {
            "Invocations": {
              "Threshold": 4
            }
          }
        }
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-eu-west-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Handler": "hello.handler",
        "Role": {
          "Fn::GetAtt": [
            "HelloHandlerServiceRole11EF7C63",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x"
      },
      "Type": "AWS::Lambda::Function"
    },
    "HelloHandlerServiceRole11EF7C63": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/HelloHandler/ServiceRole/Resource"
      },
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
      "Type": "AWS::IAM::Role"
    },
    "myapi162F20B8": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Resource"
      },
      "Properties": {
        "Name": "myapi"
      },
      "Type": "AWS::ApiGateway::RestApi"
    },
    "myapiAccountC3A4750C": {
      "DeletionPolicy": "Retain",
      "DependsOn": [
        "myapi162F20B8"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Account"
      },
      "Properties": {
        "CloudWatchRoleArn": {
          "Fn::GetAtt": [
            "myapiCloudWatchRoleEB425128",
            "Arn"
          ]
        }
      },
      "Type": "AWS::ApiGateway::Account",
      "UpdateReplacePolicy": "Retain"
    },
    "myapiANY111D56B7": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Default/ANY/Resource"
      },
      "Properties": {
        "AuthorizationType": "NONE",
        "HttpMethod": "ANY",
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
        },
        "ResourceId": {
          "Fn::GetAtt": [
            "myapi162F20B8",
            "RootResourceId"
          ]
        },
        "RestApiId": {
          "Ref": "myapi162F20B8"
        }
      },
      "Type": "AWS::ApiGateway::Method"
    },
    "myapiANYApiPermissionCdkGeneralStackTestEuropemyapi65F2E57FANYEF4BF8F6": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Default/ANY/ApiPermission.CdkGeneralStackTestEuropemyapi65F2E57F.ANY.."
      },
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
      "Type": "AWS::Lambda::Permission"
    },
    "myapiANYApiPermissionTestCdkGeneralStackTestEuropemyapi65F2E57FANY3EBCCF8C": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Default/ANY/ApiPermission.Test.CdkGeneralStackTestEuropemyapi65F2E57F.ANY.."
      },
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
      "Type": "AWS::Lambda::Permission"
    },
    "myapiCloudWatchRoleEB425128": {
      "DeletionPolicy": "Retain",
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/CloudWatchRole/Resource"
      },
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
      "Type": "AWS::IAM::Role",
      "UpdateReplacePolicy": "Retain"
    },
    "myapiDeploymentB7EF8EB76dbd4bbbb18c5c458967fb55792b4830": {
      "DependsOn": [
        "myapiproxyANYDD7FCE64",
        "myapiproxyB6DF4575",
        "myapiANY111D56B7"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Deployment/Resource"
      },
      "Properties": {
        "Description": "Automatically created by the RestApi construct",
        "RestApiId": {
          "Ref": "myapi162F20B8"
        }
      },
      "Type": "AWS::ApiGateway::Deployment"
    },
    "myapiDeploymentStageprod329F21FF": {
      "DependsOn": [
        "myapiAccountC3A4750C"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/DeploymentStage.prod/Resource"
      },
      "Properties": {
        "DeploymentId": {
          "Ref": "myapiDeploymentB7EF8EB76dbd4bbbb18c5c458967fb55792b4830"
        },
        "RestApiId": {
          "Ref": "myapi162F20B8"
        },
        "StageName": "prod"
      },
      "Type": "AWS::ApiGateway::Stage"
    },
    "myapiproxyANYApiPermissionCdkGeneralStackTestEuropemyapi65F2E57FANYproxyBDBDCB62": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Default/{proxy+}/ANY/ApiPermission.CdkGeneralStackTestEuropemyapi65F2E57F.ANY..{proxy+}"
      },
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
      "Type": "AWS::Lambda::Permission"
    },
    "myapiproxyANYApiPermissionTestCdkGeneralStackTestEuropemyapi65F2E57FANYproxyF17A09F1": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Default/{proxy+}/ANY/ApiPermission.Test.CdkGeneralStackTestEuropemyapi65F2E57F.ANY..{proxy+}"
      },
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
      "Type": "AWS::Lambda::Permission"
    },
    "myapiproxyANYDD7FCE64": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Default/{proxy+}/ANY/Resource"
      },
      "Properties": {
        "AuthorizationType": "NONE",
        "HttpMethod": "ANY",
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
        },
        "ResourceId": {
          "Ref": "myapiproxyB6DF4575"
        },
        "RestApiId": {
          "Ref": "myapi162F20B8"
        }
      },
      "Type": "AWS::ApiGateway::Method"
    },
    "myapiproxyB6DF4575": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Default/{proxy+}/Resource"
      },
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
      "Type": "AWS::ApiGateway::Resource"
    },
    "MyTopic86869434": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/MyTopic/Resource"
      },
      "Type": "AWS::SNS::Topic"
    },
    "PingHandler50068074": {
      "DependsOn": [
        "PingHandlerServiceRole46086423"
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
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-eu-west-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Handler": "hello.handler",
        "Role": {
          "Fn::GetAtt": [
            "PingHandlerServiceRole46086423",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x"
      },
      "Type": "AWS::Lambda::Function"
    },
    "PingHandlerServiceRole46086423": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/PingHandler/ServiceRole/Resource"
      },
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
      "Type": "AWS::IAM::Role"
    },
    "ruleAllowEventRuleCdkGeneralStackTestEuropeHelloHandlerE25EBD9DD0F76E59": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/rule/AllowEventRuleCdkGeneralStackTestEuropeHelloHandlerE25EBD9D"
      },
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
      "Type": "AWS::Lambda::Permission"
    },
    "ruleF2C1DCDC": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/rule/Resource"
      },
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
      "Type": "AWS::Events::Rule"
    },
    "slicWatchApi4XXErrorAlarmmyapi": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "API Gateway 4XXError Average for myapi breaches 0.05",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "ApiGW_4XXError_myapi",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "ApiName",
            "Value": "myapi"
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "4XXError",
        "Namespace": "AWS/ApiGateway",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 0.05,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchApi5XXErrorAlarmmyapi": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "API Gateway 5XXError Average for myapi breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "ApiGW_5XXError_myapi",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "ApiName",
            "Value": "myapi"
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "5XXError",
        "Namespace": "AWS/ApiGateway",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchApiLatencyAlarmmyapi": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "API Gateway Latency p99 for myapi breaches 5000",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "ApiGW_Latency_myapi",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "ApiName",
            "Value": "myapi"
          }
        ],
        "EvaluationPeriods": 1,
        "ExtendedStatistic": "p99",
        "MetricName": "Latency",
        "Namespace": "AWS/ApiGateway",
        "OKActions": [],
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
                      "myapi",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
                      "4XXError",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
                      "Latency",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "Latency",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "p95",
                        "yAxis": "left"
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
                      "Count",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
                        "stat": "Sum",
                        "yAxis": "left"
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
                      "WriteThrottleEvents",
                      "TableName",
                      "\${TableCD117FA1}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/SQS",
                      "NumberOfMessagesDeleted",
                      "QueueName",
                      "\${DeadLetterQueue9F481546.QueueName}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
                        "stat": "Maximum",
                        "yAxis": "right"
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
                        "stat": "Maximum",
                        "yAxis": "left"
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
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/SNS",
                      "NumberOfNotificationsFailed",
                      "TopicName",
                      "\${MyTopic86869434.TopicName}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Events",
                      "ThrottledRules",
                      "RuleName",
                      "\${ruleF2C1DCDC}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Events",
                      "Invocations",
                      "RuleName",
                      "\${ruleF2C1DCDC}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
      },
      "Type": "AWS::CloudWatch::Dashboard"
    },
    "slicWatchEventsFailedInvocationsAlarmRuleF2C1DCDC": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "EventBridge FailedInvocations for \${ruleF2C1DCDC} breaches 1",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Events_FailedInvocations_Alarm_\${ruleF2C1DCDC}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "RuleName",
            "Value": {
              "Ref": "ruleF2C1DCDC"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "FailedInvocations",
        "Namespace": "AWS/Events",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchEventsThrottledRulesAlarmRuleF2C1DCDC": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "EventBridge ThrottledRules for \${ruleF2C1DCDC} breaches 1",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Events_ThrottledRules_Alarm_\${ruleF2C1DCDC}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "RuleName",
            "Value": {
              "Ref": "ruleF2C1DCDC"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ThrottledRules",
        "Namespace": "AWS/Events",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmDriveQueueHandler9F657A00": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${DriveQueueHandler9F657A00} breaches 95% of timeout (3)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${DriveQueueHandler9F657A00}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveQueueHandler9F657A00"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmDriveStreamHandler62F1767B": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${DriveStreamHandler62F1767B} breaches 95% of timeout (3)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${DriveStreamHandler62F1767B}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveStreamHandler62F1767B"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmDriveTableHandler119966B0": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${DriveTableHandler119966B0} breaches 95% of timeout (3)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${DriveTableHandler119966B0}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveTableHandler119966B0"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmHelloHandler2E4FBA4D": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${HelloHandler2E4FBA4D} breaches 95% of timeout (3)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${HelloHandler2E4FBA4D}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloHandler2E4FBA4D"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmPingHandler50068074": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${PingHandler50068074} breaches 95% of timeout (3)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${PingHandler50068074}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "PingHandler50068074"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmThrottlerHandler750A7C89": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${ThrottlerHandler750A7C89} breaches 95% of timeout (3)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${ThrottlerHandler750A7C89}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "ThrottlerHandler750A7C89"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmDriveQueueHandler9F657A00": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${DriveQueueHandler9F657A00} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${DriveQueueHandler9F657A00}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveQueueHandler9F657A00"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmDriveStreamHandler62F1767B": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${DriveStreamHandler62F1767B} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${DriveStreamHandler62F1767B}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveStreamHandler62F1767B"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmDriveTableHandler119966B0": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${DriveTableHandler119966B0} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${DriveTableHandler119966B0}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveTableHandler119966B0"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmHelloHandler2E4FBA4D": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${HelloHandler2E4FBA4D} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${HelloHandler2E4FBA4D}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloHandler2E4FBA4D"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmPingHandler50068074": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${PingHandler50068074} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${PingHandler50068074}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "PingHandler50068074"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmThrottlerHandler750A7C89": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${ThrottlerHandler750A7C89} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${ThrottlerHandler750A7C89}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "ThrottlerHandler750A7C89"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmDriveQueueHandler9F657A00": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${DriveQueueHandler9F657A00} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${DriveQueueHandler9F657A00}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveQueueHandler9F657A00"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmDriveStreamHandler62F1767B": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${DriveStreamHandler62F1767B} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${DriveStreamHandler62F1767B}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveStreamHandler62F1767B"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmDriveTableHandler119966B0": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${DriveTableHandler119966B0} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${DriveTableHandler119966B0}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveTableHandler119966B0"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmHelloHandler2E4FBA4D": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${HelloHandler2E4FBA4D} breaches 4",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${HelloHandler2E4FBA4D}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloHandler2E4FBA4D"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 4,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmPingHandler50068074": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${PingHandler50068074} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${PingHandler50068074}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "PingHandler50068074"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmThrottlerHandler750A7C89": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${ThrottlerHandler750A7C89} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${ThrottlerHandler750A7C89}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "ThrottlerHandler750A7C89"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmDriveQueueHandler9F657A00": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${DriveQueueHandler9F657A00} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${DriveQueueHandler9F657A00}",
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
        "OKActions": [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmDriveStreamHandler62F1767B": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${DriveStreamHandler62F1767B} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${DriveStreamHandler62F1767B}",
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
        "OKActions": [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmDriveTableHandler119966B0": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${DriveTableHandler119966B0} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${DriveTableHandler119966B0}",
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
        "OKActions": [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmHelloHandler2E4FBA4D": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${HelloHandler2E4FBA4D} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${HelloHandler2E4FBA4D}",
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
        "OKActions": [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmPingHandler50068074": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${PingHandler50068074} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${PingHandler50068074}",
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
        "OKActions": [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmThrottlerHandler750A7C89": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${ThrottlerHandler750A7C89} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${ThrottlerHandler750A7C89}",
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
        "OKActions": [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchSNSNumberOfNotificationsFailedAlarmMyTopic86869434": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "SNS NumberOfNotificationsFailed for \${MyTopic86869434.TopicName} breaches 1",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "SNS_NumberOfNotificationsFailed_Alarm_\${MyTopic86869434.TopicName}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
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
        "EvaluationPeriods": 1,
        "MetricName": "NumberOfNotificationsFailed",
        "Namespace": "AWS/SNS",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchSNSNumberOfNotificationsFilteredOutInvalidAttributesAlarmMyTopic86869434": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "SNS NumberOfNotificationsFilteredOutInvalidAttributes for \${MyTopic86869434.TopicName} breaches 1",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "SNS_NumberOfNotificationsFilteredOutInvalidAttributes_Alarm_\${MyTopic86869434.TopicName}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
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
        "EvaluationPeriods": 1,
        "MetricName": "NumberOfNotificationsFilteredOut-InvalidAttributes",
        "Namespace": "AWS/SNS",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchSQSInFlightMsgsAlarmDeadLetterQueue9F481546": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "SQS in-flight messages for \${DeadLetterQueue9F481546.QueueName} breaches 114000 (95% of the hard limit of 120000)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "SQS_ApproximateNumberOfMessagesNotVisible_\${DeadLetterQueue9F481546.QueueName}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
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
        "EvaluationPeriods": 1,
        "MetricName": "ApproximateNumberOfMessagesNotVisible",
        "Namespace": "AWS/SQS",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 114000,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchSQSOldestMsgAgeAlarmDeadLetterQueue9F481546": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "SQS age of oldest message in the queue \${DeadLetterQueue9F481546.QueueName} breaches 60",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "SQS_ApproximateAgeOfOldestMessage_\${DeadLetterQueue9F481546.QueueName}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
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
        "EvaluationPeriods": 1,
        "MetricName": "ApproximateAgeOfOldestMessage",
        "Namespace": "AWS/SQS",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 60,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchTableReadThrottleEventsAlarmTableCD117FA1": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${TableCD117FA1} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "DDB_ReadThrottleEvents_Alarm_\${TableCD117FA1}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "TableCD117FA1"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ReadThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchTableSystemErrorsAlarmTableCD117FA1": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${TableCD117FA1} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "DDB_SystemErrors_Alarm_\${TableCD117FA1}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "TableCD117FA1"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "SystemErrors",
        "Namespace": "AWS/DynamoDB",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchTableUserErrorsAlarmTableCD117FA1": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${TableCD117FA1} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "DDB_UserErrors_Alarm_\${TableCD117FA1}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "TableCD117FA1"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "UserErrors",
        "Namespace": "AWS/DynamoDB",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchTableWriteThrottleEventsAlarmTableCD117FA1": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${TableCD117FA1} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "DDB_WriteThrottleEvents_Alarm_\${TableCD117FA1}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "TableCD117FA1"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "WriteThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "TableCD117FA1": {
      "DeletionPolicy": "Retain",
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/Table/Resource"
      },
      "Properties": {
        "AttributeDefinitions": [
          {
            "AttributeName": "id",
            "AttributeType": "S"
          }
        ],
        "BillingMode": "PAY_PER_REQUEST",
        "KeySchema": [
          {
            "AttributeName": "id",
            "KeyType": "HASH"
          }
        ]
      },
      "Type": "AWS::DynamoDB::Table",
      "UpdateReplacePolicy": "Retain"
    },
    "ThrottlerHandler750A7C89": {
      "DependsOn": [
        "ThrottlerHandlerServiceRoleA0481DAF"
      ],
      "Metadata": {
        "aws:asset:is-bundled": false,
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:property": "Code",
        "aws:cdk:path": "CdkGeneralStackTest-Europe/ThrottlerHandler/Resource"
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-eu-west-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Handler": "hello.handler",
        "ReservedConcurrentExecutions": 0,
        "Role": {
          "Fn::GetAtt": [
            "ThrottlerHandlerServiceRoleA0481DAF",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x"
      },
      "Type": "AWS::Lambda::Function"
    },
    "ThrottlerHandlerServiceRoleA0481DAF": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/ThrottlerHandler/ServiceRole/Resource"
      },
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
      "Type": "AWS::IAM::Role"
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
  },
  "Transform": "SlicWatch-v3"
}
`

exports[`cdk-test-project/tests/snapshot/cdk-test-project-snapshot.test.ts > TAP > the Macro adds SLIC Watch dashboards and alarms to synthesized CDK project > generalUsStack > generalUsStack fragment 1`] = `
{
  "Metadata": {
    "slicWatch": {
      "alarmActionsConfig": {
        "alarmActions": [
          {
            "Ref": "MyTopic86869434"
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
      "enabled": true,
      "topicArn": "arn:aws:xxxxxx:mytopic"
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
      "Default": "/cdk-bootstrap/hnb659fds/version",
      "Description": "Version of the CDK Bootstrap resources in this environment, automatically retrieved from SSM Parameter Store. [cdk:skip]",
      "Type": "AWS::SSM::Parameter::Value<String>"
    }
  },
  "Resources": {
    "CDKMetadata": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/CDKMetadata/Default"
      },
      "Properties": {
        "Analytics": "v2:deflate64:H4sIAAAAAAAA/02QTU/DMAyGf8vumSmbhLhuIE4gRrf75KamZGuTUjsbVZT/jpKOsUvex68jfy3g8QGKGZ55ruvjvDUVhK2gPio88z6wZQg71xutnj5thqha7KoaIbx4q8U4m1K3vKGhM8zG2agMdhBK11JKJI2Kl3tkJmFYJVG8hLXXR5I1MinsTYNCZxwhvOZGJbGsepML/ONKa+etqGfqWzd2ZCW5N9FWsMldJyiJnR805Sabwf2Mf86l8MRvJF+uTtZEUdWjxc7VFYQdVtMeGaKiE1lhCKW/rOfzet8M4cOTz94E+d241ujxak5hjNfJVD5HmtbYJn1799J7uR0vKutqggPfnRYF3BdQzA5szHzwVkxHUE76CyBn/pPVAQAA"
      },
      "Type": "AWS::CDK::Metadata"
    },
    "DeadLetterQueue9F481546": {
      "DeletionPolicy": "Delete",
      "Metadata": {
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
      "Type": "AWS::SQS::Queue",
      "UpdateReplacePolicy": "Delete"
    },
    "DeadLetterQueuePolicyB1FB890C": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/DeadLetterQueue/Policy/Resource"
      },
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
      "Type": "AWS::SQS::QueuePolicy"
    },
    "DriveQueueHandler9F657A00": {
      "DependsOn": [
        "DriveQueueHandlerServiceRoleD796850A"
      ],
      "Metadata": {
        "aws:asset:is-bundled": false,
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:property": "Code",
        "aws:cdk:path": "CdkGeneralStackTest-US/DriveQueueHandler/Resource"
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-us-east-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Handler": "hello.handler",
        "Role": {
          "Fn::GetAtt": [
            "DriveQueueHandlerServiceRoleD796850A",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x"
      },
      "Type": "AWS::Lambda::Function"
    },
    "DriveQueueHandlerServiceRoleD796850A": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/DriveQueueHandler/ServiceRole/Resource"
      },
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
      "Type": "AWS::IAM::Role"
    },
    "DriveStreamHandler62F1767B": {
      "DependsOn": [
        "DriveStreamHandlerServiceRoleD2BAFDD4"
      ],
      "Metadata": {
        "aws:asset:is-bundled": false,
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:property": "Code",
        "aws:cdk:path": "CdkGeneralStackTest-US/DriveStreamHandler/Resource"
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-us-east-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Handler": "stream-test-handler.handleDrive",
        "Role": {
          "Fn::GetAtt": [
            "DriveStreamHandlerServiceRoleD2BAFDD4",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x"
      },
      "Type": "AWS::Lambda::Function"
    },
    "DriveStreamHandlerServiceRoleD2BAFDD4": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/DriveStreamHandler/ServiceRole/Resource"
      },
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
      "Type": "AWS::IAM::Role"
    },
    "DriveTableHandler119966B0": {
      "DependsOn": [
        "DriveTableHandlerServiceRoleDDA3FBE1"
      ],
      "Metadata": {
        "aws:asset:is-bundled": false,
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:property": "Code",
        "aws:cdk:path": "CdkGeneralStackTest-US/DriveTableHandler/Resource"
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-us-east-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Handler": "hello.handler",
        "Role": {
          "Fn::GetAtt": [
            "DriveTableHandlerServiceRoleDDA3FBE1",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x"
      },
      "Type": "AWS::Lambda::Function"
    },
    "DriveTableHandlerServiceRoleDDA3FBE1": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/DriveTableHandler/ServiceRole/Resource"
      },
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
      "Type": "AWS::IAM::Role"
    },
    "HelloHandler2E4FBA4D": {
      "DependsOn": [
        "HelloHandlerServiceRole11EF7C63"
      ],
      "Metadata": {
        "slicWatch": {
          "alarms": {
            "Invocations": {
              "Threshold": 4
            }
          }
        }
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-us-east-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Handler": "hello.handler",
        "Role": {
          "Fn::GetAtt": [
            "HelloHandlerServiceRole11EF7C63",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x"
      },
      "Type": "AWS::Lambda::Function"
    },
    "HelloHandlerServiceRole11EF7C63": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/HelloHandler/ServiceRole/Resource"
      },
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
      "Type": "AWS::IAM::Role"
    },
    "myapi162F20B8": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Resource"
      },
      "Properties": {
        "Name": "myapi"
      },
      "Type": "AWS::ApiGateway::RestApi"
    },
    "myapiAccountC3A4750C": {
      "DeletionPolicy": "Retain",
      "DependsOn": [
        "myapi162F20B8"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Account"
      },
      "Properties": {
        "CloudWatchRoleArn": {
          "Fn::GetAtt": [
            "myapiCloudWatchRoleEB425128",
            "Arn"
          ]
        }
      },
      "Type": "AWS::ApiGateway::Account",
      "UpdateReplacePolicy": "Retain"
    },
    "myapiANY111D56B7": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Default/ANY/Resource"
      },
      "Properties": {
        "AuthorizationType": "NONE",
        "HttpMethod": "ANY",
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
        },
        "ResourceId": {
          "Fn::GetAtt": [
            "myapi162F20B8",
            "RootResourceId"
          ]
        },
        "RestApiId": {
          "Ref": "myapi162F20B8"
        }
      },
      "Type": "AWS::ApiGateway::Method"
    },
    "myapiANYApiPermissionCdkGeneralStackTestUSmyapi9E6CC024ANY52E5EFEE": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Default/ANY/ApiPermission.CdkGeneralStackTestUSmyapi9E6CC024.ANY.."
      },
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
      "Type": "AWS::Lambda::Permission"
    },
    "myapiANYApiPermissionTestCdkGeneralStackTestUSmyapi9E6CC024ANY1136CBF8": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Default/ANY/ApiPermission.Test.CdkGeneralStackTestUSmyapi9E6CC024.ANY.."
      },
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
      "Type": "AWS::Lambda::Permission"
    },
    "myapiCloudWatchRoleEB425128": {
      "DeletionPolicy": "Retain",
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/CloudWatchRole/Resource"
      },
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
      "Type": "AWS::IAM::Role",
      "UpdateReplacePolicy": "Retain"
    },
    "myapiDeploymentB7EF8EB7fea2aa51ab5416f81a0b318c3a85d817": {
      "DependsOn": [
        "myapiproxyANYDD7FCE64",
        "myapiproxyB6DF4575",
        "myapiANY111D56B7"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Deployment/Resource"
      },
      "Properties": {
        "Description": "Automatically created by the RestApi construct",
        "RestApiId": {
          "Ref": "myapi162F20B8"
        }
      },
      "Type": "AWS::ApiGateway::Deployment"
    },
    "myapiDeploymentStageprod329F21FF": {
      "DependsOn": [
        "myapiAccountC3A4750C"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/DeploymentStage.prod/Resource"
      },
      "Properties": {
        "DeploymentId": {
          "Ref": "myapiDeploymentB7EF8EB7fea2aa51ab5416f81a0b318c3a85d817"
        },
        "RestApiId": {
          "Ref": "myapi162F20B8"
        },
        "StageName": "prod"
      },
      "Type": "AWS::ApiGateway::Stage"
    },
    "myapiproxyANYApiPermissionCdkGeneralStackTestUSmyapi9E6CC024ANYproxy61FC0812": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Default/{proxy+}/ANY/ApiPermission.CdkGeneralStackTestUSmyapi9E6CC024.ANY..{proxy+}"
      },
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
      "Type": "AWS::Lambda::Permission"
    },
    "myapiproxyANYApiPermissionTestCdkGeneralStackTestUSmyapi9E6CC024ANYproxy352B4E19": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Default/{proxy+}/ANY/ApiPermission.Test.CdkGeneralStackTestUSmyapi9E6CC024.ANY..{proxy+}"
      },
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
      "Type": "AWS::Lambda::Permission"
    },
    "myapiproxyANYDD7FCE64": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Default/{proxy+}/ANY/Resource"
      },
      "Properties": {
        "AuthorizationType": "NONE",
        "HttpMethod": "ANY",
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
        },
        "ResourceId": {
          "Ref": "myapiproxyB6DF4575"
        },
        "RestApiId": {
          "Ref": "myapi162F20B8"
        }
      },
      "Type": "AWS::ApiGateway::Method"
    },
    "myapiproxyB6DF4575": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Default/{proxy+}/Resource"
      },
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
      "Type": "AWS::ApiGateway::Resource"
    },
    "MyTopic86869434": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/MyTopic/Resource"
      },
      "Type": "AWS::SNS::Topic"
    },
    "PingHandler50068074": {
      "DependsOn": [
        "PingHandlerServiceRole46086423"
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
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-us-east-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Handler": "hello.handler",
        "Role": {
          "Fn::GetAtt": [
            "PingHandlerServiceRole46086423",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x"
      },
      "Type": "AWS::Lambda::Function"
    },
    "PingHandlerServiceRole46086423": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/PingHandler/ServiceRole/Resource"
      },
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
      "Type": "AWS::IAM::Role"
    },
    "ruleAllowEventRuleCdkGeneralStackTestUSHelloHandlerC75B8B54C6DD839C": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/rule/AllowEventRuleCdkGeneralStackTestUSHelloHandlerC75B8B54"
      },
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
      "Type": "AWS::Lambda::Permission"
    },
    "ruleF2C1DCDC": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/rule/Resource"
      },
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
      "Type": "AWS::Events::Rule"
    },
    "slicWatchApi4XXErrorAlarmmyapi": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "API Gateway 4XXError Average for myapi breaches 0.05",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "ApiGW_4XXError_myapi",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "ApiName",
            "Value": "myapi"
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "4XXError",
        "Namespace": "AWS/ApiGateway",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 0.05,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchApi5XXErrorAlarmmyapi": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "API Gateway 5XXError Average for myapi breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "ApiGW_5XXError_myapi",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "ApiName",
            "Value": "myapi"
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "5XXError",
        "Namespace": "AWS/ApiGateway",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchApiLatencyAlarmmyapi": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "API Gateway Latency p99 for myapi breaches 5000",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "ApiGW_Latency_myapi",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "ApiName",
            "Value": "myapi"
          }
        ],
        "EvaluationPeriods": 1,
        "ExtendedStatistic": "p99",
        "MetricName": "Latency",
        "Namespace": "AWS/ApiGateway",
        "OKActions": [],
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
                      "myapi",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
                      "4XXError",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
                      "Latency",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/ApiGateway",
                      "Latency",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "p95",
                        "yAxis": "left"
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
                      "Count",
                      "ApiName",
                      "myapi",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
                        "stat": "Sum",
                        "yAxis": "left"
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
                      "WriteThrottleEvents",
                      "TableName",
                      "\${TableCD117FA1}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Errors",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Throttles",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Average",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "p95",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Duration",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "Invocations",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${ThrottlerHandler750A7C89}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${DriveStreamHandler62F1767B}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${DriveQueueHandler9F657A00}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Lambda",
                      "ConcurrentExecutions",
                      "FunctionName",
                      "\${DriveTableHandler119966B0}",
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
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/SQS",
                      "NumberOfMessagesDeleted",
                      "QueueName",
                      "\${DeadLetterQueue9F481546.QueueName}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
                        "stat": "Maximum",
                        "yAxis": "right"
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
                        "stat": "Maximum",
                        "yAxis": "left"
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
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/SNS",
                      "NumberOfNotificationsFailed",
                      "TopicName",
                      "\${MyTopic86869434.TopicName}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Events",
                      "ThrottledRules",
                      "RuleName",
                      "\${ruleF2C1DCDC}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/Events",
                      "Invocations",
                      "RuleName",
                      "\${ruleF2C1DCDC}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
      },
      "Type": "AWS::CloudWatch::Dashboard"
    },
    "slicWatchEventsFailedInvocationsAlarmRuleF2C1DCDC": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "EventBridge FailedInvocations for \${ruleF2C1DCDC} breaches 1",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Events_FailedInvocations_Alarm_\${ruleF2C1DCDC}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "RuleName",
            "Value": {
              "Ref": "ruleF2C1DCDC"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "FailedInvocations",
        "Namespace": "AWS/Events",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchEventsThrottledRulesAlarmRuleF2C1DCDC": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "EventBridge ThrottledRules for \${ruleF2C1DCDC} breaches 1",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Events_ThrottledRules_Alarm_\${ruleF2C1DCDC}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "RuleName",
            "Value": {
              "Ref": "ruleF2C1DCDC"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ThrottledRules",
        "Namespace": "AWS/Events",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmDriveQueueHandler9F657A00": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${DriveQueueHandler9F657A00} breaches 95% of timeout (3)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${DriveQueueHandler9F657A00}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveQueueHandler9F657A00"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmDriveStreamHandler62F1767B": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${DriveStreamHandler62F1767B} breaches 95% of timeout (3)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${DriveStreamHandler62F1767B}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveStreamHandler62F1767B"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmDriveTableHandler119966B0": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${DriveTableHandler119966B0} breaches 95% of timeout (3)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${DriveTableHandler119966B0}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveTableHandler119966B0"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmHelloHandler2E4FBA4D": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${HelloHandler2E4FBA4D} breaches 95% of timeout (3)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${HelloHandler2E4FBA4D}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloHandler2E4FBA4D"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmPingHandler50068074": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${PingHandler50068074} breaches 95% of timeout (3)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${PingHandler50068074}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "PingHandler50068074"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaDurationAlarmThrottlerHandler750A7C89": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${ThrottlerHandler750A7C89} breaches 95% of timeout (3)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${ThrottlerHandler750A7C89}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "ThrottlerHandler750A7C89"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmDriveQueueHandler9F657A00": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${DriveQueueHandler9F657A00} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${DriveQueueHandler9F657A00}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveQueueHandler9F657A00"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmDriveStreamHandler62F1767B": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${DriveStreamHandler62F1767B} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${DriveStreamHandler62F1767B}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveStreamHandler62F1767B"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmDriveTableHandler119966B0": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${DriveTableHandler119966B0} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${DriveTableHandler119966B0}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveTableHandler119966B0"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmHelloHandler2E4FBA4D": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${HelloHandler2E4FBA4D} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${HelloHandler2E4FBA4D}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloHandler2E4FBA4D"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmPingHandler50068074": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${PingHandler50068074} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${PingHandler50068074}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "PingHandler50068074"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmThrottlerHandler750A7C89": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${ThrottlerHandler750A7C89} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${ThrottlerHandler750A7C89}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "ThrottlerHandler750A7C89"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmDriveQueueHandler9F657A00": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${DriveQueueHandler9F657A00} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${DriveQueueHandler9F657A00}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveQueueHandler9F657A00"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmDriveStreamHandler62F1767B": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${DriveStreamHandler62F1767B} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${DriveStreamHandler62F1767B}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveStreamHandler62F1767B"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmDriveTableHandler119966B0": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${DriveTableHandler119966B0} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${DriveTableHandler119966B0}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DriveTableHandler119966B0"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmHelloHandler2E4FBA4D": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${HelloHandler2E4FBA4D} breaches 4",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${HelloHandler2E4FBA4D}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloHandler2E4FBA4D"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 4,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmPingHandler50068074": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${PingHandler50068074} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${PingHandler50068074}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "PingHandler50068074"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmThrottlerHandler750A7C89": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${ThrottlerHandler750A7C89} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${ThrottlerHandler750A7C89}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "ThrottlerHandler750A7C89"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmDriveQueueHandler9F657A00": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${DriveQueueHandler9F657A00} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${DriveQueueHandler9F657A00}",
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
        "OKActions": [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmDriveStreamHandler62F1767B": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${DriveStreamHandler62F1767B} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${DriveStreamHandler62F1767B}",
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
        "OKActions": [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmDriveTableHandler119966B0": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${DriveTableHandler119966B0} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${DriveTableHandler119966B0}",
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
        "OKActions": [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmHelloHandler2E4FBA4D": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${HelloHandler2E4FBA4D} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${HelloHandler2E4FBA4D}",
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
        "OKActions": [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmPingHandler50068074": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${PingHandler50068074} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${PingHandler50068074}",
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
        "OKActions": [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmThrottlerHandler750A7C89": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${ThrottlerHandler750A7C89} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${ThrottlerHandler750A7C89}",
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
        "OKActions": [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchSNSNumberOfNotificationsFailedAlarmMyTopic86869434": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "SNS NumberOfNotificationsFailed for \${MyTopic86869434.TopicName} breaches 1",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "SNS_NumberOfNotificationsFailed_Alarm_\${MyTopic86869434.TopicName}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
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
        "EvaluationPeriods": 1,
        "MetricName": "NumberOfNotificationsFailed",
        "Namespace": "AWS/SNS",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchSNSNumberOfNotificationsFilteredOutInvalidAttributesAlarmMyTopic86869434": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "SNS NumberOfNotificationsFilteredOutInvalidAttributes for \${MyTopic86869434.TopicName} breaches 1",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "SNS_NumberOfNotificationsFilteredOutInvalidAttributes_Alarm_\${MyTopic86869434.TopicName}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
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
        "EvaluationPeriods": 1,
        "MetricName": "NumberOfNotificationsFilteredOut-InvalidAttributes",
        "Namespace": "AWS/SNS",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchSQSInFlightMsgsAlarmDeadLetterQueue9F481546": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "SQS in-flight messages for \${DeadLetterQueue9F481546.QueueName} breaches 114000 (95% of the hard limit of 120000)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "SQS_ApproximateNumberOfMessagesNotVisible_\${DeadLetterQueue9F481546.QueueName}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
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
        "EvaluationPeriods": 1,
        "MetricName": "ApproximateNumberOfMessagesNotVisible",
        "Namespace": "AWS/SQS",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 114000,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchSQSOldestMsgAgeAlarmDeadLetterQueue9F481546": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "SQS age of oldest message in the queue \${DeadLetterQueue9F481546.QueueName} breaches 60",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "SQS_ApproximateAgeOfOldestMessage_\${DeadLetterQueue9F481546.QueueName}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
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
        "EvaluationPeriods": 1,
        "MetricName": "ApproximateAgeOfOldestMessage",
        "Namespace": "AWS/SQS",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 60,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchTableReadThrottleEventsAlarmTableCD117FA1": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${TableCD117FA1} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "DDB_ReadThrottleEvents_Alarm_\${TableCD117FA1}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "TableCD117FA1"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ReadThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchTableSystemErrorsAlarmTableCD117FA1": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${TableCD117FA1} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "DDB_SystemErrors_Alarm_\${TableCD117FA1}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "TableCD117FA1"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "SystemErrors",
        "Namespace": "AWS/DynamoDB",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchTableUserErrorsAlarmTableCD117FA1": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${TableCD117FA1} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "DDB_UserErrors_Alarm_\${TableCD117FA1}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "TableCD117FA1"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "UserErrors",
        "Namespace": "AWS/DynamoDB",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchTableWriteThrottleEventsAlarmTableCD117FA1": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          {
            "Ref": "MyTopic86869434"
          }
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${TableCD117FA1} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "DDB_WriteThrottleEvents_Alarm_\${TableCD117FA1}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "TableCD117FA1"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "WriteThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "TableCD117FA1": {
      "DeletionPolicy": "Retain",
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/Table/Resource"
      },
      "Properties": {
        "AttributeDefinitions": [
          {
            "AttributeName": "id",
            "AttributeType": "S"
          }
        ],
        "BillingMode": "PAY_PER_REQUEST",
        "KeySchema": [
          {
            "AttributeName": "id",
            "KeyType": "HASH"
          }
        ]
      },
      "Type": "AWS::DynamoDB::Table",
      "UpdateReplacePolicy": "Retain"
    },
    "ThrottlerHandler750A7C89": {
      "DependsOn": [
        "ThrottlerHandlerServiceRoleA0481DAF"
      ],
      "Metadata": {
        "aws:asset:is-bundled": false,
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:property": "Code",
        "aws:cdk:path": "CdkGeneralStackTest-US/ThrottlerHandler/Resource"
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-us-east-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Handler": "hello.handler",
        "ReservedConcurrentExecutions": 0,
        "Role": {
          "Fn::GetAtt": [
            "ThrottlerHandlerServiceRoleA0481DAF",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x"
      },
      "Type": "AWS::Lambda::Function"
    },
    "ThrottlerHandlerServiceRoleA0481DAF": {
      "Metadata": {
        "aws:cdk:path": "CdkGeneralStackTest-US/ThrottlerHandler/ServiceRole/Resource"
      },
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
      "Type": "AWS::IAM::Role"
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
  },
  "Transform": "SlicWatch-v3"
}
`

exports[`cdk-test-project/tests/snapshot/cdk-test-project-snapshot.test.ts > TAP > the Macro adds SLIC Watch dashboards and alarms to synthesized CDK project > stepFunctionStack > stepFunctionStack fragment 1`] = `
{
  "Metadata": {
    "slicWatch": {
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
      "enabled": true,
      "topicArn": {
        "Ref": "MyTopic86869434"
      }
    }
  },
  "Parameters": {
    "BootstrapVersion": {
      "Default": "/cdk-bootstrap/hnb659fds/version",
      "Description": "Version of the CDK Bootstrap resources in this environment, automatically retrieved from SSM Parameter Store. [cdk:skip]",
      "Type": "AWS::SSM::Parameter::Value<String>"
    }
  },
  "Resources": {
    "CDKMetadata": {
      "Metadata": {
        "aws:cdk:path": "CdkSFNStackTest-Europe/CDKMetadata/Default"
      },
      "Properties": {
        "Analytics": "v2:deflate64:H4sIAAAAAAAA/11OTWvCQBD9Ld4n01RBeq2CUGihJEKPYdyMOibZFWeilGX/e8lqofT0voZ5b44vSyxndNPCtV3Ryw5jbeQ6oJs2Ub1i3IazOFjvfSYJehp2LWHcjN6ZBD9FvzyB0ICxCj1PdsbP0Iv7nuSdJdBFQ6psiq8TgC5wNbqObUXKoMbn/eOfNkbaKb7nzjd/Dd2/A4xfJAYbkh7WxyCOoTYy/iB3FJ9X/NUpQcUaxotjyOW10UH8Ia99BAl8aBlP+nSdl/hcYjk7qUhxGb3JwFjd8QcjaneZPAEAAA=="
      },
      "Type": "AWS::CDK::Metadata"
    },
    "HelloHandler2E4FBA4D": {
      "DependsOn": [
        "HelloHandlerServiceRole11EF7C63"
      ],
      "Metadata": {
        "slicWatch": {
          "alarms": {
            "Invocations": {
              "Threshold": 4
            }
          }
        }
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-eu-west-1"
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip"
        },
        "Handler": "hello.handler",
        "Role": {
          "Fn::GetAtt": [
            "HelloHandlerServiceRole11EF7C63",
            "Arn"
          ]
        },
        "Runtime": "nodejs18.x"
      },
      "Type": "AWS::Lambda::Function"
    },
    "HelloHandlerServiceRole11EF7C63": {
      "Metadata": {
        "aws:cdk:path": "CdkSFNStackTest-Europe/HelloHandler/ServiceRole/Resource"
      },
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
      "Type": "AWS::IAM::Role"
    },
    "MyTopic86869434": {
      "Metadata": {
        "aws:cdk:path": "CdkSFNStackTest-Europe/MyTopic/Resource"
      },
      "Type": "AWS::SNS::Topic"
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
                      "\${StateMachine2E01A3A5}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/States",
                      "ExecutionThrottled",
                      "StateMachineArn",
                      "\${StateMachine2E01A3A5}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/States",
                      "ExecutionsTimedOut",
                      "StateMachineArn",
                      "\${StateMachine2E01A3A5}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/SNS",
                      "NumberOfNotificationsFailed",
                      "TopicName",
                      "\${MyTopic86869434.TopicName}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
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
      },
      "Type": "AWS::CloudWatch::Dashboard"
    },
    "slicWatchLambdaDurationAlarmHelloHandler2E4FBA4D": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "AlarmDescription": {
          "Fn::Sub": [
            "Max duration for \${HelloHandler2E4FBA4D} breaches 95% of timeout (3)",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Duration_\${HelloHandler2E4FBA4D}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloHandler2E4FBA4D"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaErrorsAlarmHelloHandler2E4FBA4D": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "AlarmDescription": {
          "Fn::Sub": [
            "Error count for \${HelloHandler2E4FBA4D} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Errors_\${HelloHandler2E4FBA4D}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloHandler2E4FBA4D"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaInvocationsAlarmHelloHandler2E4FBA4D": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "AlarmDescription": {
          "Fn::Sub": [
            "Total invocations for \${HelloHandler2E4FBA4D} breaches 4",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Invocations_\${HelloHandler2E4FBA4D}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "HelloHandler2E4FBA4D"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Namespace": "AWS/Lambda",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 4,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchLambdaThrottlesAlarmHelloHandler2E4FBA4D": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "AlarmDescription": {
          "Fn::Sub": [
            "Throttles % for \${HelloHandler2E4FBA4D} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "Lambda_Throttles_\${HelloHandler2E4FBA4D}",
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
        "OKActions": [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchSNSNumberOfNotificationsFailedAlarmMyTopic86869434": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "AlarmDescription": {
          "Fn::Sub": [
            "SNS NumberOfNotificationsFailed for \${MyTopic86869434.TopicName} breaches 1",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "SNS_NumberOfNotificationsFailed_Alarm_\${MyTopic86869434.TopicName}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
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
        "EvaluationPeriods": 1,
        "MetricName": "NumberOfNotificationsFailed",
        "Namespace": "AWS/SNS",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchSNSNumberOfNotificationsFilteredOutInvalidAttributesAlarmMyTopic86869434": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "AlarmDescription": {
          "Fn::Sub": [
            "SNS NumberOfNotificationsFilteredOutInvalidAttributes for \${MyTopic86869434.TopicName} breaches 1",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "SNS_NumberOfNotificationsFilteredOutInvalidAttributes_Alarm_\${MyTopic86869434.TopicName}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
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
        "EvaluationPeriods": 1,
        "MetricName": "NumberOfNotificationsFilteredOut-InvalidAttributes",
        "Namespace": "AWS/SNS",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchStatesExecutionsFailedAlarmStateMachine2E01A3A5": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionsFailed Sum for \${StateMachine2E01A3A5.Name}  breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionsFailedAlarm_\${StateMachine2E01A3A5.Name}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "StateMachine2E01A3A5"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ExecutionsFailed",
        "Namespace": "AWS/States",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchStatesExecutionsTimedOutAlarmStateMachine2E01A3A5": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionsTimedOut Sum for \${StateMachine2E01A3A5.Name}  breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionsTimedOutAlarm_\${StateMachine2E01A3A5.Name}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "StateMachine2E01A3A5"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ExecutionsTimedOut",
        "Namespace": "AWS/States",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchStatesExecutionThrottledAlarmStateMachine2E01A3A5": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [],
        "AlarmDescription": {
          "Fn::Sub": [
            "StepFunctions ExecutionThrottled Sum for \${StateMachine2E01A3A5.Name}  breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "StepFunctions_ExecutionThrottledAlarm_\${StateMachine2E01A3A5.Name}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "StateMachineArn",
            "Value": {
              "Ref": "StateMachine2E01A3A5"
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ExecutionThrottled",
        "Namespace": "AWS/States",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "StateMachine2E01A3A5": {
      "DeletionPolicy": "Delete",
      "DependsOn": [
        "StateMachineRoleDefaultPolicyDF1E6607",
        "StateMachineRoleB840431D"
      ],
      "Metadata": {
        "aws:cdk:path": "CdkSFNStackTest-Europe/StateMachine/Resource"
      },
      "Properties": {
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
        },
        "RoleArn": {
          "Fn::GetAtt": [
            "StateMachineRoleB840431D",
            "Arn"
          ]
        }
      },
      "Type": "AWS::StepFunctions::StateMachine",
      "UpdateReplacePolicy": "Delete"
    },
    "StateMachineRoleB840431D": {
      "Metadata": {
        "aws:cdk:path": "CdkSFNStackTest-Europe/StateMachine/Role/Resource"
      },
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
      "Type": "AWS::IAM::Role"
    },
    "StateMachineRoleDefaultPolicyDF1E6607": {
      "Metadata": {
        "aws:cdk:path": "CdkSFNStackTest-Europe/StateMachine/Role/DefaultPolicy/Resource"
      },
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
      "Type": "AWS::IAM::Policy"
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
  },
  "Transform": "SlicWatch-v3"
}
`

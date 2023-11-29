/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`cdk-test-project/tests/snapshot/cdk-test-project-snapshot.test.ts > TAP > cdk-test-project snapshot > ecsStack fragment 1`] = `
Object {
  "Metadata": Object {
    "slicWatch": Object {
      "alarms": Object {
        "Lambda": Object {
          "Invocations": Object {
            "enabled": true,
            "Threshold": 10,
          },
        },
        "SQS": Object {
          "AgeOfOldestMessage": Object {
            "enabled": true,
            "Statistic": "Maximum",
            "Threshold": 60,
          },
          "InFlightMessagesPc": Object {
            "Statistic": "Maximum",
            "Threshold": 1,
          },
        },
      },
      "enabled": true,
    },
  },
  "Outputs": Object {
    "MyWebServerLoadBalancerDNSD1AFCC81": Object {
      "Value": Object {
        "Fn::GetAtt": Array [
          "MyWebServerLB3B5FD3AB",
          "DNSName",
        ],
      },
    },
    "MyWebServerServiceURLB0ED50F6": Object {
      "Value": Object {
        "Fn::Join": Array [
          "",
          Array [
            "http://",
            Object {
              "Fn::GetAtt": Array [
                "MyWebServerLB3B5FD3AB",
                "DNSName",
              ],
            },
          ],
        ],
      },
    },
  },
  "Parameters": Object {
    "BootstrapVersion": Object {
      "Default": "/cdk-bootstrap/hnb659fds/version",
      "Description": "Version of the CDK Bootstrap resources in this environment, automatically retrieved from SSM Parameter Store. [cdk:skip]",
      "Type": "AWS::SSM::Parameter::Value<String>",
    },
  },
  "Resources": Object {
    "CDKMetadata": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/CDKMetadata/Default",
      },
      "Properties": Object {
        "Analytics": "v2:deflate64:H4sIAAAAAAAA/31Ry27CMBD8Fu7GbTlUXCmlCAm1UYK4IsfZpgvBjux1EIry73WepLSqFGlnx+PsembG58/8cSIudiqT0zTDmJcRCXlinjqUIO0hF0RglOWLPM9QCkKttlokLyITSkLyJkwqCCIwBUpgkAlLKDOviBsFqrSY8fLv24YtP3/2Yx1aAtVpejw63/nJQGujXV5LRm3FQPqZEUhnkK6D5H9ilRqw9he9US2/z2V9tg+WLHCxXyJysQJq9AMKtSPYiTiDG3/jFtZqic3yg7gGq01Ql3dBa2/lRVxZYLCoXR1+vFF1CjAI2k26bkE+s68zKKpfbnnZhbIT9vQKn6iwH3nPaEUCva8j7i7Qxo4OZs6n0OTRwYqhOPMy1O17mxpo702zYIsqlunU77TV6eB7j6uq7j4c5Y5YCFY7047sccWUToAf7UPxNOf+m02OFnFqnCI8Aw/b+g3+NWTOyAIAAA==",
      },
      "Type": "AWS::CDK::Metadata",
    },
    "EcsDefaultClusterMnL3mNNYN926A5246": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Resource",
      },
      "Type": "AWS::ECS::Cluster",
    },
    "EcsDefaultClusterMnL3mNNYNVpc7788A521": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/Resource",
      },
      "Properties": Object {
        "CidrBlock": "10.0.0.0/16",
        "EnableDnsHostnames": true,
        "EnableDnsSupport": true,
        "InstanceTenancy": "default",
        "Tags": Array [
          Object {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc",
          },
        ],
      },
      "Type": "AWS::EC2::VPC",
    },
    "EcsDefaultClusterMnL3mNNYNVpcIGW9C2C2B8F": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/IGW",
      },
      "Properties": Object {
        "Tags": Array [
          Object {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc",
          },
        ],
      },
      "Type": "AWS::EC2::InternetGateway",
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1DefaultRouteA5ADF694": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet1/DefaultRoute",
      },
      "Properties": Object {
        "DestinationCidrBlock": "0.0.0.0/0",
        "NatGatewayId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1NATGateway5E3732C1",
        },
        "RouteTableId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1RouteTable4F1D2E36",
        },
      },
      "Type": "AWS::EC2::Route",
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1RouteTable4F1D2E36": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet1/RouteTable",
      },
      "Properties": Object {
        "Tags": Array [
          Object {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet1",
          },
        ],
        "VpcId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521",
        },
      },
      "Type": "AWS::EC2::RouteTable",
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1RouteTableAssociation34B92275": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet1/RouteTableAssociation",
      },
      "Properties": Object {
        "RouteTableId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1RouteTable4F1D2E36",
        },
        "SubnetId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1Subnet075EFF4C",
        },
      },
      "Type": "AWS::EC2::SubnetRouteTableAssociation",
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1Subnet075EFF4C": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet1/Subnet",
      },
      "Properties": Object {
        "AvailabilityZone": Object {
          "Fn::Select": Array [
            0,
            Object {
              "Fn::GetAZs": "",
            },
          ],
        },
        "CidrBlock": "10.0.128.0/18",
        "MapPublicIpOnLaunch": false,
        "Tags": Array [
          Object {
            "Key": "aws-cdk:subnet-name",
            "Value": "Private",
          },
          Object {
            "Key": "aws-cdk:subnet-type",
            "Value": "Private",
          },
          Object {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet1",
          },
        ],
        "VpcId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521",
        },
      },
      "Type": "AWS::EC2::Subnet",
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2DefaultRoute20CE2D89": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet2/DefaultRoute",
      },
      "Properties": Object {
        "DestinationCidrBlock": "0.0.0.0/0",
        "NatGatewayId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2NATGateway4C855E00",
        },
        "RouteTableId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2RouteTableDCE46591",
        },
      },
      "Type": "AWS::EC2::Route",
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2RouteTableAssociation111C622F": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet2/RouteTableAssociation",
      },
      "Properties": Object {
        "RouteTableId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2RouteTableDCE46591",
        },
        "SubnetId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2SubnetE4CEDF73",
        },
      },
      "Type": "AWS::EC2::SubnetRouteTableAssociation",
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2RouteTableDCE46591": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet2/RouteTable",
      },
      "Properties": Object {
        "Tags": Array [
          Object {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet2",
          },
        ],
        "VpcId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521",
        },
      },
      "Type": "AWS::EC2::RouteTable",
    },
    "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2SubnetE4CEDF73": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet2/Subnet",
      },
      "Properties": Object {
        "AvailabilityZone": Object {
          "Fn::Select": Array [
            1,
            Object {
              "Fn::GetAZs": "",
            },
          ],
        },
        "CidrBlock": "10.0.192.0/18",
        "MapPublicIpOnLaunch": false,
        "Tags": Array [
          Object {
            "Key": "aws-cdk:subnet-name",
            "Value": "Private",
          },
          Object {
            "Key": "aws-cdk:subnet-type",
            "Value": "Private",
          },
          Object {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PrivateSubnet2",
          },
        ],
        "VpcId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521",
        },
      },
      "Type": "AWS::EC2::Subnet",
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1DefaultRouteFF4E2178": Object {
      "DependsOn": Array [
        "EcsDefaultClusterMnL3mNNYNVpcVPCGW2447264E",
      ],
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1/DefaultRoute",
      },
      "Properties": Object {
        "DestinationCidrBlock": "0.0.0.0/0",
        "GatewayId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcIGW9C2C2B8F",
        },
        "RouteTableId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1RouteTableA1FD6ACC",
        },
      },
      "Type": "AWS::EC2::Route",
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1EIP8704DB2F": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1/EIP",
      },
      "Properties": Object {
        "Domain": "vpc",
        "Tags": Array [
          Object {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1",
          },
        ],
      },
      "Type": "AWS::EC2::EIP",
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1NATGateway5E3732C1": Object {
      "DependsOn": Array [
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1DefaultRouteFF4E2178",
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1RouteTableAssociation8B583A17",
      ],
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1/NATGateway",
      },
      "Properties": Object {
        "AllocationId": Object {
          "Fn::GetAtt": Array [
            "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1EIP8704DB2F",
            "AllocationId",
          ],
        },
        "SubnetId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1Subnet3C273B99",
        },
        "Tags": Array [
          Object {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1",
          },
        ],
      },
      "Type": "AWS::EC2::NatGateway",
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1RouteTableA1FD6ACC": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1/RouteTable",
      },
      "Properties": Object {
        "Tags": Array [
          Object {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1",
          },
        ],
        "VpcId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521",
        },
      },
      "Type": "AWS::EC2::RouteTable",
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1RouteTableAssociation8B583A17": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1/RouteTableAssociation",
      },
      "Properties": Object {
        "RouteTableId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1RouteTableA1FD6ACC",
        },
        "SubnetId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1Subnet3C273B99",
        },
      },
      "Type": "AWS::EC2::SubnetRouteTableAssociation",
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1Subnet3C273B99": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1/Subnet",
      },
      "Properties": Object {
        "AvailabilityZone": Object {
          "Fn::Select": Array [
            0,
            Object {
              "Fn::GetAZs": "",
            },
          ],
        },
        "CidrBlock": "10.0.0.0/18",
        "MapPublicIpOnLaunch": true,
        "Tags": Array [
          Object {
            "Key": "aws-cdk:subnet-name",
            "Value": "Public",
          },
          Object {
            "Key": "aws-cdk:subnet-type",
            "Value": "Public",
          },
          Object {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet1",
          },
        ],
        "VpcId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521",
        },
      },
      "Type": "AWS::EC2::Subnet",
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2DefaultRouteB1375520": Object {
      "DependsOn": Array [
        "EcsDefaultClusterMnL3mNNYNVpcVPCGW2447264E",
      ],
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2/DefaultRoute",
      },
      "Properties": Object {
        "DestinationCidrBlock": "0.0.0.0/0",
        "GatewayId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcIGW9C2C2B8F",
        },
        "RouteTableId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2RouteTable263DEAA5",
        },
      },
      "Type": "AWS::EC2::Route",
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2EIPF0764873": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2/EIP",
      },
      "Properties": Object {
        "Domain": "vpc",
        "Tags": Array [
          Object {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2",
          },
        ],
      },
      "Type": "AWS::EC2::EIP",
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2NATGateway4C855E00": Object {
      "DependsOn": Array [
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2DefaultRouteB1375520",
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2RouteTableAssociation43E5803C",
      ],
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2/NATGateway",
      },
      "Properties": Object {
        "AllocationId": Object {
          "Fn::GetAtt": Array [
            "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2EIPF0764873",
            "AllocationId",
          ],
        },
        "SubnetId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2Subnet95FF715A",
        },
        "Tags": Array [
          Object {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2",
          },
        ],
      },
      "Type": "AWS::EC2::NatGateway",
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2RouteTable263DEAA5": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2/RouteTable",
      },
      "Properties": Object {
        "Tags": Array [
          Object {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2",
          },
        ],
        "VpcId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521",
        },
      },
      "Type": "AWS::EC2::RouteTable",
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2RouteTableAssociation43E5803C": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2/RouteTableAssociation",
      },
      "Properties": Object {
        "RouteTableId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2RouteTable263DEAA5",
        },
        "SubnetId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2Subnet95FF715A",
        },
      },
      "Type": "AWS::EC2::SubnetRouteTableAssociation",
    },
    "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2Subnet95FF715A": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2/Subnet",
      },
      "Properties": Object {
        "AvailabilityZone": Object {
          "Fn::Select": Array [
            1,
            Object {
              "Fn::GetAZs": "",
            },
          ],
        },
        "CidrBlock": "10.0.64.0/18",
        "MapPublicIpOnLaunch": true,
        "Tags": Array [
          Object {
            "Key": "aws-cdk:subnet-name",
            "Value": "Public",
          },
          Object {
            "Key": "aws-cdk:subnet-type",
            "Value": "Public",
          },
          Object {
            "Key": "Name",
            "Value": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/PublicSubnet2",
          },
        ],
        "VpcId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521",
        },
      },
      "Type": "AWS::EC2::Subnet",
    },
    "EcsDefaultClusterMnL3mNNYNVpcVPCGW2447264E": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/EcsDefaultClusterMnL3mNNYN/Vpc/VPCGW",
      },
      "Properties": Object {
        "InternetGatewayId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpcIGW9C2C2B8F",
        },
        "VpcId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521",
        },
      },
      "Type": "AWS::EC2::VPCGatewayAttachment",
    },
    "MyWebServerLB3B5FD3AB": Object {
      "DependsOn": Array [
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1DefaultRouteFF4E2178",
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1RouteTableAssociation8B583A17",
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2DefaultRouteB1375520",
        "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2RouteTableAssociation43E5803C",
      ],
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/LB/Resource",
      },
      "Properties": Object {
        "LoadBalancerAttributes": Array [
          Object {
            "Key": "deletion_protection.enabled",
            "Value": "false",
          },
        ],
        "Scheme": "internet-facing",
        "SecurityGroups": Array [
          Object {
            "Fn::GetAtt": Array [
              "MyWebServerLBSecurityGroup01B285AA",
              "GroupId",
            ],
          },
        ],
        "Subnets": Array [
          Object {
            "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet1Subnet3C273B99",
          },
          Object {
            "Ref": "EcsDefaultClusterMnL3mNNYNVpcPublicSubnet2Subnet95FF715A",
          },
        ],
        "Type": "application",
      },
      "Type": "AWS::ElasticLoadBalancingV2::LoadBalancer",
    },
    "MyWebServerLBPublicListener03D7C493": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/LB/PublicListener/Resource",
      },
      "Properties": Object {
        "DefaultActions": Array [
          Object {
            "TargetGroupArn": Object {
              "Ref": "MyWebServerLBPublicListenerECSGroup5AB9F1C3",
            },
            "Type": "forward",
          },
        ],
        "LoadBalancerArn": Object {
          "Ref": "MyWebServerLB3B5FD3AB",
        },
        "Port": 80,
        "Protocol": "HTTP",
      },
      "Type": "AWS::ElasticLoadBalancingV2::Listener",
    },
    "MyWebServerLBPublicListenerECSGroup5AB9F1C3": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/LB/PublicListener/ECSGroup/Resource",
      },
      "Properties": Object {
        "Port": 80,
        "Protocol": "HTTP",
        "TargetGroupAttributes": Array [
          Object {
            "Key": "stickiness.enabled",
            "Value": "false",
          },
        ],
        "TargetType": "ip",
        "VpcId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521",
        },
      },
      "Type": "AWS::ElasticLoadBalancingV2::TargetGroup",
    },
    "MyWebServerLBSecurityGroup01B285AA": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/LB/SecurityGroup/Resource",
      },
      "Properties": Object {
        "GroupDescription": "Automatically created Security Group for ELB CdkECSStackTestEuropeMyWebServerLBE298D4B6",
        "SecurityGroupIngress": Array [
          Object {
            "CidrIp": "0.0.0.0/0",
            "Description": "Allow from anyone on port 80",
            "FromPort": 80,
            "IpProtocol": "tcp",
            "ToPort": 80,
          },
        ],
        "VpcId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521",
        },
      },
      "Type": "AWS::EC2::SecurityGroup",
    },
    "MyWebServerLBSecurityGrouptoCdkECSStackTestEuropeMyWebServerServiceSecurityGroup792A2ECD807CF0A9FB": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/LB/SecurityGroup/to CdkECSStackTestEuropeMyWebServerServiceSecurityGroup792A2ECD:80",
      },
      "Properties": Object {
        "Description": "Load balancer to target",
        "DestinationSecurityGroupId": Object {
          "Fn::GetAtt": Array [
            "MyWebServerServiceSecurityGroup6788214A",
            "GroupId",
          ],
        },
        "FromPort": 80,
        "GroupId": Object {
          "Fn::GetAtt": Array [
            "MyWebServerLBSecurityGroup01B285AA",
            "GroupId",
          ],
        },
        "IpProtocol": "tcp",
        "ToPort": 80,
      },
      "Type": "AWS::EC2::SecurityGroupEgress",
    },
    "MyWebServerService2FE7341D": Object {
      "DependsOn": Array [
        "MyWebServerLBPublicListenerECSGroup5AB9F1C3",
        "MyWebServerLBPublicListener03D7C493",
        "MyWebServerTaskDefTaskRoleB23C17AA",
      ],
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/Service/Service",
      },
      "Properties": Object {
        "Cluster": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYN926A5246",
        },
        "DeploymentConfiguration": Object {
          "MaximumPercent": 200,
          "MinimumHealthyPercent": 50,
        },
        "EnableECSManagedTags": false,
        "HealthCheckGracePeriodSeconds": 60,
        "LaunchType": "FARGATE",
        "LoadBalancers": Array [
          Object {
            "ContainerName": "web",
            "ContainerPort": 80,
            "TargetGroupArn": Object {
              "Ref": "MyWebServerLBPublicListenerECSGroup5AB9F1C3",
            },
          },
        ],
        "NetworkConfiguration": Object {
          "AwsvpcConfiguration": Object {
            "AssignPublicIp": "DISABLED",
            "SecurityGroups": Array [
              Object {
                "Fn::GetAtt": Array [
                  "MyWebServerServiceSecurityGroup6788214A",
                  "GroupId",
                ],
              },
            ],
            "Subnets": Array [
              Object {
                "Ref": "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet1Subnet075EFF4C",
              },
              Object {
                "Ref": "EcsDefaultClusterMnL3mNNYNVpcPrivateSubnet2SubnetE4CEDF73",
              },
            ],
          },
        },
        "TaskDefinition": Object {
          "Ref": "MyWebServerTaskDef4CE825A0",
        },
      },
      "Type": "AWS::ECS::Service",
    },
    "MyWebServerServiceSecurityGroup6788214A": Object {
      "DependsOn": Array [
        "MyWebServerTaskDefTaskRoleB23C17AA",
      ],
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/Service/SecurityGroup/Resource",
      },
      "Properties": Object {
        "GroupDescription": "CdkECSStackTest-Europe/MyWebServer/Service/SecurityGroup",
        "SecurityGroupEgress": Array [
          Object {
            "CidrIp": "0.0.0.0/0",
            "Description": "Allow all outbound traffic by default",
            "IpProtocol": "-1",
          },
        ],
        "VpcId": Object {
          "Ref": "EcsDefaultClusterMnL3mNNYNVpc7788A521",
        },
      },
      "Type": "AWS::EC2::SecurityGroup",
    },
    "MyWebServerServiceSecurityGroupfromCdkECSStackTestEuropeMyWebServerLBSecurityGroup8823910380E44CF71E": Object {
      "DependsOn": Array [
        "MyWebServerTaskDefTaskRoleB23C17AA",
      ],
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/Service/SecurityGroup/from CdkECSStackTestEuropeMyWebServerLBSecurityGroup88239103:80",
      },
      "Properties": Object {
        "Description": "Load balancer to target",
        "FromPort": 80,
        "GroupId": Object {
          "Fn::GetAtt": Array [
            "MyWebServerServiceSecurityGroup6788214A",
            "GroupId",
          ],
        },
        "IpProtocol": "tcp",
        "SourceSecurityGroupId": Object {
          "Fn::GetAtt": Array [
            "MyWebServerLBSecurityGroup01B285AA",
            "GroupId",
          ],
        },
        "ToPort": 80,
      },
      "Type": "AWS::EC2::SecurityGroupIngress",
    },
    "MyWebServerTaskDef4CE825A0": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/TaskDef/Resource",
      },
      "Properties": Object {
        "ContainerDefinitions": Array [
          Object {
            "Essential": true,
            "Image": "amazon/amazon-ecs-sample",
            "LogConfiguration": Object {
              "LogDriver": "awslogs",
              "Options": Object {
                "awslogs-group": Object {
                  "Ref": "MyWebServerTaskDefwebLogGroupC6EE23D4",
                },
                "awslogs-region": "eu-west-1",
                "awslogs-stream-prefix": "MyWebServer",
              },
            },
            "Name": "web",
            "PortMappings": Array [
              Object {
                "ContainerPort": 80,
                "Protocol": "tcp",
              },
            ],
          },
        ],
        "Cpu": "256",
        "ExecutionRoleArn": Object {
          "Fn::GetAtt": Array [
            "MyWebServerTaskDefExecutionRole3C69E361",
            "Arn",
          ],
        },
        "Family": "CdkECSStackTestEuropeMyWebServerTaskDef979012A1",
        "Memory": "512",
        "NetworkMode": "awsvpc",
        "RequiresCompatibilities": Array [
          "FARGATE",
        ],
        "TaskRoleArn": Object {
          "Fn::GetAtt": Array [
            "MyWebServerTaskDefTaskRoleB23C17AA",
            "Arn",
          ],
        },
      },
      "Type": "AWS::ECS::TaskDefinition",
    },
    "MyWebServerTaskDefExecutionRole3C69E361": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/TaskDef/ExecutionRole/Resource",
      },
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": Object {
                "Service": "ecs-tasks.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
      },
      "Type": "AWS::IAM::Role",
    },
    "MyWebServerTaskDefExecutionRoleDefaultPolicy2AEB4329": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/TaskDef/ExecutionRole/DefaultPolicy/Resource",
      },
      "Properties": Object {
        "PolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": Array [
                "logs:CreateLogStream",
                "logs:PutLogEvents",
              ],
              "Effect": "Allow",
              "Resource": Object {
                "Fn::GetAtt": Array [
                  "MyWebServerTaskDefwebLogGroupC6EE23D4",
                  "Arn",
                ],
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "PolicyName": "MyWebServerTaskDefExecutionRoleDefaultPolicy2AEB4329",
        "Roles": Array [
          Object {
            "Ref": "MyWebServerTaskDefExecutionRole3C69E361",
          },
        ],
      },
      "Type": "AWS::IAM::Policy",
    },
    "MyWebServerTaskDefTaskRoleB23C17AA": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/TaskDef/TaskRole/Resource",
      },
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": Object {
                "Service": "ecs-tasks.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
      },
      "Type": "AWS::IAM::Role",
    },
    "MyWebServerTaskDefwebLogGroupC6EE23D4": Object {
      "DeletionPolicy": "Retain",
      "Metadata": Object {
        "aws:cdk:path": "CdkECSStackTest-Europe/MyWebServer/TaskDef/web/LogGroup/Resource",
      },
      "Type": "AWS::Logs::LogGroup",
      "UpdateReplacePolicy": "Retain",
    },
    "slicWatchDashboard": Object {
      "Properties": Object {
        "DashboardBody": Object {
          "Fn::Sub": "{\\"start\\":\\"-PT3H\\",\\"widgets\\":[{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/ECS\\",\\"MemoryUtilization\\",\\"ServiceName\\",\\"\${MyWebServerService2FE7341D.Name}\\",\\"ClusterName\\",\\"\${EcsDefaultClusterMnL3mNNYN926A5246}\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/ECS\\",\\"CPUUtilization\\",\\"ServiceName\\",\\"\${MyWebServerService2FE7341D.Name}\\",\\"ClusterName\\",\\"\${EcsDefaultClusterMnL3mNNYN926A5246}\\",{\\"stat\\":\\"Average\\"}]],\\"title\\":\\"ECS Service \${MyWebServerService2FE7341D.Name}\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":0},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/ApplicationELB\\",\\"HTTPCode_ELB_5XX_Count\\",\\"LoadBalancer\\",\\"\${MyWebServerLB3B5FD3AB.LoadBalancerFullName}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/ApplicationELB\\",\\"RejectedConnectionCount\\",\\"LoadBalancer\\",\\"\${MyWebServerLB3B5FD3AB.LoadBalancerFullName}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"ALB \${MyWebServerLB3B5FD3AB.LoadBalancerName}\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":0},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/ApplicationELB\\",\\"HTTPCode_Target_5XX_Count\\",\\"LoadBalancer\\",\\"\${MyWebServerLB3B5FD3AB.LoadBalancerFullName}\\",\\"TargetGroup\\",\\"\${MyWebServerLBPublicListenerECSGroup5AB9F1C3.TargetGroupFullName}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/ApplicationELB\\",\\"UnHealthyHostCount\\",\\"LoadBalancer\\",\\"\${MyWebServerLB3B5FD3AB.LoadBalancerFullName}\\",\\"TargetGroup\\",\\"\${MyWebServerLBPublicListenerECSGroup5AB9F1C3.TargetGroupFullName}\\",{\\"stat\\":\\"Average\\"}]],\\"title\\":\\"Target Group \${MyWebServerLB3B5FD3AB.LoadBalancerName}/\${MyWebServerLBPublicListenerECSGroup5AB9F1C3.TargetGroupName}\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":0}]}",
        },
        "DashboardName": Object {
          "Fn::Sub": "\${AWS::StackName}-\${AWS::Region}-Dashboard",
        },
      },
      "Type": "AWS::CloudWatch::Dashboard",
    },
    "slicWatchECSCPUAlarmMyWebServerService2FE7341D": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "ECS CPUUtilization for \${MyWebServerService2FE7341D.Name} breaches 90",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "ECS_CPUAlarm_\${MyWebServerService2FE7341D.Name}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "ServiceName",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "MyWebServerService2FE7341D",
                "Name",
              ],
            },
          },
          Object {
            "Name": "ClusterName",
            "Value": Object {
              "Ref": "EcsDefaultClusterMnL3mNNYN926A5246",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "CPUUtilization",
        "Namespace": "AWS/ECS",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 90,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchECSMemoryAlarmMyWebServerService2FE7341D": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "ECS MemoryUtilization for \${MyWebServerService2FE7341D.Name} breaches 90",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "ECS_MemoryAlarm_\${MyWebServerService2FE7341D.Name}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "ServiceName",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "MyWebServerService2FE7341D",
                "Name",
              ],
            },
          },
          Object {
            "Name": "ClusterName",
            "Value": Object {
              "Ref": "EcsDefaultClusterMnL3mNNYN926A5246",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "MemoryUtilization",
        "Namespace": "AWS/ECS",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 90,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLoadBalancerHTTPCodeELB5XXCountAlarmMyWebServerLB3B5FD3AB": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [],
        "AlarmDescription": "LoadBalancer HTTPCodeELB5XXCount Sum for MyWebServerLB3B5FD3AB  breaches 0",
        "AlarmName": "LoadBalancer_HTTPCodeELB5XXCountAlarm_MyWebServerLB3B5FD3AB",
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "LoadBalancer",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "MyWebServerLB3B5FD3AB",
                "LoadBalancerFullName",
              ],
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "HTTPCode_ELB_5XX_Count",
        "Namespace": "AWS/ApplicationELB",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLoadBalancerHTTPCodeTarget5XXCountAlarmMyWebServerLBPublicListenerECSGroup5AB9F1C3": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [],
        "AlarmDescription": "LoadBalancer HTTPCode_Target_5XX_Count Sum for MyWebServerLBPublicListenerECSGroup5AB9F1C3 breaches 0",
        "AlarmName": "LoadBalancer_HTTPCodeTarget5XXCountAlarm_MyWebServerLBPublicListenerECSGroup5AB9F1C3",
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TargetGroup",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "MyWebServerLBPublicListenerECSGroup5AB9F1C3",
                "TargetGroupFullName",
              ],
            },
          },
          Object {
            "Name": "LoadBalancer",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "MyWebServerLB3B5FD3AB",
                "LoadBalancerFullName",
              ],
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "HTTPCode_Target_5XX_Count",
        "Namespace": "AWS/ApplicationELB",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLoadBalancerRejectedConnectionCountAlarmMyWebServerLB3B5FD3AB": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [],
        "AlarmDescription": "LoadBalancer RejectedConnectionCount Sum for MyWebServerLB3B5FD3AB  breaches 0",
        "AlarmName": "LoadBalancer_RejectedConnectionCountAlarm_MyWebServerLB3B5FD3AB",
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "LoadBalancer",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "MyWebServerLB3B5FD3AB",
                "LoadBalancerFullName",
              ],
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "RejectedConnectionCount",
        "Namespace": "AWS/ApplicationELB",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLoadBalancerUnHealthyHostCountAlarmMyWebServerLBPublicListenerECSGroup5AB9F1C3": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [],
        "AlarmDescription": "LoadBalancer UnHealthyHostCount Average for MyWebServerLBPublicListenerECSGroup5AB9F1C3 breaches 0",
        "AlarmName": "LoadBalancer_UnHealthyHostCountAlarm_MyWebServerLBPublicListenerECSGroup5AB9F1C3",
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TargetGroup",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "MyWebServerLBPublicListenerECSGroup5AB9F1C3",
                "TargetGroupFullName",
              ],
            },
          },
          Object {
            "Name": "LoadBalancer",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "MyWebServerLB3B5FD3AB",
                "LoadBalancerFullName",
              ],
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "UnHealthyHostCount",
        "Namespace": "AWS/ApplicationELB",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
  },
  "Rules": Object {
    "CheckBootstrapVersion": Object {
      "Assertions": Array [
        Object {
          "Assert": Object {
            "Fn::Not": Array [
              Object {
                "Fn::Contains": Array [
                  Array [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                  ],
                  Object {
                    "Ref": "BootstrapVersion",
                  },
                ],
              },
            ],
          },
          "AssertDescription": "CDK bootstrap stack version 6 required. Please run 'cdk bootstrap' with a recent version of the CDK CLI.",
        },
      ],
    },
  },
  "Transform": "SlicWatch-v3",
}
`

exports[`cdk-test-project/tests/snapshot/cdk-test-project-snapshot.test.ts > TAP > cdk-test-project snapshot > generalEuStack fragment 1`] = `
Object {
  "Metadata": Object {
    "slicWatch": Object {
      "alarmActionsConfig": Object {
        "alarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
      },
      "alarms": Object {
        "Lambda": Object {
          "Invocations": Object {
            "enabled": true,
            "Threshold": 10,
          },
        },
        "SQS": Object {
          "AgeOfOldestMessage": Object {
            "enabled": true,
            "Statistic": "Maximum",
            "Threshold": 60,
          },
          "InFlightMessagesPc": Object {
            "Statistic": "Maximum",
            "Threshold": 1,
          },
        },
      },
      "enabled": true,
      "topicArn": "arn:aws:xxxxxx:mytopic",
    },
  },
  "Outputs": Object {
    "myapiEndpoint8EB17201": Object {
      "Value": Object {
        "Fn::Join": Array [
          "",
          Array [
            "https://",
            Object {
              "Ref": "myapi162F20B8",
            },
            ".execute-api.eu-west-1.",
            Object {
              "Ref": "AWS::URLSuffix",
            },
            "/",
            Object {
              "Ref": "myapiDeploymentStageprod329F21FF",
            },
            "/",
          ],
        ],
      },
    },
  },
  "Parameters": Object {
    "BootstrapVersion": Object {
      "Default": "/cdk-bootstrap/hnb659fds/version",
      "Description": "Version of the CDK Bootstrap resources in this environment, automatically retrieved from SSM Parameter Store. [cdk:skip]",
      "Type": "AWS::SSM::Parameter::Value<String>",
    },
  },
  "Resources": Object {
    "CDKMetadata": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/CDKMetadata/Default",
      },
      "Properties": Object {
        "Analytics": "v2:deflate64:H4sIAAAAAAAA/02Q30/DIBDH/5a9M9SZmL12Gp801rr3hdKzshaoPdhsGv53D5izCeE+9z24Xxu+feC3K3HGtWy6da9qPn84ITtG0mFGg3ze20FJ9vhpEgTWC103gs/P3kinrImhJZcwaoVIXmBKaD5XtocYiDYwvD8IRHDIi2jI5zsvO3A7gcDEoFrh4CwmPr+kQhWgKwaVEvxjIaX1xrEnGHo7aSAkdeHRFG2qmoG+Wj9KSEXK0f5Mf8olceZXcF+2iVKmwJrJCG0b2ste1HmOBIHBierQfip/Gc+n8b5Jevfgk5Yh3aXtlZyuYnZDuHbG0jpit8q08dmbd4N3y/YCM7YBfsSb092W09msjqjUeqRNKA28yvYXs0P/r9UBAAA=",
      },
      "Type": "AWS::CDK::Metadata",
    },
    "DeadLetterQueue9F481546": Object {
      "DeletionPolicy": "Delete",
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DeadLetterQueue/Resource",
      },
      "Type": "AWS::SQS::Queue",
      "UpdateReplacePolicy": "Delete",
    },
    "DeadLetterQueuePolicyB1FB890C": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DeadLetterQueue/Policy/Resource",
      },
      "Properties": Object {
        "PolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": "sqs:SendMessage",
              "Condition": Object {
                "ArnEquals": Object {
                  "aws:SourceArn": Object {
                    "Fn::GetAtt": Array [
                      "ruleF2C1DCDC",
                      "Arn",
                    ],
                  },
                },
              },
              "Effect": "Allow",
              "Principal": Object {
                "Service": "events.amazonaws.com",
              },
              "Resource": Object {
                "Fn::GetAtt": Array [
                  "DeadLetterQueue9F481546",
                  "Arn",
                ],
              },
              "Sid": "AllowEventRuleCdkGeneralStackTestEuroperule6219EF60",
            },
          ],
          "Version": "2012-10-17",
        },
        "Queues": Array [
          Object {
            "Ref": "DeadLetterQueue9F481546",
          },
        ],
      },
      "Type": "AWS::SQS::QueuePolicy",
    },
    "DriveQueueHandler9F657A00": Object {
      "DependsOn": Array [
        "DriveQueueHandlerServiceRoleD796850A",
      ],
      "Metadata": Object {
        "aws:asset:is-bundled": false,
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:property": "Code",
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DriveQueueHandler/Resource",
      },
      "Properties": Object {
        "Code": Object {
          "S3Bucket": Object {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-eu-west-1",
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip",
        },
        "Handler": "hello.handler",
        "Role": Object {
          "Fn::GetAtt": Array [
            "DriveQueueHandlerServiceRoleD796850A",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
      },
      "Type": "AWS::Lambda::Function",
    },
    "DriveQueueHandlerServiceRoleD796850A": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DriveQueueHandler/ServiceRole/Resource",
      },
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": Object {
                "Service": "lambda.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          Object {
            "Fn::Join": Array [
              "",
              Array [
                "arn:",
                Object {
                  "Ref": "AWS::Partition",
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
              ],
            ],
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "DriveStreamHandler62F1767B": Object {
      "DependsOn": Array [
        "DriveStreamHandlerServiceRoleD2BAFDD4",
      ],
      "Metadata": Object {
        "aws:asset:is-bundled": false,
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:property": "Code",
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DriveStreamHandler/Resource",
      },
      "Properties": Object {
        "Code": Object {
          "S3Bucket": Object {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-eu-west-1",
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip",
        },
        "Handler": "stream-test-handler.handleDrive",
        "Role": Object {
          "Fn::GetAtt": Array [
            "DriveStreamHandlerServiceRoleD2BAFDD4",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
      },
      "Type": "AWS::Lambda::Function",
    },
    "DriveStreamHandlerServiceRoleD2BAFDD4": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DriveStreamHandler/ServiceRole/Resource",
      },
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": Object {
                "Service": "lambda.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          Object {
            "Fn::Join": Array [
              "",
              Array [
                "arn:",
                Object {
                  "Ref": "AWS::Partition",
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
              ],
            ],
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "DriveTableHandler119966B0": Object {
      "DependsOn": Array [
        "DriveTableHandlerServiceRoleDDA3FBE1",
      ],
      "Metadata": Object {
        "aws:asset:is-bundled": false,
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:property": "Code",
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DriveTableHandler/Resource",
      },
      "Properties": Object {
        "Code": Object {
          "S3Bucket": Object {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-eu-west-1",
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip",
        },
        "Handler": "hello.handler",
        "Role": Object {
          "Fn::GetAtt": Array [
            "DriveTableHandlerServiceRoleDDA3FBE1",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
      },
      "Type": "AWS::Lambda::Function",
    },
    "DriveTableHandlerServiceRoleDDA3FBE1": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/DriveTableHandler/ServiceRole/Resource",
      },
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": Object {
                "Service": "lambda.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          Object {
            "Fn::Join": Array [
              "",
              Array [
                "arn:",
                Object {
                  "Ref": "AWS::Partition",
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
              ],
            ],
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "HelloHandler2E4FBA4D": Object {
      "DependsOn": Array [
        "HelloHandlerServiceRole11EF7C63",
      ],
      "Metadata": Object {
        "slicWatch": Object {
          "alarms": Object {
            "Lambda": Object {
              "Invocations": Object {
                "Threshold": 4,
              },
            },
          },
        },
      },
      "Properties": Object {
        "Code": Object {
          "S3Bucket": Object {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-eu-west-1",
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip",
        },
        "Handler": "hello.handler",
        "Role": Object {
          "Fn::GetAtt": Array [
            "HelloHandlerServiceRole11EF7C63",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
      },
      "Type": "AWS::Lambda::Function",
    },
    "HelloHandlerServiceRole11EF7C63": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/HelloHandler/ServiceRole/Resource",
      },
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": Object {
                "Service": "lambda.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          Object {
            "Fn::Join": Array [
              "",
              Array [
                "arn:",
                Object {
                  "Ref": "AWS::Partition",
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
              ],
            ],
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "myapi162F20B8": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Resource",
      },
      "Properties": Object {
        "Name": "myapi",
      },
      "Type": "AWS::ApiGateway::RestApi",
    },
    "myapiAccountC3A4750C": Object {
      "DeletionPolicy": "Retain",
      "DependsOn": Array [
        "myapi162F20B8",
      ],
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Account",
      },
      "Properties": Object {
        "CloudWatchRoleArn": Object {
          "Fn::GetAtt": Array [
            "myapiCloudWatchRoleEB425128",
            "Arn",
          ],
        },
      },
      "Type": "AWS::ApiGateway::Account",
      "UpdateReplacePolicy": "Retain",
    },
    "myapiANY111D56B7": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Default/ANY/Resource",
      },
      "Properties": Object {
        "AuthorizationType": "NONE",
        "HttpMethod": "ANY",
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
                ":apigateway:eu-west-1:lambda:path/2015-03-31/functions/",
                Object {
                  "Fn::GetAtt": Array [
                    "HelloHandler2E4FBA4D",
                    "Arn",
                  ],
                },
                "/invocations",
              ],
            ],
          },
        },
        "ResourceId": Object {
          "Fn::GetAtt": Array [
            "myapi162F20B8",
            "RootResourceId",
          ],
        },
        "RestApiId": Object {
          "Ref": "myapi162F20B8",
        },
      },
      "Type": "AWS::ApiGateway::Method",
    },
    "myapiANYApiPermissionCdkGeneralStackTestEuropemyapi65F2E57FANYEF4BF8F6": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Default/ANY/ApiPermission.CdkGeneralStackTestEuropemyapi65F2E57F.ANY..",
      },
      "Properties": Object {
        "Action": "lambda:InvokeFunction",
        "FunctionName": Object {
          "Fn::GetAtt": Array [
            "HelloHandler2E4FBA4D",
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
              ":execute-api:eu-west-1:",
              Object {
                "Ref": "AWS::AccountId",
              },
              ":",
              Object {
                "Ref": "myapi162F20B8",
              },
              "/",
              Object {
                "Ref": "myapiDeploymentStageprod329F21FF",
              },
              "/*/",
            ],
          ],
        },
      },
      "Type": "AWS::Lambda::Permission",
    },
    "myapiANYApiPermissionTestCdkGeneralStackTestEuropemyapi65F2E57FANY3EBCCF8C": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Default/ANY/ApiPermission.Test.CdkGeneralStackTestEuropemyapi65F2E57F.ANY..",
      },
      "Properties": Object {
        "Action": "lambda:InvokeFunction",
        "FunctionName": Object {
          "Fn::GetAtt": Array [
            "HelloHandler2E4FBA4D",
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
              ":execute-api:eu-west-1:",
              Object {
                "Ref": "AWS::AccountId",
              },
              ":",
              Object {
                "Ref": "myapi162F20B8",
              },
              "/test-invoke-stage/*/",
            ],
          ],
        },
      },
      "Type": "AWS::Lambda::Permission",
    },
    "myapiCloudWatchRoleEB425128": Object {
      "DeletionPolicy": "Retain",
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/CloudWatchRole/Resource",
      },
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": Object {
                "Service": "apigateway.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          Object {
            "Fn::Join": Array [
              "",
              Array [
                "arn:",
                Object {
                  "Ref": "AWS::Partition",
                },
                ":iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs",
              ],
            ],
          },
        ],
      },
      "Type": "AWS::IAM::Role",
      "UpdateReplacePolicy": "Retain",
    },
    "myapiDeploymentB7EF8EB76dbd4bbbb18c5c458967fb55792b4830": Object {
      "DependsOn": Array [
        "myapiproxyANYDD7FCE64",
        "myapiproxyB6DF4575",
        "myapiANY111D56B7",
      ],
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Deployment/Resource",
      },
      "Properties": Object {
        "Description": "Automatically created by the RestApi construct",
        "RestApiId": Object {
          "Ref": "myapi162F20B8",
        },
      },
      "Type": "AWS::ApiGateway::Deployment",
    },
    "myapiDeploymentStageprod329F21FF": Object {
      "DependsOn": Array [
        "myapiAccountC3A4750C",
      ],
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/DeploymentStage.prod/Resource",
      },
      "Properties": Object {
        "DeploymentId": Object {
          "Ref": "myapiDeploymentB7EF8EB76dbd4bbbb18c5c458967fb55792b4830",
        },
        "RestApiId": Object {
          "Ref": "myapi162F20B8",
        },
        "StageName": "prod",
      },
      "Type": "AWS::ApiGateway::Stage",
    },
    "myapiproxyANYApiPermissionCdkGeneralStackTestEuropemyapi65F2E57FANYproxyBDBDCB62": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Default/{proxy+}/ANY/ApiPermission.CdkGeneralStackTestEuropemyapi65F2E57F.ANY..{proxy+}",
      },
      "Properties": Object {
        "Action": "lambda:InvokeFunction",
        "FunctionName": Object {
          "Fn::GetAtt": Array [
            "HelloHandler2E4FBA4D",
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
              ":execute-api:eu-west-1:",
              Object {
                "Ref": "AWS::AccountId",
              },
              ":",
              Object {
                "Ref": "myapi162F20B8",
              },
              "/",
              Object {
                "Ref": "myapiDeploymentStageprod329F21FF",
              },
              "/*/*",
            ],
          ],
        },
      },
      "Type": "AWS::Lambda::Permission",
    },
    "myapiproxyANYApiPermissionTestCdkGeneralStackTestEuropemyapi65F2E57FANYproxyF17A09F1": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Default/{proxy+}/ANY/ApiPermission.Test.CdkGeneralStackTestEuropemyapi65F2E57F.ANY..{proxy+}",
      },
      "Properties": Object {
        "Action": "lambda:InvokeFunction",
        "FunctionName": Object {
          "Fn::GetAtt": Array [
            "HelloHandler2E4FBA4D",
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
              ":execute-api:eu-west-1:",
              Object {
                "Ref": "AWS::AccountId",
              },
              ":",
              Object {
                "Ref": "myapi162F20B8",
              },
              "/test-invoke-stage/*/*",
            ],
          ],
        },
      },
      "Type": "AWS::Lambda::Permission",
    },
    "myapiproxyANYDD7FCE64": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Default/{proxy+}/ANY/Resource",
      },
      "Properties": Object {
        "AuthorizationType": "NONE",
        "HttpMethod": "ANY",
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
                ":apigateway:eu-west-1:lambda:path/2015-03-31/functions/",
                Object {
                  "Fn::GetAtt": Array [
                    "HelloHandler2E4FBA4D",
                    "Arn",
                  ],
                },
                "/invocations",
              ],
            ],
          },
        },
        "ResourceId": Object {
          "Ref": "myapiproxyB6DF4575",
        },
        "RestApiId": Object {
          "Ref": "myapi162F20B8",
        },
      },
      "Type": "AWS::ApiGateway::Method",
    },
    "myapiproxyB6DF4575": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/myapi/Default/{proxy+}/Resource",
      },
      "Properties": Object {
        "ParentId": Object {
          "Fn::GetAtt": Array [
            "myapi162F20B8",
            "RootResourceId",
          ],
        },
        "PathPart": "{proxy+}",
        "RestApiId": Object {
          "Ref": "myapi162F20B8",
        },
      },
      "Type": "AWS::ApiGateway::Resource",
    },
    "MyTopic86869434": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/MyTopic/Resource",
      },
      "Type": "AWS::SNS::Topic",
    },
    "PingHandler50068074": Object {
      "DependsOn": Array [
        "PingHandlerServiceRole46086423",
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
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-eu-west-1",
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip",
        },
        "Handler": "hello.handler",
        "Role": Object {
          "Fn::GetAtt": Array [
            "PingHandlerServiceRole46086423",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
      },
      "Type": "AWS::Lambda::Function",
    },
    "PingHandlerServiceRole46086423": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/PingHandler/ServiceRole/Resource",
      },
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": Object {
                "Service": "lambda.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          Object {
            "Fn::Join": Array [
              "",
              Array [
                "arn:",
                Object {
                  "Ref": "AWS::Partition",
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
              ],
            ],
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "ruleAllowEventRuleCdkGeneralStackTestEuropeHelloHandlerE25EBD9DD0F76E59": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/rule/AllowEventRuleCdkGeneralStackTestEuropeHelloHandlerE25EBD9D",
      },
      "Properties": Object {
        "Action": "lambda:InvokeFunction",
        "FunctionName": Object {
          "Fn::GetAtt": Array [
            "HelloHandler2E4FBA4D",
            "Arn",
          ],
        },
        "Principal": "events.amazonaws.com",
        "SourceArn": Object {
          "Fn::GetAtt": Array [
            "ruleF2C1DCDC",
            "Arn",
          ],
        },
      },
      "Type": "AWS::Lambda::Permission",
    },
    "ruleF2C1DCDC": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/rule/Resource",
      },
      "Properties": Object {
        "EventPattern": Object {
          "source": Array [
            "aws.ec2",
          ],
        },
        "State": "ENABLED",
        "Targets": Array [
          Object {
            "Arn": Object {
              "Fn::GetAtt": Array [
                "HelloHandler2E4FBA4D",
                "Arn",
              ],
            },
            "DeadLetterConfig": Object {
              "Arn": Object {
                "Fn::GetAtt": Array [
                  "DeadLetterQueue9F481546",
                  "Arn",
                ],
              },
            },
            "Id": "Target0",
            "RetryPolicy": Object {
              "MaximumEventAgeInSeconds": 7200,
              "MaximumRetryAttempts": 2,
            },
          },
        ],
      },
      "Type": "AWS::Events::Rule",
    },
    "slicWatchApi4XXErrorAlarmmyapi": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "API Gateway 4XXError Average for myapi breaches 0.05",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "ApiGW_4XXError_myapi",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "ApiName",
            "Value": "myapi",
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "4XXError",
        "Namespace": "AWS/ApiGateway",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 0.05,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchApi5XXErrorAlarmmyapi": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "API Gateway 5XXError Average for myapi breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "ApiGW_5XXError_myapi",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "ApiName",
            "Value": "myapi",
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "5XXError",
        "Namespace": "AWS/ApiGateway",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchApiLatencyAlarmmyapi": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "API Gateway Latency p99 for myapi breaches 5000",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "ApiGW_Latency_myapi",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "ApiName",
            "Value": "myapi",
          },
        ],
        "EvaluationPeriods": 1,
        "ExtendedStatistic": "p99",
        "MetricName": "Latency",
        "Namespace": "AWS/ApiGateway",
        "OKActions": Array [],
        "Period": 60,
        "Threshold": 5000,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchDashboard": Object {
      "Properties": Object {
        "DashboardBody": Object {
          "Fn::Sub": "{\\"start\\":\\"-PT3H\\",\\"widgets\\":[{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/ApiGateway\\",\\"5XXError\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"5XXError API myapi\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":0},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/ApiGateway\\",\\"5XXError\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/ApiGateway\\",\\"4XXError\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"4XXError API myapi\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":0},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/ApiGateway\\",\\"5XXError\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/ApiGateway\\",\\"4XXError\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/ApiGateway\\",\\"Latency\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/ApiGateway\\",\\"Latency\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"p95\\"}]],\\"title\\":\\"Latency API myapi\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":0},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/ApiGateway\\",\\"5XXError\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/ApiGateway\\",\\"4XXError\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/ApiGateway\\",\\"Latency\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/ApiGateway\\",\\"Latency\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"p95\\"}],[\\"AWS/ApiGateway\\",\\"Count\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"Count API myapi\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":6},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/DynamoDB\\",\\"ReadThrottleEvents\\",\\"TableName\\",\\"\${TableCD117FA1}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"ReadThrottleEvents Table \${TableCD117FA1}\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":6},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/DynamoDB\\",\\"ReadThrottleEvents\\",\\"TableName\\",\\"\${TableCD117FA1}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/DynamoDB\\",\\"WriteThrottleEvents\\",\\"TableName\\",\\"\${TableCD117FA1}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"WriteThrottleEvents Table \${TableCD117FA1}\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":6},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Errors\\",\\"FunctionName\\",\\"\${HelloHandler2E4FBA4D}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Errors\\",\\"FunctionName\\",\\"\${ThrottlerHandler750A7C89}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Errors\\",\\"FunctionName\\",\\"\${DriveStreamHandler62F1767B}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Errors\\",\\"FunctionName\\",\\"\${DriveQueueHandler9F657A00}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Errors\\",\\"FunctionName\\",\\"\${DriveTableHandler119966B0}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"Lambda Errors Sum per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":12},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Throttles\\",\\"FunctionName\\",\\"\${HelloHandler2E4FBA4D}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Throttles\\",\\"FunctionName\\",\\"\${ThrottlerHandler750A7C89}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Throttles\\",\\"FunctionName\\",\\"\${DriveStreamHandler62F1767B}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Throttles\\",\\"FunctionName\\",\\"\${DriveQueueHandler9F657A00}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Throttles\\",\\"FunctionName\\",\\"\${DriveTableHandler119966B0}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"Lambda Throttles Sum per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":12},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${HelloHandler2E4FBA4D}\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${ThrottlerHandler750A7C89}\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${DriveStreamHandler62F1767B}\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${DriveQueueHandler9F657A00}\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${DriveTableHandler119966B0}\\",{\\"stat\\":\\"Average\\"}]],\\"title\\":\\"Lambda Duration Average per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":12},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${HelloHandler2E4FBA4D}\\",{\\"stat\\":\\"p95\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${ThrottlerHandler750A7C89}\\",{\\"stat\\":\\"p95\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${DriveStreamHandler62F1767B}\\",{\\"stat\\":\\"p95\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${DriveQueueHandler9F657A00}\\",{\\"stat\\":\\"p95\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${DriveTableHandler119966B0}\\",{\\"stat\\":\\"p95\\"}]],\\"title\\":\\"Lambda Duration p95 per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":18},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${HelloHandler2E4FBA4D}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${ThrottlerHandler750A7C89}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${DriveStreamHandler62F1767B}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${DriveQueueHandler9F657A00}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${DriveTableHandler119966B0}\\",{\\"stat\\":\\"Maximum\\"}]],\\"title\\":\\"Lambda Duration Maximum per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":18},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Invocations\\",\\"FunctionName\\",\\"\${HelloHandler2E4FBA4D}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Invocations\\",\\"FunctionName\\",\\"\${ThrottlerHandler750A7C89}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Invocations\\",\\"FunctionName\\",\\"\${DriveStreamHandler62F1767B}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Invocations\\",\\"FunctionName\\",\\"\${DriveQueueHandler9F657A00}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Invocations\\",\\"FunctionName\\",\\"\${DriveTableHandler119966B0}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"Lambda Invocations Sum per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":18},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"ConcurrentExecutions\\",\\"FunctionName\\",\\"\${HelloHandler2E4FBA4D}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"ConcurrentExecutions\\",\\"FunctionName\\",\\"\${ThrottlerHandler750A7C89}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"ConcurrentExecutions\\",\\"FunctionName\\",\\"\${DriveStreamHandler62F1767B}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"ConcurrentExecutions\\",\\"FunctionName\\",\\"\${DriveQueueHandler9F657A00}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"ConcurrentExecutions\\",\\"FunctionName\\",\\"\${DriveTableHandler119966B0}\\",{\\"stat\\":\\"Maximum\\"}]],\\"title\\":\\"Lambda ConcurrentExecutions Maximum per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":24},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/SQS\\",\\"NumberOfMessagesSent\\",\\"QueueName\\",\\"\${DeadLetterQueue9F481546.QueueName}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/SQS\\",\\"NumberOfMessagesReceived\\",\\"QueueName\\",\\"\${DeadLetterQueue9F481546.QueueName}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/SQS\\",\\"NumberOfMessagesDeleted\\",\\"QueueName\\",\\"\${DeadLetterQueue9F481546.QueueName}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"Messages \${DeadLetterQueue9F481546.QueueName} SQS\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":24},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/SQS\\",\\"ApproximateAgeOfOldestMessage\\",\\"QueueName\\",\\"\${DeadLetterQueue9F481546.QueueName}\\",{\\"stat\\":\\"Maximum\\"}]],\\"title\\":\\"Oldest Message age \${DeadLetterQueue9F481546.QueueName} SQS\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":24},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/SQS\\",\\"ApproximateNumberOfMessagesVisible\\",\\"QueueName\\",\\"\${DeadLetterQueue9F481546.QueueName}\\",{\\"stat\\":\\"Maximum\\"}]],\\"title\\":\\"Messages in queue \${DeadLetterQueue9F481546.QueueName} SQS\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":30},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/SNS\\",\\"NumberOfNotificationsFilteredOut-InvalidAttributes\\",\\"TopicName\\",\\"\${MyTopic86869434.TopicName}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/SNS\\",\\"NumberOfNotificationsFailed\\",\\"TopicName\\",\\"\${MyTopic86869434.TopicName}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"SNS Topic \${MyTopic86869434.TopicName}\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":30},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Events\\",\\"FailedInvocations\\",\\"RuleName\\",\\"\${ruleF2C1DCDC}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Events\\",\\"ThrottledRules\\",\\"RuleName\\",\\"\${ruleF2C1DCDC}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Events\\",\\"Invocations\\",\\"RuleName\\",\\"\${ruleF2C1DCDC}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"EventBridge Rule \${ruleF2C1DCDC}\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":30}]}",
        },
        "DashboardName": Object {
          "Fn::Sub": "\${AWS::StackName}-\${AWS::Region}-Dashboard",
        },
      },
      "Type": "AWS::CloudWatch::Dashboard",
    },
    "slicWatchEventsFailedInvocationsAlarmRuleF2C1DCDC": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "EventBridge FailedInvocations for \${ruleF2C1DCDC} breaches 1",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Events_FailedInvocations_Alarm_\${ruleF2C1DCDC}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "RuleName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "ruleF2C1DCDC",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "FailedInvocations",
        "Namespace": "AWS/Events",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchEventsThrottledRulesAlarmRuleF2C1DCDC": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "EventBridge ThrottledRules for \${ruleF2C1DCDC} breaches 1",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Events_ThrottledRules_Alarm_\${ruleF2C1DCDC}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "RuleName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "ruleF2C1DCDC",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ThrottledRules",
        "Namespace": "AWS/Events",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaDurationAlarmDriveQueueHandler9F657A00": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Max duration for \${DriveQueueHandler9F657A00} breaches 95% of timeout (3)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Duration_\${DriveQueueHandler9F657A00}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "DriveQueueHandler9F657A00",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaDurationAlarmDriveStreamHandler62F1767B": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Max duration for \${DriveStreamHandler62F1767B} breaches 95% of timeout (3)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Duration_\${DriveStreamHandler62F1767B}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "DriveStreamHandler62F1767B",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaDurationAlarmDriveTableHandler119966B0": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Max duration for \${DriveTableHandler119966B0} breaches 95% of timeout (3)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Duration_\${DriveTableHandler119966B0}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "DriveTableHandler119966B0",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaDurationAlarmHelloHandler2E4FBA4D": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Max duration for \${HelloHandler2E4FBA4D} breaches 95% of timeout (3)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Duration_\${HelloHandler2E4FBA4D}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "HelloHandler2E4FBA4D",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaDurationAlarmPingHandler50068074": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Max duration for \${PingHandler50068074} breaches 95% of timeout (3)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Duration_\${PingHandler50068074}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "PingHandler50068074",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaDurationAlarmThrottlerHandler750A7C89": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Max duration for \${ThrottlerHandler750A7C89} breaches 95% of timeout (3)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Duration_\${ThrottlerHandler750A7C89}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "ThrottlerHandler750A7C89",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaErrorsAlarmDriveQueueHandler9F657A00": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Error count for \${DriveQueueHandler9F657A00} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Errors_\${DriveQueueHandler9F657A00}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "DriveQueueHandler9F657A00",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaErrorsAlarmDriveStreamHandler62F1767B": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Error count for \${DriveStreamHandler62F1767B} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Errors_\${DriveStreamHandler62F1767B}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "DriveStreamHandler62F1767B",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaErrorsAlarmDriveTableHandler119966B0": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Error count for \${DriveTableHandler119966B0} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Errors_\${DriveTableHandler119966B0}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "DriveTableHandler119966B0",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaErrorsAlarmHelloHandler2E4FBA4D": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Error count for \${HelloHandler2E4FBA4D} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Errors_\${HelloHandler2E4FBA4D}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "HelloHandler2E4FBA4D",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaErrorsAlarmPingHandler50068074": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Error count for \${PingHandler50068074} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Errors_\${PingHandler50068074}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "PingHandler50068074",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaErrorsAlarmThrottlerHandler750A7C89": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Error count for \${ThrottlerHandler750A7C89} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Errors_\${ThrottlerHandler750A7C89}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "ThrottlerHandler750A7C89",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaInvocationsAlarmDriveQueueHandler9F657A00": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Total invocations for \${DriveQueueHandler9F657A00} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Invocations_\${DriveQueueHandler9F657A00}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "DriveQueueHandler9F657A00",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaInvocationsAlarmDriveStreamHandler62F1767B": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Total invocations for \${DriveStreamHandler62F1767B} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Invocations_\${DriveStreamHandler62F1767B}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "DriveStreamHandler62F1767B",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaInvocationsAlarmDriveTableHandler119966B0": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Total invocations for \${DriveTableHandler119966B0} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Invocations_\${DriveTableHandler119966B0}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "DriveTableHandler119966B0",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaInvocationsAlarmHelloHandler2E4FBA4D": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Total invocations for \${HelloHandler2E4FBA4D} breaches 4",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Invocations_\${HelloHandler2E4FBA4D}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "HelloHandler2E4FBA4D",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 4,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaInvocationsAlarmPingHandler50068074": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Total invocations for \${PingHandler50068074} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Invocations_\${PingHandler50068074}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "PingHandler50068074",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaInvocationsAlarmThrottlerHandler750A7C89": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Total invocations for \${ThrottlerHandler750A7C89} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Invocations_\${ThrottlerHandler750A7C89}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "ThrottlerHandler750A7C89",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaThrottlesAlarmDriveQueueHandler9F657A00": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Throttles % for \${DriveQueueHandler9F657A00} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Throttles_\${DriveQueueHandler9F657A00}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": Array [
          Object {
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Id": "throttles_pc",
            "Label": "% Throttles",
            "ReturnData": true,
          },
          Object {
            "Id": "throttles",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "DriveQueueHandler9F657A00",
                    },
                  },
                ],
                "MetricName": "Throttles",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
          Object {
            "Id": "invocations",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "DriveQueueHandler9F657A00",
                    },
                  },
                ],
                "MetricName": "Invocations",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
        ],
        "OKActions": Array [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaThrottlesAlarmDriveStreamHandler62F1767B": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Throttles % for \${DriveStreamHandler62F1767B} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Throttles_\${DriveStreamHandler62F1767B}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": Array [
          Object {
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Id": "throttles_pc",
            "Label": "% Throttles",
            "ReturnData": true,
          },
          Object {
            "Id": "throttles",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "DriveStreamHandler62F1767B",
                    },
                  },
                ],
                "MetricName": "Throttles",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
          Object {
            "Id": "invocations",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "DriveStreamHandler62F1767B",
                    },
                  },
                ],
                "MetricName": "Invocations",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
        ],
        "OKActions": Array [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaThrottlesAlarmDriveTableHandler119966B0": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Throttles % for \${DriveTableHandler119966B0} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Throttles_\${DriveTableHandler119966B0}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": Array [
          Object {
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Id": "throttles_pc",
            "Label": "% Throttles",
            "ReturnData": true,
          },
          Object {
            "Id": "throttles",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "DriveTableHandler119966B0",
                    },
                  },
                ],
                "MetricName": "Throttles",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
          Object {
            "Id": "invocations",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "DriveTableHandler119966B0",
                    },
                  },
                ],
                "MetricName": "Invocations",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
        ],
        "OKActions": Array [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaThrottlesAlarmHelloHandler2E4FBA4D": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Throttles % for \${HelloHandler2E4FBA4D} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Throttles_\${HelloHandler2E4FBA4D}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": Array [
          Object {
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Id": "throttles_pc",
            "Label": "% Throttles",
            "ReturnData": true,
          },
          Object {
            "Id": "throttles",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "HelloHandler2E4FBA4D",
                    },
                  },
                ],
                "MetricName": "Throttles",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
          Object {
            "Id": "invocations",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "HelloHandler2E4FBA4D",
                    },
                  },
                ],
                "MetricName": "Invocations",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
        ],
        "OKActions": Array [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaThrottlesAlarmPingHandler50068074": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Throttles % for \${PingHandler50068074} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Throttles_\${PingHandler50068074}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": Array [
          Object {
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Id": "throttles_pc",
            "Label": "% Throttles",
            "ReturnData": true,
          },
          Object {
            "Id": "throttles",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "PingHandler50068074",
                    },
                  },
                ],
                "MetricName": "Throttles",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
          Object {
            "Id": "invocations",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "PingHandler50068074",
                    },
                  },
                ],
                "MetricName": "Invocations",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
        ],
        "OKActions": Array [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaThrottlesAlarmThrottlerHandler750A7C89": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Throttles % for \${ThrottlerHandler750A7C89} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Throttles_\${ThrottlerHandler750A7C89}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": Array [
          Object {
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Id": "throttles_pc",
            "Label": "% Throttles",
            "ReturnData": true,
          },
          Object {
            "Id": "throttles",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "ThrottlerHandler750A7C89",
                    },
                  },
                ],
                "MetricName": "Throttles",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
          Object {
            "Id": "invocations",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "ThrottlerHandler750A7C89",
                    },
                  },
                ],
                "MetricName": "Invocations",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
        ],
        "OKActions": Array [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchSNSNumberOfNotificationsFailedAlarmMyTopic86869434": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SNS NumberOfNotificationsFailed for \${MyTopic86869434.TopicName} breaches 1",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SNS_NumberOfNotificationsFailed_Alarm_\${MyTopic86869434.TopicName}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TopicName",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "MyTopic86869434",
                "TopicName",
              ],
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "NumberOfNotificationsFailed",
        "Namespace": "AWS/SNS",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchSNSNumberOfNotificationsFilteredOutInvalidAttributesAlarmMyTopic86869434": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SNS NumberOfNotificationsFilteredOutInvalidAttributes for \${MyTopic86869434.TopicName} breaches 1",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SNS_NumberOfNotificationsFilteredOutInvalidAttributes_Alarm_\${MyTopic86869434.TopicName}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TopicName",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "MyTopic86869434",
                "TopicName",
              ],
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "NumberOfNotificationsFilteredOut-InvalidAttributes",
        "Namespace": "AWS/SNS",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchSQSInFlightMsgsAlarmDeadLetterQueue9F481546": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SQS in-flight messages for \${DeadLetterQueue9F481546.QueueName} breaches 1200 (1% of the hard limit of 120000)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SQS_ApproximateNumberOfMessagesNotVisible_\${DeadLetterQueue9F481546.QueueName}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "QueueName",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "DeadLetterQueue9F481546",
                "QueueName",
              ],
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ApproximateNumberOfMessagesNotVisible",
        "Namespace": "AWS/SQS",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 1200,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchSQSOldestMsgAgeAlarmDeadLetterQueue9F481546": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SQS age of oldest message in the queue \${DeadLetterQueue9F481546.QueueName} breaches 60",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SQS_ApproximateAgeOfOldestMessage_\${DeadLetterQueue9F481546.QueueName}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "QueueName",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "DeadLetterQueue9F481546",
                "QueueName",
              ],
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ApproximateAgeOfOldestMessage",
        "Namespace": "AWS/SQS",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 60,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchTableReadThrottleEventsAlarmTableCD117FA1": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DynamoDB Sum for \${TableCD117FA1} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DDB_ReadThrottleEvents_Alarm_\${TableCD117FA1}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TableName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "TableCD117FA1",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ReadThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchTableSystemErrorsAlarmTableCD117FA1": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DynamoDB Sum for \${TableCD117FA1} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DDB_SystemErrors_Alarm_\${TableCD117FA1}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TableName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "TableCD117FA1",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "SystemErrors",
        "Namespace": "AWS/DynamoDB",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchTableUserErrorsAlarmTableCD117FA1": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DynamoDB Sum for \${TableCD117FA1} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DDB_UserErrors_Alarm_\${TableCD117FA1}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TableName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "TableCD117FA1",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "UserErrors",
        "Namespace": "AWS/DynamoDB",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchTableWriteThrottleEventsAlarmTableCD117FA1": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DynamoDB Sum for \${TableCD117FA1} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DDB_WriteThrottleEvents_Alarm_\${TableCD117FA1}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TableName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "TableCD117FA1",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "WriteThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "TableCD117FA1": Object {
      "DeletionPolicy": "Retain",
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/Table/Resource",
      },
      "Properties": Object {
        "AttributeDefinitions": Array [
          Object {
            "AttributeName": "id",
            "AttributeType": "S",
          },
        ],
        "BillingMode": "PAY_PER_REQUEST",
        "KeySchema": Array [
          Object {
            "AttributeName": "id",
            "KeyType": "HASH",
          },
        ],
      },
      "Type": "AWS::DynamoDB::Table",
      "UpdateReplacePolicy": "Retain",
    },
    "ThrottlerHandler750A7C89": Object {
      "DependsOn": Array [
        "ThrottlerHandlerServiceRoleA0481DAF",
      ],
      "Metadata": Object {
        "aws:asset:is-bundled": false,
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:property": "Code",
        "aws:cdk:path": "CdkGeneralStackTest-Europe/ThrottlerHandler/Resource",
      },
      "Properties": Object {
        "Code": Object {
          "S3Bucket": Object {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-eu-west-1",
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip",
        },
        "Handler": "hello.handler",
        "ReservedConcurrentExecutions": 0,
        "Role": Object {
          "Fn::GetAtt": Array [
            "ThrottlerHandlerServiceRoleA0481DAF",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
      },
      "Type": "AWS::Lambda::Function",
    },
    "ThrottlerHandlerServiceRoleA0481DAF": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-Europe/ThrottlerHandler/ServiceRole/Resource",
      },
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": Object {
                "Service": "lambda.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          Object {
            "Fn::Join": Array [
              "",
              Array [
                "arn:",
                Object {
                  "Ref": "AWS::Partition",
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
              ],
            ],
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
  },
  "Rules": Object {
    "CheckBootstrapVersion": Object {
      "Assertions": Array [
        Object {
          "Assert": Object {
            "Fn::Not": Array [
              Object {
                "Fn::Contains": Array [
                  Array [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                  ],
                  Object {
                    "Ref": "BootstrapVersion",
                  },
                ],
              },
            ],
          },
          "AssertDescription": "CDK bootstrap stack version 6 required. Please run 'cdk bootstrap' with a recent version of the CDK CLI.",
        },
      ],
    },
  },
  "Transform": "SlicWatch-v3",
}
`

exports[`cdk-test-project/tests/snapshot/cdk-test-project-snapshot.test.ts > TAP > cdk-test-project snapshot > generalUsStack fragment 1`] = `
Object {
  "Metadata": Object {
    "slicWatch": Object {
      "alarmActionsConfig": Object {
        "alarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
      },
      "alarms": Object {
        "Lambda": Object {
          "Invocations": Object {
            "enabled": true,
            "Threshold": 10,
          },
        },
        "SQS": Object {
          "AgeOfOldestMessage": Object {
            "enabled": true,
            "Statistic": "Maximum",
            "Threshold": 60,
          },
          "InFlightMessagesPc": Object {
            "Statistic": "Maximum",
            "Threshold": 1,
          },
        },
      },
      "enabled": true,
      "topicArn": "arn:aws:xxxxxx:mytopic",
    },
  },
  "Outputs": Object {
    "myapiEndpoint8EB17201": Object {
      "Value": Object {
        "Fn::Join": Array [
          "",
          Array [
            "https://",
            Object {
              "Ref": "myapi162F20B8",
            },
            ".execute-api.us-east-1.",
            Object {
              "Ref": "AWS::URLSuffix",
            },
            "/",
            Object {
              "Ref": "myapiDeploymentStageprod329F21FF",
            },
            "/",
          ],
        ],
      },
    },
  },
  "Parameters": Object {
    "BootstrapVersion": Object {
      "Default": "/cdk-bootstrap/hnb659fds/version",
      "Description": "Version of the CDK Bootstrap resources in this environment, automatically retrieved from SSM Parameter Store. [cdk:skip]",
      "Type": "AWS::SSM::Parameter::Value<String>",
    },
  },
  "Resources": Object {
    "CDKMetadata": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/CDKMetadata/Default",
      },
      "Properties": Object {
        "Analytics": "v2:deflate64:H4sIAAAAAAAA/02Q30/DIBDH/5a9M9SZmL12Gp801rr3hdKzshaoPdhsGv53D5izCeE+9z24Xxu+feC3K3HGtWy6da9qPn84ITtG0mFGg3ze20FJ9vhpEgTWC103gs/P3kinrImhJZcwaoVIXmBKaD5XtocYiDYwvD8IRHDIi2jI5zsvO3A7gcDEoFrh4CwmPr+kQhWgKwaVEvxjIaX1xrEnGHo7aSAkdeHRFG2qmoG+Wj9KSEXK0f5Mf8olceZXcF+2iVKmwJrJCG0b2ste1HmOBIHBierQfip/Gc+n8b5Jevfgk5Yh3aXtlZyuYnZDuHbG0jpit8q08dmbd4N3y/YCM7YBfsSb092W09msjqjUeqRNKA28yvYXs0P/r9UBAAA=",
      },
      "Type": "AWS::CDK::Metadata",
    },
    "DeadLetterQueue9F481546": Object {
      "DeletionPolicy": "Delete",
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/DeadLetterQueue/Resource",
      },
      "Type": "AWS::SQS::Queue",
      "UpdateReplacePolicy": "Delete",
    },
    "DeadLetterQueuePolicyB1FB890C": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/DeadLetterQueue/Policy/Resource",
      },
      "Properties": Object {
        "PolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": "sqs:SendMessage",
              "Condition": Object {
                "ArnEquals": Object {
                  "aws:SourceArn": Object {
                    "Fn::GetAtt": Array [
                      "ruleF2C1DCDC",
                      "Arn",
                    ],
                  },
                },
              },
              "Effect": "Allow",
              "Principal": Object {
                "Service": "events.amazonaws.com",
              },
              "Resource": Object {
                "Fn::GetAtt": Array [
                  "DeadLetterQueue9F481546",
                  "Arn",
                ],
              },
              "Sid": "AllowEventRuleCdkGeneralStackTestUSruleB0D09E87",
            },
          ],
          "Version": "2012-10-17",
        },
        "Queues": Array [
          Object {
            "Ref": "DeadLetterQueue9F481546",
          },
        ],
      },
      "Type": "AWS::SQS::QueuePolicy",
    },
    "DriveQueueHandler9F657A00": Object {
      "DependsOn": Array [
        "DriveQueueHandlerServiceRoleD796850A",
      ],
      "Metadata": Object {
        "aws:asset:is-bundled": false,
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:property": "Code",
        "aws:cdk:path": "CdkGeneralStackTest-US/DriveQueueHandler/Resource",
      },
      "Properties": Object {
        "Code": Object {
          "S3Bucket": Object {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-us-east-1",
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip",
        },
        "Handler": "hello.handler",
        "Role": Object {
          "Fn::GetAtt": Array [
            "DriveQueueHandlerServiceRoleD796850A",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
      },
      "Type": "AWS::Lambda::Function",
    },
    "DriveQueueHandlerServiceRoleD796850A": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/DriveQueueHandler/ServiceRole/Resource",
      },
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": Object {
                "Service": "lambda.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          Object {
            "Fn::Join": Array [
              "",
              Array [
                "arn:",
                Object {
                  "Ref": "AWS::Partition",
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
              ],
            ],
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "DriveStreamHandler62F1767B": Object {
      "DependsOn": Array [
        "DriveStreamHandlerServiceRoleD2BAFDD4",
      ],
      "Metadata": Object {
        "aws:asset:is-bundled": false,
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:property": "Code",
        "aws:cdk:path": "CdkGeneralStackTest-US/DriveStreamHandler/Resource",
      },
      "Properties": Object {
        "Code": Object {
          "S3Bucket": Object {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-us-east-1",
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip",
        },
        "Handler": "stream-test-handler.handleDrive",
        "Role": Object {
          "Fn::GetAtt": Array [
            "DriveStreamHandlerServiceRoleD2BAFDD4",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
      },
      "Type": "AWS::Lambda::Function",
    },
    "DriveStreamHandlerServiceRoleD2BAFDD4": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/DriveStreamHandler/ServiceRole/Resource",
      },
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": Object {
                "Service": "lambda.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          Object {
            "Fn::Join": Array [
              "",
              Array [
                "arn:",
                Object {
                  "Ref": "AWS::Partition",
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
              ],
            ],
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "DriveTableHandler119966B0": Object {
      "DependsOn": Array [
        "DriveTableHandlerServiceRoleDDA3FBE1",
      ],
      "Metadata": Object {
        "aws:asset:is-bundled": false,
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:property": "Code",
        "aws:cdk:path": "CdkGeneralStackTest-US/DriveTableHandler/Resource",
      },
      "Properties": Object {
        "Code": Object {
          "S3Bucket": Object {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-us-east-1",
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip",
        },
        "Handler": "hello.handler",
        "Role": Object {
          "Fn::GetAtt": Array [
            "DriveTableHandlerServiceRoleDDA3FBE1",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
      },
      "Type": "AWS::Lambda::Function",
    },
    "DriveTableHandlerServiceRoleDDA3FBE1": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/DriveTableHandler/ServiceRole/Resource",
      },
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": Object {
                "Service": "lambda.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          Object {
            "Fn::Join": Array [
              "",
              Array [
                "arn:",
                Object {
                  "Ref": "AWS::Partition",
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
              ],
            ],
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "HelloHandler2E4FBA4D": Object {
      "DependsOn": Array [
        "HelloHandlerServiceRole11EF7C63",
      ],
      "Metadata": Object {
        "slicWatch": Object {
          "alarms": Object {
            "Lambda": Object {
              "Invocations": Object {
                "Threshold": 4,
              },
            },
          },
        },
      },
      "Properties": Object {
        "Code": Object {
          "S3Bucket": Object {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-us-east-1",
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip",
        },
        "Handler": "hello.handler",
        "Role": Object {
          "Fn::GetAtt": Array [
            "HelloHandlerServiceRole11EF7C63",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
      },
      "Type": "AWS::Lambda::Function",
    },
    "HelloHandlerServiceRole11EF7C63": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/HelloHandler/ServiceRole/Resource",
      },
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": Object {
                "Service": "lambda.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          Object {
            "Fn::Join": Array [
              "",
              Array [
                "arn:",
                Object {
                  "Ref": "AWS::Partition",
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
              ],
            ],
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "myapi162F20B8": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Resource",
      },
      "Properties": Object {
        "Name": "myapi",
      },
      "Type": "AWS::ApiGateway::RestApi",
    },
    "myapiAccountC3A4750C": Object {
      "DeletionPolicy": "Retain",
      "DependsOn": Array [
        "myapi162F20B8",
      ],
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Account",
      },
      "Properties": Object {
        "CloudWatchRoleArn": Object {
          "Fn::GetAtt": Array [
            "myapiCloudWatchRoleEB425128",
            "Arn",
          ],
        },
      },
      "Type": "AWS::ApiGateway::Account",
      "UpdateReplacePolicy": "Retain",
    },
    "myapiANY111D56B7": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Default/ANY/Resource",
      },
      "Properties": Object {
        "AuthorizationType": "NONE",
        "HttpMethod": "ANY",
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
                ":apigateway:us-east-1:lambda:path/2015-03-31/functions/",
                Object {
                  "Fn::GetAtt": Array [
                    "HelloHandler2E4FBA4D",
                    "Arn",
                  ],
                },
                "/invocations",
              ],
            ],
          },
        },
        "ResourceId": Object {
          "Fn::GetAtt": Array [
            "myapi162F20B8",
            "RootResourceId",
          ],
        },
        "RestApiId": Object {
          "Ref": "myapi162F20B8",
        },
      },
      "Type": "AWS::ApiGateway::Method",
    },
    "myapiANYApiPermissionCdkGeneralStackTestUSmyapi9E6CC024ANY52E5EFEE": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Default/ANY/ApiPermission.CdkGeneralStackTestUSmyapi9E6CC024.ANY..",
      },
      "Properties": Object {
        "Action": "lambda:InvokeFunction",
        "FunctionName": Object {
          "Fn::GetAtt": Array [
            "HelloHandler2E4FBA4D",
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
              ":execute-api:us-east-1:",
              Object {
                "Ref": "AWS::AccountId",
              },
              ":",
              Object {
                "Ref": "myapi162F20B8",
              },
              "/",
              Object {
                "Ref": "myapiDeploymentStageprod329F21FF",
              },
              "/*/",
            ],
          ],
        },
      },
      "Type": "AWS::Lambda::Permission",
    },
    "myapiANYApiPermissionTestCdkGeneralStackTestUSmyapi9E6CC024ANY1136CBF8": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Default/ANY/ApiPermission.Test.CdkGeneralStackTestUSmyapi9E6CC024.ANY..",
      },
      "Properties": Object {
        "Action": "lambda:InvokeFunction",
        "FunctionName": Object {
          "Fn::GetAtt": Array [
            "HelloHandler2E4FBA4D",
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
              ":execute-api:us-east-1:",
              Object {
                "Ref": "AWS::AccountId",
              },
              ":",
              Object {
                "Ref": "myapi162F20B8",
              },
              "/test-invoke-stage/*/",
            ],
          ],
        },
      },
      "Type": "AWS::Lambda::Permission",
    },
    "myapiCloudWatchRoleEB425128": Object {
      "DeletionPolicy": "Retain",
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/CloudWatchRole/Resource",
      },
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": Object {
                "Service": "apigateway.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          Object {
            "Fn::Join": Array [
              "",
              Array [
                "arn:",
                Object {
                  "Ref": "AWS::Partition",
                },
                ":iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs",
              ],
            ],
          },
        ],
      },
      "Type": "AWS::IAM::Role",
      "UpdateReplacePolicy": "Retain",
    },
    "myapiDeploymentB7EF8EB7fea2aa51ab5416f81a0b318c3a85d817": Object {
      "DependsOn": Array [
        "myapiproxyANYDD7FCE64",
        "myapiproxyB6DF4575",
        "myapiANY111D56B7",
      ],
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Deployment/Resource",
      },
      "Properties": Object {
        "Description": "Automatically created by the RestApi construct",
        "RestApiId": Object {
          "Ref": "myapi162F20B8",
        },
      },
      "Type": "AWS::ApiGateway::Deployment",
    },
    "myapiDeploymentStageprod329F21FF": Object {
      "DependsOn": Array [
        "myapiAccountC3A4750C",
      ],
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/DeploymentStage.prod/Resource",
      },
      "Properties": Object {
        "DeploymentId": Object {
          "Ref": "myapiDeploymentB7EF8EB7fea2aa51ab5416f81a0b318c3a85d817",
        },
        "RestApiId": Object {
          "Ref": "myapi162F20B8",
        },
        "StageName": "prod",
      },
      "Type": "AWS::ApiGateway::Stage",
    },
    "myapiproxyANYApiPermissionCdkGeneralStackTestUSmyapi9E6CC024ANYproxy61FC0812": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Default/{proxy+}/ANY/ApiPermission.CdkGeneralStackTestUSmyapi9E6CC024.ANY..{proxy+}",
      },
      "Properties": Object {
        "Action": "lambda:InvokeFunction",
        "FunctionName": Object {
          "Fn::GetAtt": Array [
            "HelloHandler2E4FBA4D",
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
              ":execute-api:us-east-1:",
              Object {
                "Ref": "AWS::AccountId",
              },
              ":",
              Object {
                "Ref": "myapi162F20B8",
              },
              "/",
              Object {
                "Ref": "myapiDeploymentStageprod329F21FF",
              },
              "/*/*",
            ],
          ],
        },
      },
      "Type": "AWS::Lambda::Permission",
    },
    "myapiproxyANYApiPermissionTestCdkGeneralStackTestUSmyapi9E6CC024ANYproxy352B4E19": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Default/{proxy+}/ANY/ApiPermission.Test.CdkGeneralStackTestUSmyapi9E6CC024.ANY..{proxy+}",
      },
      "Properties": Object {
        "Action": "lambda:InvokeFunction",
        "FunctionName": Object {
          "Fn::GetAtt": Array [
            "HelloHandler2E4FBA4D",
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
              ":execute-api:us-east-1:",
              Object {
                "Ref": "AWS::AccountId",
              },
              ":",
              Object {
                "Ref": "myapi162F20B8",
              },
              "/test-invoke-stage/*/*",
            ],
          ],
        },
      },
      "Type": "AWS::Lambda::Permission",
    },
    "myapiproxyANYDD7FCE64": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Default/{proxy+}/ANY/Resource",
      },
      "Properties": Object {
        "AuthorizationType": "NONE",
        "HttpMethod": "ANY",
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
                ":apigateway:us-east-1:lambda:path/2015-03-31/functions/",
                Object {
                  "Fn::GetAtt": Array [
                    "HelloHandler2E4FBA4D",
                    "Arn",
                  ],
                },
                "/invocations",
              ],
            ],
          },
        },
        "ResourceId": Object {
          "Ref": "myapiproxyB6DF4575",
        },
        "RestApiId": Object {
          "Ref": "myapi162F20B8",
        },
      },
      "Type": "AWS::ApiGateway::Method",
    },
    "myapiproxyB6DF4575": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/myapi/Default/{proxy+}/Resource",
      },
      "Properties": Object {
        "ParentId": Object {
          "Fn::GetAtt": Array [
            "myapi162F20B8",
            "RootResourceId",
          ],
        },
        "PathPart": "{proxy+}",
        "RestApiId": Object {
          "Ref": "myapi162F20B8",
        },
      },
      "Type": "AWS::ApiGateway::Resource",
    },
    "MyTopic86869434": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/MyTopic/Resource",
      },
      "Type": "AWS::SNS::Topic",
    },
    "PingHandler50068074": Object {
      "DependsOn": Array [
        "PingHandlerServiceRole46086423",
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
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-us-east-1",
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip",
        },
        "Handler": "hello.handler",
        "Role": Object {
          "Fn::GetAtt": Array [
            "PingHandlerServiceRole46086423",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
      },
      "Type": "AWS::Lambda::Function",
    },
    "PingHandlerServiceRole46086423": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/PingHandler/ServiceRole/Resource",
      },
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": Object {
                "Service": "lambda.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          Object {
            "Fn::Join": Array [
              "",
              Array [
                "arn:",
                Object {
                  "Ref": "AWS::Partition",
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
              ],
            ],
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "ruleAllowEventRuleCdkGeneralStackTestUSHelloHandlerC75B8B54C6DD839C": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/rule/AllowEventRuleCdkGeneralStackTestUSHelloHandlerC75B8B54",
      },
      "Properties": Object {
        "Action": "lambda:InvokeFunction",
        "FunctionName": Object {
          "Fn::GetAtt": Array [
            "HelloHandler2E4FBA4D",
            "Arn",
          ],
        },
        "Principal": "events.amazonaws.com",
        "SourceArn": Object {
          "Fn::GetAtt": Array [
            "ruleF2C1DCDC",
            "Arn",
          ],
        },
      },
      "Type": "AWS::Lambda::Permission",
    },
    "ruleF2C1DCDC": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/rule/Resource",
      },
      "Properties": Object {
        "EventPattern": Object {
          "source": Array [
            "aws.ec2",
          ],
        },
        "State": "ENABLED",
        "Targets": Array [
          Object {
            "Arn": Object {
              "Fn::GetAtt": Array [
                "HelloHandler2E4FBA4D",
                "Arn",
              ],
            },
            "DeadLetterConfig": Object {
              "Arn": Object {
                "Fn::GetAtt": Array [
                  "DeadLetterQueue9F481546",
                  "Arn",
                ],
              },
            },
            "Id": "Target0",
            "RetryPolicy": Object {
              "MaximumEventAgeInSeconds": 7200,
              "MaximumRetryAttempts": 2,
            },
          },
        ],
      },
      "Type": "AWS::Events::Rule",
    },
    "slicWatchApi4XXErrorAlarmmyapi": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "API Gateway 4XXError Average for myapi breaches 0.05",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "ApiGW_4XXError_myapi",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "ApiName",
            "Value": "myapi",
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "4XXError",
        "Namespace": "AWS/ApiGateway",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 0.05,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchApi5XXErrorAlarmmyapi": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "API Gateway 5XXError Average for myapi breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "ApiGW_5XXError_myapi",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "ApiName",
            "Value": "myapi",
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "5XXError",
        "Namespace": "AWS/ApiGateway",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchApiLatencyAlarmmyapi": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "API Gateway Latency p99 for myapi breaches 5000",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "ApiGW_Latency_myapi",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "ApiName",
            "Value": "myapi",
          },
        ],
        "EvaluationPeriods": 1,
        "ExtendedStatistic": "p99",
        "MetricName": "Latency",
        "Namespace": "AWS/ApiGateway",
        "OKActions": Array [],
        "Period": 60,
        "Threshold": 5000,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchDashboard": Object {
      "Properties": Object {
        "DashboardBody": Object {
          "Fn::Sub": "{\\"start\\":\\"-PT3H\\",\\"widgets\\":[{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/ApiGateway\\",\\"5XXError\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"5XXError API myapi\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":0},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/ApiGateway\\",\\"5XXError\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/ApiGateway\\",\\"4XXError\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"4XXError API myapi\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":0},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/ApiGateway\\",\\"5XXError\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/ApiGateway\\",\\"4XXError\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/ApiGateway\\",\\"Latency\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/ApiGateway\\",\\"Latency\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"p95\\"}]],\\"title\\":\\"Latency API myapi\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":0},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/ApiGateway\\",\\"5XXError\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/ApiGateway\\",\\"4XXError\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/ApiGateway\\",\\"Latency\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/ApiGateway\\",\\"Latency\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"p95\\"}],[\\"AWS/ApiGateway\\",\\"Count\\",\\"ApiName\\",\\"myapi\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"Count API myapi\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":6},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/DynamoDB\\",\\"ReadThrottleEvents\\",\\"TableName\\",\\"\${TableCD117FA1}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"ReadThrottleEvents Table \${TableCD117FA1}\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":6},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/DynamoDB\\",\\"ReadThrottleEvents\\",\\"TableName\\",\\"\${TableCD117FA1}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/DynamoDB\\",\\"WriteThrottleEvents\\",\\"TableName\\",\\"\${TableCD117FA1}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"WriteThrottleEvents Table \${TableCD117FA1}\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":6},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Errors\\",\\"FunctionName\\",\\"\${HelloHandler2E4FBA4D}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Errors\\",\\"FunctionName\\",\\"\${ThrottlerHandler750A7C89}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Errors\\",\\"FunctionName\\",\\"\${DriveStreamHandler62F1767B}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Errors\\",\\"FunctionName\\",\\"\${DriveQueueHandler9F657A00}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Errors\\",\\"FunctionName\\",\\"\${DriveTableHandler119966B0}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"Lambda Errors Sum per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":12},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Throttles\\",\\"FunctionName\\",\\"\${HelloHandler2E4FBA4D}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Throttles\\",\\"FunctionName\\",\\"\${ThrottlerHandler750A7C89}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Throttles\\",\\"FunctionName\\",\\"\${DriveStreamHandler62F1767B}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Throttles\\",\\"FunctionName\\",\\"\${DriveQueueHandler9F657A00}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Throttles\\",\\"FunctionName\\",\\"\${DriveTableHandler119966B0}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"Lambda Throttles Sum per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":12},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${HelloHandler2E4FBA4D}\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${ThrottlerHandler750A7C89}\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${DriveStreamHandler62F1767B}\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${DriveQueueHandler9F657A00}\\",{\\"stat\\":\\"Average\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${DriveTableHandler119966B0}\\",{\\"stat\\":\\"Average\\"}]],\\"title\\":\\"Lambda Duration Average per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":12},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${HelloHandler2E4FBA4D}\\",{\\"stat\\":\\"p95\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${ThrottlerHandler750A7C89}\\",{\\"stat\\":\\"p95\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${DriveStreamHandler62F1767B}\\",{\\"stat\\":\\"p95\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${DriveQueueHandler9F657A00}\\",{\\"stat\\":\\"p95\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${DriveTableHandler119966B0}\\",{\\"stat\\":\\"p95\\"}]],\\"title\\":\\"Lambda Duration p95 per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":18},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${HelloHandler2E4FBA4D}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${ThrottlerHandler750A7C89}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${DriveStreamHandler62F1767B}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${DriveQueueHandler9F657A00}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${DriveTableHandler119966B0}\\",{\\"stat\\":\\"Maximum\\"}]],\\"title\\":\\"Lambda Duration Maximum per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":18},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Invocations\\",\\"FunctionName\\",\\"\${HelloHandler2E4FBA4D}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Invocations\\",\\"FunctionName\\",\\"\${ThrottlerHandler750A7C89}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Invocations\\",\\"FunctionName\\",\\"\${DriveStreamHandler62F1767B}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Invocations\\",\\"FunctionName\\",\\"\${DriveQueueHandler9F657A00}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Lambda\\",\\"Invocations\\",\\"FunctionName\\",\\"\${DriveTableHandler119966B0}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"Lambda Invocations Sum per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":18},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"ConcurrentExecutions\\",\\"FunctionName\\",\\"\${HelloHandler2E4FBA4D}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"ConcurrentExecutions\\",\\"FunctionName\\",\\"\${ThrottlerHandler750A7C89}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"ConcurrentExecutions\\",\\"FunctionName\\",\\"\${DriveStreamHandler62F1767B}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"ConcurrentExecutions\\",\\"FunctionName\\",\\"\${DriveQueueHandler9F657A00}\\",{\\"stat\\":\\"Maximum\\"}],[\\"AWS/Lambda\\",\\"ConcurrentExecutions\\",\\"FunctionName\\",\\"\${DriveTableHandler119966B0}\\",{\\"stat\\":\\"Maximum\\"}]],\\"title\\":\\"Lambda ConcurrentExecutions Maximum per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":24},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/SQS\\",\\"NumberOfMessagesSent\\",\\"QueueName\\",\\"\${DeadLetterQueue9F481546.QueueName}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/SQS\\",\\"NumberOfMessagesReceived\\",\\"QueueName\\",\\"\${DeadLetterQueue9F481546.QueueName}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/SQS\\",\\"NumberOfMessagesDeleted\\",\\"QueueName\\",\\"\${DeadLetterQueue9F481546.QueueName}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"Messages \${DeadLetterQueue9F481546.QueueName} SQS\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":24},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/SQS\\",\\"ApproximateAgeOfOldestMessage\\",\\"QueueName\\",\\"\${DeadLetterQueue9F481546.QueueName}\\",{\\"stat\\":\\"Maximum\\"}]],\\"title\\":\\"Oldest Message age \${DeadLetterQueue9F481546.QueueName} SQS\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":24},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/SQS\\",\\"ApproximateNumberOfMessagesVisible\\",\\"QueueName\\",\\"\${DeadLetterQueue9F481546.QueueName}\\",{\\"stat\\":\\"Maximum\\"}]],\\"title\\":\\"Messages in queue \${DeadLetterQueue9F481546.QueueName} SQS\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":30},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/SNS\\",\\"NumberOfNotificationsFilteredOut-InvalidAttributes\\",\\"TopicName\\",\\"\${MyTopic86869434.TopicName}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/SNS\\",\\"NumberOfNotificationsFailed\\",\\"TopicName\\",\\"\${MyTopic86869434.TopicName}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"SNS Topic \${MyTopic86869434.TopicName}\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":30},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Events\\",\\"FailedInvocations\\",\\"RuleName\\",\\"\${ruleF2C1DCDC}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Events\\",\\"ThrottledRules\\",\\"RuleName\\",\\"\${ruleF2C1DCDC}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/Events\\",\\"Invocations\\",\\"RuleName\\",\\"\${ruleF2C1DCDC}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"EventBridge Rule \${ruleF2C1DCDC}\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":30}]}",
        },
        "DashboardName": Object {
          "Fn::Sub": "\${AWS::StackName}-\${AWS::Region}-Dashboard",
        },
      },
      "Type": "AWS::CloudWatch::Dashboard",
    },
    "slicWatchEventsFailedInvocationsAlarmRuleF2C1DCDC": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "EventBridge FailedInvocations for \${ruleF2C1DCDC} breaches 1",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Events_FailedInvocations_Alarm_\${ruleF2C1DCDC}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "RuleName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "ruleF2C1DCDC",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "FailedInvocations",
        "Namespace": "AWS/Events",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchEventsThrottledRulesAlarmRuleF2C1DCDC": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "EventBridge ThrottledRules for \${ruleF2C1DCDC} breaches 1",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Events_ThrottledRules_Alarm_\${ruleF2C1DCDC}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "RuleName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "ruleF2C1DCDC",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ThrottledRules",
        "Namespace": "AWS/Events",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaDurationAlarmDriveQueueHandler9F657A00": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Max duration for \${DriveQueueHandler9F657A00} breaches 95% of timeout (3)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Duration_\${DriveQueueHandler9F657A00}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "DriveQueueHandler9F657A00",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaDurationAlarmDriveStreamHandler62F1767B": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Max duration for \${DriveStreamHandler62F1767B} breaches 95% of timeout (3)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Duration_\${DriveStreamHandler62F1767B}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "DriveStreamHandler62F1767B",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaDurationAlarmDriveTableHandler119966B0": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Max duration for \${DriveTableHandler119966B0} breaches 95% of timeout (3)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Duration_\${DriveTableHandler119966B0}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "DriveTableHandler119966B0",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaDurationAlarmHelloHandler2E4FBA4D": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Max duration for \${HelloHandler2E4FBA4D} breaches 95% of timeout (3)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Duration_\${HelloHandler2E4FBA4D}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "HelloHandler2E4FBA4D",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaDurationAlarmPingHandler50068074": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Max duration for \${PingHandler50068074} breaches 95% of timeout (3)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Duration_\${PingHandler50068074}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "PingHandler50068074",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaDurationAlarmThrottlerHandler750A7C89": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Max duration for \${ThrottlerHandler750A7C89} breaches 95% of timeout (3)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Duration_\${ThrottlerHandler750A7C89}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "ThrottlerHandler750A7C89",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaErrorsAlarmDriveQueueHandler9F657A00": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Error count for \${DriveQueueHandler9F657A00} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Errors_\${DriveQueueHandler9F657A00}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "DriveQueueHandler9F657A00",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaErrorsAlarmDriveStreamHandler62F1767B": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Error count for \${DriveStreamHandler62F1767B} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Errors_\${DriveStreamHandler62F1767B}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "DriveStreamHandler62F1767B",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaErrorsAlarmDriveTableHandler119966B0": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Error count for \${DriveTableHandler119966B0} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Errors_\${DriveTableHandler119966B0}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "DriveTableHandler119966B0",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaErrorsAlarmHelloHandler2E4FBA4D": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Error count for \${HelloHandler2E4FBA4D} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Errors_\${HelloHandler2E4FBA4D}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "HelloHandler2E4FBA4D",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaErrorsAlarmPingHandler50068074": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Error count for \${PingHandler50068074} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Errors_\${PingHandler50068074}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "PingHandler50068074",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaErrorsAlarmThrottlerHandler750A7C89": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Error count for \${ThrottlerHandler750A7C89} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Errors_\${ThrottlerHandler750A7C89}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "ThrottlerHandler750A7C89",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaInvocationsAlarmDriveQueueHandler9F657A00": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Total invocations for \${DriveQueueHandler9F657A00} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Invocations_\${DriveQueueHandler9F657A00}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "DriveQueueHandler9F657A00",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaInvocationsAlarmDriveStreamHandler62F1767B": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Total invocations for \${DriveStreamHandler62F1767B} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Invocations_\${DriveStreamHandler62F1767B}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "DriveStreamHandler62F1767B",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaInvocationsAlarmDriveTableHandler119966B0": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Total invocations for \${DriveTableHandler119966B0} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Invocations_\${DriveTableHandler119966B0}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "DriveTableHandler119966B0",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaInvocationsAlarmHelloHandler2E4FBA4D": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Total invocations for \${HelloHandler2E4FBA4D} breaches 4",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Invocations_\${HelloHandler2E4FBA4D}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "HelloHandler2E4FBA4D",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 4,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaInvocationsAlarmPingHandler50068074": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Total invocations for \${PingHandler50068074} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Invocations_\${PingHandler50068074}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "PingHandler50068074",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaInvocationsAlarmThrottlerHandler750A7C89": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Total invocations for \${ThrottlerHandler750A7C89} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Invocations_\${ThrottlerHandler750A7C89}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "ThrottlerHandler750A7C89",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaThrottlesAlarmDriveQueueHandler9F657A00": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Throttles % for \${DriveQueueHandler9F657A00} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Throttles_\${DriveQueueHandler9F657A00}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": Array [
          Object {
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Id": "throttles_pc",
            "Label": "% Throttles",
            "ReturnData": true,
          },
          Object {
            "Id": "throttles",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "DriveQueueHandler9F657A00",
                    },
                  },
                ],
                "MetricName": "Throttles",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
          Object {
            "Id": "invocations",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "DriveQueueHandler9F657A00",
                    },
                  },
                ],
                "MetricName": "Invocations",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
        ],
        "OKActions": Array [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaThrottlesAlarmDriveStreamHandler62F1767B": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Throttles % for \${DriveStreamHandler62F1767B} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Throttles_\${DriveStreamHandler62F1767B}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": Array [
          Object {
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Id": "throttles_pc",
            "Label": "% Throttles",
            "ReturnData": true,
          },
          Object {
            "Id": "throttles",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "DriveStreamHandler62F1767B",
                    },
                  },
                ],
                "MetricName": "Throttles",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
          Object {
            "Id": "invocations",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "DriveStreamHandler62F1767B",
                    },
                  },
                ],
                "MetricName": "Invocations",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
        ],
        "OKActions": Array [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaThrottlesAlarmDriveTableHandler119966B0": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Throttles % for \${DriveTableHandler119966B0} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Throttles_\${DriveTableHandler119966B0}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": Array [
          Object {
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Id": "throttles_pc",
            "Label": "% Throttles",
            "ReturnData": true,
          },
          Object {
            "Id": "throttles",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "DriveTableHandler119966B0",
                    },
                  },
                ],
                "MetricName": "Throttles",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
          Object {
            "Id": "invocations",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "DriveTableHandler119966B0",
                    },
                  },
                ],
                "MetricName": "Invocations",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
        ],
        "OKActions": Array [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaThrottlesAlarmHelloHandler2E4FBA4D": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Throttles % for \${HelloHandler2E4FBA4D} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Throttles_\${HelloHandler2E4FBA4D}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": Array [
          Object {
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Id": "throttles_pc",
            "Label": "% Throttles",
            "ReturnData": true,
          },
          Object {
            "Id": "throttles",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "HelloHandler2E4FBA4D",
                    },
                  },
                ],
                "MetricName": "Throttles",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
          Object {
            "Id": "invocations",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "HelloHandler2E4FBA4D",
                    },
                  },
                ],
                "MetricName": "Invocations",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
        ],
        "OKActions": Array [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaThrottlesAlarmPingHandler50068074": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Throttles % for \${PingHandler50068074} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Throttles_\${PingHandler50068074}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": Array [
          Object {
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Id": "throttles_pc",
            "Label": "% Throttles",
            "ReturnData": true,
          },
          Object {
            "Id": "throttles",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "PingHandler50068074",
                    },
                  },
                ],
                "MetricName": "Throttles",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
          Object {
            "Id": "invocations",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "PingHandler50068074",
                    },
                  },
                ],
                "MetricName": "Invocations",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
        ],
        "OKActions": Array [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaThrottlesAlarmThrottlerHandler750A7C89": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Throttles % for \${ThrottlerHandler750A7C89} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Throttles_\${ThrottlerHandler750A7C89}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": Array [
          Object {
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Id": "throttles_pc",
            "Label": "% Throttles",
            "ReturnData": true,
          },
          Object {
            "Id": "throttles",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "ThrottlerHandler750A7C89",
                    },
                  },
                ],
                "MetricName": "Throttles",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
          Object {
            "Id": "invocations",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "ThrottlerHandler750A7C89",
                    },
                  },
                ],
                "MetricName": "Invocations",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
        ],
        "OKActions": Array [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchSNSNumberOfNotificationsFailedAlarmMyTopic86869434": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SNS NumberOfNotificationsFailed for \${MyTopic86869434.TopicName} breaches 1",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SNS_NumberOfNotificationsFailed_Alarm_\${MyTopic86869434.TopicName}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TopicName",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "MyTopic86869434",
                "TopicName",
              ],
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "NumberOfNotificationsFailed",
        "Namespace": "AWS/SNS",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchSNSNumberOfNotificationsFilteredOutInvalidAttributesAlarmMyTopic86869434": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SNS NumberOfNotificationsFilteredOutInvalidAttributes for \${MyTopic86869434.TopicName} breaches 1",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SNS_NumberOfNotificationsFilteredOutInvalidAttributes_Alarm_\${MyTopic86869434.TopicName}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TopicName",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "MyTopic86869434",
                "TopicName",
              ],
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "NumberOfNotificationsFilteredOut-InvalidAttributes",
        "Namespace": "AWS/SNS",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchSQSInFlightMsgsAlarmDeadLetterQueue9F481546": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SQS in-flight messages for \${DeadLetterQueue9F481546.QueueName} breaches 1200 (1% of the hard limit of 120000)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SQS_ApproximateNumberOfMessagesNotVisible_\${DeadLetterQueue9F481546.QueueName}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "QueueName",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "DeadLetterQueue9F481546",
                "QueueName",
              ],
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ApproximateNumberOfMessagesNotVisible",
        "Namespace": "AWS/SQS",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 1200,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchSQSOldestMsgAgeAlarmDeadLetterQueue9F481546": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SQS age of oldest message in the queue \${DeadLetterQueue9F481546.QueueName} breaches 60",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SQS_ApproximateAgeOfOldestMessage_\${DeadLetterQueue9F481546.QueueName}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "QueueName",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "DeadLetterQueue9F481546",
                "QueueName",
              ],
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ApproximateAgeOfOldestMessage",
        "Namespace": "AWS/SQS",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 60,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchTableReadThrottleEventsAlarmTableCD117FA1": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DynamoDB Sum for \${TableCD117FA1} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DDB_ReadThrottleEvents_Alarm_\${TableCD117FA1}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TableName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "TableCD117FA1",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ReadThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchTableSystemErrorsAlarmTableCD117FA1": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DynamoDB Sum for \${TableCD117FA1} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DDB_SystemErrors_Alarm_\${TableCD117FA1}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TableName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "TableCD117FA1",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "SystemErrors",
        "Namespace": "AWS/DynamoDB",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchTableUserErrorsAlarmTableCD117FA1": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DynamoDB Sum for \${TableCD117FA1} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DDB_UserErrors_Alarm_\${TableCD117FA1}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TableName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "TableCD117FA1",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "UserErrors",
        "Namespace": "AWS/DynamoDB",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchTableWriteThrottleEventsAlarmTableCD117FA1": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [
          Object {
            "Ref": "MyTopic86869434",
          },
        ],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DynamoDB Sum for \${TableCD117FA1} breaches 10",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "DDB_WriteThrottleEvents_Alarm_\${TableCD117FA1}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TableName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "TableCD117FA1",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "WriteThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 10,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "TableCD117FA1": Object {
      "DeletionPolicy": "Retain",
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/Table/Resource",
      },
      "Properties": Object {
        "AttributeDefinitions": Array [
          Object {
            "AttributeName": "id",
            "AttributeType": "S",
          },
        ],
        "BillingMode": "PAY_PER_REQUEST",
        "KeySchema": Array [
          Object {
            "AttributeName": "id",
            "KeyType": "HASH",
          },
        ],
      },
      "Type": "AWS::DynamoDB::Table",
      "UpdateReplacePolicy": "Retain",
    },
    "ThrottlerHandler750A7C89": Object {
      "DependsOn": Array [
        "ThrottlerHandlerServiceRoleA0481DAF",
      ],
      "Metadata": Object {
        "aws:asset:is-bundled": false,
        "aws:asset:path": "asset.03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640",
        "aws:asset:property": "Code",
        "aws:cdk:path": "CdkGeneralStackTest-US/ThrottlerHandler/Resource",
      },
      "Properties": Object {
        "Code": Object {
          "S3Bucket": Object {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-us-east-1",
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip",
        },
        "Handler": "hello.handler",
        "ReservedConcurrentExecutions": 0,
        "Role": Object {
          "Fn::GetAtt": Array [
            "ThrottlerHandlerServiceRoleA0481DAF",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
      },
      "Type": "AWS::Lambda::Function",
    },
    "ThrottlerHandlerServiceRoleA0481DAF": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkGeneralStackTest-US/ThrottlerHandler/ServiceRole/Resource",
      },
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": Object {
                "Service": "lambda.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          Object {
            "Fn::Join": Array [
              "",
              Array [
                "arn:",
                Object {
                  "Ref": "AWS::Partition",
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
              ],
            ],
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
  },
  "Rules": Object {
    "CheckBootstrapVersion": Object {
      "Assertions": Array [
        Object {
          "Assert": Object {
            "Fn::Not": Array [
              Object {
                "Fn::Contains": Array [
                  Array [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                  ],
                  Object {
                    "Ref": "BootstrapVersion",
                  },
                ],
              },
            ],
          },
          "AssertDescription": "CDK bootstrap stack version 6 required. Please run 'cdk bootstrap' with a recent version of the CDK CLI.",
        },
      ],
    },
  },
  "Transform": "SlicWatch-v3",
}
`

exports[`cdk-test-project/tests/snapshot/cdk-test-project-snapshot.test.ts > TAP > cdk-test-project snapshot > stepFunctionStack fragment 1`] = `
Object {
  "Metadata": Object {
    "slicWatch": Object {
      "alarms": Object {
        "Lambda": Object {
          "Invocations": Object {
            "enabled": true,
            "Threshold": 10,
          },
        },
        "SQS": Object {
          "AgeOfOldestMessage": Object {
            "enabled": true,
            "Statistic": "Maximum",
            "Threshold": 60,
          },
          "InFlightMessagesPc": Object {
            "Statistic": "Maximum",
            "Threshold": 1,
          },
        },
      },
      "enabled": true,
      "topicArn": Object {
        "Ref": "MyTopic86869434",
      },
    },
  },
  "Parameters": Object {
    "BootstrapVersion": Object {
      "Default": "/cdk-bootstrap/hnb659fds/version",
      "Description": "Version of the CDK Bootstrap resources in this environment, automatically retrieved from SSM Parameter Store. [cdk:skip]",
      "Type": "AWS::SSM::Parameter::Value<String>",
    },
  },
  "Resources": Object {
    "CDKMetadata": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkSFNStackTest-Europe/CDKMetadata/Default",
      },
      "Properties": Object {
        "Analytics": "v2:deflate64:H4sIAAAAAAAA/11P0UoDQQz8lr7nolaQvtpCoaAgp+Djke6lbbp7u6XZq8iy/+7etoIIgZnJhEwyx8UT3s/oSxvT28bJFtN7JGOhtLqkXjF9hJMYWO18JRkcDdueMK1Hb6IEP1m/PIPQgKkNjqd2xbfgxHxP8soy6GNHqhwVnycoGpejsRyXpAwa+bS77dMuklrFl5q58Zdg/w1g+iSJsCZxsDoEMQzlgcivZA7i6xV/dc7QsobxXOZqeDH34vf12puRwYee8ah3l4cFlprPjirSnEcfZWBsr/gDsE52pTwBAAA=",
      },
      "Type": "AWS::CDK::Metadata",
    },
    "HelloHandler2E4FBA4D": Object {
      "DependsOn": Array [
        "HelloHandlerServiceRole11EF7C63",
      ],
      "Metadata": Object {
        "slicWatch": Object {
          "alarms": Object {
            "Lambda": Object {
              "Invocations": Object {
                "Threshold": 4,
              },
            },
          },
        },
      },
      "Properties": Object {
        "Code": Object {
          "S3Bucket": Object {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-eu-west-1",
          },
          "S3Key": "03015a4df782c6ac9c6d09c548490f98a81c69c44e4262ca4c99d29652f52640.zip",
        },
        "Handler": "hello.handler",
        "Role": Object {
          "Fn::GetAtt": Array [
            "HelloHandlerServiceRole11EF7C63",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
      },
      "Type": "AWS::Lambda::Function",
    },
    "HelloHandlerServiceRole11EF7C63": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkSFNStackTest-Europe/HelloHandler/ServiceRole/Resource",
      },
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": Object {
                "Service": "lambda.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": Array [
          Object {
            "Fn::Join": Array [
              "",
              Array [
                "arn:",
                Object {
                  "Ref": "AWS::Partition",
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
              ],
            ],
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "MyTopic86869434": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkSFNStackTest-Europe/MyTopic/Resource",
      },
      "Type": "AWS::SNS::Topic",
    },
    "slicWatchDashboard": Object {
      "Properties": Object {
        "DashboardBody": Object {
          "Fn::Sub": "{\\"start\\":\\"-PT3H\\",\\"widgets\\":[{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/States\\",\\"ExecutionsFailed\\",\\"StateMachineArn\\",\\"\${StateMachine2E01A3A5}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/States\\",\\"ExecutionThrottled\\",\\"StateMachineArn\\",\\"\${StateMachine2E01A3A5}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/States\\",\\"ExecutionsTimedOut\\",\\"StateMachineArn\\",\\"\${StateMachine2E01A3A5}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"\${StateMachine2E01A3A5.Name} Step Function Executions\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":0},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Errors\\",\\"FunctionName\\",\\"\${HelloHandler2E4FBA4D}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"Lambda Errors Sum per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":0},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Throttles\\",\\"FunctionName\\",\\"\${HelloHandler2E4FBA4D}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"Lambda Throttles Sum per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":0},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${HelloHandler2E4FBA4D}\\",{\\"stat\\":\\"Average\\"}]],\\"title\\":\\"Lambda Duration Average per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":6},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${HelloHandler2E4FBA4D}\\",{\\"stat\\":\\"p95\\"}]],\\"title\\":\\"Lambda Duration p95 per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":6},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Duration\\",\\"FunctionName\\",\\"\${HelloHandler2E4FBA4D}\\",{\\"stat\\":\\"Maximum\\"}]],\\"title\\":\\"Lambda Duration Maximum per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":6},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"Invocations\\",\\"FunctionName\\",\\"\${HelloHandler2E4FBA4D}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"Lambda Invocations Sum per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":0,\\"y\\":12},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/Lambda\\",\\"ConcurrentExecutions\\",\\"FunctionName\\",\\"\${HelloHandler2E4FBA4D}\\",{\\"stat\\":\\"Maximum\\"}]],\\"title\\":\\"Lambda ConcurrentExecutions Maximum per Function\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":8,\\"y\\":12},{\\"type\\":\\"metric\\",\\"properties\\":{\\"metrics\\":[[\\"AWS/SNS\\",\\"NumberOfNotificationsFilteredOut-InvalidAttributes\\",\\"TopicName\\",\\"\${MyTopic86869434.TopicName}\\",{\\"stat\\":\\"Sum\\"}],[\\"AWS/SNS\\",\\"NumberOfNotificationsFailed\\",\\"TopicName\\",\\"\${MyTopic86869434.TopicName}\\",{\\"stat\\":\\"Sum\\"}]],\\"title\\":\\"SNS Topic \${MyTopic86869434.TopicName}\\",\\"view\\":\\"timeSeries\\",\\"region\\":\\"\${AWS::Region}\\",\\"period\\":300},\\"width\\":8,\\"height\\":6,\\"x\\":16,\\"y\\":12}]}",
        },
        "DashboardName": Object {
          "Fn::Sub": "\${AWS::StackName}-\${AWS::Region}-Dashboard",
        },
      },
      "Type": "AWS::CloudWatch::Dashboard",
    },
    "slicWatchLambdaDurationAlarmHelloHandler2E4FBA4D": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Max duration for \${HelloHandler2E4FBA4D} breaches 95% of timeout (3)",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Duration_\${HelloHandler2E4FBA4D}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "HelloHandler2E4FBA4D",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Duration",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Maximum",
        "Threshold": 2850,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaErrorsAlarmHelloHandler2E4FBA4D": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Error count for \${HelloHandler2E4FBA4D} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Errors_\${HelloHandler2E4FBA4D}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "HelloHandler2E4FBA4D",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Errors",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaInvocationsAlarmHelloHandler2E4FBA4D": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Total invocations for \${HelloHandler2E4FBA4D} breaches 4",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Invocations_\${HelloHandler2E4FBA4D}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "FunctionName",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "HelloHandler2E4FBA4D",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Invocations",
        "Metrics": undefined,
        "Namespace": "AWS/Lambda",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 4,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchLambdaThrottlesAlarmHelloHandler2E4FBA4D": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Throttles % for \${HelloHandler2E4FBA4D} breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "Lambda_Throttles_\${HelloHandler2E4FBA4D}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "EvaluationPeriods": 1,
        "Metrics": Array [
          Object {
            "Expression": "(throttles / ( throttles + invocations )) * 100",
            "Id": "throttles_pc",
            "Label": "% Throttles",
            "ReturnData": true,
          },
          Object {
            "Id": "throttles",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "HelloHandler2E4FBA4D",
                    },
                  },
                ],
                "MetricName": "Throttles",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
          Object {
            "Id": "invocations",
            "MetricStat": Object {
              "Metric": Object {
                "Dimensions": Array [
                  Object {
                    "Name": "FunctionName",
                    "Value": IntrinsicFunction {
                      "name": "Ref",
                      "payload": "HelloHandler2E4FBA4D",
                    },
                  },
                ],
                "MetricName": "Invocations",
                "Namespace": "AWS/Lambda",
              },
              "Period": 60,
              "Stat": "Sum",
            },
            "ReturnData": false,
          },
        ],
        "OKActions": Array [],
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchSNSNumberOfNotificationsFailedAlarmMyTopic86869434": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SNS NumberOfNotificationsFailed for \${MyTopic86869434.TopicName} breaches 1",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SNS_NumberOfNotificationsFailed_Alarm_\${MyTopic86869434.TopicName}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TopicName",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "MyTopic86869434",
                "TopicName",
              ],
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "NumberOfNotificationsFailed",
        "Namespace": "AWS/SNS",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchSNSNumberOfNotificationsFilteredOutInvalidAttributesAlarmMyTopic86869434": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SNS NumberOfNotificationsFilteredOutInvalidAttributes for \${MyTopic86869434.TopicName} breaches 1",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "SNS_NumberOfNotificationsFilteredOutInvalidAttributes_Alarm_\${MyTopic86869434.TopicName}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "TopicName",
            "Value": IntrinsicFunction {
              "name": "Fn::GetAtt",
              "payload": Array [
                "MyTopic86869434",
                "TopicName",
              ],
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "NumberOfNotificationsFilteredOut-InvalidAttributes",
        "Namespace": "AWS/SNS",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 1,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchStatesExecutionsFailedAlarmStateMachine2E01A3A5": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "StepFunctions ExecutionsFailed Sum for \${StateMachine2E01A3A5.Name}  breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "StepFunctions_ExecutionsFailedAlarm_\${StateMachine2E01A3A5.Name}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "StateMachineArn",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "StateMachine2E01A3A5",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ExecutionsFailed",
        "Namespace": "AWS/States",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchStatesExecutionsTimedOutAlarmStateMachine2E01A3A5": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "StepFunctions ExecutionsTimedOut Sum for \${StateMachine2E01A3A5.Name}  breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "StepFunctions_ExecutionsTimedOutAlarm_\${StateMachine2E01A3A5.Name}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "StateMachineArn",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "StateMachine2E01A3A5",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ExecutionsTimedOut",
        "Namespace": "AWS/States",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "slicWatchStatesExecutionThrottledAlarmStateMachine2E01A3A5": Object {
      "Properties": Object {
        "ActionsEnabled": true,
        "AlarmActions": Array [],
        "AlarmDescription": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "StepFunctions ExecutionThrottled Sum for \${StateMachine2E01A3A5.Name}  breaches 0",
            Object {},
          ],
        },
        "AlarmName": IntrinsicFunction {
          "name": "Fn::Sub",
          "payload": Array [
            "StepFunctions_ExecutionThrottledAlarm_\${StateMachine2E01A3A5.Name}",
            Object {},
          ],
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": Array [
          Object {
            "Name": "StateMachineArn",
            "Value": IntrinsicFunction {
              "name": "Ref",
              "payload": "StateMachine2E01A3A5",
            },
          },
        ],
        "EvaluationPeriods": 1,
        "MetricName": "ExecutionThrottled",
        "Namespace": "AWS/States",
        "OKActions": Array [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching",
      },
      "Type": "AWS::CloudWatch::Alarm",
    },
    "StateMachine2E01A3A5": Object {
      "DeletionPolicy": "Delete",
      "DependsOn": Array [
        "StateMachineRoleDefaultPolicyDF1E6607",
        "StateMachineRoleB840431D",
      ],
      "Metadata": Object {
        "aws:cdk:path": "CdkSFNStackTest-Europe/StateMachine/Resource",
      },
      "Properties": Object {
        "DefinitionString": Object {
          "Fn::Join": Array [
            "",
            Array [
              "{\\"StartAt\\":\\"Submit Job\\",\\"States\\":{\\"Submit Job\\":{\\"Next\\":\\"Wait X Seconds\\",\\"Retry\\":[{\\"ErrorEquals\\":[\\"Lambda.ServiceException\\",\\"Lambda.AWSLambdaException\\",\\"Lambda.SdkClientException\\"],\\"IntervalSeconds\\":2,\\"MaxAttempts\\":6,\\"BackoffRate\\":2}],\\"Type\\":\\"Task\\",\\"OutputPath\\":\\"$.Payload\\",\\"Resource\\":\\"arn:",
              Object {
                "Ref": "AWS::Partition",
              },
              ":states:::lambda:invoke\\",\\"Parameters\\":{\\"FunctionName\\":\\"",
              Object {
                "Fn::GetAtt": Array [
                  "HelloHandler2E4FBA4D",
                  "Arn",
                ],
              },
              "\\",\\"Payload.$\\":\\"$\\"}},\\"Wait X Seconds\\":{\\"Type\\":\\"Wait\\",\\"SecondsPath\\":\\"$.waitSeconds\\",\\"Next\\":\\"Get Job Status\\"},\\"Get Job Status\\":{\\"Next\\":\\"Job Complete?\\",\\"Retry\\":[{\\"ErrorEquals\\":[\\"Lambda.ServiceException\\",\\"Lambda.AWSLambdaException\\",\\"Lambda.SdkClientException\\"],\\"IntervalSeconds\\":2,\\"MaxAttempts\\":6,\\"BackoffRate\\":2}],\\"Type\\":\\"Task\\",\\"InputPath\\":\\"$.guid\\",\\"OutputPath\\":\\"$.Payload\\",\\"Resource\\":\\"arn:",
              Object {
                "Ref": "AWS::Partition",
              },
              ":states:::lambda:invoke\\",\\"Parameters\\":{\\"FunctionName\\":\\"",
              Object {
                "Fn::GetAtt": Array [
                  "HelloHandler2E4FBA4D",
                  "Arn",
                ],
              },
              "\\",\\"Payload.$\\":\\"$\\"}},\\"Job Complete?\\":{\\"Type\\":\\"Choice\\",\\"Choices\\":[{\\"Variable\\":\\"$.status\\",\\"StringEquals\\":\\"FAILED\\",\\"Next\\":\\"Job Failed\\"},{\\"Variable\\":\\"$.status\\",\\"StringEquals\\":\\"SUCCEEDED\\",\\"Next\\":\\"Get Final Job Status\\"}],\\"Default\\":\\"Wait X Seconds\\"},\\"Job Failed\\":{\\"Type\\":\\"Fail\\",\\"Error\\":\\"DescribeJob returned FAILED\\",\\"Cause\\":\\"AWS Batch Job Failed\\"},\\"Get Final Job Status\\":{\\"End\\":true,\\"Retry\\":[{\\"ErrorEquals\\":[\\"Lambda.ServiceException\\",\\"Lambda.AWSLambdaException\\",\\"Lambda.SdkClientException\\"],\\"IntervalSeconds\\":2,\\"MaxAttempts\\":6,\\"BackoffRate\\":2}],\\"Type\\":\\"Task\\",\\"InputPath\\":\\"$.guid\\",\\"OutputPath\\":\\"$.Payload\\",\\"Resource\\":\\"arn:",
              Object {
                "Ref": "AWS::Partition",
              },
              ":states:::lambda:invoke\\",\\"Parameters\\":{\\"FunctionName\\":\\"",
              Object {
                "Fn::GetAtt": Array [
                  "HelloHandler2E4FBA4D",
                  "Arn",
                ],
              },
              "\\",\\"Payload.$\\":\\"$\\"}}},\\"TimeoutSeconds\\":300}",
            ],
          ],
        },
        "RoleArn": Object {
          "Fn::GetAtt": Array [
            "StateMachineRoleB840431D",
            "Arn",
          ],
        },
      },
      "Type": "AWS::StepFunctions::StateMachine",
      "UpdateReplacePolicy": "Delete",
    },
    "StateMachineRoleB840431D": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkSFNStackTest-Europe/StateMachine/Role/Resource",
      },
      "Properties": Object {
        "AssumeRolePolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": Object {
                "Service": "states.eu-west-1.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
      },
      "Type": "AWS::IAM::Role",
    },
    "StateMachineRoleDefaultPolicyDF1E6607": Object {
      "Metadata": Object {
        "aws:cdk:path": "CdkSFNStackTest-Europe/StateMachine/Role/DefaultPolicy/Resource",
      },
      "Properties": Object {
        "PolicyDocument": Object {
          "Statement": Array [
            Object {
              "Action": "lambda:InvokeFunction",
              "Effect": "Allow",
              "Resource": Array [
                Object {
                  "Fn::GetAtt": Array [
                    "HelloHandler2E4FBA4D",
                    "Arn",
                  ],
                },
                Object {
                  "Fn::Join": Array [
                    "",
                    Array [
                      Object {
                        "Fn::GetAtt": Array [
                          "HelloHandler2E4FBA4D",
                          "Arn",
                        ],
                      },
                      ":*",
                    ],
                  ],
                },
              ],
            },
          ],
          "Version": "2012-10-17",
        },
        "PolicyName": "StateMachineRoleDefaultPolicyDF1E6607",
        "Roles": Array [
          Object {
            "Ref": "StateMachineRoleB840431D",
          },
        ],
      },
      "Type": "AWS::IAM::Policy",
    },
  },
  "Rules": Object {
    "CheckBootstrapVersion": Object {
      "Assertions": Array [
        Object {
          "Assert": Object {
            "Fn::Not": Array [
              Object {
                "Fn::Contains": Array [
                  Array [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                  ],
                  Object {
                    "Ref": "BootstrapVersion",
                  },
                ],
              },
            ],
          },
          "AssertDescription": "CDK bootstrap stack version 6 required. Please run 'cdk bootstrap' with a recent version of the CDK CLI.",
        },
      ],
    },
  },
  "Transform": "SlicWatch-v3",
}
`

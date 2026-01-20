/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`serverless-test-project-appsync/tests/snapshot/serverless-test-project-appsync-snapshot.test.ts > TAP > the plugin adds SLIC Watch dashboards and alarms to a serverless-generated CloudFormation template with AppSync resources > serverless-test-project-appsync template 1`] = `
{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "The AWS CloudFormation template for this Serverless application",
  "Outputs": {
    "AwesomeappsyncGraphQlApiId": {
      "Export": {
        "Name": {
          "Fn::Sub": "\${AWS::StackName}-AwesomeappsyncGraphQlApiId"
        }
      },
      "Value": {
        "Fn::GetAtt": [
          "AwesomeappsyncGraphQlApi",
          "ApiId"
        ]
      }
    },
    "AwesomeappsyncGraphQlApiUrl": {
      "Export": {
        "Name": {
          "Fn::Sub": "\${AWS::StackName}-AwesomeappsyncGraphQlApiUrl"
        }
      },
      "Value": {
        "Fn::GetAtt": [
          "AwesomeappsyncGraphQlApi",
          "GraphQLUrl"
        ]
      }
    },
    "ServerlessDeploymentBucketName": {
      "Export": {
        "Name": "sls-serverless-test-project-appsync-dev-ServerlessDeploymentBucketName"
      },
      "Value": {
        "Ref": "ServerlessDeploymentBucket"
      }
    }
  },
  "Resources": {
    "AwesomeappsyncGraphQlApi": {
      "Properties": {
        "AdditionalAuthenticationProviders": [],
        "AuthenticationType": "AMAZON_COGNITO_USER_POOLS",
        "Name": "awesome-appsync",
        "UserPoolConfig": {
          "AwsRegion": "eu-west-1",
          "DefaultAction": "ALLOW",
          "UserPoolId": {
            "Ref": "CognitoUserPool"
          }
        },
        "XrayEnabled": false
      },
      "Type": "AWS::AppSync::GraphQLApi"
    },
    "AwesomeappsyncGraphQlDsbooksTable": {
      "Properties": {
        "ApiId": {
          "Fn::GetAtt": [
            "AwesomeappsyncGraphQlApi",
            "ApiId"
          ]
        },
        "DynamoDBConfig": {
          "AwsRegion": "eu-west-1",
          "TableName": {
            "Ref": "BooksTable"
          },
          "UseCallerCredentials": false,
          "Versioned": false
        },
        "Name": "booksTable",
        "ServiceRoleArn": {
          "Fn::GetAtt": [
            "AwesomeappsyncGraphQlDsbooksTableRole",
            "Arn"
          ]
        },
        "Type": "AMAZON_DYNAMODB"
      },
      "Type": "AWS::AppSync::DataSource"
    },
    "AwesomeappsyncGraphQlDsbooksTableRole": {
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "Service": [
                  "appsync.amazonaws.com"
                ]
              },
              "Action": [
                "sts:AssumeRole"
              ]
            }
          ],
          "Version": "2012-10-17"
        },
        "Policies": [
          {
            "PolicyName": "GraphQlDsbooksTablePolicy",
            "PolicyDocument": {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Action": [
                    "dynamodb:DeleteItem",
                    "dynamodb:GetItem",
                    "dynamodb:PutItem",
                    "dynamodb:Query",
                    "dynamodb:Scan",
                    "dynamodb:UpdateItem",
                    "dynamodb:BatchGetItem",
                    "dynamodb:BatchWriteItem",
                    "dynamodb:ConditionCheckItem"
                  ],
                  "Effect": "Allow",
                  "Resource": [
                    {
                      "Fn::Join": [
                        ":",
                        [
                          "arn",
                          "aws",
                          "dynamodb",
                          "eu-west-1",
                          {
                            "Ref": "AWS::AccountId"
                          },
                          {
                            "Fn::Join": [
                              "/",
                              [
                                "table",
                                {
                                  "Ref": "BooksTable"
                                }
                              ]
                            ]
                          }
                        ]
                      ]
                    },
                    {
                      "Fn::Join": [
                        "/",
                        [
                          {
                            "Fn::Join": [
                              ":",
                              [
                                "arn",
                                "aws",
                                "dynamodb",
                                "eu-west-1",
                                {
                                  "Ref": "AWS::AccountId"
                                },
                                {
                                  "Fn::Join": [
                                    "/",
                                    [
                                      "table",
                                      {
                                        "Ref": "BooksTable"
                                      }
                                    ]
                                  ]
                                }
                              ]
                            ]
                          },
                          "*"
                        ]
                      ]
                    }
                  ]
                }
              ]
            }
          }
        ]
      },
      "Type": "AWS::IAM::Role"
    },
    "AwesomeappsyncGraphQlResolverMutationcreateBook": {
      "DependsOn": "AwesomeappsyncGraphQlSchema",
      "Properties": {
        "ApiId": {
          "Fn::GetAtt": [
            "AwesomeappsyncGraphQlApi",
            "ApiId"
          ]
        },
        "DataSourceName": {
          "Fn::GetAtt": [
            "AwesomeappsyncGraphQlDsbooksTable",
            "Name"
          ]
        },
        "FieldName": "createBook",
        "Kind": "UNIT",
        "RequestMappingTemplate": "{\\n    \\"version\\" : \\"2018-05-29\\",\\n    \\"operation\\" : \\"PutItem\\",\\n    \\"key\\": {\\n        \\"bookId\\" : $util.dynamodb.toDynamoDBJson($util.autoId())\\n    },\\n    \\"attributeValues\\" : {\\n        \\"title\\" : $util.dynamodb.toDynamoDBJson($context.arguments.newBook.title),\\n        \\"description\\" : $util.dynamodb.toDynamoDBJson($context.arguments.newBook.description),\\n        \\"imageUrl\\" : $util.dynamodb.toDynamoDBJson($context.arguments.newBook.imageUrl),\\n        \\"author\\" : $util.dynamodb.toDynamoDBJson($context.arguments.newBook.author),\\n        \\"price\\" : $util.dynamodb.toDynamoDBJson($context.arguments.newBook.price),\\n        \\"createdAt\\": $util.dynamodb.toDynamoDBJson($util.time.nowISO8601()),\\n        \\"updatedAt\\": $util.dynamodb.toDynamoDBJson($util.time.nowISO8601())\\n    }\\n}",
        "ResponseMappingTemplate": "$util.toJson($context.result)",
        "TypeName": "Mutation"
      },
      "Type": "AWS::AppSync::Resolver"
    },
    "AwesomeappsyncGraphQlResolverQuerygetBookById": {
      "DependsOn": "AwesomeappsyncGraphQlSchema",
      "Properties": {
        "ApiId": {
          "Fn::GetAtt": [
            "AwesomeappsyncGraphQlApi",
            "ApiId"
          ]
        },
        "DataSourceName": {
          "Fn::GetAtt": [
            "AwesomeappsyncGraphQlDsbooksTable",
            "Name"
          ]
        },
        "FieldName": "getBookById",
        "Kind": "UNIT",
        "RequestMappingTemplate": "#if ($context.info.selectionSetList.size() == 1 && $context.info.selectionSetList[0] == \\"id\\")\\n  #set ($result = { \\"id\\": \\"$context.source.otherUserId\\" })\\n\\n  #return($result)\\n#end\\n\\n{\\n  \\"version\\" : \\"2018-05-29\\",\\n  \\"operation\\" : \\"GetItem\\",\\n  \\"key\\" : {\\n    \\"bookId\\" : $util.dynamodb.toDynamoDBJson($context.arguments.bookId)\\n  }\\n}",
        "ResponseMappingTemplate": "$util.toJson($context.result)",
        "TypeName": "Query"
      },
      "Type": "AWS::AppSync::Resolver"
    },
    "AwesomeappsyncGraphQlSchema": {
      "Properties": {
        "ApiId": {
          "Fn::GetAtt": [
            "AwesomeappsyncGraphQlApi",
            "ApiId"
          ]
        },
        "Definition": "schema {\\n  query: Query\\n  mutation: Mutation\\n  subscription: Subscription\\n}\\n\\ntype Subscription {\\n  onCreateBook: Book @aws_subscribe(mutations: [\\"createBook\\"])\\n}\\n\\ntype Query {\\n  getBookById(bookId: ID!): Book!\\n}\\n\\ntype Book {\\n  bookId: ID!\\n  title: String!\\n  description: String\\n  imageUrl: AWSURL\\n  author: String!\\n  price: Float!\\n  createdAt: AWSDateTime!\\n  updatedAt: AWSDateTime!\\n}\\n\\ntype Mutation {\\n  createBook(newBook: BookInput): Book! @aws_auth(cognito_groups: [\\"Admin\\"])\\n}\\n\\ninput BookInput {\\n  title: String!\\n  description: String\\n  imageUrl: AWSURL\\n  author: String!\\n  price: Float!\\n}"
      },
      "Type": "AWS::AppSync::GraphQLSchema"
    },
    "BooksTable": {
      "Properties": {
        "AttributeDefinitions": [
          {
            "AttributeName": "bookId",
            "AttributeType": "S"
          }
        ],
        "BillingMode": "PAY_PER_REQUEST",
        "KeySchema": [
          {
            "AttributeName": "bookId",
            "KeyType": "HASH"
          }
        ],
        "Tags": [
          {
            "Key": "Name",
            "Value": "books-table"
          }
        ]
      },
      "Type": "AWS::DynamoDB::Table"
    },
    "bucket": {
      "Type": "AWS::S3::Bucket"
    },
    "CognitoAdminGroup": {
      "Properties": {
        "Description": "Admin users belong to this group",
        "GroupName": "Admin",
        "RoleArn": {
          "Fn::GetAtt": [
            "CognitoAdminIAMrole",
            "Arn"
          ]
        },
        "UserPoolId": {
          "Ref": "CognitoUserPool"
        }
      },
      "Type": "AWS::Cognito::UserPoolGroup"
    },
    "CognitoAdminIAMrole": {
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "Federated": [
                  "cognito-identity.amazonaws.com"
                ]
              },
              "Action": [
                "sts:AssumeRoleWithWebIdentity"
              ]
            }
          ],
          "Version": "2012-10-17"
        },
        "Description": "This is the IAM role that admin group users name",
        "Policies": [
          {
            "PolicyName": "bookstore-admin-group-policy",
            "PolicyDocument": {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Effect": "Allow",
                  "Action": [
                    "dynamodb:*"
                  ],
                  "Resource": [
                    {
                      "Fn::GetAtt": [
                        "BooksTable",
                        "Arn"
                      ]
                    }
                  ]
                }
              ]
            }
          }
        ],
        "RoleName": "bookstore-admin-role"
      },
      "Type": "AWS::IAM::Role"
    },
    "CognitoCustomerGroup": {
      "Properties": {
        "Description": "Customer belongs to this group",
        "GroupName": "Customer",
        "RoleArn": {
          "Fn::GetAtt": [
            "CognitoUserIAMrole",
            "Arn"
          ]
        },
        "UserPoolId": {
          "Ref": "CognitoUserPool"
        }
      },
      "Type": "AWS::Cognito::UserPoolGroup"
    },
    "CognitoUserIAMrole": {
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "Federated": [
                  "cognito-identity.amazonaws.com"
                ]
              },
              "Action": [
                "sts:AssumeRoleWithWebIdentity"
              ]
            }
          ],
          "Version": "2012-10-17"
        },
        "Description": "This is the IAM role that admin group users name",
        "Policies": [
          {
            "PolicyName": "book-store-customer-group-policy",
            "PolicyDocument": {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Effect": "Allow",
                  "Action": [
                    "dynamodb:GetItem",
                    "dynamodb:Query",
                    "dynamodb:BatchGetItem"
                  ],
                  "Resource": [
                    {
                      "Fn::GetAtt": [
                        "BooksTable",
                        "Arn"
                      ]
                    }
                  ]
                }
              ]
            }
          }
        ],
        "RoleName": "bookstore-customer-role"
      },
      "Type": "AWS::IAM::Role"
    },
    "CognitoUserPool": {
      "Properties": {
        "AutoVerifiedAttributes": [
          "email"
        ],
        "Policies": {
          "PasswordPolicy": {
            "MinimumLength": 8,
            "RequireLowercase": false,
            "RequireNumbers": false,
            "RequireSymbols": false,
            "RequireUppercase": false
          }
        },
        "Schema": [
          {
            "AttributeDataType": "String",
            "Name": "name",
            "Required": false,
            "Mutable": true
          }
        ],
        "UsernameAttributes": [
          "email"
        ],
        "UserPoolName": "BookStoreUserPool"
      },
      "Type": "AWS::Cognito::UserPool"
    },
    "CognitoUserPoolClient": {
      "Properties": {
        "ClientName": "web",
        "ExplicitAuthFlows": [
          "ALLOW_USER_SRP_AUTH",
          "ALLOW_USER_PASSWORD_AUTH",
          "ALLOW_REFRESH_TOKEN_AUTH"
        ],
        "PreventUserExistenceErrors": "ENABLED",
        "UserPoolId": {
          "Ref": "CognitoUserPool"
        }
      },
      "Type": "AWS::Cognito::UserPoolClient"
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
    "slicWatchAppSync5XXErrorAlarmawesomeappsync": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": "AppSync 5XXError Sum for awesome-appsync breaches 0",
        "AlarmName": "AppSync_5XXErrorAlarm_awesome-appsync",
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "GraphQLAPIId",
            "Value": {
              "Fn::GetAtt": [
                "AwesomeappsyncGraphQlApi",
                "ApiId"
              ]
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "5XXError",
        "Namespace": "AWS/AppSync",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Sum",
        "Threshold": 0,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchAppSyncLatencyAlarmawesomeappsync": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": "AppSync Latency Average for awesome-appsync breaches 0",
        "AlarmName": "AppSync_LatencyAlarm_awesome-appsync",
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "GraphQLAPIId",
            "Value": {
              "Fn::GetAtt": [
                "AwesomeappsyncGraphQlApi",
                "ApiId"
              ]
            }
          }
        ],
        "EvaluationPeriods": 1,
        "MetricName": "Latency",
        "Namespace": "AWS/AppSync",
        "OKActions": [],
        "Period": 60,
        "Statistic": "Average",
        "Threshold": 0,
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
                      "AWS/DynamoDB",
                      "ReadThrottleEvents",
                      "TableName",
                      "\${BooksTable}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "ReadThrottleEvents Table \${BooksTable}",
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
                      "WriteThrottleEvents",
                      "TableName",
                      "\${BooksTable}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "WriteThrottleEvents Table \${BooksTable}",
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
                      "AWS/AppSync",
                      "5XXError",
                      "GraphQLAPIId",
                      "\${AwesomeappsyncGraphQlApi.ApiId}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/AppSync",
                      "4XXError",
                      "GraphQLAPIId",
                      "\${AwesomeappsyncGraphQlApi.ApiId}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/AppSync",
                      "Latency",
                      "GraphQLAPIId",
                      "\${AwesomeappsyncGraphQlApi.ApiId}",
                      {
                        "stat": "Average",
                        "yAxis": "right"
                      }
                    ],
                    [
                      "AWS/AppSync",
                      "Requests",
                      "GraphQLAPIId",
                      "\${AwesomeappsyncGraphQlApi.ApiId}",
                      {
                        "stat": "Maximum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "AppSync API awesome-appsync",
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
                      "AWS/AppSync",
                      "ConnectServerError",
                      "GraphQLAPIId",
                      "\${AwesomeappsyncGraphQlApi.ApiId}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/AppSync",
                      "DisconnectServerError",
                      "GraphQLAPIId",
                      "\${AwesomeappsyncGraphQlApi.ApiId}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/AppSync",
                      "SubscribeServerError",
                      "GraphQLAPIId",
                      "\${AwesomeappsyncGraphQlApi.ApiId}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/AppSync",
                      "UnsubscribeServerError",
                      "GraphQLAPIId",
                      "\${AwesomeappsyncGraphQlApi.ApiId}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ],
                    [
                      "AWS/AppSync",
                      "PublishDataMessageServerError",
                      "GraphQLAPIId",
                      "\${AwesomeappsyncGraphQlApi.ApiId}",
                      {
                        "stat": "Sum",
                        "yAxis": "left"
                      }
                    ]
                  ],
                  "title": "AppSync Real-time Subscriptions awesome-appsync",
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
                "x": 8,
                "y": 6
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
                "x": 16,
                "y": 6
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
                "x": 0,
                "y": 12
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
                "x": 8,
                "y": 12
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
                "x": 16,
                "y": 12
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
                "x": 0,
                "y": 18
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
                "x": 8,
                "y": 18
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
                "x": 16,
                "y": 18
              }
            ]
          }
        }
      },
      "Type": "AWS::CloudWatch::Dashboard"
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
        "OKActions": [],
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
        "OKActions": [],
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
        "OKActions": [],
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
        "OKActions": [],
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
        "OKActions": [],
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
        "OKActions": [],
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
        "OKActions": [],
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
        "OKActions": [],
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
        "OKActions": [],
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
        "OKActions": [],
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
        "OKActions": [],
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
        "OKActions": [],
        "Period": 60,
        "Threshold": 5000,
        "TreatMissingData": "notBreaching"
      },
      "Type": "AWS::CloudWatch::Alarm"
    },
    "slicWatchTableReadThrottleEventsAlarmBooksTable": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${BooksTable} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "DDB_ReadThrottleEvents_Alarm_\${BooksTable}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "BooksTable"
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
    "slicWatchTableSystemErrorsAlarmBooksTable": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${BooksTable} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "DDB_SystemErrors_Alarm_\${BooksTable}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "BooksTable"
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
    "slicWatchTableUserErrorsAlarmBooksTable": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${BooksTable} breaches 0",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "DDB_UserErrors_Alarm_\${BooksTable}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "BooksTable"
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
    "slicWatchTableWriteThrottleEventsAlarmBooksTable": {
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "\${env:ALARM_TOPIC}"
        ],
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${BooksTable} breaches 10",
            {}
          ]
        },
        "AlarmName": {
          "Fn::Sub": [
            "DDB_WriteThrottleEvents_Alarm_\${BooksTable}",
            {}
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "BooksTable"
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
    }
  }
}
`

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
    "bucket": {
      "Type": "AWS::S3::Bucket"
    },
    "BooksTable": {
      "Type": "AWS::DynamoDB::Table",
      "Properties": {
        "BillingMode": "PAY_PER_REQUEST",
        "KeySchema": [
          {
            "AttributeName": "bookId",
            "KeyType": "HASH"
          }
        ],
        "AttributeDefinitions": [
          {
            "AttributeName": "bookId",
            "AttributeType": "S"
          }
        ],
        "Tags": [
          {
            "Key": "Name",
            "Value": "books-table"
          }
        ]
      }
    },
    "CognitoUserPool": {
      "Type": "AWS::Cognito::UserPool",
      "Properties": {
        "AutoVerifiedAttributes": [
          "email"
        ],
        "Policies": {
          "PasswordPolicy": {
            "MinimumLength": 8,
            "RequireLowercase": false,
            "RequireNumbers": false,
            "RequireUppercase": false,
            "RequireSymbols": false
          }
        },
        "UsernameAttributes": [
          "email"
        ],
        "Schema": [
          {
            "AttributeDataType": "String",
            "Name": "name",
            "Required": false,
            "Mutable": true
          }
        ],
        "UserPoolName": "BookStoreUserPool"
      }
    },
    "CognitoUserPoolClient": {
      "Type": "AWS::Cognito::UserPoolClient",
      "Properties": {
        "UserPoolId": {
          "Ref": "CognitoUserPool"
        },
        "ClientName": "web",
        "ExplicitAuthFlows": [
          "ALLOW_USER_SRP_AUTH",
          "ALLOW_USER_PASSWORD_AUTH",
          "ALLOW_REFRESH_TOKEN_AUTH"
        ],
        "PreventUserExistenceErrors": "ENABLED"
      }
    },
    "CognitoAdminGroup": {
      "Type": "AWS::Cognito::UserPoolGroup",
      "Properties": {
        "UserPoolId": {
          "Ref": "CognitoUserPool"
        },
        "GroupName": "Admin",
        "RoleArn": {
          "Fn::GetAtt": [
            "CognitoAdminIAMrole",
            "Arn"
          ]
        },
        "Description": "Admin users belong to this group"
      }
    },
    "CognitoAdminIAMrole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
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
          ]
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
      }
    },
    "CognitoCustomerGroup": {
      "Type": "AWS::Cognito::UserPoolGroup",
      "Properties": {
        "UserPoolId": {
          "Ref": "CognitoUserPool"
        },
        "GroupName": "Customer",
        "RoleArn": {
          "Fn::GetAtt": [
            "CognitoUserIAMrole",
            "Arn"
          ]
        },
        "Description": "Customer belongs to this group"
      }
    },
    "CognitoUserIAMrole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
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
          ]
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
      }
    },
    "AwesomeappsyncGraphQlApi": {
      "Type": "AWS::AppSync::GraphQLApi",
      "Properties": {
        "Name": "awesome-appsync",
        "AuthenticationType": "AMAZON_COGNITO_USER_POOLS",
        "AdditionalAuthenticationProviders": [],
        "UserPoolConfig": {
          "AwsRegion": "eu-west-1",
          "UserPoolId": {
            "Ref": "CognitoUserPool"
          },
          "DefaultAction": "ALLOW"
        },
        "XrayEnabled": false
      }
    },
    "AwesomeappsyncGraphQlSchema": {
      "Type": "AWS::AppSync::GraphQLSchema",
      "Properties": {
        "Definition": "schema {\\n  query: Query\\n  mutation: Mutation\\n  subscription: Subscription\\n}\\n\\ntype Subscription {\\n  onCreateBook: Book @aws_subscribe(mutations: [\\"createBook\\"])\\n}\\n\\ntype Query {\\n  getBookById(bookId: ID!): Book!\\n}\\n\\ntype Book {\\n  bookId: ID!\\n  title: String!\\n  description: String\\n  imageUrl: AWSURL\\n  author: String!\\n  price: Float!\\n  createdAt: AWSDateTime!\\n  updatedAt: AWSDateTime!\\n}\\n\\ntype Mutation {\\n  createBook(newBook: BookInput): Book! @aws_auth(cognito_groups: [\\"Admin\\"])\\n}\\n\\ninput BookInput {\\n  title: String!\\n  description: String\\n  imageUrl: AWSURL\\n  author: String!\\n  price: Float!\\n}",
        "ApiId": {
          "Fn::GetAtt": [
            "AwesomeappsyncGraphQlApi",
            "ApiId"
          ]
        }
      }
    },
    "AwesomeappsyncGraphQlDsbooksTableRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
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
          ]
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
      }
    },
    "AwesomeappsyncGraphQlDsbooksTable": {
      "Type": "AWS::AppSync::DataSource",
      "Properties": {
        "ApiId": {
          "Fn::GetAtt": [
            "AwesomeappsyncGraphQlApi",
            "ApiId"
          ]
        },
        "Name": "booksTable",
        "Type": "AMAZON_DYNAMODB",
        "ServiceRoleArn": {
          "Fn::GetAtt": [
            "AwesomeappsyncGraphQlDsbooksTableRole",
            "Arn"
          ]
        },
        "DynamoDBConfig": {
          "AwsRegion": "eu-west-1",
          "TableName": {
            "Ref": "BooksTable"
          },
          "UseCallerCredentials": false,
          "Versioned": false
        }
      }
    },
    "AwesomeappsyncGraphQlResolverQuerygetBookById": {
      "Type": "AWS::AppSync::Resolver",
      "DependsOn": "AwesomeappsyncGraphQlSchema",
      "Properties": {
        "ApiId": {
          "Fn::GetAtt": [
            "AwesomeappsyncGraphQlApi",
            "ApiId"
          ]
        },
        "TypeName": "Query",
        "FieldName": "getBookById",
        "RequestMappingTemplate": "#if ($context.info.selectionSetList.size() == 1 && $context.info.selectionSetList[0] == \\"id\\")\\n  #set ($result = { \\"id\\": \\"$context.source.otherUserId\\" })\\n\\n  #return($result)\\n#end\\n\\n{\\n  \\"version\\" : \\"2018-05-29\\",\\n  \\"operation\\" : \\"GetItem\\",\\n  \\"key\\" : {\\n    \\"bookId\\" : $util.dynamodb.toDynamoDBJson($context.arguments.bookId)\\n  }\\n}",
        "ResponseMappingTemplate": "$util.toJson($context.result)",
        "Kind": "UNIT",
        "DataSourceName": {
          "Fn::GetAtt": [
            "AwesomeappsyncGraphQlDsbooksTable",
            "Name"
          ]
        }
      }
    },
    "AwesomeappsyncGraphQlResolverMutationcreateBook": {
      "Type": "AWS::AppSync::Resolver",
      "DependsOn": "AwesomeappsyncGraphQlSchema",
      "Properties": {
        "ApiId": {
          "Fn::GetAtt": [
            "AwesomeappsyncGraphQlApi",
            "ApiId"
          ]
        },
        "TypeName": "Mutation",
        "FieldName": "createBook",
        "RequestMappingTemplate": "{\\n    \\"version\\" : \\"2018-05-29\\",\\n    \\"operation\\" : \\"PutItem\\",\\n    \\"key\\": {\\n        \\"bookId\\" : $util.dynamodb.toDynamoDBJson($util.autoId())\\n    },\\n    \\"attributeValues\\" : {\\n        \\"title\\" : $util.dynamodb.toDynamoDBJson($context.arguments.newBook.title),\\n        \\"description\\" : $util.dynamodb.toDynamoDBJson($context.arguments.newBook.description),\\n        \\"imageUrl\\" : $util.dynamodb.toDynamoDBJson($context.arguments.newBook.imageUrl),\\n        \\"author\\" : $util.dynamodb.toDynamoDBJson($context.arguments.newBook.author),\\n        \\"price\\" : $util.dynamodb.toDynamoDBJson($context.arguments.newBook.price),\\n        \\"createdAt\\": $util.dynamodb.toDynamoDBJson($util.time.nowISO8601()),\\n        \\"updatedAt\\": $util.dynamodb.toDynamoDBJson($util.time.nowISO8601())\\n    }\\n}",
        "ResponseMappingTemplate": "$util.toJson($context.result)",
        "Kind": "UNIT",
        "DataSourceName": {
          "Fn::GetAtt": [
            "AwesomeappsyncGraphQlDsbooksTable",
            "Name"
          ]
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
                      "AWS/DynamoDB",
                      "ReadThrottleEvents",
                      "TableName",
                      "\${BooksTable}",
                      {
                        "stat": "Sum"
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
                      "ReadThrottleEvents",
                      "TableName",
                      "\${BooksTable}",
                      {
                        "stat": "Sum"
                      }
                    ],
                    [
                      "AWS/DynamoDB",
                      "WriteThrottleEvents",
                      "TableName",
                      "\${BooksTable}",
                      {
                        "stat": "Sum"
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
              }
            ]
          }
        }
      }
    },
    "slicWatchTableReadThrottleEventsAlarmBooksTable": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "DDB_ReadThrottleEvents_Alarm_\${BooksTable}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${BooksTable} breaches 10",
            {}
          ]
        },
        "MetricName": "ReadThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "BooksTable"
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
    "slicWatchTableWriteThrottleEventsAlarmBooksTable": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "DDB_WriteThrottleEvents_Alarm_\${BooksTable}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${BooksTable} breaches 10",
            {}
          ]
        },
        "MetricName": "WriteThrottleEvents",
        "Namespace": "AWS/DynamoDB",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "BooksTable"
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
    "slicWatchTableUserErrorsAlarmBooksTable": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "DDB_UserErrors_Alarm_\${BooksTable}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${BooksTable} breaches 0",
            {}
          ]
        },
        "MetricName": "UserErrors",
        "Namespace": "AWS/DynamoDB",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "BooksTable"
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
    "slicWatchTableSystemErrorsAlarmBooksTable": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": {
          "Fn::Sub": [
            "DDB_SystemErrors_Alarm_\${BooksTable}",
            {}
          ]
        },
        "AlarmDescription": {
          "Fn::Sub": [
            "DynamoDB Sum for \${BooksTable} breaches 0",
            {}
          ]
        },
        "MetricName": "SystemErrors",
        "Namespace": "AWS/DynamoDB",
        "Dimensions": [
          {
            "Name": "TableName",
            "Value": {
              "Ref": "BooksTable"
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
    "slicWatchAppSync5XXErrorAlarmawesomeappsync": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": "AppSync_5XXErrorAlarm_awesome-appsync",
        "AlarmDescription": "AppSync 5XXError Sum for awesome-appsync breaches 0",
        "MetricName": "5XXError",
        "Namespace": "AWS/AppSync",
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
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Sum",
        "Threshold": 0
      }
    },
    "slicWatchAppSyncLatencyAlarmawesomeappsync": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "ActionsEnabled": true,
        "AlarmActions": [
          "test-topic"
        ],
        "OKActions": [],
        "AlarmName": "AppSync_LatencyAlarm_awesome-appsync",
        "AlarmDescription": "AppSync Latency Average for awesome-appsync breaches 0",
        "MetricName": "Latency",
        "Namespace": "AWS/AppSync",
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
        "Period": 60,
        "EvaluationPeriods": 1,
        "TreatMissingData": "notBreaching",
        "ComparisonOperator": "GreaterThanThreshold",
        "Statistic": "Average",
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
        "Name": "sls-serverless-test-project-appsync-dev-ServerlessDeploymentBucketName"
      }
    },
    "AwesomeappsyncGraphQlApiId": {
      "Value": {
        "Fn::GetAtt": [
          "AwesomeappsyncGraphQlApi",
          "ApiId"
        ]
      },
      "Export": {
        "Name": {
          "Fn::Sub": "\${AWS::StackName}-AwesomeappsyncGraphQlApiId"
        }
      }
    },
    "AwesomeappsyncGraphQlApiUrl": {
      "Value": {
        "Fn::GetAtt": [
          "AwesomeappsyncGraphQlApi",
          "GraphQLUrl"
        ]
      },
      "Export": {
        "Name": {
          "Fn::Sub": "\${AWS::StackName}-AwesomeappsyncGraphQlApiUrl"
        }
      }
    }
  }
}
`

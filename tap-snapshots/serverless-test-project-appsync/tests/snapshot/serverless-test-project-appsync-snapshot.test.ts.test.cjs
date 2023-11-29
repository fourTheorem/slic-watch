/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`serverless-test-project-appsync/tests/snapshot/serverless-test-project-appsync-snapshot.test.ts > TAP > serverless-test-project-appsync snapshot > serverless-test-project-appsync template 1`] = `
Object {
  "AwesomeappsyncGraphQlApi": Object {
    "Properties": Object {
      "AdditionalAuthenticationProviders": Array [],
      "AuthenticationType": "AMAZON_COGNITO_USER_POOLS",
      "Name": "awesome-appsync",
      "UserPoolConfig": Object {
        "AwsRegion": "eu-west-1",
        "DefaultAction": "ALLOW",
        "UserPoolId": Object {
          "Ref": "CognitoUserPool",
        },
      },
      "XrayEnabled": false,
    },
    "Type": "AWS::AppSync::GraphQLApi",
  },
  "AwesomeappsyncGraphQlDsbooksTable": Object {
    "Properties": Object {
      "ApiId": Object {
        "Fn::GetAtt": Array [
          "AwesomeappsyncGraphQlApi",
          "ApiId",
        ],
      },
      "DynamoDBConfig": Object {
        "AwsRegion": "eu-west-1",
        "TableName": Object {
          "Ref": "BooksTable",
        },
        "UseCallerCredentials": false,
        "Versioned": false,
      },
      "Name": "booksTable",
      "ServiceRoleArn": Object {
        "Fn::GetAtt": Array [
          "AwesomeappsyncGraphQlDsbooksTableRole",
          "Arn",
        ],
      },
      "Type": "AMAZON_DYNAMODB",
    },
    "Type": "AWS::AppSync::DataSource",
  },
  "AwesomeappsyncGraphQlDsbooksTableRole": Object {
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
                "appsync.amazonaws.com",
              ],
            },
          },
        ],
        "Version": "2012-10-17",
      },
      "Policies": Array [
        Object {
          "PolicyDocument": Object {
            "Statement": Array [
              Object {
                "Action": Array [
                  "dynamodb:DeleteItem",
                  "dynamodb:GetItem",
                  "dynamodb:PutItem",
                  "dynamodb:Query",
                  "dynamodb:Scan",
                  "dynamodb:UpdateItem",
                  "dynamodb:BatchGetItem",
                  "dynamodb:BatchWriteItem",
                  "dynamodb:ConditionCheckItem",
                ],
                "Effect": "Allow",
                "Resource": Array [
                  Object {
                    "Fn::Join": Array [
                      ":",
                      Array [
                        "arn",
                        "aws",
                        "dynamodb",
                        "eu-west-1",
                        Object {
                          "Ref": "AWS::AccountId",
                        },
                        Object {
                          "Fn::Join": Array [
                            "/",
                            Array [
                              "table",
                              Object {
                                "Ref": "BooksTable",
                              },
                            ],
                          ],
                        },
                      ],
                    ],
                  },
                  Object {
                    "Fn::Join": Array [
                      "/",
                      Array [
                        Object {
                          "Fn::Join": Array [
                            ":",
                            Array [
                              "arn",
                              "aws",
                              "dynamodb",
                              "eu-west-1",
                              Object {
                                "Ref": "AWS::AccountId",
                              },
                              Object {
                                "Fn::Join": Array [
                                  "/",
                                  Array [
                                    "table",
                                    Object {
                                      "Ref": "BooksTable",
                                    },
                                  ],
                                ],
                              },
                            ],
                          ],
                        },
                        "*",
                      ],
                    ],
                  },
                ],
              },
            ],
            "Version": "2012-10-17",
          },
          "PolicyName": "GraphQlDsbooksTablePolicy",
        },
      ],
    },
    "Type": "AWS::IAM::Role",
  },
  "AwesomeappsyncGraphQlResolverMutationcreateBook": Object {
    "DependsOn": "AwesomeappsyncGraphQlSchema",
    "Properties": Object {
      "ApiId": Object {
        "Fn::GetAtt": Array [
          "AwesomeappsyncGraphQlApi",
          "ApiId",
        ],
      },
      "DataSourceName": Object {
        "Fn::GetAtt": Array [
          "AwesomeappsyncGraphQlDsbooksTable",
          "Name",
        ],
      },
      "FieldName": "createBook",
      "Kind": "UNIT",
      "RequestMappingTemplate": String(
        {
            "version" : "2018-05-29",
            "operation" : "PutItem",
            "key": {
                "bookId" : $util.dynamodb.toDynamoDBJson($util.autoId())
            },
            "attributeValues" : {
                "title" : $util.dynamodb.toDynamoDBJson($context.arguments.newBook.title),
                "description" : $util.dynamodb.toDynamoDBJson($context.arguments.newBook.description),
                "imageUrl" : $util.dynamodb.toDynamoDBJson($context.arguments.newBook.imageUrl),
                "author" : $util.dynamodb.toDynamoDBJson($context.arguments.newBook.author),
                "price" : $util.dynamodb.toDynamoDBJson($context.arguments.newBook.price),
                "createdAt": $util.dynamodb.toDynamoDBJson($util.time.nowISO8601()),
                "updatedAt": $util.dynamodb.toDynamoDBJson($util.time.nowISO8601())
            }
        }
      ),
      "ResponseMappingTemplate": "$util.toJson($context.result)",
      "TypeName": "Mutation",
    },
    "Type": "AWS::AppSync::Resolver",
  },
  "AwesomeappsyncGraphQlResolverQuerygetBookById": Object {
    "DependsOn": "AwesomeappsyncGraphQlSchema",
    "Properties": Object {
      "ApiId": Object {
        "Fn::GetAtt": Array [
          "AwesomeappsyncGraphQlApi",
          "ApiId",
        ],
      },
      "DataSourceName": Object {
        "Fn::GetAtt": Array [
          "AwesomeappsyncGraphQlDsbooksTable",
          "Name",
        ],
      },
      "FieldName": "getBookById",
      "Kind": "UNIT",
      "RequestMappingTemplate": String(
        #if ($context.info.selectionSetList.size() == 1 && $context.info.selectionSetList[0] == "id")
          #set ($result = { "id": "$context.source.otherUserId" })
        
          #return($result)
        #end
        
        {
          "version" : "2018-05-29",
          "operation" : "GetItem",
          "key" : {
            "bookId" : $util.dynamodb.toDynamoDBJson($context.arguments.bookId)
          }
        }
      ),
      "ResponseMappingTemplate": "$util.toJson($context.result)",
      "TypeName": "Query",
    },
    "Type": "AWS::AppSync::Resolver",
  },
  "AwesomeappsyncGraphQlSchema": Object {
    "Properties": Object {
      "ApiId": Object {
        "Fn::GetAtt": Array [
          "AwesomeappsyncGraphQlApi",
          "ApiId",
        ],
      },
      "Definition": String(
        schema {
          query: Query
          mutation: Mutation
          subscription: Subscription
        }
        
        type Subscription {
          onCreateBook: Book @aws_subscribe(mutations: ["createBook"])
        }
        
        type Query {
          getBookById(bookId: ID!): Book!
        }
        
        type Book {
          bookId: ID!
          title: String!
          description: String
          imageUrl: AWSURL
          author: String!
          price: Float!
          createdAt: AWSDateTime!
          updatedAt: AWSDateTime!
        }
        
        type Mutation {
          createBook(newBook: BookInput): Book! @aws_auth(cognito_groups: ["Admin"])
        }
        
        input BookInput {
          title: String!
          description: String
          imageUrl: AWSURL
          author: String!
          price: Float!
        }
      ),
    },
    "Type": "AWS::AppSync::GraphQLSchema",
  },
  "BooksTable": Object {
    "Properties": Object {
      "AttributeDefinitions": Array [
        Object {
          "AttributeName": "bookId",
          "AttributeType": "S",
        },
      ],
      "BillingMode": "PAY_PER_REQUEST",
      "KeySchema": Array [
        Object {
          "AttributeName": "bookId",
          "KeyType": "HASH",
        },
      ],
      "Tags": Array [
        Object {
          "Key": "Name",
          "Value": "books-table",
        },
      ],
    },
    "Type": "AWS::DynamoDB::Table",
  },
  "bucket": Object {
    "Type": "AWS::S3::Bucket",
  },
  "CognitoAdminGroup": Object {
    "Properties": Object {
      "Description": "Admin users belong to this group",
      "GroupName": "Admin",
      "RoleArn": Object {
        "Fn::GetAtt": Array [
          "CognitoAdminIAMrole",
          "Arn",
        ],
      },
      "UserPoolId": Object {
        "Ref": "CognitoUserPool",
      },
    },
    "Type": "AWS::Cognito::UserPoolGroup",
  },
  "CognitoAdminIAMrole": Object {
    "Properties": Object {
      "AssumeRolePolicyDocument": Object {
        "Statement": Array [
          Object {
            "Action": Array [
              "sts:AssumeRoleWithWebIdentity",
            ],
            "Effect": "Allow",
            "Principal": Object {
              "Federated": Array [
                "cognito-identity.amazonaws.com",
              ],
            },
          },
        ],
        "Version": "2012-10-17",
      },
      "Description": "This is the IAM role that admin group users name",
      "Policies": Array [
        Object {
          "PolicyDocument": Object {
            "Statement": Array [
              Object {
                "Action": Array [
                  "dynamodb:*",
                ],
                "Effect": "Allow",
                "Resource": Array [
                  Object {
                    "Fn::GetAtt": Array [
                      "BooksTable",
                      "Arn",
                    ],
                  },
                ],
              },
            ],
            "Version": "2012-10-17",
          },
          "PolicyName": "bookstore-admin-group-policy",
        },
      ],
      "RoleName": "bookstore-admin-role",
    },
    "Type": "AWS::IAM::Role",
  },
  "CognitoCustomerGroup": Object {
    "Properties": Object {
      "Description": "Customer belongs to this group",
      "GroupName": "Customer",
      "RoleArn": Object {
        "Fn::GetAtt": Array [
          "CognitoUserIAMrole",
          "Arn",
        ],
      },
      "UserPoolId": Object {
        "Ref": "CognitoUserPool",
      },
    },
    "Type": "AWS::Cognito::UserPoolGroup",
  },
  "CognitoUserIAMrole": Object {
    "Properties": Object {
      "AssumeRolePolicyDocument": Object {
        "Statement": Array [
          Object {
            "Action": Array [
              "sts:AssumeRoleWithWebIdentity",
            ],
            "Effect": "Allow",
            "Principal": Object {
              "Federated": Array [
                "cognito-identity.amazonaws.com",
              ],
            },
          },
        ],
        "Version": "2012-10-17",
      },
      "Description": "This is the IAM role that admin group users name",
      "Policies": Array [
        Object {
          "PolicyDocument": Object {
            "Statement": Array [
              Object {
                "Action": Array [
                  "dynamodb:GetItem",
                  "dynamodb:Query",
                  "dynamodb:BatchGetItem",
                ],
                "Effect": "Allow",
                "Resource": Array [
                  Object {
                    "Fn::GetAtt": Array [
                      "BooksTable",
                      "Arn",
                    ],
                  },
                ],
              },
            ],
            "Version": "2012-10-17",
          },
          "PolicyName": "book-store-customer-group-policy",
        },
      ],
      "RoleName": "bookstore-customer-role",
    },
    "Type": "AWS::IAM::Role",
  },
  "CognitoUserPool": Object {
    "Properties": Object {
      "AutoVerifiedAttributes": Array [
        "email",
      ],
      "Policies": Object {
        "PasswordPolicy": Object {
          "MinimumLength": 8,
          "RequireLowercase": false,
          "RequireNumbers": false,
          "RequireSymbols": false,
          "RequireUppercase": false,
        },
      },
      "Schema": Array [
        Object {
          "AttributeDataType": "String",
          "Mutable": true,
          "Name": "name",
          "Required": false,
        },
      ],
      "UsernameAttributes": Array [
        "email",
      ],
      "UserPoolName": "BookStoreUserPool",
    },
    "Type": "AWS::Cognito::UserPool",
  },
  "CognitoUserPoolClient": Object {
    "Properties": Object {
      "ClientName": "web",
      "ExplicitAuthFlows": Array [
        "ALLOW_USER_SRP_AUTH",
        "ALLOW_USER_PASSWORD_AUTH",
        "ALLOW_REFRESH_TOKEN_AUTH",
      ],
      "PreventUserExistenceErrors": "ENABLED",
      "UserPoolId": Object {
        "Ref": "CognitoUserPool",
      },
    },
    "Type": "AWS::Cognito::UserPoolClient",
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
}
`

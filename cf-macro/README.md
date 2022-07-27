# cf-macro-slic-watch

This SAM app deploys a CloudFormation macro for auto-generating CloudWatch alarms based on your configuration 
When applied to a CloudFormation stack, the macro would scan the resources in the stack, and generate corresponding alarms.

Steps to install Macro:
1.
  -Get the latest version
  -SAM build
  -SAM deploy
  This creates CloudFormation Stack with a Macro resource and a Macro Lambda function/role to the Account and Region.

2. Add the below Transform section to Client CloudFormation template.

Transform: ["CfMacroSlicWatch"]

version 1:  
Adds an invocation alarm to the lambda's.



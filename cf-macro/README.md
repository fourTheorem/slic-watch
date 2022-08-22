This SAR app deploys a CloudFormation macro that generates CloudWatch Dashboard and Alarms for your CloudFormation Stacks.

Deployment:
Deploying to your account (via the console)
Go to the [AWS Application Repository](https://serverlessrepo.aws.amazon.com/applications) and click the Deploy button.

To add the Macro to a SAM template,  add it in the **Transform** section :
```
Transform: [ "CfMacroSlicWatch"]

```
A sample SAM Test Project Stack that uses the Macro can be found [here](https://github.com/fourTheorem/slic-watch).

You can control what alarms are created and their threshold values using a combination of two configurations:
 - A default configuration available as part of the macro that defines the organization best practices.
 - An optional override configuration that overrides the default configuration defined in your CloudFormation stack.



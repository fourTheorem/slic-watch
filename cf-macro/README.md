This SAR app deploys a CloudFormation macro that generates CloudWatch Dashboard and Alarms for your CloudFormation Stacks.

Deployment Instructions:
1. Get the latest version of code
1. Run the following scripts:
```
npm install
sam build --base-dir . --template-file cf-macro/template.yaml
sam package  --output-template-file packaged.yaml  --s3-bucket {bucket name}
sam publish     --template packaged.yaml     --region eu-west-1
```
{bucket name}  A  bucket with a valid Amazon S3 bucket policy that grants the SAR service read permissions for artifacts that were uploaded to Amazon S3. See https://docs.aws.amazon.com/serverlessrepo/latest/devguide/serverlessrepo-how-to-publish.html 

Deployment:
Deploying to your account (via the console)
Go to the [AWS Application Repository](https://serverlessrepo.aws.amazon.com/applications) and click the Deploy button.

To add the Macro to a SAM template,  add it in the **Transform** section :
```
Transform: [ "SlicWatch-v2"]

```
A sample SAM Test Project Stack that uses the Macro can be found [here](https://github.com/fourTheorem/slic-watch).

You can control what alarms are created and their threshold values using a combination of two configurations:
 - A default configuration available as part of the macro that defines the organization best practices.
 - An optional override configuration that overrides the default configuration defined in your CloudFormation stack.



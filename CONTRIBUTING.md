# Contributing

We would really love for you to contribute in any way to SLIC Watch!

When contributing to this repository, it would be great if you could first discuss the change you wish to make via issue, email, or any other method with the owners of this repository.

Note that we have a [code of conduct](CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Where to Contribute

There are are a number of areas where you can contribute right now.

1. Have feedback? Did you find a bug? Let us know in the _Issues_.
2. We may label some of the open issues with the "help wanted" label. You can see them [here](https://github.com/fourTheorem/slic-watch/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22). Let us know in the issue if you are planning to work on it so we can share ideas.
3. Sometimes we will label issues as "good first issue". If you are new to open source or just to some of the areas this project covers, these issues are a great way to get started. The list is [here](https://github.com/fourTheorem/slic-watch/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

## Pull Request Process

See the [pull request template](./docs/pull_request_template.md).

## How to add support for new resources into SLIC Watch

For every AWS service, there are metrics and dimensions that can be observed. SLIC Watch should come with sane defaults. When we want to create alarms and dashboards, you need to identify the metrics that are most important for visualisation in dashboards and alerting through alarms.

The following is a checklist of steps that must be followed to add support for alarms and dashboards relating to a new AWS resource.

1. Identify the metrics and statistics for the service. The set of metrics you want to alert on might be different to those you wish to visualise in the dashboard.
2. Update the [serverless-test-project](./serverless-test-project) to add an example of the kind of resource you want to monitor with SLIC Watch.  We have a separate YAML file for Serverless Framework v2 and v3, both of which include a common [resources file](./serverless-test-project/sls-resources.yml). You may need to update that file in addition to [serverless.yml](./serverless-test-project/serverless.yml) and [serverless-v2.yml](./serverless-test-project/serverless-v2.yml).
3. Unit tests use a compiled CloudFormation stack generated from the `serverless-test-project`. This needs to be manually generated for each new supported feature.
 a. Once you have added the new resource to `serverless-test-project`, compile the project to generate the CloudFormation JSON by running `serverless package`
 b. Copy `serverless-test-project/.serverless/cloudformation-template-update-stack.json` to [serverless-plugin/tests/resources/cloudformation-template-stack.json](serverless-plugin/tests/resources/cloudformation-template-stack.json`).
 c. Manually edit `serverless-plugin/tests/resources/cloudformation-template-stack.json` to remove any `AWS::CloudWatch::Dashboard` and `AWS::CloudWatch::Alarm` resources. This is important since we need the unit tests to generate these resources, so they cannot exist in the source template
4. Snapshot tests are used to detect breaking or problematic changes in generated templates. They are automatically run with `npm test` but can be run in isolation with `npm run test:snapshots`. Snapshots can be regenerated (if you really are sure that they should be updated!) with `npm run test:snapshots:generate`
5. Add alarms:
 a. Create a new `alarms-<service>.js` module in [serverless-plugin](./serverless-plugin/). One of the existing `alarms-<service>.js` modules may be used as a template.
 b. Update [serverless-plugin/alarms.js](./serverless-plugin/alarms.js) to wire in the new `alarms-<service>` module.
 c. Create a unit test for the new alarm module and update [alarms.test.js](./serverless-plugin/tests/alarms.test.js) to add coverage for the new resource. This will use the CloudFormation template you updated above.
6. Add dashboard widgets:
 a. Add support for the new dashboard widgets in [serverless-plugin/dashboard.js](./serverless-plugin/dashboard.js)
 b. Update [dashboard.test.js](./serverless-plugin/tests/dashboard.test.js) to add coverage for the new resource
7. Update SLIC Watch configuration support:
 a. Add default values for your resource's alarm and dashboard configuration in [default-config.js](./serverless-plugin/default-config.js).
 b. Update the JSON schema for SLIC Watch configuration ([config-schema.js](./serverless-plugin/config-schema.js)). Here, you can define the supported alarm metrics and widgets.
8. Manually (or using automation) integration test the new feature
 a. The method will vary based on the resource type, but the idea is to trigger alarms and generate metrics to validate that both alarms and dashboards are working as expected. You can use the resource you added to `serverless-test-project` for this.
 b. For example integration tests, see the Python-based notebooks in [testing](./testing).
9. Update the README.md:
 a. Include the updated default configuration
 b. Add the new resource type to the list of features
 c. Update the dashboard screenshots to include your new widget with metrics shown (using Dark Mode in the CloudWatch Console!)


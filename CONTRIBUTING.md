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

For every AWS service there are metrics and dimensions that have to be handled. SLIC Watch comes with sane defaults. When we want to create alarms and dashboards we need to define metrics which we need in projects with default value in the [default-config.yml](./serverless-plugin/default-config.yaml). You can configure what you don’t like or disable specific dashboards or alarms. And we create the alarm structure in [alarms.js](./serverless-plugin/alarms.js) module. However keep in mind, every single alarm module is firstly handled in a separate module. We handle dashboard in [dashboard.js](./serverless-plugin/dashboard.js) module. 

[config-schema.js](./serverless-plugin/config-schema.js) is the validation schema of [serverless.yml](./serverless-test-project/serverless.yml) module. It's a JSON schema validation using the ajv npm module We use it to validate custom.slicWatch.You can optionally override part of the configuration in custom.slicWatch if you want to. Because the default configuration is there so you don’t have to specify all resources. In config-schema we can  see supportedAlarms, supportedWidgets have to be filled with valid metrics.

We highly recommend to do unit-test after contributing a new service support. A common gotcha can be forgetable during the unit-test the [cloudformation-template-stack.json](./serverless-plugin/tests/resources/cloudformation-template-stack.json) has to be modified.








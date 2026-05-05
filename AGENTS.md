# AGENTS

- Keep changes targeted. This repo already documents user-facing setup and commands well; avoid copying README/package metadata here.
- When adding support for a new AWS resource or monitoring feature, update the implementation, example projects, tests, and README together. The example projects are part of the expected test inputs, not just samples.
- `serverless-plugin` unit tests depend on a committed CloudFormation fixture generated from `serverless-test-project`. After regenerating it, remove any existing `AWS::CloudWatch::Dashboard` and `AWS::CloudWatch::Alarm` resources before using it in tests, because the tests are supposed to create those resources.
- Snapshot updates should be deliberate. Regenerate snapshots only when the rendered template change is intentional.
- If you change defaults, configuration schema, supported resources, or visible dashboard output, update `README.md` in the same change. Add or refresh screenshots only when the dashboard visuals actually change.

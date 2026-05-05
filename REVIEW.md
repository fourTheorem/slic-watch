# SLIC Watch review

## Executive summary

SLIC Watch is a valuable project with a clear purpose: it turns CloudWatch alarms and dashboards into infrastructure defaults instead of bespoke per-stack work. The core product idea is strong, the multi-entry architecture is sensible, and the repository shows real maintenance discipline through shared core logic, example projects, and broad test coverage.

The main risks are now less about feature completeness and more about long-term correctness and operability: mutable shared configuration state, weakened type safety in key paths, inconsistent configuration vocabulary between alarms and dashboards, and some brittle test/package hygiene around the Serverless plugin.

## Value and product assessment

### What is working well

- **Strong value proposition.** The repo targets a real pain point for AWS teams: good monitoring defaults are easy to postpone and hard to standardize. SLIC Watch makes them repeatable across Serverless Framework, SAM, CDK, and raw CloudFormation (`README.md:9-15`).
- **Good surface-area coverage.** The supported resource list is substantial and broad enough to be useful in real serverless systems, not just toy Lambda demos (`README.md:11-15`).
- **Practical contributor workflow.** The repo expects implementation, examples, tests, and docs to move together, which is exactly the right posture for infrastructure-generation tooling (`CONTRIBUTING.md:21-50`).

### Product/design caveats

- **Configuration power comes with cognitive load.** The schema and defaults are rich, but the user-facing model is fairly dense, especially once cascading overrides are involved (`core/inputs/config-schema.ts:14-217`, `core/inputs/default-config.ts:14-442`).
- **Alarm and dashboard vocabulary are not fully aligned.** Lambda alarms use names like `ThrottlesPc` and `DurationPc`, while widgets use `Throttles` and `Duration`; EventBridge widgets expose `Invocations` while alarms do not (`core/inputs/config-schema.ts:14-43`). That is defensible internally, but it makes the external configuration model harder to learn.

## Architecture and codebase assessment

### Strengths

- **Sound repo shape.** The monorepo split is clean: shared generation logic in `core/`, integration layers in `serverless-plugin/` and `cf-macro/`, and fixture/example projects to exercise the integrations (`package.json:11-20`).
- **Good adapter layering.** The Serverless plugin and macro mostly orchestrate config resolution plus `addDashboard`/`addAlarms`, while the CloudFormation-specific generation lives in the core package (`serverless-plugin/serverless-plugin.ts:47-85`, `cf-macro/index.ts:35-42`, `core/index.ts:1-16`).
- **Strong regression strategy.** The combination of unit tests, snapshot tests, and packaging checks for the example projects is a good fit for a template-generation project (`package.json:27-31`, `.github/workflows/build.yml:25-38`).
- **Docs are user-oriented.** README prioritizes setup, configuration, and the generated output rather than internals, which matches the project’s audience well (`README.md:49-181`).

### Weaknesses

- **Some correctness-sensitive code paths still rely on loose typing and mutation.**
- **The test harness is good overall, but some edge cases are under-modeled.**
- **A few maintenance signals suggest drift:** old engine floor, stale CI comment, and implicit workspace dependency usage (`package.json:70-73`, `.github/workflows/build.yml:17,46`, `test-utils/package.json:11`).

## Findings

| Severity | Finding | Why it matters | References |
|---|---|---|---|
| **High** | `resolveSlicWatchConfig` mutates the shared defaults object with `merge(defaultConfig, slicWatchConfig)` | `lodash.merge` mutates its first argument. Because `defaultConfig` is imported singleton state, one config resolution can change the defaults seen by later resolutions in the same process. That is a real correctness risk for tests, long-lived processes, and the macro/plugin if multiple templates are processed in one runtime. | `core/inputs/general-config.ts:61-66`, `core/inputs/default-config.ts:14-442` |
| **High** | Type safety is intentionally weakened in production paths | The repo enables `strict` but disables `noImplicitAny`, then relies on `any` in config, dashboard, and plugin code. That reduces the value of the TypeScript migration exactly in the places where dynamic CloudFormation structures already make mistakes easy. | `tsconfig.json:3-18`, `serverless-plugin/serverless-plugin.ts:12-25,69-79`, `core/dashboards/dashboard.ts:139-143`, `core/alarms/sqs.ts:37-49` |
| **Medium** | Alarm and widget metric names are inconsistent | This is mainly a design/usability issue, not an outright bug, but it creates schema drift and extra mental mapping for users and maintainers. It also raises the odds of docs/config/test drift as support expands. | `core/inputs/config-schema.ts:14-43`, `core/inputs/default-config.ts:21-42,242-262,353-363` |
| **Medium** | The Serverless plugin test double does not model logical ID generation realistically | `getLambdaLogicalId` in test utils is a simplistic capitalization function, and the tests only cover names like `hello`. That leaves a gap around more realistic function names with hyphens or other transformations, which are common in real `serverless.yml` files. | `test-utils/sls-test-utils.ts:37-43`, `serverless-plugin/tests/index.test.ts:18-27,55-180` |
| **Medium** | Config-schema tests are mostly positive-path checks | The schema tests confirm that defaults validate, but they do not exercise many invalid forms or edge-case patterns. For a schema-heavy project, that leaves blind spots around regressions in validation behavior. | `core/inputs/tests/config-schema.test.ts:1-47`, `core/inputs/config-schema.ts:46-217` |
| **Low** | `test-utils` imports `pino` without declaring it locally | This works in the monorepo because another workspace/root dependency provides it, but it is still package-hygiene debt and makes the workspace less self-contained. | `test-utils/sls-test-utils.ts:1-6`, `test-utils/package.json:1-15`, `core/package.json:27-37` |
| **Low** | CI/runtime support signals are inconsistent | The repo advertises `node >=12`, but CI only runs on Node 22/24, and the workflow still contains a Node 18 coverage comment even though 18 is not in the matrix. That makes the supported runtime story unclear. | `package.json:70-73`, `.github/workflows/build.yml:15-18,39-46` |

## Notable implementation details

### Good

- **Core generation logic is well centralized.** Exporting `addAlarms`, `addDashboard`, and the schemas from `core` gives the adapters a small, focused surface (`core/index.ts:1-16`).
- **The macro path is straightforward.** It validates config, applies alarms/dashboard generation, and returns a transformed fragment with minimal framework noise (`cf-macro/index.ts:35-56`).
- **The plugin path fits Serverless well.** It injects per-function metadata before calling the core generator, which is a sensible translation layer (`serverless-plugin/serverless-plugin.ts:63-84`).

### Concerning

- **The plugin mutates compiled CloudFormation and merges custom resources late with little guarding.** That is reasonable operationally, but it makes correctness depend heavily on assumptions about Serverless lifecycle behavior and object shapes (`serverless-plugin/serverless-plugin.ts:40-42,60-83`).
- **Dashboard generation still contains type escapes in hot logic.** The `metric !== 'IteratorAge' as any` branch is a good example of code that works, but signals that the types are no longer helping the implementation (`core/dashboards/dashboard.ts:139-169`).

## Recommendations

1. **Fix the shared-default mutation first.** Change `merge(defaultConfig, slicWatchConfig)` to merge into a fresh object, e.g. `merge({}, defaultConfig, slicWatchConfig)`.
2. **Tighten production typing.** Re-enable `noImplicitAny` and remove the `any` usages in `serverless-plugin`, `core/dashboards`, and `core/alarms` before adding more surface area.
3. **Introduce a shared metric registry.** Use one source of truth for supported alarm metrics, widget metrics, labels, and docs-facing names.
4. **Upgrade the negative-path schema tests.** Add invalid config cases for enums, patterns, nested overrides, and unsupported properties.
5. **Make the Serverless test harness more realistic.** Add tests for hyphenated/multiword function names and, if practical, align the logical ID helper with actual Serverless naming behavior.
6. **Clarify support policy.** Bring `engines`, CI matrix, and release expectations into alignment so contributors know what versions are actually supported.

## Overall verdict

This is a **good and useful codebase** with a solid product idea and a sound architecture. The repo already has many traits that matter for infra tooling: clear ownership boundaries, strong examples, serious test investment, and documentation that focuses on user outcomes.

The next step up in quality is not a rewrite. It is tightening a handful of correctness and maintenance seams: stop mutating shared defaults, let TypeScript do more work again, reduce config vocabulary drift, and harden the plugin test model around real-world Serverless naming and invalid-config cases.

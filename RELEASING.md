# How to Release a new version

In order to release a new version of the project:

1. Update the package version with `npm version <version>` to apply that version across all sub packages. If the Major version has changed, the Macro name will be automatically updated by [the sync-macro-version script](scripts/sync-macro-version.cjs)
2. Push these changes (`git push --tags`)
3. Draft a new release in GitHub (the CI will do the publish to npm) with the same name as the version tag. If you select "pre-release", this will be published in NPM as a `next` label so it will only be installed by users who explictly request the `@next` version.

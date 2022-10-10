# How to Release a new version

In order to release a new version of the project:

  - update the package version with `npm version <version> -ws --include-workspace-root` to apply that version across all sub packages
  - push these changes
  - draft a new release in GitHub (the CI will do the publish to npm)

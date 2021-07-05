# How to Release a new version

In order to release a new version of the project:

  - update the package version in the top level `package.json`
  - run `npm run lerna:sync` to synchronise that version across all the sub packages
  - push these changes
  - draft a new release in GitHub (the CI will do the publish to npm)

# How to Contribute

MDC React is an open source project, so we encourage contributions! If you are
looking for a bug to fix, check out [Help Wanted Issues](https://github.com/material-components/material-components-web-react/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) on GitHub. Otherwise please open a [new issue](https://github.com/material-components/material-components-web-react/issues/new).

Please follow all our [Code of Conduct Guide](https://github.com/material-components/material-components/blob/develop/CODE_OF_CONDUCT.md).

## Fixing a Bug or Adding a Feature

MDC React's goal is to build in parity of [MDC Web](https://github.com/material-components/material-components-web). MDCR's features should have a 1:1 mapping within the constraints of React. If there is part of the API you disagree with please open a [new issue](https://github.com/material-components/material-components-web-react/issues/new). Depending on the content it may fall to MDC Web's work queue, which MDC React will add in a later release.

**When in doubt open an issue. We're here to _hear_ you!**

### Add a Feature

We consider any new API to be a new feature. An API is any of the following:

* Update to React Component APIs
* Prop updates on React Component
* Adding a new component

If changes fall under these categories or you'd like to add a new component please open an [issue](https://github.com/material-components/material-components-web-react/issues/new) _first_. The team wants to collaborate with you before you dive head first into making changes and updates.

> If the changes don't fall into the above categories, or fix an existing feature, it most likely will fall into MDC Web

### Fixing Bugs

* If the issue is a small doc change (READMEs, documentation, etc.) please go ahead and open a [pull request](https://github.com/material-components/material-components-web-react/pulls).
* If the changes you want to perform are under 10 - 20 lines of code, please open a [pull request](https://github.com/material-components/material-components-web-react/pulls).
* Anything larger or change to an API will require an issue to be opened first.

### Commit Message Format

The final commit message to the mdc-foo package, for GitHub issue 1234, should look like this:

```
# for a fix to an issue
fix(component-name): Short description of fix

# for a new feature
feat(component-name): Short description of feature

# for a doc update
docs(component-name): Short description of doc changes
```

This commit message is pulled into our CHANGELOG when we [release](../release.md) and is based on [Angular's Git commit guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits). If you have any difficulty, please reach out to us on [Discord](https://discord.gg/material-components) or add a comment to the GitHub issue or PR.

## Pull Requests

Pull requests should meet the following criteria:

* **PRs should be focused!** PRs should focus on fixing one issue or an additional feature. Anything extra requires another PR.
* If there is an existing [issue](https://github.com/material-components/material-components-web-react/issues) please refer to it in the description of your PR.
* Please also add notes/description about what your changes are trying to achieve (or anything you've learned). Brevity appreciated.

### Process

Before opening a PR, it should be up to date with targeted release (rc<release_number> ie. rc0.7.0, rc0.8.0, etc.). In most cases it will never be branched from _master_.

#### Checklist:

- [ ] all unit tests pass. Please read the [tests doc](./running-tests.md) for further instructions.
- [ ] ensure you have appropriate test coverage [tests doc](./running-tests.md#test-coverage).
- [ ] lint passes, which you can read up in [tests doc](./running-tests.md#running-lint).
- [ ] screenshot tests pass. Please read [screenshot testing](../screenshot-tests.md) for instructions.
- [ ] descriptions about your changes.
- [ ] sign your PR (comment in PR "_I signed it_"). Read [cla/google](https://cla.developers.google.com/a_zbout/google-individual).

Once you have passed all checks, the process is as follows:

1. Ping one of the admins ([@bonniezhou](https://github.com/bonniezhou), [@moog16](https://github.com/moog16)) in the PR to notify us its ready for review.
1. We will either approve, request changes, or explain why we can't accept these changes. And we'll work from there.
1. Assuming approval, one of the admins will open a new PR so that tests are run on [TravisCI](https://travis-ci.com/material-components/material-components-web-react).
1. Once tests pass, an admin will close the Test PR and merge your PR.

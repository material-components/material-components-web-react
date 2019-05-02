# Release

## Pre-release Process

### Create PR to merge RC (release candidate) branch into master

If this is a scheduled release most of the development is on a release candidate branch (ie. rc0.7.x, rc0.8.0). You will need to create a PR merging it into master. Have someone quickly review it -- all issues should have been addressed during the regular PR process for each commit into the RC branch.

> The CLA may not pass since some contributors may be from outside the org. This is ok so long as the previous PRs were signed.

Once merged into master, continue the process below.


### Release Steps

#### Setup Local Environment
> Employees are supposed to do this as part of onboarding, but we've put it here as a reminder.

```
npm login
```

This will log you into NPM.

#### Announce
Ping the Slack announcements channel first! This will let other members of the team know NOT to merge PRs during this release process.


#### Pull

> Ensure you are on the master branch

```
git checkout master && git pull --tags
```

This will pull the latest of master onto your git clone.

#### Pre-Release

```
. ./scripts/release/pre-release.sh
```

This will ensure you can publish/tag, build all release files, and ensure all tests pass prior to releasing (lerna will update versions for us in the next step).

#### Release

```
$(npm bin)/lerna publish --skip-git
```

When lerna prompts for version, go with the next minor release (or patch if its a bug fix release).

This command will update the `package-lock.json` file(maybe), `package.json` files of the updated packages, and `lerna.json`.

#### CHANGELOG

To update the CHANGELOG.md file, you will need to install (conventional-changelog-cli)[https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli].

```
npm install -g conventional-changelog-cli
```

Once installed run:

```
conventional-changelog -p angular -i CHANGELOG.md -s -r 1
```

The `CHANGELOG.md` will also be updated with the new version's changes. You will need to edit the header of the file at the very least. If you need to **edit** any other parts of the `CHANGELOG.md`, now is the time.

#### Commit Changes

```
git add packages/ package-lock.json lerna.json CHANGELOG.md .travis.yml
git commit -m "chore: Publish"
```

#### Create Git Tag (post-release.sh)

```
. ./scripts/release/post-release.sh
```

This script will create the new version's Git tag.

#### Push

```
git push && git push --tags
```

This will ensure the commits and tags are pushed to the remote git repository.

> If you run into CLI errors such as:
```
remote: error: GH006: Protected branch update failed for refs/heads/master.
remote: error: Required status check "cla/google" is expected. At least one approved review is required by reviewers with write access.
To github.com:material-components/material-components-web-react.git
! [remote rejected]   master -> master (protected branch hook declined)
You may need to update Github's master branch protection:
```
> 1. Go to: settings page
> 1. Uncheck Include administrators
> 1. Click Save changes
> 1. Perform git push && git push --tags
> 1. Don't forget to toggle on Include administrators & click Save changes

### Post Process

These steps can be done anytime after the release. But should be taken care of before any new development is started.

#### Create new RC Branch

If it hasn't already been done, you will need to create a new RC branch. If the next release is v0.8.0, create a branch named `rc0.8.0` and push this to the Github repository for everyone to branch from. Once complete follow the remaining checklist items:

* [ ] [Add a new protection rule](https://github.com/material-components/material-components-web-react/settings/branch_protection_rules/new) to the RC Branch.
  * branch name should match new RC branch name.
  * check the following:
    * `Require pull request reviews before merging`
    * `Require status checks to pass before merging`
    * `Require branches to be up to date before merging`
      * `Travis CI - Pull Request`
      * `cla/google`
    * `Include administrators`
    * `Restrict who can push to matching branches`
    * Should look like this:  ![protectionrule](https://user-images.githubusercontent.com/579873/48811016-b4814400-ece0-11e8-9a7e-1a9838ecf764.png)

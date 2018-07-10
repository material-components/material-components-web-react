# Release


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
$(npm bin)/lerna publish --skip-git --conventional-commits
```

When lerna prompts for version, just go with it recommends as it uses the [Conventional Changelog Package](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-recommended-bump).

This command will update the `package-lock.json` file and `package.json` files of the updated packages. The `CHANGELOG.md` will also be updated with the new version's changes. If you need to **edit** `CHANGELOG.md` now is the time.

#### Commit Changes

```
git add packages/ package-lock.json lerna.json
git commit -m "chore: Publish"

git add CHANGELOG.md
git commit -m "docs: Update CHANGELOG.md"
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

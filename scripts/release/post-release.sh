#!/bin/sh

##
# Copyright 2018 Google Inc. All Rights Reserved.
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.
#

# Extract repo version from updated lerna.json
REPO_VERSION=$(grep 'version' lerna.json | sed 's/ *"version": "//' | sed 's/",//')
SEMVER_TAG="v$REPO_VERSION"
log "Tagging repo using semver tag $SEMVER_TAG"
git tag $SEMVER_TAG -m "Material Components for React release $SEMVER_TAG"

log "Done! You should now git push to master and git push --tags"

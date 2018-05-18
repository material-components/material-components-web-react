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

set -e

function log() {
  echo '\033[36m[pre-release]\033[0m' "$@"
}

log "Running pre-flight sanity checks..."

log "Checking that you can publish to npm..."
NPM_USER=$(npm whoami)
if ! npm team ls material:developers | grep -q $NPM_USER; then
  echo "FAILURE: You are not (yet?) part of the material:developers org. Please get in touch" \
       "with the MDC Web core team to rectify this"
  exit 1
fi

log "Checking that you can access GitHub via SSH..."
if ! ssh -T git@github.com 2>&1 | grep -q "You've successfully authenticated"; then
  echo "FAILURE: It does not look like you can access github. Please ensure that the command" \
       "ssh -T git@github.com works for you"
  exit 1
fi

log "Running npm test to ensure no breakages..."
npm test
echo ""

log "Building packages..."
npm run build
echo ""

log "Moving built assets to package directories..."
node scripts/release/cp-pkgs.js
echo ""

log "Pre-release steps done! Next, you should run:" \
    "\$(npm bin)/lerna publish --skip-git"
echo ""

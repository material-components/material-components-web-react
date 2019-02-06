#!/bin/sh

# The MIT License
#
# Copyright (c) 2018 Google, Inc.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
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

log "Verifying that all packages are correctly pointing main to dist..."
node scripts/release/verify-pkg-main.js
echo ""

log "Pre-release steps done! Next, you should run:" \
  "\$(npm bin)/lerna publish --skip-git"
echo ""

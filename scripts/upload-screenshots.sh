#!/bin/bash

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

if [[ -z "$TEST_SUITE" ]]; then
  echo 'TEST_SUITE is not set'
  exit 1
fi

TESTS_TO_RUN="${TEST_SUITE:-default_value}"

if [[ $TESTS_TO_RUN != "screenshots" ]]; then
  exit 0
fi

PATH_TO_KEY=./key.json
echo $SERVICE_ACCOUNT_KEY > $PATH_TO_KEY

COMMIT_HASH=$(git rev-parse --short HEAD)
echo 'Uploading screenshot...'

PATH_TO_KEY=$PATH_TO_KEY COMMIT_HASH=$COMMIT_HASH node ./scripts/upload-screenshots.js
rm $PATH_TO_KEY

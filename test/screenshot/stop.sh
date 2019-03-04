#!/bin/bash

kill $(ps aux | grep 'webpack' | grep 'screenshot' | awk '{print $2}') || echo 'already stopped'

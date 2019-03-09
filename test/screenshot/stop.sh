#!/bin/bash

kill $(ps aux | grep 'webpack' | awk '{print $2}') || echo 'already stopped'

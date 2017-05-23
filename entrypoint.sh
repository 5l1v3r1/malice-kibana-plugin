#!/bin/bash

set -e

source /home/kibana/.bashrc
nvm use --delete-prefix $(cat .node-version) --silent

exec "$@"

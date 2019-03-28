#!/bin/bash

cd react/
[ -d node_modules ] && rm -rf node_modules
yarn
yarn lint

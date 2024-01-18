#!/bin/bash

if [ $# != 1 ]; then
    echo "please pass new module name"
else
    sed -i "" "s#github.com/ijkzen/gin-template#$1#g" go.mod
    find . -type f -iname "*.go" | xargs sed -i "" "s#github.com/ijkzen/gin-template#$1#g"
    sed -i "" "s#template#$1#g" .harness/Build.yaml
fi

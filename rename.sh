#!/bin/bash

if [ $# != 2 ]; then
    echo "please pass new module name"
else
    if [ "$(uname)" == "Darwin" ]; then
        sed -i "" "s#github.com/ijkzen/gin-template#$1#g" go.mod
        find . -type f -iname "*.go" | xargs sed -i "" "s#github.com/ijkzen/gin-template#$1#g"
        find . -type f -iname "*.json" | xargs sed -i "" "s#angular-template#$2#g"
        find . -type f -iname "*.ts" | xargs sed -i "" "s#angular-template#$2#g"
        sed -i "" "s#template#$2#g" .harness/Build.yaml
    elif [ "$(uname)" == "Linux" ]; then
        sed -i "s#github.com/ijkzen/gin-template#$1#g" go.mod
        find . -type f -iname "*.go" | xargs sed -i "s#github.com/ijkzen/gin-template#$1#g"
        find . -type f -iname "*.json" | xargs sed -i "s#angular-template#$2#g"
        find . -type f -iname "*.ts" | xargs sed -i "s#angular-template#$2#g"
        sed -i "s#template#$2#g" .harness/Build.yaml
    else
        echo "unsupported platform"
    fi
fi

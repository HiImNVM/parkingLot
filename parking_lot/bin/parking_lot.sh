#!/bin/bash

if [ $1 == "" ]
then
    echo "FileName is null or empty. Please try again!"
    exit 0
fi

node ../index.js ../../$1
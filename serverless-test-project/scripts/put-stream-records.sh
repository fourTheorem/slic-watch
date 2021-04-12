#!/bin/bash

set -e

STREAM_NAME=awesome-savage-stream

DATA="{\"Date\": \"$(date)\"}"
echo Putting ${DATA} to ${STREAM_NAME}
aws kinesis put-record --stream-name ${STREAM_NAME} --data "${DATA}" --partition-key "part1" --output text


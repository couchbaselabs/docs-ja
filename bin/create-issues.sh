#!/bin/sh

echo "OAuth Token:"
read OAUTH_TOKEN
MILESTONE=1
API_URL="https://api.github.com/repos/couchbaselabs/docs-ja/issues"
DIR=`dirname $0`

# To prevent getting rate limit error, let's create issues little by little.
# for f in `find ja/learn/admin -type f -name '*.dita'`
for f in `cat $DIR/issue-target`
do
  JSON="'{\"title\": \"Translate ${f}\", \"milestone\": $MILESTONE, \"labels\": [\"translation wanted\", \"help wanted\"]}'"
  CMD="curl -XPOST -H \"Content-Type: application/json\" -H \"Authorization: token $OAUTH_TOKEN\" -d $JSON $API_URL"
  eval $CMD
  sleep 5
done

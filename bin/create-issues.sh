#!/bin/sh

TOKEN_FILE=$BIN_DIR/.github-oauth-token
OAUTH_TOKEN=`cat $TOKEN_FILE`
if [ ! -f $TOKEN_FILE -o -z $OAUTH_TOKEN ]
then
  echo "Couldn't grab github token from $TOKEN_FILE"
  exit 1
fi

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
  sleep 10
done

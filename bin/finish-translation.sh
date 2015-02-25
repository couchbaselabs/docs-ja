#!/bin/sh

# This script commit with the appropriate message to close related issue,
# and push the commit to your remote repository.
# Also, change the pull-request title from [WIP] to [WFR].


BIN_DIR=`dirname $0`

ISSUE_NO=$1
if [ -z $ISSUE_NO ]
then
  echo "Usage finish-translation.sh issue-no"
  exit 1
fi

TOKEN_FILE=$BIN_DIR/.github-oauth-token
OAUTH_TOKEN=`cat $TOKEN_FILE`
if [ ! -f $TOKEN_FILE -o -z $OAUTH_TOKEN ]
then
  echo "Couldn't grab github token from $TOKEN_FILE"
  exit 1
fi

API_URL="https://api.github.com/repos/couchbaselabs/docs-ja"

# Find pull-request URL from the issue no.
CMD="curl -s $API_URL/pulls |jq '.[] | select(.title==\"[WIP] on #$ISSUE_NO\") | .url'"
PR_URL=`eval $CMD`
if [ -z $PR_URL ]
then
  echo "Couldn't find a pull-request for issue: $ISSUE_NO"
  exit 1
fi

# Let's commit and  push it!
git checkout $ISSUE_NO \
&& git commit -a -m "Resolved #$ISSUE_NO" \
&& git push origin $ISSUE_NO

# Update the pull-request title to WFR.
JSON="'{\"title\": \"[WFR] on #$ISSUE_NO\"}'"
CMD="curl -XPATCH -H \"Content-Type: application/json\" -H \"Authorization: token $OAUTH_TOKEN\" -d $JSON $PR_URL"
eval $CMD
RTN=$?

if [ $RTN -ne 0 ]
then
  "Something went wrong, please check the pull-request on Github."
  exit 1
fi

echo "Now the pull-request is waiting for reveiw..."
echo "Thanks for your contribution! :)"


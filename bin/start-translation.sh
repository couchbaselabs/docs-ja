#!/bin/sh

# This shell script creates the branch and initial commit
# on your local repo, and push it to remote forked repo.
# After executing this command, you need to send a
# pull-request manually from the Github project page,
# because the git command line doesn't support sending a pull-request.
# There are several alternatives to try, but it's good enough for now.

ISSUE_NO=$1
if [ -z $ISSUE_NO ]
then
  echo "Usage start-translation.sh issue-no"
  exit 1
fi

git checkout master \
&& git checkout -b $ISSUE_NO \
&& git commit --allow-empty -m "[WIP] on #$ISSUE_NO" \
&& git push origin $ISSUE_NO \
&& echo "Please go to the Github project page and send a pull-request."
 

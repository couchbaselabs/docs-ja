#!/bin/sh

BIN_DIR=`dirname $0`
PROJECT_HOME=$BIN_DIR/..
OUT_DIR="$PROJECT_HOME/out"
DITAMAP="$PROJECT_HOME/ja/learn/admin/Couchbase.ditamap"

[ -f $BIN_DIR/env.sh ] && . $BIN_DIR/env.sh

IMAGE_DIR=learn/admin/images
IMAGE_DIR_JA=$PROJECT_HOME/ja/$IMAGE_DIR
IMAGE_DIR_EN=../../../en/$IMAGE_DIR
if [ ! -e $IMAGE_DIR_JA ]
then
  echo "creating a symbolic link for $IMAGE_DIR..."
  ln -s $IMAGE_DIR_EN $IMAGE_DIR_JA
fi

if [ -d $OUT_DIR ]
then
  echo "deleting old contents from $OUT_DIR."
  rm -rf $OUT_DIR/*
fi

echo "generating contents using $DITAMAP..."
dita -f html5 -i $DITAMAP -o $OUT_DIR


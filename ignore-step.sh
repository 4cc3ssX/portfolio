#!/bin/bash

# Vercel "Ignored Build Step".
#   exit 1 -> build proceeds
#   exit 0 -> build is cancelled
# Counter-intuitive, but that is the documented contract.

echo "VERCEL_ENV: $VERCEL_ENV"
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"
echo "VERCEL_GIT_PULL_REQUEST_ID: ${VERCEL_GIT_PULL_REQUEST_ID:-<none>}"

if [[ "$VERCEL_ENV" == "production" ]] ; then
  echo "✅ - Production: build can proceed"
  exit 1
fi

# Preview builds are limited to branches with an open pull request.
# VERCEL_GIT_PULL_REQUEST_ID is an empty string until a PR exists for the
# branch, so ordinary branch pushes still cost nothing.
if [[ "$VERCEL_ENV" == "preview" && -n "$VERCEL_GIT_PULL_REQUEST_ID" ]] ; then
  echo "✅ - Preview for PR #$VERCEL_GIT_PULL_REQUEST_ID: build can proceed"
  exit 1
fi

echo "🛑 - Build cancelled"
exit 0

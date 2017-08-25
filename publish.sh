#!/bin/bash -e

release_version=1.$TRAVIS_BUILD_NUMBER.0

pushd app
echo "Packaging version $release_version ..."
sed -i "s/1.0.0/$release_version/" manifest.json
zip -x\*.git\* -r ../publish.zip *
popd

if [[ "$TRAVIS_BRANCH" != "master" || "$TRAVIS_PULL_REQUEST" != "false" ]]; then
    echo "Not on master branch - skipping release process."
    exit 0
fi

oauth_params="grant_type=refresh_token"
oauth_params+="&client_id=$CHROME_CLIENT_ID"
oauth_params+="&client_secret=$CHROME_CLIENT_SECRET"
oauth_params+="&refresh_token=$CHROME_REFRESH_TOKEN"

echo "Refreshing Google OAuth2 token ..."
token_json=`curl -fsS "https://accounts.google.com/o/oauth2/token" -d "$oauth_params"`
access_token=`echo $token_json | jq -r '.access_token'`
auth_header="Authorization: Bearer $access_token"

echo "Uploading file to Chrome Web Store ..."
curl -fsS -H "$auth_header" -H "x-goog-api-version: 2" -X PUT -T publish.zip \
  "https://www.googleapis.com/upload/chromewebstore/v1.1/items/$CHROME_APP_ID" | jq .

echo "Publishing extension in Chrome Web Store ..."
curl -fsS -H "$auth_header" -H "x-goog-api-version: 2" -H "Content-Length: 0" -X POST \
  "https://www.googleapis.com/chromewebstore/v1.1/items/$CHROME_APP_ID/publish" | jq .

echo "Creating release $release_version in GitHub ..."
python2 build-scripts/lib/create_github_release.py \
  -r="$TRAVIS_REPO_SLUG" -v="$release_version" -n="$TRAVIS_COMMIT_MESSAGE" -c="$TRAVIS_COMMIT" publish.zip

echo "All done."

#!/usr/bin/env bash

# Exit on error
set -e

echo -e "\033[1;35m[AXIS-DEPLOY]\033[0m Starting manual deployment to GitHub Pages..."

# Build the project
echo -e "\033[1;34m[AXIS-DEPLOY]\033[0m Building project..."
GITHUB_PAGES=true npm run build

# Navigate into the build output directory
cd dist

# Create .nojekyll to bypass GitHub Pages Jekyll processing
touch .nojekyll

# Initialize a new git repository in the dist folder
git init
git checkout -b main
git add -A
git commit -m 'deploy: manual update to GitHub Pages'

# Push to the gh-pages branch
# Note: Ensure your remote is named 'origin'
echo -e "\033[1;34m[AXIS-DEPLOY]\033[0m Pushing to gh-pages branch..."
git push -f git@github.com:$(git config --get remote.origin.url | sed -E 's/.*github.com[:\/](.*)\.git/\1/') main:gh-pages

cd -

echo -e "\033[1;32m[AXIS-DEPLOY]\033[0m Deployment complete!"

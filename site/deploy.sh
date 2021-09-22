#!/usr/bin/env sh
set -e

NODE_ENV=production yarn build

cd .vitepress/dist

git init
git branch -m main
git add .
git commit -m 'deploy'
# git push -f git@github.com:ngctnnnn/bl main:gh-pages
git push -f https://github.com/ngctnnnn/ngctnnnn.github.io.git main:gh-pages

cd -

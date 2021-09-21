#!/usr/bin/env sh
set -e

yarn build

cd .vitepress/dist

git add .
git commit -m 'deploy'
git push -f git@github.com:ngctnnnn/blog.git main:gh-pages

cd -

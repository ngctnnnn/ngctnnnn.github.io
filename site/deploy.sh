#!/usr/bin/env sh
set -e

NODE_ENV=production yarn build

cd .vitepress/dist

git init
git add .
git commit -m 'deploy'
git push -f git@github.com:ngctnnnn/blog.git main:gh-pages

cd -

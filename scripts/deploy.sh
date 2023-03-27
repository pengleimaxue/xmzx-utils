#!/usr/bin/env sh

# 忽略错误
set -e

# 构建
npx typedoc

#将图片文件复制到发布目录中

# 进入待发布的目录
cd docs/

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git remote add origin https://github.com/xmzx-utils/xmzx-utils.github.io.git
git add -A
git commit -m 'deploy'
# 如果部署到 https://<USERNAME>.github.io
git push -f https://github.com/xmzx-utils/xmzx-utils.github.io.git master

# 如果是部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
#!/bin/bash

#standard-version 是一款遵循语义化版本（ semver）和 commit message 标准规范 的版本和 changlog 自动化工具。通常情况线下，我们会在 master 分支进行如下的版本发布操作：
#1. git pull origin master
#2. 根据 pacakage.json 中的 version 更新版本号，更新 changelog
#3. git add -A, 然后 git commit
#4. git tag 打版本操作
# 5. push 版本 tag 和 master 分支到仓库

#读取命令参数 默认是分支master和tag升级是中间版本号升级
while [[ "$#" > 0 ]]; do case $1 in
  -r|--release) release="$2"; shift;;
  -b|--branch) branch="$2"; shift;;
  *) echo "Unknown parameter passed: $1"; exit 1;;
esac; shift; done

# Default as minor, the argument major, minor or patch: 
if [ -z "$release" ]; then
    release="minor";
fi

# Default release branch is master 
if [ -z "$branch" ] ; then
    branch="master"; 
fi;


echo "Branch is $branch"
echo "Release as $release"

# Tag prefix
prefix="V"

git pull origin $branch
echo "Current pull origin $branch."

# Generate version number and tag
standard-version -r $release --tag-prefix $prefix --infile CHANGELOG.zh_CN.md

git push --follow-tags origin $branch

echo "Release finished."
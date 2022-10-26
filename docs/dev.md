# Dev doc

## 主要目录

- `src` 源代码
- `playground` 本地测试 demo ，不用于 build
- `build` 打包配置

## dev 本地运行

`yarn dev` 启动本地服务

## build 构建

`yarn build` 构建代码，**使用 src 目录**。

## release 发布

第一，升级 package.json 版本

第二，提交 git tag 可触发 github actions 并发布 npm

```sh
git tag -a v0.0.1 -m "v0.0.1"  # 和 package.json 版本同步即可
git push origin --tags
```
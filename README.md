# shop by cli

## 项目初始化
```
npm install
```

### 项目启动
```
npm run serve
```

### 项目打包
```
npm run build
```

### 检查项目错误
```
npm run lint
```
## 一、错误原因
“npm ERR! code ERESOLVE” 错误通常发生在执行 npm install 或者 npm ci 命令时，表示在解析依赖时发生了问题。可能的原因包括：

依赖版本冲突：不同依赖包要求使用相同的包的不同版本，导致冲突。
依赖解析问题：npm 无法正确解析依赖包的版本。

## 二、解决方法

要解决 “npm ERR! code ERESOLVE” 错误，可以尝试以下解决方法：

删除 package-lock.json 或 npm-shrinkwrap.json 文件： 这两个文件包含了项目依赖的详细信息，有时会导致版本冲突。尝试删除这两个文件，并执行 npm install 或者 npm ci 命令重新安装依赖。

使用 npm 安装代替 yarn 安装： 如果你使用的是 yarn 来安装依赖，可以尝试使用 npm 来替代，因为在某些情况下，npm 可能能够更好地解决依赖问题。

检查依赖版本： 检查项目依赖的版本，确保它们是兼容的，没有版本冲突。可以尝试升级或降级某些依赖版本，以解决冲突。

清除 npm 缓存： 使用 npm cache clean --force 命令清除 npm 的缓存，有时缓存中的旧数据可能导致依赖解析问题。

使用 --legacy-peer-deps 参数： 在执行 npm install 或者 npm ci 命令时，可以尝试添加 --legacy-peer-deps 参数，该参数可以让 npm 在解析依赖时不考虑 peerDependencies。
```bash
npm install --legacy-peer-deps
```
如果你使用的是 yarn，可以尝试在执行 yarn 命令时添加 --check-files 参数，以确保依赖包在本地完整且与 lock 文件匹配。
yarn
```bash
yarn install --check-files
```
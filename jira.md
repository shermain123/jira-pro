# react+ts 

## 必要安装依赖

```
yarn add qs
```

安装项目开发者工具 视频课程专业工具 

```
npx imooc-jira-tool
如果安装失败可以使用以下命令

yarn add jira-dev-tool@1.7.61
npx msw init ./public
```



## 一、项目搭建 及 commit-lint 代码提交规范配置

1.搭建 react+ts脚手架

```
npx create-react-app my-app --template typescript
```

2.tsconfig.js中配置 baseUrl为src表示绝对路径会从src找

```

```

3.格式化工具

```
yarn add --dev --exact prettier
```

3. 根目录新建 .prettierignore文件 过滤不需要格式化的文件    手动格式化命令 yarn prettier --write .

   ```
   build
   coverage
   ```

4.配置commitlint每次githooks提交代码之前格式化代码

```
npx mrm lint-staged 如果安装失败可以尝试 npx mrm@2 lint-staged
```

5.配置package.json文件为

```
"lint-staged": {
    "*.{js,css,md,ts,tsx}": "prettier --write"
  }
```

5.控制台执行 git add . husky  将.husky加入git仓库

6.安装 yarn add eslint-config-prettier -D

7.配置package.json文件

```
"eslintConfig": {
    "rules": {
      "@typescript-eslint/no-unused-vars": "off"
    },
    "extends": [
      "react-app",
      "react-app/jest",
      "prettier" //使用prettier规则覆盖react提交规则
    ]
  },
```



## 二、Mock 方案配置 json Server

1.安装 json-server

```
yarn add json-server -D
```

2.在项目根目录新建 __ __json_server_mock____  文件夹 在文件夹中新建db.json文件

3在package.json文件中配置

```
"scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject",
    "json-server": "json-server __json_server__mock__/db.json --watch --port 3001 --middlewares ./__json_server_mock__/middleware.js" //配置这个
  },
```

4.运行json-server 命令 npm run json-server


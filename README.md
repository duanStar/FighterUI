## FighterUI component library
## 使用 React+typescript 打造自己的简单组件库

[![Build Status](https://travis-ci.com/star2-lab/FighterUI.svg?branch=main)](https://travis-ci.com/star2-lab/FighterUI)


### 安装最后已经发布的组件库来试试

~~~javascript
npm install FighterUI --save
~~~

### 使用

~~~javascript
// 加载样式
import 'FighterUI/dist/index.css'
// 引入组件
import { Button } from 'FighterUI'
~~~

### 课程亮点

* 🔥typescript with React Hooks
* ⛑️使用 react-testing-library 完成单元测试
* 📚使用 storybook 本地调试和生成文档页面
* 📚使用 react-doc-gen 自动生成文档
* 📦使用第三方库扩充组件-(react-fontawesome, react-transition-group)
* 🎉涉及全部流程，包括最后的 npm publish，husky提交发布前验证，travis CI/CD 集成，发布文档站点等

### 一些本地开发命令

~~~bash
//启动本地环境
npm run stroybook

//跑单元测试
npm test

//build可发布静态文件
npm run build

//发布到 npm
npm run publish
~~~

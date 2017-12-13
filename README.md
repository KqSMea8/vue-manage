# iview2-manage-system
基于Vue2 + iView2.0的后台管理系统解决方案简单示例.
### 使用
```
npm i               // 安装依赖
npm run dev         // 本地开发
npm run build       // 生产部署
```
--------------

### 目录结构
	|-- build                                  // webpack配置文件
	|-- config                                 // 项目打包路径
	|-- static                                 // 静态文件目录
	|-- src                                    // 源码目录
	|   |-- components                         // 组件
	|       |-- common                         // 全局
	|           |-- search.vue                  // 搜索
	|           |-- index.vue                  // 入口
	|           |-- login.vue                  // 登录页面
	|   	|-- page                           // 主要页面
	|           |-- increase.vue                   // 新增qa
	|           |-- mavon.vue                    // 富文本框     
	|           |-- markdown-editor.vue        // markdown编辑器
	|           |-- question.vue                  //详情
	|           |-- manage.vue                 // 文件上传
	|   |-- App.vue                            // 页面入口
	|   |-- main.js                            // 程序入口
	|-- .babelrc                               // ES6语法编译配置
	|-- .editorconfig                          // 代码编写规格
	|-- .gitignore                             // push忽略文件
	|-- index.html                             // 入口html页面
	|-- package.json                           // 依赖及配置
	|-- README.md                              // 简介

--------------
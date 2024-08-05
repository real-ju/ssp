# vue3-antd-admin

vite + vue3 + ts + antd 项目模板

注意：下载模板后请先自行在 router/guard/permission/safety.ts 中配置路由鉴权和菜单逻辑，否则会一直 403

### 特性

- 自动导入 Vue API
- SVG 图标解决方案
- 简单、官方的 Typescript+Eslint+Prettier 配置
- Git 提交代码校验
- 路由缓存功能
- 本地和动态两种路由鉴权方案
- Pinia 状态持久化
- 基于 axios 易用的 HTTP 请求库
- 基础主题方案
- 提供三种菜单显示模式，可自由切换

### 安装

- vscode 安装工作区推荐的插件
- .vscode/settings.json 为工作区设置，不建议覆盖已有配置（可添加其他配置）

### 多人开发过程中禁止私人修改的文件

- .vscode，ts，eslint，prettier 相关配置文件
- build 文件夹下的配置文件

如果需要修改，请自行协商，否则可能会出现代码冲突

### 代码格式化

- js，ts 文件：通过 vscode 的 eslint 插件，在保存时自动 fix
- 其他文件：保存时使用 prettier 插件格式化
- 代码提交时会执行格式化校验

### 环境变量

用于整个项目的参数，包括编译阶段+运行时用到的参数

在运行时使用环境变量：utils/env -> getEnv()

- .env 通用
- .env.development 本地开发环境
- .env.production 生产环境
- .env.test 预发布环境

### 文件夹结构和命名

- 除了组件和资源文件，都使用首字母小写的驼峰式命名
- 组件需要使用文件夹包裹起来，且采用首字母大写的驼峰式命名（为了方便在 setup 中使用：https://cn.vuejs.org/api/sfc-script-setup.html#using-components）
- 资源文件建议按页面分文件夹

### 别名

- /@/xxxx => /src/xxxx
- /#/xxxx => /types/xxxx

### HTTP 请求库

/@/utils/http/axios -> httpRequester

- 初始化配置：index -> createRequester 中传入 RequestOptions，所有配置参考 config 文件
- 发起请求单独配置（优先级最高）：get/post/put/delete 第二个参数传入 RequestOptions

配置优先级：发起请求配置 > createRequester 配置 > config 文件配置 > axios 配置

### 全局组件注册

- 需要在 components/registerGlobComp 中手动注册
- 引入 antd 组件也要在 design 中引入组件的样式文件

### 关于引用 Ant Design 中的资源路径

需要全部在 ant-design-vue/es 下引用 ESM，可以加快 vite 的预编译

### 图标

使用 Icon 组件，有三种类型，通过 type 属性定义

- ant antd 图标库
- iconfont fontawesome 图标库
- svg 本地 svg 资源，name 值格式为[dir]-[name]

fontawesome 示例

```html
<Icon name="plus" form="regular"></Icon>
```

### 一些特殊文件夹含义

- enums：TS 枚举值
- logics：与业务和框架耦合的全局逻辑代码
- settings：运行时的参数设置
- utils：完全通用的工具代码（可直接拖到其他项目也能使用）
- hooks：Vue3 Hooks

### 主题

design/theme 下每个文件夹表示一个主题。默认为 default，自定义主题请自行修改 design/antd.less 和 vite.config.ts 中的路径。（目前暂未实现运行时动态修改主题，有想法的朋友欢迎提 issues）

- 修改 Antd 组件库主题：

  1.design/antd.less 中引入 Antd 组件的样式文件

  2.design/theme/xxx/antd.less 中定义组件中 less 变量覆盖默认变量

- 其他全局主题：design/theme/xxx/global 中定义 less 变量，在 construct/constant -> FILES_USE_GLOBAL_THEME_VAR 中添加需要引用全局主题变量的文件路径

### GIT 提交规范(beta)

参考 Angular 的提交信息规范：https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit

#### type 说明

- feat：新功能
- fix：bug 修复
- refactor：代码重构
- perf：性能优化
- build：架构代码
- chore：公共代码（组件/工具库）
- style：代码格式（不影响代码运行的变动）
- docs：文档
- revert：代码回退

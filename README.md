# Vue 技术栈从零搭建一个Vue3全家桶+webpack5基础架构项目

项目环境，nodejs 使用高版本12以上， npm 6以上
vue2的时候有一直用一个搭建好的基础结构，每次开新项目就拉去直接使用，vue3来了，升级了一下这个项目基础结构，系统的整理一下记录一下分享给大家。


## 项目使用的技术栈工具及大版本

 - 语言：javascript
 - 构建工具：webpack 5
 - 前端框架：vue 3
 - 路由：vue router 4
 - 状态管理：vuex 4
 - CSS 预编译处理：less
 - 网络请求工具：axios
 - 前端 UI 框架：element ui

## 项目搭建步骤

### 创建开发目录安装 webpack 工具及开发服务器

	mkdir admin
	cd admin
	# 初始化项目生成 package.json
	npm init -y
	# 安装 webpack工具 及dev-server服务
	npm i webpack webpack-cli webpack-dev-server webpack-merge --save-dev

当前我的安装成功后的版本：

```bash
+ webpack-merge@5.8.0
+ webpack-cli@4.10.0
+ webpack-dev-server@4.9.3
+ webpack@5.74.0
```
#### 安装webpack 需要的一些 loader

```bash
# 安装 html 模板解析器
npm i html-webpack-plugin --save-dev
# 安装 css-loader style-loader less-loader
npm i css-loader style-loader url-loader less-loader --save-dev
# 安装 babel
npm i babel-loader @babel/core @babel/preset-env -D
```


### 基础项目文件结构
在项目根目录创建两个文件夹
```bash
mkdir public
mkdir src
```
在 public 目录创建一个 index.html 文件，复制一个 favicon.ico 文件过来

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```
#### 安装 vue 全家桶
```bash
    # 最新稳定版的 vue
    npm install vue@next
    # 单文件组件@vue/compiler-sfc, vue-loader解析
    npm install -D @vue/compiler-sfc vue-loader
    # vue router 路由及 vuex
    npm install vue-router@4 vuex --save
```
当前我的本机环境安装后的版本号：

```bash
+ vue@3.2.36
+ @vue/compiler-sfc@3.2.37
+ vue-loader@17.0.0
+ vue-router@4.1.2
+ vuex@4.0.2
```

#### 创建项目文件结构
先创建一个这样的目录结构备用

```bash
├── App.vue   		入口文件
├── api  			接口文件目录
├── assets 			静态资源目录
├── components  	组件目录
├── layout  		布局文件目录
├── main.js 		入口 js
├── router 			路由文件目录
├── store  			vuex 目录
└── utils  			项目工具类目录
```
src 目录结构如下图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/53a307d60dcb4503a35b0d819ba64c8c.png)
#### 完善入口 main.js 文件和 App.vue 文件

##### main.js

```javascript
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')

```
##### App.vue

```javascript

<template>
  <div>
    <router-link to="/">首页</router-link>
    <router-link to="/about">About</router-link>
  </div>
  <router-view></router-view>
</template>

<style>
html,body{
  padding: 0;
  margin: 0;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
```

### 配置 webpack配置文件
在 src 的同级目录再创建一个 config 文件目录，创建一个 webpck.dev.js 配置文件
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].build.js'
  },
  mode: "development",
  devtool: 'source-map',
  resolve: {
    // 快捷目录别名
    alias: {
      "@": path.resolve('./src'),
    },
    // 配置文件扩展名，引入的时候可以不需要加后缀名了
    extensions: [ '*', '.js', '.ts', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test:/\.js$/,
        exclude:/node_modules/, //排除node_modules文件夹
        use:{
          loader:'babel-loader', //转换成es5
          options:{
            presets:['@babel/preset-env'], //设置编译的规则
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    })
  ]
};
```


添加两个启动脚本在 package.json 文件中
在 package.json 的 script 中添加两个脚本命令：

```javascript
"build": "webpack --config config/webpack.dev.js",
"dev": "webpack serve --config config/webpack.dev.js",
```
这里，运行两个命令都可以成功了。
打包和开发都可以跑起来了。

测试一下打包

```bash
npm run build
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/36d741ad58bd4e6eb4cdc2746c0cd375.png)
运行一下开发模式

```bash
npm run dev
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/89d65263066e4a04a2ea7875232d4db0.png)
到这里一个最简单的 webpack + vue 开发环境配置就完成了，可以解析.vue单文件组件，可以解析 CSS，也可以正常启动开发和打包。

接下来继续完善

### 添加 less 解析

```bash
# 安装 less-loader
npm i install less less-loader --save-dev
```
webpack 中配置添加 less-loader

```javascript
{
   test: /\.less$/,
   use: [
     'style-loader',
     'css-loader',
     'less-loader'
   ]
 }
```
测试一下，在 App.vue 中随便写一点 less 样式，页面中文字变成红色，less 添加完成。

```javascript
<style lang="less" scoped>
  body{
    div {
      color: red;
    }
  }
</style>
```

### 安装前端 UI 框架，element-plus
[element-plus](https://element-plus.gitee.io/zh-CN/guide/installation.html)

```bash
npm install element-plus --save
```
如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。
这个自己评估项目，如果你这个项目你预估会非常多的模块，是一个中大型级后台，那么推荐按需引入，文件体积能少一点还是少一点，
如果是小后台，就几个小模块，懒的麻烦完整引入不在乎文件体积大小，自己判断就行。

修改一下 main.js，
添加引入 element-plus
```javascript
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
```
 在 app 实例后添加
```javascript
app.use(ElementPlus)
```
当前 main 文件
```javascript
import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)

app.mount('#app')

```
可以 App.vue 文件中添加一个按钮组件测试一下，看一下UI 渲染是否成功了。

```javascript
<el-button type="primary">Primary</el-button>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/ff193935af5e4689936984e7c3dd1127.png)
渲染成功，安装完成。

###  后台管理界面框架 + vue router 路由完善

#### 建立页面基础结构
src 目录下创建一个 pages 目录，创建几个基础路由页面，404错误页面，登录成功的首页，登录页面。

```bash
├── common
│   └── 404.vue
├── home
│   └── index.vue
└── login
    └── index.vue
```
在 home/index.vue 中随便写点东西

```javascript
<template>
  <h3>Home page</h3>
</template>
```

#### layout 目录后台管理界面结构
src目录中创建一个 layout 目录，在 layout 目录下创建后台管理界面，基本结构如下图：
左为菜单项目，右：头部，面包屑，主路由内容区

![在这里插入图片描述](https://img-blog.csdnimg.cn/15621fdca7424552961bf9cc16c5733a.png)
在 layout 中建立以下文件结构，可以根据需求自己调整

```bash
├── breadcrumb
│   └── index.vue
├── header
│   └── index.vue
└── sidebar
    └── index.vue
├── index.vue
```

#### 完善 router 路由
在 src 下的 router 目录中开始完善路由，让界面渲染出来跑起来。

```bash
├── common.js   # 公共页面
└── index.js    # 入口路由
```
我们采用 index.js 入口引入其它模块路由

##### index.js

```javascript
import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'

import { commonRoutes } from "./common"; // 公共路由
// import { imageRoutes } from "./image/index"; // 业务模块

const routes = [
  ...commonRoutes,
  // ...imageRoutes
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
```

##### common.js

```javascript

import Layout from "@/layout/index.vue";
import Home from "@/pages/home/index.vue";

export const commonRoutes = [
  {
    path: "/login",
    name: "登录",
    component: () => import("@/pages/login/index.vue"),
  },
  {
    path: "/",
    name: "home",
    component: Layout,
    meta: {
      title: '运营中心'
    },
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home-Index",
        meta: {
          title: '控制台'
        },
        component: () => Home,
      }
    ],
  },
  {
    path: '/404',
    name: '404',
    component: Layout,
    meta: {
      title: 'Error'
    },
    children: [
      {
        path: "",
        name: "404page",
        meta: {
          title: '404'
        },
        component: () => import('@/pages/common/404.vue')
      }
    ],

  },
  {
      path: '/:pathMatch(.*)',
      redirect: '/404'
  }
];

```

在 main 文件中添加路由引入

```javascript
import router from './router/index'

app.use(router)
```

路由搭建好之后，继续把 layout 布局内容完善一下

#### 完善 layout结构
##### App.vue
去掉多余的演示数据

```javascript
<template>
  <router-view></router-view>
</template>

<style>
  html,body{
    padding: 0;
    margin: 0;
    width: 100%;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
</style>

```

#####  layout 的 index.vue

```javascript
<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="sidebar " >
        <Sidebar></Sidebar>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <Breadcrumb></Breadcrumb>
          <div class="layout-content">
            <div class="layout-main">
              <router-view />
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
  import Sidebar from "./sidebar/index.vue"
  import Header from "./header/index.vue"
  import Breadcrumb from './breadcrumb/index.vue'
</script>

<style lang="less" scoped>
  .common-layout{
    height: 100vh;
  }
  .el-header{
    padding: 0;
  }
  .el-main{
    padding: 0;
    background-color: #f2f2f2;
  }
  .sidebar{
    width: 230px;
    height: 100vh;
    background-color: #001529;
    overflow: hidden;
    -webkit-box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
    box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
    transition: all .2s;
  }
  .sidebar-hide{
    width: 70px;
  }
  .layout-content{
    padding: 15px;
  }
  .layout-main{
    background-color: #fff;
    padding: 15px;
    min-height: 40vh;
  }
</style>
```
##### header/index.vue

```javascript
<template>
  <div class="header">
    <div class="trigger">
      <el-icon >
        <DArrowLeft />
      </el-icon>
    </div>
    <div class="f5">
      <el-icon><RefreshRight /></el-icon>
    </div>

    <el-popover placement="bottom" :width="160" trigger="click">
      <template #reference>
        <div class="header-right">
          <el-avatar size="small" :icon="UserFilled" />
          <span class="name">Admin</span>
          <el-icon><ArrowDown /></el-icon>
        </div>
      </template>
      <div class="person" @click="exit">
        <!-- 暂无扩展内容 -->
        <span>退出登录</span>
        <el-icon><Close /></el-icon>
      </div>
    </el-popover>

  </div>
</template>

<script setup>
  import { UserFilled } from '@element-plus/icons-vue'

  function exit() {
    consolelog('exit localStroge clear')
  }


</script>

<style lang="less" scoped>
  @uiColor: #409eff;
  .header {
    position: relative;
    height: 60px;
    padding: 0;
    background: #fff;
    -webkit-box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  }
  .trigger{
    height: 60px;
    line-height: 60px;
    vertical-align: top;
    padding: 0 22px;
    display: inline-block;
    cursor: pointer;
    -webkit-transition: all .3s,padding 0s;
    transition: all .3s,padding 0s;
  }
  .f5{
    height: 60px;
    line-height: 60px;
    vertical-align: top;
    display: inline-block;
  }
  .header-right{
    float: right;
    height: 100%;
    margin-left: auto;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding-right: 20px;
    cursor: pointer;
  }
  .header-right:hover{
    color: @uiColor;
  }
  .header-right .name{
    padding: 0 8px;
  }
  .person{
    display: flex;
    justify-content: end;
    align-items: center;
    cursor: pointer;
    span{
      padding-right: 5px;
    }
  }
</style>
```

##### breadcrumb/index.vue

```javascript
<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="(item, index) in listBread"
      :key="index + '-'+item.path">
      <span v-if="index == 0">{{ item.meta.title }}</span>
      <router-link v-else :to="item.path">{{ item.meta.title }}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";

const listBread = ref([]);
const route = useRoute();

// 监听路由变化
watchEffect(() => {
  listBread.value = route.matched;
});

</script>

<style lang="less" scoped>
  .breadcrumb{
    padding: 20px;
    background-color: #fff;
  }
</style>
```
##### sidebar/index.vue
这里放菜单信息，是动态接口返回还是本机固定路由，
自由控制

```javascript
<template>
  <div class="logo-hd">
    <h2><span class="big">A</span><span class="sub-tit">dmin</span></h2>
  </div>
  <!-- 这里放菜单信息 -->
  <el-menu
    class="menu"
    active-text-color="#409eff"
    background-color="#001529"
    text-color="#fff"
    default-active="1"
    :unique-opened="true"
    :default-openeds="['1', '2']">
    <el-sub-menu
      v-for="(item, index) in menuList"
      :key="item.id"
      :index="'m-' + index"
    >
      <template #title>
        <el-icon :size="14" >
          <component :is="item.meta.icon "></component>
        </el-icon>
        <span class="menu-name">{{ item.name }}</span>
      </template>
      <el-menu-item
        v-for="(child, childIndex) in item.children"
        :key="child.id"
        :index="index + '-' + childIndex"
      >
        <router-link :to="child.url" class="menu-name">{{ child.name }}</router-link>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
  import { reactive } from 'vue'
  const menuList = reactive([
    {
      id: 1,
      name: "首页",
      url: "/home",
      meta: {
        icon: "House"
      },
      children: [
        { id: 3, name: "运营中心", url: "/home" },
      ],
    }
  ])
</script>

<style lang="less" scoped>
  @menuColor: #409eff;
  .logo-hd{
    text-align: center;
    color: #fff;
  }
  h2{
    font-size: 20px;
  }
  .big{
    font-size: 24px;
    font-weight: 500;
    color: #f60;
  }
  .sidebar-hide .sub-tit{
    display: none;
  }


  .menu{
    border-right: 0;
    transition: all .2s;
  }
  .menu-name{
    color: #fff;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .is-opened .el-menu-item{
    background-color: #000c17 ;
  }
  .is-opened .is-active{
    background-color: @menuColor !important ;
  }
  .el-menu-item{
    font-size: 12px;
    --el-menu-sub-item-height: 40px;
    --el-menu-active-color: @menuColor;
    a{
      text-decoration: none;
      color: hsla(0,0%,100%,.65);
    }
    .router-link-active{
      color: #fff;
    }
  }
  .is-active{
    background-color: @menuColor;

  }
  .is-active:hover{
    background-color: @menuColor;
  }
  .el-menu-item:hover{
    a{
      color: #fff;
    }
  }


</style>

```

到这里页面结构已经渲染出来了，如图示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/c92a04982a4843d8add38da423460c73.png)

##### login.vue
再来写一个登录界面

```javascript
<template>
  <div class="login" :style="'background-image: url(' + bgpic + ')'">
    <el-form class="form-signin" >
      <h3 class="">管理平台</h3>
      <div class="item">
        <el-input placeholder="用户名" v-model="userInfo.username"></el-input>
      </div>
      <div class="item">
        <el-input show-password placeholder="密码" v-model="userInfo.pass">
        </el-input>
      </div>
      <div class="act-btn">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script >
import { reactive } from 'vue'
import { ElMessage } from "element-plus";
import { useRouter } from 'vue-router'

export default {
  name: 'login',
  data () {
    return {
      username: '',
      pass: '',
      roundPic: [
        'https://s.cn.bing.net/th?id=OHR.MangroveDay_ZH-CN5590436101_1920x1080.jpg',
        'https://s.cn.bing.net/th?id=OHR.FourTigresses_ZH-CN4095017352_1920x1080.jpg'
      ],
      bgpic: '',
    }
  },
  created () {
    this.bgpic = this.roundPic[parseInt(Math.random() * this.roundPic.length)]
  },
  setup() {
    const router = useRouter()
    const userInfo = reactive({
      username: '',
      pass: '',
    })


    function login() {
      if (userInfo.username == '' || userInfo.pass == '') {
        ElMessage.error('账号或者密码不能为空！')
        return
      }
      let params = {
        username: userInfo.username,
        password: userInfo.pass
      }

      localStorage.setItem('token', '登录成功')
      // 跳转到首页
      router.push('/')
    }

    return {
      userInfo,
      login
    }

  },
}
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  background-color: #dadada;
}

.login {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.item {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}

.form-signin {
  width: 350px;
  min-height: 240px;
  padding: 15px 45px 45px;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 2;
  margin-left: -225px;
  margin-top: -160px;
  background-color: #fff;
}
.act-btn{
  padding-top: 10px;
}
.act-btn button {
  width: 100%;
}

</style>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/3c8afc982f6a4a62b8b3732e8559af6a.png)




### axios 网络请求

#### 封装网络请求
```bash
# 安装 axios 和 events
npm install axios events --save-dev
```
在 src/utils 目录下，建一个 http 文件夹再创建一个 request.js 文件

```javascript
/*
 * @Description: axios
 * @Author: oscar
 * @Date: 2021-12-09 21:19:39
 */
import { ElMessage } from "element-plus";

import * as axios from "axios";
import * as EventEmitter from 'events';

class Request extends EventEmitter {
  constructor() {
    super();
    this.interceptors();
  }
  interceptors() {
    // 请求拦截器
    axios.interceptors.request.use(
      // 发送请求之前
      config => {
        // 头部设置 签名
        config.headers.sign = '' // 略，根据后端协商自行完善
        // 头部设置 token
        config.headers.token = '' // 略，根据后端协商自行完善
        return config;
      },
      error => {
        // 请求错误
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    axios.interceptors.response.use(
      response => {
        const code = response.status;
        // 根据自己的业务代码进行响应拦截
        if ((code >= 200 && code < 300) || code === 304) {
          const res = response.data
          // 成功的事件回调，可以略，可以全局的去做一些业务处理
          this.emit("Success", res);
          return Promise.resolve(res);
        } else {
          console.log(response)
          // 响应错误逻辑处理 5xx 4xx 等等
          this.emit("Error", response);
          return Promise.reject(response);
        }
      },
      error => {
        // 响应错误逻辑处理
        console.log(error);
        // 接口异常了，全局的去针对业务做一些配置处理，不需要可以去掉
        this.emit("Error");
        return Promise.reject(error);
      }
    );
  }

  get(url, params) {
    return axios({
      method: 'get',
      url,
      params
    });
  }
  post(url, data) {
    return axios({
      method: 'post',
      url,
      data
    });
  }
  delete(url, data) {
    return axios({
      method: 'delete',
      url,
      data
    });
  }
  put(url, data) {
    return axios({
      method: 'put',
      url,
      data
    });
  }
  patch(url, data) {
    return axios({
      method: 'patch',
      url,
      data
    });
  }
}


const dialogMessage = (message) => {
  if (!message) {
    console.error('empty message')
    return
  }
  ElMessage.error(message)
}

let request = new Request();

request.on('Success', function(data) {
  console.log('Success:', data );
});

request.on('Error', function(data) {
  console.log('Error:', data );
});

export default request;

```

#### 创建接口文件
在 src/api 目录下创建一个 demo.js 文件

```javascript
// 接口测试 DEMO

import request from "@/utils/http/request.js"

//  测试 GET
export const getDemo = (params) => {
  let url = 'http://jsonplaceholder.typicode.com/comments'
  return request.get(url, params)
}
```

#### 使用方法
随便找个地方来测试一下，
这里使用前面用到的首页组件来测试一下。

```bash
# 引入接口文件
import { getDemo } from '@/api/demo'

# 调用对应的方法，传入参数
const param = {
 	postId: 1
}
getDemo(param).then( res=> {
  	state.result = res
}).catch( err=> {

})
```
完整示例代码如下：

```javascript
<template>
  <h3>Home page</h3>
  <el-button @click="getTest">Get Request Test</el-button>
  <div v-if="state.result && state.result.length > 0">
    <div class="item" v-for="item in state.result" :key="item.id">id: {{ item.id }}, name: {{ item.name }}, email: {{item.email}}</div>
  </div>
</template>

<script setup>
  import { getDemo } from '@/api/demo'
  import { reactive } from "vue"
  const state = reactive({
    loading: false,
    result: []
  })
  function getTest() {

    const param = {
      postId: 1
    }
    getDemo(param).then( res=> {
    // 成功后这里处理业务逻辑
      state.result = res
    }).catch( err=> {
    // 失败了这里处理业务逻辑

    })
  }

</script>
```

点击 Get Request Test 按钮，会发出一个网络请求

![在这里插入图片描述](https://img-blog.csdnimg.cn/0998bf2abeb04f1d95991d28bb057d42.png)
axios封装成功。

### vuex 状态管理
做一个登录的小功能来测试一下 vuex
在 api/demo.js 中添加一个获取用户信息的接口

```javascript
// 获取用户资料
export const getUser = (params) => {
  let url = 'https://jsonplaceholder.typicode.com/users/1'
  return request.get(url, params)
}

```

在 src/store 下创建以下文件，随自己的心意组织，项目小可以只创建一个文件搞定。
先有思想把内容组织一下这样后期有扩展添加也不会显的乱。

```javascript
├── common			// 公共的数据，全项目都会常用到的
│   └── menu.js		// 比如菜单
├── index.js 		// 入口的 vuex文件，在这里引入其它模块
└── module			// 模块包
    └── user.js		// user用户模块，有其它业务模块可以继续添加
```

文件内容
##### store/index.js

```javascript
import { createStore } from "vuex";
import user from "@/store/module/user"; // 引入业务模块下的用户模块
import common from "@/store/common/menu"; // 引入公共模块下的菜单模块

export default createStore({
  modules: {
    user,
    common
  },
});

```

##### store/common/menu.js

```javascript
// 不写，演示用

export default {
  state: {
    isCollapse: false, // 控制菜单展开与折叠
    menuList: []
  },
  mutations: {
    change(state, status) {
      state.isCollapse  = Boolean(status)
    }
  },
  actions: {},
  getters: {},
  modules: {},
};

```

##### store/module/user.js

```javascript
import { getUser } from '@/api/demo'
export default {
  namespaced: true,
  state: {
    user: JSON.parse(localStorage.getItem('USERINFO')) || {} , // 用户数据
  },
  mutations: {
    // 修改用户信息
    changeUser(state, data) {
      localStorage.setItem('USERINFO', JSON.stringify(data))
      state.user  = data
    },
    // 退出清空缓存数据
    exitUser() {
      localStorage.clear()
    }
  },
  actions: {
    // 获取用户信息
    login({ commit }, params) {
      return new Promise((resolve, reject) => {
        getUser(params).then(res => {
          // 更新用户资料
          commit('changeUser', res)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 用户退出
    userLogout({ commit }) {
      return new Promise((resolve, reject) => {
        // 根据业务需要，是否通知服务端，清空token有效期
        commit('exitUser')
        resolve({})
      })
    }
  },
  getters: {},
  modules: {},
};

```

##### 在 mian.js 中引入 vuex
在项目入口文件 main.js中添加两行

```javascript
import store from './store/index'
app.use(store)
```

#### 使用 vuex
##### login.vue 登录

```javascript
# 引入 vuex
import { useStore } from 'vuex'
```
 在setup中实例化

```javascript
let store = useStore()
// 调用 vuex 中的 action 登录
store.dispatch('user/login', params ).then((res) => {
   if(res.id) {
     router.push('/')
   }
 })
```
完整的 login.vue登录页面的 JS代码

```javascript
import { reactive } from 'vue'
import { ElMessage } from "element-plus";
import { useRouter } from 'vue-router'
import { getUser } from '@/api/demo'
import { useStore } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      username: '',
      pass: '',
      roundPic: [
        'https://s.cn.bing.net/th?id=OHR.MangroveDay_ZH-CN5590436101_1920x1080.jpg',
        'https://s.cn.bing.net/th?id=OHR.FourTigresses_ZH-CN4095017352_1920x1080.jpg'
      ],
      bgpic: '',
    }
  },
  created () {
    this.bgpic = this.roundPic[parseInt(Math.random() * this.roundPic.length)]
  },
  setup() {
    let store = useStore()
    const router = useRouter()
    const userInfo = reactive({
      username: '',
      pass: '',
    })


    function login() {
      if (userInfo.username == '' || userInfo.pass == '') {
        ElMessage.error('账号或者密码不能为空！')
        return
      }
      let params = {
        username: userInfo.username,
        password: userInfo.pass
      }

      // 调用 vuex 中的 action 登录
      store.dispatch('user/login', params ).then((res) => {
        if(res.id) {
          router.push('/')
        }
      }).catch(err => {
        console.error(err)
      })
    }

    return {
      userInfo,
      login
    }

  },
}
```

点击登录，跳转到首页并缓存了登录信息。

####  router 路由守卫
在 src 目录下添加一个 permission.js 文件

```bash
# 添加一个进度条组件
npm install nprogress --save-dev
```

```javascript
import NProgress from 'nprogress' // Progress 进度条
import router from './router'
import 'nprogress/nprogress.css'
import { ElMessageBox } from "element-plus";
const whiteList = ['/login'] // 不重定向白名单


router.beforeEach((to, from, next) => {
  NProgress.start()
  let userinfo = localStorage.getItem('USERINFO');
  // 白名单不校验是否有权限
  if ( whiteList.includes(to.path) ) {
    next()
  } else {
    if (userinfo) {
      next();
    } else {
      ElMessageBox.alert('非法访问，请返回登录', 'Error', {
        confirmButtonText: '确定',
        center: true,
        callback: () => {
            next({
              path: '/login'
            });
        },
      })

    }
  }
});

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

```

main.js 入口中引入

```javascript
// 权限路由过滤
import './permission'
```
这样没有登录成功的用户除了白名单路由，访问其它路由都会弹出警告提示跳转回登录页面。
![在这里插入图片描述](https://img-blog.csdnimg.cn/b21fc81c5d6e4ba493c36547d5340f1a.png)


### 总结
至此，已经完成了基础的一个前端项目
 - npm项目初始化
 - 添加 webpack
 - 添加 vue全家桶
 - 添加 element ui 前端UI框架
 - 封装 axios 网络请求
 - 组织使用了 vuex 状态管理

到这里，只是一个最最简单的基础框架，并不能直接用到生产中，
##### 待优化完成事项
可以根据实际情况对代码进行调整

 - webpack 的配置文件区分生产测试环境
 - 接口文件使用反向代理
 - webpack 配置打包编译优化
 - vue 业务常用的业务组件封装
 - axios 请求根据实际业务请求进行判断处理，错误异常拦截处理
 - 组件缓存的相关处理
 - 菜单路由由后端接口在登录中返回前端进行动态路由渲染
 - 自定义指令进行按钮级别的权限控制
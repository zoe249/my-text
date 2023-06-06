# com打包上线流程步骤

## 重点：

### 1.上线部署之前，在本地环境切换至正式环境，切换完成之后，使用运行在本地项目登录进入正式环境，如果没有问题，检查无误后，再进行打包

### 2.打包说明：dist 目录

若是悦朋的线上包：将目录名称修改为 dist-yp,进行压缩之后，发至后端，部署悦朋正式环境

若是喜燕万家的线上包，将目录名称修改为dist-xywj,进行压缩之后，发至后端，部署喜燕万家正式环境

## 1.http.js

环境切换

代码：

```js
switch (process.env.NODE_ENV) {
  case 'production':
    // 发布上线、生产环境的请求地址
    // axios.defaults.baseURL = 'https://o2o.yuepong.com/api-gateway/hh-com' // 黄河
    // axios.defaults.baseURL = 'https://www.yuepong.cn/test/com/api-gateway' // 测试环境
    axios.defaults.baseURL = 'https://www.yuepong.cn/dev/com/api-gateway' // 开发环境
    break
  case 'test':
    // 测试环境的请求地址
    // axios.defaults.baseURL = 'http://dev.yuepong.com:9091'
    // axios.defaults.baseURL = 'https://dev.yuepong.com:9093/api-gateway' // 开发环境
    break
  default:
    // axios.defaults.baseURL = 'https://dev.yuepong.com:9093/api-gateway'
    // 除了生产环境、测试环境，剩下的环境，比如开发环境"development"
    // axios.defaults.baseURL = 'https://o2o.yuepong.com/api-gateway/hh-com' // 黄河
    // axios.defaults.baseURL = 'https://www.yuepong.cn/test/com/api-gateway' // 线上 测试环境
    axios.defaults.baseURL = 'https://www.yuepong.cn/dev/com/api-gateway' // 开发环境
  // axios.defaults.baseURL = 'http://localhost:8080'
}
```

开发环境，测试环境，黄河

## 2.vue.config.js

修改打包发布后线上访问路径

```js
// // 引入等比适配插件
// const px2rem = require('postcss-px2rem')

// // 配置基本大小
// const postcss = px2rem({
//   // 基准大小 baseSize，需要和rem.js中相同
//   remUnit: 16
// })

module.exports = {
  // lintOnSave: true,
  // publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // 正式环境
  publicPath: process.env.NODE_ENV === 'production' ? '././' : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/scss/_variable.scss";'
      }
    }
  }
}

```

## 可视化打包

### 1.win+r命令输入cmd打开窗口

[![OukFSA.png](https://s1.ax1x.com/2022/05/06/OukFSA.png)](https://imgtu.com/i/OukFSA)

### 2.输入命令vue ui打开可视化工具

[![OuURUS.png](https://s1.ax1x.com/2022/05/06/OuURUS.png)](https://imgtu.com/i/OuURUS)

### 3.找到对应项目

[![OuAUDP.png](https://s1.ax1x.com/2022/05/06/OuAUDP.png)](https://imgtu.com/i/OuAUDP)

### 4.根据步骤进行打包操作

[![OuAo8J.png](https://s1.ax1x.com/2022/05/06/OuAo8J.png)](https://imgtu.com/i/OuAo8J)

### 5.进行打包【dist】文件

[![OuE0qx.png](https://s1.ax1x.com/2022/05/06/OuE0qx.png)](https://imgtu.com/i/OuE0qx)

### 6.将dist文件压缩并发给相关后端人员

[![OuE6iD.png](https://s1.ax1x.com/2022/05/06/OuE6iD.png)](https://imgtu.com/i/OuE6iD)

或npm run build 都可以






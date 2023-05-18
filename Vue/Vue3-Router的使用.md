## 一、安装

* 使用npm 安装

​			`$ npm install vue-router`

* 在router 文件夹下创建index.js 文件

  ```js
  // 引入
  import { createRouter, createWebHashHistory } from 'vue-router'
  
  import Home from '../views/home.vue';
  import About from '../views/about.vue'
  
  const routes = [{
              path: '/',
              component: Home
          },
          {
              path: '/about/:id',
              component: About
          }
      ]
  const router = createRouter({
      // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
      history: createWebHashHistory(),
      routes, // `routes: routes` 的缩写
  })
  
  // 导出
  export default router
  ```

* 在 main .js 文件引入

  ```js
  
  import App from './App.vue'
  import router from './router'
  
  // 引入 
  import { createApp } from 'vue'
  
  // 创建实例对象 app 类似于Vue2中的vm，app更轻量
  const app = createApp(App)
  app.use(router)
      // 挂载
  app.mount('#app')
      // setTimeout(() => {
      //     app.unmount('#app')
      // }, 1000)
  ```

  

## 二、在 vue 文件使用

​	vue3 在 文件中使用需要先导入

```js
// useRoute使用与 vue2 中的this.$route基本一致
// useRouter使用与 vue2 中的this.$router基本一致
import {useRoute,useRouter} from 'vue-router'
```

​	在 setup() 中使用

```js
<script>
import {onMounted} from 'vue'
import {useRoute,useRouter} from 'vue-router'
export default {
  setup(){
    const router = useRouter();
    const route = useRoute()
    onMounted(()=>{
        router.push({
            name:'home'
        })
      console.log(router)
      console.log(route.path) // 打印当前路径
    })
  }
}
</script>
```


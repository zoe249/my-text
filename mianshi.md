## 威海快客利

时间：`2023-08-31`

* 说说`uniapp`与原生小程序的不同之处

  * 生命周期不同

    `uniapp`的生命周期包括**页面生命周期**和**组件生命周期**

    页面生命周期
    
    | 函数名     | 说明                                                         |
    | ---------- | ------------------------------------------------------------ |
    | `onInit`   | 监听页面初始化，其参数同 onLoad 参数，为上个页面传递的数据，参数类型为 Object（用于页面传参），触发时机早于 onLoad |
    | `onLoad`   | 监听页面加载，该钩子被调用时，响应式数据、计算属性、方法、侦听器、props、slots 已设置完成，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参） |
    | `onShow`   | 监听页面显示，页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面 |
    | `onReady`  | 监听页面初次渲染完成，此时组件已挂载完成，DOM 树($el)已可用，注意如果渲染速度快，会在页面进入动画完成前触发 |
    | `onHide`   | 监听页面隐藏                                                 |
    | `onUnload` | 监听页面卸载                                                 |

​    		  组件生命周期，**与Vue一致**

​			 **注意：created为组件生命周期，因此created执行先于onLoad**

​			**Vue3 在实现时 created 先于 onLoad 执行；Vue2 项目由于历史包袱较重不便修改，仅在使用组合式API时与Vue3对齐。**


​			**在编写代码时不应依赖 created 和 onLoad 生命周期执行顺序**

* 小程序页面的最大跳转堆栈是多少

  10 层

* 回调地域怎么解决

  `Promise、asycn await`

* 给你一个小数 `0.32133489671`
  * 这个怎么实现保留两位小数

    `num.toFixed(2)` 四舍五入

  * 怎么实现向上保留两位小数

    `Math.ceil(n * 100) / 100`

  * 怎么实现向下保留两位小数

    `Math.floor(n * 100) / 100`

* 为什么`0.00000001+0.000000002` 的结果不等于 `0.00000003`


* `let`和`const`有什么作用，与`var`的区别是什么

* `this`的指向问题

* 实现一个下拉加载更多的功能，口述代码

## 沭聚物联

时间：`2023-09-05`

* `vue2`和`vue3`有什么区别
* `vue2`的生命周期
* `v-model`的实现原理
* `es6`有什么新特性
* `项目中的难点`
* `Pinia`是做什么的

## 好物聚汇

时间：`2023-09-08`

* `axios`是什么
  是基于`http`和`Promise`封装的网络请求库
  支持所有`Promise`的API
  可以拦截请求和响应请求
  并将请求返回的数据转换为JSON格式
  在客户端和服务端都可以用
* 登录时`token`怎么存起来
* 说一下本地存储
  `sessionStorage` 仅在当前会话下有效，关闭页面后就会被清除
  `localStorage` 会永久存储在在客户端，除非手动删除
  用法
    xx.setItem()
    xx.getItem()
    xx.removeItem()
    xx.clear()
* `v-model`的修饰符
  `.trim` 去除空格
  `.number` 限制number类型
  `.lazy` 在 "change" 事件后同步更新而不是 "input"
* `v-on`的修饰符
  `.stop` 单击事件将停止传递
  `.prevent` 提交事件将不再重新加载页面
  `.capture` 添加事件监听器时，使用 `capture` 捕获模式例如：指向内部元素的事件，在被内部元素处理前，先被外部处理
  `.once` 事件最多被处理一次
  `.passive` 修饰符一般用于触摸事件的监听器
* 图片懒加载
  `vue-lazyload` 或者 自定义指令
* 路由懒加载
* 首页加载速度

## 天津银河百荣

时间：`2023-09-19`

* `Vue3`和`Vue2`的区别
* `Vuex`和`Pinia`的区别
* `Vue`的导航守卫
* 项目中的菜单权限是怎么解决的
* 说一下原型链
* 闭包是什么,会带来什么问题,怎么解决,哪种更好
* 深拷贝和浅拷贝的区别,实现深拷贝有几种方式
* 微信小程序的授权流程
* TypeScript 和 JavaScript 的区别
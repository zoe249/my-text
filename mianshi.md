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

## 山东德德

时间：`2023-12-01`

- `React`的常用`Hooks`

#### `useState`和`useRef`的区别

  - `useState`

    `useState`是`React Hooks`的基础，它允许在函数式组件中管理状态和更新状态。

    返回值：

    1. 当前的`state`，在首次渲染时，会匹配初始默认值
    2. `set`函数，它可以将`state`更新为不同的值并<font color="red">触发渲染</font>

    ```javascript
    import { useState } from 'react'
    const MyComponent = () => {
        // const [state, setState] = useState()
        const [age, setAge] = useState(8)
        const handleClick = () => {
            setAge(18)
        }
        return (
            <button onClick={handleClick}>
              点击！
            </button>
      	);
    }
    ```

  - `useRef`

    `ref`对象的`current`属性的初始值，可以是任意类型的初始值

    `current` 可以直接赋值给任意值
    

    返回值：
    
    

    * `current`初始值为传递的默认值(`initialValue`)

      <font color='red'>常用来操作DOM</font>

    ```javascript
    import { useRef } from 'react'
    function MyComponent() {
        const ref = useRef(0)
        const handleClick = () => {
            ref.current = 1
        }
        return (
            <button onClick={handleClick}>
              点击！
            </button>
      	);
    }
    ```

    

    

#### `JavaScript事件队列 Event Loop ?`
  `JavaScript` 的整体代码

  - 同步任务 同步代码
  - 异步任务 异步代码
    - 宏任务
      - `setInterval()`
      - `setTimeout()`
      - `setImmediate()`
      - `ajax`网络请求
      - 事件绑定
    - 微任务
      - `new Promise()`后的`than`与`catch`函数
      - `new MutaionObserver()`
      - `process.nextTick()`

  ![](https://img-blog.csdnimg.cn/012721d236ee4b4b96df67fc8e65570c.jpeg)

#### `JavaScript`闭包的作用和弊端，怎么解决弊端

* 定义：闭包就是函数的嵌套，内部函数使用外部函数的变量，当响应的函数执行完之后，被引用的变量并不会被`JavaScript`回收，不正当的使用闭包会造成<font color='red'>内存泄漏</font>

  ```javascript
  function f1() {
      var count = 0
      return function() {
          count++
          console.log(count)
          return count
      }
  }
  
  let f = f1()
  f() // 1 
  f() // 2 打印值 count 会累计
  f() // 3 因为内部的 count 并不会被 JavaScript 回收
  
  f = null // 释放内存
  f() // 会报错
  ```

#### `JavaScript`的垃圾回收机制

**垃圾回收是JavaScript中内存管理的重要组成部分。开发人员不需要手动分配和释放内存。垃圾回收机制可以自动处理内存的分配和释放，减轻了开发人员的负担，并且降低了内存泄漏的风险，它的主要目的是自动地检测和释放不再使用的内存，以便程序能够更高效地利用系统资源。**

* 标记清除

  **当变量进入上下文，比如在函数 内部声明一个变量时，这个变量会被加上存在于上下文中的标记。而在上下文中的变量，逻辑上讲，永远不应该释放它们的内存，因为只要上下文中的代码在运行，就有可能用到它们。当变量离开上下文时， 也会被加上离开上下文的标记**

  1. 垃圾收集器在运行时会给内存中的所有变量都加上一个<font color="red">删除标记</font>，假设内存中所有对象都是垃圾，全标记为 0
  2. 然后从<font color='red'>根对象</font>开始深度遍历，把不是垃圾的节点改成1
  3. 清除所有标记为0的垃圾，销毁并回收它们所占用的内存空间
  4. 最后把内存中的所有对象标志修改为0，等待下一轮的垃圾回收

  * 缺点：
    1. 内存碎片化(内存零零散散的存放，造成资源浪费)
    2. 再分配时遍历次数多，如果一直没有找到合适的内存块大小，那么会遍历空闲链表(保存堆中所有空闲地址空间形成的链表)，一直遍历到尾端
    3. 不会立即回收资源

* 引用计数

  **引用计算的核心思想是对每个值都记录它被引用的次数。声明变量并给他赋一个引用值,这个值的应用数为1**

  `如果同一个值又被赋给另一个变量，那么引用数加1。类似的，如果保存该值引用的变量被其他的值给覆盖了，那么引用数减1。当一个值的引用数为0时，就说明没有办法再访问到这个值了，因此可以安全的回收其内存了。垃圾回收程序下次运行的时候就会释放引用数为0的值的内存`

  * 缺点

    1. 时间开销大，因为引用计数算法需要维护引用数，一旦发现引用数发生改变需要立即对引用数进行修改
    2. 最大的缺点还是无法解决循环引用的问题

    ```javascript
    
    function foo() {
      const A = {}; // 在引用计数算法下，A和B不会被回收
      const B = {};
    
      A.foo = B;
      B.foo = A;
    
      return "hi";
    }
    
    foo();
    
    ```

    

#### `redux`的作用，和`Vuex`的区别

* `Redux` 是用来做状态管理的，会发送一个`action`

  * `Action`是一个具有`type`字段的普通`JavaScript`对象，用来描述应用程序中发生了什么事

  * `Reducer` 是一个函数，接受当前的`state`和一个`action`，必要时决定如何更新状态，并返回一个新状态`(state, action) => newState`它必须是一个纯函数

  * `Store`仓库，当前`Redux`的状态存储在一个名为`store`的对象中，并有一个`getState`的方法，它返回当前的状态

    ```javascript
    import { createStore } from 'redux'
    const store = createStore(counterReducer)
    console.log(store.getStore())
    ```

  * `Dispatch`发送，更新`state`的唯一方法就是调用`store.dispatch()`并传入一个`action`对象

    ```javascript
    store.dispatch({ type: 'counter/increment' })
    ```

    

#### `typescrip`的使用

#### `interface`和`type`的区别

#### `Web Worker`浏览器多线程

  为了利用多核CPU的计算能力，`HTML5`提出`Web Worker`标准，允许`JavaScript`脚本创建多个线程，但是子线程完全受主线程控制，且不得操作`DOM`。所以，这个新标准并没有改变JavaScript单线程的本质


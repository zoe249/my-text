# 1.数据模型驱动

```js
let rlimit = /\{\{(.+?)\}\}/g
/* 
1.拿到模板
2.拿到数据
3.将数据与模板结合，得到的是HTML元素
4.放到页面中
*/

// 1.
let tmpNode = document.getElementById('app')
// 2.
let data = {
    name: '',
    message: 'Vue',
}
/* 
3.将数据放到模板中。一般都是使用递归
在Vue源码中  DOM > 字符串模板 > Vnode > 真正的DOM
*/
function compiler(template, data) {
    let childNodes = template.childNodes // 取出子元素
    for (let i = 0; i < childNodes.length; i++) {
        let type = childNodes[i].nodeType // 1 元素, 3 文本节点
        if (type === 3) {
            // 文本节点，可以判断里面是否有{{}}差值
            let txt = childNodes[i].nodeValue

            // 有没有花括号
            // replace 使用正则匹配一次，函数就会调用一次
            // 函数第0个参数，标识匹配到的内容
            // 函数第n个参数，表示正则中的第n组
            txt = txt.replace(rlimit, function (_, g) {
                // 写在双花括号里面的东西
                let key = g.trim()

                let value = data[key]

                // 将{{xxx}}用这个值替换
                return value
            })
            childNodes[i].nodeValue = txt
        } else if (type === 1) {
            // 元素，考虑他有没有子元素，是否需要将其子元素进行 判断是否要差值
            compiler(childNodes[i], data)
        }
    }
}

let generateNode = tmpNode.cloneNode(true)
console.log(tmpNode)
compiler(generateNode, data)
console.log(generateNode)

// 此时并没有生成新的 template，所以这里打印的是直接在页面中就更新的数据，因为DOM是引用数据类型

// 4.
app.parentNode.replaceChild(generateNode, app)
```

## 1.2虚拟 DOM

**如何将真正的DOM转为虚拟DOM；如何将虚拟DOM转为真正的DOM**

为什么要使用虚拟DOM？ 为了提高性能

```js
class VNode {
    constructor(tag, data, value, type) {
        this.tag = tag && tag.toLowerCase()
        this.data = data
        this.value = value
        this.type = type
        this.children = []
    }

    appendChild(vnode) {
        this.children.push(vnode)
    }
}

/**
* 使用递归来遍历DOM元素。生成虚拟DOM
* @param node
* @return vnode
* Vue源码使用的是栈结构，使用栈存储父元素来实现递归
*/
function getVNode(node) {
    let nodeType = node.nodeType
    let _vnode = null
    if (nodeType === 1) {
        // 元素
        let nodeName = node.nodeName
        let attrs = node.attributes
        let _attrObj = {}
        // attrs[i] 属性节点 {nodeType = 2}
        for (let i = 0; i < attrs.length; i++) {
            _attrObj[attrs[i].nodeName] = attrs[i].nodeValue
        }
        // 创建节点
        _vnode = new VNode(nodeName, _attrObj, undefined, nodeType)

        // 考虑 node 的子元素
        let childNodes = node.childNodes
        for (let i = 0; i < childNodes.length; i++) {
            // 递归
            _vnode.appendChild(getVNode(childNodes[i]))
        }
    } else if (nodeType === 3) {
        // console.log(node.nodeValue)
        _vnode = new VNode(undefined, undefined, node.nodeValue, nodeType)
    }

    return _vnode
}

class RealNode {
    appendChild(vnode) {
        this.children.push(vnode)
    }
}

/**
* 虚拟DOM转为真正的DOM
*/
function parseVNode(node) {
    let nodeType = node.type
    let _node = null
    if (nodeType === 1) {
        // 元素
        let nodeName = node.tag
        let data = node.data
        let childrens = node.children
        _node = document.createElement(nodeName)
        Object.keys(data).forEach((key) => {
            _node.setAttribute(key, data[key])
        })
        childrens.forEach((item) => {
            _node.appendChild(parseVNode(item))
        })
    } else if (nodeType === 3) {
        _node = document.createTextNode(node.value)
    }

    return _node
}

const app = document.getElementById('app')
const vnode = getVNode(app)
// console.log(vnode)

const realnode = parseVNode(vnode)
console.log(app)
```

## 1.3 函数柯里化

**概念：**一个函数原本有多个参数，只传入**一个**参数，生成一个新的函数，由新函数接受剩下的参数来运行得到结果

**作用：**为了提高性能，使用柯里化可以缓存一部分能力

## 1.4虚拟DOM的render方法

`vue`模板转换为抽象语法树需要执行几次

- 页面一开始加载需要渲染
- 每一个响应式属性数据在发生变化的时候渲染
- `watch`，`computed` 等

**作用：**将虚拟DOM 转为真正的DOM

* 虚拟DOM降级理解为AST(抽象语法树)
* 一个项目运行的时候，模板是不会变的，就表示`AST`是不会变的

将代码进行优化，将虚拟DOM缓存起来，生成一个函数，函数只需要传入数据，就可以得到真正的DOM

# 2.响应式原理

## 2.1 简单数据的响应式

在使用`Vue`的时候，复赋值属性获得属性都是直接使用Vue实例

在设计属性值的时候，页面的数据更新

```js
Object.defineProperty(obj, '', {
    writable,
    configurable,
    enumerable, // 属性是否可以枚举
    set, // 赋值触发
    get, // 取值触发
})
```

响应式对象例子，下面是一个简单的例子，实际开发中，对象一般是有多层级的

```js
var o = {
    name: 'zoe',
    age: 19,
    gender: '男的',
}

// 简化后的版本
function defineReactive(target, key, value, enumerable) {
    // 函数内部就是一个局部作用域，这个 value 就只在函数内部使用的变量，形成闭包
    Object.defineProperty(target, key, {
        configurable: true,
        enumerable: !!enumerable,
        get() {
            console.log(`读取 o 的${key}属性`)
            return value
        },
        set(newVal) {
            console.log(`设置 o 的${key}属性`)
            value = newVal
        },
    })
}

// 将对象转换为响应式
Object.keys(o).forEach((key) => defineReactive(o, key, o[key], true))
```

## 2.2 复杂数据的响应式

对于对象类型的复杂数据，可以使用递归

数组也同样需要处理

```js
// Vue 重写了以下方法中的响应式
// push、pop、shift、unshift、reverse、sort、splice
```

**扩展函数的功能，在函数原有的基础上增加额外的操作，常称为：函数拦截**

下面这个例子就使用了函数拦截

```js
/**
* 如果一个函数已经定义了，但是我们需要扩展其功能，一般的处理方法：
*
* 使用一个临时的函数名存储函数
* 重新定义原来的函数
* 定义拓展的功能
* 调用零食的那个函数
*/

function func() {
    console.log('原始功能')
}

let _tmpFn = func

func = function () {
    _tmpFn()
    console.log('扩展功能')
}

func() // 原始功能 
	   // 扩展功能
```



* 在改变数组数据的时候，要发出通知
  1. `Vue2`中存在缺陷，数组发生变化，设置`length`无法通知

* 加入的元素应该变成响应式的

  1. 数组的`push`、`pop`等方法怎么处理

     * 直接修改`prototype`  不行

     * 修改要进行响应式的数组的原型 `__proto__`

       下面使用**函数拦截**来对数组的部分方法进行**处理**

       ```js
       let ARRAY_METHOD = [
           'push',
           // 'pop',
           'shift',
           'unshift',
           'reverse',
           'sort',
           'splice',
       ]
       /**
       * 思路：原型式集成：修改原型链的结构
       */
       let arr = []
       let array_method = Object.create(Array.prototype)
       
       ARRAY_METHOD.forEach((method) => {
           array_method[method] = function () {
               // 调用原来的方法
               console.log('调用拦截的方法', method)
               let res = Array.prototype[method].apply(this, arguments)
               // Array.prototype[method].call(this, ...arguments)
               return res
           }
       })
       
       arr.__proto__ = array_method
       ```

# 3.发布订阅模式

## 3.1 proxy 对象代理

**这里的proxy 不是`ES6`中的Proxy**

`Vue`的设计中，有一个潜规则，不希望访问 `_`开头的数据

* _ 下划线开头的数据是私有数据
* $ 开头的是只读数据

我们希望可以通过`app.name`的方式来访问`app._data.name`，这是就需要使用`proxy`方式

例如：有一个对象`xx`，我们需要在访问`dd.name`的时候访问的是`xx.name`,可以通过`Object.defineProperty`实现

```js
const xx = { name: 'xx' }
const dd = { name: 'dd' }

Object.defineProperty(dd, 'name', {
    get() {
        return xx.name
    },
})

console.log(dd.name) // 这里打印的就是xx
```

抽成函数

```js
/** 将某一个对象的属性访问 映射到对象的某一个属性成员上 */
function proxy(target, prop, key) {
    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get() {
            return target[prop][key]
        },
        set(newVal) {
            target[prop][key] = newVal
        },
    })
}
// 如果将_data的成员映射到实例上
proxy(实例, '_data', 属性名)
```

## 3.2 发布订阅模式

**作用:解耦，让各个模块之间没有紧密的联系**

在`Vue`中，整个的更新是按照组件为单位进行**判断**，以节点为单位进行更新

* 如果代码中没有自定义组件，那么在比较算法的时候，会将全部的模板 对应的 DOM进行比较
* 如果代码中含有自定义组件，那么在比较算法的时候，就会判断更新的是哪一些组件中的属性，只会判断更新数据的组件，其他组件不会更新

**事件模型**

* 有一个 `event` 对象
* `on、off、emit`

**实现事件模型**

1. 首先需要一个事件对象`event`

2. 注册事件`event.on('事件名'，function)`

3. 移除事件

   移除所有

   移除某一个类型的事件

   移除某一个类型的某一个对象

4. `evnet.emit('事件名',参数)`

**发布订阅模式(形式不局限于函数，形式可以是对象等)**

1. 中间的全局容器，用来存储可以被触发的东西（函数，对象）
2. 需要一个方法，可以往容器中传入东西（函数，对象）
3. 需要一个方法，可以将容器中的东西取出来使用（函数调用，对象的方法调用）

**Vue模型**

页面中的变更是以组件为单位的

* 如果页面中只有一个组件`Vue`实例，不会有性能损失
* 如果页面中有多个组件（多`watcher`的情况），第一次会有多个组件的`watcher`存入到全局`Watcher`中
  * 如果修改了局部的数据，例如其中一个组件的数据
  * 表示只会对该组件进行`diff`算法，也就是说只会重新生成该组件的抽象语法树
  * 只会访问该组件的`watcher`
  * 也就表示再次往全局存储的只有该组件的`watcher`

**缺陷**

* 无法处理数组
* 无法在中间集成 `Watcher` 处理
* `reactify`需要和实例绑定在一起  需要进行解耦
* 

# 4.Watcher 引入

**分两步实现**

 1.只考虑修改后刷新

 2.考虑依赖收集

在Vue中提供了一个构造函数`Watcher`
- get() 用来进行**计算**或者执行处理函数
- update() 公共的外部方法,该方法会触发内部的 `run`方法
- run() 运行，用来判断内部是使用异步运行还是同步运行等，这个方法最终会调用内部的 get() 方法
- cleanuDep() 简单清除队列

warcher 实例上有一个属性 `vm`,表示的就是当前的`Vue`实例

# 5.引入Dep对象
该对象提供依赖收集`depend`功能，和派发更新(notify)的功能
在`notify`中去调用`watcher`的`update`方法

# 6.Watcher 与 Dep
之前将渲染`Watcher`放在全局作用于上，这里主力是有问题的
- vue 项目中包含很多的组件，各个组件是独立的 
* watcher 可以会存在多个
* 每一个watcher用于描述一个渲染行为或计算行为
	- 子组件发生数据的更新，页面需要重新渲染（Vue中是局部渲染）
	- 例如 vue 中推荐的是使用计算属性代替复杂的插值表达式
	 - 计算属性实惠伴随着其使用的属性变化而变化
	 - name:() => this.firstname + this.lastname
	
	 	计算属性依赖于属性firstname 和 lastname
	 	只要依赖的属性发生变化，就会促使计算属性重新计算
	

在访问的时候就会进行收集，再修改的时候就会更新，收集什么就会更新什么
所谓的依赖收集**实际上就是告诉当前的 watcher 什么属性被访问了**
那么在这个watcher计算的时候 或 页面渲染的时候，就会讲这些收集到的属性进行更新

**将属性与当前watcher关联起来**
- 在全局 准备一个 targetStack( watcher 栈，把一个操作中需要使用的watcher都存储起来)
- 在 Watcher 调用 get 方法的时候，将当前 Watcher 放到全局，在 get 执行结束之后，将全局这个 Wather 移除，提供 `pushTarget(), popTarget()`

我们在访问对象属性的时候`get`,我们渲染的`watcher`就在全局中，将属性与`watcher`关联，其实就是将当前渲染的`watcher`存储到属性相关的`dep`中, 同时将`dep`也存储到当前全局的`watcher`中 (互相引用的关系)
- 属性引用了当前渲染的watcher，**属性知道谁去渲染它**
- 当前渲染`watcher`引用了访问的属性(Dep),**当前的 Watcher 知道渲染了什么属性**
`Dep`有一个方法叫 `notify()`
内部就是将`dep`中的`subs`取出来，一次调用其`update`方法
`subs`中存储的是**知道要渲染什么属性的`Watcher`**



# 7.Vue

## 7.1 各个文件夹作用

1. compiler 编译使用
   * Vue 是使用字符串作为模板
   * 在编译文件夹中存放对 模板字符串的解析算法，抽象语法树，优化等
2. core 核心， Vue 构造函数、生命周期等方法部分
3. platform 平台
   * 针对 运行的环境(设备)，有不同的实现
   * 也是 Vue 的入口
4. server 服务端，将 Vue 用在服务端的处理代码
5. sfc 单文件组件
6. shard 公关文件

## 7.2 主要内容

1. vue源码
	1.`Observer`
	2.`watch` 与 `computed`
	3.简单说明path
2. `observer`中各个文件的作用
	- **arrar.js** 创建含有重写数组方法的数组，让所有的响应式数组继承自该数组
	- **dep.js** Dep类
	- **index.js** Observer 类，observer 工厂函数
	- **scheduler.js** vue中任务调度的工具，watcher执行的核心
	- **traverse.js** 递归遍历响应式数据，目的是触发依赖收集
	- **watcher.js** Watcher.js




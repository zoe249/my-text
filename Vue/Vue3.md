## Vue3 ref与reactive对比

* 从定义数据角度对比
  * ref 用来定义：基本数据类型
  * reactive 用来定义：对象（数组）类型数据
  * ref也可以定义对象（数组）类型数据，内部自动通过reactive编译转为代理对象
* 从原理角度对比
  * ref通过Object.defineProerty 的 get set 来实现响应式
  * reactive通过使用Proxy来实现响应式，并通过Reflect操作源对象内部数据 
* 从使用角度对比
  * ref定义的数据：操作数据需要.value，模板中不需要 .value
  * reactive 定义的数据：操作数据与读写数据均不需要 .value

|          | ref                                  | reactive                                      |
| -------- | ------------------------------------ | --------------------------------------------- |
| 数据类型 | 基本类型数据                         | 对象（或数组）类型数据                        |
| 原理     | 通过Object.defineProerty实现数据劫持 | 通过Proxy来实现响应式,并通过Reflect操作源对象 |
| 使用     | 操作数据需要，.value(模板内不需要)   | 操作与读取数据不需要 .value                   |



# 一、Vue3常用API

## 1、computed 计算属性

* 与 Vue2 中的computed配置功能一致

* 需要 引入  import {computed} from 'vue'

* 写法

  ```ts
  import {reactive,computed} from 'vue'
  setup(){
      let person = reactive({
        firstname:'张',
        lastname:'三'
      })
  
      // 计算属性，简写，没有考虑计算属性被修改的情况
      person.fullname = computed(()=>{
        return person.firstname+person.lastname
      })
  
      // 计算属性，完整写法 考虑读和写
      person.fullname = computed({
        get(){
          return person.firstname+'-'+person.lastname
        },
        set(value){
          const nameArr = value.split('-')
          person.firstname = nameArr[0]
          person.lastname = nameArr[1]
        }
      })
      return {
        person,
        // fullname
      }
    }
  ```

## 2、watch 监听

实例

```js
setup(){
	let person = reactive({
      name:'张三',
      age:15,
      job:{
        j1:{
          money:14,
        }
      }
    })
    let num = ref(0)
    let msg = ref('hello')
    // 情况一 监视ref所定义的一个响应式数据
    // watch(num,(newVal,oldVal)=>{
    //   console.log(newVal,oldVal)
    // })

    // 情况二 监听ref定义的多个响应式数据
    // watch([num,msg],(newVal,oldVal)=>{
    //   console.log('num或msg改变了',newVal,oldVal)
    // },{immediate:true})   // immediate:true  页面加载完成立即初始化一次
	
    // 情况三 如果reactive 所定义的一个响应式数据全部属性，此处无法正确获得oldVal
    // 强制开启了深度监听
    // watch(person,(newVal,oldVal)=>{
    //   console.log('person变化了',newVal,oldVal)
    // })

    // 情况四 监听 reactive 所定义的一个响应式数据中的某个属性
    // watch(()=>person.age,(newVal,oldVal)=>{
    //   console.log('person变化了',newVal,oldVal)
    // })
    watch(()=>person.age,(newVal,oldVal))

    // 情况五 监听 reactive 所定义的一个响应式数据中的某些属性
    watch([()=>person.age,()=>person.name],(newVal,oldVal)=>{
      console.log('person变化了',newVal,oldVal)
    })

    watch(()=>person.job,(newVal,oldVal)=>{
      console.log('person变化了',newVal,oldVal)
    },{deep:true})  // 此处监视reactive定义的某个属性的值，所以deep配置有效 
    // deep:true,开启深度监听
}
return {
      person,
      num,
      msg
      // fullname
    }
```



* ​	情况一：监视ref所定义的一个响应式数据

  ```js
  watch(num,(newVal,oldVal)=>{
      consolo,.log(newVal,oldVal)
  })
  ```

*    情况二：监视ref定义的多个响应式数据

  ```js
  watch([num,msg],(newVal,oldVal)=>{
        console.log('num或msg改变了',newVal,oldVal)
      },{immediate:true})
  ```

*    情况三： reactive 所定义的一个响应式数据，此处无法正确获取oldVal  强制开启了深度监听

  ```js
  // 深度监听强行开启
  watch(person,(newVal,oldVal)=>{
        console.log('person变化了',newVal,oldVal)
      })
  ```

*    情况四：监听reactive 所定义的一个响应式数据中的某个属性

  ```js
  watch(()=>person.age,(newVal,oldVal)=>{
        console.log('person变化了',newVal,oldVal)
      },{deep:true}) // 此处监听 reactive 定义的某个属性的值，所以deep有效
  ```

*    情况五：监听 reactie 所定义的 一个响应式数据中的某些属性

  ```js
  watch([()=>person.age,()=>person.name],(newVal,oldVal)=>{
        console.log('person变化了',newVal,oldVal)
      })
  ```

## 3、watchEffect

​	类似于 computed

​	自动检测内部使用的对象        

* computed 更注重 计算出来的结果，必须要有返回值

* watcheEffect 更注重 过程，不需要写返回值

* ```ts
  // 计算属性
  person.fullname = computed(()=>{
        return person.firstname+person.lastname
      })
  
  watchEffect(()=>{
          console.log('watchEffect执行')
      })
  ```

  

## 4、生命周期

![生命周期](https://v3.cn.vuejs.org/images/lifecycle.svg)

**注意，组合式 API 中的 `setup()` 钩子会在所有选项式 API 钩子之前调用，`beforeCreate()` 也不例外。**

### 组合式api 

```ts
setup(){
    let num = ref(0)
    console.log('------setup------')
    // 组合式 api 生命周期钩子
    onBeforeMount(()=>{
      console.log('------onBeforeMount-------')
    })
    onMounted(()=>{
      console.log('------onMounted-------')
    })
    onBeforeUpdate(()=>{
      console.log('------onBeforeUpdate-------')
    })
    onUpdated(()=>{
      console.log('------onUpdated-------')
    })
    onBeforeUnmount(()=>{
      console.log('------onBeforeUnmount-------')
    })
    onUnmounted(()=>{
      console.log('------onUnmounted-------')
    })
    return {
      num,
    }
  },
```

### optionsApi生命周期

```ts
beforeCreate(){
    console.log('--------------beforeCreate-------------')
  },
  created(){
    console.log('--------------create-------------')
  },
  beforeMount(){
    console.log('--------------beforeMount-------------')
  },
  mounted(){
    console.log('--------------mounte-------------')
  },
  beforeUpdate(){
    console.log('--------------beforeUpdate-------------')
  },
  updated(){
    console.log('--------------update-------------')
  },
  beforeUnmount(){
    console.log('--------------beforeUnmount-------------')
  },
  unmounted(){
    console.log('--------------unmount-------------')
  }
```

## 5、toRef和toRefs

* toRef

  ```vue
  <template>
    <h2>年龄：{{ age }}</h2>
    <h2>年龄：{{ money }}</h2>
    <h2>姓名：{{ name }}</h2>
  
    <button @click="name += '~'">修改年龄</button>
    <button @click="age++">修改姓名</button>
    <button @click="money++">修改薪资</button>
  	
  </template>
  
  <script>
  import { defineAsyncComponent, toRefs, toRef, ref, reactive } from "vue";
  export default {
    setup() {
      const pageModalRef = ref<InstanceType<typeof PageModal>>()
      let person = reactive({
        name: "张三",
        age: 15,
        job: {
          j1: {
            money: 14,
          },
        },
      });
      return {
        name: toRef(person, "name"),
        age: toRef(person, "age"),
        money: toRef(person.job.j1, "money"),
      };
    },
  };
  </script>
  ```

  

* 作用：创建一个ref对象，其value值指向另一个对象中的某个属性

* 语法：`const name = toRef(pseron,'name')`

* 应用：将响应式对象中的某个属性单独提供给外部使用

* toRefs：toRefs可以批量创建多个ref应用 `toRefs(person)`

  ```vue
  <template>
    <h2>年龄：{{ age }}</h2>
    <h2>薪水：{{ job.j1.money }}</h2>
    <h2>姓名：{{ name }}</h2>
  
    <button @click="name += '~'">修改年龄</button>
    <button @click="age++">修改姓名</button>
    <button @click="job.j1.money++">修改薪资</button>
  </template>
  
  <script>
  import {  toRefs, toRef, ref, reactive } from "vue";
  export default {
    setup() {
      let person = reactive({
        name: "张三",
        age: 15,
        job: {
          j1: {
            money: 14,
          },
        },
      });
        // 一次性导出多个
      return {
        ...toRefs(person),
      };
    },
  };
  </script>
  
  <style>
  </style>
  ```

  

# 二、Vue3 其他composition API 

## 1、shallowReactive 与 shallowRef

* shallowReactive：只处理对象最外层属性的响应式

* shallowRef： 只处理基本数据类型的响应式，不进行对象的响应式处理

* 场景
  * 如果一个对象结构较深，但只变化外层属性===》shallowReactive
  * 如果一个对象数据，后续功能不会修改该对象中的属性，二十生成新的对象来代替===》shallowRef
  
* ```vue
  <template>
    <h2>App</h2>
  
    <h3>m1: {{m1}}</h3>
    <h3>m2: {{m2}}</h3>
    <h3>m3: {{m3}}</h3>
    <h3>m4: {{m4}}</h3>
  
    <button @click="update">更新</button>
  </template>
  
  <script lang="ts">
  import { reactive, ref, shallowReactive, shallowRef } from 'vue'
  /* 
  shallowReactive与shallowRef
    shallowReactive: 只处理了对象内最外层属性的响应式(也就是浅响应式)
    shallowRef: 只处理了value的响应式, 不进行对象的reactive处理
  总结:
    reactive与ref实现的是深度响应式, 而shallowReactive与shallowRef是浅响应式
    什么时候用浅响应式呢?
      一般情况下使用ref和reactive即可,
      如果有一个对象数据, 结构比较深, 但变化时只是外层属性变化 ===> shallowReactive
      如果有一个对象数据, 后面会产生新的对象来替换 ===> shallowRef
  */
  
  export default {
    setup () {
  
      const m1 = reactive({a: 1, b: {c: 2}})
      const m2 = shallowReactive({a: 1, b: {c: 2}})
  
      const m3 = ref({a: 1, b: {c: 2}})
      const m4 = shallowRef({a: 1, b: {c: 2}})
  
      const update = () => {
        // m1.b.c += 1
        // m2.b.c += 1
  
        // m3.value.a += 1
        m4.value.a += 1
      }
  
      return {
        m1,
        m2,
        m3,
        m4,
        update,
      }
    }
  }
  </script>
  ```

## 2、readonly 与 shallowReadonly

* readonly: 让一个响应式数据变为只读（深只读）

* shallowReadonly：让一个响应式数据变为只读（浅只读）

* 语法 `let person = readonly()`

* ```vue
  <template>
    <h2>App</h2>
    <h3>{{state}}</h3>
    <button @click="update">更新</button>
  </template>
  
  <script lang="ts">
  import { reactive, readonly, shallowReadonly } from 'vue'
  /*
  readonly: 深度只读数据
    获取一个对象 (响应式或纯对象) 或 ref 并返回原始代理的只读代理。
    只读代理是深层的：访问的任何嵌套 property 也是只读的。
  shallowReadonly: 浅只读数据
    创建一个代理，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换 
  应用场景: 
    在某些特定情况下, 我们可能不希望对数据进行更新的操作, 那就可以包装生成一个只读代理对象来读取数据, 而不能修改或删除
  */
  
  export default {
  
    setup () {
  
      const state = reactive({
        a: 1,
        b: {
          c: 2
        }
      })
  
      // const rState1 = readonly(state)
      const rState2 = shallowReadonly(state)
  
      const update = () => {
        // rState1.a++ // error
        // rState1.b.c++ // error
  
        // rState2.a++ // error
        rState2.b.c++
      }
      
      return {
        state,
        update
      }
    }
  }
  </script>
  ```

## 3、toRaw  与 markRaw

* toRaw：
  * 作用：将一个由`reactive`生成的<font color='red'>响应式对象</font>转为<font color="red">普通对象</font>
  * 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面的更新
  
  `const p = toRaw(person);`
  
* markRaw
  * 作用：标记一个对象，使其永远不会再成为响应式对象
  * 应用场景
    * 有些值不应该被设置为响应式的，例如复杂的第三方库
    * 当渲染具有不可变数据源的列表时，跳过响应式转换可以提高性能
  
  ```js
  <template>
    <h2>{{state}}</h2>
    <button @click="testToRaw">测试toRaw</button>
    <button @click="testMarkRaw">测试markRaw</button>
  </template>
  
  <script lang="ts">
  /* 
  toRaw: 得到reactive代理对象的目标数据对象
  */
  import {
    markRaw,
    reactive, toRaw,
  } from 'vue'
  export default {
    setup () {
      const state = reactive<any>({
        name: 'tom',
        age: 25,
      })
  
      const testToRaw = () => {
        const user = toRaw(state)
        user.age++  // 界面不会更新
  
      }
  
      const testMarkRaw = () => {
        const likes = ['a', 'b']
        // state.likes = likes
        state.likes = markRaw(likes) // likes数组就不再是响应式的了
        setTimeout(() => {
          state.likes[0] += '--'
        }, 1000)
      }
  
      return {
        state,
        testToRaw,
        testMarkRaw,
      }
    }
  }
  </script>
  // 对象不再是响应式对象，修改属性页面不会再更新
  // 注意：通过其他方式引起的页面更新，获取到的仍是最新的
  ```
  
  

## <font color="red">4、自定义customRef</font>

​	作用：创建一个自定义的ref，并对其依赖项跟踪和更新出发进行显示控制

* 实例 

  ```vue
  <template>
    <input type="text" v-model="keyWord">
    <h2>{{keyWord}}</h2>
  </template>
  
  <script>
  import {ref,customRef} from 'vue'
  export default {
    name:'App',
    
    setup(){
      function myRef(value) {  // 自定义 ref
        let timer;
        return  customRef((track,tigger)=>{
          return {
            get(){
              console.log('从myRef读取数据')
              track()
              return value
            },
            set(val)
              console.log(val+'修改')
              clearTimeout(timer)
              timer = setTimeout(()=>{
                value = val   
                tigger() //  重新解析模板
              },500)
            }
          }
        })
      }
      // let keyWord = ref('keyWord')  // 使用 Vue 内置ref
      let keyWord = myRef('keyWord')
      return{
        keyWord
      }
    }
  }
  </script>
  
  <style>
  
  </style>
  ```

## 5、provide与inject

作用：父组件与后代组件通信

![图片](https://v3.cn.vuejs.org/images/components_provide.png)

父组件使用 `provide`选项来提供数据，后代组件使用`inject`选项来接受使用这些数据

具体方法

* 父组件

  ```js
  <script>
  import {provide} from 'vue'
  import Son from './sonView.vue'
  export default {
      components:{
          Son
      },
      setup(){
        provide('car',car)
  
        return {car}
      }
  }
  </script>
  ```

* 子组件或后代组件

  ```js
  <script>
  import {inject} from 'vue'
  export default {
    setup(){
      let car = inject('car')
      console.log(car)
      return {car}
    }
  }
  </script>
  ```

  

##  6、响应式数据的判断

* isRef：检查一个值是否为`ref` 对象
* isReactive：检查一个对象是否由`reactive`创建的响应式原理
* isReadonly：检查一个对象是否由`readonly`创建的只读
* isProxy：检查一个对象是否由`reactive`或者`readonly`方法创建

# 三、Vue3新增组件

 ### 1、teleport 瞬移

​	Teleport 提供了一种干净的方法, 让组件的html在父组件界面外的特定标签(很可能是body)下插入显示

​	可以将元素定位到指定元素下

```html
<template>
  <div>
      <button @click="isShow = true">弹窗</button>   
  </div>
    <!-- 将元素指定到body元素下 -->
  <teleport to="body">  
    <div class="mask" v-if="isShow">
        <button @click="isShow = false">关闭</button>
        <div class="dialog" >
            <h1>内容1</h1>
            <h1>内容1</h1>
            <h1>内容1</h1>
        </div>
    </div>
  </teleport>
</template>
```

# 四、其他

## 1、setup()中使用vuex

​	引入`import { useStore } from 'vuex'`

​	使用

```vue
<template>
  <h1>{{msg}}</h1>
</template>

<script>
import {computed} from 'vue'
import { useStore } from 'vuex'
export default {
  setup(){
    const store = useStore()
    const msg = computed(()=> {return store.state.message})
    return {
      msg
    }
  }
}
</script>

<style>

</style>
```

## 2、Vue3 hooks 使用

* 在src目录下创建hooks文件夹

* 申明一个我们要复用的方法的名字.ts(或js) 文件，一般为use开头

  ![](https://img-blog.csdnimg.cn/20210223155148135.png)

* useMousePositions.ts文件代码

  ```tsx
  import {onBeforeUnmount, onMounted, ref} from 'vue'
  export default function () {
  	const x = ref(-1) ; // x 绑定为响应式数据
  	const y = ref(-1);
  	const clickHandler=(event:MouseEvent)=>{
  		x.value = event.pageX
  		y.value = event.pageY
  	} 
  	onMounted(()=>{
  		window.addEventListener('click', clickHandler)
  	})
  	onBeforeUnmount(()=>{
  		window.removeEventListener('click', clickHandler)
  	})
      // 只返回x,y  不返回具体函数
  	return {
  		x,
  		y,
  
  	}
  }
  ```

* 在 vue 文件 setup中使用

* ```vue
  <template>
    <div class="hello">
      <h1>{{x}}</h1>
      <h1>{{y}}</h1>
    </div>
  </template>
  
  <script lang="ts">
  import useMousePosition from '../hooks/useMousePosition'
  export default ({
    setup(){
      const {x,y} = useMousePosition()
      return{
        x,y,
      }
    },
  });
  </script>
  
  <style scoped>
  </style>
  
  ```

## 3、获取操作dom

* ref 获取dom

  ```ts
  <template>
    <img  ref="img" src="../assets/logo.png" alt="">
  </template>
  <script>
    import { ref, onMounted } from 'vue'
  
    export default {
      setup() {
        const img = ref(null)
  
        onMounted(() => {
          // DOM 元素将在初始渲染后分配给 ref
          console.log(img.value) // <div>This is a root element</div>
        })
  
        return {
          img
        }
      }
    }
  </script>
  ```

  

* internalInstance 获取dom

  ```ts
  <template>
    <img  ref="img" src="../assets/logo.png" alt="">
  </template>
  //首先引入
  import { getCurrentInstance} from 'vue';
   setup() {
       const internalInstance = getCurrentInstance();
       //然后我们在一些方法或者生命周期中就可以去访问我们需要访问的dom了
       const save = () => {
           internalInstance.refs.img // 这个就可以访问的到了
      }
  }
  ```

* Vue3 中 摈弃了 this，要获取当前 Vue 示例的上下文 需要用  getCurrentInstance 

  * **`getCurrentInstance` **只能**在 [setup](https://v3.cn.vuejs.org/api/composition-api.html#setup) 或[生命周期钩子](https://v3.cn.vuejs.org/api/composition-api.html#生命周期钩子)中调用。**

  ```vue
  <script>
  //getCurrentInstance
  import {getCurrentInstance} from 'vue'
  
  setup(){
  	const _this = getCurrentInstance(); // 通过getCurrentInstance得到我们想要的this，并把this传入createIntersectionObserver中
  }
  
  </script>
  ```

  

# 五、Setup 语法

要启用该语法，需要在 `<script>` 代码块上添加 `setup` attribute：

```vue
<script setup>
console.log('hello script setup')
</script>
```

里面的代码会被编译成组件 `setup()` 函数的内容。这意味着与普通的 `<script>` 只在组件被首次引入的时候执行一次不同，`<script setup>` 中的代码会在**每次组件实例被创建的时候执行**。

<script setup> 范围里的值也能被直接作为自定义组件的标签名使用：

```vue
<script setup>
import MyComponent from './MyComponent.vue'
</script>

<template>
  <MyComponent />
</template>
```

#### 1、`defineProps()` 和 `defineEmits()`

<font color="red">defineProps()</font> 基本语法：

```vue
<script setup>
const props = defineProps({
  foo: String
})
</script>
```

<font color="red">defineEmits</font> 基本语法:

```vue
<script setup>
const emit = defineEmits(['change', 'delete'])

// 调用父组件方法 emit(函数名,参数1，参数2....)
emit('change')
</script>
```

#### 2、defindExpose() 

使用 `<script setup>` 的组件是**默认关闭**的——即通过模板引用或者 `$parent` 链获取到的组件的公开实例，**不会**暴露任何在 `<script setup>` 中声明的绑定。

使用 defineExprose() 向外部暴露指定属性

```vue
<script lang="ts" setup>
const aboutClick = () => {
  console.log('这是一个方法')
};

defineExpose({ aboutClick });
</script>
```

在父组件中使用

```vue
<template>
  <div class="about">
      <!-- 获取子组件的ref对象 -->
    <about-child :msg="message" ref="aboutRef" @check="check" />
  </div>
</template>
<script lang="ts" setup>
import { watch, computed, ref } from "vue";

// 子组件
import aboutChild from "@/components/aboutChild.vue";

const message = ref({
  name: "王富贵",
});
const aboutRef = ref<InstanceType<typeof aboutChild>>();
</script>

```



```ts
// console.log(permission)
      const filterMenu = (menuTree, key) => {
        let arr = menuTree.map((item: any, index) => {
          if (item.permissionKey === key) {
            item = item.permissions.map((menu) => {
              menu.disabled = true
              return menu
            })
            return item
          } else {
            filterMenu(item.permissions, key)
          }
          // console.log(item.permissionKey)

          return item
        })
        console.log(arr)
      }
      filterMenu(menuTree.value, permission)
      // console.log()
      // console.log(form.value.menuKeyList)

      // const disabledMenu = () =>{

      // }
```

```
<template>
  <div>
    <el-drawer
      :model-value="drawerVisible"
      title="用户数据权限"
      size="856"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      @close="close"
    >
      <div class="drawer-select">
        <div class="form-content">
          <el-form
            label-width="auto"
            label-position="right"
            :model="form"
            ref="formRef"
            :rules="rules"
          >
            <el-form-item label="账号：" prop="userCode">
              <el-input v-model="form.userCode" placeholder="请输入账号" :disabled="rowId !== ''" />
            </el-form-item>
            <el-form-item label="应用系统：" prop="systemVal">
              <el-select
                v-if="rowId === ''"
                v-model="form.systemVal"
                placeholder="选择应用系统"
                @change="hadnleSystem"
              >
                <el-option
                  v-for="item in form.systemList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
              <el-input v-else v-model="form.systemDescr" disabled />
            </el-form-item>
            <el-form-item label="功能：" prop="funVal">
              <el-select v-model="form.funVal" placeholder="选择功能" @change="handleFun">
                <el-option
                  v-for="item in form.funList"
                  :label="item.formatValue"
                  :key="item.id"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="筛选维度：" prop="dimensionVal">
              <el-select
                v-if="rowId === ''"
                v-model="form.dimensionVal"
                placeholder="选择维度"
                @change="handleDimension(form.dimensionVal, true)"
              >
                <el-option
                  v-for="item in form.dimensionList"
                  :label="item.formatValue"
                  :key="item.code"
                  :value="item.code"
                />
              </el-select>
              <el-input v-else v-model="form.dimensionDescr" disabled />
            </el-form-item>
            <el-form-item label="有效期：" class="c-date-input-box">
              <el-date-picker
                v-model="form.date.beginTime"
                value-format="YYYY-MM-DD"
                type="date"
                :placeholder="datePlaceholder.beginTime"
                :disabled-date="disabledBegin"
                :clearable="false"
                :editable="false"
                @change="handleBeginTime"
              />
              <i class="c-date-space-line">-</i>
              <el-date-picker
                v-model="form.date.endTime"
                value-format="YYYY-MM-DD"
                type="date"
                :placeholder="datePlaceholder.endTime"
                :disabled-date="disabledEnd"
                :clearable="false"
                :editable="false"
                @change="handleEndTime"
              />
            </el-form-item>
          </el-form>
        </div>

        <div class="select-content">
          <span>目录菜单：</span>
          <div>
            <el-input placeholder="请选择菜单" disabled style="margin-bottom: 10px" />
            <el-tree
              ref="treeRef"
              :data="menuTree"
              show-checkbox
              node-key="permissionKey"
              :props="defaultProps"
              default-expand-all
              @check="handleTree"
            />
          </div>
        </div>
      </div>

      <div class="drawer-content">
        <div class="content-header">
          <span>勾选对应的组织或快速定位组织：</span>
          <el-input
            type="text"
            :clearable="true"
            placeholder="请输入编码或名称"
            v-model="form.searchVal"
            @keyup.enter="handleSearch(form.searchVal)"
            @clear="handleDimension(form.dimensionVal, false)"
          />
        </div>

        <div class="content-table">
          <precincts-table
            v-if="form.dimensionVal === '01'"
            ref="preRef"
            :tableData="precinctsTable"
            :limitedFields="form.limitedFields"
            @triggerTable="triggerTable"
            @cancelRow="cancelRow"
            @clear="clear"
          />

          <org-table
            v-if="form.dimensionVal === '02'"
            ref="orgRef"
            :config="orgConfig"
            :tableData="organizationsTable"
            :limitedFields="form.limitedFields"
            @triggerTable="triggerTable"
            @cancelRow="cancelRow"
            @clear="clear"
          />

          <store-table
            v-if="form.dimensionVal === '03'"
            ref="storeRef"
            :config="storeConfig"
            :tableData="storeTable"
            :limitedFields="form.limitedFields"
            @triggerTable="triggerTable"
            @cancelRow="cancelRow"
            @clear="clear"
          />

          <div class="content-pagination">
            <el-pagination
              v-if="
                (form.dimensionVal === '02' && pageInfo.total > 8) ||
                (form.dimensionVal === '03' && pageInfo.total > 8)
              "
              v-model:currentPage="pageInfo.pageIndex"
              :page-size="pageInfo.pageSize"
              small
              background
              layout="prev, pager, next"
              :total="pageInfo.total"
              @current-change="handleDimension(form.dimensionVal, false)"
            />
          </div>
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submit(formRef)">保存</el-button>
          <el-button @click="close">取消</el-button>
        </span>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, reactive, nextTick } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {
  queryMenuTree,
  queryUserDataById,
  querySystem,
  queryPrecincts,
  queryOrg,
  queryStore,
  modifyUserDataPermissions,
  addUserDataPermissions
} from '../server'
import { orgConfig, storeConfig } from '../config'
import { precinctsTable, orgTable, storeTable } from './export'
import { ElMessage } from 'element-plus'
import { useDateDisable } from '@/hooks/dateDisable'
import { getDicsData, permissionFunType, pickLevel } from '@/hooks/dicsData'
import { ElTree } from 'element-plus'
import { searchFilter } from '@/utils/storage'
interface bodyType {
  userCode?: string
  systemCode?: string
  function: string
  dimension?: string
  beginTime: string
  endTime: string
  permissionKeys?: string[]
  limitedFields?: string[]
}

export default defineComponent({
  components: { precinctsTable, orgTable, storeTable },
  name: 'userDrawer',
  props: {
    drawerVisible: {
      type: Boolean,
      default: false
    },
    rowId: {
      type: String,
      default: ''
    },
    dateTime: {
      type: Object,
      required: true
    }
  },
  emits: ['closeDrawer', 'success'],
  setup(props, { emit }) {
    const close = () => {
      emit('closeDrawer')
    }

    let form = ref<any>({
      systemList: [],
      funList: [],
      dimensionList: [],
      menuKeyList: [], // 保存选中菜单键值
      defaultMenu: [], // 默认选中菜单
      limitedFields: [], // table 默认存在行
      userCode: '',
      systemVal: '',
      systemDescr: '',
      funVal: '',
      funDescr: '',
      formatFun: '',
      dimensionVal: '',
      dimensionDescr: '',
      dateValue: '',
      date: {
        beginTime: '',
        endTime: ''
      }
    })

    const pageInfo = reactive({
      pageSize: 8,
      pageIndex: 1,
      total: 0
    })

    let precinctsTable = ref([])
    let organizationsTable = ref([])
    let storeTable = ref([])

    const preRef = ref()
    const orgRef = ref()
    const storeRef = ref()

    let formRef = ref<FormInstance>()

    const rules = ref<FormRules>({
      userCode: [{ required: true, message: '请输入账号', trigger: 'blur' }],
      systemVal: [{ required: true, message: '选择应用系统', trigger: 'change' }],
      funVal: [{ required: true, message: '选择功能', trigger: 'change' }],
      dimensionVal: [{ required: true, message: '选择筛选维度', trigger: 'change' }],
      date: [{ required: true, message: '选择筛选维度', trigger: 'change' }]
    })

    // 时间组件 hooks
    const { datePlaceholder, handleBeginTime, handleEndTime, disabledBegin, disabledEnd } =
      useDateDisable(form, props.dateTime)

    watch(
      () => props.drawerVisible,
      () => {
        getUserDetail()
      }
    )

    // 根据id查询用户详情
    const getUserDetail = () => {
      getBaseInfo()
      if (!props.rowId) {
        queryUserDataById(props.rowId).then((res: any) => {
          form.value.userCode = ''
          form.value.systemVal = ''
          form.value.systemDescr = ''

          form.value.funVal = ''
          form.value.funDescr = ''
          form.value.formatFun = form.value.funVal + ' - ' + form.value.funDescr

          form.value.dimensionDescr = res.data.dimension + ' - ' + res.data.dimensionDescr

          form.value.date.beginTime = props.dateTime.beginTime.split(' ')[0]
          form.value.date.endTime = props.dateTime.endTime.split(' ')[0]
          datePlaceholder.value.beginTime = props.dateTime.beginTime.split(' ')[0]
          datePlaceholder.value.endTime = props.dateTime.beginTime.split(' ')[0]

          pageInfo.total = 0

          precinctsTable.value = []
          organizationsTable.value = []
          storeTable.value = []

          menuTree.value = []
          form.value.dimensionVal = ''
        })
      } else {
        queryUserDataById(props.rowId).then((res: any) => {
          form.value.userCode = res.data.userCode
          form.value.systemVal = res.data.systemCode
          form.value.systemDescr = res.data.systemCodeDescr

          form.value.funVal = res.data.function
          form.value.funDescr = res.data.functionDescr
          form.value.formatFun = form.value.funVal + ' - ' + form.value.funDescr

          form.value.dimensionVal = res.data.dimension
          form.value.dimensionDescr = res.data.dimension + ' - ' + res.data.dimensionDescr
          form.value.limitedFields = res.data.limitedFields

          form.value.date.beginTime = res.data.beginTime.split(' ')[0]
          form.value.date.endTime = res.data.endTime.split(' ')[0]
          datePlaceholder.value.beginTime = res.data.beginTime.split(' ')[0]
          datePlaceholder.value.endTime = res.data.endTime.split(' ')[0]

          // 查询菜单树
          getMenuTree(res.data.systemCode, res.data.permissionKey)
          console.log(res.data.permissionKey)
          // 查询组织表
          handleDimension(res.data.dimension, false)
        })
      }
    }

    // 获取基本信息
    const getBaseInfo = async () => {
      // 查询应用系统
      const systemRes: any = await querySystem()
      form.value.systemList = systemRes.data

      // 功能权限字典
      const funData: any = await getDicsData(permissionFunType)
      if (funData) {
        form.value.funList = funData.map((item: any) => {
          item.formatValue = item.code + ' - ' + item.name
          return item
        })
      }

      // 筛选维度字典
      const screenData: any = await getDicsData(pickLevel)
      if (screenData) {
        form.value.dimensionList = screenData.map((item: any) => {
          item.formatValue = item.code + ' - ' + item.name
          return item
        })
      }
    }

    const disabledMenu = (menus) => {
      return menus.map((item: any) => {
        // item.disabled = true
        if (item.permissions && item.permissions.length) {
          // item.disabled = true
          disabledMenu(item.permissions)
        } else {
          item.disabled = true
        }
        return item
      })
    }

    // 查询菜单树
    const getMenuTree = async (systemCode, defaultMenu?) => {
      // 查询菜单树
      const menuRes: any = await queryMenuTree({ checkButton: false, systemCode })
      menuTree.value = menuRes.data
      if (props.rowId) {
        menuTree.value = disabledMenu(menuRes.data)
        console.log(menuTree.value)
      }
      form.value.defaultMenu = [defaultMenu]

      // console.log()
      nextTick(() => {
        treeRef.value?.setCheckedKeys(form.value.defaultMenu)
      })
    }

    // 选择应用系统,渲染不同的菜单树
    const hadnleSystem = (val) => {
      form.value.menuKeyList = []
      getMenuTree(val)
    }

    // 选择功能
    const handleFun = (val) => {
      form.value.funVal = val
    }

    // 输入搜索关键字的回调函数
    const handleSearch = (val) => {
      let searchVal = val.trim()
      if (!searchVal) {
        handleDimension(form.value.dimensionVal, false)
      } else {
        switch (form.value.dimensionVal) {
          case '01':
            precinctsTable.value = searchFilter(precinctsTable.value, 'name', searchVal, 'precinct')
            // precinctsTable.value = preRef.value?.filterChange(searchVal)
            break
          case '02':
            organizationsTable.value = orgRef.value?.filterChange(searchVal)
            pageInfo.total = organizationsTable.value.length

            break
          case '03':
            storeTable.value = storeRef.value?.filterChange(searchVal)
            pageInfo.total = organizationsTable.value.length
            break
        }
      }
    }

    // 筛选维度,调用不同的接口，渲染不同维度的表格
    const handleDimension = (val, clear) => {
      clear ? (form.value.limitedFields = []) : ''
      switch (val) {
        case '01':
          queryPrecincts().then((res: any) => {
            precinctsTable.value = res.data
          })
          break
        case '02':
          queryOrg({ pageSize: pageInfo.pageSize, pageIndex: pageInfo.pageIndex }).then(
            (res: any) => {
              organizationsTable.value = res.data
              pageInfo.total = res.total
            }
          )
          break
        case '03':
          queryStore({ pageSize: pageInfo.pageSize, pageIndex: pageInfo.pageIndex }).then(
            (res: any) => {
              storeTable.value = res.data.map((item: any) => {
                item.formatCode = item.organizationCode + '-' + item.organizationCodeDescr
                item.formatType = item.type + '-' + item.typeDescr
                item.formatStore = item.storeCode + '-' + item.storeCodeDescr
                item.formatStatus = item.status + '-' + item.statusDescr
                item.formatDuration = item.durationType + '-' + item.durationTypeDescr
                return item
              })
              pageInfo.total = res.total
            }
          )
          break
        case '04':
          // return
          break
      }
    }

    // 菜单
    let treeRef = ref<InstanceType<typeof ElTree>>()
    let menuValue = ref('')
    let menuTree = ref<Array<any>>()
    const defaultProps = ref({
      children: 'permissions',
      label: 'name',
      disabled: 'disabled'
    })

    // 修改组织
    const triggerTable = (limitFields) => {
      let limitedFields = [...form.value.limitedFields, ...limitFields]
      form.value.limitedFields = limitedFields.filter((item, index) => {
        return limitedFields.indexOf(item) === index
      })
    }

    // 修改组织 取消
    const cancelRow = (limitFields) => {
      if (form.value.dimensionVal === '01') {
        let limitedFields = form.value.limitedFields
        limitFields.forEach((field) => {
          form.value.limitedFields.splice(limitedFields.indexOf(field), 1)
        })
      } else {
        let limitedFields = form.value.limitedFields
        form.value.limitedFields.splice(limitedFields.indexOf(limitFields), 1)
      }
    }

    // 取消全选
    const clear = () => {
      let limitFields: Array<any> = []
      switch (form.value.dimensionVal) {
        case '01':
          form.value.limitedFields = []
          break
        case '02':
          organizationsTable.value.forEach((row: any) => {
            limitFields.push(row.organizationCode)
          })
          limitFields.forEach((field) => {
            let limitedFields = form.value.limitedFields
            form.value.limitedFields.splice(limitedFields.indexOf(field), 1)
          })
          break
        case '03':
          storeTable.value.forEach((row: any) => {
            limitFields.push(`${row.organizationCode}-${row.storeCode}`)
          })
          limitFields.forEach((field) => {
            let limitedFields = form.value.limitedFields
            form.value.limitedFields.splice(limitedFields.indexOf(field), 1)
          })
          break
      }
    }

    const disabledMenus = (permission) => {
      // console.log(permission)
      const filterMenu = (menuTree, key) => {
        for (let k in menuTree) {
          console.log(k)
        }
      }
      filterMenu(menuTree.value, permission)
      // console.log()
      // console.log(form.value.menuKeyList)

      // const disabledMenu = () =>{

      // }
    }

    const handleTree = (data, disable) => {
      const menus = treeRef.value?.getCheckedKeys()
      if (menus!.indexOf(data.permissionKey) > -1) {
        if (data.permissions && data.permissions.length > 0) {
          // console.log('子级不在能选择', data.permissionKey)
          disabledMenus(data.permissionKey)
        }
        console.log('选中', data.permissionKey)
      } else {
        console.log('取消选中', data.permissionKey)
      }
    }

    const selectTree = () => {
      form.value.menuKeyList = []
      const menus = treeRef.value?.getCheckedKeys()
      // menus?.forEach((item: string) => {
      //   let length = item.split(':').length
      //   if (item.split(':')[length - 1] !== '*') {
      //     form.value.menuKeyList.push(item)
      //   }
      // })
      console.log(menus)
    }

    const submit = (formRef) => {
      selectTree()
      
      formRef.validate((valid, fields) => {
        if (valid) {
          let subData: bodyType = {
            function: form.value.funVal,
            beginTime: form.value.date.beginTime,
            endTime: form.value.date.endTime,
            limitedFields: form.value.limitedFields
          }
          if (props.rowId) {
            // 修改
            modifyUserDataPermissions(props.rowId, subData).then((res: any) => {
              if (res.code === '200000') {
                ElMessage.success('修改成功')

                setTimeout(() => {
                  emit('success')
                  close()
                }, 1000)
              }
            })
          } else {
            // 新增
            subData = {
              userCode: form.value.userCode,
              systemCode: form.value.systemVal,
              dimension: form.value.dimensionVal,
              permissionKeys: form.value.menuKeyList,
              ...subData
            }
            console.log(subData)
            // return
            addUserDataPermissions(subData).then((res: any) => {
              if (res.code === '200000') {
                ElMessage.success('新增成功')
                setTimeout(() => {
                  emit('success')
                  close()
                })
              }
            })
          }
        }
      })
    }

    return {
      orgConfig,
      storeConfig,

      close,
      precinctsTable,
      organizationsTable,
      storeTable,

      preRef,
      orgRef,
      storeRef,

      pageInfo,

      form,
      formRef,
      rules,
      datePlaceholder,
      // defaultValue,
      handleBeginTime,
      handleEndTime,
      disabledBegin,
      disabledEnd,

      hadnleSystem,
      handleFun,
      handleSearch,
      handleDimension,

      triggerTable,
      cancelRow,
      clear,

      treeRef,
      menuValue,
      menuTree,
      defaultProps,
      handleTree,

      submit
    }
  }
})
</script>

<style lang="scss" scoped>
:deep(.el-drawer) {
  min-width: 856px;
}
:deep(.el-drawer__body) {
  margin: 0;
  margin-left: 70px;
  margin-right: 32px;
  padding-left: 0;
  padding-right: 38px;
}
.drawer-select {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .form-content {
    min-width: 354px;
  }
  .select-content {
    min-width: 325px;
    display: flex;
    justify-content: flex-end;
    span {
      display: block;
      // width: 120px;
      line-height: 36px;
    }
  }
}
.drawer-content {
  margin-top: 50px;
  .content-header {
    display: flex;
    align-items: center;
    span {
      display: block;
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #e60012;
    }
    :deep(.el-input) {
      width: 270px;
    }
  }
  .content-table {
    margin-top: 20px;
    :deep(.el-table__row) {
      border-bottom: 1px solid #cccccc;
    }
    .content-pagination {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}

.dialog-footer {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.c-date-input-box {
  :deep(.el-input) {
    width: 123px !important;
    .el-input__wrapper {
      width: 100% !important;
    }
  }
  :deep(.el-input__inner) {
    padding: 0;
  }
}
.c-date-space-line {
  color: #ccc;
  margin-left: 5px;
  margin-right: 5px;
}
:deep(.el-tree) {
  width: 270px;
  height: 300px;
  overflow: auto;
  margin-top: 10px;
}

:deep(.el-tree) {
  .is-checked {
    .el-checkbox__inner {
      background: $mainColor !important;
      border: 1px solid $mainColor !important;
    }
  }
}
</style>

```


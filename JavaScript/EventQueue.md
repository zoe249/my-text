## 1.事件循环和任务队列

**原因：**首先，JavaScript是**单线程**,这样设计也是具有合理性的，试想如果一边进行dom的删除，另一边又进行dom的添加，浏览器该如何处理？

**引用：**<font color="skyblue">单线程即任务是串行的，后一个任务需要等待前一个任务的执行，这就可能出现长时间的等待。但由于类似ajax网络请求、setTimeout时间延迟、DOM事件的用户交互等，这些任务并不消耗 CPU，是一种空等，资源浪费，因此出现了异步。通过将任务交给相应的异步模块去处理，主线程的效率大大提升，可以并行的去处理其他的操作。当异步处理完成，主线程空闲时，主线程读取相应的callback，进行后续的操作，最大程度的利用CPU。此时出现了同步执行和异步执行的概念，同步执行是主线程按照顺序，串行执行任务；异步执行就是cpu跳过等待，先处理后续的任务（CPU与网络模块、timer等并行进行任务）。由此产生了任务队列与事件循环，来协调主线程与异步模块之间的工作。</font>

## 2.事件循环机制

![](https://img-blog.csdnimg.cn/30b61e39cc3c4116b262e8e049ccfbba.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAT2NlYW7vvIHvvIE=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

首先把JavaScript执行代码的操作分为主线程、任务队列，任何一段JavaScript代码的执行都可分为以下几个步骤

* 步骤一： 主线程读取JavaScript代码，此时为同步环境，形成相应的堆和执行栈；
* 步骤二： 当主线程遇到异步操作的时候，将异步操作交给对应的API进行处理；
* 步骤三： 当异步操作处理完成，推入任务队列中
* 步骤四： 主线程执行完毕后，查询任务队列，取出一个任务，并推入主线程进行处理
* 步骤五： 重复步骤二、三、四

**其中常见的异步操作有：ajax请求，setTimeout,还有类似onclik事件等**

## 3.任务队列

同步和异步任务分别进入不同的执行环境，同步进入主线程，异步进入任务队列

同一任务队列内，按队列顺序被主线程取走；
不同任务队列之间，存在着优先级，优先级高的优先获取（如用户I/O）

### 3.1任务队列的类型

任务队列分为 `宏任务(macrotask queue)` 和 `微任务(microtask queue)`

宏任务主要包含：`script( 整体代码)、setTimeout、setInterval、I/O、UI 交互事件、setImmediate(Node.js 环境)`

微任务主要包含：`Promise、MutationObserver、process.nextTick(Node.js 环境)`

### 3.2 区别

微任务microtask queue:

(1) 唯一，整个事件循环当中，仅存在一个;
(2) 执行为同步，同一个事件循环中的microtask会按队列顺序，串行执行完毕；

PS：所以利用microtask queue可以形成一个同步执行的环境

宏任务macrotask queue:

(1) 不唯一，存在一定的优先级（用户I/O部分优先级更高）
(2) 异步执行，同一事件循环中，只执行一个

3.3 更细致的事件循环过程
一、二、三、步同上
主线程查询任务队列，执行microtask queue，将其按序执行，全部执行完毕;
主线程查询任务队列，执行macrotask queue，取队首任务执行，执行完毕；
重复四、五步骤;

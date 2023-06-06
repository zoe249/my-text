# 前端代码规范

## 一、js规范

### (一) 命名

- 采用小写驼峰命名 `lowerCameCase`，代码命名均不能以下划线开头，也不能以下划线或美元符号结尾。反例：`name / name / name$`

- 方法名、参数名、成员变量、局部变量统一采用驼峰命名风格

  正确命名：`localValue / getHttpMessage()`

  错误命名：`localvalue / gethttpmessage()`

- 方法名必须是动词或动词+名次形式

- 增删改查，统一使用如下5个单词

  `add / update / delete / get / detail`

  附：函数常用方法的动词：

  ```
  get  获取           set  设置            add  增加           reduce 减少             delete  删除        create  创建        
  
  start  启动         stop  停止           open  打开          close  关闭             read  读取          write  写入
  
  load  载入          save  保存           begin  开始         end  结束               backup  备份        restore  恢复
  
  import  导入        export  导出         split  分割         merge  合并             inject  注入        extract  提取
  
  query  查找         submit  提交         cancle  取消        confirm  确认           show  显示          conceal  隐藏
  
  refresh  刷新       update  更新         refuse  拒绝        allow  允许             attach 附着         detach 脱离
  
  bind 绑定           separate 分离        view 查看           browse 浏览             edit 编辑           modify 修改
  
  select 选择         mark 标记            copy 复制           paste 粘贴              undo 撤销           redo 重做
  
  insert 插入         clear 清除           index 索引          sort 排序               find 查找           preview 预览
  
  search 搜索         play 播放            pause 暂停          reset  重置             change 更改
  
  launch 启动         run 运行             compile 编译        execute 执行            debug 调试          trace 跟踪
  
  observe 观察        listen 监听          build 构建          publish 发布            input 输入          output 输出
  
  encode 编码         decode 解码          encrypt 加密        decrypt 解密            compress 压缩       decompress 解压缩
  
  pack 打包           unpack 解包          parse 解析          emit 生成               connect 连接        disconnect 断开
  
  send 发送           receive 接收         download 下载       upload 上传             synchronize 同步    revert 复原
  
  lock 锁定           unlock 解锁          check out 签出      check in 签入           commit 交付         replace 切换
  
  push 推             pull 拉             expand 展开         collapse 折叠           finish 完成         go 跳转
  
  enter 进入          exit 退出            abort 放弃          quit 离开               obsolete 废弃       depreciate 废旧
  
  can   判断是否可执行某个动作
  
  has   判断是否含有某个值
  
  is   判断是否为某个值
  ```
  
- 常量全部大写，单词之间用下划线隔开，力求语义表达完整清楚，不要嫌名字长。

### (二) 代码格式

- 使用两个空格进行缩进
- 不同逻辑，不同语义，不同业务之间插入一个空行分隔

### (三) 括号

- 下列关键词必须有大括号（即使代码只有一行）:  `if / else / for / while / try / catch / finally / with`

  推荐：

  ```
  if (isTrue) {
  	doSomeThing();
  }
  ```

  不推荐：

  ```
  if (isTrue) doSomeThing();
  ```

### (四) undefined判断

- 永远不要直接使用 `undefined`进行变量判断；使用`typeof`和字符串`'undefined'`对变量进行判断

  推荐：

  ```
  if (typeof person === 'undefined') {
  	...
  }
  ```

  不推荐：

  ```
  if (person === undefined || person === 'undefined') {
  	...
  }
  ```

### (五) 条件判断和循环最多三层

- 条件判断能使用 三目运算符 和 逻辑运算符的，就不要使用条件判断。

  如果超过三层，抽成函数，并写清楚注释

### (六) this的转换命名

- 对上下文 `this` 的引用只能使用 `that` 来命名

```
let that = this;
```

### (七) 慎用console.log

- 对 console.log 会有性能问题，生产环境下请清除 console.log

### (八) 变量名复数形式

如：商品product  复数：products                 批量加s




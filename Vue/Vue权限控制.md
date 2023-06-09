# Vue权限控制

## 1.权限相关概念

### 1.1 权限的分类

#### 1.1.1 后端权限

前端只是视图层的展示，权限的核心是在于服务器的数据变化，后端是控制权限的关键，后端权限可以控制某个用户是否能够查询数据，是否增删数据等操作

* 后端如何知道请求时哪个用户发过来的

  ```
  cookie
  session
  token
  ```

* 后端的权限设计

  ```
  用户
  角色
  权限
  ```

  

#### 1.1.2 前端权限

前端权限的控制本质上来说，就是控制前端的**视图层的展示**和前端所发送的**请求**，但是只有前端权限控制没有后端权限控制是万万不可的

### 1.2 前端权限的意义

如果仅从能够修改服务器数据库中的数据层面来讲，确实只在后端做控制就足够了，做前端权限控制主要有以下几方面好处：

* 降低非法操作的可能性

* 尽可能排除不必要请求，减轻服务器压力

  没必要的请求，操作失败的请求，不具备权限的请求，应该压根不需要发送，请求减少了，自然也会减轻服务器的压力

* 提高用的体验

  根据用户具备的权限为该用户展现自己权限范围内的内容，避免在界面上给用户带来困扰，让用户专注于分内之事。

## 2.前端权限控制思路（***）

### 2.1菜单的控制(后台管理系统，先不考虑白名单)

在登录请求中，会得到权限数据，这个需要后端返回的数据的支持，前端根据权限数据，展示对应的菜单，点击菜单，才能查看相关的界面。

### 2.2 界面的控制

如果用户没有登录，手动在浏览器地址栏输入管理界面的地址，则需要跳转登录界面

如果用户已经登录，可是手动敲入非权限内的地址，则需要跳转404界面

### 2.3 按钮的控制

在某个菜单的界面中，还得根据权限数据，展示出可进行操作的按钮，比如删除，修改，增加

### 2.4 请求和响应的控制

如果用户通过非常规操作，比如通过浏览器的调试工具将某些禁用的按钮变成启用状态，此时发的请求，也应该被前端拦截。


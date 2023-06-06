# YApi操作手册

## 登录/注册

登录网址http://192.168.0.205:7300/，进行登录/注册

![https://imgchr.com/i/tar9L4](https://s1.ax1x.com/2020/06/03/tar9L4.png)

## 新建项目

在新建项目页，填写项目信息：

> - 项目名称不允许重复，包括其他分组
> - 基本路径为接口统一添加了前缀
> - 新建项目页只列出了部分配置，其他详细配置(环境配置、项目图标等)需要进入项目页的“设置”面板进行配置。



![https://imgchr.com/i/tarqXD](https://s1.ax1x.com/2020/06/03/tarqXD.png)

## 新建接口

- 点击左侧接口分组右侧的菜单按钮，选择 `添加接口`，或者点击接口列表右上角的 `添加接口`。

![https://imgchr.com/i/UNjCpn](https://s1.ax1x.com/2020/07/14/UNjCpn.png)

- 选择接口分类，输入接口名称和接口路径，点击 `提交`。

![https://imgchr.com/i/UNjM11](https://s1.ax1x.com/2020/07/14/UNjM11.png)

- 恭喜你！创建了第一个YApi的接口，你可以看到在左侧看到接口名称，右侧有该接口的信息预览。

![https://imgchr.com/i/UNjR9s](https://s1.ax1x.com/2020/07/14/UNjR9s.png)





## 接口设置

进入项目页，可以看到项目下的所有接口，需要注意的是，YApi有 `接口集合` 和 `测试集合` 两个概念。

- `接口集合` 将接口进行分类，使接口结构更清晰，一个接口只能属于一个集合，且不允许与其他接口重名。
- `测试集合` 为了方便我们测试接口，`测试集合` 将若干接口组合在一起，在这里一个接口可以属于不同集合。

## 接口配置

新建接口后，点击新添加的接口，右侧可以看到接口的预览信息，点击右侧的 `编辑` Tab项进入编辑面板。

在该面板中你可以看到接口的基本信息(接口名称、分类、路径)，除此以外，你还可以完善以下接口信息：

##### 基本设置

- 接口路径：可以更改 HTTP 请求方式，并且支持 restful 动态路由，例如 /api/{id}/{name}, id和name是动态参数
- 选择分类：可以更改接口所在分类
- 状态：用于标识接口是否开发完成。
- Tag：用于标识接口tag信息（v1.3.23+）,在接口list页可以根据tag过滤接口

![https://imgchr.com/i/UUeFPI](https://s1.ax1x.com/2020/07/14/UUeFPI.png)

##### 请求参数设置

- Query参数： 接口 url 的查询字符串，点击『添加Query参数』按钮来添加参数，可以通过拖动来交换参数位置
- 请求Body：http 请求 body 部分，如果http请求方式是 post, put 等请求方式时会有 req_body 部分。req_body_type 形式有4种，分别是 form, json, file 和 raw 。
- Headers: http 请求头字段，在 req_body 形式是 form 格式下会在 header 中自动生成 'Content-Type application/x-www-form-urlencoded'，其他3种格式也会自动生成不同 header

![https://imgchr.com/i/UUerz6](https://s1.ax1x.com/2020/07/14/UUerz6.png)

##### 返回数据设置

- 返回数据分为 `json` & `raw` 两种形式。基于 mock.js （具体使用方法详见[Mock 介绍](https://links.jianshu.com/go?to=https%3A%2F%2Fhellosean1025.github.io%2Fyapi%2Fdocuments%2Fmock.html)）和 json5，使用注释方式写参数说明。 为了方便数据编写可以按F9来使用全局编辑。

![https://imgchr.com/i/UUeWod](https://s1.ax1x.com/2020/07/14/UUeWod.png)

## 接口运行

接口运行功能，是用来测试真实接口的，类似『Postman』的功能。

点击运行 tab ,可进入到接口测试页面，首先安装『chrome crossRequest』扩展，才可正常使用此功能。

点击保存按钮可把当前接口保存到测试集，方便下次调试。

> 安装完插件记得刷新页面

## 编辑 Mock 数据

项目 -> 接口编辑 -> 返回数据设置

返回数据设置有两种方式，最新版本默认是基于 `json+注释` 的方式，另外一种是基于 `json-schema` 定义数据结构,请根据实际情况灵活选择使用。

#### 方式1. mockjs

1、配置，在设置中开启json5

![https://imgchr.com/i/Y5ld4P](https://s1.ax1x.com/2020/05/19/Y5ld4P.png)

![https://imgchr.com/i/Y5laNt](https://s1.ax1x.com/2020/05/19/Y5laNt.png)

2、返回接口，在返回数据模板里直接写入json数据即可

![https://imgchr.com/i/Y5l09f](https://s1.ax1x.com/2020/05/19/Y5l09f.png)

#### 方式2. json-schema

![https://imgchr.com/i/UUmb1x](https://s1.ax1x.com/2020/07/14/UUmb1x.jpg)

开启 json-schema 功能后，根据 json-schema 定义的数据结构，生成随机数据。

##### 如何生成随机的邮箱或 ip

![https://imgchr.com/i/UN7EPx](https://s1.ax1x.com/2020/07/14/UN7EPx.png)

点击高级设置，选择 `format` 选项，比如选择 `email` 则该字段生成随机邮箱字符串。

##### 集成 mockjs

基本书写方式为 mock 的数据占位符@xxx, 具体字段详见[Mockjs 官网](https://links.jianshu.com/go?to=http%3A%2F%2Fmockjs.com%2Fexamples.html)

![https://imgchr.com/i/UN7bQO](https://s1.ax1x.com/2020/07/14/UN7bQO.png)

![https://imgchr.com/i/UN7XeH](https://s1.ax1x.com/2020/07/14/UN7XeH.png)

> 如果不是以@字符开头的话或者匹配不到Mockjs中的占位符就会直接生成输入的值

json数据添加完成后，可在预览中的Mock地址查看数据

![https://imgchr.com/i/taWFGd](https://s1.ax1x.com/2020/06/03/taWFGd.png)

## 如何使用 Mock

###### 在 js 代码直接请求yapi提供的 mock 地址（不用担心跨域问题）

```
uni.request({
	url: 'http://192.168.0.205:7300/mock/118/cart',
	success (res) {
		console.log(res)
	}
})
```

## mock请求严格模式

版本 v1.3.22 新增 mock 接口请求字段参数验证功能，具体使用方法如下：

1. 打开 项目 -> 设置 开启 mock 严格模式
2. 针对 query, form 中设置的必须字段会进行必填校验 

![](//upload-images.jianshu.io/upload_images/1662509-2f52c2f0ca92a1a6.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200)





## 高级Mock

#### Mock 期望

在测试时，很多时候需要根据不同的请求参数、IP 返回不同的 HTTP Code、HTTP 头和 JSON 数据。

Mock 期望就是根据设置的请求过滤规则，返回期望数据。

#### 使用方法

1.进入接口详情页，点击『高级 Mock』选项。

![https://imgchr.com/i/tmUbB6](https://s1.ax1x.com/2020/05/29/tmUbB6.png)

2. 点击『添加期望』，填写过滤规则以及期望返回数据，在响应的body中添加需要返回的数据，点击『确定』保存。

![https://imgchr.com/i/tmdoex](https://s1.ax1x.com/2020/05/29/tmdoex.png)

![https://imgchr.com/i/tmwZXn](https://s1.ax1x.com/2020/05/29/tmwZXn.png)

3. 然后尝试在浏览器里发送符合规则的请求，查看返回的数据是否符合期望。

![https://imgchr.com/i/tm0SgJ](https://s1.ax1x.com/2020/05/29/tm0SgJ.png)




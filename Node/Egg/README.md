# 1.安装
```shell
yarn create egg --type=simple  # 简单版本
```

# 2.文件目录

**start 与 dev的区别**

| start            | dev    |
| ---------------- | ------ |
| 没有热更新       | 热更新 |
| 必须stop停止服务 |        |
|                  |        |

```
showcase
├── app
│   ├── controller  // 负责解析用户的输入，处理后返回结果给用户
│   │   └── home.ts
│   ├── service
│   │   └── news.ts
│   └── router.ts
├── config
│   ├── config.default.ts
│   ├── config.local.ts
│   ├── config.prod.ts
│   └── plugin.ts
├── test
│   └── **/*.test.ts
├── typings
│   └── **/*.d.ts
├── README.md
├── package.json
├── tsconfig.json
└── tslint.json
```

**controller  **// 负责解析用户的输入，处理后返回结果给用户

* `RESTful Controller` // 接受用户提供的参数，从数据库中查找返回给用户
* `HTML url HTML` // 根据 URL 不同返回不同的页面
* 代理服务器

# 3.使用 controller 控制器

1. 创建`zoe.js`文件

   建议开启严格模式

   ```js
   //app/controller/zoe.js
   'use strict';
   
   const Controller = require('egg').Controller;
   
   class ZoeController extends Controller {
     async index() {
       const { ctx } = this;
       ctx.body = '<h1>Hello Tom</h1>';
     }
   }
   
   module.exports = ZoeController;
   ```

2. 在`router`中映射

   ```js
   // app/router.js
   'use strict';
   
   module.exports = app => {
     const { router, controller } = app;
     router.get('/zoe', controller.zoe.index);
   };
   
   ```

   

# 4.单元测试

1. 创建 `zoe.test.js`文件

   ```js
   // test/app/contraoller.js
   'use strict';
   
   const { app } = require('egg-mock/bootstrap');
   
   describe('zoe -index', () => {
     it('index page', () => {
       return app.httpRequest()
         .get('/zoe')
         .expect('<h1>Hello Tom</h1>')
         .expect(200);
     });
   });
   ```

   

# 5.路由 用户触发动作

**支持 get，post 等所有 HTTP 方法**



```javascript
// 参数传递   
router.get('/money', controller.zoe.getMoney);  // /money?name=tom&age=18
router.get('/moneys/:id', controller.zoe.getMoneys) // /moneys/18989

// 参数接收
async getMoneys() {
    const { ctx } = this;
    console.log(ctx.params);
    console.log(ctx.query);
}
```





# 6.Service服务

**用于做业务员逻辑封装的抽象层**，数据库交互的代码都放在 Service

* 保持Controller 逻辑简单
* 独立性：在多个 Controller 复用
* 写测试用例简单

```js
// app/service/zoe.js
'use strice';

const Service = require('egg').Service;
class zoeService extends Service {
  async getMoney(id) {
    return {
      id,
      name: '100元',
    };
  }
}

module.exports = zoeService;
```

在 Controller 中使用

```js
'use strict';

const Controller = require('egg').Controller;

class ZoeController extends Controller {
  async getMoneys() {
    const { ctx } = this;
    const res = await ctx.service.zoe.getMoney('111');
    ctx.body = {
      status: 200,
      data: res,
    };
  }
}

// 浏览器返回 {"status":200,"data":{"id":"111","name":"100元"}}

module.exports = ZoeController;

```



# 7.Cookie 与 Session

## 7.1Cookie 基本操作

```js
async add() {
    const { ctx } = this;
    ctx.cookies.set('user', 'hello, zoe'); // 设置 Cookie
    ctx.cookies.set('user', '更新后的user'); // 更新 Cookie
    ctx.cookies.set('user', null); // 删除 Cookie
    
    const user = ctx.cookies.get('user'); // 获取 Cookie
}
```

## 7.2 Cookie 操作

ctx.cookies.set() 接受三个参数`key, value, options`,前两个参数分别对应设置Cookie的键和值，第三个参数用来配置Cookie的权限

| 属性名    | 类型    | 作用                                                         |
| --------- | ------- | ------------------------------------------------------------ |
| maxAge    | Number  | 设置这个键值对在浏览器的最长保存时间。是一个从服务器当前时刻开始的毫秒数。 |
| expires   | Date    | 设置这个键值对的失效时间，如果设置了 maxAge，expires 将会被覆盖 |
| path      | String  | 设置键值对生效的 URL 路径，默认设置在根路径上（`/`）         |
| domin     | String  | 设置键值对生效的域名，默认没有配置，可以配置成只在指定域名才能访问 |
| httpOnly  | Boolean | 设置键值对是否可以被 js 访问                                 |
| secure    | Boolean | 设置键值对只在 HTTPS 连接上传输                              |
|           |         |                                                              |
| overwrite | Boolean | 设置 key 相同的键值对如何处理，如果设置为 true，则后设置的值会覆盖前面设置的，<br/>否则将会发送两个 set-cookie 响应头 |
| signed    | Boolean | 设置是否对 Cookie 进行签名，如果设置为 true，<br>则设置键值对的时候会同时对这个键值对的值进行签名，<br>后面取的时候做校验，可以防止前端对这个值进行篡改。默认为 true。 |
| encrypt   | Boolean | 设置是否对 Cookie 进行加密                                   |

<font color="red">**默认的配置下，Cookie 是加签不加密的，浏览器可以看到明文，js 不能访问，不能被客户端（手工）篡改。**</font>

## 7.3 Session

Session 的使用方法非常直观，直接读取它或者修改它就可以了，如果要删除它，直接将它赋值为 null：

```js
ctx.session.usernaem = 'TOM'; // 设置
const username = ctx.session.usernaem; // 获取
```

# 8.中间件 Middleware

## 8.1 基本使用

```js
// app/middleware/counter.js
module.exports = (options) => {
  return async (ctx, next) => {
    if (ctx.session.counter) {
      ctx.session.counter++;
    } else {
      ctx.session.counter = 1;
    }

    await next();
  };
};
```

```js
// config/config.default.js
config.middleware = [ 'counter' ]; // 与文件名一致
```

## 8.2 路由中间件

在单个路由中使用中间件，删除`config.middleware = []`

在路由中使用

```js
'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const counter = app.middleware.counter();

  router.get('/', controller.home.index);
  router.get('/not', counter, controller.home.notFond); // 作为第二个参数传给router
};

```

# 9.拓展

## 9.1 Appication

```js
// app/extend/application.js
module.exports = {
  // 方法扩展
  currentTime() {
    return getTime();
  },
  
  // 属性扩展
  get Time() {
    return getTime();
  },
};

function getTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  const nowTime = year + '-' + month + '-' + date;
  return nowTime;
}

```

```js
class ZoeController extends Controller {
  async index() {
    const { ctx, app } = this;
    const username = ctx.session.usernaem;
    
    const nowTime = app.currentTime(); // 方法扩展
    // const nowTime = app.Time; // 属性扩展
  }
}
```



## 9.2 Context

```js
// app/extend/context.js
module.exports = {
  params(key) {
    console.log(key);
    const method = this.request.method;
    if (method === 'GET') {
      return key ? this.query[key] : this.query;
    } else if (method === 'POST') {
      return key ? this.request.body[key] : this.request.body;
    }
  },
};
```

```js
// app/controller/zoe.js  
async newContext() {
    const { ctx } = this;

    ctx.body = 'newContext';
    const params = ctx.params('name');
    console.log(params);
  }
```

# 10.定时任务

## 10.1基本使用

所有的定时任务都统一存放在 `app/schedule` 目录下，每一个文件都是一个独立的定时任务，可以配置定时任务的属性和要执行的方法

```js
// app/schedule/update_cache.js
const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '1m', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    console.log(new Date()) // 每隔一分钟打印一次当前时间
  }
}

module.exports = UpdateCache;
```

上面的例子可以简写为

```js
module.exports = {
  schedule: {
    interval: '1m', // 1 分钟间隔
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    console.log(new Date()) // 每隔一分钟打印一次当前时间
  },
};
// 这个定时任务会在每一个 Worker 进程上每 1 分钟执行一次，将远程数据请求回来挂载到 app.cache 上。
```

## 10.2定时方式

定时任务可以指定 interval 或者 cron 两种不同的定时方式。

#### interval

通过 `schedule.interval` 参数来配置定时任务的执行时机，定时任务将会每间隔指定的时间执行一次。interval 可以配置成

- 数字类型，单位为毫秒数，例如 `5000`。
- 字符类型，会通过 [ms](https://github.com/zeit/ms) 转换成毫秒数，例如 `5s`。

```js
module.exports = {
  schedule: {
    // 每 10 秒执行一次
    interval: '10s',
  },
};
```

#### cron

通过 `schedule.cron` 参数来配置定时任务的执行时机，定时任务将会按照 cron 表达式在特定的时间点执行。cron 表达式通过 [cron-parser](https://github.com/harrisiirak/cron-parser) 进行解析。

**注意：cron-parser 支持可选的秒（linux crontab 不支持）。**

```bash
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, optional)
```

```js
module.exports = {
  schedule: {
    // 秒 分 时 天/日期 月 周
    // 每三小时准点执行一次
    cron: '0 0 */3 * * *',
  },
};
```

### 类型

框架提供的定时任务默认支持两种类型，worker 和 all。worker 和 all 都支持上面的两种定时方式，只是当到执行时机时，会执行定时任务的 worker 不同：

- `worker` 类型：每台机器上只有一个 worker 会执行这个定时任务，每次执行定时任务的 worker 的选择是随机的。
- `all` 类型：每台机器上的每个 worker 都会执行这个定时任务。

# 11.MySQL

```shell
npm i --save egg-mysql
```





# Node版本切换踩坑

使用nvm切换node版本时，有时候会只下载了node，没有下载npm 

nvm 默认目录`C:\Users\14217\AppData\Roaming\nvm`

可以手动下载对应的npm版本到node目录下 `C:\Program Files`

https://registry.npmmirror.com/binary.html?path=node/

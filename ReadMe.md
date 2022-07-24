# 一、项目初始化

## npm 初始化

```
npm init -y
```

- 记录项目依赖

  

## git 初始化

```
git init
```

git的本地仓库



# 二、搭建项目

## 安装koa

```
npm i koa
```

## 编写最基础的app

创建 `src/main.js`

```js
const Koa =require('koa')

const app=new Koa()

app.use((ctx,next)=>{
  ctx.body='hello world'
})

app.listen(3000,()=>{
  console.log('server is running on http://localhost:3000');
})
```

## 测试

`nodemon ./src/main.js`



# 三、优化

## 读取配置文件,项目更灵活

安装 `dotenv`，作用是读取跟目录中的`.env`文件，将配置写到`process.env`中

```
npm i dotenv
```

创建`.env`文件

```
APP_PORT=8000
```

创建`src/config/config.default.js`

```js
//基本使用
const dotenv=require('dotenv')

dotenv.config()

// console.log(process.env);

module.exports=process.env
```



# 四、添加路由

## 安装`koa-router`

```
npm i koa-router
```

步骤

1. 导入包
2. 实例化对象
3. 编写路由
4. 注册中间件

## 编写路由

创建`src/router`目录，编写`user.route.js` 

```js
const Router=require('koa-router')
const router= new Router({prefix:'/users'}) 
userRouter.get('/',(ctx,next)=>{
  ctx.body='hello user'
})

moudle.exports=router
```

## 编写main.js

```js
const userRouter=require('./router/user.route')
app.use(userRouter.routes())
```



# 五、目录结构优化

## 将http服务和app业务拆分

创建`src/app/index.js`

```js
const Koa =require('koa')

const userRouter=require('../router/user.route')

const app=new Koa()

app.use(userRouter.routes())

module.exports=app
```

改写`main.js`

```js
const app=require('./app')
```

## 将路由和控制器拆分

路由：解析URL，分布给控制器对应的方法

控制器：处理不同的业务

改写`user.route.js`

```js
const {register,login}=require('../controller/user.controller')
//注册接口
router.post('/register',register)

//登录接口
router.post('/login',login)
```

创建 `controll/user.controller.js`

```js
class UserController{
  async register(ctx,next){
    ctx.body='用户注册成功'
  }

  async login(ctx,next){
    ctx.body='登录成功'
  }
}

module.exports=new UserController()
```


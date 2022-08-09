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

# 六、解析body

## 安装`koa-body`

```js
npm  i koa-body
```

## 注册中间件

改写`app/index.js`

```js
const koaBody = require('koa-body')
app.use(koaBody())
```

## 解析请求数据

改写`user.controller.js`

```js
const {createUser} =require('../service/user.service')

async register(ctx,next){
    console.log(ctx.request.body);
    const {user_name,paassword}  =ctx.request.body
    //操作数据库
    const res = await createUser(user_name,paassword)
    console.log(res);
    //返回结果
    ctx.body=ctx.request.body
  }
```

## 拆分service层

主要是处理数据库

创建`src/service/user.service.js`

```js
class UserService{
  async createUser(user_name,password){
    //todo
    return '写入数据库成功' 
  }
}

module.exports=new UserService()
```



# 七、关于数据库操作

sequelize ORM数据进口库工具

ORM：对象关系映射

- 数据表映射一个类
- 数据表中的数据行对应一个对象
- 数据表的字段对应对象的属性
- 数据表的操作对应对象的方法

## 安装sequelize和相关依赖

```js
npm i mysql2 sequelize
```

## 连接数据库

`src/db/seq.js`

```js
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
}= require('../config/config.default')
const {
  Sequelize
} = require("sequelize")


const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql'
})

// 测试
// seq.authenticate().then(()=>{
//   console.log('连接成功');
// }).catch((err)=>{
//   console.log('失败',err.message);
// })

module.exports = seq
```

## 编写配置文件

在`.env`文件中

```js
APP_PORT=8000

MYSQL_HOST = localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PWD=20140326..
MYSQL_DB  = zdsc
```



# 八、创建User模型

## 拆分model层

创建`src/model/user.model.js`

```js
const {DataTypes}=require('sequelize')

const seq =require('../db/seq')

//创建模型(会在名字上加上s，可以设置不加，参见文档)
const User = seq.define('zd_user',{
  //id 会被sequelize自动创建
  user_name:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true,
    comment:'用户名，唯一' 
  },
  password:{
    type:DataTypes.CHAR(64),
    allowNull:false,
    comment:'密码'
  },
  is_admin:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:0,
    comment:'是否为管理员,0:不是(默认) 1:是'
  }
}) 

//同步模型
User.sync({force : true})

module.exports=User
```



# 九、添加用户入库

在`user.service.js`中操作数据库,插入用户

```js
const User=require('../module/user.module')

class UserService{
  async createUser(user_name,password){
    // 插入数据
    const res=await User.create({
      //表的字段
      user_name,
      password
    })

    return res.dataValues
  }
}

module.exports=new UserService()
```

在`user.controller.js`中设置返回给客户端的数据

```js
  async register(ctx,next){
    console.log(ctx.request.body);
    const {user_name,password}  =ctx.request.body
    //操作数据库
    const res = await createUser(user_name,password)
    //返回结果
    ctx.body={
      code:0,
      message:'用户注册成功',
      result:{
        id:res.id,
        user_name:res.user_name,
      },
    }
  }
```



# 十、错误处理

添加用户时需要合法与合理性

在`user.controller.js`

```js
//合法性
    if(!user_name || !password){
      console.error('用户名或密码为空',ctx.request.body);
      ctx.status = 400
      ctx.body={
        code:'10001',
        message:'用户名或密码为空',
        result:'',
      }
      return 
    }
    //合理性
    if( await getUserInfo({user_name})){
      ctx.status=409;
      ctx.body={
        code:'10002',
        message:'用户已经存在',
        result:''
      }
      return
    }
```

在`user.service.js`中利用sequelize查找数据库

```js
  async getUserInfo({id,user_name,password,is_admin}){
    const whereOpt={}
    id && Object.assign(whereOpt,{id})
    user_name && Object.assign(whereOpt,{user_name})
    password && Object.assign(whereOpt,{password})
    is_admin && Object.assign(whereOpt,{is_admin})

    const res=await User.findOne({
      attributes:['id','user_name','password',"is_admin"],
      where:whereOpt
    })
    return res?res.dataValues:null
  }
```



# 十一、拆分中间件


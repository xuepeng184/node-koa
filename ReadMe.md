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


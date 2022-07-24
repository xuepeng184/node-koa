# 项目初始化

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



# 搭建项目

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
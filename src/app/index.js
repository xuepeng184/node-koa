const path=require('path')

const Koa =require('koa')
const app=new Koa()
const koaBody = require('koa-body')
const KoaStatic=require('koa-static')
const parameter=require('koa-parameter')

const errHandler=require('./errorHandler')
const router =require('../router')


app.use(koaBody({
  multipart:true,
  formidable:{
    //这里的相对路劲是相对于当前进程在哪里执行的上一级开始寻找
    uploadDir:path.join(__dirname,'../upload'),
    keepExtensions:true,
  },
  parsedMethods:['POST','PUT','PATCH','DELETE']
}))
app.use(parameter(app))
app.use(router.routes())
app.use(router.allowedMethods())
app.use(KoaStatic(path.join(__dirname,'../upload')))
//统一的错误处理
app.on('error',errHandler)

module.exports=app
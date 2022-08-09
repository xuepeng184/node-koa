const jwt=require('jsonwebtoken')

const {JWT_SECRET}=require('../config/config.default')

const {tokenExpiredError,invalidToken,hasNotAdminPermisson}=require('../constant/err.type')

//判断用户是否成功登录
const auth=async(ctx,next)=>{
  const {authorization=''}=ctx.request.header
  const token=authorization.replace('Bearer ','')


  try {
    // user中包含了token中payload的信息
    const user=jwt.verify(token,JWT_SECRET)
    ctx.state.user=user
  } catch (error) {
    switch(error.name){
      case "TokenExpiredError":
        console.error('token已过期',error);
        return ctx.app.emit('error',tokenExpiredError,ctx)
      case "JsonWebTokenError":
        console.error('无效token',error);
        return ctx.app.emit('error',invalidToken,ctx)
      }
  }

  await next()

}

//判断用户是否拥有admin权限
const hadAdminPermisson=async(ctx,next)=>{
  // 从user中解构出信息
  const {is_admin}=ctx.state.user
  if(!is_admin){
    console.error('该用户没有管理员权限',ctx.state.user);
    return ctx.app.emit('error',hasNotAdminPermisson,ctx)
  }
  await next()
}

module.exports={
  auth,
  hadAdminPermisson
}
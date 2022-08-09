//中间件
const bcrypt = require('bcryptjs')


const {
  userFormatEroor,
  userAlreadyExisted,
  userDoesNotExist,
  userLoginError,
  invalidPawword
} = require("../constant/err.type")
const {
  getUserInfo
} = require('../service/user.service')



const userValidate = async (ctx, next) => {
  const {
    user_name,
    password
  } = ctx.request.body
  //合法性
  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body);
    ctx.app.emit('error', userFormatEroor, ctx)
    return
  }

  await next()
}


const verifyUser = async (ctx, next) => {
  const {
    user_name
  } = ctx.request.body
  //合理性
  if (await getUserInfo({
      user_name
    })) {
    ctx.app.emit('error', userAlreadyExisted, ctx)
    return
  }

  await next()
}


const cryptPassword = async (ctx, next) => {
  const {
    password
  } = ctx.request.body
  const salt = bcrypt.genSaltSync(10);
  // hash保存的是密文
  const hash = bcrypt.hashSync(password, salt);

  ctx.request.body.password = hash

  await next()
}


const verfiyLogin = async (ctx, next) => {
  //判断用户是否存在  存在后判断密码是否存在
  const {
    user_name,
    password
  } = ctx.request.body

  try {
    const res = await getUserInfo({
      user_name
    })

    if (!res) {
      console.error('用户名不存在', {
        user_name
      });
      return ctx.app.emit('error', userDoesNotExist, ctx)
    }
    //密码是否匹配
    if(!bcrypt.compareSync(password,res.password)){
      return ctx.app.emit('error',invalidPawword,ctx)
    }
  } catch (error) {
    console.error(error);
    ctx.app.emit('error',userLoginError,ctx)
  }



  await next()
}


module.exports = {
  userValidate,
  verifyUser,
  cryptPassword,
  verfiyLogin
}
const jwt = require('jsonwebtoken')

const {
  createUser,
  getUserInfo,
  updateById
} = require('../service/user.service')

const {
  JWT_SECRET
} = require('../config/config.default')

const {
  userRegisterError
} = require('../constant/err.type')

class UserController {
  async register(ctx, next) {
    const {
      user_name,
      password
    } = ctx.request.body

    //操作数据库
    try {
      const res = await createUser(user_name, password)
      //返回结果
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      }
    } catch (error) {
      console.log(error);
      ctx.app.emit('error', userRegisterError, ctx.body)
    }

  }

  async login(ctx, next) {
    const {
      user_name
    } = ctx.request.body
    //获取用户信息
    try {
      //剔除返回结果的password，其他信息记录在token
      // 的payload中
      const {
        password,
        ...res
      } = await getUserInfo({
        user_name
      })


      ctx.body = {
        code: 0,
        message: "用户登录成功",
        result: {
          token: jwt.sign(res, JWT_SECRET, {
            expiresIn: '1d'
          })
        }
      }
    } catch (error) {
      console.error('用户登录失败', error);
    }
  }

  async changePassword(ctx, next) {
    const id = ctx.state.user.id
    const password = ctx.request.body.password

    if (await updateById({
        id,
        password
      })) {
      ctx.body = {
        code: 0,
        message: '修改密码成功',
        result: ''
      }
    }else{
      ctx.body={
        code:'10007',
        message:'修改密码失败',
        result:''
      }
    }
  }
}


module.exports = new UserController()
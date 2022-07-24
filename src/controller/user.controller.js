const {createUser} =require('../service/user.service')

class UserController{
  async register(ctx,next){
    console.log(ctx.request.body);
    const {user_name,paassword}  =ctx.request.body
    //操作数据库
    const res = await createUser(user_name,paassword)
    console.log(res);
    //返回结果
    ctx.body=ctx.request.body
  }

  async login(ctx,next){
    ctx.body='登录成功'
  }
}


module.exports=new UserController()
const { addrFormatError } = require('../constant/err.type')
const {isDefaultAddr,createAddr,getAddrList,updateAddr,deleteAddrById}=require('../service/addr.service')

class AddrController{
  async create(ctx){
    const user_id=ctx.state.user.id
    const {consignee,phone,address}=ctx.request.body

    const res=await createAddr({user_id,consignee,phone,address})

    ctx.body={
      code:0,
      message:'添加地址成功',
      result:res
    }
  }

  //获取地址列表
  async getAddr(ctx){
    const user_id=ctx.state.user.id
    const res=await getAddrList(user_id)
    ctx.body={
      code:0,
      message:'获取购物车列表成功',
      result:res
    }
  }

  //更新地址
  async update(ctx){
    const {consignee,phone,address}=ctx.request.body
    const {id}=ctx.request.params;
    if(!consignee&&!phone&&!address){
      addrFormatError.result='三者不能同时为空'
      return ctx.app.emit('error',addrFormatError,ctx)
    }
    const res=await updateAddr(id,consignee,phone,address)
    ctx.body={
      code:0,
      message:'更新地址成功',
      result:res
    }
  }

  //删除地址
  async deleteAddr(ctx){
    const {id}=ctx.request.params
    const res=await deleteAddrById(id)
    ctx.body={
      code:0,
      message:`删除id为${id}的地址成功`,
      result:res
    }
  }

  //设置默认地址
  async isDefault(ctx){
    const {id}=ctx.request.params
    const user_id=ctx.state.user.id
    const res=await isDefaultAddr(id,user_id)
    ctx.body={
      code:0,
      message:'修改默认地址成功',
      result:res
    }
  }
}


module.exports=new AddrController()
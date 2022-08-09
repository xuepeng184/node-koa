const { v4:uuidv4 }=require('uuid')
const {createOrder,findAllOrder,updateOrder}=require('../service/order.service')
class OrderController{
  async create(ctx){
    const {address_id,total,goods_info}=ctx.request.body
    const user_id=ctx.state.user.id

    const order_number=uuidv4()

    const res=await createOrder({user_id,address_id,total,goods_info,order_number})
    ctx.body={
      code:0,
      message:'生成订单成功',
      result:res
    }
  }

  async findAll(ctx){
    const {pageNum=1,pageSize=10,status=0}=ctx.request.query
    const res=await findAllOrder(pageNum,pageSize,status)
    ctx.body={
      code:0,
      message:'获取订单列表成功',
      result:res
    }
  }
  
  async update(ctx){
    const id=ctx.request.params.id
    const {status}=ctx.request.body
    const res=await updateOrder(id,status)
    ctx.body={
      code:0,
      message:'修改订单状态成功',
      result:res
    }
  }
}


module.exports=new OrderController()
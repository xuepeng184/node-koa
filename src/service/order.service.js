const Order=require('../module/order.module')
class OrderService{
  async createOrder(order){
    const res=await Order.create(order)
    return res
  }

  async findAllOrder(pageNum,pageSize,status){
    const {count,rows}=await Order.findAndCountAll({
      where:{
        status
      },
      offset:(pageNum-1)*pageSize,
      limit:pageSize*1,
      attributes:['goods_info','total','order_number','status']
    })

    return {
      pageNum,
      pageSize,
      total:count,
      list:rows
    }
  }

  async updateOrder(id,status){
    return await Order.update({status},{where:{id}})
  }
}


module.exports=new OrderService()
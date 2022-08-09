
const Goods =require('../module/goods.module')

class GoodsService{
  async createGoods(goods){
    const res=await Goods.create(goods)
    return res.dataValues
  }

  
  async updateGoods(id,goods){
    const res=await Goods.update(goods,{where:{id}})
    return res[0]>0
  }

  async removeGoods(id){
    const res=await Goods.destroy({where:{id}})
    return res>0
  }

  async restoreGoods(id){
    const res=await Goods.restore({where:{id}})
    return res>0
  }

  async findGoods(pageNum,pageSize){
    // const count=await Goods.count()
    // const offset=(pageNum-1)*pageSize
    // const rows=await Goods.findAll({offset:offset,limit:Number(pageSize)})
    const offset=(pageNum-1)*pageSize
    const {count,rows}=await Goods.findAndCountAll({offset:offset,limit:Number(pageSize)})
    const newRows=rows.map(value=>{return{
      id:value.id,
      goods_name:value.goods_name,
      goods_price:value.goods_price,
      goods_num:value.goods_num,
      goods_img:value.goods_img
    }})
    return {
      pageNum,
      pageSize,
      total:count,
      list:newRows
    }
  }
}

module.exports=new GoodsService()
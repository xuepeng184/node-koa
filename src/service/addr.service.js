
const Address=require('../module/addr.module')

class AddrService{
  async createAddr(addr){
    return await Address.create(addr)
  }

  async getAddrList(user_id){
    const {count,rows}=await Address.findAndCountAll({
      where:{user_id:user_id},
      attributes:['id','consignee','phone','address','is_default']
    })
    return rows
  }
  
  async updateAddr(id,consignee,phone,address){
    const res=await Address.findByPk(id)
    consignee!==undefined?res.consignee=consignee:'';
    phone!==undefined?res.phone=phone:'';
    address!==undefined?res.address=address:''
    return res.save()
  }

  async deleteAddrById(id){
    const res=await Address.destroy({
      where:{id}
    })
    return res
  }

  async isDefaultAddr(id,user_id){
    await Address.update({is_default:0},{where:{user_id:user_id}})
    const res=await Address.update({is_default:1},{where:{id}})
    return res
  }
}


module.exports=new AddrService()
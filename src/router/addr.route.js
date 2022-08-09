const Router=require('koa-router')

const router=new Router({prefix:'/address'})

const {auth}=require('../middleware/auth.middleware')
const {validator}=require('../middleware/addr.middleware')
const { create,getAddr, update,deleteAddr,isDefault} = require('../controller/addr.controller')


//添加地址接口
router.post('/',auth,validator({
  consignee:'string',
  phone:{type:'string',format:/^1\d{10}$/},
  address:'string'
}),create)

//获取地址列表
router.get('/',auth,getAddr)

//修改地址
router.patch('/:id',auth,validator({
  consignee:{type:'string',required:false},
  phone:{type:'string',format:/^1\d{10}$/,required:false},
  address:{type:'string',required:false}
}),update)

//删除地址
router.delete('/:id',auth,deleteAddr)

//设置默认地址
router.patch('/defaultAddr/:id',auth,isDefault)


module.exports=router
const Router=require('koa-router')


const { unselectAll,add,findAll,update,remove,selectAll } = require('../controller/cart.controller')
const { auth } = require('../middleware/auth.middleware')
const {validator}=require('../middleware/cart.middleware')


const router=new Router({prefix:'/carts'})

//添加到购物车
router.post('/',auth,validator({goods_id:'number'}),add)

//获取购物车列表
router.get('/',auth,findAll)

//更新购物车,更改选中状态和数量
router.patch('/:id',auth,validator({
  number:{type:'number',required:false},
  selected:{type:'bool',required:false}
}),update)

//删除购物车
router.delete('/',auth,validator({ids:'array'}),remove)

//全选与全不选
router.post('/selectAll',auth,selectAll)
router.post('/unselectAll',auth,unselectAll)

module.exports=router
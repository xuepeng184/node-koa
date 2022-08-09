const Router = require('koa-router')

const {
  validator
} = require('../middleware/goods.middleware')
const {
  auth,
  hadAdminPermisson
} = require('../middleware/auth.middleware')
const {
  upload,
  create,
  update,
  remove,
  restore,
  findAll
} = require('../controller/goods.controller')

//实例化并加上统一前缀
const router = new Router({
  prefix: '/goods'
})

//先判断是否登录，后判断是否有管理员权限,上传图片
router.post('/upload', auth, hadAdminPermisson, upload)

//发布商品接口
router.post('/', auth, hadAdminPermisson, validator, create)

//修改商品接口
router.put('/:id', auth, hadAdminPermisson, validator, update)

//删除商品接口,硬删除
// router.delete('/:id',auth,hadAdminPermisson,remove)

//下架商品，软删除
router.post('/:id/off', auth, hadAdminPermisson, remove)

//上架商品
router.post('/:id/on', auth, hadAdminPermisson, restore)

//获取商品列表
router.get('/', findAll)


module.exports = router
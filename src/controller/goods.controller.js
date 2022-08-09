const path = require('path')

const {
  fileUploadError,
  unSupportFileType,
  publishGoodsError,
  invalidGoodsId
} = require('../constant/err.type')
const {
  createGoods,
  updateGoods,
  removeGoods,
  restoreGoods,
  findGoods
} = require('../service/goods.service')


class GoodsController {
  async upload(ctx) {
    const {
      file
    } = ctx.request.files || []
    //支持的文件格式
    const fileTypes = ['image/jpeg', 'image/png']
    if (file) {
      if (fileTypes.indexOf(file.mimetype) == -1) {
        return ctx.app.emit('error', unSupportFileType, ctx)
      }
      ctx.body = {
        code: 0,
        message: '图片上传成功',
        result: {
          goods_img: path.basename(file.filepath)
        }
      }
    } else {
      return ctx.app.emit('error', fileUploadError, ctx)
    }

  }
  async create(ctx) {
    //直接调用service的createGoods方法
    try {
      const {
        createdAt,
        updatedAt,
        ...res
      } = await createGoods(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '发布商品成功',
        result: res,
      }
    } catch (error) {
      console.error(error);
      return ctx.app.emit('error', publishGoodsError, ctx)
    }
  }
  async update(ctx) {
    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body)
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改商品成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', invalidGoodsId, ctx)
      }
    } catch (error) {
      console.error(error);
    }
  }
  async remove(ctx) {
    const res = await removeGoods(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '商品下架成功 ',
        result: ''
      }
    }else{
      return ctx.app.emit('error',invalidGoodsId,ctx)
    }

  }
  async restore(ctx){
    const res=await restoreGoods(ctx.params.id)
    if(res){
      ctx.body={
        code: 0,
        message: '商品上架成功 ',
        result: ''
      }
    }else{
      return ctx.app.emit('error',invalidGoodsId,ctx)
    }
  }
  async findAll(ctx){
    //解析参数
    const {pageNum=1,pageSize=10}=ctx.request.query
    const res=await findGoods(pageNum,pageSize)
    ctx.body={
      code:0,
      message:'获取商品列表成功',
      result:res
    }
  }
}


module.exports = new GoodsController()
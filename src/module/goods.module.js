const {DataTypes}=require('sequelize')

//连接数据库
const seq=require('../db/seq')

//创建表
const Goods=seq.define('zd_goods',{
  goods_name:{
    type:DataTypes.STRING,
    allowNull:false,
    comment:'商品名称'
  },
  goods_price:{
    type:DataTypes.DECIMAL(10,2),
    allowNull:false,
    comment:'商品价格'
  },
  goods_num:{
    type:DataTypes.INTEGER,
    allowNull:false,
    comment:'商品库存'
  },
  goods_img:{
    type:DataTypes.STRING,
    allowNull:false,
    comment:'商品图片地址'
  },
},{
  paranoid:true
})

// Goods.sync({force:true})

module.exports=Goods
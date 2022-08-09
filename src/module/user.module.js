const {DataTypes}=require('sequelize')

const seq =require('../db/seq')

//创建模型(会在名字上加上s，可以设置不加，参见文档)
const User = seq.define('zd_user',{
  //id 会被sequelize自动创建
  user_name:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true,
    comment:'用户名，唯一' 
  },
  password:{
    type:DataTypes.CHAR(64),
    allowNull:false,
    comment:'密码'
  },
  is_admin:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:0,
    comment:'是否为管理员,0:不是(默认) 1:是'
  }
}) 

//同步模型
// User.sync({force : true})

module.exports=User
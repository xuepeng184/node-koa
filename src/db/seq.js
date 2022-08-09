const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
}= require('../config/config.default')
const {
  Sequelize
} = require("sequelize")


const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql'
})

// 测试
// seq.authenticate().then(()=>{
//   console.log('连接成功');
// }).catch((err)=>{
//   console.log('失败',err.message);
// })

module.exports = seq
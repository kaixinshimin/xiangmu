const mongoose = require('mongoose')

/* Schema: 表的描述 */
const Schema = mongoose.Schema
const OrderSchema = new Schema({
  username:String,
  shop:Object,
  info:Object
})

/* model 建模型 */
module.exports = mongoose.model('older', OrderSchema)
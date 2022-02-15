const mongoose = require('mongoose')

/* Schema: 表的描述 */
const Schema = mongoose.Schema
const CarSchema = new Schema({
  username:String,
  prolist:Array

})

/* model 建模型 */
module.exports = mongoose.model('Car', CarSchema)

// id:{
//   type: String,
//   require: true
// },
// userid:{
//   type: String,
//   require: true
// },
// name: {
//   type: String,
//   require: true
// },
// price: {
//   type: Number,
//   require: true
// },
// num: {
//   type: Number,
//   require: true
// },
// src: {
//   type: String,
//   require: true
// },
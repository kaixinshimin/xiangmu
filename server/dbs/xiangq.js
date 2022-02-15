const mongoose = require('mongoose')

/* Schema: 表的描述 */
const MenuSchema = mongoose.Schema({
    id: Number, // 或者 'productId':{type:String}
    name: String,
    title: String,
    img:String
})

/* model 建模型 */
var xiangq = mongoose.model("xiangqing", MenuSchema)

module.exports = xiangq;
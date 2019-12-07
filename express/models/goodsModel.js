const mongoose=require('mongoose')
const Schema=mongoose.Schema
const artSchema=new Schema({
    tel:String,
    time:String,
    address:String,
    content:String,
    imgurl:String,
    num:String,
    usertel:String
})
const artModel=mongoose.model('goodsModel',artSchema)
module.exports=artModel
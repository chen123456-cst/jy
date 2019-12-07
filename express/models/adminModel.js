const mongoose=require('mongoose')
const Schema=mongoose.Schema
const artSchema=new Schema({
    tel:String,
    password:String,
    street:String
})
const artModel=mongoose.model('adminModel',artSchema)
module.exports=artModel
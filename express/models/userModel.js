const mongoose=require('mongoose')
const Schema=mongoose.Schema
const artSchema=new Schema({
   username:String,
   tel:String,
   password:String,
   imgurl:String,
   birth:String,
   address:String,
   street:String
})
const userModel=mongoose.model('userModel',artSchema)
module.exports=userModel
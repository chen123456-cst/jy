const mongoose=require('mongoose')
const Schema=mongoose.Schema
const artSchema=new Schema({
    content:String,
    imgurl:String
})
const newthing=mongoose.model('newthing',artSchema)
module.exports=newthing
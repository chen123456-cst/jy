var express = require('express');
var router = express.Router();
const multer=require('multer')
// 工人信息列表
var adminModel=require('../models/adminModel')
// 保修信息列表
var goodsModel=require('../models/goodsModel')
// 用户信息列表
var userModel=require('../models/userModel')
// 今日故事列表
var newthing=require('../models/newthing')



/* GET home page. */
// 工人列表接口
router.get('/', function(req, res, next) {
  adminModel.find().then((result)=>{
      res.send({
          code:1,
          mes:'请求成功',
          data:result
      })
  })
});
// 用户列表
router.get('/user',function(req,res){
 new userModel(req.query).save().then((result)=>{
    res.send({
      code:1,
      mes:'请求成功',
      data:result
    })
  })
})
// 商品列表
router.get('/goods',function(req,res){
  goodsModel.find().then((result)=>{
    res.send({
      code:1,
      mes:'请求成功',
      data:result
    })
  })
})
// 上传图片
var imgUrl=''  //用以存储图片路径的，即将被发给前端
var storage = multer.diskStorage({
    destination: function (req, file, cb) { //指定图片存放路径
        cb(null, './public/images')
    },
    filename: function (req, file, cb) { //为上传的图片资源进行命名
        var orname = file.originalname.split('.')[1]
        var imgname = `${new Date().getTime()}${parseInt(Math.random() * 999)}.${orname}`; //为图片命名，保证名称的唯一性
        imgUrl = '/public/images/' + imgname;  //拼接保存图片路径
        cb(null, imgname)
    }
})

var upload = multer({ storage: storage })
router.post('/imgurl',upload.single('myImg'),function(req,res){
    res.send({
        code:1,
        msg:'上传成功',
        imgUrl
    })
})
// 上传报修信息
router.post('/baoxiu',function(req,res){
  console.log(req.query);
  new goodsModel(req.body).save().then((result)=>{
    res.send({
      code:1,
      mes:'发布成功'
    })
  })
})
// 上传今日故事
router.post('/gushi',function(req,res){
  new newthing(req.body).save().then((result)=>{
    res.send({
      code:1,
      mes:'发布成功'
    })
  })
})
// 获取用户保修信息
router.get('/usermsg',function(req,res){
  let street=req.query.street;
  var city=new RegExp(street)
  goodsModel.find({address:city}).then((reslut)=>{
    console.log(reslut);
    let data=reslut;
    data.reverse();
    res.send({
      code:1,
      data
    })
  })
})
module.exports = router;
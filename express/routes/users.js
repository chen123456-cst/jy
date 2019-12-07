var express = require('express');
var router = express.Router();
var bcrypt=require('bcryptjs')
var jwt = require('jsonwebtoken');
var secret = 'ljljljljasdfa';
const saltRound=10
// 用户列表
var userModel=require('../models/userModel')
// 用户上传列表
var goodsModel=require('../models/goodsModel')


/* GET users listing. */
// 注册接口
router.post('/register', function(req, res) {
  let tel=req.body.tel
  userModel.find({tel:tel}).then((result)=>{
    if(result.length!=0){
      res.send({
        code:0,
        mes:'该手机号已经注册，请直接登录'
      })
      return false
    }
    let password=req.body.password
    bcrypt.hash(password,saltRound,(err,hashword)=>{
      if(!err){
        req.body.password=hashword
        new userModel(
          req.body
        ).save().then((result)=>{
            res.send({
              code:1,
              mes:'成功注册'
            })
        })
      }
    })
  })
});
// 登录接口
router.post('/login',function(req,res){
  let  tel=req.body.tel;
  userModel.find({tel:tel}).then((result)=>{
    if(result.length==0){
      res.send({
        code:0,
        mes:'未注册，请先注册'
      })
      return false
    }
    let hashword=result[0].password
    var data=result[0]
    bcrypt.compare(req.body.password,hashword,(err,data1)=>{
      if(data1){
        let token = jwt.sign({login:true},secret)
        res.send({
          code:1,
          mes:'登录成功',
          token,
          data
        })
      }else{
        res.send({
          code:0,
          mes:'密码错误'
        })
      }
    })
  })
})
// 更改密码
router.post('/update',function(req,res){
  console.log(req.body)
  let tel=req.body.new1.tel
  userModel.find({tel:tel}).then((result)=>{
    if(result.length==0){
      res.send({
        code:0,
        msg:'手机号未注册'
      })
      return false
    }
    let hashword=result[0].password
    bcrypt.compare(req.body.old.password,hashword,(err,data)=>{
      if(data){
      bcrypt.hash(req.body.new1.password,saltRound,(err,hashword1)=>{
        if(!err){
          let tel1={
            tel:req.body.new1.tel
          }
          userModel.update(tel1,{password:hashword1}).then((result)=>{
            res.send({
              code:1,
              mes:'修改成功'
            })
          })
        }
      })
      }else{
        res.send({
          code:0,
          mes:'原密码不正确'
        })
      }
    })
  })
})
// 上传报修
router.get('/baoxiu',function(req,res){
  new goodsModel(req.query).save().then((result)=>{
    res.send({
      code:1,
      mes:'发布成功'
    })
  })
})
// 下发用户数据
router.get('/list',function(req,res){
  console.log(req.query.tel);
 let tel=req.query.tel;
 userModel.find({tel:tel}).then((reslut)=>{
   let data=reslut;
   res.send({
     code:1,
     data
   })
 })
})
//修改用户数据
router.get('/xiugai',function(req,res){
  console.log(req.query)
  userModel.update({_id:req.query._id},req.query).then((result)=>{
    console.log(result);
    let data=result;
    res.send({
      code:1,
      mes:'修改成功',
      data
    })
  })
})
// 用户获取自己保修信息
router.get('/userinfos',function(req,res){
  let tel=req.query.tel;
  goodsModel.find({tel:tel}).then((reslut)=>{
    let data=reslut;
    console.log(data);
    res.send({
      code:1,
      data
    })
  })
})
module.exports = router;

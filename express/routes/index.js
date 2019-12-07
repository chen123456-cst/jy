var express = require('express');
var router = express.Router();
var adminModel=require('../models/adminModel')
var bcrypt=require('bcryptjs')
var jwt = require('jsonwebtoken');
var secret = 'ljljljljasdfa';
const saltRound=10;
const usermodel=require('../models/userModel');
const goodsmodel=require('../models/goodsModel')
/* GET home page. */
// 注册接口
router.post('/register', function(req, res) {
  let tel=req.body.tel
  adminModel.find({tel:tel}).then((result)=>{
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
        new adminModel(
          req.body
        ).save().then((result)=>{
          res.send({
            code:1,
            mes:'注册成功'
          })
        })
      }
    })
  })
});
// 登录接口
router.post('/login',function(req,res){
  let tel=req.body.tel
  adminModel.find({tel:tel}).then((result)=>{
    if(result.length==0){
      res.send({
        code:0,
        mes:'未注册，请先注册'
      })
      return false
    }
    var data=result[0]
    let hashword=result[0].password
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
// 下发全部用户
router.get('/userslist',function(req,res){
  usermodel.find().then((reslut)=>{
    let data=reslut
    res.send({
      code:1,
      data 
    })
  })
})
// 详情页
router.get('/userinfo',function(req,res){
  console.log(req.query);
  let id=req.query.id;
  goodsmodel.find({_id:id}).then((reslut)=>{
    let data=reslut
    res.send({
      code:1,
      data
    })
  })
})
// 修改保修信息
router.get('/update',function(req,res){
  console.log(req.query);
  let {id,num}=req.query;
  goodsmodel.update({_id:id},{num:num}).then((reslut)=>{
    console.log(reslut);
    res.send({
      code:1,
      msg:'修改成功'
    })
  })
})
module.exports = router;

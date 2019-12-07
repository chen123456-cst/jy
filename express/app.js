var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose')
var cors=require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');


var app = express();
app.use(cors())
mongoose.connect('mongodb://localhost:27017',function(err){
   if(!err){
      console.log('启动成功')
   }
})
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(__dirname+ '/public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter)


module.exports = app;

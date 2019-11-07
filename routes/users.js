var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var saltRound = 10;  //盐，加密复杂度
var userModel = require('../models/userModel');

var jwt = require('jsonwebtoken');
var secret = 'afdgrthugng';//服务端密钥，加密解密都要使用同一个


router.get('/regpage', function(req, res, next) {
    let path = __dirname.split('routes')[0];
    res.sendFile(path+'views/reg.html')
});

router.get('/reg', function(req, res, next) {
    let {username,pwd} = req.query;
    userModel.find({username:username}).then((result)=>{
            if(result.length!=0){ //说明用户名已存在
                res.send({
                  code:0,
                  msg:'用户名已存在'
                });
                return false
            }
            bcrypt.hash(pwd,saltRound,(err,hashPwd)=>{
                  if(!err){
                      new userModel({
                        username : username,
                        pwd : hashPwd
                      }).save().then((result)=>{
                        res.send({
                          code:1,
                          msg:'注册成功'
                        });
                      })
                  }
            })
    })
});
router.get('/login', function(req, res, next) {
      let {username,pwd} = req.query;
      userModel.find({username:username}).then((result)=>{
            if(result.length==0){
              res.send({
                code:0,
                msg:'用户不存在'
              });
              return false;
            }
            let hashPwd = result[0].pwd; //获取用户注册时存入数据库的加密密码，返回的result是一个数组对象
            bcrypt.compare(pwd,hashPwd,(err,data)=>{
                if(data){
                  // console.log(req.session)
                  // req.session.login=true;

                  let token = jwt.sign({login:true},secret);//生成token下发给登录成功的用户


                  res.send({
                    code:1,
                    msg:'登录成功',
                    data:token
                  });
                }else{
                  res.send({
                    code:0,
                    msg:'密码错误'
                  });
                }
            })
      })
});
router.get('/cart',function(req,res,next){

  if(req.session.login){
    res.send('我是购物车页面');
  }else{
    res.send('请先登录');
  }

});
router.get('/token/verify',function(req,res,next){

  jwt.verify(req.query.token,secret,(err,data)=>{
    if(!err){
      res.send({
        code:1,
        msg:'token合法'
      })
    }else{
      res.send({
        code:0,
        msg:'token非法，请重新登录'
      })
    }
  })

})
module.exports = router;

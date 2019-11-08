var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// var proxy = require('http-proxy-middleware');   //引⼊入跨域代理理nodejs模块 
var app = express();

// app.use('/test', proxy({  target: 'https://www.yestae.com',}) ); 



app.use(cors());

app.use(session({
    secret:'djaskdksf',//密钥
    cookie: { maxAge: 60 * 1000 * 60 * 24 * 7 },  //cookie的过期时间
    resave: true, //即使session没有被修改，也保存session
    saveUninitialized: true, //无论有没有session cookie，每次都设置session cookie
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

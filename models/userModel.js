var mongoose = require('mongoose'); //引入mongoose模块
var Schema = mongoose.Schema;
var userSchema = new Schema({   //创建表结构对象
    username : String,
    pwd : String
});
var userModel = mongoose.model('userModel',userSchema);//根据表结构生成一个用以操作表的数据模型对象
module.exports=userModel;//对外抛出userModel方法

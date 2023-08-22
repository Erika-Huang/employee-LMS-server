const mongoose = require('mongoose')

/**
 * 用户表
 */
const userSchema = mongoose.Schema({
    "userId" : Number,      //用户ID，自增长
    "userName" : String,    //用户名称
    "userPwd" : String,     //用户密码，md5加密
    "userEmail" : String,   //用户邮箱
    "mobile":String,        //手机号
    "sex":Number,           //性别 0:男 1：女
    "deptId":[],            //部门
    "job":String,           //岗位
    "state" : {             // 1: 在职 2: 离职 3: 试用期
        type:Number,
        default:1  // 默认值为 1
    },
    "role": {               // 用户角色 0：系统管理员 1： 普通用户
        type:Number,
        default:1
    }, 
    "roleList" : [],        //系统角色
    "createTime" : {        //创建时间
        type:Date,
        default:Date.now()
    },
    "lastLoginTime": {      //更新时间
        type:Date,
        default:Date.now()
    },
    remark:String
})

// 定义users、定义配置、关联的集合名称
module.exports = mongoose.model("users",userSchema,"users")
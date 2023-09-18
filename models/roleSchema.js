const mongoose = require('mongoose')

/**
 * 角色表
 */
const roleSchema = mongoose.Schema({
    "roleName": String,
    "remark": String,
    "permissionList": {
        checkedKeys: [],
        halfCheckedKeys: []

    },
    "createTime": {        //创建时间
        type: Date,
        default: Date.now()
    },
    "updateTime": {
        type: Date,
        default: Date.now()
    },
    remark: String
})

// 定义模型名称、定义模型（这个模型会和模型名称相同的复数的数据库建立连接）、关联的数据库集合名称
module.exports = mongoose.model("roles", roleSchema, "roles")
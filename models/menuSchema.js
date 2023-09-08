const mongoose = require('mongoose')

/**
 * 菜单表
 */
const menuSchema = mongoose.Schema({
    menuType: Number,// 菜单类型
    menuName: String,// 菜单名称
    menuCode: String,// 权限标识
    path: String,// 路由地址
    icon: String,// 图标
    component: String,// 组件地址
    menuState: Number,// 菜单状态
    parentId: [mongoose.Types.ObjectId],
    "createTime": {        //创建时间
        type: Date,
        default: Date.now()
    },
    "updateTime": {      //更新时间
        type: Date,
        default: Date.now()
    }
})

// 定义users、定义配置、关联的集合名称
module.exports = mongoose.model("menus", menuSchema, "menus")
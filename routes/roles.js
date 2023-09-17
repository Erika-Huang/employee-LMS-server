/**
 * 用户管理模块
 */
const router = require('koa-router')()
const Role = require('./../models/roleSchema')
const util = require('./../utils/util')
const jwt = require('jsonwebtoken')
const md5 = require('md5')

router.prefix('/roles')  // 二级路由前缀

// 查询所有的角色列表 的名称和id
router.get('/alllist', async (ctx) => {
    try {
        const list = await Role.find({}, "_id roleName")
        ctx.body = util.success(list)
    } catch (error) {
        ctx.body = util.fail(`查询失败:${error.stack}`)
    }
})





module.exports = router

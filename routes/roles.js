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

// 按页获取角色列表
router.get('/list', async (ctx) => {
    const { roleName } = ctx.request.query
    const { page, skipIndex } = util.pager(ctx.request.query)
    try {
        let params = {}
        // 过滤掉空的roleName
        if (roleName) params.roleName = roleName
        const query = Role.find(params)
        const list = await query.skip(skipIndex).limit(page.pageSize)
        const total = await Role.countDocuments(params)
        ctx.body = util.success({
            list,
            page: {
                ...page,
                total
            }
        })
    } catch (error) {
        ctx.body = util.fail(`查询失败：${error.stack}`)
    }
})

// 角色的操作，包括创建、编辑、删除功能
router.post('/operate', async (ctx) => {
    const { _id, roleName, remark, action } = ctx.request.body
    let res, info
    try {
        if (action == 'create') {
            res = await Role.create({ roleName, remark })
            info = "创建成功"
        } else if (action == 'edit') {
            if (_id) {
                let params = { roleName, remark }
                params.update = new Date()
                res = await Role.findByIdAndUpdate(_id, params)
                info = "编辑成功"
            } else {
                ctx.body = util.fail('编辑——缺少参数params: _id')
                return
            }
        } else {
            if (_id) {
                res = await Role.findByIdAndRemove(_id)
                info = "删除成功"
            } else {
                ctx.body = util.fail('删除——缺少参数params: _id')
                return
            }
        }
        ctx.body = util.success(res, info)
    } catch (error) {
        ctx.body = util.fail(`捕捉错误${error.stack}`)
    }
})

// 权限设置
router.post('/update/permission', async (ctx) => {
    // 获取参数
    const { _id, permissionList } = ctx.request.body
    try {
        // 先根据_id来查询到需要更新的id，permissionList 是因为我们roleSchema这个模型里面有一个字段 permissionList
        let params = { permissionList, update: new Date() }
        let res = await Role.findByIdAndUpdate(_id, params)
        ctx.body = util.success(res, '权限设置成功')
    } catch (error) {
        ctx.body = util.fail('权限设置失败', error.stack)
    }
})
module.exports = router

const router = require('koa-router')()
const util = require('./../utils/util')
const Dept = require('./../models/deptSchema')

router.prefix('/dept')

// 部门树形列表
router.get('list', async (ctx) => {
    let { deptName } = ctx.request.query
    let params = {}
    if (deptName) params.deptName = deptName
    let rootList = await deptSchema.find(params)
    ctx.body = util.success(rootList)
})

// 部门操作：创建、编辑、删除

module.exports = router
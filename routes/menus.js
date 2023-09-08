const router = require('koa-router')() // 定义一个 router
const util = require('../utils/util') // 加载util，文本的输出需要用到util工具
const Menu = require('../models/menuSchema')

router.prefix('/menu')
router.post('/operate', async (ctx) => {
    const { _id, action, ...params } = ctx.request.body
    let res, info
    try {
        if (action == 'add') {
            res = await Menu.create(params)
            info = '创建成功'
        } else if (action == 'edit') {
            params.updateTime = new Date()
            res = await Menu.findByIdAndUpdate(_id, params)
            info = '编辑成功'
        } else {
            res = await Menu.findByIdAndRemove(_id)
            Menu.deleteMany = ({ parentId: { $all: [_id] } })
            info = '删除成功'
        }
        ctx.body = util.success('', info)
    } catch (error) {
        ctx.body = util.fail(error.stack)
    }

})

module.exports = router
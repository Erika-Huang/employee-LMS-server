/**
 * 用户管理模块
 */
const router = require('koa-router')()
const User = require('./../models/userSchema')
const util = require('./../utils/util')
const jwt = require('jsonwebtoken')

router.prefix('/users')  // 二级路由前缀

// 用户登录
router.post('/login', async (ctx) => {
  try {
    const { userName, userPwd } = ctx.request.body
    /**
     * 返回数据库指定字段，有三种方式
     * 1. 字符串方式
     *   eg： 'userId userName userEmail state role depId roleList'
     * 2. json方式
     *   eg： {userId:1,_id:0}
     * 3. select('userId)
     */
    const res = await User.findOne({
      userName,
      userPwd
    }, 'userId userName userEmail state role depId roleList')



    if (res) {
      const data = res._doc // 整体加密，返回用户字段

      const token = jwt.sign({
        data,
      }, 'employee-leave-management-system', { expiresIn: '1h' }) //1h过期 1d一天
      data.token = token
      ctx.body = util.success(data)
    } else {
      ctx.body = util.fail('账号或者密码不正确')
    }
  } catch (error) {
    ctx.body = util.fail(error.msg)
  }

})


// 用户列表
router.get('/list', async (ctx) => {
  const { userId, userName, state, } = ctx.request.query
  // 返回分页内容
  const { page, skipIndex } = util.pager(ctx.request.query)
  let params = {}
  if (userId) params.userId = userId
  if (userName) params.userName = userName
  // 0 是所有，所有就是相当于不根据状态查询
  if (state && state != '0') params.state = state
  try {
    // 根据条件查询所有的用户列表
    const query = User.find(params, { _id: 0, userPwd: 0 })
    // skip(skipIndex)从第几条开始查，limit()获取你要查询几条(pageSize  10条) 即限制查询数量
    const list = await query.skip(skipIndex).limit(page.pageSize)
    const total = await User.countDocuments(params) // 统计总条数
    ctx.body = util.success({
      page: {
        ...page,
        total
      },
      list
    })
  } catch (error) {
    ctx.body = util.fail(`查询异常:${error.stack}`)
  }
})

// 用户删除/批量删除
router.post('/delete', async (ctx) => {
  // 待删除用户Id数组
  const { userIds } = ctx.request.body
  // User.updateMany({ $or: ({ userId: 10001 }, { userId: 10002 }) })
  const res = await User.updateMany({ userId: { $in: userIds } }, { state: 2 }) // 改为离职状态，软删除
  if (res.nModified) {
    ctx.body = util.success(res, `共删除成功${res.nModified}条`)
    return;
  }
  ctx.body = util.fail('删除失败')
})

module.exports = router

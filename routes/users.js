/**
 * 用户管理模块
 */
const router = require('koa-router')()
const User = require('./../models/userSchema')
const util = require('./../utils/util')
const jwt = require('jsonwebtoken')
router.prefix('/users')  // 二级路由前缀

router.post('/login',async (ctx)=> {
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
    },'userId userName userEmail state role depId roleList')

    const data = res._doc

    const token = jwt.sign({
      data,
    },'employee-leave-management-system',{ expiresIn: '1h'})
    
    if(res) {
      data.token = token
      ctx.body = util.success(data)
    }else {
      ctx.body = util.fail('账号或者密码不正确')
    }
  } catch (error) {
    ctx.body = util.fail(error.msg)
  }
  
})


module.exports = router

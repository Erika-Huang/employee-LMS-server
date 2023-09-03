const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const log4js = require('./utils/log4j')
const users = require('./routes/users')
const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const koajwt = require('koa-jwt')
const util = require('./utils/util')

// error handler
onerror(app)

require('./config/db')

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger ctx上下文对象 next处理完之后执行next
// 中间件的执行优先于接口
// 例如登录的时候一定会先加载中间件，先获取参数，然后执行next，如果没有中间件才执行登录接口
app.use(async (ctx, next) => {
  log4js.info(`post params:${JSON.stringify(ctx.request.query)}`)
  log4js.info(`get params:${JSON.stringify(ctx.request.body)}`)
  await next().catch((err)=>{
    if(err.status == '401') { // koa-jwt把500报错改为401
      ctx.status = 200
      ctx.body = util.fail('Token认证失败',util.CODE.AUTH_ERROR) // 接口业务码
    }else{
      throw err
    }
  })
})

// 任何一个接口进来都会先经过这个过滤一遍，来校验token是否有效
// koa-jwt本身是基于jsonwebtoken做一层拦截，decoded
app.use(koajwt({
  secret:'employee-leave-management-system'
}).unless({
  path:[/^\/api\/users\/login/] // 过滤掉登录接口，不需要验证token
})) // 401

// routes
router.prefix('/api')

router.get('/leave/count',(ctx)=> {
  console.log('=>', ctx.request.headers);
  const token = ctx.request.headers.authorization.split(' ')[1]
  // 验证，解密数据
  const payload = jwt.verify(token, 'employee-leave-management-system')
  ctx.body = payload
})

router.use(users.routes(),users.allowedMethods())
app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  // console.error('server error', err, ctx)
  log4js.error(`${err.stack}`)
});

module.exports = app

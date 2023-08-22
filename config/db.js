/**
 * 数据库连接
 */
const mongoose = require('mongoose');
const config = require('./index')
const log4js = require("./../utils/log4j")

// 要处理初始连接错误
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(config.URL)

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  
}

// 要在建立初始连接后处理错误，应该侦听连接上的错误事件，但是仍然需要处理初始连接错误。
const db = mongoose.connection

db.on('error',()=> {
    log4js.error('***数据库连接失败***')
})

db.on('open',()=> {
    log4js.info('***数据库连接成功***')
})


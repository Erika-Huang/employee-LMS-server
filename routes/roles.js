/**
 * 用户管理模块
 */
const router = require('koa-router')()
const Role = require('./../models/roleSchema')
const util = require('./../utils/util')
const jwt = require('jsonwebtoken')
const md5 = require('md5')

router.prefix('/roles')  // 二级路由前缀






module.exports = router

const jwt = require('koa-jwt')

const Router = require('koa-router')

const router = new Router({ prefix: '/topics' })

const TopicCtl = require('../controllers/topics')

// 引入秘钥
const { secret } = require('../config')



// 使用koa-jwt 进行用户认证
const auth = jwt({ secret })

// 查所有
router.get('/', TopicCtl.find)

// 新建
router.post('/', auth, TopicCtl.create)

// 查单个
router.get('/:id', TopicCtl.findById)

// 修改(部分修改)
router.patch('/:id', auth, TopicCtl.update)

// 删除一个


module.exports = router
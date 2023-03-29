
// const jsonwebtoken = require('jsonwebtoken')
// koa-jwt 内置了jsonwebtoken包，里面实现了丰富的功能，我们只需实用就行。
const jwt = require('koa-jwt')

const Router = require('koa-router')

const router = new Router({ prefix: '/users' })

const UserCtl = require('../controllers/users')

// 引入秘钥
const { secret } = require('../config')

// // 自定义认证的中间件（拿到并验证token）
// const auth = async (ctx, next) => {
//     const { authorization } = ctx.request.header
//     const token = authorization.replace('Bearer ', '')
//     try {
//         // jsonwebtoken.verify 这个方法如果不通过会自动报错
//         const user = jsonwebtoken.verify(token, secret)
//         ctx.state.user = user
//     } catch (error) {
//         ctx.throw(401, err.message)
//     }
//     await next()
// }

// 使用koa-jwt 进行用户认证
const auth = jwt({ secret })

// 查所有
router.get('/', UserCtl.find)

// 新建
router.post('/', UserCtl.create)

// 查单个
router.get('/:id', UserCtl.findById)

// 修改(部分修改)
router.patch('/:id', auth, UserCtl.checkOwner, UserCtl.update)

// 删除一个
router.delete('/:id', auth, UserCtl.checkOwner, UserCtl.delete)

// 登陆
router.post('/login', UserCtl.login)

// 获取关注列表
router.get('/:id/following', UserCtl.listFollowing)

// 关注某人
router.put('/following/:id', auth, UserCtl.checkUserExist, UserCtl.follow)

// 取消关注某人
router.delete('/following/:id', auth, UserCtl.checkUserExist, UserCtl.unfollow)

// 获取粉丝列表
router.get('/:id/followers', UserCtl.listFollowers)

module.exports = router

const Router = require('koa-router')

const router = new Router({prefix:'/users'})

const UserCtl = require('../controllers/user')

// 查所有
router.get('/',UserCtl.find)

// 新建
router.post('/',UserCtl.create)

// 查单个
router.get('/:id',UserCtl.findById)

// 修改(部分修改)
router.patch('/:id',UserCtl.update)

// 删除一个
router.delete('/:id',UserCtl.delete)


module.exports = router
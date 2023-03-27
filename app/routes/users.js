
const Router = require('koa-router')

const router = new Router({prefix:'/users'})

router.get('/',(ctx)=>{
    ctx.body = db;
})

router.post('/',(ctx)=>{
    // ctx.body = db;
})

router.get('/:id',(ctx)=>{
    // ctx.body = db;
})

router.delete('/:id',(ctx)=>{
    // ctx.body = db;
})



module.exports = router
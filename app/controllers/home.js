class HomCtl {
    index(ctx){
        ctx.body = '<h1>这是主页</h1>'
    }
}

module.exports = new HomCtl()
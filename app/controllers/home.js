const path = require('path')

class HomCtl {
    index(ctx) {
        ctx.body = '<h1>这是主页</h1>'
    }
    upload(ctx) {
        const file = ctx.request.files.file
        // basename指的是文件名加上拓展名
        const basename = path.basename(file.filepath)
        ctx.body = { url: `${ctx.origin}/uploads/${basename}` };
    }
}

module.exports = new HomCtl()


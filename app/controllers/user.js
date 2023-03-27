const User = require('../models/users')

class UserCtl {
    // 获取用户列表
    async find(ctx){
        console.log('11111')
        ctx.body = await User.find();
    }
    // 获取指定用户
    async findById(ctx){
        console.log('ctx.params.id',ctx.params.id)
        const user = await User.findById(ctx.params.id);
        if(!user){
            ctx.throw(404,'用户不存在')
        }
        ctx.body = user;
    }
    // 新建用户
    async create(ctx){
        const user = await new User(ctx.request.body).save()
        ctx.body = user
    }
    // 更新接口
    async update(ctx){
        console.log('222222')
        const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
        if (!user){
            ctx.throw(404)
        }
        ctx.body = user
    }
    // 删除接口
    async delete(ctx){
        const user = await User.findByIdAndRemove(ctx.params.id)
        if (!user){
            ctx.throw(404)
        }
        ctx.status = 204
    }
}

module.exports = new UserCtl()



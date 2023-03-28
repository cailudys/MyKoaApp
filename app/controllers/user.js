const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/users')
const { secret } = require('../config')

class UserCtl {
    // 获取用户列表逻辑
    async find(ctx) {
        ctx.body = await User.find();
    }
    // 获取指定用户逻辑
    async findById(ctx) {
        const user = await User.findById(ctx.params.id);
        if (!user) {
            ctx.throw(404, '用户不存在')
        }
        ctx.body = user;
    }
    // 新建用户逻辑
    async create(ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: true },
            password: { type: 'string', required: true }
        })
        const { name } = ctx.request.body
        const repeatedUser = await User.findOne({ name })
        if (repeatedUser) { ctx.throw(409, '用户名已存在') }
        const user = await new User(ctx.request.body).save()
        ctx.body = user
    }

    // 授权逻辑
    async checkOwner(ctx, next) {
        if (ctx.params.id !== ctx.state.user.__id) { ctx.throw(403, '没有权限') }
        await next();
    }

    // 更新逻辑
    async update(ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: false },
            password: { type: 'string', required: false },
            gender:  { type: 'string', required: false },
            headline:  { type: 'string', required: false },
            location:  { type: 'array', itemType: 'string', required: false },
            business:  { type: 'string', required: false },
            employments:  { type: 'array', itemType: 'object', required: false },
            educations:  { type: 'array', itemType: 'object', required: false },
        })
        const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
        if (!user) {
            ctx.throw(404)
        }
        ctx.body = user
    }
    // 删除逻辑
    async delete(ctx) {
        const user = await User.findByIdAndRemove(ctx.params.id)
        if (!user) {
            ctx.throw(404)
        }
        ctx.status = 204
    }
    // 登陆逻辑
    async login(ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: true },
            password: { type: 'string', required: true }
        })
        const user = await User.findOne(ctx.request.body)
        if (!user) { ctx.throw(401, '用户名或密码不正确') }
        const { __id, name } = user;
        const token = jsonwebtoken.sign({ __id, name }, secret, { expiresIn: '1d' })
        ctx.body = { token }
    }

}

module.exports = new UserCtl()



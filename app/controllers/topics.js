const Topic = require('../models/topics')

class TopicCtl {
    // 获取话题列表
    async find(ctx) {
        ctx.body = await Topic.find();
    }

    // 获取特定话题
    async findById(ctx) {
        const { fields = '' } = ctx.query
        const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('')
        const topic = await Topic.findById(ctx.params.id).select(selectFields)
        ctx.body = topic
    }
    // 创建一个话题
    async create(ctx) {
        // 这个接口有请求体，说以后端要校验请求体。（没有请求体的接口则不用校验！）
        ctx.varifyParams({
            name: { type: 'string', required: false },
            avatar_url: { type: 'string', required: false },
            introduction: { type: 'string', required: false },
        })
        const topic = await new Topic(ctx.request.body).save()
        ctx.body = topic
    }
    // 修改话题
    async update(ctx) {
        // 这个接口有请求体，说以后端要校验请求体。（没有请求体的接口则不用校验！）
        ctx.varifyParams({
            name: { type: 'string', required: true },
            avatar_url: { type: 'string', required: false },
            introduction: { type: 'string', required: false },
        })
        const topic = await Topic.findByIdAndUpdate(ctx.params.id,ctx.request.body)
        ctx.body = topic
    }
}

module.exports = new TopicCtl()



const Topic = require('../models/topics')


class TopicCtl {
    // 获取话题列表
    async find(ctx) {
        const { per_page = 10 } = ctx.query
        const page = Math.max(ctx.query.page * 1, 1) - 1;
        const perPage = Math.max(per_page * 1, 1);
        ctx.body = await Topic
        .find({name: new RegExp(ctx.query.q)})
        .limit(perPage).skip(perPage * page)
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
        const topic = await Topic.findByIdAndUpdate(ctx.params.id, ctx.request.body)
        ctx.body = topic
    }
    // 检测话题是否存在
    async checkTopicExist(ctx, next) {
        const topic = await Topic.findById(ctx.params.id);
        if (!topic) { ctx.throw(404, "话题不存在") }
        await next();
    }

}

module.exports = new TopicCtl()



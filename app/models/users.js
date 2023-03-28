const mongoose = require('mongoose')

// Schema 是一个类 ； model 是一个方法，返回一个类
const { Schema, model } = mongoose

// 创建schema的作用是什么？
const userSchema = new Schema({
    __v: { type: Number, select: false },
    name: { type: String, required: true },
    password: { type: String, required: true, select: false },
    // 图像存到数据库里的是图像的url
    avatar_url: { type: String },
    gender: { type: String, enum: ['male', 'female'], default: 'male', required: true },
    headline: { type: String },
    location: { type: [{ type: String }], select: false },
    business: { type: String, select: false },
    employments: {
        type: [
            {
                company: { type: String },
                job: { type: String }
            }
        ],
        select: false
    },
    educations: {
        type: [{
            school: { type: String },
            major: { type: String },
            diploma: { type: Number, enum: [1, 2, 3, 4, 5] },
            entrance_year: { type: Number },
            graduation_year: { type: Number },
        }],
        select: false
    },
    following: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        select: false
    }

})



// 利用schema创建用户模型,返回的 
module.exports = model('User', userSchema)
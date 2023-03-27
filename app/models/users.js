const mongoose = require('mongoose')

// Schema 是一个类 ； model 是一个方法，返回一个类
const { Schema, model } = mongoose

// 创建schema的作用是什么？
const userSchema = new Schema({
    __v: { type: Number, select: false },
    name: { type: String, required: true },
    password: { type: String, required: true, select: false }
})

// 利用schema创建用户模型,返回的
module.exports = model('User', userSchema)
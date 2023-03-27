const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose')
const {connectionStr} = require('./config')

const connect = async () => {
  try {
    await mongoose.connect(connectionStr,{
      useNewUrlParser: true,
      // useUnifiedTopology: true
    });
    console.log('MongoDB connection successful');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

connect();

mongoose.connection.on('error',console.error)

// 配置中间件
app.use(async (ctx, next) => { 
    ctx.body = 'Hello Zhihu API'
});

  

// 配置路由
app.use(async (ctx) => {
  ctx.body = 'Hello, Koa!';
});  

// 启动应用
// app.listen() 方法是 Koa 应用对象的方法之一，用于启动一个 HTTP 服务器，开始监听指定的端口，等待客户端请求。
app.listen(3000, () => {
  console.log('Koa 应用启动成功，监听端口 3000');
});
const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose')
const { connectionStr } = require('./config')
const { koaBody } = require('koa-body');
const  koaStatic  = require('koa-static');
const parameter = require('koa-parameter');
const path = require('path')

// 连接数据库
const connect = async () => {
  try {
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      // useUnifiedTopology: true
    });
    console.log('MongoDB connection successful');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

connect();

mongoose.connection.on('error', console.error)

// koa-static 注册
app.use(koaStatic(path.join(__dirname, 'public')))

// 使用 koa-Body 中间件
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '/public/uploads'),
    keepExtensions: true
  }
}));
// 使用 koa-parameter 中间件
app.use(parameter(app));

const routing = require('./routes')

// 导入所有的路由！
routing(app);




// 启动应用
// app.listen() 方法是 Koa 应用对象的方法之一，用于启动一个 HTTP 服务器，开始监听指定的端口，等待客户端请求。
app.listen(3000, () => {
  console.log('Koa 应用启动成功，监听端口 3000');
});
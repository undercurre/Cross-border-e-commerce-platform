// 工具
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
// 路由信息加载
var customersRouter = require('./routes/customers');
var loginRouter = require('./routes/login');
var userRouter = require('./routes/user');
var orderRouter = require('./routes/orders');
var commonsRouter = require('./routes/commons');
var rateRouter = require('./routes/rate');
var goodRouter = require('./routes/goods')
var supportRouter = require('./routes/support')
var storeRouter = require('./routes/store')
var factoryRouter = require('./routes/factory')
var upload = require('./routes/upload')

var app = express();

//设置跨域访问
app.use(cors());
// 静态目录
app.use('/static',express.static('static'));
// view engine setup 视图引擎初始化
app.set('views', path.join(__dirname, 'views'));//定义目录
app.set('view engine', 'jade');//定义文件后缀
// 中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 路由配置
app.use('/customers', customersRouter);
app.use('/', loginRouter);
app.use('/user', userRouter);
app.use('/message', commonsRouter);
app.use('/orders', orderRouter)
app.use('/rate', rateRouter);
app.use('/supports', supportRouter)
app.use('/goods', goodRouter);
app.use('/store', storeRouter)
app.use('/factory', factoryRouter)
app.use('/upload', upload)
// catch 404 and forward to error handler 错误处理
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/article');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session 中间件配置
app.use(session({
	secret: 'wanghailun project',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 1000 * 60 * 5 } // 5分钟内有效
}))
// 登录拦截
// 此方法不知为何不被调用，有些文章建议这个app.all('/*',function())也无效
// 找到了解决方法：再次强调，此部分必须放在静态资源声明之后，路由导航之前。
app.get('*', function(req, res, next) {
	var username = req.session.username
	var path = req.path
	if (path != '/login' && path != '/regist') { // 登录注册页面不拦截
		if (!username) {
			return res.redirect('/login')
		}
	}
	next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/article', articleRouter);

// catch 404 and forward to error handler
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

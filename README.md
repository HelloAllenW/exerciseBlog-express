# Express 项目
1. 基于 express + MongoDB 的练习项目，实现了注册登录、发布删除文章等功能。
2. 启动项目前需安装和初始化MongoDB

# 项目开发笔记
## Express 项目初始化
1. 通过Express应用程序生成器搭建工程：
	```npm install express-generator -g```
2. 初始化工程：
	```express -e 工程名（-e代表采用ejs模板）```
3. 在项目根目录下对初始化模块进行安装：
	```npm install```
4. 实现无需重启项目就能实现实时更新：
	``` 
	npm install nodemon -g 
	// 然后需要修改package.json中"start":"nodemon ./bin/www" 
	```
5. 启动项目：
	```npm start```
	
## MongoDB 安装与初始化
1. 去官网下载安装;
2. 配置环境变量：在系统变量path下配置MongoDB安装目录的bin目录;
3. 在终端输入mongo验证是否安装配置成功;
4. 新建一个存放数据库的文件夹（不能有中文和空格）;
5. 启动MongoDB服务（path后为第4步创建的文件夹）:
	```mongod --dbpath D:\MongoDataBase```
6. 新打开终端页面输入 mongo 连接本地MongoDB数据库;
7. show dbs 查看;
8. 创建数据库及表：
	```
	use project
	db.createCollection("users")
	show collections
	db.users.insertOne({name: 'wanghailun'})
	db.users.find()
	```

## 连接数据库
1. 项目中安装mongodb模块：
	```npm install mongodb --save```
2. 连接：
```
var MongoClient = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017'
var dbName = 'project'

// 数据库的连接方法封装
function connect(callback) {
	MongoClient.connect(url, function(err, client) {
		if (err) {
			console.log('数据库连接错误', err)
		} else {
			var db = client.db(dbName)
			callback && callback(db)
			client.close()
		}
	})
}

module.exports = {
	connect
}
```

## 注册登录接口
> 登录成功后需要将用户登录信息保存起来，在指定的一段时间内就不用再次登录。此功能需要用到session
1. ```npm install express-session -S```
2. 在app.js中配置session：
```
	var session = require('express-session')
	// 中间件配置
	app.use(session({
		secret: 'wanghailun project',
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 1000 * 60 * 5 } // 5分钟内有效
	}))
```
3. 登录成功处使用：
	```req.session.username = data.username```
4. 在app.js中做登录拦截：
```
	app.get('*', function(req, res, next) {
		var username = req.session.username
		var path = req.path
		if (path != '/login' && path != '/regist') { // 登录注册页面不拦截
			if (!username) {
				res.redirect('/login')
			}
		}
	})
```
## 发布文章
> 使用了 xhEditor 工具模块
1. 下载；
2. 引入三个jquer文件:
```
	<script type="text/javascript" src="/xheditor-1.1.14/jquery/jquery-1.4.4.min.js"></script>
	<script type="text/javascript" src="/xheditor-1.1.14/xheditor-1.1.14-en.min.js"></script>
	<script type="text/javascript" src="/xheditor-1.1.14/xheditor-1.1.14-zh-cn.min.js"></script>
```
3. 初始化:
```
	<script>
		$('.xheditor').xheditor({
			 tools:'full',
			 skin:'default'
		})
	</script>
```
4. 在textarea中引入class='xheditor':
可参考(https://blog.csdn.net/qq_39021393/article/details/81212082)

## 文章列表
> 时间转换插件：npm install moment -S

## 富文本中图片上传
> 需要使用一个文件上传格式的插件
1. 安装：
```npm install multiparty -S```
2. 引入：
```var multiparty = require('multiparty')```
3. 实例化：
```var form = new multiparty.Form()```

## EJS模板引擎
```npm install ejs --save```
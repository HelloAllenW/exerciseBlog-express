var MongoClient = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017'
var dbName = 'project'

// 数据库的连接方法封装
/* 报错：DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed 
in a future version. To use the new Server Discover and Monitoring engine, pass option 
{ useUnifiedTopology: true } to the MongoClient constructor.

解决方法：{ useNewUrlParser: true, useUnifiedTopology: true }
但是会出MongoError: Cannot use a session that has ended问题，因此我暂时删掉了
*/
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
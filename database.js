/*
*	Provides utilities to communicate with the database
*/

var mysql = new require('./libs/mysql/index.js').Client(require("./settings.js").database);

var createCallback = function(cb){
	return function(err, results, fields){
    	if(err){ throw err; }
    	if(cb){
    		cb(results);
    	}
    };
};

mysql.connect();

exports.shortURL = function(shorturl, cb){
	mysql.query("SELECT blog.id as blogid, art.id as artid, art.urlfragment FROM "
		+"( SELECT article.id, article.urlfragment FROM article WHERE article.id =  ?) "
		+"AS art INNER JOIN rel_blog_article ON art.id = rel_blog_article.artid "
		+"INNER JOIN blog ON rel_blog_article.blogid = blog.id", 
	[shorturl], createCallback(cb));
};

exports.getArticle = function(id, cb){
	mysql.query("SELECT a.*, b.id blogid, b.title blogtitle, b.subtitle "
				+"FROM article a "
				+"INNER JOIN rel_blog_article ba ON (a.id = ? AND a.id = ba.artid) "
				+"INNER JOIN blog b ON (ba.blogid = b.id);",
				[id], createCallback(cb));
};

exports.getBlogArticlesById = function(id, from, to, cb){
	mysql.query("SELECT a.*, b.id blogid, b.title blogtitle, b.subtitle "
				+"FROM article a "
				+"INNER JOIN rel_blog_article ba ON (a.id = ba.artid AND ba.blogid = ?) "
				+"INNER JOIN blog b ON (ba.blogid = b.id) "
				+"ORDER BY a.created DESC "
				+"LIMIT ?, ?;", [id, from, to], createCallback(cb));
}

exports.getPanel = function(userid, from, to, cb){
	mysql.query(
		"SELECT owner.id userid, owner.username, b.title blogtitle, "
		+"b.id blogid, a.arttype, a.id articleid, a.title, a.created, a.text "
		+"FROM (SELECT * FROM user WHERE user.id = ?) as u "
		+"INNER JOIN rel_user_blog ub ON u.id = ub.userid "
		+"INNER JOIN blog b ON ub.blogid = b.id "
		+"INNER JOIN rel_blog_article ba ON b.id = ba.blogid "
		+"INNER JOIN article a ON a.id = ba.artid "
		+"INNER JOIN rel_user_blog ubowner ON (b.id = ubowner.blogid AND ubowner.owned = 1) "
		+"INNER JOIN user owner ON ubowner.userid = owner.id "
		+"ORDER BY a.created DESC "
		+"LIMIT ?, ?;", 
			[userid,from,to],createCallback(cb));
}


// userid ist noch nicht implementiert -> ER-Modell-Frage: Normalform #morgen
exports.newArticle = function(content, title, arttype, urlfrag, userid, blogid, cb){

	// die mysql libs kann keine mehreren statements bei denen results zurückkommen.
	// allerdings ist die gesuchte id unter data.insertId im cb zu erreichen :)
	mysql.query(
		"INSERT INTO article"
		+"(text,title,arttype,urlfragment,created,lastchange)"
		+"VALUES(?, ?, ?, ?, NOW(), NOW());",
		[content, title, arttype, urlfrag],
		createCallback(function(data){
			mysql.query(
				"INSERT INTO rel_blog_article"
				+"(blogid, artid)"
				+"VALUES(?, ?);",
				[blogid, data.insertId],
				createCallback(cb)
			);
		})
	);
}

exports.saveArticle = function(artid, content, title, arttype, urlfrag, blogid, cb){ // works.
	mysql.query(
		"UPDATE article SET "
		+"text = ?, title = ?, arttype = ?, urlfragment = ?, lastchange = NOW() "
		+"WHERE id = ?;"
		+"UPDATE rel_blog_article SET "
		+"blogid = ? "
		+"WHERE artid = ?;",
		[content, title, arttype, urlfrag, artid, blogid, artid],
		createCallback(cb)
	);
}

exports.deleteArticle = function(artid, userid, cb){ // works.
	mysql.query(
		"SELECT a.id artid, u.id userid "
		+"FROM article a "
		+"INNER JOIN rel_blog_article ba ON (a.id = ? AND a.id = ba.artid) "
		+"INNER JOIN blog b ON ba.blogid = b.id "
		+"INNER JOIN rel_user_blog ub ON (b.id = ub.blogid AND ub.owned = 1) "
		+"INNER JOIN user u ON ub.userid = u.id;",
		[artid], createCallback(function(data){
			if( (data != null) &&
				(data.length > 0) &&
				(data[0].artid == artid) && 
				(data[0].userid == userid)) {
				
				mysql.query(
					"DELETE FROM article "
					+"WHERE id = ?;"
					+"DELETE FROM rel_blog_article "
					+"WHERE artid = ?;",
					[artid, artid],
					createCallback(cb)
				);
			} else {
				console.log(data.length+"|"+userid+":"+artid+" called: "+JSON.stringify(data));
				cb([]);
			}
		})
	);
}

exports.follow = function(blogid, userid, cb){ // works.
	mysql.query(
		"INSERT INTO rel_user_blog "
		+"(blogid, userid) "
		+"VALUES(?, ?);",
		[blogid, userid],
		createCallback(cb)
	);
}

exports.unfollow = function(blogid, userid, cb){ // works
	mysql.query(
		"DELETE FROM rel_user_blog "
		+"WHERE (blogid = ? AND userid = ?);",
		[blogid, userid],
		createCallback(cb)
	);
}

exports.doesFollow = function(blogid, userid, cb){
	mysql.query(
		"SELECT ub.* FROM (SELECT * FROM rel_user_blog rub WHERE rub.blogid = ? "
		+"AND rub.userid = ? ) "
		+"AS ub INNER JOIN user u ON "
		+"ub.userid = u.id;",
		[blogid, userid],
		createCallback(cb)
	);
}

exports.createAccount = function(username, password, email, cb){ // works.
	mysql.query(
		"INSERT INTO user"
		+"(username, password, email)"
		+"VALUES(?, MD5(?), ?);",
		[username, password, email],
		createCallback(function(user){;
			mysql.query(
				"INSERT INTO blog"
				+"(title, subtitle)"
				+"VALUES(?, 'This is your first nog.');",
				[username],
				createCallback(function(blog){
					mysql.query(
						"INSERT INTO rel_user_blog"
						+"(userid, blogid, owned)"
						+"VALUES(?, ?, '1');",
						[user.insertId, blog.insertId],
						createCallback(function(data){
							var tutorial = "";
							exports.newArticle(tutorial, 'Tutorial', 0, 'tutorial', user.insertId, blog.insertId);
							cb(user.insertId);
						})
					);
				})
			);
		})
	);
}

exports.verifyCredentials = function(username, password, cb){
	mysql.query("SELECT * FROM user WHERE username = ? AND password = MD5(?)", [username, password], createCallback(cb));
}

exports.getUserBlogs = function(userid, cb){
	mysql.query(
		"SELECT b.id blogid, b.title blogtitle "
		+"FROM rel_user_blog ub "
		+"INNER JOIN blog b ON "
			+"(ub.userid = ? AND "
			+"ub.blogid = b.id AND "
			+"ub.owned = '1');",
		[userid], createCallback(cb));
}

//-- test
// this.newArticle("fuu", "arr", 0, "fuar", 1, 1, function(data){});
// this.saveArticle(16, "foo", "bar", 0, "yeah", 2, function(data){});
// this.deleteArticle(25, 1, function(data){console.log(JSON.stringify(data));});
// this.follow(11,5, function(data){});
// this.unfollow(11,5, function(data){});
// this.createAccount("en","foobar",function(data){});
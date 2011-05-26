var db = require("../database.js"),
	jqtmpl = require("../libs/jqtpl.js"),
	qs = require("querystring"),
	asset = require("./assets"),
	shorturl = require("./shorturl"),
	settings = require("../settings.js"),
	newpost, panelTemplate;

asset.getAsset("/templates/panel.html", function(data){
	panelTemplate = jqtmpl.template("panel", data);
});
asset.getAsset("/templates/newpost.html", function(data){
	newpost = jqtmpl.template("newpost", data);;
});

exports.handleReq = function(request, response, pathParts){
	if(!request.session.data.userid){
		response.writeHead(302, { 'Location': '/login'});
		response.end();
		return;
	}
	if(request.method === "POST"){
		//parse querystring
		var body = "";
		request.on("data", function (data) { body += data; });
		request.on("end", function () {
			var query = qs.parse(body);
			
			if(pathParts[1] === "delete"){
				db.deleteArticle(pathParts[2], request.session.data.userid, function(){
					response.writeHead(302, {'Location': "/panel"});
					response.end();
				}); return;
			}
			function cb(data){
				/*
				response.writeHead(302, {
					'Location': "/b/id:" + query.blog + "/" + data.insertId + "/" 
					  + query.urlfragment
				}); */
				
				response.writeHead(302, {
					'Location': "/panel"
				});

				response.end();
			}
			if(pathParts[1] === "create"){
				db.newArticle(query.description, query.title, 
					query.posttype, query.urlfragment, request.session.data.userid,
					query.blog, cb); return;
			}
			if(pathParts[1] === "update"){
				db.saveArticle(pathParts[2], query.description, query.title,
				  query.posttype, query.urlfragment, query.blog, cb); 
				return;
			}
		});
		return;
	}
	if(pathParts[1] === "new" || pathParts[1] === "edit"){
		db.getUserBlogs(request.session.data.userid, function(data){
			if(pathParts[1] === "new"){
				response.writeHead(200);
				response.end(jqtmpl.tmpl(newpost, {
					"isnew":1,
					"_userid":request.session.data.userid,
					"username":request.session.data.username,
					"posttype":pathParts[2],
					"redirurl":"create",
					"blogs" : data
				}));
				return;
			}
			if(pathParts[1] === "edit"){
				db.getArticle(pathParts[2], function(data){
					if(!data){
						response.writeHead(404); response.end(); return;
					}
					
					var posttype;
					if(pathParts[3] && !isNaN(pathParts[3])) posttype = pathParts[3];
					else posttype = data[0].arttype;
					
					response.writeHead(200);
					response.end(jqtmpl.tmpl(newpost, {
						"isnew":0,
						"_userid":request.session.data.userid,
						"username":request.session.data.username,
						"posttype":posttype,
						"title" : data[0].title,
						"description" : data[0].text,
						"urlfragment" : data[0].urlfragment,
						"redirurl" : "update/" + data[0].id,
						"blogs" : data
					}));
				});
			}
		});
		return;
	}
	var from = 0, to = 10;
	if(pathParts[1] === "page" & !isNaN(parseInt(pathParts[2]))){
		to = 10 * parseInt(pathParts[2]);
		rom = to- 10;
	}
	db.getPanel(request.session.data.userid, from, to, function(data){
		response.writeHead(200, {"ContentType": "text/html"});
		response.end(jqtmpl.tmpl(panelTemplate, {
			"_userid":request.session.data.userid,
			"username":request.session.data.username,
			"posts":data
		}));
	});
	
}
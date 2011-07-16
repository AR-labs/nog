var db = require("../database.js"),
	jqtmpl = require("../libs/jqtpl.js"),
	assets = require("./assets"),
	defaultTemplate;

require("./assets").getAsset("/templates/defaulttheme.html", function(data){
	defaultTemplate = jqtmpl.template("default", data);
});

exports.handleReq = function(request, response, pathParts){
	var baseURL = ["", pathParts[0], pathParts[1], ""].join("/");
	//get template
	if(pathParts[2] && pathParts[2] !== "page"){
		//article
		db.getArticle(pathParts[2], function(data){
			if(!data.length){
				assets.show404(response); return;
			}
			response.writeHeader(200, {"Content-Type": "text/html"});
			response.end(jqtmpl.tmpl(defaultTemplate,{
				"baseurl" : baseURL,
				"blogtitle" : data[0].blogtitle,
				"blogid" : data[0].blogid,
				"subtitle" : data[0].subtitle,
				"data" : data
		}))});
		return;
	}
	
	//blog
	var from = 0, 
		to = 10,
		blogid;
	if(pathParts[2] === "page"){
		var m = parseInt(pathParts[3], 10);
		if(!isNaN(m)){
			to = 10 * m;
			from = to - 10;
		}
		else{
			assets.show404(response); return;
		}
	}
	if(pathParts[1] && pathParts[1].indexOf("id:") === 0){
		db.getBlogArticlesById(blogid = pathParts[1].substring(3), 
			from, to, function(data){
			if(!data.length){
				response.writeHead(404, {"Content-Type": "text/html"});
				response.end("Nothing to show!"); return;
			}
			response.writeHead(200, {"Content-Type": "text/html"});
			response.end(jqtmpl.tmpl(defaultTemplate,{
				// "username" : 
				"baseurl" : baseURL,
				"blogtitle" : data[0].blogtitle,
				"blogid" : data[0].blogid,
				"subtitle" : data[0].subtitle,
				"page" : to / 10,
				"data" : data
			}));
		});
	}
	else{
		assets.show404(response);
	}
};
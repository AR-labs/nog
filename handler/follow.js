var db = require("../database"),
	assets = require("./assets"),
	uniquesDB = [],
	qs = require("querystring"),
	jqtmpl = require("../libs/jqtpl.js"),
	followTemplate;

assets.getAsset("/templates/follow.html", function(data){
	followTemplate = jqtmpl.template("followTemplate", data);
});

exports.handleReq = function(request, response, pathParts){
	if(!request.session.data.userid){
		response.end(); return;
	}
	if(request.method === "POST"){
		//parse querystring
		var body = "";
		request.on("data", function (data) { body += data; });
		request.on("end", function () {
			var query = qs.parse(body),
			give200 = function(){response.writeHead(200); response.end("done");};
			if(!uniquesDB[query.unique]){
				assets.show404(response); return;
			}
			if(query.what === "follow"){
				db.follow(query.who, request.session.data.userid, give200);
			}
			if(query.what === "unfollow"){
				db.unfollow(query.who, request.session.data.userid, give200);
			}
		});
		return;
	}
	if(!pathParts[1]){
		assets.show404(response); return;
	}
	db.doesFollow(pathParts[1], request.session.data.userid, function(data){
		if(data.length && data[0].owned === 1){
			response.writeHead(200); response.end(); return;
		}
		var key = Math.floor(Math.random() * 1e8);
		uniquesDB[key] = true;
		setTimeout(function(){
			uniquesDB[key] = undefined;
		}, 36e4);
		response.writeHead(200);
		response.end(jqtmpl.tmpl(followTemplate, {
		    "unique":key,
		    "what": data.length === 0 ? "follow" : "unfollow",
		    "who" : pathParts[1]
		}));
	});
}
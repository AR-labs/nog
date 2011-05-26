var http = require("http"),
	url = require("url"),
	session = require('./libs/session.js/core').magicSession(),
	settings = require('./settings.js');

var directoryHandles = {
	"root" : require("./handler/root.js").handleReq,
	"user" : require("./handler/user.js").handleReq,
	"blog" : require("./handler/blog.js").handleReq,
	"panel" : require("./handler/panel.js").handleReq,
	"shortURL" : require("./handler/shorturl.js").handleReq,
	"login" : require("./handler/login.js").handleReq,
	"follow" : require("./handler/follow.js").handleReq,
	"assets" : require("./handler/assets.js").handleReq
};

exports.createServer = function(){
	http.createServer(function(request, response){
		
		var pathname = url.parse(request.url).pathname,
			pathParts = pathname.substring(1).split("/");
		
		if(pathParts[0] !== "" && pathname.substring(pathname.length-1) === "/"){
			response.writeHead(302, { 
					'Location': pathname.substring(0, pathname.length-1)
			});
			response.end(); return;
		}
		
		switch(pathParts[0].toLowerCase()){
			case "" : directoryHandles.root(request, response, pathParts); break;
			case "assets" : directoryHandles.assets(request, response, pathParts); break;
			case "u": directoryHandles.user(request, response, pathParts); break;
			case "b": directoryHandles.blog(request, response, pathParts); break;
			case "panel": directoryHandles.panel(request, response, pathParts); break;
			case "follow": directoryHandles.follow(request, response, pathParts); break;
			case "login": directoryHandles.login(request, response, pathParts); break;
			case "logout": directoryHandles.login(request, response, pathParts); break;
			case "favicon.ico": directoryHandles.assets(request, response, pathParts); break;
			default : directoryHandles.shortURL(request, response, pathParts);
		}
	}).listen(settings.nog.port);
};

console.log("Server running at port " + settings.nog.port);
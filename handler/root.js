var page;
require("./assets").getAsset("/html/index.html", function(data){ page = data; });

exports.handleReq = function(request, response, pathParts){
	if(request.session.data.userid){
		response.writeHead(302, { 'Location': '/panel'});
		response.end(); return;
	}
	response.writeHead(200);
	response.end(page);
}
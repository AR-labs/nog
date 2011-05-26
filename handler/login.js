var qs = require("querystring"),
	db = require("../database.js"),
	page;

require("./assets").getAsset("/html/login.html", function(data){ page = data; });

exports.handleReq = function(request, response, pathParts){
	if(pathParts[0] === "logout"){
		request.session.data.userid = request.session.data.username = "";
		response.writeHead(302, { 'Location': '/login'});
		response.end(); return;
	}
	if(request.session.data.userid){
		response.writeHead(302, { 'Location': '/panel'});
		response.end(); return;
	}
	if(request.method === "POST"){
		//parse querystring
		var body = "";
        request.on("data", function (data) { body += data; });
        request.on("end", function () {
            var query = qs.parse(body);
			if(pathParts[1] === "redirect"){
				db.verifyCredentials( query.loginname, query.loginpassword, function(data){
					if(data.length <= 0){
						//wrong credentials
						response.writeHead(302, { 'Location': '/login#wrongpw'});
						response.end();
					}
					else{
						//correct credentials
						request.session.data.userid = data[0].id;
						request.session.data.username = data[0].username;
						response.writeHead(302, { 'Location': '/panel'});
						response.end();
					}
				})
				return;
			}
			if(pathParts[1] === "create"){
				db.createAccount(query.loginname,query.loginpassword,query.email, function(uid){
					if(!uid){
						//wrong credentials
						response.writeHead(302, { 'Location': '/#username'});
						response.end();
					}
					else{
						//correct credentials
						request.session.data.userid = uid;
						request.session.data.username = query.loginname;
						response.writeHead(302, { 'Location': '/panel'});
						response.end();
					}
				});
			}
        });
	}
	else{
		response.writeHead(200, {"Content-Type": "text/html"});
		response.end(page);
	}
};

/*
app.get('/login',function(req,resp){});
app.post('/login/redirect', function(req,resp){
	//verify credentials, if user exists
		//true redirect to dashboard
		//false redirect to /login, show error
});
app.post('/login/create', function(req,resp){
	//check if username contains any "bad" characters (/\&#)
	//check if username exists
		//if anything applies: redirect to login, show error
		//else: create user, redirect to dashboard
});
*/
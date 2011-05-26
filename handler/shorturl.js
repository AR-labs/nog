var db = require("../database.js"),
	assets = require("./assets");

exports.handleReq = function(request, response, pathParts){
	var shortURL = exports.fromShortURL(pathParts[0]);
	db.shortURL(shortURL, function(results){
		if(results.length > 0){
			results = results[0];
			response.writeHead(302, { 'Location': ["/b", "id:" + results.blogid, 
								results.artid, results.urlfragment].join("/")});
			response.end(); return;
		}
		else{
			assets.show404(response);
		}
	});
};

/*
var numValues = ["p", "y", "w", "e", "g", "l", "k", "i", "v", "b", "t", "r", "a", "c", "s", "d", "x", "f", "h", "z", "o", "n", "j", "q", "u", "m"];
*/

var numValues = ["D", "p", "G", "a", "q", "C", "J", "F", "Z", "X", "f", "c", "B", "Y", "9", "S", "3", "7", "x", "g", "5", "6", "d", "b","I", "4", "T", "A", "z", "P", "j", "K", "v", "s", "u", "m", "o", "1", "y", "t", "w", "R", "8", "k", "l", "V", "H", "r", "h", "M", "0", "N", "W", "E", "e", "L", "2", "Q", "U", "i", "O", "n"];

exports.fromShortURL = function fromShortURL(shrt){
	if(!shrt) { return; }
	if(shrt.indexOf("s:")===0){
		shrt = shrt.substring(2);
	}
	var sum = "";
	var lastItem = numValues[numValues.length-1];
	var num = shrt.lastIndexOf(lastItem);
	var shrtlength = shrt.length;
	var id = 0;
	
	if(num > 0){
		sum = fromShortURL(shrt.substring(0, num)) + "";
		shrt = shrt.substring(num);
	}
	
	shrt = shrt.split("");
	for(var i = 0; i < shrtlength; i++){
		id += (sum === "" ? 1 : parseInt(sum, 10)) * (numValues.indexOf(shrt[i]) + 1);
		sum = "";
	}
	return id;
};
exports.toShortURL = function toShortURL(id){
	var vals = "", sum, tmpId;
	var num = numValues.length;
	for(var i = num; i >= 0 && id > 0; i--){
		sum = (id - (tmpId = id % i)) / i;
		id = tmpId;
		if(sum > 0){
			if(sum === 1){
				vals += numValues[i-1];
			}
			else{
				vals += toShortURL(sum) + numValues[i-1];
			}
		}
	}
	return vals.length === 1 ? "s:" + vals : vals;
};

/*var encoded;
console.log("ID: " + exports.fromShortURL( encoded = exports.toShortURL(7512341234) ), "endcoded: " +encoded );*/
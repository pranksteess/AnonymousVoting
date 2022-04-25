/**
 * Created by specer on 18/3/27.
 */
var querystring = require("querystring"),
    url = require("url");


const BlindSignature = require('blind-signatures');
const publicKey = BlindSignature.keyGeneration({ b: 2048 });

function getPublicKey(response) {
	console.log("Request handler 'getPublicKey' was called,");
	var returnDic = {
//		"K" : publicKey.toString(),
		"N" : publicKey.keyPair.n.toString(),
		"E" : publicKey.keyPair.e.toString()
	};
        response.writeHead(200, {
        	'Content-Type': 'application/json; charset=utf-8',
        	'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET',
		'Access-Control-Allow-Headers': 'x-requested-with,content-type'
        });
        response.write(JSON.stringify(returnDic));
        response.end();
}

function sign(response, request) {
	console.log("Request handler 'sign' was called,");
    	var queryObj = querystring.parse(url.parse(request.url).query);
    	var blindStr = decodeURIComponent(queryObj['blindStr']);
	var signedStr = BlindSignature.sign({
		blinded : blindStr,
		key : publicKey
	});
	var returnDic = {};
	if (signedStr) {
		returnDic = {"ret" : 0, "signedStr" : signedStr.toString()};
	}
	else {
		returnDic = {"ret" : 1, "signedStr" : ""};
	}
        response.writeHead(200, {
        	'Content-Type': 'application/json; charset=utf-8',
        	'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET',
		'Access-Control-Allow-Headers': 'x-requested-with,content-type'
        });
        response.write(JSON.stringify(returnDic));
        response.end();
}

exports.getPublicKey= getPublicKey;
exports.sign= sign;


/*!
* AstroMentis Server
* Created by Korhan Akcura
*/
var http = require('http');
var url = require('url');
var fs = require('fs');
var bio = require('./bio-monitor-predict.js');
var qrystr = require('querystring');
var csv = require('fast-csv');
//var Engine = require('tingodb')();
//var db = new Engine.Db('./db', {});

function collectRequestData(request, callback) {
	const FORM_URLENCODED = 'application/x-www-form-urlencoded';
	if(request.headers['content-type'] === FORM_URLENCODED) {
		let body = '';
		request.on('data', chunk => {
			body += chunk.toString();
		});
		request.on('end', () => {
			callback(qrystr.parse(body));
		});
	}
	else {
		callback("null");
	}
}

http.createServer(function (request, response) {
	console.log('Page requested...');

	if (request.method === 'POST') {
		if (request.url == '/predict') {
			collectRequestData(request, result => {

				fs.readFile('./public/prediction.html', (err, data) => {
					if (err) {
						res.writeHead(500);
						res.end(err);
						return;
					}

					var prediction = bio.predict(result.num1, result.num2);
					data = data.toString();
					data = data.toString().replace(/\{\{ prediction \}\}/, prediction)
					response.writeHead(200);
					response.end(data, 'utf8');
				});
			});
		}
	}
	else {

		var filePath = './public' + url.parse(request.url, true).pathname;
		if (filePath == './public/') {
			// The default page
			filePath = './public/index.html';
		}

		var contentType = request.headers['content-type'];


		fs.readFile(filePath, function(error, content) {
			if (error) {
				if(error.code == 'ENOENT'){
					response.writeHead(404);
					response.end('<b>Not Found: '+error.code+'</b>'); 
				}
				else {
					response.writeHead(500);
					response.end('<b>Internal Server Error: '+error.code+'</b>'); 
				}
			}
			else if (request.url.indexOf('.css') != -1) {
				response.setHeader("Content-Type", 'text/css');
				response.write('styles.css');
			}
			else {
				response.writeHead(200, { 'Content-Type': "contentType" });			
			}
			response.end(content, 'utf-8');
		});
	}

}).listen(8081);
console.log('Server running...');

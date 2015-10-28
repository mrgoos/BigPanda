var express = require('express');
var app = express();
var http = require('https');
var cors = require('cors');
app.use(cors());

app.get('/status', function (req, res) {
	http.get('https://status.github.com/api/status.json', function(response) {
		handleResponse(response, req, res);		
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
});

app.get('/messages', function (req, res) {
	http.get('https://status.github.com/api/messages.json', function(response) {
		handleResponse(response, req, res);	
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
});

function handleResponse(response, req, res){
	// Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            // Data reception is done, send it to client
            res.send(body);
        });
}

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.listen(3000);

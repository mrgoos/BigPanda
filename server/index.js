var express = require('express');
var app = express();
var http = require('https');
var cors = require('cors');
app.use(cors());

app.get('/status', function (req, res) {
	http.get('https://status.github.com/api/status.json', function(response) {
		handleResponse(response, req, res);		
	}).on('error', function(e) {
		console.log(e);
		res.status(500).send('http get error: ' + e);
	});
});

app.get('/messages', function (req, res) {
	http.get('https://status.github.com/api/messages.jsooon', function(response) {
		handleResponse(response, req, res);	
	}).on('error', function(e) {
		console.log(e);
		res.status(500).send('http get error: ' + e);
	});
});

function handleResponse(response, req, res){
	// Continuously update stream with data
        var body = '';
		if(response.statusCode == 200){
			response.on('data', function(d) {
				body += d;
			});
			response.on('end', function() {
				// Data reception is done, send it to client
				
				res.send(body);
			});
		}
		else{
			//for any http request error, send the status message
			res.status(response.statusCode).send('Server error. Status message: ' + response.statusMessage);
		}  
}

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.listen(3000);

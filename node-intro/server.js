"use strict";

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var multer  =   require('multer');

//create a new express application
var app = express();

//log requests
app.use(morgan('dev'));

//parse JSON post bodies
app.use(bodyParser.json());

//serve static files from /static
app.use(express.static(__dirname + '/static'));

var storage =   multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './uploads');
		},
		filename: function (req, file, callback) {
			callback(null, file.fieldname + '-' + Date.now());
		}
});
var upload = multer({ storage : storage}).single('attachments');

app.post('/api/photo',function(req,res){
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});
});


/*
//call this function for GET on /
app.get('/', function(req, res) {
	res.setHeader('Content-Type','text/plain');
	res.send('Hello World!');
});
//call this function for GET on /time
app.get('/time', function(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.send(new Date());
});
*/





app.get('/api/v1/users', function(req, res) {
	var users = [
		{
			email: 'raptor@trex.com',
			displayName: 'Chaddasarus'
		}
	]
	
	res.json(users);
});

app.post('/api/v1/users', function(req, res) {
	console.log(req.body);
	res.json({message: 'new user created'});
});

// listen for HTTP requests on port 80
app.listen(80, function() {
	console.log('server is listening');
});
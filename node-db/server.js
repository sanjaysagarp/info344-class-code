"use strict";

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var dbconfig = require('./secret/config-maria.json');
var bluebird = require('bluebird');

//create pool initializes to ten connections -- used for concurrency
var connPool = bluebird.promisifyAll(mysql.createPool(dbconfig));

var storiesApi = require('./controllers/stories-api');
var Story = require('./models/story').Model(connPool);



var app = express();

app.use(morgan('dev')); //logs to console
app.use(bodyParser.json());

//allows for static pages
app.use(express.static(__dirname + '/static'));

//good practice to segment apis under /api/vx
app.use('/api/v1',storiesApi.Router(Story));

app.listen(80, function() {
	console.log('server is listening...');
});


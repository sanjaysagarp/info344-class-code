"use strict";
var num =3;
add2(num);

function add2(num) {
	var promise = new Promise(function(resolve, reject) {
		if (num != null) {
			resolve(num);
		} else {
			reject(num);
		}
	});
	
	promise.then(function(num) {
		console.log(num);
		return (num + 2);
	})
	.then(function(num) {
		console.log(num);
	})
	.catch(function(err) {
		console.log('Cannot accept null');
		console.error(err);
	})
}

var http = require('http');

function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual request stuff
    http.get(url, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            resolve(body);
        });
    }).on('error', function(err) {
        reject(err);
    });
  })
}

function getMovie(MovieId) {
	get("http://www.omdbapi.com/?i=tt0120737&plot=short&r=json")
		.then(function(data) {
			console.log(data);
		})
}
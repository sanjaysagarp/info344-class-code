<<<<<<< HEAD
"use strict";
=======
'use strict';
>>>>>>> dd127347d12c8bb16a0f6d7fa4d2cd6133701c08

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

<<<<<<< HEAD
var ghConfig = require('./secret/oauth-github.json');
ghConfig.callbackURL = 'http://localhost:8080/signin/github/callback';

var ghStrategy = new GitHubStrategy(ghConfig, function(accessToken, refreshToken, profile, done) {
	console.log('Authenication Successful!');
	console.dir(profile);
	done(null, profile);
});

var cookieSigSecret = process.env.COOKIE_SIG_SECRET;
if(!cookieSigSecret) {
	console.error('Please set COOKIE_SIG_SECRET');
	process.exit(1);
=======
//load GitHubStratey configuration
//this contains the clientID and clientSecret values
var ghConfig = require('./secret/oauth-github.json');
//add the callback URL, which can be relative (i.e., no domain)
ghConfig.callbackURL = '/signin/github/callback';

//create the GitHub authentication strategy
var ghStrategy = new GitHubStrategy(ghConfig, 
    function(accessToken, refreshToken, profile, done) {
        //this function is called after the user has
        //authenticated and GitHub has returned to our server
        //`profile` contains the full profile info
        //at this point you would probably want to create
        //or update a corresponding user account in your
        //database, as the `id` property on the profile
        //will be local to GitHub, and may conflict with
        //IDs from other OAuth providers you may support
        console.log('Authentication Successful!');
        console.dir(profile);
        done(null, profile);
    });
    
//load the cookie signature secret
//this is used to digitally sign the cookie so that
//express can tell if it was tampered with on the client

//read this from an environment variable
//set the environment variable using the command
//  $ export COOKIE_SIG_SECRET="my secret value"
//and then start the server
var cookieSigSecret = process.env.COOKIE_SIG_SECRET;
if (!cookieSigSecret) {
    console.error('Please set COOKIE_SIG_SECRET');
    process.exit(1);
>>>>>>> dd127347d12c8bb16a0f6d7fa4d2cd6133701c08
}

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
<<<<<<< HEAD
app.use(session({
	//need to export COOKIE_SIG_SECRET=$(uuidgen)
	secret: cookieSigSecret,
	resave: false,
	saveUninitialized: false,
	store: new RedisStore()
}));

passport.use(ghStrategy);

//only called on authenication
passport.serializeUser(function(user, done) {
	//should just serialize primary key id
	done(null, user);
});

//gets called in every single session
passport.deserializeUser(function(user, done) {
	done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/signin/github', passport.authenticate('github'));
app.get('/signin/github/callback', passport.authenticate('github'), function(req, res) {
	res.redirect('/secure.html');
});

app.get('/signout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.use(express.static(__dirname + '/static/public'));

app.use(function(req, res, next) {
	//req.isAuthenicated()
	if(req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/');
	}
});

app.use(express.static(__dirname + '/static/secure'));

app.get('/api/v1/users/me', function(req, res) {
	//req.user is the currently authenicated user
	req.json(req.user);
});

app.listen(80, function() {
	console.log('server is listening...');
});
=======

//add session support to the application
//and tell it to store session data in our
//local Redis database (you can also pass)
//a {host: host-name} object to the RedisStore()
//constructor to use a different host 
app.use(session({
    secret: cookieSigSecret,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore()
}));

//tell passport to use the GitHub strategy
//you can use as many strategies as you want
//to support multiple ways to authenticate
passport.use(ghStrategy);

//provide a function to serialize the user
//this allows you to save only part of the user object
//for example, just the unique ID value
//for details see https://info344.ischool.uw.edu/course/tutorials/passport
passport.serializeUser(function(user, done) {
    done(null, user); 
});
passport.deserializeUser(function(user, done) {
    done(null, user); 
});

app.use(passport.initialize()); //add authentication to the app
app.use(passport.session());    //add session support to the app

//GET of /signin/github triggers authentication using the GitHub strategy 
app.get('/signin/github', passport.authenticate('github'));

//and GitHub redirects back to /signin/github/callback after authentication
//the passport.authenticate('github') receives the response from GitHub
//and processes it, and then our middleware function redirects to
//the /secure.html page
app.get('/signin/github/callback', passport.authenticate('github'), 
    function(req, res) {
        res.redirect('/secure.html'); 
    });    
    
//GET of /signout should end the session and redirect
//back to the home page
app.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/'); 
});

//tell express to serve static files from the /static/public
//subdirectory (any user can see these)
app.use(express.static(__dirname + '/static/public'));

//add a middleware function to verify that the user is
//authenticated: if so, continue processing; if not,
//redirect back to the home page
app.use(function(req, res, next) {
    //TODO: add code to check req.isAuthenticated()
    next();
});

//tell express to serve static files from the /static/secure
//subdirectory as well, but since this middleware function
//is added after the check above, express will never call it
//if the function above doesn't call next()
app.use(express.static(__dirname + '/static/secure'));

//start the server
app.listen(80, function() {
    console.log('server is listening...');
});
>>>>>>> dd127347d12c8bb16a0f6d7fa4d2cd6133701c08

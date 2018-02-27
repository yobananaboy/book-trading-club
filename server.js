require('babel-register')({
    presets: ["env", "react", "stage-2", "es2015"],
    plugins: ["transform-class-properties"]
});

const http = require('http');
const path = require('path');
require('dotenv').config();

const express = require('express');
const app = express();
const session = require('express-session');

const passport = require('passport');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(cookieParser());
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
	extended: true
}));

// Initialize Passport session
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: process.env.SECRET_KEY_BASE
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/public', express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

var server = http.createServer(app);

// require('./config/passport')(passport);
require('./routes/routes')(app, passport, express, path);

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
	var addr = server.address();
	console.log("Chat server listening at", addr.address + ":" + addr.port);
});
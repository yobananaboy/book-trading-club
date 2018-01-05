const http = require('http');
const path = require('path');
require('dotenv').config();

const express = require('express');
const app = express();
const session = require('express-session');

const passport = require('passport');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const server = http.createServer(app);

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

app.use(express.static(path.resolve(__dirname, 'public')));

require('./config/passport')(passport);
require('./routes/routes')(app, passport, express, path);

server.listen(process.env.PORT || 5000, process.env.IP || "0.0.0.0", function() {
	var addr = server.address();
	console.log("Chat server listening at", addr.address + ":" + addr.port);
});
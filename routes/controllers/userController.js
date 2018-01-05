const User = require('../../config/database').User;
const passport = require('passport');
require('../../config/passport')(passport);

exports.signup = function(req, res, next) {
	passport.authenticate('local-signup', function(err, user, info) {
		if (err) {
			console.log(err);
    		return next(err);
		}
		if(!user) {
			return res.json({
				error: true,
				message: 'User already exists! Please try logging in.'
			});
		}
		req.login(user, function(err) {
			if(err) {
				return next(err);
			}
		});
		return res.json({
			success : true,
			message : 'authentication succeeded'
		});
	})(req, res, next);
};

exports.login = function(req, res, next) {
	passport.authenticate('local-login', function(err, user, info) {
		if(err) {
			console.log(err);
			return next(err);
		}
		if(!user) {
			return res.json({
				error: true,
				message: '* Invalid email address or password. Please try again.'
			});
		}
		req.login(user, function(err) {
			if(err) {
				return next(err);
			}
		});
		return res.json({
			success: true,
			message: 'login succeeded'
		});
	})(req, res, next);
};

exports.update_user = function(req, res) {
	let userId = req.body._id;
	let name = req.body.name;
	let city = req.body.city;
	let state = req.body.state;
	User.findOne({_id: userId}, (err, user) => {
		if (err) {
			console.log(err);
			res.send(JSON.stringify({
				err: true
			}));
		}
		user.name = name;
		user.location.city = city;
		user.location.state = state;
		user.save(err => {
			if (err) {
				console.log(err);
				res.send(JSON.stringify({
					err: true
				}));
			}
			res.json({
				success: true
			});
		});
	});
};

exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.get_user = function(req, res) {
	// if user logged in, send user info
	if (typeof req.user != "undefined") {
		res.json({
			user: req.user
		});
	} else {
		res.json({
			user: false
		});
	}
};
const LocalStrategy = require('passport-local').Strategy;
const database = require('./database');
const User = database.User;

module.exports = function(passport) {
	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	// used to deserialize the user
	passport.deserializeUser(function(email, done) {
		User.findById(email, function(err, user) {
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
			// by default, local strategy uses username and password, we will override with email
			usernameField: 'email',
			passwordField: 'password',
		},
		function(email, password, done) {
			// asynchronous
			// User.findOne wont fire unless data is sent back
			process.nextTick(function() {

				// find a user whose email is the same as the forms email
				// we are checking to see if the user trying to login already exists
				User.findOne({
					'email': email
				}, function(err, user) {
					// if there are any errors, return the error
					if (err)
						return done(err);

					// check to see if theres already a user with that email
					if (user) {
						return done(null, false);
					} else {

						// if there is no user with that email
						// create the user
						var newUser = new User();

						// set the user's local credentials
						newUser.name = "";
						newUser.email = email;
						newUser.password = newUser.generateHash(password);
						newUser.location = {
							city: "",
							state: ""
						};

						// save the user
						newUser.save(function(err) {
							if (err)
								throw err;
							return done(null, newUser);
						});
					}

				});
			});


		}));

	passport.use('local-login', new LocalStrategy({
			// by default, local strategy uses username and password, we will override with email
			usernameField: 'email',
			passwordField: 'password'
		},
		function(email, password, done) {
			User.findOne({
				email: email
			}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false);
				}
				if (!user.validPassword(password)) {
					return done(null, false);
				}
				return done(null, user);
			});
		}
	));
};
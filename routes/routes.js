const book_controller = require('./controllers/bookController');
const user_controller = require('./controllers/userController');

module.exports = function(app, passport, express, path) {
	// get book data
	app.get('/getbookdata', book_controller.get_book_data);
	// sign user up
	app.post('/usersignup', user_controller.signup);
	// log user in
	app.post('/userlogin', user_controller.login);
	//log user out
	app.get('/logout', user_controller.logout);
	// get user details
	app.get('/getUser', user_controller.get_user);
	// update user details
	app.post('/updateUser', user_controller.update_user);
	// when a logged in user searches for a book, make an api call then update database. Book needs to be added to books and updated data sent to user
	app.post('/booksearch', book_controller.make_book_search);
	// when a user makes a trade request, update book on database
	app.post('/maketraderequest', book_controller.make_book_trade_request);
	// when a user accepts a trade request, update book on database
	app.post('/accepttraderequest', book_controller.accept_book_trade_request);
	// when a user declines a trade request, update book on database
	app.post('/declinetraderequest', book_controller.decline_book_trade_request);
};
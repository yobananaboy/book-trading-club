require('dotenv').config();

let Book = require('../../config/database').Books;
let GoogleBooks = require('google-books-search-2');
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

import { booksUpdated, booksHaveErrored } from '../../app/actions/books';
import { userUpdated, checkUserLoggedIn } from '../../app/actions/users';

import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';

import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes } from 'react-router-config';

import configureStore from '../../app/store/configureStore';

import { Provider } from 'react-redux';

import routes from '../../app/routes/routes';

// get book data
exports.get_book_data = (req, res) => {
	// find all books on database, send data if no error
	Book.find({})
		.then(booksData => {
			res.send(JSON.stringify({ books: booksData }));
		})
		.catch(err => {
			console.log(err);
			res.send({
				err: true
			});
		});
};

exports.make_book_search = (req, res) => {
	// get user search and user who made search
	let search = req.body.search.toString();
	let userWhoMadeSearch = req.body.user._id;
	// make api call to Google books
	GoogleBooks.search(search)
		.then(results => {
			// get the first result
			let bookData = results[0];
			// get authors - convert array to string if length is longer than one author
			let authors = 'Could not get data';
			if(bookData.authors) {
				authors = bookData.authors[0];
				if (bookData.authors.length > 1) {
					authors = bookData.authors.join(', ');
				}	
			}
			let newId = new mongoose.mongo.ObjectId();
			let book = {
				_id: newId,
				title: bookData.title,
				authors,
				img: bookData.thumbnail,
				bookPutUpForTradeBy: userWhoMadeSearch,
				bookTradedWith: null,
				tradeRequestedBy: null,
				bookOwner: null
			};
			// add book to database
			let newBook = new Book(book);
			newBook.save()
				.then(res => {
					Book.find({})
						.then(booksData => {
							res.json({
								books: booksData
							});
						})
						.catch(err => {
							console.log(err);
							res.json({
								err: true
							});
						});
				})
				.catch(err => {
					console.log(err);
					res.send(JSON.stringify({
						err: true
					}));
				});
		})
		.catch(err => {
			console.log(err);
			res.send(JSON.stringify({
				err: true
			}));
		});
};

// make book trade request
exports.make_book_trade_request = (req, res) => {
	// get id of book user wants to trade
	let requestedBookId = req.body.bookId;
	// get user info for user wantint to trade
	let userRequestingTrade = req.body.user._id;
	// find book on db by id of book requested, handling errors
	Book.findOne({
		_id: requestedBookId
	}, (err, bookData) => {
		if (err) {
			console.log(err);
			res.send(JSON.stringify({
				err: true
			}));
		}
		// update trade request on book and save to database
		bookData.tradeRequestedBy = userRequestingTrade;
		bookData.save(err => {
			if (err) {
				console.log(err);
				res.send(JSON.stringify({
					err: true
				}));
			}
			// get books and send updated info to client
			Book.find({}, (err, booksData) => {
				if (err) {
					console.log(err);
					res.json({
						err: true
					});
				}
				res.json({
					books: booksData
				});
			});
		});
	});
};

exports.accept_book_trade_request = (req, res) => {
	// get id of book user wants to trade
	let acceptedBookId = req.body.bookId;
	// find book on db by id of book requested, handling errors
	Book.findOne({
		_id: acceptedBookId
	}, (err, bookData) => {
		if (err) {
			console.log(err);
			res.json({
				err: true
			});
		}
		// trade accepted
		// this means the book has an owner, which we update		
		bookData.bookOwner = bookData.tradeRequestedBy;
		bookData.save(err => {
			if (err) {
				console.log(err);
				res.json({
					err: true
				});
			}
			// get books and send updated info to client
			Book.find({}, (err, booksData) => {
				if (err) {
					console.log(err);
					res.json({
						err: true
					});
				}
				res.json({
					books: booksData
				});
			});
		});
	});
};

exports.decline_book_trade_request = (req, res) => {
	// get id of book user wants to trade
	let declinedBookId = req.body.bookId;
	// find book on db by id of book requested, handling errors
	Book.findOne({
		_id: declinedBookId
	}, (err, bookData) => {
		if (err) {
			console.log(err);
			res.send(JSON.stringify({
				err: true
			}));
		}
		// trade declined
		// we need to update trade requested by to null - nobody has requested the trade anymore
		bookData.tradeRequestedBy = null;
		bookData.save(err => {
			if (err) {
				console.log(err);
				res.json({
					err: true
				});
			}
			// get books and send updated info to client
			Book.find({}, (err, booksData) => {
				if (err) {
					console.log(err);
					res.json({
						err: true
					});
				}
				res.json({
					books: booksData
				});
			});
		});
	});
};

exports.render_server_data = (req, res) => {
	let store = configureStore();
	if (typeof req.user != "undefined") {
		store.dispatch(userUpdated(req.user));
	}
	Book.find({})
		.then(booksData => {
			store.dispatch(booksUpdated(booksData));	
			renderData();
		})
		.catch(err => {
			console.log(err);
			store.dispatch(booksHaveErrored(true));
			renderData();
	});
	
	function renderData() {
		let data = store.getState();
		let context = {};
        let content = renderToString(
          <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
              {renderRoutes(routes)}
            </StaticRouter>
          </Provider>
        );
        if(context.status === 404) {
          res.status(404);
        }
        res.render('index', {data: JSON.stringify(data), content });
	}
};
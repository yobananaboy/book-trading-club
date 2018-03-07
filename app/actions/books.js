// actions

import axios from 'axios';
const searchUrl = '/booksearch';
const getBooksUrl = '/getbookdata';
const makeTradeRequestUrl = '/maketraderequest';
const acceptTradeRequestUrl = '/accepttraderequest';
const declineTradeRequestUrl = '/declinetraderequest';

export const makeBookSearch = (user, search) => {
	return (dispatch) => {
		let data = {
			user,
			search
		};
		axios.post(searchUrl, data)
			.then(res => {
				if (res.data.book) {
					dispatch(bookSearchError(false));
					dispatch(booksUpdated(res.data.books));
				} else if (res.data.err) {
					dispatch(bookSearchError("* Could not search for book. Please try again"));
				}
			})
			.catch(err => {
				console.log(err);
				dispatch(bookSearchError("* Could not search for book. Please try again"));
			});
	};
};

export const getBooks = () => {
	return (dispatch) => {
		axios.get(getBooksUrl)
			.then(res => {
				if (res.data.books) {
					dispatch(booksUpdated(res.data.books));
				} else if (res.data.err) {
					dispatch(booksHaveErrored(true));
				}
			})
			.catch(err => {
				console.log(err);
				dispatch(booksHaveErrored(true));
			});
	};
};

export const makeTradeRequest = (bookId, user) => {
	return (dispatch) => {
		axios.post(makeTradeRequestUrl, {bookId, user})
			.then(res => {
				if (res.data.books) {
					dispatch(booksUpdated(res.data.books));
				} else if (res.data.err) {
					dispatch(booksHaveErrored(true));
				}
			})
			.then(err => {
				if(err) {
					dispatch(booksHaveErrored(true));	
				}
			});
	};
};

export const acceptTradeRequest = (bookId) => {
	return (dispatch) => {
		axios.post(acceptTradeRequestUrl, {bookId})
			.then(res => {
				if (res.data.books) {
					dispatch(booksUpdated(res.data.books));
				} else if (res.data.err) {
					dispatch(booksHaveErrored(true));
				}
			});
	};
};

export const declineTradeRequest = (bookId) => {
	return(dispatch) => {
		axios.post(declineTradeRequestUrl, {bookId})
			.then(res => {
				if (res.data.books) {
					dispatch(booksUpdated(res.data.books));
				} else if (res.data.err) {
					dispatch(booksHaveErrored(true));
				}
			});
	};
};

export const booksUpdated = (booksData) => {
	return {
		type: 'BOOKS_UPDATED',
		booksData
	};
};

export const booksHaveErrored = (bool) => {
	return {
		type: 'BOOKS_HAVE_ERRORED',
		hasErrored: bool
	};
};

export const tradeRequestError = (bool) => {
	return {
		type: 'TRADE_REQUEST_ERROR',
		tradeRequestError: bool
	};
};

export const bookSearchError = (err) => {
	return {
		type: 'BOOK_SEARCH_ERROR',
		searchError: err
	};
};
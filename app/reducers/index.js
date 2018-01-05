import { combineReducers } from 'redux';
import { booksHaveErrored, tradeRequestError, bookSearchErrorMessage, books } from './books';
import { user, userMessage } from './users';

export default combineReducers({
   booksHaveErrored,
   tradeRequestError,
   bookSearchErrorMessage,
   books,
   userMessage,
   user
});
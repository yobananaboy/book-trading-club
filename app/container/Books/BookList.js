import React, { Component } from 'react';
import { BookTile } from './BookTile';

class BookList extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let display = this.props.booksToDisplay;
        let booklist = [];
        if(this.props.books.length >= 1) {
            // loop through list of books and create a differen booklist depending on which list view chosen
            this.props.books.forEach((book, index) => {
                // if all books, just push every book
                if(display === 'all') {
                    booklist.push(<BookTile {...this.props} book={book} />);
                }
                // if available books, push books that have no bookowner and nobody requesting the book as long as they are not the current user
                if(display === 'available' && !book.bookOwner && !book.tradeRequestedBy) {
                    if(book.bookOwner !== this.props.user._id && book.bookPutUpForTradeBy !== this.props.user._id) {
                        booklist.push(<BookTile {...this.props} book={book} />);    
                    }
                }
                // if displaying user's books, just display ones where the user id matches either book owner or book put up for trade
                if(display === 'user') {
                    if(book.bookOwner === this.props.user._id) {
                        booklist.unshift(<BookTile {...this.props} book={book} />);
                    }
                    if(book.bookPutUpForTradeBy === this.props.user._id) {
                        booklist.push(<BookTile {...this.props} book={book} />);
                    }
                }
            });               
        }  else {
            booklist = <p class="book-list-message">No books to load!</p>;
        }
        if(this.props.booksHaveErrored) {
            booklist = <p class="error-message">'Could not load books. Please try again.'</p>;
        }
        if(this.props.booksAreLoading) {
            booklist = <div className="loader">Loading...</div>;
        }
        return(
                booklist
            );
    }
    
}

export default BookList;
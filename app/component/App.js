import React, { Component } from 'react';
import Header from './Header';
import { Footer } from './Footer';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import { makeBookSearch, getBooks, makeTradeRequest, acceptTradeRequest, declineTradeRequest } from '../actions/books';
import { signup, login, checkUserLoggedIn, updateUser, updateUserMessage } from '../actions/users';

class App extends Component {
    constructor(props) {
        super(props);
    }
    
    componentWillMount() {
        this.props.checkUserLoggedIn();
        this.props.getBooks();
    }
    
    render() {
        return(
            <div>
                <Header {...this.props} />
                    {renderRoutes(this.props.route.routes, {...this.props})}
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books,
        booksHaveErrored: state.booksHaveErrored,
        bookSearchIsLoading: state.bookSearchIsLoading,
        tradeRequestError: state.tradeRequestError,
        booksAreLoading: state.booksAreLoading,
        bookSearchErrorMessage: state.bookSearchErrorMessage,
        userMessage: state.userMessage,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        makeBookSearch: (user, search) => dispatch(makeBookSearch(user, search)),
        getBooks: () => dispatch(getBooks()),
        makeTradeRequest: (bookId, user) => dispatch(makeTradeRequest(bookId, user)),
        acceptTradeRequest: (bookId) => dispatch(acceptTradeRequest(bookId)),
        declineTradeRequest: (bookId) => dispatch(declineTradeRequest(bookId)),
        updateUser: (user) => dispatch(updateUser(user)),
        updateUserMessage: (message) => dispatch(updateUserMessage(message)),
        signup: (user) => dispatch(signup(user)),
        login: (user) => dispatch(login(user)),
        checkUserLoggedIn: () => dispatch(checkUserLoggedIn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
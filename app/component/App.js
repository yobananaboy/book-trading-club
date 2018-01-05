import React, { Component } from 'react';
import Header from './Header';
import { Books } from '../container/Books/Books';
import LoginPage from '../container/Users/LoginPage';
import SignupPage from '../container/Users/SignupPage';
import SettingsPage from '../container/Users/SettingsPage';
import { Footer } from './Footer';
import { connect } from 'react-redux';
import { makeBookSearch, getBooks, makeTradeRequest, acceptTradeRequest, declineTradeRequest } from '../actions/books';
import { signup, login, checkUserLoggedIn, updateUser, updateUserMessage } from '../actions/users';
import { Route, Switch } from 'react-router-dom';

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
                <Switch>
                    <Route path ="/" exact render = {(props) => (<Books {...this.props} booksToDisplay='all' />)} />
                    <Route path ="/books/all" exact render = {(props) => (<Books {...this.props} booksToDisplay='all' />)} />
                    <Route path ="/books/available" exact render = {(props) => (<Books {...this.props} booksToDisplay='available' />)} />
                    <Route path ="/user/books" exact render = {(props) => (<Books {...this.props} booksToDisplay='user' />)} />
                    <Route path ="/user/settings" exact render = {(props) => (<SettingsPage {...this.props} />)} />
                    <Route path ="/login" exact render = {(props) => (<LoginPage {...this.props} />)} />
                    <Route path ="/signup" exact render = {(props) => (<SignupPage {...this.props} />)} />
                </Switch>
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

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(App);
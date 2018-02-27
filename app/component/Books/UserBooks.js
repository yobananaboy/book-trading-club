import React, { Component } from 'react';
import BookTradesAvailable from './BookTradesAvailable';
import BookList from './BookList';
import BookSectionHeader from './BookSectionHeader';
import { Redirect } from 'react-router-dom';

export const UserBooks = (props) => {
    let booktrades;
    if(props.user) {
        booktrades = <BookTradesAvailable {...props} />;
    } else {
        return <Redirect to="/" />;
    }
    return (
                <div className="wrapper">
                    {booktrades}
                    <BookSectionHeader {...props} booksToDisplay='user' />
                    <BookList {...props} booksToDisplay='user' />
                </div>
        );
};
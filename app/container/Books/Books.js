import React, { Component } from 'react';
import BookTradesAvailable from './BookTradesAvailable';
import BookList from './BookList';
import BookSectionHeader from './BookSectionHeader';

export const Books = (props) => {
    let booktrades;
    if(props.user) {
        booktrades = <BookTradesAvailable {...props} />;
    }
    return (
                <div className="wrapper">
                    {booktrades}
                    <BookSectionHeader {...props} />
                    <BookList {...props} />
                </div>
        );
};

/*

*/
import React, { Component } from 'react';

export const BookTile = (props) => {
    let tradeStatus;
    if(props.user._id) {
        // let user request trade if they do not already own the book and they didn't put it up for trade, plus the book is not already owned or requested
        if(props.user._id !== props.book.bookOwner && props.user._id !== props.book.bookPutUpForTradeBy) {
            if(!props.book.bookOwner && !props.book.tradeRequestedBy) {
                tradeStatus = <a onClick={() => {props.makeTradeRequest(props.book._id, props.user)}} className="request-trade-button book-view-request-button">Make trade request</a>;
            }
        }
        // if a user owns a book, let them know
        if(props.user._id === props.book.bookOwner) {
            tradeStatus = <p className="trade-status-message received">You received this book</p>;
        }
        // if a user has a book up for trade, let them know
        if(props.user._id === props.book.bookPutUpForTradeBy && !props.book.bookOwner && !props.book.tradeRequestedBy) {
            tradeStatus = <p className="trade-status-message up-for-trade">You've put this book up for trade</p>;
        }
        // let user accept trade if they have put book up for trade and trade requested
        if(props.user._id === props.book.bookPutUpForTradeBy && !props.book.bookOwner && props.book.tradeRequestedBy) {
            tradeStatus = <a onClick={() => { props.acceptTradeRequest(props.book._id)}} className="accept-trade-button book-view-request-button">Accept trade request</a>;
        }
        // if a user has traded a book, let them know
        if(props.user._id === props.book.bookPutUpForTradeBy && props.book.bookOwner) {
            tradeStatus = <p className="trade-status-message traded">You traded this book away</p>;
        }
        // if a user has requested a book, let them know
        if(props.user._id === props.book.tradeRequestedBy && !props.book.bookOwner) {
            tradeStatus = <p className="trade-status-message requested">You've requested this book</p>;
        }
    }
    return(
            <div className="book">
			<img src={props.book.img} />
    			<p><strong>Title: </strong>{props.book.title}</p>
    			<p><strong>Author(s): </strong>{props.book.authors}</p>
                {tradeStatus}
    		</div>
        );
};
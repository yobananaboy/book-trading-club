import React, { Component } from 'react';
import classNames from 'classnames';

class BookTradesAvailable extends Component {
    constructor(props) {
		super(props);
        this.state = {
            tradeViewOpen: false
        };
        this.tradeToggle = this.tradeToggle.bind(this);
    }
    // for toggling view showing trades
    tradeToggle(e) {
        // prevent default
        e.preventDefault();
        // get trade toggle status
        let tradeToggleStatus = this.state.tradeViewOpen;
        // if target of trade toggle does not match current trade toggle open, then open that one
        if(tradeToggleStatus !== e.target.id) {
            this.setState({
                tradeViewOpen: e.target.id
            });
        } else {
            // else, user has clicked on open trade list, so close it by setting trade view open to false
            this.setState({
               tradeViewOpen: false
            });
        }
    }
    
    render() {
        // for each book, see if user has requested a trade or is pending a trade
        let requestsUserMadeListItems = [];
        let requestsForUserListItems = [];
        let requestUserMadeCount = 0;
        let requestForUserCount = 0;
        this.props.books.forEach((book, index) => {
            if(book.tradeRequestedBy === this.props.user._id && !book.bookOwner) {
                requestsUserMadeListItems.push(<li className="book-request-item request-for-user-list-item" key={index}>{book.title}</li>);
                requestUserMadeCount++;
            }
            if(book.bookPutUpForTradeBy === this.props.user._id && book.tradeRequestedBy && !book.bookOwner) {
                requestsForUserListItems.push(<li className="book-request-item request-user-made-list-item" key={index}>
                                                <p>{book.title}</p>
                                                <a onClick={() => { this.props.acceptTradeRequest(book._id)}} className="accept-trade-button book-view-request-button">Accept</a>
                                                <a onClick={() => { this.props.declineTradeRequest(book._id)}} className="decline-trade-button book-view-request-button">Decline</a>
                                              </li>);
                requestForUserCount++;
            }
        });
        if(requestUserMadeCount === 0) {
            requestsUserMadeListItems = <li>You haven't made any requests!</li>;
        }
        if(requestForUserCount === 0) {
            requestsForUserListItems = <li>You don't have any requests for trade!</li>;
        }
        // apply class to list of trade requests user has made and for user to toggle these lists
        let requestsUserMadeListClass,
            requestsForUserClass = classNames('book-request-list');
        if(this.state.tradeViewOpen === "requests-user-made") {
            requestsUserMadeListClass = classNames('book-request-list', 'show');
        }
        if(this.state.tradeViewOpen === "requests-for-user") {
            requestsForUserClass = classNames('book-request-list', 'show');
        }
        
        return(
            <div className="trades">
              <a href="#" className="request-button" id="requests-user-made" onClick={this.tradeToggle}>Trade requests you have made ({requestUserMadeCount})</a>
              <a href="#" className="request-button" id="requests-for-user" onClick={this.tradeToggle}>Trade requests for you ({requestForUserCount})</a>
              <ul className={requestsUserMadeListClass} id="requests-user-made-list">
                {requestsUserMadeListItems}
              </ul>
              <ul className={requestsForUserClass} id="requests-for-user-list">
                {requestsForUserListItems}
              </ul>
            </div>
            );
    }
    
}

export default BookTradesAvailable;
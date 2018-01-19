import React, { Component } from 'react';

class BookSectionHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // handle submit - if a length of book longer than one is entered, make search, else warn user
    handleSubmit(e) {
        e.preventDefault();
        if(this.state.search.length > 0) {
            this.props.makeBookSearch(this.props.user, this.state.search);
            this.setState({
                search: ""
            });
        } else {
            this.props.bookSearchError("Please enter a valid search term" );
        }
    }
    
    // handle change - for when user updates input
    handleChange(e) {
        this.setState({
            search: e.target.value 
        });
    }
    
    render() {
        let title = 'All books';
        if(this.props.booksToDisplay === 'available') {
            title = 'Books available for trade';
        }
        if(this.props.booksToDisplay === 'user') {
            title = 'Your books';
        }
        let searchInput = false;
        console.log('user');
        console.log(this.props.user);
        if(this.props.user !== false) {
            searchInput = <form className="search" onSubmit={this.handleSubmit}>
				              <input type="text" value={this.state.search} onChange={this.handleChange} /> <button id="book-search-button" type="submit">Search</button>
			              </form>;
        }
        let errormessage = false;
        if(this.props.bookSearchErrorMessage) {
            errormessage = <p className="error-message">`* {this.props.bookSearchErrorMessage}`</p>;
        }
        return(
    		<div className="book-section-header">
    			<h1>{title}</h1>
    			{searchInput}
    			{errormessage}
    		</div>
            );
    }
}

export default BookSectionHeader;
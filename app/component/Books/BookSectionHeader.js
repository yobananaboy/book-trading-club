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
        if (this.state.search.length > 0) {
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
        let intro = (
            <div className="intro">
                <p>Welcome to Matt's book trading club, where you can search for books by their title to list them for trade.</p>
                <p>As well as putting books up for trade, you can make trade requests for other users' books.</p>
            </div>
        );
        if(this.props.booksToDisplay === 'available') {
            title = 'Books available for trade';
            intro = (
                <div className="intro">
                    <p>Here is a list of books available for trade.</p>
                </div>
                );
        }
        if(this.props.booksToDisplay === 'user') {
            title = 'Your books';
            intro = (
                <div className="intro">
                    <p>Here are all your books.</p>
                    <p>This includes books you have put up for trade, as well as ones that you have received from other users.</p>
                </div>
                );
        }
        let searchInput;
        if(this.props.user !== false) {
            searchInput = (
                        <form className="search" onSubmit={this.handleSubmit}>
                            <label id="search" for="search">Search for a book by its title to make it available for trade:</label>
		                    <input type="text" value={this.state.search} onChange={this.handleChange} id="search" /> <button id="book-search-button" type="submit">Search</button>
		                </form>
			              );
        }
        let errormessage = false;
        if(this.props.bookSearchErrorMessage) {
            errormessage = <p className="error-message">`* {this.props.bookSearchErrorMessage}`</p>;
        }
        return(
    		<div className="book-section-header">
    			<h1>{title}</h1>
    			{intro}
    			{searchInput}
    			{errormessage}
    		</div>
            );
    }
}

export default BookSectionHeader;
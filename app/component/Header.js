import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import emoji from 'react-easy-emoji';
import classNames from 'classnames';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			burgerOpen: false
		};
		this.burgerToggle = this.burgerToggle.bind(this);
	}
	burgerToggle() {
		let burgerToggleStatus = !this.state.burgerOpen;
		this.setState({
			burgerOpen: burgerToggleStatus
		});
	}
	
	// https://codepen.io/carloluis/pen/gWzPzd
	render() {
		let navlinks = <div className="nav-links">
							<NavLink to="/books/all" className="nav-link" activeClassName="active" id="all" exact>All books</NavLink>
							<NavLink to="/books/available" className="nav-link" activeClassName="active" id="available" exact>Available books</NavLink>
							<NavLink to="/login" className="nav-button" id="login" activeClassName="active" exact>Login</NavLink>
							<NavLink to="/signup" className="nav-button" id="signup" activeClassName="active" exact>Sign up</NavLink>
						</div>;
		if(this.props.user) {
			navlinks = <div className="nav-links">
							<NavLink to="/books/all" className="nav-link" activeClassName="active" id="all" exact>All books</NavLink>
							<NavLink to="/books/available" className="nav-link" activeClassName="active" id="available" exact>Available books</NavLink>
							<NavLink to="/user/books" className="nav-link" activeClassName="active" id="mybooks" exact>My books</NavLink>
	 						<NavLink to="/user/settings" className="nav-link" activeClassName="active" id="settings" exact>Settings</NavLink>
							<a href="/logout" className="nav-button" id="logout" activeClassName="active" exact>Logout</a>
						</div>;
		}
		let mobileLinksClass = classNames('mobile-links', {'show': this.state.burgerOpen});
		return (
			<div className="wrapper">
				<nav className="nav">
					<div className="nav-wide">
						<div className="nav-title">
							<Link to="/" id="nav-title">{emoji("Matt's book club 📚 ")}</Link>
							{navlinks}
						</div>
					</div>
					<div className="nav-mobile">
						<div className="nav-title">
							<Link to="/" id="nav-title">{emoji("Matt's book club 📚 ")}</Link>
							<a onClick={this.burgerToggle} id="burger">☰</a>
							<div className={mobileLinksClass}>
								{navlinks}
							</div>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

export default Header;
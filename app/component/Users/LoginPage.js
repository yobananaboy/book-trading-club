import React, { Component } from 'react';
import axios from 'axios';
import validator from 'validator';
import { Link, Redirect } from 'react-router-dom';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentWillMount() {
        this.props.updateUserMessage('');
    }
    
    handleChange = (e) => {
        if(e.target.id === "email-input") {
            this.setState({
                email: e.target.value    
            });
        } else {
            this.setState({
                password: e.target.value 
            });
        }    
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        if(!validator.isEmail(this.state.email)) {
            this.props.updateUserMessage("* Please enter a valid email address");
        }
        if(this.state.password.length === 0) {
            this.props.updateUserMessage("* Please enter a valid password");
        }
        if(!validator.isEmail(this.state.email) && this.state.password.length === 0) {
            this.props.updateUserMessage("* Please enter a valid email address and password");
        }
        if(validator.isEmail(this.state.email) && this.state.password.length > 0) {
            this.props.login({
                email: this.state.email,
                password: this.state.password
            });
        }
    }
    
    render() {
        let userMessage;
        if(this.props.userMessage) {
            userMessage = <p>{this.props.userMessage}</p>;
        }
        if(this.props.user) {
            return <Redirect to ='/user/books' />;
        }
        return (
            <div class="wrapper">
                <form onSubmit={this.handleSubmit} className="login-form">
                	<p>Please enter a username and password if you have already registered.</p>
                	<p>If you have not, <Link to="/signup">sign up here</Link>.</p>
                	<p>If you don't want to register, you can use the guest account:</p>
                	<p>Email: guest@guest.com</p>
                	<p>Password: guest</p>
                	<div class="form-group">
                		<label>Email address*</label> <input class="login-signup-form" name="email" type="text" value={this.props.email} id="email-input" onChange={this.handleChange} />
                	</div>
                	<div class="form-group">
                		<label>Password*</label> <input class="login-signup-form" name="password" type="password" value={this.props.password} id="password-input" onChange={this.handleChange} />
                	</div>
                	{userMessage}
                	<button class="reg-form-button" id="login-form-button" type="submit">Login</button>
                </form>
            </div>
            );
    }
}

export default LoginPage;
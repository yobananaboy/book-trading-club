import React, { Component } from 'react';
import axios from 'axios';
import validator from 'validator';
import { Link, Redirect } from 'react-router-dom';

class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            this.props.signup({
                email: this.state.email,
                password: this.state.password
            });
        }
    }
    
    render() {
        let userMessage;
        if(this.state.errormessage) {
            userMessage = <p>{this.props.userMessage}</p>;
        }
        if(this.props.user) {
            return <Redirect to='/user/books' />;
        }
        
        return (
            <div class="wrapper">
                <form onSubmit={this.handleSubmit} className="signup-form">
                	<p>Please provide the info below to sign up.</p>
                	<p>If you have already registerd, <Link to="/login">log in here</Link></p>
                	<div class="form-group">
                		<label>Email address*</label> <input class="signup-signup-form" type="text" value={this.props.email} id="email-input" onChange={this.handleChange} />
                	</div>
                	<div class="form-group">
                		<label>Password*</label> <input class="signup-signup-form" type="password" value={this.props.password} id="password-input" onChange={this.handleChange} />
                	</div>
                	{userMessage}
                	<button class="reg-form-button" id="signup-form-button" type="submit">Sign up</button>
                </form>
            </div>
            );
    }
}

export default SignupPage;
import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            city: "",
            stateLocation: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentWillMount() {
        this.props.updateUserMessage('');
    }
    
    handleChange = (e) => {
        if(e.target.id === "name-input") {
            this.setState({
                name: e.target.value    
            });
        } else if (e.target.id === "city-input") {
            this.setState({
                city: e.target.value 
            });
        } else {
            this.setState({
                stateLocation: e.target.value
            });
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        let name = this.props.user.name;
        let city = this.props.user.location.city;
        let stateLocation = this.props.user.location.state;
        if(this.state.name.length > 1) {
            name = this.state.name;
        }
        if(this.state.city.length > 1) {
            city = this.state.city;
        }
        if(this.state.stateLocation.length > 1) {
            stateLocation = this.state.stateLocation;
        }
        let data = {
            name,
            city,
            state: stateLocation,
            _id: this.props.user._id
        };
        this.props.updateUser(data);
    }
    
    render() {
        let userMessage;
        if(this.props.userMessage.length > 1) {
            userMessage = <p>{this.props.userMessage}</p>;
        }
        if(!this.props.user) {
            return <div class="wrapper">
                        <p>Please <Link to="/login">log in</Link> or <Link to="/signup">sign up</Link> to update your settings.</p>
                    </div>;
        }
        return (
            <div class="wrapper">
                <form onSubmit={this.handleSubmit} className="settings-form">
                	<p>Please update your details below:</p>
                	<div class="form-group">
                		<label>Name</label> <input class="settings-signup-form" type="text" placeholder={this.props.user ? this.props.user.name : ''} value={this.state.name} id="name-input" onChange={this.handleChange} />
                	</div>
                	<div class="form-group">
                		<label>City</label> <input class="settings-signup-form" type="text" placeholder={this.props.user ? this.props.user.location.city: ''} value={this.state.city} id="city-input" onChange={this.handleChange} />
                	</div>
                	<div class="form-group">
                		<label>State</label> <input class="settings-signup-form" type="text" placeholder={this.props.user ? this.props.user.location.state : ''} value={this.state.stateLocation} id="state-input" onChange={this.handleChange} />
                	</div>
                	{userMessage}
                	<button class="reg-form-button" id="settings-form-button" type="submit">Update settings</button>
                </form>
            </div>
            );
    }
}

export default SettingsPage;
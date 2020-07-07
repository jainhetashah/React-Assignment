import React, { useState } from 'react';
import ApiFun from '../src/_Services/api'
import '../src/Css/login.css'
import { Link } from 'react-router-dom';

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: {
                email: '',
                password: '',
            }
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.getLogin = this.getLogin.bind(this);
    }
    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!this.state.email) {
            formIsValid = false;
            errors.email = "*Please enter email-address.";
        }

        if (this.state.email !== "") {
            if (!this.state.email.
                match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
                formIsValid = false;
                errors.email = "Email is not valid.";
            }
        }
        if (!this.state.password) {
            formIsValid = false;
            errors.password = "*Please enter current password.";
        }

        if (this.state.password !== "") {
            if (this.state.password.length < 8) {
                formIsValid = false;
                errors.password = "Password Must be 8 Charcters long.";
            }
        }
        this.setState({
            errors: errors
        });
        return formIsValid;

    }
    getLogin = () => {
        if (this.validateForm()) {

            ApiFun.postApi('api/login', { email: this.state.email, password: this.state.password })
                .then(Response => {

                    var responsedata = JSON.stringify(Response.data);
                    var jsondata = JSON.parse(responsedata);
                    if (Response.status && jsondata.token) {
                        alert("successfully logged in and Token is " + jsondata.token);
                        this.setState({
                            email: '',
                            password: '',
                            errors: {
                                email: '',
                                password: '',
                            }
                        });
                    }
                    else {
                        alert('Invalid user')
                    }
                }).catch((error) => {
                    alert('Login failed. Try later!');
                });
        }
      
    }

    handleEmailChange = (e) => {

        this.setState({ [e.target.name]: e.target.value });
    }
    handlePasswordChange = (e) => {

        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        const { errors } = this.state;
        return (
            <div class="bg-image">
                <div class="container ">
                    <div class="frame ">
                        <div class="nav">
                            <ul class="links">
                                <li class="signin-active"><a class="btn">Sign in</a></li>
                            </ul>
                        </div>
                        <form class="form-signin" noValidate>

                            <div className='form-group'>
                                <label>Email :</label>
                                <input type="text" name="email" class="form-styling"
                                    value={this.state.email}
                                    onChange={this.handleEmailChange} noValidate
                                />
                                <div class="Error-text" >
                                    {this.state.errors.email}</div>
                            </div>
                            <div className='form-group'>
                                <label>Password: </label>
                                <input type="password" name="password" class="form-styling"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange} noValidate
                                />
                               <div class="Error-text" >
                                    {this.state.errors.password}</div>
                            </div>
                            <div class="btn-animate">
                                <input type="button" onClick={this.getLogin} value="Sign In"
                                    class="btn-signin" />
                            </div>

                            <div class="forgot">
                                <Link to="/forget_pwd">Forgot your password?</Link>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        )
    }
}

export default Login;
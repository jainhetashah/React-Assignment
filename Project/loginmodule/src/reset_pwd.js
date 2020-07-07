import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import 'bootstrap/dist/css/bootstrap.css';
import '../src/Css/reset_pwd.css'

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};

class Reset_Pwd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentpwd: '',
            newpwd: '',
            confirmpwd: '',
            errors: {
                currentpwd: '',
                newpwd: '',
                confirmpwd: '',
            }
        }
        this.handleChange = this.handleChange.bind(this);

    }

    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!this.state.currentpwd) {
            formIsValid = false;
            errors.currentpwd = "*Please enter current password.";
        }

        if (this.state.currentpwd !== "") {
            if (this.state.currentpwd.length < 8) {
                formIsValid = false;
                errors.currentpwd = "Password Must be 8 Charcters long.";
            }
        }

        if (!this.state.newpwd) {
            formIsValid = false;
            errors.newpwd = "*Please enter new password.";
        }

        if (this.state.newpwd !== "") {
            if (this.state.newpwd.length < 8) {
                formIsValid = false;
                errors.newpwd = "Password Must be 8 Charcters long.";
            }
        }
        if (!this.state.confirmpwd) {
            formIsValid = false;
            errors.confirmpwd = "*Please enter confirm password.";
        }

        if (this.state.confirmpwd !== "") {
            if (this.state.confirmpwd.length < 8) {
                formIsValid = false;
                errors.confirmpwd = "Password Must be 8 Charcters long.";
            }
        }
        this.setState({
            errors: errors
        });
        return formIsValid;

    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    getResetPassword = () => {

        if (this.validateForm()) {
            alert("Password has been changed successfully !!");
            this.setState({
                currentpwd: '',
                newpwd: '',
                confirmpwd: '',
                errors: {
                    currentpwd: '',
                    newpwd: '',
                    confirmpwd: ''
                }

            });
            this.props.history.push('/');
        }
       
    }
    render() {
        const { errors } = this.state;
        return (
            <div class="container d-flex justify-content-center">
                <div class="d-flex flex-column justify-content-between" >
                    <div class="card mt-3 p-5">
                        <div class="logo mb-3"><img src="https://imgur.com/zydrQCr.png" /></div>
                        <div>
                            <p class="mb-1">Let's Reset Your  Password</p>
                            <h6 class="mb-5 text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                             </h6>
                        </div>
                    </div>
                    <div class="card two bg-white px-5 py-4 mb-3">
                        <div class="form-group">
                            <input type="password" class="form-control" name="currentpwd"
                                placeholder="Current Password"
                                value={this.state.currentpwd} onChange={this.handleChange} required />
                            
                            <div class="text-danger" style={{ color: "red" }}>
                                {this.state.errors.currentpwd}</div>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" name="newpwd" placeholder="New Password"
                                value={this.state.newpwd} onChange={this.handleChange} noValidate />
                            <div class="text-danger" style={{ color: "red" }}>
                                {this.state.errors.newpwd}</div>

                        </div>

                        <div class="form-group">
                            <input type="password" class="form-control" name="confirmpwd"
                                placeholder="Confirm Password" value={this.state.confirmpwd}
                                onChange={this.handleChange} noValidate />
                            <div class="text-danger" style={{ color: "red" }}>
                                {this.state.errors.confirmpwd}</div>

                        </div>

                        <button class="btn btn-primary btn-block btn-lg mt-1 mb-2" onClick={this.getResetPassword}>
                            <span>Reset Password<i class="fas fa-long-arrow-alt-right ml-2"></i></span></button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Reset_Pwd;
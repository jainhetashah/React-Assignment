import React, { useState } from 'react';
import ApiFun from '../src/_Services/api'
import '../src/Css/forget_pwd.css'
import { Link } from 'react-router-dom';
import g3 from './images/g3.jpg';
import forgetblue from './images/forgetblue.png'

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
  };  

class Forget_pwd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            errors: {               
                email: ''               
              }
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.getForgetPassword = this.getForgetPassword.bind(this);
    }
    handleEmailChange = (e) => {      
        
        this.setState({[e.target.name]: e.target.value });
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
                match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i))
                 { 
                formIsValid = false;
                errors.email = "Email is not valid.";
            }
        }
        this.setState({
            errors: errors
        });
        return formIsValid;

    }
    getForgetPassword = () => {
        if (this.validateForm())  {
              alert("Password has been sent to your email"); 
              this.setState({
                email: '',             
                errors: {
                    email: ''                  
                }             
           
           
            });
            this.props.history.push('/reset_pwd');
        }
       
    }
    render() {
        const { errors } = this.state;
        return (
            <div>
                <img src={g3} alt="snow" style={{ height: "320px", width: "100%" }} />
                <div class="centered">Forget Your Password ???
                </div>

                <form noValidate>
                    <div class="imgcontainer">
                        <img src={forgetblue} alt="Avatar" class="avatar" />
                    </div>


                    <div class="container">
                        <input type="text" placeholder="Email-Address" name="email"
                         value={this.state.email} onChange={this.handleEmailChange}  />
                       <div class="text-danger" style={{ color: "red" }}>
                                {this.state.errors.email}</div>
                        <input type="button" value="Send My Password" class="submitbtn"
                          onClick={this.getForgetPassword}/>
                    </div>
                </form>
            </div>
        )
    }
}

export default Forget_pwd;
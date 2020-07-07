import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './index.css';
// import App from './login';
import * as serviceWorker from './serviceWorker';
import Login from './login';
import Forget_pwd from './forget_pwd'
import Reset_Pwd from  './reset_pwd'

 ReactDOM.render(
      <BrowserRouter>
       <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/forget_pwd" component={Forget_pwd} />
        <Route exact path="/reset_pwd" component={Reset_Pwd} />
      </Switch>
      </BrowserRouter>,
       document.getElementById('root')
 )

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import EmployeeData from './Employee/EmployeeData'

ReactDOM.render(
  // <React.StrictMode>
  // <EmployeeData/>
  // </React.StrictMode>,
  // document.getElementById('root')
  <BrowserRouter>
<Switch>
 <Route exact path="/" component={EmployeeData} /> 
</Switch>
</BrowserRouter>,
document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

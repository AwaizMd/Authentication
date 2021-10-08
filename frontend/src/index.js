import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Home from './components/Home/Home'
import SignUp from './components/Authentication/Signup';
import SignIn from './components/Authentication/SignIn';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
       <Switch>
         <Route exact path="/" component={Home}></Route>
         <Route exact path="/signup" component={SignUp}></Route>
         <Route exact path="/login" component={SignIn}></Route>
       </Switch>
    </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

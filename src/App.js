import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Components/Screens/Login/Index'
import User from './Components/Screens/User/Index'
import { Router, Switch, Route } from "react-router-dom";
import history from './history'

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/user" component={User} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './reducers/store.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './components/Landing.jsx';
import Login from './components/Login.jsx';
import Bikes from './components/Bikes.jsx';
import StravaAuth from './components/StravaAuth.jsx'

import xDate from 'xdate';
import './style.css'

window.xDate = xDate;

render(
  <Provider store={store}>
    App wrapper 
    <Router>
      <div>

        <Route exact path="/">
          <Landing />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/stravaAuth">
          <StravaAuth />
        </Route>

        <Route exact path="/bikes">
          <Bikes />
        </Route>

      </div>
    </Router>
    
  </Provider>,
  document.getElementById('root')
);

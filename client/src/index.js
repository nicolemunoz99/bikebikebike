import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './state/store.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './components/Landing.jsx';
import Login from './components/Login.jsx';
import BikeList from './components/BikeList.jsx';
import StravaAuth from './components/StravaAuth.jsx';
import PartList from './components/PartList.jsx';

import './style.css'

//// DELETE ////
import xDate from 'xdate';
window.xDate = xDate;
import _ from 'lodash';
window._ = _;
//////

render(

  <Provider store={store}>

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
          <BikeList />
        </Route>

        <Route exact path="/bikes/:bikeId" component={PartList} />

      </div>
    </Router>
    
  </Provider>,
  document.getElementById('root')
);

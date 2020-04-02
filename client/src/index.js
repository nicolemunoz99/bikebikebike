import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './state/store.js';

import App from './components/App.jsx';

import './style.css'

//// DELETE ////
import xDate from 'xdate';
window.xDate = xDate;
import _ from 'lodash';
window._ = _;
//////

render(

  <Provider store={store}>
    
    {/* <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/stravaAuth" component={StravaAuth} />
        <Route exact path="/bikes" component={BikeList} />
        <Route exact path="/bikes/:bikeId" component={PartList} />
        <Route exact path="/modal" component={ModalWrapper} />
      </Switch>
    </Router> */}
    
    <App />


    {/* <Router>
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

        <Route path="/bikes/:bikeId">
          <PartList/>
        </Route>

        <Route path="/bikes/:bikeId/new">
          <ModalWrapper/>
        </Route>
        
      </div>
    </Router> */}
    
  </Provider>,
  document.getElementById('root')
);

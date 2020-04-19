import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './state/store.js';

import App from './components/App.jsx';

import './style.css';

//// DELETE ////
import xDate from 'xdate';
window.xDate = xDate;
import _ from 'lodash';
window._ = _;
//////

render(

  <Provider store={store}>
    
    <App />
    
  </Provider>,
  document.getElementById('root')
);

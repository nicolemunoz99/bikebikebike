import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './state/store.js';

import { App } from './components/App.jsx';

import './style.css';


render(

  <Provider store={store}>
    
    <App />
    
  </Provider>,
  document.getElementById('root')
);

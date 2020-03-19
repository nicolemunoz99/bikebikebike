import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './reducers/store.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './components/Landing.jsx';
import App from './components/App.jsx';


render(
  <Provider store={store}>
    App wrapper 
    <Router>
      <div>

        <Route exact path="/">
          <Landing />
        </Route>

        <Route exact path="/bikes">
          <App />
        </Route>

      </div>
    </Router>
    
  </Provider>,
  document.getElementById('root')
);

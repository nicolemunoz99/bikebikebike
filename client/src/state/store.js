import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers.js';

const composeEnhancers = composeWithDevTools({ 
  trace: true, 
  traceLimit: 12 
}); 

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

export default store;

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import docs from './docs';

// combine all zee reducers!
const reducer = combineReducers({
  user,
  docs,
});

// let me know when stuff happens!
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

// open for business!
const store = createStore(reducer, middleware);


// we ship nationwide!
export default store;
export * from './user';
export * from './docs';

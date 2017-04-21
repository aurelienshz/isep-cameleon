// @flow

import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

// import reducers :
import users from './data/users/reducer';

// PLEASE READ ME
// Don't forget to define, in your reducer's file, a getLocalState function that maps to the
// mount point of the reducer in the global state store.
// Use this function everywhere you need to get this specific slice of state.
// This is useful for refactoring, because it allows us
// to move the reducer without having to update everywhere the state is used.
const reducers = combineReducers({
  users,
});

export default function createChameleonStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
  return createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
}

// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

// Material UI setup
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Routes from './routes';
import chameleonReducers from './reducers';
import { deleteJson, getJson, postJson } from './services/helpers/request';

// Create the redux middleware to keep react-router in sync :
const history = createHistory();
const reduxRouterMiddleware = routerMiddleware(history);

// PLEASE READ ME
// Don't forget to define, in your reducer's file, a getLocalState function that maps to the
// mount point of the reducer in the global state store.
// Use this function everywhere you need to get this specific slice of state.
// This is useful for refactoring, because it allows us
// to move the reducer without having to update everywhere the state is used.
const reducers = combineReducers({
  ...chameleonReducers,
  router: routerReducer, // Keep me in last position
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk, reduxRouterMiddleware)));

if (window) window.request = { getJson, postJson, deleteJson };

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>
);

const DDApp = DragDropContext(HTML5Backend)(App);

ReactDOM.render(
  <DDApp />,
  document.getElementById('root')
);

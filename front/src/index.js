// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';

import createStore from './createStore';

// layout :
import Routes from './routes';

// Material UI setup
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css'; // TODO delete this file

const store = createStore();

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider /*muiTheme={muiTheme}*/>
      <Router>
        <Routes />
      </Router>
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

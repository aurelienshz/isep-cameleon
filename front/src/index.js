import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';

// layout :
import Layout from './layout/layout';

// Material UI setup
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css'; //TODO Change .CSS --> .SCSS

const App = () => (
  <MuiThemeProvider>
    <Router>
      <Route path="/" component={Layout} />
    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

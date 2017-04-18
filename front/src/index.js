// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

// layout :
import Routes from './routes';

// color :
//import colors from './colors';

// Material UI setup
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import injectTapEventPlugin from 'react-tap-event-plugin';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './index.css'; //TODO delete this file

//injectTapEventPlugin();

// Change colors for material-ui
/*const muiTheme = getMuiTheme({
  fontFamily: 'Arial',
  palette: {
    primary1Color: colors.ISEP_PRIMARY,
    primary2Color: colors.ISEP_SECONDARY,
    primary3Color: colors.ISEP_TERTIARY,
  },
});*/

const App = () => (
  <MuiThemeProvider /*muiTheme={muiTheme}*/>
    <Router>
      <Routes />
    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

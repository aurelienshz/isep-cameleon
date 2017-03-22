import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

export default function layout(props) {
  return (
    <AppBar
      title="Caméléon"
      iconElementLeft={<img style={{height: '50px',}} src="img/favicon.ico" alt="Logo" />}
      iconElementRight={<FlatButton label="login" />}
    />
  )
}

import React from 'react';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

export default function layout() {
  return (
    <AppBar
      title="Caméléon"
      iconElementLeft={<img style={{height: '50px',}} src="img/favicon.ico" alt="Logo" />}
      iconElementRight={(<FlatButton label="login" />, <FlatButton label="test" />)}
    />
  )
}

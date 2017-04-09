// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Text from 'material-ui/Text';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Avatar from 'material-ui/Avatar';

import {Route, Link} from 'react-router-dom';

// pages :
import Admin from '../pages/admin';
import Client from '../pages/client';
import Etudiant from '../pages/etudiant';

const styleSheet = createStyleSheet('ButtonAppBar', () => ({
  root: {
    position: 'relative',
    width: '100%',
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  avatar: {
  margin: 10,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function ButtonAppBar(props, context) {

  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton contrast>
            <MenuIcon />
          </IconButton>
          <Text type="title" colorInherit className={classes.flex}>Cameleon</Text>
          <Link to="/admin"><Button contrast>Admin</Button></Link>
          <Link to="/client"><Button contrast>Client</Button></Link>
          <Link to="/etudiant"><Button contrast>Étudiant</Button></Link>
          <Button contrast>S'inscrire</Button>
          <Button contrast>Se connecter</Button>
          <Route path="/admin" component={Admin} />
          <Route path="/client" component={Client} />
          <Route path="/etudiant" component={Etudiant} />
          <div className={classes.row}>
            <Avatar
              alt="Jono Hunt"
              src="img/ely.jpg"
              className={classes.avatar}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

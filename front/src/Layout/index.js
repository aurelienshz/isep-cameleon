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

import colors from '../colors';

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
    backgroundColor: colors.ISEP_PRIMARY,
  },
  flex: {
    flex: 1,
  },
  avatar: {
    margin: 10,
    border: '2px solid white',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  link: {
    textDecoration: 'none',
  },
  group: {
    display: 'flex',
  },
  detail: {
    height: '100%',
    marginRight: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  name: {
    fontSize: '20px',
    display: 'block',
    textAlign: 'right',
    textTransform: 'capitalize',
  },
  badge: {
    display: 'block',
    fontSize: '10px',
    padding: '3px 5px',
    fontWeight: 'bold',
    background: colors.ISEP_TERTIARY,
    color: colors.ISEP_PRIMARY,
    borderRadius: '3px',
    margin: '3px',
    verticalAlign: 'baseline',
  },
}));

export default function ButtonAppBar(props, context) {

  const classes = context.styleManager.render(styleSheet);
  return (
    <div>
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton contrast>
              <MenuIcon />
            </IconButton>
            <Text type="title" colorInherit className={classes.flex}>Cameleon</Text>
            <Link className={classes.link} to="/admin"><Button contrast>Admin</Button></Link>
            <Link className={classes.link} to="/client"><Button contrast>Client</Button></Link>
            <Link className={classes.link} to="/etudiant"><Button contrast>Étudiant</Button></Link>
            <Button contrast>S'inscrire</Button>
            <Button contrast>Se connecter</Button>
            <div className={classes.group}>
              <div className={classes.detail}>
                <div className={classes.name}>
                  Victor ELY
                </div>
                <div className={classes.badge}>
                  SysAdmin
                </div>
              </div>
            </div>
            <div className={classes.row}>
              <Avatar
                alt="Victor ELY"
                src="img/ely.jpg"
                className={classes.avatar}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <Route path="/admin" component={Admin} />
      <Route path="/client" component={Client} />
      <Route path="/etudiant" component={Etudiant} />
    </div>
  );
}

ButtonAppBar.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

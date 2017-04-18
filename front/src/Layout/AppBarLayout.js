// @flow

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Text from 'material-ui/Text';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';

import { Link } from 'react-router-dom';

import colors from '../colors';

import { isAuthenticated } from '../services/auth';

const styleSheet = createStyleSheet('AuthenticatedLayout', () => ({
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
    flex: '0 0 1',
    alignItems: 'center',
    display: 'flex',
  },
  subGroup: {
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


// TODO ASC more factorizing between this component and AppBarLayout
export default function AuthenticatedLayout(props, context) {
  const classes = context.styleManager.render(styleSheet);

  console.log(props);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Text type="title" colorInherit className={classes.flex}>Cameleon</Text>

            { isAuthenticated() &&
              <div className={classes.group}>
                <Link className={classes.link} to="/teacher"><Button contrast>Professeur</Button></Link>
                <Link className={classes.link} to="/client"><Button contrast>Client</Button></Link>
                <Link className={classes.link} to="/etudiant"><Button contrast>Étudiant</Button></Link>
                <div className={classes.subGroup}>
                  <div className={classes.detail}>
                    <div className={classes.name}>
                      Victor ELY
                    </div>
                    <div className={classes.badge}>
                      Grand vizir
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
              </div>
            }

          </Toolbar>
        </AppBar>
      </div>

      { props.children }

    </div>
  );
}

AuthenticatedLayout.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

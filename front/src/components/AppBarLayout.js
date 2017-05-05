// @flow

import React from 'react';
import {connect} from 'react-redux';
import {createStyleSheet} from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import { Menu, MenuItem } from 'material-ui/Menu';

import {Link,NavLink} from 'react-router-dom';

import colors from '../colors';

import {isAuthenticated} from '../data/users/auth';
import {logoutAction, fetchProfile, getLocalState as getUserState} from '../data/users/reducer';
import {fetchPromotion, getLocalState as getPromotionState} from '../data/promotion/reducer';

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
  menu: {},
  content: {
    margin: 0,
  },
}));


class AppBarLayout extends React.Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    anchorEl: undefined,
    open: false,
  };

  handleClick = (event) => this.setState({ open: true, anchorEl: event.currentTarget });

  handleRequestClose = () => this.setState({ open: false });

  componentWillMount() {
    this.props.fetchPromotion();
    if (!this.isProfileLoaded()) {
      this.props.loadProfile();
    }
  }

  isProfileLoaded = () => {
    const profile = this.props.profile;
    return Boolean(profile) && Boolean(profile.firstName) && Boolean(profile.lastName);
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    const { logout, awaitingProfile, profile, awaitingPromotion } = this.props;

    return (
      <div style={{height: '100%', width: '100%'}}>
        <div className={classes.root}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography type="title" colorInherit className={classes.flex}>Cameleon</Typography>

              { isAuthenticated() &&
              <div className={classes.group}>
                <Link className={classes.link} to="/teacher"><Button contrast>Professeur</Button></Link>
                <Link className={classes.link} to="/client"><Button contrast>Client</Button></Link>

                <Link className={classes.link} to="/student"><Button contrast>Étudiant</Button></Link>
                <div className={classes.subGroup}>
                  <div className={classes.detail}>
                    <div className={classes.name} onClick={this.handleClick}>
                      {
                        this.isProfileLoaded() && !awaitingProfile ?
                          profile.firstName + ' ' + profile.lastName
                          :
                          'Chargement...'
                      }
                    </div>
                    <div className={classes.badge} title="Rôle de l'utilisateur">
                      Déconnexion
                    </div>
                  </div>
                </div>
                <div className={classes.row}>
                  <Avatar
                    alt="Victor ELY"
                    src="/img/ely.jpg"
                    className={classes.avatar}
                    onClick={this.handleClick}
                  />
                  <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    className={classes.menu}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                  >
                    <NavLink className={classes.link} to="/profil" onClick={this.handleRequestClose}><MenuItem >Mon profil</MenuItem></NavLink>
                    <MenuItem onClick={logout} title="Cliquez ici pour vous déconnecter">Déconnexion</MenuItem>
                  </Menu>
                </div>
              </div>
              }

            </Toolbar>
          </AppBar>
        </div>

        { awaitingPromotion ?
            "Loading promotion..."
          :
            this.props.children
        }

      </div>
    );
  }
}

export default connect((state) => {
  const userState = getUserState(state);
  const promotionState = getPromotionState(state);
  return {
    awaitingProfile: userState.awaitingProfile,
    profile: userState.profile,
    awaitingPromotion: promotionState.loading,
    promotion: promotionState.promotion,
  };
}, (dispatch) => {
  return {
    loadProfile: () => dispatch(fetchProfile()),
    logout: () => dispatch(logoutAction()),
    fetchPromotion: () => dispatch(fetchPromotion()),
  };
})(AppBarLayout);

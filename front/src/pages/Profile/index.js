// @flow

import React from 'react';
import {connect} from 'react-redux';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Loader from '../../components/Loader.js';
import 'react-infinite-calendar/styles.css';

import { isAuthenticated } from '../../data/users/service';
import { logoutAction, fetchProfile, getLocalState as getUserState } from '../../data/users/reducer';
import { fetchPromotion } from '../../data/promotion/reducer';

import colors from '../../colors.js';

const STYLE_CONTAINER = {
  padding: 20,
};

const STYLE_PROFILE_HEADER = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginBottom: '20px',
};

const STYLE_AVATAR = {
  width: '100px',
  height: '100px',
  background: '#F3F3F3',
  border: '3px solid #005580',
  marginRight: '30px',
};

const STYLE_INFO = {
  color: '#005580',
  marginBottom: '5px',
};

const STYLE_BUTTON = {
  backgroundColor: colors.ISEP_SECONDARY,
  color: colors.ISEP_TERTIARY,
  marginLeft: 'auto',
};

const STYLE_SEC = {
  marginBottom: '20px',
};

const STYLE_TITLE_CAPS = {
  textTransform: 'uppercase',
  fontSize: '20px',
  padding: '10px 0',
  color: colors.ISEP_PRIMARY,
};

const STYLE_INFO_TABLE = {
  marginBottom: '20px',
};

const STYLE_INFO_TABLE_TR = {
  lineHeight: '23px',
};

const STYLE_INFO_TABLE_TH = {
  textAlign: 'right',
  paddingRight: '10px',
};

class Profil extends React.Component {

  state = {
    open: false,
  };

  handleRequestClose = () => this.setState({ open: false });

  handleOpen = () => this.setState({ open: true });

  fetchProfileAndPromotion = () => {
    if(isAuthenticated()) this.props.fetchPromotion();

    if (isAuthenticated() && !this.isProfileLoaded()) {
      this.props.loadProfile();
    }
  };

  componentWillMount() {
    this.fetchProfileAndPromotion();
  }

  componentWillReceiveProps(props) {
    // if (props.profile !== this.props.profile) this.fetchProfileAndPromotion();
  }

  isProfileLoaded = () => {
    const profile = this.props.profile;
    return Boolean(profile) && Boolean(profile.firstName) && Boolean(profile.lastName) && Boolean(profile.mail);
  };

  logout = () => {
    this.setState({ open: false });
    this.props.logout();
  };

  render() {
    const { awaitingProfile, profile } = this.props;
    return (
      <div style={STYLE_CONTAINER}>
        <h1>Profil</h1>
        <div style={STYLE_PROFILE_HEADER}>
          <Avatar
            alt="Photo de profil"
            src={
              !awaitingProfile && profile.isepNumber ?
              `http://storage.iseplive.fr/avatars/95/`+profile.isepNumber+`.jpg`
              :
              "/img/avatar.jpg"
            }
            style={STYLE_AVATAR}
          />
          <div>
            <h1 style={STYLE_INFO}>
              { this.isProfileLoaded() ? `${profile.firstName} ${profile.lastName}` : "Chargement..." }
            </h1>
          </div>
          <Button onClick={this.logout} style={STYLE_BUTTON}>Déconnexion</Button>
        </div>
        <div style={STYLE_SEC}>
          <h2 style={STYLE_TITLE_CAPS}>Mes informations</h2>
          <table style={STYLE_INFO_TABLE}>
            <tbody>
              <tr style={STYLE_INFO_TABLE_TR}>
                <th style={STYLE_INFO_TABLE_TH}>
                  Numéro étudiant
                </th>
                <td>
                  {
                    this.isProfileLoaded() && !awaitingProfile ?
                    profile.isepNumber
                    :
                    <Loader />
                  }
                </td>
              </tr>
              <tr style={STYLE_INFO_TABLE_TR}>
                <th style={STYLE_INFO_TABLE_TH}>
                  Nom d'utilisateur
                </th>
                <td>
                  {
                    this.isProfileLoaded() && !awaitingProfile ?
                    profile.firstName + ' ' + profile.lastName
                    :
                    <Loader />
                  }
                </td>
              </tr>
              <tr style={STYLE_INFO_TABLE_TR}>
                <th style={STYLE_INFO_TABLE_TH}>
                  Email
                </th>
                <td>
                  {
                    this.isProfileLoaded() && !awaitingProfile ?
                    profile.mail
                    :
                    <Loader />
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  const userState = getUserState(state);
  return {
    awaitingProfile: userState.awaitingProfile,
    profile: userState.profile,
  };
}, (dispatch) => {
  return {
    loadProfile: () => dispatch(fetchProfile()),
    logout: () => dispatch(logoutAction()),
    fetchPromotion: () => dispatch(fetchPromotion()),
  };
})(Profil);

// @flow

import React from 'react';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import { Dialog } from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

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

const STYLE_BUTTON_MODAL = {
  display: 'inline-block',
  verticalAlign: 'bottom',
  fontSize: '13px',
  padding: '5px',
  float: 'right',
  margin: 0,
  fontWeight: 'bold',
  backgroundColor: colors.ISEP_SECONDARY,
  color: colors.ISEP_TERTIARY,
};

const STYLE_APPBAR = {
  position: 'relative',
  backgroundColor: colors.ISEP_PRIMARY,
};

const STYLE_FLEX = {
  flex: 1,
};

const STYLE_INPUT = {
  margin: 20,
};

const STYLE_BUTTON_ONMODAL = {
  width: '10%',
  marginLeft: '45%',
  backgroundColor: colors.ISEP_SECONDARY,
  color: colors.ISEP_TERTIARY,
};


export default class Profil extends React.Component {

  state = {
    open: false,
  };

  handleRequestClose = () => this.setState({ open: false });

  handleOpen = () => this.setState({ open: true });

  render() {
    return (
      <div style={STYLE_CONTAINER}>
        <h1>Profil</h1>
        <div style={STYLE_PROFILE_HEADER}>
          <Avatar
            alt="Victor ELY"
            src="/img/ely.jpg"
            style={STYLE_AVATAR}
          />
          <div>
            <h1 style={STYLE_INFO}>Victor ELY</h1>
          </div>
          <Button style={STYLE_BUTTON}>Déconnexion</Button>
          <Dialog
            fullScreen
            open={this.state.open}
            onRequestClose={this.handleRequestClose}
            transition={<Slide direction="up" />}
          >
            <AppBar style={STYLE_APPBAR}>
              <Toolbar>
                <IconButton contrast onClick={this.handleRequestClose}>
                  <CloseIcon />
                </IconButton>
                <Typography type="title" colorInherit style={STYLE_FLEX}>
                  Modifier mes informations
                </Typography>
              </Toolbar>
            </AppBar>
            <div style={STYLE_INPUT}>
              <Typography>Email</Typography>
              <TextField
                id="Email"
                label="Modifier votre email"
              />
              <Typography>Adresse</Typography>
              <TextField
                id="Adresse"
                label="Modifier votre adresse"
              />
              <Typography>Téléphone</Typography>
              <TextField
                id="Téléphone"
                label="Modifier votre numéro de téléphone"
              />
              <Typography>Date de naissance</Typography>
              <InfiniteCalendar
                width={300}
                height={300}
              />
            </div>
            <Button style={STYLE_BUTTON_ONMODAL} onClick={this.handleRequestClose}>Enregistrer</Button>
          </Dialog>
        </div>
        <div style={STYLE_SEC}>
          <h2 style={STYLE_TITLE_CAPS}>Mes informations</h2>
          <Button onClick={this.handleOpen} style={STYLE_BUTTON_MODAL}>
          Éditer
          </Button>
          <table style={STYLE_INFO_TABLE}>
            <tbody>
              <tr style={STYLE_INFO_TABLE_TR}>
                <th style={STYLE_INFO_TABLE_TH}>
                  Nom d'utilisateur
                </th>
                <td>
                  victorely
                </td>
              </tr>
              <tr style={STYLE_INFO_TABLE_TR}>
                <th style={STYLE_INFO_TABLE_TH}>
                  Email
                </th>
                <td>
                  victor.ely@orange.fr
                </td>
              </tr>
              <tr style={STYLE_INFO_TABLE_TR}>
                <th style={STYLE_INFO_TABLE_TH}>
                  Date de naissance
                </th>
                <td>
                  28/01/2017
                </td>
              </tr>
              <tr style={STYLE_INFO_TABLE_TR}>
                <th style={STYLE_INFO_TABLE_TH}>
                  Adresse
                </th>
                <td>
                  9, boulevard de Dixmude 75017 PARIS
                </td>
              </tr>
              <tr style={STYLE_INFO_TABLE_TR}>
                <th style={STYLE_INFO_TABLE_TH}>
                  Tel
                </th>
                <td>
                  0670767380
                </td>
              </tr>
              <tr style={STYLE_INFO_TABLE_TR}>
                <th style={STYLE_INFO_TABLE_TH}>
                  Promotion
                </th>
                <td>
                  2018
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

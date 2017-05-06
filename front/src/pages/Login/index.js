// @flow

import React from 'react';
import {connect} from 'react-redux';
import {createStyleSheet} from 'jss-theme-reactor';
import {Redirect} from 'react-router';

import customPropTypes from 'material-ui/utils/customPropTypes';
import Paper from 'material-ui/Paper';
import Layout from 'material-ui/Layout';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Loader from '../../components/Loader.js';

import { submitLoginAction, getLocalState as getUsersState } from '../../data/users/reducer';
import { isAuthenticated } from '../../data/users/service';

const styleSheet = createStyleSheet('GuttersLayout', () => {
  return {
    root: {
      width: '100%',
      maxWidth: 800,
      margin: '0 auto',
      height: '80%',
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: 12,
    },
  };
});

class LoginPage extends React.Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  }

  state = {
    isepLogin: "",
    isepPassword: "",
    externalLogin: "",
    externalPassword: "",
  };

  submitIsepLogin = () => {
    const {isepLogin, isepPassword} = this.state;
    this.props.submitLogin(isepLogin, isepPassword);
  };

  submitExternalLogin = () => {
    const {externalLogin, externalPassword} = this.state;
    this.props.submitLogin(externalLogin, externalPassword);
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    const { awaitingToken, error } = this.props;

    if (isAuthenticated()) {
      return <Redirect to="/subject"/>
    }
    return (
      <Layout container gutter={40} align="center" justify="center" className={classes.root}>
        <Layout item xs={12} sm={6}>
          <Paper>
            <Layout>
              <Typography type="headline">
                Authentification ISEP
              </Typography>
              <Typography type="body1">
                Utilisez ce formulaire pour vous connecter si vous possédez des identifiants ISEP.
              </Typography>

              {
                error &&
                <Typography type="body1">
                  {error.message}
                </Typography>
              }

              <Divider/>

              {
                awaitingToken ?
                  <Layout>
                    <Typography><Loader/></Typography>
                  </Layout>
                  :
                  <Layout>
                    <TextField
                      label="Login ISEP"
                      value={this.state.isepLogin}
                      onChange={(event) => this.setState({isepLogin: event.target.value})} />
                    <TextField
                      label="Mot de passe ISEP"
                      type="password"
                      value={this.state.isepPassword}
                      onChange={(event) => this.setState({isepPassword: event.target.value})} />
                    <Button raised primary onClick={this.submitIsepLogin}>Valider</Button>
                  </Layout>
              }
            </Layout>
          </Paper>
        </Layout>
        <Layout item xs={12} sm={6}>
          <Paper>
            <Typography type="headline">
              Authentification extérieure
            </Typography>
            <Typography type="body1">
              Utilisez ce formulaire pour vous connecter avec les identifiants qui vous ont été fournis.
            </Typography>


            <Divider/>

            <TextField
              label="Login"
              value={this.state.externalLogin}
              onChange={(event) => this.setState({externalLogin: event.target.value})}
            />

            <TextField
              label="Mot de passe"
              type="password"
              value={this.state.externalPassword}
              onChange={(event) => this.setState({externalPassword: event.target.value})}
            />

            <Button raised primary onClick={this.submitExternalLogin}>Valider</Button>
          </Paper>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const usersState = getUsersState(state);
  const { awaitingToken, error } = usersState;
  return {
    awaitingToken,
    error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    submitLogin: (login, password) => dispatch(submitLoginAction({login, password}))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)

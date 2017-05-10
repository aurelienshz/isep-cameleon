// @flow

import React from 'react';
import {connect} from 'react-redux';
import {createStyleSheet} from 'jss-theme-reactor';
import {Redirect} from 'react-router';

import customPropTypes from 'material-ui/utils/customPropTypes';
import Typography from 'material-ui/Typography';
import Loader from '../../components/Loader.js';
import Grid from 'material-ui/Grid';

import { submitLoginAction, getLocalState as getUsersState } from '../../data/users/reducer';
import { isAuthenticated } from '../../data/users/service';

import colors from '../../colors.js';

const styleSheet = createStyleSheet('GuttersLayout', () => {
  return {
    root: {
      margin: '0 auto',
      flexGrow: 1,
    },
    background: {
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundImage: 'url("img/background.jpg")',
    },
    layout: {
      boxSizing: 'border-box',
      padding: 0,
      margin: 0,
    },
    sticky: {
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
    },
    footer: {
      padding: '10px',
      textAlign: 'center',
      color: colors.ISEP_TERTIARY,
      fontSize: '.8em',
    },
    content: {
      flex: 1,
    },
    card: {
      maxWidth: '350px',
      margin: '50px auto',
      marginTop: '100px',
      padding: '15px',
      borderRadius: '5px',
      background: '#f3f3f3',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      color: colors.ISEP_PRIMARY,
    },
    form: {
      display: 'block',
    },
    input: {
      width: '100%',
      border: 'none',
      padding: '10px',
      fontSize: '1em',
      outline: 'none',
      marginBottom: '10px',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },
    button: {
      background: colors.ISEP_PRIMARY,
      color: 'white',
      cursor: 'pointer',
      width: '100%',
      border: 'none',
      padding: '10px',
      display: 'block',
      textAlign: 'center',
      fontSize: '1.2em',
      borderRadius: '4px',
      outline: 'none',
      '&:hover': {
        background: colors.ISEP_PRIMARY_LIGHTER,
      }
    },
    link: {
      display: 'inline-block',
      color: '#7a7a7a',
      marginBottom: '10px',
      padding: '5px 7px',
      background: '#E5E5E5',
      borderRadius: '5px',
      fontSize: '13px',
      lineHeight: 1,
      cursor: 'pointer',
      textDecoration: 'none',
    },
    h1: {
      textAlign: 'center',
      color: colors.ISEP_TERTIARY,
    },
  };
});

class LoginPage extends React.Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

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
      <div className={classes.background}>
        <div className={classes.layout}>
          <div className={classes.sticky}>
            <h1 className={classes.h1}>Chameleon</h1>
            <div className={classes.content}>
              <Grid container gutter={40} className={classes.root}>
                <Grid item xs={12} sm={6}>
                  <div className={classes.card}>
                    <h1 className={classes.title}>Authentification ISEP</h1>
                    <div className={classes.form}>
                      <input className={classes.input} placeholder='Login' value={this.state.isepLogin} onChange={(event) => this.setState({isepLogin: event.target.value})}></input>
                      <input className={classes.input} placeholder='Password' value={this.state.isepPassword} onChange={(event) => this.setState({isepPassword: event.target.value})}></input>
                      <a className={classes.link} href='https://moncompte.isep.fr/login.php'> Mot de passe oublié ? </a>
                      <button className={classes.button} onClick={this.submitIsepLogin}> Connexion </button>
                      {
                        error &&
                        <Typography type="body1" style={{color: 'red'}}>
                          {error.message}
                        </Typography>
                      }
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className={classes.card}>
                    <h1 className={classes.title}>Authentification extérieure</h1>
                    <div className={classes.form}>
                      <input className={classes.input} placeholder='Login' value={this.state.externalLogin} onChange={(event) => this.setState({externalLogin: event.target.value})}></input>
                      <input className={classes.input} placeholder='Password' value={this.state.externalPassword} onChange={(event) => this.setState({externalPassword: event.target.value})}></input>
                      <a className={classes.link}> Mot de passe oublié ? </a>
                      <button className={classes.button} onClick={this.submitExternalLogin}> Connexion </button>
                      {
                        error &&
                        <Typography type="body1" style={{color: 'red'}}>
                          {error.message}
                        </Typography>
                      }
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
            <footer className={classes.footer}> Copyright © 2017 ISEP All Rights Reserved. </footer>
          </div>
        </div>
      </div>
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

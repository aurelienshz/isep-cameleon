// @flow

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import AppBarLayout from './components/AppBarLayout';
import AuthenticatedRoute from "./components/AuthenticatedRoute";

// pages :
import Login from './pages/Login';
import Subject from './pages/Subject';
import Profile from './pages/Profile';
import Team from './pages/Team';
import Promotion from './pages/Promotion';

const STYLE_404 = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  marginLeft: '-285px',
  marginTop: '-190px',
};

const NotFound = () => (
  <div><img src="/img/404.jpg" alt="Page Not Found (404)." style={STYLE_404} /></div>
);

function Routes() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <AppBarLayout>
        <Switch>
          <Redirect path="/" exact to="/login" />
          <Route path="/login" component={Login} />
          <AuthenticatedRoute path="/profil" component={Profile} />
          <AuthenticatedRoute path="/subject" component={Subject} />
          <AuthenticatedRoute path="/team" component={Team} />
          <AuthenticatedRoute path="/promotion" component={Promotion} />
          <NotFound />
        </Switch>
      </AppBarLayout>
    </div>
  );
}

export default Routes;

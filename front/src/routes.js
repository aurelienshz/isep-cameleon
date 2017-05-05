// @flow

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import AppBarLayout from './components/AppBarLayout';
import AuthenticatedRoute from "./components/AuthenticatedRoute";

// pages :
import Login from './pages/Login';
import Teacher from './pages/Teacher';
import Etudiant from './pages/Student';
import Subject from './pages/Subject';
import Profile from './pages/Profil';
import Team from './pages/Team';

const NotFound = () => (
  <div>Not found :'(</div>
);

function Routes() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <AppBarLayout>
        <Switch>
          <Redirect path="/" exact to="/login" />
          <Route path="/login" component={Login} />
          <AuthenticatedRoute path="/teacher" component={Teacher} />
          <AuthenticatedRoute path="/student" component={Etudiant} />
          <AuthenticatedRoute path="/profil" component={Profile} />
          <AuthenticatedRoute path="/subject" component={Subject} />
          <AuthenticatedRoute path="/team" component={Team} />
          <NotFound />
        </Switch>
      </AppBarLayout>
    </div>
  );
}

export default Routes;

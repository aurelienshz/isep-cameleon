// @flow

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import AppBarLayout from './components/AppBarLayout';
import AuthenticatedRoute from "./components/AuthenticatedRoute";

// pages :
import Login from './pages/Login';
import Teacher from './pages/Teacher';
import Client from './pages/Client';
import Etudiant from './pages/Student';
import Profil from './pages/Profil';

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
          <AuthenticatedRoute path="/client" component={Client} />
          <AuthenticatedRoute path="/student" component={Etudiant} />
          <AuthenticatedRoute path="/profil" component={Profil} />
          <NotFound />
        </Switch>
      </AppBarLayout>
    </div>
  );
}

export default Routes;

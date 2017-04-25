// @flow

import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import AppBarLayout from './components/AppBarLayout';
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import { getLocalState as getUsersState } from "./data/users/reducer";

// pages :
import Login from './pages/Login';
import Teacher from './pages/teacher';
import Client from './pages/client';
import Etudiant from './pages/Student';

function Routes() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <AppBarLayout>
        <Route path="/login" component={Login} />
        <AuthenticatedRoute path="/teacher" component={Teacher} />
        <AuthenticatedRoute path="/client" component={Client} />
        <AuthenticatedRoute path="/student" component={Etudiant} />
      </AppBarLayout>
    </div>
  );
}

export default Routes;

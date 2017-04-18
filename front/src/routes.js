// @flow

import React from 'react';
import { Route, Link } from 'react-router-dom';

import AppBarLayout from './Layout/AppBarLayout';
import { isAuthenticated } from './services/auth';
import AuthenticatedRoute from "./Layout/AuthenticatedRoute";

import colors from './colors';

// pages :
import Login from './pages/Login';
import Teacher from './pages/teacher';
import Client from './pages/client';
import Etudiant from './pages/etudiant';

export default function Routes() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <AppBarLayout>
        <Route path="/login" component={Login} />
        <AuthenticatedRoute path="/teacher" component={Teacher} />
        <AuthenticatedRoute path="/client" component={Client} />
        <AuthenticatedRoute path="/etudiant" component={Etudiant} />
      </AppBarLayout>
    </div>
  );
}

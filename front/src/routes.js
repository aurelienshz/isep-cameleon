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
import Etudiant from './pages/etudiant';

function Routes({accessToken}) {
  console.log("Rendering routes");
  const authenticated = true;
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <AppBarLayout>
        <Route path="/login" component={Login} />
        <AuthenticatedRoute path="/teacher" component={Teacher} authenticated={authenticated} />
        <AuthenticatedRoute path="/client" component={Client} authenticated={authenticated} />
        <AuthenticatedRoute path="/etudiant" component={Etudiant} authenticated={authenticated} />
      </AppBarLayout>
    </div>
  );
}

export default Routes;
// export default connect((state) => {
//   const usersState = getUsersState(state);
//   return {
//     accessToken: usersState.accessToken,
//   };
// })(Routes);

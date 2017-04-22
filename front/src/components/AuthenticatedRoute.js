// @flow

import React from 'react';
import { Route, Redirect } from 'react-router';
import { isAuthenticated } from "../data/users/auth";

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const authenticated = isAuthenticated();
  return (
    <Route {...rest} render={props => (
      authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )}/>
  );
};

export default AuthenticatedRoute;

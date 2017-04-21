// @flow

import React from 'react';
import { Route, Redirect } from 'react-router';

const AuthenticatedRoute = ({ component: Component, authenticated, ...rest }) => {
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

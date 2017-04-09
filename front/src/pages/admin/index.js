import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Equipe from './equipe';
import Sujet from './sujet';

export default class Admin extends React.Component {
  render() {
    const {match} = this.props;

    return (
      <div>
        <Switch>
          <Route path={`${match.url}/sujet`} component={Sujet} />
          <Route path={`${match.url}/equipe`} component={Equipe} />
        </Switch>
      </div>
    );
  }
}

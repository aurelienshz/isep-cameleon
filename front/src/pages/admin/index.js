import React from 'react';
import {Switch, Route} from 'react-router-dom';

const page = () => {
  return <div>Coucou</div>
};

export default class Admin extends React.Component {
  render() {
    const {match} = this.props;

    return (
      <div>
        <Switch>
          <Route path={`${match.url}/sujet`} component={page} />
          <Route path={`${match.url}/equipe`} component={page} />
        </Switch>
      </div>
    );
  }
}

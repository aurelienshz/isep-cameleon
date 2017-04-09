import React from 'react';
import {Switch, Route} from 'react-router-dom';

const page = () => {
  return <div>Coucou</div>
};

export default class Client extends React.Component {
  render() {
    const {match} = this.props;

    return (
      <div>
        <Switch>
          <Route path={`${match.url}/test1`} component={page} />
          <Route path={`${match.url}/test2`} component={page} />
        </Switch>
      </div>
    );
  }
}

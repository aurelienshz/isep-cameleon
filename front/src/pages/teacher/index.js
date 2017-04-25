// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {createStyleSheet} from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import {BottomNavigation, BottomNavigationButton} from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import FavoriteIcon from 'material-ui-icons/Favorite';

// pages
import Equipe from './equipe';
import Sujet from './sujet';
import NewPromo from './new-promo';
import Promo from './promo';

const styleSheet = createStyleSheet('BottomNavigation', () => ({
  root: {
    textAlign: 'center',
  },
}));

export default class Teacher extends React.Component {
  state = {
    index: 0,
  };

  handleChange = (event, index) => {
    this.setState({
      index
    });
  };

  // Returns an event handler :
  transitionTo = (path) => {
    return () => {
      const {url} = this.props.match;
      this.props.history.push(url + path); // TODO urljoin
    }
  }

  render() {
    const { match } = this.props;
    const { index } = this.state;
    const classes = this.context.styleManager.render(styleSheet);


    return (
      <div>
        <div className={classes.root}>
          <BottomNavigation
            index={index}
            onChange={this.handleChange}
            showLabels>
            <BottomNavigationButton
              label="Sujets"
              onClick={this.transitionTo("/subject")}
              icon={<RestoreIcon />}
            />
            <BottomNavigationButton
              label="Équipes"
              onClick={this.transitionTo("/team")}
              icon={<FavoriteIcon />} />
            <BottomNavigationButton
              label="Promo"
              onClick={this.transitionTo("/promo")}
              icon={<FavoriteIcon />} />
          </BottomNavigation>
        </div>
        <Switch>
          <Route path={`${match.url}/subject`} component={Sujet} />
          <Route path={`${match.url}/team`} component={Equipe} />
          <Route path={`${match.url}/promo`} component={Promo} />
          <Route path={`${match.url}/new-promo`} component={NewPromo} />
        </Switch>
      </div>
    );
  }
}

Teacher.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

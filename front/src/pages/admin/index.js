// @flow

import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import {createStyleSheet} from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import {BottomNavigation, BottomNavigationButton} from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import FavoriteIcon from 'material-ui-icons/Favorite';

// pages
import Equipe from './equipe';
import Sujet from './sujet';

const styleSheet = createStyleSheet('BottomNavigation', () => ({
  root: {
    textAlign: 'center',
  },
}));

export default class Admin extends React.Component {
  state = {
    index: 0,
  };

  handleChange = (event, index) => {
    this.setState({ index });
  };

  render() {
    const {match} = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    const {index} = this.state;

    return (
      <div>
        <div className={classes.root}>
          <BottomNavigation
            index={index}
            onChange={this.handleChange}
            showLabels
          >
            <BottomNavigationButton
              label="Sujet"
              icon={<RestoreIcon />}
            />
            <BottomNavigationButton
              label="Equipe"
              icon={<FavoriteIcon />}
            />
          </BottomNavigation>
        </div>
        <Switch>
          <Route path={`${match.url}/sujet`} component={Sujet} />
          <Route path={`${match.url}/equipe`} component={Equipe} />
        </Switch>
      </div>
    );
  }
}

Admin.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

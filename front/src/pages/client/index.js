// @flow

import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';
import PhoneIcon from 'material-ui-icons/Phone';
import FavoriteIcon from 'material-ui-icons/Favorite';
import PersonPinIcon from 'material-ui-icons/PersonPin';
import HelpIcon from 'material-ui-icons/Help';
import ShoppingBasket from 'material-ui-icons/ShoppingBasket';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ThumbUp from 'material-ui-icons/ThumbUp';

import colors from '../../colors.js';

// pages
import Equipe from './equipe';
import Sujet from './sujet';

const styleSheet = createStyleSheet('ScrollableTabsButtonForce', () => ({
  root: {
    width: '100%',
  },
  appBar: {
    backgroundColor: colors.ISEP_PRIMARY_Lighter,
  },
  white: {
    color: colors.ISEP_TERTIARY,
  },
}));

export default class ScrollableTabsButtonForce extends Component {
  state = {
    index: 0,
  };

  handleChange = (event, index) => {
    this.setState({ index });
  }

  // Returns an event handler :
  transitionTo = (path) => {
    return () => {
      const {url} = this.props.match;
      this.props.history.push(url + path); // TODO urljoin
    }
  }

  render() {
    const {match} = this.props;
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div>
        <Paper className={classes.root}>
          <div className={classes.appBar}>
            <Tabs
              index={this.state.index}
              onChange={this.handleChange}
              scrollable
              scrollButtons="on"
              textColor="accent"
            >
              <Tab className={classes.white} label="Sujet" icon={<PhoneIcon />} onClick={this.transitionTo("/subject")}/>
              <Tab className={classes.white} label="Equipe" icon={<FavoriteIcon onClick={this.transitionTo("/team")}/>} />
            </Tabs>
          </div>
        </Paper>
        <Switch>
          <Route path={`${match.url}/subject`} component={Sujet} />
          <Route path={`${match.url}/team`} component={Equipe} />
        </Switch>
      </div>
    );
  }
}

ScrollableTabsButtonForce.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

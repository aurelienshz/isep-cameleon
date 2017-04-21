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

const styleSheet = createStyleSheet('ClientPage', () => ({
  root: {
    width: '100%',
  },
  appBar: {
    backgroundColor: colors.ISEP_PRIMARY_LIGHTER,
  },
  white: {
    color: colors.ISEP_TERTIARY,
  },
}));

const tabs = [
  {
    label: "Sujet",
    path: "/subject",
    icon: PhoneIcon,
  },
  {
    label: "Équipe",
    path: "/team",
    icon: FavoriteIcon,
  },
];

export default class ClientPage extends Component {
  state = {
    index: 0,
  };

  componentDidMount() {
    this.transitionTo(tabs[this.state.index].path); // TODO with a redirect exact plz
  }

  handleChange = (event, index) => {
    this.transitionTo(tabs[index].path);
    this.setState({ index });
  };

  transitionTo = (path) => {
    const {url} = this.props.match;
    this.props.history.push(url + path); // TODO urljoin
  };

  render() {
    console.log("I was rendered");

    const {match} = this.props;
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div>
        <Paper className={classes.root}>
          <div className={classes.appBar}>
            <Tabs
              indicatorColor={ colors.ISEP_SECONDARY }
              index={this.state.index}
              onChange={this.handleChange}
              scrollable
              scrollButtons="on"
              textColor="accent">
              {
                tabs.map((tab, index) => {
                  const { label, icon: Icon } = tab;
                  return (
                    <Tab
                      key={index}
                      className={classes.white}
                      label={label}
                      icon={<Icon />} />
                  );
                })
              }
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

ClientPage.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

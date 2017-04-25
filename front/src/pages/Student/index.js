// @flow

import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';

import colors from '../../colors.js';

import Subject from './Subject';

// pages
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
  },
  {
    label: "Équipe",
    path: "/team",
  },
];

export default class StudentPage extends Component {
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
                  return (
                    <Tab
                      key={index}
                      className={classes.white}
                      label={tab.label} />
                  );
                })
              }
            </Tabs>
          </div>
        </Paper>

        <Switch>
          <Route path={`${match.url}/subject`} component={Subject} />
          <Route path={`${match.url}/team`} component={() => (<div>swag</div>)} />
        </Switch>
      </div>
    );
  }
}

StudentPage.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

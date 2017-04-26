// @flow

import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';

import colors from '../colors.js';

type Props = {
  tabs: Array<{
    label: string,
    path: string,
    component: React.Component,
  }>,
  baseLocation: string,
}

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

class TabsLayout extends React.Component {
  props: Props;

  state = {
    index: 0, // TODO selectedTabIndex
  };

  componentDidMount() {
    this.transitionTo(this.props.tabs[this.state.index].path);
  }

  handleChange = (event, index) => {
    this.setState({ index });
    this.transitionTo(this.props.tabs[index].path);
  };

  transitionTo = (path) => {
    const baseLocation = this.props.baseLocation;
    this.props.pushLocation(baseLocation + path); // TODO urljoin
  };

  render() {
    const {baseLocation, tabs} = this.props;
    const styles = this.context.styleManager.render(styleSheet);

    return (
      <div>
        <Paper className={styles.root}>
          <div className={styles.appBar}>
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
                      className={styles.white}
                      label={tab.label} />
                  );
                })
              }
            </Tabs>
          </div>
        </Paper>

        <Switch>
          {
            tabs.map((tab, index) => {
              console.log(`${baseLocation}${tab.path}`);
              return (
                <Route key={index} path={`${baseLocation}${tab.path}`} component={tab.component} />
              )
            })
          }
        </Switch>
      </div>
    );
  }
}

TabsLayout.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default connect(
  (state) => {
    return {
      router: state.router,
    };
  },
  (dispatch) => {
    return {
      pushLocation: (location) => dispatch(push(location)),
    };
  }
)(TabsLayout);

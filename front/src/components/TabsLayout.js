// @flow

import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';

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
    backgroundColor: 'white',
  },
  tab: {
    color: colors.ISEP_PRIMARY,
  },
}));

class TabsLayout extends React.Component {
  props: Props;

  handleChange = (event, index) => {
    this.transitionTo(this.props.tabs[index].path);
  };

  transitionTo = (path) => {
    const baseLocation = this.props.baseLocation;
    this.props.replaceLocation(baseLocation + path); // TODO urljoin
  };

  componentWillMount() {
    const { baseLocation, tabs, router } = this.props;

    const pathname = router.location.pathname;
    const activeTabIndex = this.props.tabs.findIndex(tab => {
      return pathname.startsWith(baseLocation + tab.path);
    });

    if (activeTabIndex === -1) this.transitionTo(tabs[0].path);
  }

  render() {
    const { baseLocation, tabs, router, ...otherProps } = this.props;
    const styles = this.context.styleManager.render(styleSheet);

    const pathname = router.location.pathname;
    const activeTabIndex = this.props.tabs.findIndex(tab => {
      return pathname.startsWith(baseLocation + tab.path);
    });

    // if (activeTabIndex === -1) this.transitionTo(tabs[0].path);

    return (
      <div>
        <Paper className={styles.root}>
          <div className={styles.appBar}>
            <Tabs
              indicatorColor={ colors.ISEP_SECONDARY }
              index={activeTabIndex}
              onChange={this.handleChange}
              scrollable
              scrollButtons="on"
              textColor="accent">
              {
                tabs.map((tab, index) => {
                  return (
                    <Tab
                      key={index}
                      className={styles.tab}
                      label={tab.label} />
                  );
                })
              }
            </Tabs>
          </div>
        </Paper>

        <Switch location={this.props.router.location}>
          {
            tabs.map((tab, index) => {
              const Component = tab.component;
              return (
                <Route
                  key={index}
                  path={`${baseLocation}${tab.path}`}
                  component={
                    (routeProps) => (
                      <Component
                        baseLocation={baseLocation}
                        {...routeProps}
                        {...otherProps} />
                    )
                  } />
              );
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
      replaceLocation: (location) => dispatch(replace(location)),
    };
  }
)(TabsLayout);

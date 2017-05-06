// @flow

import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
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
    backgroundColor: 'white',
  },
  tab: {
    color: colors.ISEP_PRIMARY,
  },
}));

class TabsLayout extends React.Component {
  props: Props;

  state = {
    index: 0,
  };

  componentDidMount() {
    // Find the active tab
    const { baseLocation, router } = this.props;
    const location = router.location.pathname;
    const cleanLocation = location.substring(baseLocation.length);
    const activeTabIndex = this.props.tabs.findIndex(tab => cleanLocation.startsWith(tab.path));

    if (activeTabIndex > -1) {
      this.setState({index: activeTabIndex});
    } else {
      this.transitionTo(this.props.tabs[this.state.index].path);
    }
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
    const { baseLocation, tabs } = this.props;
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
                      className={styles.tab}
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

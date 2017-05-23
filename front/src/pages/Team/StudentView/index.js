import React from 'react';
import { connect } from 'react-redux';
import {createStyleSheet} from 'jss-theme-reactor';
import Typography from 'material-ui/Typography';
import customPropTypes from 'material-ui/utils/customPropTypes';

import { getLocalState as getPromotionState } from '../../../data/promotion/reducer';
import { BUILDING_SESSION, PROJECTS_STARTED, SESSION_ENDED } from '../../../data/promotion/constants';

import TeamBuilding from './TeamBuilding';
import TeamDashboard from './TeamDashboard';

const styleSheet = createStyleSheet('TeamPage', (theme) => ({
  breadCrumbs: {
    marginBottom: 20,
  }
}));

class TeamPage extends React.Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  render() {
    const { promotionStatus } = this.props;
    switch (promotionStatus) {
      case BUILDING_SESSION:
        return <TeamBuilding />;
      case PROJECTS_STARTED:
      default:
        return <TeamDashboard />;
    }
  }
}

export default connect(
  (state) => {
    const promotionState = getPromotionState(state);
    return {
      promotionStatus: promotionState.currentStatus,
    }
  },
  (dispatch) => ({
  })
)(TeamPage);

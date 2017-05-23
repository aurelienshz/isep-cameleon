import React from 'react';
import { connect } from 'react-redux';
import customPropTypes from 'material-ui/utils/customPropTypes';

import { fetchPromotion, getLocalState as getPromotionState } from '../../../data/promotion/reducer';
import { BUILDING_SESSION, PROJECTS_STARTED } from '../../../data/promotion/constants';
import Loader from '../../../components/Loader';

import TeamBuilding from './TeamBuilding';
import ProjectDashboard from './containers/ProjectDashboard';

class TeamPage extends React.Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  componentWillMount() {
    this.props.fetchPromotion();
  }

  render() {
    const { loading, promotionStatus } = this.props;

    if (loading) return <Loader />;

    switch (promotionStatus) {
      case BUILDING_SESSION:
        return <TeamBuilding />;
      case PROJECTS_STARTED:
        return <ProjectDashboard />;
      default:
        return <div>Error : Unknown promotion status</div>
    }
  }
}

export default connect(
  (state) => {
    const promotionState = getPromotionState(state);
    return {
      loading: promotionState.loading,
      promotionStatus: promotionState.promotionStatus,
    };
  },
  (dispatch) => ({
    fetchPromotion: () => dispatch(fetchPromotion()),
  })
)(TeamPage);

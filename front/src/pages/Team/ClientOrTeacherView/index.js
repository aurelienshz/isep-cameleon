import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import customPropTypes from 'material-ui/utils/customPropTypes';

import { fetchPromotion, getLocalState as getPromotionState } from '../../../data/promotion/reducer';
import { BUILDING_SESSION, PROJECTS_STARTED } from '../../../data/promotion/constants';

import TeamBuilding from './TeamBuilding';
import ProjectsStarted from './ProjectsStarted';
import TeamDetails from './TeamDetails';

class TeamPage extends React.Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  componentWillMount() {
    this.props.fetchPromotion();
  }

  render() {
    return (
      <Switch location={this.props.router.location}>
        <Route exact path="/team" component={() => {
          const { promotionStatus } = this.props;
          switch (promotionStatus) {
            case BUILDING_SESSION:
              return <TeamBuilding />;
            case PROJECTS_STARTED:
              return <ProjectsStarted />;
            default:
              return <div>Error : Unknown promotion status</div>
          }
        }} />
        <Route path="/team/:id" component={TeamDetails} />
      </Switch>
    );
  }
}

export default connect(
  (state) => {
    const promotionState = getPromotionState(state);
    return {
      promotionStatus: promotionState.promotionStatus,
      router: state.router,
    };
  },
  (dispatch) => ({
    fetchPromotion: () => dispatch(fetchPromotion()),
  })
)(TeamPage);

import React from 'react';
import { connect } from 'react-redux';

import { userHasRole } from '../../data/users/rolesHelpers';
import { getLocalState as getPromotionState, fetchPromotion, startProjects, endProjects } from '../../data/promotion/reducer';
import { BUILDING_SESSION, PROJECTS_STARTED, SESSION_ENDED } from '../../data/promotion/constants';

import Loader from '../../components/Loader';

class PromotionPage extends React.Component {
  componentWillMount() {
    this.props.fetchPromotion();
  };

  startProjects = () => {
    this.props.startProjects();
  };

  endProjects = () => {
    this.props.endProjects();
  };

  render() {
    const { currentStatus } = this.props;
    return (
      <div style={{padding: 20}}>
        <h1>Promotions</h1>

        { this.props.loading ?
          <Loader /> :
          <div>
            <p>TODO restrict this page to teachers only</p>

            <p>Current promotion status : {currentStatus}</p>
            {
              currentStatus === BUILDING_SESSION &&
              <button onClick={this.startProjects}>Étape suivante</button>
            }
            {
              currentStatus === PROJECTS_STARTED &&
              <button onClick={this.endProjects}>Étape suivante</button>
            }
          </div>
        }
      </div>
    );
  }
}

export default connect((state) => {
    const promoState = getPromotionState(state);
    return {
      loading: promoState.loading,
      currentStatus: promoState.promotionStatus,
    };
  },
  (dispatch) => {
    return {
      fetchPromotion: () => dispatch(fetchPromotion()),
      startProjects: () => dispatch(startProjects()),
      endProjects: () => dispatch(endProjects()),
    }
  }
)(PromotionPage);

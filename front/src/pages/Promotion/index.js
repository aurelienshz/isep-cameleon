import React from 'react';
import { connect } from 'react-redux';
import { getLocalState as getPromotionState, fetchPromotion, startProjects, endProjects } from '../../data/promotion/reducer';
import { BUILDING_SESSION, PROJECTS_STARTED, SESSION_ENDED } from '../../data/promotion/constants';

import Button from 'material-ui/Button';

import Stepper from 'react-stepper-horizontal';

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

    let activeStep = 0;
    switch (currentStatus) {
      case PROJECTS_STARTED:
        activeStep = 1;
        break;
      case SESSION_ENDED:
        activeStep = 2;
        break;
      default: // BUILDING_SESSION => 0
        break;
    }
    return (
      <div style={{padding: 20}}>
        <h1>Promotions</h1>

        { this.props.loading ?
          <Loader /> :
          <div>
            <Stepper steps={ [{title: 'Préparation de la session'}, {title: 'Session commencée'}, {title: 'Session terminée'}] } activeStep={activeStep} />

            <div style={{ margin: 30, textAlign: 'center'}}>
              {
                currentStatus === BUILDING_SESSION &&
                <Button primary raised onClick={this.startProjects}>Passer à l'étape suivante</Button>
              }
              {
                currentStatus === PROJECTS_STARTED &&
                <Button primary raised onClick={this.endProjects}>Passer à l'étape suivante</Button>
              }
            </div>
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

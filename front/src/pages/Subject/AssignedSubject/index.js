import React from 'react';

import { connect } from 'react-redux';
import customPropTypes from 'material-ui/utils/customPropTypes';

import { fetchPromotion, getLocalState as getPromotionState } from '../../../data/promotion/reducer';
import { BUILDING_SESSION, PROJECTS_STARTED } from '../../../data/promotion/constants';

import Loader from '../../../components/Loader';

class AssignedSubject extends React.Component {
  render() {
    // current step = building session --> message d'info
    // current step = session started --> fetch le sujet et l'afficher ici

    const { loading, promotionStatus } = this.props;

    if (loading) {
      return (
        <Loader />
      )
    }

    return (
      <div style={{padding: 20}}>
        <h1>Sujet assigné</h1>

        { promotionStatus === BUILDING_SESSION &&
          <p>
            Vous verrez apparaître sur cette page le sujet qui vous a été assigné par votre professeur lorsque
            vous aurez constitué votre équipe, et que la réalisation des projets aura débuté.
          </p>
        }

        { false &&
          <div>

            <h2>Outil de gestion de projet de Génie Logiciel</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Asperiores debitis dignissimos doloribus enim nulla optio quidem
              temporibus ullam voluptatem! At deleniti dignissimos facilis illo
              magnam modi molestias porro repellendus, tempore!</p>
          </div>
        }
      </div>
    )
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
)(AssignedSubject);


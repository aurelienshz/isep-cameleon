import React from 'react';

import { connect } from 'react-redux';
import customPropTypes from 'material-ui/utils/customPropTypes';

import { fetchPromotion, getLocalState as getPromotionState } from '../../../data/promotion/reducer';
import { fetchMyProject, getLocalState as getProjectState } from '../../../data/project/reducer';
import { BUILDING_SESSION, PROJECTS_STARTED } from '../../../data/promotion/constants';

import Loader from '../../../components/Loader';

class AssignedSubject extends React.Component {
  componentWillMount() {
    this.props.fetchProject();
  }

  render() {
    // current step = building session --> message d'info
    // current step = session started --> fetch le sujet et l'afficher ici

    const { loading, promotionStatus, project } = this.props;

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

        { promotionStatus === PROJECTS_STARTED &&
          <div>
            {
              (loading || project === null) ?
                <Loader />
              :
                <div>
                  <h2>{ project.subject.name }</h2>
                  <p dangerouslySetInnerHTML={{ __html: project.subject.description }} />
                </div>
            }

          </div>
        }
      </div>
    )
  }
}

export default connect(
  (state) => {
    const promotionState = getPromotionState(state);
    const projectState = getProjectState(state);
    return {
      promotionStatus: promotionState.promotionStatus,
      project: projectState.selectedProject,
      loading: promotionState.loading || projectState.loadingProject,
    };
  },
  (dispatch) => ({
    fetchPromotion: () => dispatch(fetchPromotion()),
    fetchProject: () => dispatch(fetchMyProject()),
  })
)(AssignedSubject);


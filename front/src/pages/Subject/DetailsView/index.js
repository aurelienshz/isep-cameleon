import React from 'react';
import { connect } from 'react-redux';

import { fetchSubjects, getLocalState as getSubjectState } from '../../../data/subject/reducer';
import { fetchMyProject, getLocalState as getProjectState } from '../../../data/project/reducer';

import FeatureEditor from './components/FeatureEditor';
import Loader from '../../../components/Loader.js';

class SubjectDetailsView extends React.Component {
  componentWillMount() {
    this.props.fetchSubjects();
  }

  render() {
    const { loadingSubject, subject, loadingProject, project } = this.props;

    if (loadingSubject) {
      return <div><Loader /></div>
    }

    if (!subject) {
      return <div>Not found</div>
    }

    return (
      <div>
        <h1>{ subject.name }</h1>
        <p>{ subject.description }</p>
        <hr/>
        <h2>Fonctionnalités</h2>

        {
          loadingProject ?
            <Loader />
          :
          <div>
            <FeatureEditor project={project} />
          </div>
        }
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => {
    const subjectState = getSubjectState(state);
    const projectState = getProjectState(state);

    const subjectId = parseInt(ownProps.match.params.id);
    const subject = subjectState.subjects.find(s => s.id === subjectId);

    return {
      subjectId,
      subject,
      loadingSubject: subjectState.loading,
      loadingProject: projectState.loadingProject,
    };
  },
  (dispatch) => {
    return {
      fetchSubjects: () => dispatch(fetchSubjects()),
    }
  }
)(SubjectDetailsView);

import React from 'react';
import { connect } from 'react-redux';

import { fetchSubjects, updateFeatureCategory, createFeature, deleteFeature, getLocalState as getSubjectState } from '../../../data/subject/reducer';

import FeatureEditor from './components/FeatureEditor';
import Loader from '../../../components/Loader.js';

class SubjectDetailsView extends React.Component {
  componentWillMount() {
    this.props.fetchSubjects();
  }

  updateFeatureCategory = (id, dto) => {
    const { subjectId } = this.props;
    this.props.updateFeatureCategory(subjectId, id, dto);
  };

  render() {
    const { loadingSubject, subject, subjectId } = this.props;

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
          loadingSubject ?
            <Loader />
          :
          <div>
            <FeatureEditor
              subject={subject}
              createFeature={this.props.createFeature}
              deleteFeature={(featureId) => this.props.deleteFeature(subjectId, featureId)}
              updateFeatureCategory={this.updateFeatureCategory} />
          </div>
        }
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => {
    const subjectState = getSubjectState(state);

    const subjectId = parseInt(ownProps.match.params.id, 10);
    const subject = subjectState.subjects.find(s => s.id === subjectId);

    return {
      subjectId,
      subject,
      loadingSubject: subjectState.loading,
    };
  },
  (dispatch) => {
    return {
      fetchSubjects: () => dispatch(fetchSubjects()),
      updateFeatureCategory: (subjectId, fcId, dto) => dispatch(updateFeatureCategory(subjectId, fcId, dto)),
      createFeature: (subjectId, dto) => dispatch(createFeature(subjectId, dto)),
      deleteFeature: (subjectId, featureId) => dispatch(deleteFeature(subjectId, featureId)),
    }
  }
)(SubjectDetailsView);

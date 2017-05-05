import React from 'react';
import { connect } from 'react-redux';

import { fetchSubjects, getLocalState } from '../../../data/subject/reducer';

class SubjectDetailsView extends React.Component {
  componentWillMount() {
    this.props.fetchSubjects();
  }

  render() {
    const { loading, subject } = this.props;

    if (loading) {
      return <div>Chargement...</div>
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
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => {
    const subjectState = getLocalState(state);
    const subjectId = parseInt(ownProps.match.params.id);
    const subject = subjectState.subjects.find(s => s.id === subjectId);
    console.log(subjectState.subjects);

    return {
      subjectId,
      loading: subjectState.loading,
      subject,
    };
  },
  (dispatch) => {
    return {
      fetchSubjects: () => dispatch(fetchSubjects()),
    }
  }
)(SubjectDetailsView);

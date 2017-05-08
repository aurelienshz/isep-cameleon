import React from 'react';
import { connect } from 'react-redux';
import { getLocalState as getUserState } from '../../data/users/reducer';
import { ROLE_CLIENT, ROLE_STUDENT, ROLE_TEACHER, userHasRole } from '../../data/users/rolesHelpers';

import StudentView from './StudentView';
import ClientOrTeacherView from './ClientOrTeacherView';

import Loader from '../../components/Loader.js';

const VIEW_STUDENT = "VIEW_STUDENT";
const VIEW_CLIENT_OR_TEACHER = "VIEW_CLIENT_OR_TEACHER";

class TeamPage extends React.Component {
  render() {
    const { loading, viewType } = this.props;

    if (loading) return <div><Loader /></div>

    if (viewType === VIEW_CLIENT_OR_TEACHER) {
      return <ClientOrTeacherView />;
    }

    return <StudentView />;
  }
}

export default connect((state) => {
  const userState = getUserState(state);
  const viewType = (userHasRole(state, ROLE_CLIENT) || userHasRole(state, ROLE_TEACHER)) ?
    VIEW_CLIENT_OR_TEACHER : VIEW_STUDENT;

  return {
    loading: userState.awaitingProfile,
    viewType,
  }
})(TeamPage);

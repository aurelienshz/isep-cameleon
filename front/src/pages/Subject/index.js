import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { getLocalState as getUserState } from '../../data/users/reducer';
import { ROLE_CLIENT, ROLE_STUDENT, ROLE_TEACHER, userHasRole } from '../../data/users/rolesHelpers';

import SubjectListView from './ListView';
import SubjectDetailsView from './DetailsView';

const VIEW_TYPE_LIST = "VIEW_TYPE_LIST";
const VIEW_TYPE_ASSIGNED_SUBJECT = "VIEW_TYPE_ASSIGNED_SUBJECT";

class Subject extends React.Component {
  render() {
    if (this.props.loading) {
      return (
        <div>Chargement...</div>
      )
    }

    if (this.props.viewType === VIEW_TYPE_LIST) {
      return (
        <div style={{padding: 20}}>
          <Switch>
            <Route exact path="/subject" component={() => (
              <div>
                <h1>Sujets</h1>
                <SubjectListView />
              </div>
            )}/>
            <Route path="/subject/:id" component={(props) => (
              <div>
                <SubjectDetailsView {...props} />
              </div>
            )} />
          </Switch>
        </div>
      )
    }

    return (
      <div style={{padding: 20}}>
        <h1>Sujet assigné</h1>

        <h2>Outil de gestion de projet de Génie Logiciel</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Asperiores debitis dignissimos doloribus enim nulla optio quidem
          temporibus ullam voluptatem! At deleniti dignissimos facilis illo
          magnam modi molestias porro repellendus, tempore!</p>
      </div>
    )
  }
}

export default connect((state) => {
  const userState = getUserState(state);
  const viewType = (userHasRole(state, ROLE_CLIENT) || userHasRole(state, ROLE_TEACHER)) ? VIEW_TYPE_LIST : VIEW_TYPE_ASSIGNED_SUBJECT;

  return {
    loading: userState.awaitingProfile,
    viewType,
  }
})(Subject);

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import FloatingActionButton from '../../../components/FloatingActionButton';

import { fetchSubjects, createSubject, setSubjectClient, getLocalState as getSubjectState } from '../../../data/subject/reducer';
import { fetchClients, getLocalState as getUserState } from '../../../data/users/reducer';
import { userHasRole, ROLE_TEACHER } from '../../../data/users/rolesHelpers';
import SubjectList from './components/SubjectList';
import AddSubjectDialog from './components/AddSubjectDialog';
import ClientSelectionDialog from './components/ClientSelectionDialog';
import Loader from '../../../components/Loader.js';


const STYLE_SEARCH = {
  width: '100%',
  margin: '0 auto 20px auto',
};

class SubjectListView extends React.Component {
  state = {
    createSubjectOpen: false,
    filterString: "",
    clientSelectionDialogOpen: false,
    clientSelectionSubjectId: null,
  };

  componentWillMount() {
    this.props.fetchSubjects();
    this.props.fetchClients();
  }

  openCreateSubject = () => {
    this.setState({ createSubjectOpen: true });
  };

  closeCreateSubject = () => {
    this.setState({ createSubjectOpen: false });
  };

  openClientSelectionDialog = (id) => {
    this.setState({
      clientSelectionDialogOpen: true,
      clientSelectionSubjectId: id,
    });
  };

  closeClientSelectionDialog = () => {
    this.setState({
      clientSelectionDialogOpen: false,
      clientSelectionSubjectId: null,
    });
  };

  setClient = (clientId) => {
    const subjectId = this.state.clientSelectionSubjectId;
    this.props.setSubjectClient(subjectId, clientId);
    this.closeClientSelectionDialog();
  };

  createSubject = (title, htmlDescription) => {
    this.props.createSubject(title, htmlDescription);
    this.setState({
      createSubjectOpen: false,
    });
  };

  render() {
    const { isTeacher, currentUserId, subjects, loading, goToDetails, awaitingClients, clients } = this.props;
    const { filterString, createSubjectOpen, clientSelectionDialogOpen } = this.state;

    const displayedSubjects = subjects.filter(subject => {
      return subject.name.toLowerCase().includes(filterString.toLowerCase()) || subject.description.toLowerCase().includes(filterString.toLowerCase());
    });

    return (
      <div>
        <FloatingActionButton onClick={this.openCreateSubject} />

        <AddSubjectDialog
          open={createSubjectOpen}
          onConfirm={this.createSubject}
          onRequestClose={this.closeCreateSubject} />

        <ClientSelectionDialog
          open={clientSelectionDialogOpen}
          loading={awaitingClients}
          clients={clients}
          onConfirm={this.setClient}
          onRequestClose={this.closeClientSelectionDialog} />

        <Grid container>
          <Grid item xs={12} sm={6}>
            <h2>
              Sujets
            </h2>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              style={STYLE_SEARCH}
              label="Filtrer les sujets"
              onChange={(e) => this.setState({filterString: e.target.value})} />
          </Grid>
        </Grid>

        {
          loading ?
            <div><Loader /></div>
            :
            <SubjectList
              userId={currentUserId}
              subjects={displayedSubjects}
              showAssignToClient={isTeacher}
              onClickFeatures={(id) => {goToDetails(id)}}
              onClickAssignClient={(id) => this.openClientSelectionDialog(id)} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const subjectState = getSubjectState(state);
  const userState = getUserState(state);

  const isTeacher = userHasRole(state, ROLE_TEACHER);

  return {
    isTeacher,
    currentUserId: userState.profile.id,
    subjects: subjectState.subjects,
    loading: subjectState.loading,
    awaitingClients: userState.awaitingClients,
    clients: userState.clients,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSubjects: () => dispatch(fetchSubjects()),
    fetchClients: () => dispatch(fetchClients()),
    createSubject: (name, description) => dispatch(createSubject({name, description})),
    setSubjectClient: (subjectId, clientId) => dispatch(setSubjectClient(subjectId, clientId)),
    goToDetails: (id) => dispatch(push("/subject/" + id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectListView);

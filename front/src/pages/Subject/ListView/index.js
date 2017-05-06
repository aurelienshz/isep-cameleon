import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { Dialog } from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Layout from 'material-ui/Layout';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import FloatingActionButton from '../../../components/FloatingActionButton';
import colors from '../../../colors';

import { fetchSubjects, createSubject, getLocalState as getSubjectState } from '../../../data/subject/reducer';
import { fetchClients, getLocalState as getUserState } from '../../../data/users/reducer';
import SubjectList from './components/SubjectList';
import AddSubjectDialog from './components/AddSubjectDialog';


const STYLE_SEARCH = {
  maxWidth: 400,
  margin: '0 auto 20px auto',
};

class SubjectListView extends React.Component {
  state = {
    createSubjectOpen: false,
    newSubjectTitle: "",
    newSubjectDescription: "",
    filterString: "",
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

  createSubject = (title, htmlDescription) => {
    this.props.createSubject(title, htmlDescription);
    this.setState({
      createSubjectOpen: false,
      newSubjectTitle: "",
      newSubjectDescription: "",
    });
  };

  render() {
    const { subjects, loading, goToDetails } = this.props;
    const { filterString } = this.state;

    const displayedSubjects = subjects.filter(subject => {
      return subject.name.toLowerCase().includes(filterString.toLowerCase()) || subject.description.toLowerCase().includes(filterString.toLowerCase());
    });

    return (
      <div>
        <FloatingActionButton onClick={this.openCreateSubject} />

        <AddSubjectDialog
          open={this.state.createSubjectOpen}
          onConfirm={this.createSubject}
          onRequestClose={this.closeCreateSubject} />

        <Layout>
          <TextField
            style={STYLE_SEARCH}
            label="Filtrer les sujets"
            onChange={(e) => this.setState({filterString: e.target.value})} />
        </Layout>

        {
          loading ?
            <div>Chargement...</div>
            :
            <SubjectList
              subjects={displayedSubjects}
              showFunctionalitiesButton
              showAssignToClient
              onClickFunctionalities={(id) => {goToDetails(id)}}
              onClickAssignClient={() => alert("Not implemented")} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const subjectState = getSubjectState(state);
  return {
    subjects: subjectState.subjects,
    loading: subjectState.loading,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSubjects: () => dispatch(fetchSubjects()),
    fetchClients: () => dispatch(fetchClients()),
    createSubject: (name, description) => dispatch(createSubject({name, description})),
    goToDetails: (id) => dispatch(push("/subject/" + id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectListView);

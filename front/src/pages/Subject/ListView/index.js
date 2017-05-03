import React from 'react';
import { connect } from 'react-redux';
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

import FloatingActionButton from '../../../components/FloatingActionButton';
import colors from '../../../colors';

const STYLE_APPBAR = {
  position: 'relative',
  backgroundColor: colors.ISEP_PRIMARY,
};

const STYLE_SEARCH = {
  maxWidth: 400,
  margin: '0 auto 20px auto',
};

const STYLE_FLEX = {
  flex: 1,
};

const STYLE_INPUT = {
  margin: 10,
};

const STYLE_BUTTON = {
  maxWidth: 300,
  margin: '10px auto',
  backgroundColor: colors.ISEP_SECONDARY,
  color: colors.ISEP_TERTIARY,
};

import { fetchSubjects, createSubject, getLocalState as getSubjectState } from '../../../data/subject/reducer';

import SubjectList from './components/SubjectList'

class SubjectListView extends React.Component {
  state = {
    createSubjectOpen: false,
    newSubjectTitle: "",
    newSubjectDescription: "",
    filterString: "",
  };

  componentWillMount() {
    this.props.fetchSubjects();
  }

  openCreateSubject = () => {
    this.setState({ createSubjectOpen: true });
  };

  closeCreateSubject = () => {
    this.setState({ createSubjectOpen: false });
  };

  createSubject = () => {
    const { newSubjectTitle, newSubjectDescription } = this.state;
    this.props.createSubject(newSubjectTitle, newSubjectDescription);

    this.setState({
      createSubjectOpen: false,
      newSubjectTitle: "",
      newSubjectDescription: "",
    });
  };

  render() {
    const { subjects, loading } = this.props;
    const { filterString } = this.state;

    const displayedSubjects = subjects.filter(subject => {
      return subject.name.toLowerCase().includes(filterString.toLowerCase()) || subject.description.toLowerCase().includes(filterString.toLowerCase());
    });

    return (
      <div>
        <FloatingActionButton onClick={this.openCreateSubject} />

        <Dialog
          fullScreen
          open={this.state.createSubjectOpen}
          onRequestClose={this.closeCreateSubject}
          transition={<Slide direction="up" />}>

          <AppBar style={STYLE_APPBAR}>
            <Toolbar>
              <IconButton contrast onClick={this.closeCreateSubject}>
                <CloseIcon />
              </IconButton>
              <Typography type="title" colorInherit style={STYLE_FLEX}>Nouveau sujet</Typography>
            </Toolbar>
          </AppBar>
          <TextField
            id="Titre du sujet"
            label="Titre du nouveau sujet"
            onChange={(e) => this.setState({ newSubjectTitle: e.target.value })}
            style={STYLE_INPUT}
          />
          <TextField
            id="Descriptif du nouveau sujet"
            label="Descriptif du nouveau sujet"
            onChange={(e) => this.setState({ newSubjectDescription: e.target.value })}
            style={STYLE_INPUT}
          />
          <Button style={STYLE_BUTTON} onClick={this.createSubject}>Ajouter</Button>
        </Dialog>

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
            <SubjectList subjects={displayedSubjects} showFunctionalitiesButton showAssignToClient />
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
    createSubject: (name, description) => dispatch(createSubject({name, description})),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectListView);

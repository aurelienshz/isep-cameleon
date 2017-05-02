// @flow

import React from 'react';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { Dialog } from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

import colors from '../../../colors.js';

import { connect } from 'react-redux';

import { fetchSubjects, createSubject, getLocalState as getSubjectState } from '../../../data/subject/reducer';

const STYLE_BODY = {
  margin: 20
};

const STYLE_APPBAR = {
  position: 'relative',
  backgroundColor: colors.ISEP_PRIMARY,
};

const STYLE_FLEX = {
  flex: 1,
};

const STYLE_BUTTON = {
  backgroundColor: colors.ISEP_SECONDARY,
  color: colors.ISEP_TERTIARY,
};

const STYLE_INPUT = {
  margin: 10,
};

class SubjectPage extends React.Component {

  state: {
    open: boolean,
    newSubjectTitle: string,
    newSubjectDescription: string,
  } = {
    open: false,
    newSubjectTitle: "",
    newSubjectDescription: "",
  };

  componentWillMount() {
    console.log(this.props);
    this.props.fetchSubjects();
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  createSubject = () => {
    const { newSubjectTitle, newSubjectDescription } = this.state;
    this.props.createSubject(newSubjectTitle, newSubjectDescription);

    this.setState({
      open: false,
      newSubjectTitle: "",
      newSubjectDescription: "",
    });
  };

  handleOpen = () => this.setState({ open: true });

  render() {
    const { loading, subjects } = this.props;

    return (
      <div style={STYLE_BODY}>
        <h1>Sujets</h1>
        <Button onClick={this.handleOpen} style={STYLE_BUTTON}>
          Ajouter un sujet
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          transition={<Slide direction="up" />}>

          <AppBar style={STYLE_APPBAR}>
            <Toolbar>
              <IconButton contrast onClick={this.handleRequestClose}>
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
          <Button style={STYLE_BUTTON} onClick={this.createSubject}>Enregistrer</Button>
        </Dialog>
        <TextField
          id="Recherche"
          label="Recherche"
          style={STYLE_INPUT}
        />
        {
          loading ?
            <div>Chargement des sujets...</div>
          :
            <div>
              <ul>
                { subjects.map((subject) => {
                  return (
                    <li key={subject.id}><strong>{subject.name}</strong> (description : {subject.description})</li>
                  );
                })}
              </ul>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SubjectPage);

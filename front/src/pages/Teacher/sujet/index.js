// @flow

import React from 'react';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { Dialog } from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import Layout from 'material-ui/Layout';
import {Card, CardContent, CardActions} from 'material-ui/Card';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Loader from '../../../components/Loader.js';

import colors from '../../../colors.js';

import { connect } from 'react-redux';

import { fetchSubjects, createSubject, getLocalState as getSubjectState } from '../../../data/subject/reducer';

const STYLE_BODY = {
  margin: 20
};

const STYLE_BUTTON = {
  backgroundColor: colors.ISEP_SECONDARY,
  color: colors.ISEP_TERTIARY,
};

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

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  }

  render() {
    const { loading, subjects } = this.props;
    const { editorState } = this.state;
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
          <Editor
            editorState={editorState}
            toolbarClassName="home-toolbar"
            wrapperClassName="home-wrapper"
            editorClassName="home-editor"
            onEditorStateChange={this.onEditorStateChange}
          />
          <Button style={STYLE_BUTTON} onClick={this.createSubject}>Enregistrer</Button>
        </Dialog>
        <Layout>
          <TextField
            style={STYLE_SEARCH}
            label="Filtrer les sujets" />
        </Layout>

        {
          loading ?
            <div><Loader/></div>
          :
            <div>
              { subjects.map((subject) => { // TODO Change for use component
                return (
                  <div>
                    <Card style={STYLE_BODY}>
                      <CardContent>
                        <Typography type="headline" component="h2" key={subject.id}>Sujet {subject.id} : {subject.name}</Typography>
                        <Typography type="body2" component="p">{subject.description}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button style={STYLE_BUTTON}>Supprimer</Button>
                      </CardActions>
                    </Card>
                  </div>
                )
              })}
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

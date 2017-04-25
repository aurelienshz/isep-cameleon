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
import Text from 'material-ui/Text';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

import colors from '../../../colors.js';

import type { Subject } from '../../../services/subject';

import { getSubjectsList } from '../../../services/subject';

const STYLE_BODY = {
  margin: 20
}

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
}

const STYLE_CONTAINER = {
  width: '10%',
  marginLeft: '45%',
  backgroundColor: colors.ISEP_SECONDARY,
  color: colors.ISEP_TERTIARY,
}

export default class SubjectHome extends React.Component {

  state: {
    open: false,
    loading: boolean,
    subjects: ?Array<Subject>,
  } = {
    loading: true,
    subjects: null,
  };

  handleRequestClose = () => this.setState({ open: false });
  handleOpen = () => this.setState({ open: true });


  componentWillMount = async () => {
    const subjects = await getSubjectsList();
    this.setState({
      loading: false,
      subjects,
    })
  };

  render() {
    return (
      <div style={STYLE_BODY}>
        <h1>Liste des sujets</h1>
        <Button onClick={this.handleOpen} style={STYLE_BUTTON}>
          Ajouter un sujet
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          transition={<Slide direction="up" />}
        >
          <AppBar style={STYLE_APPBAR}>
            <Toolbar>
              <IconButton contrast onClick={this.handleRequestClose}>
                <CloseIcon />
              </IconButton>
              <Text type="title" colorInherit style={STYLE_FLEX}>Nouveau sujet</Text>
            </Toolbar>
          </AppBar>
          <TextField
            id="Titre du sujet"
            label="Titre du nouveau sujet"
            style={STYLE_INPUT}
          />
          <TextField
            id="Descriptif du nouveau sujet"
            label="Descriptif du nouveau sujet"
            style={STYLE_INPUT}
            multiLine={true}
          />
          <Button style={STYLE_CONTAINER} onClick={this.handleRequestClose}>Enregistrer</Button>
        </Dialog>
        <TextField
          id="Recherche"
          label="Recherche"
          style={STYLE_INPUT}
        />
        {
          this.state.loading ?
            <div>Chargement des sujets...</div>
          :
            <div>
              <ul>
                { this.state.subjects.map((subject) => {
                  return (
                    <li key={subject.id}>n° {subject.number} : <strong>{subject.name}</strong> ({subject.description})</li>
                  );
                })}
              </ul>
            </div>
        }
      </div>

    )
  }
}

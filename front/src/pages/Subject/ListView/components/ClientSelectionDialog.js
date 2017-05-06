import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {Dialog} from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Layout from 'material-ui/Layout';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

import colors from '../../../../colors';

import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

const STYLE_APPBAR = {
  position: 'relative',
  backgroundColor: colors.ISEP_PRIMARY,
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

export default class AddSubjectDialog extends React.Component {
  state = {
    title: '',
    descriptionEditorState: null,
  };

  onEditorStateChange = (descriptionEditorState) => {
    this.setState({
      descriptionEditorState,
    });
  };

  onConfirm = () => {
    const rawContentState = convertToRaw(this.state.descriptionEditorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    this.props.onConfirm(this.state.title, markup);
  };

  render() {
    return (
      <Dialog
        maxWidth="md"
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        transition={<Slide direction="up"/>}>

        <div style={{height: '100%', display:'flex', flexDirection: 'column', overflow: 'auto' }}>
          <AppBar style={STYLE_APPBAR}>
            <Toolbar>
              <IconButton contrast onClick={this.props.onRequestClose}>
                <CloseIcon />
              </IconButton>
              <Typography type="title" colorInherit style={STYLE_FLEX}>Nouveau sujet</Typography>
            </Toolbar>
          </AppBar>

        </div>
        <Button style={STYLE_BUTTON} onClick={this.onConfirm}>Ajouter</Button>
      </Dialog>
    );
  }
}

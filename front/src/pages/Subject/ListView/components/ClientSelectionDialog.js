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
  position: 'fixed',
  backgroundColor: colors.ISEP_PRIMARY,
};

const STYLE_BUTTON = {
  maxWidth: 300,
  margin: '10px auto',
  backgroundColor: colors.ISEP_SECONDARY,
  color: colors.ISEP_TERTIARY,
};

export default class ClientSelectionDialog extends React.Component {
  state = {
    selectedId: -1,
  };

  onConfirm = () => {
    const { selectedId } = this.state;
    this.props.onConfirm(selectedId);
  };

  handleChange = (e) => {
    this.setState({ selectedId: e.target.value });
  }

  render() {
    const { open, loading, onRequestClose } = this.props;

    // Mapping an empty array in render if we are still loading (to avoid clients === undefined)
    const clients = this.props.clients || [];

    return (
      <Dialog
        maxWidth="md"
        open={open}
        onRequestClose={onRequestClose}
        transition={<Slide direction="up"/>}>

        <AppBar style={STYLE_APPBAR}>
          <Toolbar>
            <IconButton contrast onClick={this.props.onRequestClose}>
              <CloseIcon />
            </IconButton>
            <Typography type="title" colorInherit>Sélectionner un client</Typography>
          </Toolbar>
        </AppBar>

        <div style={{ padding: '84px 20px 20px' }}>
          <label>
            Sélectionner un client :&nbsp;

            { loading ?
              <span>Chargement...</span>
              :
              <select onChange={this.handleChange} value={this.state.selectedId}>
                <option value={-1} key={-1}>Choisir un client...</option>
                {
                  clients.map(client => (
                    <option value={client.id} key={client.id}>{ client.firstName } {client.lastName }</option>
                  ))
                }
              </select>
            }
          </label>
        </div>

        <Button style={STYLE_BUTTON} onClick={this.onConfirm} disabled={this.state.selectedId === -1}>Valider</Button>
      </Dialog>
    );
  }
}

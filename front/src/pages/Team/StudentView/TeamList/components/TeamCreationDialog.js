// @flow

import React from 'react';
import Dialog, { DialogTitle, DialogContent, DialogContentText, DialogActions} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

type Props = {
  open: boolean,
  onCancel: Function,
  onConfirm: Function
};

export default class TeamCreationDialog extends React.Component {
  props: Props;

  state = {
    name: '',
  };

  confirm = () => {
    this.props.onConfirm(this.state.name);
  };

  render() {
    const { open, onCancel } = this.props;
    return (
      <Dialog open={open} onRequestClose={onCancel}>
        <DialogTitle>Créer une équipe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vous êtes sur le point de créer une nouvelle équipe.
          </DialogContentText>
          <TextField
            label="Nom de l'équipe"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} primary>{"Annuler"}</Button>
          <Button onClick={this.confirm} primary>{"Valider"}</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

// @flow

import React from 'react';
import Dialog, { DialogTitle, DialogContent, DialogContentText, DialogActions } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

type Props = {
  open: boolean,
  title: string,
  text: string,
  confirmText?: string,
  cancelText?: string,
  onCancel: Function,
  onConfirm: Function
};

function ConfirmDialog({ open, title, text, confirmText, cancelText, onCancel, onConfirm}: Props) {
  return (
    <Dialog open={open} onRequestClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          { text }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} primary>{cancelText || "Annuler"}</Button>
        <Button onClick={onConfirm} primary>{confirmText || "Valider"}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog;

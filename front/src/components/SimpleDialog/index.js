// @flow

import React from 'react';

import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';

export default function SimpleDialog(props) {
  const actions = [
    <Button
      label={props.cancelTitle || "Annuler"}
      primary
      onTouchTap={props.handleCloseCancel}
    />,
    <Button
      label={props.okTitle || "Ok"}
      primary
      keyboardFocused
      onTouchTap={props.handleClose}
    />,
  ];
  if (props.hideCancel) delete actions[0];
  return (
    <Dialog
      title={props.title}
      actions={actions}
      modal={false}
      open={props.open}
      onRequestClose={props.handleClose}
      autoScrollBodyContent={props.scrollable || false}
    >
      {props.msg || props.children}
    </Dialog>
  );
}

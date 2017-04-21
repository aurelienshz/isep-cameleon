// @flow

import React from 'react';

import SimpleDialog from '../../../components/SimpleDialog';

type DialogTakeActionProps={
  takePopupOpen: Function,
  handleClose: Function,
  info: Object,
}

export default function DialogTakeAction(props: DialogTakeActionProps) {
  const TAB_TXT_STYLE = {
    margin: '20px 0',
  };
  return (
    <SimpleDialog title="Sélectionner une action à effectuer" open={props.takePopupOpen} handleCloseCancel={props.handleClose} handleClose={props.handleClose} scrollable>
      <div className="row">
        <h1>Test</h1>
      </div>
    </SimpleDialog>
  );
}

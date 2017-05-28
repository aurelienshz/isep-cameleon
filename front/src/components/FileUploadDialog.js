// @flow

import React from 'react';
import Dialog from 'material-ui/Dialog';
import Dropzone from 'react-dropzone';

import { uploadFile } from '../services/helpers/request';

type Props = {
  open: boolean,
  onSelectFile: (File) => void,
  onRequestClose: Function,
}

export default class FileUploadDialog extends React.Component {
  props: Props;

  onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      this.props.onSelectFile(acceptedFiles[0]);
    }
  };

  render() {
    const { open, onRequestClose } = this.props;
    return (
      <Dialog open={open} onRequestClose={onRequestClose}>
        <Dropzone
          multiple={false}
          onDrop={this.onDrop}
        />
      </Dialog>
    )
  }
}

import React from 'react';
import Dialog from 'material-ui/Dialog';
import Dropzone from 'react-dropzone';

import { uploadFile } from '../services/helpers/request';

export default class FileUploadDialog extends React.Component {
  onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    uploadFile("/document", acceptedFiles[0]).then(console.log);
  };

  render() {
    return (
      <Dialog open={true}>
        <Dropzone
          multiple={false}
          onDrop={this.onDrop}
        />
      </Dialog>
    )
  }
}

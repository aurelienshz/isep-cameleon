// @flow

import React, { Component } from 'react';
import { LinearProgress } from 'material-ui/Progress';

const STYLE_ROOT = {
  width: '100%',
  height: '100%',
  verticalAlign: 'center',
};

export default class Loader extends Component {
  render() {
    return (
      <div style={STYLE_ROOT}>
        <LinearProgress />
      </div>
    );
  }
}

// @flow

import React from 'react';

export default class Profil extends React.Component {
  render() {
    const {match} = this.props;
    const STYLE_CONTAINER = {
      padding: 20,
    }

    return (
      <div style={STYLE_CONTAINER}>
        Hello
      </div>
    );
  }
}

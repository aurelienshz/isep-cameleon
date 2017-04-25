// @flow

import React from 'react';

import { Link, Switch, Route } from 'react-router-dom';

import Button from 'material-ui/Button';

import colors from '../../../colors.js';

const STYLE_BUTTON = {
  backgroundColor: colors.ISEP_SECONDARY,
  color: colors.ISEP_TERTIARY,
};

const STYLE_LINK = {
  textDecoration: 'none',
}

export default class Promo extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h1>Promo</h1>
          <Link style={STYLE_LINK} to="/teacher/new-promo"><Button raised style={STYLE_BUTTON}>Ajouter une promo</Button></Link>
        </div>
      </div>
    );
  }
}

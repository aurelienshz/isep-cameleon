// @flow

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import colors from '../../../colors.js';

import type { Subject } from '../../../services/subject';

import { getSubjectsList } from '../../../services/subject';

const STYLE_BUTTON = {
  backgroundColor: colors.ISEP_SECONDARY,
  color: colors.ISEP_TERTIARY,
};

const STYLE_INPUT = {
  margin: 10,
};

export default class SubjectHome extends React.Component {

  state: {
    loading: boolean,
    subjects: ?Array<Subject>,
  } = {
    loading: true,
    subjects: null,
  };

  componentWillMount = async () => {
    const subjects = await getSubjectsList();
    this.setState({
      loading: false,
      subjects,
    })
  };

  render() {
    return (
      <div>
        <div>Project home page</div>

        <Button raised style={STYLE_BUTTON}>Ajouter un sujet</Button>
        <TextField
          id="Recherche"
          label="Recherche"
          style={STYLE_INPUT}
        />

        {
          this.state.loading ?
            <div>Chargement des sujets...</div>
          :
            <div>
              <ul>
                { this.state.subjects.map((subject) => {
                  return (
                    <li key={subject.id}>n° {subject.number} : <strong>{subject.name}</strong> ({subject.description})</li>
                  );
                })}
              </ul>
            </div>
        }

      </div>

    )
  }
}

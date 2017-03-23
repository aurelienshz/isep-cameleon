// @flow

import React from 'react';

import type { Subject } from '../services/subject';

import { getSubjectsList } from '../services/subject';

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

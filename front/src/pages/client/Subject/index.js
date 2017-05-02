// @flow

import React from 'react';
import SubjectList from './components/SubjectList'

const subjects = [
  {
    name: "Un sujet",
    description: "Bla bla bla",
  },
  {
    name: "Deux sujets",
    description: "Bla bla bla bla bla bla bla",
  },
];


export default function Sujet() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Sujets</h1>

      <SubjectList subjects={subjects} />
    </div>
  );
}

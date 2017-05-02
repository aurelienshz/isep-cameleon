// @flow

import React, { Component } from 'react';

import TabsLayout from '../../components/TabsLayout';

// tabs :
import Equipe from './equipe';
import Subject from './Subject';

const tabs = [
  {
    label: "Sujet",
    path: "/subject",
    component: Subject,
  },
  {
    label: "Équipe",
    path: "/team",
    component: Equipe,
  },
];

export default function TeacherPage(props) {
  const baseLocation = props.match.url;
  return (
    <TabsLayout tabs={tabs} baseLocation={baseLocation} />
  );
}

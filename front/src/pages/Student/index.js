// @flow

import React, { Component } from 'react';

import TabsLayout from '../../components/TabsLayout';

// tabs :
import Subject from './Subject';
import Team from './Team';

const tabs = [
  {
    label: "Sujet",
    path: "/subject",
    component: Subject,
  },
  {
    label: "Équipe",
    path: "/team",
    component: Team,
  },
];

export default function StudentPage(props) {
  const baseLocation = props.match.url;
  return (
    <TabsLayout tabs={tabs} baseLocation={baseLocation} />
  );
}

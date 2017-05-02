// @flow

import React, { Component } from 'react';

import TabsLayout from '../../components/TabsLayout';

// tabs :
import Subject from './Subject';
import Team from './Team';
import Meeting from './Meeting';

const tabs = [
  {
    label: "Équipe",
    path: "/team",
    component: Team,
  },
  {
    label: "Sujet",
    path: "/subject",
    component: Subject,
  },
  {
    label: "Réunions",
    path: "/meeting",
    component: Meeting,
  },
];

export default function StudentPage(props) {
  const baseLocation = props.match.url;
  return (
    <TabsLayout tabs={tabs} baseLocation={baseLocation} />
  );
}

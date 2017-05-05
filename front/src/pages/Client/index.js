// @flow

import React from 'react';

import TabsLayout from '../../components/TabsLayout';

// tabs :
import Equipe from './equipe';
import Meeting from './Meeting';

const tabs = [
  {
    label: "Équipe",
    path: "/team",
    component: Equipe,
  },
  {
    label: "Réunions",
    path: "/meeting",
    component: Meeting,
  },
];

export default function TeacherPage(props) {
  const baseLocation = props.match.url;
  return (
    <TabsLayout tabs={tabs} baseLocation={baseLocation} />
  );
}

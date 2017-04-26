// @flow

import React, { Component } from 'react';

import TabsLayout from '../../components/TabsLayout';

// tabs :
import Equipe from './equipe';
import Sujet from './sujet';
import Promo from './promo';

const tabs = [
  {
    label: "Sujet",
    path: "/subject",
    component: Sujet,
  },
  {
    label: "Équipe",
    path: "/team",
    component: Equipe,
  },
  {
    label: "Promotion",
    path: "/promo",
    component: Promo,
  },
];

export default function TeacherPage(props) {
  const baseLocation = props.match.url;
  return (
    <TabsLayout tabs={tabs} baseLocation={baseLocation} />
  );
}

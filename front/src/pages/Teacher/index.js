// @flow

import React from 'react';

import TabsLayout from '../../components/TabsLayout';

// tabs :
import Equipe from './Team';
import Sujet from './sujet';
import Promo from './promo';

const tabs = [
  {
    label: "Promotions",
    path: "/promo",
    component: Promo,
  },
  {
    label: "Sujets",
    path: "/subject",
    component: Sujet,
  },
  {
    label: "Équipes",
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

import React from 'react';
import TabsLayout from '../../../../components/TabsLayout';
import Home from './Home';
import Meeting from './Meeting';

const tabs = [
  {
    label: "Équipe",
    path: "/home",
    component: Home,
  },
  {
    label: "Réunions",
    path: "/meeting",
    component: Meeting,
  },
  {
    label: "Livrables",
    path: "/deliverable",
    component: Home,
  },
];

export default class TeamDashboard extends React.Component {
  render() {
    return <TabsLayout baseLocation="/team" tabs={tabs} />;
  }
}

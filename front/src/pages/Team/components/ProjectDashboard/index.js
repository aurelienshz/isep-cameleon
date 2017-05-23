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
    component: () => <div>Livrables</div>,
  },
];

export default class ProjectDashboard extends React.Component {
  componentWillMount() {
    this.props.fetchProject();
  }

  render() {
    const { project, baseLocation, loading } = this.props;

    return <TabsLayout
      baseLocation={baseLocation}
      loading={loading}
      tabs={tabs}
      project={project}
    />;
  }
}

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
    const {projectId} = this.props;
    if (projectId) {
      this.props.fetchProject(projectId);
    } else {
      this.props.fetchProject();
    }
  }

  render() {
    const {
      project,
      baseLocation,
      loading,
      projectId,
      createMeeting,
      canEditMeeting,
      updateMeeting,
      deleteMeeting,
      userId
    } = this.props;

    return (
      <div style={{ width: '100%', height: 'calc(100% - 64px)', boxSizing: 'border-box', backgroundColor: "#FAFAFA" }}>
        <TabsLayout
          baseLocation={baseLocation}
          canEditMeeting={canEditMeeting}
          createMeeting={createMeeting}
          updateMeeting={updateMeeting}
          deleteMeeting={deleteMeeting}
          projectId={projectId}
          userId={userId}
          loading={loading}
          tabs={tabs}
          project={project}
        />
      </div>
    );

  }
}

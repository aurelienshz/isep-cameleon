import React from 'react';
import TabsLayout from '../../../../components/TabsLayout';
import Home from './Home';
import Meeting from './Meeting';
import Deliverable from './Deliverable';

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
    component: Deliverable,
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
      canEditMeeting,
      createMeeting,
      updateMeeting,
      deleteMeeting,
      canEditDeliverable,
      createDeliverable,
      updateDeliverable,
      deleteDeliverable,
      userId
    } = this.props;

    return (
      <div style={{ width: '100%', height: 'calc(100% - 64px)', boxSizing: 'border-box', backgroundColor: "#FAFAFA" }}>
        <TabsLayout
          tabs={tabs}
          baseLocation={baseLocation}
          projectId={projectId}
          project={project}
          userId={userId}
          loading={loading}
          canEditMeeting={canEditMeeting}
          createMeeting={createMeeting}
          updateMeeting={updateMeeting}
          deleteMeeting={deleteMeeting}
          canEditDeliverable={canEditDeliverable}
          createDeliverable={createDeliverable}
          updateDeliverable={updateDeliverable}
          deleteDeliverable={deleteDeliverable}
        />
      </div>
    );

  }
}

import React from 'react';
import TabsLayout from '../../../../components/TabsLayout';
import NoProjectError from '../../../../components/NoProjectError';
import Home from './Home';
import Meeting from './Meeting';
import Deliverable from './Deliverable';
import Messenger from './Messenger';

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
  {
    label: "Messages",
    path: "/message",
    component: Messenger,
  }
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
      canUploadMeetingReport,
      uploadMeetingReport,
      createMeeting,
      updateMeeting,
      deleteMeeting,
      canEditDeliverable,
      canDeliverDeliverable,
      createDeliverable,
      updateDeliverable,
      deleteDeliverable,
      deliverDeliverable,
      sendMessage,
      userId
    } = this.props;

    if (project && project.id === -1) return <NoProjectError />;

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
          canUploadMeetingReport={canUploadMeetingReport}
          uploadMeetingReport={uploadMeetingReport}
          createMeeting={createMeeting}
          updateMeeting={updateMeeting}
          deleteMeeting={deleteMeeting}
          canEditDeliverable={canEditDeliverable}
          canDeliverDeliverable={canDeliverDeliverable}
          createDeliverable={createDeliverable}
          updateDeliverable={updateDeliverable}
          deleteDeliverable={deleteDeliverable}
          deliverDeliverable={deliverDeliverable}
          sendMessage={sendMessage}
        />
      </div>
    );

  }
}

import { connect } from 'react-redux';

import { fetchMyProject, deliverDeliverable, uploadMeetingReport, sendMessage, getLocalState as getProjectState } from '../../../../data/project/reducer';

import ProjectDashboard from '../../components/ProjectDashboard';

export default connect(
  (state) => {
    const projectState = getProjectState(state);
    const loading = projectState.loadingProject || projectState.selectedProject === null;
    const projectId = projectState.selectedProject && projectState.selectedProject.id;
    return {
      loading,
      projectId,
      canEditMeeting: false,
      canEditDeliverable: false,
      canDeliverDeliverable: true, // TODO only allowed if student is member of this team
      canUploadMeetingReport: true, // TODO only allowed if student is member of this team
      project: projectState.selectedProject,
      baseLocation: "/team",
    }
  },
  (dispatch) => ({
    fetchProject: () => dispatch(fetchMyProject()),
    deliverDeliverable: (projectId, deliverableId, file) => dispatch(deliverDeliverable(projectId, deliverableId, file)),
    uploadMeetingReport: (projectId, meetingId, file) => dispatch(uploadMeetingReport(projectId, meetingId, file)),
    sendMessage: (projectId, messageDto) => dispatch(sendMessage(projectId, messageDto)),
  }),
)(ProjectDashboard);

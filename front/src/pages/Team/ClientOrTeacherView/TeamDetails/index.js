import { connect } from 'react-redux';
import ProjectDashboard from '../../components/ProjectDashboard';

import {
  fetchProject,
  createMeeting,
  updateMeeting,
  deleteMeeting,
  createDeliverable,
  updateDeliverable,
  deleteDeliverable,
  sendMessage,
  getLocalState as getProjectState } from '../../../../data/project/reducer';
import { getLocalState as getUserState } from '../../../../data/users/reducer';

export default connect(
  (state, ownProps) => {
    const projectId = parseInt(ownProps.match.params.id, 10);

    const projectState = getProjectState(state);
    const userState = getUserState(state);
    const loading = projectState.loadingProject || projectState.selectedProject === null;

    return {
      canEditMeeting: true, // TODO canEditMeeting only if client of this specific subject
      canEditDeliverable: true, // TODO canEditDeliverable only if client of this specific subject
      loading,
      projectId,
      userId: userState.profile.id,
      project: projectState.selectedProject,
      baseLocation: "/team/" + projectId,
    }
  },
  (dispatch) => ({
    fetchProject: (id) => dispatch(fetchProject(id)),
    createMeeting: (id, dto) => dispatch(createMeeting(id, dto)),
    updateMeeting: (projectId, meetingId, dto) => dispatch(updateMeeting(projectId, meetingId, dto)),
    deleteMeeting: (projectId, meetingId) => dispatch(deleteMeeting(projectId, meetingId)),
    createDeliverable: (id, dto) => dispatch(createDeliverable(id, dto)),
    updateDeliverable: (projectId, meetingId, dto) => dispatch(updateDeliverable(projectId, meetingId, dto)),
    deleteDeliverable: (projectId, meetingId) => dispatch(deleteDeliverable(projectId, meetingId)),
    sendMessage: (projectId, messageDto) => dispatch(sendMessage(projectId, messageDto)),
  }),
)(ProjectDashboard);

import { connect } from 'react-redux';

import { fetchMyProject, deliverDeliverable, getLocalState as getProjectState } from '../../../../data/project/reducer';

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
      canDeliverDeliverable: true,
      project: projectState.selectedProject,
      baseLocation: "/team",
    }
  },
  (dispatch) => ({
    fetchProject: () => dispatch(fetchMyProject()),
    deliverDeliverable: (projectId, deliverableId, file) => dispatch(deliverDeliverable(projectId, deliverableId, file))
  }),
)(ProjectDashboard);

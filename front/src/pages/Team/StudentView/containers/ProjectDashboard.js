import { connect } from 'react-redux';

import { fetchMyProject, getLocalState as getProjectState } from '../../../../data/project/reducer';

import ProjectDashboard from '../../components/ProjectDashboard';

export default connect(
  (state) => {
    const projectState = getProjectState(state);
    const loading = projectState.loadingProject || projectState.selectedProject === null;
    return {
      loading,
      canEditMeeting: false,
      project: projectState.selectedProject,
      baseLocation: "/team",
    }
  },
  (dispatch) => ({
    fetchProject: () => dispatch(fetchMyProject()),
  }),
)(ProjectDashboard);

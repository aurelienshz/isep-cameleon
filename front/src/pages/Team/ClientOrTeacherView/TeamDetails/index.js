import { connect } from 'react-redux';
import ProjectDashboard from '../../components/ProjectDashboard';

import { getLocalState as getProjectState, fetchProject } from '../../../../data/project/reducer';

export default connect(
  (state, ownProps) => {
    const projectId = parseInt(ownProps.match.params.id, 10);

    const projectState = getProjectState(state);
    const loading = projectState.loadingProject || projectState.selectedProject === null;

    return {
      loading,
      projectId,
      project: projectState.selectedProject,
      baseLocation: "/team/" + projectId,
    }
  },
  (dispatch) => ({
    fetchProject: (id) => dispatch(fetchProject(id)),
  }),
)(ProjectDashboard);

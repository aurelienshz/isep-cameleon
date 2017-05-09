// @flow

import { getProjectsList,
  createProject as requestCreateProject,
  getProject,
  getMyProject } from "./service";

const initialState = {
  loading: false,
  loadingProject: false,
  projects: null,
  selectedProject: null,
};

const FETCH_PROJECTS = "project/FETCH_PROJECTS";
const RECEIVE_PROJECTS = "project/RECEIVE_PROJECTS";
const REQUEST_PROJECT_CREATION = "project/REQUEST_PROJECT_CREATION";
const CONFIRM_PROJECT_CREATION = "project/CONFIRM_PROJECT_CREATION";
const FETCH_PROJECT = "project/FETCH_PROJECT";
const RECEIVE_PROJECT = "project/RECEIVE_PROJECT";

export default function projectReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PROJECT_CREATION:
      return {
        ...state,
        loading: true,
      };
    case CONFIRM_PROJECT_CREATION:
      return {
        ...state,
        loading: false,
      };
    case FETCH_PROJECTS:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE_PROJECTS:
      return {
        ...state,
        loading: false,
        projects: action.projects,
      };
    case FETCH_PROJECT:
      return {
        ...state,
        loadingProject: true,
      };
    case RECEIVE_PROJECT:
      return {
        ...state,
        loadingProject: false,
        selectedProject: action.project,
      };
    default:
      return state;
  }
}

export function fetchProjects() {
  return async (dispatch: Function) => {
    dispatch({
      type: FETCH_PROJECTS,
    });

    try {
      const projects = await getProjectsList();
      dispatch({
        type: RECEIVE_PROJECTS,
        projects
      })
    } catch (er) {
      console.error(er);
    }
  }
}

export function createProject(subjectId, teamId) {
  return async (dispatch: Function) => {
    dispatch({
      type: REQUEST_PROJECT_CREATION,
    });
    try {
      const project = await requestCreateProject({ subjectId, teamId });
      dispatch({
        type: CONFIRM_PROJECT_CREATION,
        project: project,
      });
      dispatch(fetchProjects());
    } catch(er) {
      console.error(er);
    }
  }
}

export function fetchProject(projectId) {
  return async (dispatch: Function) => {
    dispatch({
      type: FETCH_PROJECT,
    });
    try {
      const project = await getProject(projectId);
      dispatch({
        type: RECEIVE_PROJECT,
        project,
      });
    } catch(er) {
      console.error(er);
    }
  }
}

export function fetchMyProject() {
  return async (dispatch: Function) => {
    dispatch({
      type: FETCH_PROJECT,
    });
    try {
      const project = await getMyProject();
      dispatch({
        type: RECEIVE_PROJECT,
        project,
      });
    } catch(er) {
      console.error(er);
    }

  }
}

export function getLocalState(state) {
  return state.project;
}

// @flow

import { getProjectsList,
  createProject as requestCreateProject } from "./service";

const initialState = {
  loading: false,
  projects: null,
};

const FETCH_PROJECTS = "project/FETCH_PROJECTS";
const RECEIVE_PROJECTS = "project/RECEIVE_PROJECTS";
const REQUEST_PROJECT_CREATION = "project/REQUEST_PROJECT_CREATION";
const CONFIRM_PROJECT_CREATION = "project/CONFIRM_PROJECT_CREATION";

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

export function getLocalState(state) {
  return state.project;
}

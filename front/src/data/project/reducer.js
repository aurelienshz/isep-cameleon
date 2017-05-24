// @flow

import { getProjectsList,
  createProject as requestCreateProject,
  getProject,
  createMeeting as requestCreateMeeting,
  updateMeeting as requestUpdateMeeting,
  deleteMeeting as requestDeleteMeeting,
  createDeliverable as requestCreateDeliverable,
  updateDeliverable as requestUpdateDeliverable,
  deleteDeliverable as requestDeleteDeliverable,
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

const REQUEST_CREATE_MEETING = "project/REQUEST_CREATE_MEETING";
const CONFIRM_CREATE_MEETING = "project/CONFIRM_CREATE_MEETING";
const REQUEST_UPDATE_MEETING = "project/REQUEST_UPDATE_MEETING";
const CONFIRM_UPDATE_MEETING = "project/CONFIRM_UPDATE_MEETING";
const REQUEST_DELETE_MEETING = "project/REQUEST_DELETE_MEETING";
const CONFIRM_DELETE_MEETING = "project/CONFIRM_DELETE_MEETING";

const REQUEST_CREATE_DELIVERABLE = "project/REQUEST_CREATE_DELIVERABLE";
const CONFIRM_CREATE_DELIVERABLE = "project/CONFIRM_CREATE_DELIVERABLE";
const REQUEST_UPDATE_DELIVERABLE = "project/REQUEST_UPDATE_DELIVERABLE";
const CONFIRM_UPDATE_DELIVERABLE = "project/CONFIRM_UPDATE_DELIVERABLE";
const REQUEST_DELETE_DELIVERABLE = "project/REQUEST_DELETE_DELIVERABLE";
const CONFIRM_DELETE_DELIVERABLE = "project/CONFIRM_DELETE_DELIVERABLE";

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
    case REQUEST_CREATE_MEETING:
    case REQUEST_UPDATE_MEETING:
    case REQUEST_DELETE_MEETING:
      return {
        ...state,
        loading: true,
      };
    case CONFIRM_CREATE_MEETING:
    case CONFIRM_UPDATE_MEETING:
    case CONFIRM_DELETE_MEETING:
      return {
        ...state,
        loading: false,
      };
    case REQUEST_CREATE_DELIVERABLE:
    case REQUEST_UPDATE_DELIVERABLE:
    case REQUEST_DELETE_DELIVERABLE:
      return {
        ...state,
        loading: true,
      };
    case CONFIRM_CREATE_DELIVERABLE:
    case CONFIRM_UPDATE_DELIVERABLE:
    case CONFIRM_DELETE_DELIVERABLE:
      return {
        ...state,
        loading: false,
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

export function createMeeting(id, dto) {
  return async (dispatch: Function) => {
    dispatch({
      type: REQUEST_CREATE_MEETING,
    });
    try {
      await requestCreateMeeting(id, dto);
      dispatch({
        type: CONFIRM_CREATE_MEETING,
      });
      dispatch(fetchProject(id));
    } catch(er) {
      console.error(er);
    }
  }
}


export function updateMeeting(projectId, meetingId, dto) {
  return async (dispatch: Function) => {
    dispatch({
      type: REQUEST_UPDATE_MEETING,
    });
    try {
      await requestUpdateMeeting(projectId, meetingId, dto);
      dispatch({
        type: CONFIRM_UPDATE_MEETING,
      });
      dispatch(fetchProject(projectId));
    } catch(er) {
      console.error(er);
    }
  }
}

export function deleteMeeting(projectId, meetingId) {
  return async (dispatch: Function) => {
    dispatch({
      type: REQUEST_DELETE_MEETING,
    });
    try {
      await requestDeleteMeeting(projectId, meetingId);
      dispatch({
        type: CONFIRM_DELETE_MEETING,
      });
      dispatch(fetchProject(projectId));
    } catch(er) {
      console.error(er);
    }
  }
}

export function createDeliverable(id, dto) {
  return async (dispatch: Function) => {
    dispatch({
      type: REQUEST_CREATE_DELIVERABLE,
    });
    try {
      await requestCreateDeliverable(id, dto);
      dispatch({
        type: CONFIRM_CREATE_DELIVERABLE,
      });
      dispatch(fetchProject(id));
    } catch(er) {
      console.error(er);
    }
  }
}


export function updateDeliverable(projectId, deliverableId, dto) {
  return async (dispatch: Function) => {
    dispatch({
      type: REQUEST_UPDATE_DELIVERABLE,
    });
    try {
      await requestUpdateDeliverable(projectId, deliverableId, dto);
      dispatch({
        type: CONFIRM_UPDATE_DELIVERABLE,
      });
      dispatch(fetchProject(projectId));
    } catch(er) {
      console.error(er);
    }
  }
}

export function deleteDeliverable(projectId, deliverableId) {
  return async (dispatch: Function) => {
    dispatch({
      type: REQUEST_DELETE_DELIVERABLE,
    });
    try {
      await requestDeleteDeliverable(projectId, deliverableId);
      dispatch({
        type: CONFIRM_DELETE_DELIVERABLE,
      });
      dispatch(fetchProject(projectId));
    } catch(er) {
      console.error(er);
    }
  }
}

export function getLocalState(state) {
  return state.project;
}

// @flow

import { getSubjectsList, setSubjectClient as setSubjectClientService, createSubject as requestSubjectCreation } from './service';

const initialState = {
  subjects: [],
  loading: false,
};

const REQUEST_SUBJECTS = "subject/REQUEST_SUBJECT";
const RECEIVE_SUBJECTS = "subject/RECEIVE_SUBJECT";
const REQUEST_SUBJECT_CREATION = "subject/REQUEST_SUBJECT_CREATION";
const CONFIRM_SUBJECT_CREATION = "subject/CONFIRM_SUBJECT_CREATION";
const REQUEST_SET_SUBJECT_CLIENT = "subject/REQUEST_SET_SUBJECT_CLIENT";
const CONFIRM_SET_SUBJECT_CLIENT = "subject/CONFIRM_SET_SUBJECT_CLIENT";

export default function subjectReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SUBJECTS:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE_SUBJECTS:
      return {
        ...state,
        subjects: action.subjects,
        loading: false,
      };
    case REQUEST_SET_SUBJECT_CLIENT:
    case REQUEST_SUBJECT_CREATION:
      return {
        ...state,
        loading: true,
      };
    case CONFIRM_SET_SUBJECT_CLIENT:
    case CONFIRM_SUBJECT_CREATION:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export function fetchSubjects() {
  return async(dispatch: Function) => {
    dispatch({
      type: REQUEST_SUBJECTS,
    });
    try {
      const subjects = await getSubjectsList();
      dispatch({
        type: RECEIVE_SUBJECTS,
        subjects,
      });
    } catch(err) {
      console.error(err);
    }
  };
}

export function createSubject(subjectCreationRequest) {
  return async(dispatch: Function) => {
    dispatch({
      type: REQUEST_SUBJECT_CREATION,
    });
    try {
      await requestSubjectCreation(subjectCreationRequest);
      dispatch({
        type: CONFIRM_SUBJECT_CREATION,
      });
      dispatch(fetchSubjects());
    } catch(err) {
      console.error(err); // TODO error management
    }
  }
}


export function setSubjectClient(subjectId, clientId) {
  return async (dispatch: Function) => {
    dispatch({
      type: REQUEST_SET_SUBJECT_CLIENT,
    });
    try {
      await setSubjectClientService(subjectId, clientId);
      dispatch({
        type: CONFIRM_SET_SUBJECT_CLIENT,
      });
      dispatch(fetchSubjects());
    } catch (er) {
      console.error(er);
    }
  }
}

export const getLocalState = (state) => {
  return state.subject;
};
